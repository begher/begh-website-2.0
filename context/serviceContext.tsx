import { createContext, useState, useContext, ReactNode } from 'react';

interface ServiceContextProps {
  healthServiceEndpoint: string;
  setHealthServiceEndpoint: (endpoint: string) => void;
  uptimeServiceEndpoint: string;
  setUptimeServiceEndpoint: (endpoint: string) => void;
}

const ServiceContext = createContext<ServiceContextProps | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [healthServiceEndpoint, setHealthServiceEndpoint] = useState('');
  const [uptimeServiceEndpoint, setUptimeServiceEndpoint] = useState('');

  return (
    <ServiceContext.Provider
      value={{
        healthServiceEndpoint,
        setHealthServiceEndpoint,
        uptimeServiceEndpoint,
        setUptimeServiceEndpoint,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};
