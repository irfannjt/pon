import type { Metadata } from 'next';
import './globals.css';
import './tools.css';

export const metadata: Metadata = {
  title: 'NETFIX TOOLS | Network Engineering Toolkit',
  description: 'Network engineering tools for MikroTik, FTTH, PON, routing, and ISP technicians.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        {children}
        <a className="pon-tools-float" href="/PON/tools/" aria-label="Buka NETFIX TOOLS">
          <span className="pon-tools-float-mark">⌘</span>
          <span>NETFIX TOOLS</span>
        </a>
      </body>
    </html>
  );
}
