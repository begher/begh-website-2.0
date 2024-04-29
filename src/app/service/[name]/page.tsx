'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Service from './api/route';

const ServicePage = () => {
  const { name } = useParams();
  const baseUrl = 'https://api.imats.se/';
  const health = '/actuator/health';
  const uptime = '/actuator/uptime';

  useEffect(() => {
    fetch(baseUrl + name + uptime)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default ServicePage;
