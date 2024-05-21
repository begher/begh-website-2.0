'use client';

import { useParams } from 'next/navigation';
import { useServiceContext } from '../../../context/serviceContext';
import useFetchServiceData from '../../../hooks/useFetchServiceData';
import { useRouter } from 'next/navigation';

const ServicePage = () => {
  const { name } = useParams();
  const { healthServiceEndpoint, uptimeServiceEndpoint } = useServiceContext();
  const { healthData, uptimeData } = useFetchServiceData(
    healthServiceEndpoint,
    uptimeServiceEndpoint
  );
  const router = useRouter();

  const diskSpace = {
    total: healthData?.components?.diskSpace?.details?.total || 0,
    free: healthData?.components?.diskSpace?.details?.free || 0,
    threshold: 10737418240,
  };

  const bytesToGB = (bytes: number) => (bytes / (1024 * 1024 * 1024)).toFixed(2);

  const totalGB = bytesToGB(diskSpace.total);
  const freeGB = bytesToGB(diskSpace.free);
  const result = bytesToGB(diskSpace.free - diskSpace.threshold);

  const humanReadableDiskSpace = {
    total: `${totalGB} GB`,
    free: `${freeGB} GB`,
    remaining: `${result} GB left until threshold`,
  };

  return (
    <div className='relative'>
      {/* Make back button */}
      <button
        className='absolute top-0 right-0 mt-4 ml-4 text-sm font-semibold text-gray-700'
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className='mb-4'>
        <h1 className='text-2xl  font-semibold'>Service Name</h1>
        <pre>{name}</pre>
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          <h2 className='text-lg font-semibold'>Health Data</h2>
          <p>Total disk space: {humanReadableDiskSpace.total}</p>
          <p>Free disk space: {humanReadableDiskSpace.free}</p>
          <p>Remaining until threshold: {humanReadableDiskSpace.remaining}</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold'>Components</h2>
          {healthData?.components?.db?.details?.database && (
            <p>Database status: {healthData?.components?.db?.details?.database}</p>
          )}
          {healthData?.components?.r2dbc?.details?.database && (
            <p>R2DBC status: {healthData?.components?.r2dbc?.details?.database}</p>
          )}
        </div>
        <div>
          <p className='text-lg font-semibold'>Ping Data</p>
          <p>Status: {healthData?.components?.ping?.status}</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold'>Uptime Data</h2>
          <p>Uptime: {uptimeData?.upTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
