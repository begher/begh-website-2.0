'use client';

import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import syncCheck from '../api/syncCheck';
import { VISMA_SYNC_API } from '../api/settings';

type SyncResults = {
  [key: string]: {
    name?: string;
    data?: any;
    error?: string;
    synced: boolean;
  };
};

const Syncronize = () => {
  const [syncStatus, setSyncStatus] = useState<SyncResults>({});

  useEffect(() => {
    const syncAllEndpoints = async () => {
      const results: SyncResults = {};

      for (const key in VISMA_SYNC_API) {
        try {
          const response = await syncCheck(key);
          results[key] = { ...response, synced: true };
        } catch (error) {
          if (error instanceof Error) {
            results[key] = { error: error.message, synced: false };
          } else {
            results[key] = { error: 'An error occurred', synced: false };
          }
        }
      }

      console.log('results', results);

      setSyncStatus(results);
    };

    syncAllEndpoints();
  }, []);

  return (
    <section className='w-full sm:bg-slate-100 p-0 sm:p-8 sm:rounded-[32px] sm:border border-gray-400 sm:shadow-md'>
      <h1 className='mb-4 text-2xl font-medium'>Synscronize</h1>
      <div className='h-1 rounded sm:rounded-none sm:h-px bg-emerald-500 sm:bg-gray-400 w-full'></div>
      <p className='pt-4'>
        API endpoints from our database that need to be synced with Visma&apos;s database:
      </p>
      <div className='-mx-4 mt-4 sm:-mx-0 '>
        <table className='text-sm min-w-full divide-y divide-gray-400'>
          <thead>
            <tr>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
              >
                Endpoint
              </th>
              <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                Status
              </th>
              <th className='sr-only px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                Info
              </th>
              <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                Sync
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-300 '>
            <tr>
              <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
                Endpoint 1
              </td>
              <td className='px-3 py-4'>
                <span>Not Synced</span>
                <FaCircleXmark className='text-red-400 inline-block ml-2' />
              </td>
              <td className='px-3 py-4'>
                <button className='bg-gray-700 text-white px-2 py-1 rounded'>More Info</button>
              </td>
              <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                <button className='bg-emerald-500 text-white px-2 py-1 rounded'>Sync</button>
              </td>
            </tr>
            <tr>
              <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
                Endpoint 2
              </td>
              <td className='px-3 py-4 '>
                <span>Not Synced</span>
                <FaCircleXmark className='text-red-400 inline-block ml-2' />
              </td>
              <td className='px-3 py-4'>
                <button className='bg-gray-700 text-white px-2 py-1 rounded'>More Info</button>
              </td>
              <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                <button className='bg-emerald-500 text-white px-2 py-1 rounded'>Sync</button>
              </td>
            </tr>
            <tr>
              <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
                Endpoint 3
              </td>
              <td className='px-3 py-4 '>
                <span>Synced</span>
                <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
              </td>
              <td className='px-3 py-4'>
                <button className='bg-gray-700 text-white px-2 py-1 rounded'>More Info</button>
              </td>
              <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                <button className='bg-emerald-500 text-white px-2 py-1 rounded'>Sync</button>
              </td>
            </tr>
            <tr>
              <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
                Endpoint 4
              </td>
              <td className='px-3 py-4 '>
                <span>Synced</span>
                <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
              </td>
              <td className='px-3 py-4'>
                <button className='bg-gray-700 text-white px-2 py-1 rounded'>More Info</button>
              </td>
              <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                <button className='bg-emerald-500 text-white px-2 py-1 rounded'>Sync</button>
              </td>
            </tr>
            <tr>
              <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
                Endpoint 5
              </td>
              <td className='px-3 py-4 '>
                <span>Synced</span>
                <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
              </td>
              <td className='px-3 py-4'>
                <button className='bg-gray-700 text-white px-2 py-1 rounded'>More Info</button>
              </td>
              <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                <button className='bg-emerald-500 text-white px-2 py-1 rounded'>Sync</button>
              </td>
            </tr>
            <tr>
              <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0'>
                Endpoint 6
              </td>
              <td className='px-3 py-4 '>
                <span>Synced</span>
                <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
              </td>
              <td className='px-3 py-4'>
                <button className='bg-gray-700 text-white px-2 py-1 rounded'>More Info</button>
              </td>
              <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                <button className='bg-emerald-500 text-white px-2 py-1 rounded'>Sync</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Syncronize;
