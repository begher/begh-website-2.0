import type { Metadata } from 'next';
import '../styles/globals.css';
import Providers from '../components/Provider';
import { Benne, Bungee, Poppins } from 'next/font/google';

const benne = Benne({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-benne',
});

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee',
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Loginpage',
  description: 'Trying loginpage',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div
        className={`text-begh-white font-poppins h-full
        ${benne.variable} ${bungee.variable} ${poppins.variable}
      `}
      >
        {children}
      </div>
    </Providers>
  );
}
