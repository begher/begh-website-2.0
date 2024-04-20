import type { Metadata } from 'next';
import './globals.css';
import Providers from './components/Provider';

export const metadata: Metadata = {
  title: 'Health check',
  description: 'Health check for services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className=' bg-begh-background text-begh-white'>{children}</div>
    </Providers>
  );
}
