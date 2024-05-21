import { useEffect, useState } from 'react';
import { UptimeDataProps } from '../types/serviceUptime';
import { HealthDataProps } from '../types/serviceHealth';

const useFetchServiceData = (healthServiceEndpoint: string, uptimeServiceEndpoint: string) => {
  const [healthData, setHealthData] = useState<HealthDataProps | null>(null);
  const [uptimeData, setUptimeData] = useState<UptimeDataProps | null>(null);

  useEffect(() => {
    fetch(healthServiceEndpoint)
      .then((response) => response.json())
      .then((data) => setHealthData(data))
      .catch((error) => console.error('Error fetching health data:', error));

    fetch(uptimeServiceEndpoint)
      .then((response) => response.json())
      .then((data) => setUptimeData(data))
      .catch((error) => console.error('Error fetching uptime data:', error));
  }, [healthServiceEndpoint, uptimeServiceEndpoint]);

  return { healthData, uptimeData };
};

export default useFetchServiceData;
