import type { Metadata } from 'next';
import './globals.css';
import './tools.css';

export const metadata: Metadata = {
  title: 'PONCALC | FTTH & Network Engineering Tools',
  description: 'Kumpulan kalkulator FTTH dan tools jaringan MikroTik native untuk teknisi dan network engineer.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {children}
        <a className="pon-tools-float" href="/tools" aria-label="Buka Network Tools">
          <span className="pon-tools-float-mark">⌘</span>
          <span>NETWORK TOOLS</span>
        </a>
      </body>
    </html>
  );
}
