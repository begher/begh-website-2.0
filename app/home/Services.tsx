'use client';

import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { Service } from '../../types/serviceStatus';
import { useState } from 'react';
import Link from 'next/link';
import { useServiceContext } from '../../context/serviceContext';

export default function Services() {
  const { services } = useAuth();
  const { setHealthServiceEndpoint, setUptimeServiceEndpoint } = useServiceContext();
  const [onlineServices, setOnlineServices] = useState<Service[]>([]);
  const [offlineServices, setOfflineServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!services) return;
    const onlineServices = services.filter((service) => service.online);
    const offlineServices = services.filter((service) => !service.online);

    setOnlineServices(onlineServices);
    setOfflineServices(offlineServices);
  }, [services]);

  const handleClick = (data: Service) => {
    setHealthServiceEndpoint(`${data.url}${data.health}`);
    setUptimeServiceEndpoint(`${data.url}${data.uptime}`);
  };

  return (
    <section className='w-full lg:col-span-4 col-span-2'>
      <div className='max-w-[900px] sm:bg-slate-100 p-0 sm:p-8 sm:rounded-[32px] sm:border border-gray-400 sm:shadow-md'>
        <h1 className='mb-4 text-2xl font-medium'>Services</h1>
        <div className='h-1 rounded sm:rounded-none sm:h-px bg-emerald-400 sm:bg-gray-400 w-full'></div>
        <div className='justify-between gap-6 sm:gap-8 flex pt-4 w-full sm:flex-row flex-col'>
          <div className='flex-1 w-full'>
            {onlineServices && <h2 className='mb-2 sm:mb-4 font-semibold text-xl'>Online:</h2>}
            <div className='flex flex-col gap-2 sm:gap-4'>
              {onlineServices &&
                onlineServices.map((data: Service, index: number) => {
                  const serviceName = data.name.replace(/\s+/g, '-').toLowerCase();

                  return (
                    <Link
                      onClick={() => handleClick(data)}
                      href={`/service/${serviceName}`}
                      key={index}
                    >
                      <button className='w-full relative h-14 sm:h-[74px] py-6 px-4 group transition border duration-200 bg-white border-begh-gray  rounded-lg hover:shadow-begh-success-hover shadow-begh-success'>
                        <p className='absolute transition duration-200 top-1/2 -translate-y-1/2 translate-x-[0%] sm:text-base text-sm'>
                          {data.name}
                        </p>
                      </button>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className='w-full flex-1'>
            {offlineServices && <h2 className='mb-2 sm:mb-4 font-semibold text-xl'>Offline:</h2>}
            <div className='flex flex-col gap-2 sm:gap-4 w-full'>
              {offlineServices &&
                offlineServices.map((data: Service, index: number) => {
                  return (
                    <div key={index}>
                      <button className='w-full relative h-14 sm:h-[74px] py-6 px-4 group transition border duration-200 bg-white border-begh-gray  rounded-lg hover:shadow-begh-error-hover shadow-begh-error'>
                        <p className='absolute transition duration-200 top-1/2 -translate-y-1/2 translate-x-[0%] text-sm sm:text-base'>
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
    </section>
  );
}
