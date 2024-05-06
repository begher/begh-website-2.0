'use client';

import { FaCheckCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import synscronize from '../api/synscronize';
import { VISMA_SYNC_API } from '../api/settings';
import { FidgetSpinner } from 'react-loader-spinner';
import Notification from '../components/Notification';
import SyncInfoModal from '../components/SyncInfoModal';

type SyncResults = {
  [key: string]: {
    name?: string;
    data?: any;
    error?: any;
  };
};

const Syncronize = () => {
  const [syncStatus, setSyncStatus] = useState<SyncResults>({});
  const [loading, setLoading] = useState(true);
  const [syncingEndpoint, setSyncingEndpoint] = useState<string | null>(null);
  const [syncInfo, setSyncInfo] = useState<any | string>(null);
  const [syncInfoEndpoint, setSyncInfoEndpoint] = useState<string | null>(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationEndpoint, setNotificationEndpoint] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<boolean>(false);
  const [syncInfoModal, setSyncInfoModal] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getSyncStatus = async () => {
      const results: SyncResults = {};

      for (const key in VISMA_SYNC_API) {
        try {
          const response = await synscronize(key, 'syncCheck');
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

    getSyncStatus();
  }, []);

  const syncEndpoint = async (endpoint: string) => {
    setSyncingEndpoint(endpoint);
    setNotificationEndpoint(endpoint);
    setOpenNotification(true);
    try {
      const response = await synscronize(endpoint, 'sync');
      setNotificationMessage('To know if the sync is completed or not, click on more info.');
      setSyncError(false);

      if ('error' in response) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        setNotificationMessage(`${error.message}. Do you want to try again?`);
        setSyncError(true);
      }
    } finally {
      setSyncingEndpoint(null);
    }
  };

  const getSyncInfo = async (endpoint: string) => {
    setSyncInfoEndpoint(endpoint);
    setSyncInfoModal(true);
    try {
      const response = await synscronize(endpoint, 'info');
      setSyncInfo(response);
    } catch (error) {
      if (error instanceof Error) {
        setSyncInfo(error.message);
      } else {
        setSyncInfo('An error occurred.');
      }
    } finally {
      setSyncInfoEndpoint(null);
    }
  };

  const sortedSyncStatus = Object.entries(syncStatus).sort(([keyA, valA], [keyB, valB]) => {
    const syncNeededA = valA.data?.syncNeeded ? 1 : 0;
    const syncNeededB = valB.data?.syncNeeded ? 1 : 0;
    return syncNeededB - syncNeededA;
  });

  return (
    <section className='w-full col-span-2 lg:col-span-3 sm:bg-slate-100 p-0 sm:p-8 sm:rounded-[32px] sm:border border-gray-400 sm:shadow-md'>
      <div>
        <h1 className='mb-4 text-2xl font-medium'>Synscronize</h1>
        <div className='h-1 rounded sm:rounded-none sm:h-px bg-emerald-500 sm:bg-gray-400 w-full'></div>
        <p className='pt-4'>
          API endpoints from our database that need to be synced with Visma&apos;s database:
        </p>
      </div>
      <div className='-mx-4 mt-4 sm:-mx-0 h-full'>
        <table className='text-sm min-w-full divide-y divide-gray-400'>
          <thead>
            <tr>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
              >
                {!loading ? (
                  'Endpoint'
                ) : (
                  <div className='flex gap-2'>
                    <p>Loading...</p>
                    <FidgetSpinner
                      height={24}
                      width={24}
                      backgroundColor='#EB737A'
                      ballColors={['#909090', '#4078C0', '#C0A440']}
                    />
                  </div>
                )}
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
          {!loading && (
            <tbody className='divide-y divide-gray-300 '>
              {sortedSyncStatus.map(([key, { name, data, error }]) => {
                const syncNeeded = data?.syncNeeded;
                return (
                  <>
                    <tr key={key}>
                      <td className='w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 truncate min-w-0'>
                        {name || key}
                        <dl className='block xs:hidden lg:block xl:hidden'>
                          <dt className='sr-only'>Status</dt>
                          <dd className='mt-1 truncate'>
                            {!error ? (
                              <>
                                <span className='text-gray-500 font-normal '>
                                  {syncNeeded ? 'Not Synced' : 'Synced'}
                                </span>
                                {!syncNeeded ? (
                                  <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
                                ) : (
                                  <FaCircleXmark className='text-red-400 inline-block ml-2' />
                                )}
                              </>
                            ) : (
                              <span className='text-gray-500 font-normal '>Error</span>
                            )}
                          </dd>
                        </dl>
                      </td>
                      <td className='px-3 py-4 hidden xs:table-cell lg:hidden xl:table-cell truncate'>
                        {!error ? (
                          <>
                            <span>{syncNeeded ? 'Not Synced' : 'Synced'}</span>
                            {!syncNeeded ? (
                              <FaCheckCircle className='text-emerald-500 inline-block ml-2' />
                            ) : (
                              <FaCircleXmark className='text-red-400 inline-block ml-2' />
                            )}
                          </>
                        ) : (
                          <span>Error</span>
                        )}
                      </td>
                      <td className='px-3 py-4 min-w-0'>
                        <button
                          onClick={() => getSyncInfo(key)}
                          className={` ${
                            syncInfoEndpoint === key
                              ? 'py-1'
                              : 'bg-gray-700 duration-200 hover:bg-gray-900 text-white px-2 py-1 rounded truncate min-w-0'
                          }`}
                        >
                          {syncInfoEndpoint === key ? (
                            <FidgetSpinner
                              height={24}
                              width={24}
                              backgroundColor='#EB737A'
                              ballColors={['#909090', '#4078C0', '#C0A440']}
                            />
                          ) : (
                            'More Info'
                          )}
                        </button>
                      </td>
                      <td className='py-4 pl-3 pr-4 text-right sm:pr-0'>
                        <button
                          onClick={() => syncEndpoint(key)}
                          className={` ${
                            syncingEndpoint === key
                              ? 'py-1'
                              : 'bg-emerald-500 hover:bg-emerald-600 duration-200 text-white px-2 py-1 rounded'
                          }`}
                        >
                          {syncingEndpoint === key ? (
                            <FidgetSpinner
                              height={24}
                              width={24}
                              backgroundColor='#EB737A'
                              ballColors={['#909090', '#4078C0', '#C0A440']}
                            />
                          ) : (
                            'Sync'
                          )}
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <Notification
        syncInfoEndpoint={syncInfoEndpoint}
        getSyncInfo={getSyncInfo}
        syncEndpoint={syncEndpoint}
        notificationEndpoint={notificationEndpoint}
        notificationMessage={notificationMessage}
        openNotification={openNotification}
        setOpenNotification={setOpenNotification}
        syncError={syncError}
        syncingEndpoint={syncingEndpoint}
      />
      <SyncInfoModal
        syncInfoModal={syncInfoModal}
        setSyncInfoModal={setSyncInfoModal}
        syncInfo={syncInfo}
      />
    </section>
  );
};

export default Syncronize;
