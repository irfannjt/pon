'use client';

import { useMemo, useState } from 'react';
import { Activity, ArrowRight, Cable, CheckCircle2, Info, Moon, Network, RotateCcw, Sun, Waves, Zap, Trash2 } from 'lucide-react';

type Tab = 'topology' | 'splitter' | 'standard';
type Kind = 'fiber' | 'splice' | 'connector' | 'plc' | 'fbt' | 'ont';
type NodeItem = {
  id: number;
  kind: Kind;
  lengthKm?: number;
  loss?: number;
  plcPorts?: number;
  fbtDrop?: number;
};

const plcLoss: Record<number, number> = { 2: 3.7, 4: 7.4, 8: 10.7, 16: 14.0, 32: 17.3 };
const names: Record<Kind, string> = {
  fiber: 'Kabel Fiber Optik',
  splice: 'Sambungan (Splice)',
  connector: 'Konektor / Adapter',
  plc: 'Splitter PLC (Merata)',
  fbt: 'Splitter FBT (Rasio)',
  ont: 'ONT / ONU (Modem)',
};
const fmt = (v: number) => `${v.toFixed(2)} dBm`;
const fbtDropLoss = (drop: number) => -10 * Math.log10(drop / 100) + 0.5;
const fbtPassLoss = (drop: number) => -10 * Math.log10((100 - drop) / 100) + 0.14;

export default function Home() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState<Tab>('topology');
  const [input, setInput] = useState('7');
  const [kind, setKind] = useState<Kind>('fiber');
  const [nodes, setNodes] = useState<NodeItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const [splitterInput, setSplitterInput] = useState('3.5');
  const [splitterDrop, setSplitterDrop] = useState(10);
  const [splitterPlc, setSplitterPlc] = useState(8);

  const addNode = () => {
    const defaults: Record<Kind, Partial<NodeItem>> = {
      fiber: { lengthKm: 1, loss: 0.35 },
      splice: { loss: 0.10 },
      connector: { loss: 0.30 },
      plc: { plcPorts: 8, loss: 10.7 },
      fbt: { fbtDrop: 10 },
      ont: { loss: 0 },
    };
    setNodes(current => [...current, { id: nextId, kind, ...defaults[kind] }]);
    setNextId(value => value + 1);
  };

  const updateNode = (id: number, patch: Partial<NodeItem>) =>
    setNodes(current => current.map(item => item.id === id ? { ...item, ...patch } : item));
  const removeNode = (id: number) => setNodes(current => current.filter(item => item.id !== id));
  const reset = () => { setNodes([]); setInput('7'); setNextId(1); };

  const results = useMemo(() => {
    const source = Number(input);
    if (input.trim() === '' || !Number.isFinite(source)) return [];
    let continuingPower = source;
    let accumulatedLoss = 0;
    return nodes.map(node => {
      const inputPower = continuingPower;
      let loss = node.loss ?? 0;
      let dropPower: number | null = null;
      let passPower: number | null = null;
      if (node.kind === 'fiber') loss = (node.lengthKm ?? 0) * (node.loss ?? 0.35);
      if (node.kind === 'fbt') {
        const drop = node.fbtDrop ?? 10;
        dropPower = inputPower - fbtDropLoss(drop);
        passPower = inputPower - fbtPassLoss(drop);
        loss = fbtPassLoss(drop);
        continuingPower = passPower;
      } else if (node.kind === 'ont') {
        loss = 0;
      } else {
        continuingPower = inputPower - loss;
      }
      accumulatedLoss = source - continuingPower;
      return { id: node.id, inputPower, loss, outputPower: node.kind === 'fbt' ? passPower! : continuingPower, dropPower, passPower, accumulatedLoss };
    });
  }, [input, nodes]);

  const sourcePower = Number(input);
  const validInput = input.trim() !== '' && Number.isFinite(sourcePower);
  const finalPower = results.length ? results[results.length - 1].outputPower : sourcePower;
  const totalLoss = validInput ? sourcePower - finalPower : 0;

  const splitResult = useMemo(() => {
    const power = Number(splitterInput);
    if (splitterInput.trim() === '' || !Number.isFinite(power)) return null;
    const plc = plcLoss[splitterPlc];
    const dropLoss = fbtDropLoss(splitterDrop);
    const passLoss = fbtPassLoss(splitterDrop);
