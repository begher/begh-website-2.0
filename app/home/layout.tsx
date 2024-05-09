import type { Metadata } from 'next';
import Container from '../../components/Container';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home for Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='text-begh-gray'>
      <Container>
        <div className='max-w-[1392px] mx-auto pt-4 sm:pt-8'>{children}</div>
      </Container>
    </div>
  );
}
