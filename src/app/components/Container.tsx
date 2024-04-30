'use client';

import Navigation from './Navigation';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <Navigation />
      <div className='px-4 sm:px-12'>{children}</div>
    </>
  );
};

export default Container;
