'use client';

import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { Service } from '../types/serviceStatus';
import { useState } from 'react';

export default function Services() {
  const { services } = useAuth();
  const [onlineServices, setOnlineServices] = useState<Service[]>([]);
  const [offlineServices, setOfflineServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!services) return;
    const onlineServices = services.filter((service) => service.online);
    const offlineServices = services.filter((service) => !service.online);

    setOnlineServices(onlineServices);
    setOfflineServices(offlineServices);
  }, [services]);

  useEffect(() => {
    console.log('services', services);
  }, [services]);

  return (
    <div className='w-full'>
      <div className=' max-w-[900px] bg-slate-100 p-8 rounded-[32px] border border-gray-400 shadow-md'>
        <h1 className='mb-4 text-2xl font-medium'>Services</h1>
        <div className='h-px bg-gray-400 w-full'></div>
        <div className='justify-between gap-8 flex pt-4 w-full'>
          <div className='flex-1 w-full'>
            {onlineServices && <h2 className='mb-4 font-semibold text-xl'>Online:</h2>}
            <div className='flex flex-col gap-4'>
              {onlineServices &&
                onlineServices.map((data: Service, index: number) => {
                  return (
                    <div key={index}>
                      <button className='w-full relative h-[74px] py-6 px-4 group transition border duration-200 bg-white border-begh-gray  rounded-lg hover:shadow-begh-success-hover shadow-begh-success'>
                        <p className='absolute transition duration-200 top-1/2 -translate-y-1/2 translate-x-[0%] '>
                          {data.name}
                        </p>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className='w-full flex-1'>
            {offlineServices && <h2 className='mb-4 font-semibold text-xl'>Offline:</h2>}
            <div className='flex flex-col gap-4 w-full'>
              {offlineServices &&
                offlineServices.map((data: Service, index: number) => {
                  return (
                    <div key={index}>
                      <button className='w-full relative h-[74px] py-6 px-4 group transition border duration-200 bg-white border-begh-gray  rounded-lg hover:shadow-begh-error-hover shadow-begh-error'>
                        <p className='absolute transition duration-200 top-1/2 -translate-y-1/2 translate-x-[0%] '>
                          {data.name}
                        </p>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
