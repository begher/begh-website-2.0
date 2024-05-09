'use client';

import { AuthProvider } from '../hooks/useAuth';
import { ReactElement } from 'react';

const Providers = ({ children }: { children: ReactElement }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
