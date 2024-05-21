'use client';

import { AuthProvider } from '../hooks/useAuth';
import { ServiceProvider } from '../context/serviceContext';
import { ReactElement } from 'react';

const Providers = ({ children }: { children: ReactElement }) => {
  return (
    <AuthProvider>
      <ServiceProvider>{children}</ServiceProvider>
    </AuthProvider>
  );
};

export default Providers;
