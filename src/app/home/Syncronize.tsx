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
  };
};

const Syncronize = () => {
  const [syncStatus, setSyncStatus] = useState<SyncResults>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const syncAllEndpoints = async () => {
      const results: SyncResults = {};

      for (const key in VISMA_SYNC_API) {
        try {
          const response = await syncCheck(key);
          results[key] = { ...response };
        } catch (error) {
          if (error instanceof Error) {
            results[key] = { error: error.message };
          } else {
            results[key] = { error: 'An error occurred' };
          }
        }
      }

      setLoading(false);
      setSyncStatus(results);
    };

    syncAllEndpoints();
  }, []);

  return (
    <section className='w-full col-span-2 lg:col-span-3 sm:bg-slate-100 p-0 sm:p-8 sm:rounded-[32px] sm:border border-gray-400 sm:shadow-md'>
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
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden xs:table-cell lg:hidden xl:table-cell'
              >
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
          {loading && (
            <tbody className='divide-y divide-gray-300 '>
              {Object.keys(syncStatus).map((key) => {
                const { name, data, error } = syncStatus[key];
                const { syncNeeded } = data || {};
                return (
                  <tr key={key}>
                    <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 truncate min-w-0'>
                      {name}
                      <dl className='block xs:hidden lg:block xl:hidden'>
                        <dt className='sr-only'>Status</dt>
                        <dd className='mt-1 truncate'>
                          {' '}
                          <span className='text-gray-500 font-normal '>
                            {syncNeeded ? 'Not Synced' : 'Synced'}
                          </span>
                          {!syncNeeded ? (
                            <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
                          ) : (
                            <FaCircleXmark className='text-red-400 inline-block ml-2' />
                          )}
                        </dd>
                      </dl>
                    </td>
                    <td className='px-3 py-4 hidden xs:table-cell lg:hidden xl:table-cell truncate'>
                      <span>{syncNeeded ? 'Not Synced' : 'Synced'}</span>
                      {!syncNeeded ? (
                        <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
                      ) : (
                        <FaCircleXmark className='text-red-400 inline-block ml-2' />
                      )}
                    </td>
                    <td className='px-3 py-4 min-w-0'>
                      <button className='bg-gray-700 text-white px-2 py-1 rounded truncate min-w-0'>
                        More Info
                      </button>
                    </td>
                    <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                      <button className='bg-emerald-500 text-white px-2 py-1 rounded'>Sync</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </section>
  );
};

export default Syncronize;
