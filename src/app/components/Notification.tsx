import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { FidgetSpinner } from 'react-loader-spinner';

interface NotificationProps {
  syncInfoEndpoint: string | null;
  getSyncInfo: (endpoint: string) => void;
  notificationEndpoint: string | null;
  notificationMessage: string | null;
  openNotification: boolean;
  setOpenNotification: (open: boolean) => void;
  syncError: boolean;
  syncEndpoint: (endpoint: string) => void;
  syncingEndpoint: string | null;
}

export default function Notification({
  syncInfoEndpoint,
  getSyncInfo,
  notificationEndpoint,
  notificationMessage,
  openNotification,
  setOpenNotification,
  syncError,
  syncEndpoint,
  syncingEndpoint,
}: NotificationProps) {
  return (
    <>
      <div
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-4'
      >
        <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
          <Transition
            show={openNotification}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='pointer-events-auto flex w-full max-w-md divide-x divide-gray-200 rounded-lg bg-white shadow-begh-notification ring-1 ring-black ring-opacity-5'>
              <div className='flex w-0 flex-1 items-center p-4'>
                <div className='w-full'>
                  <p className='text-sm font-medium text-gray-900'>
                    {syncError ? "Couldn't start sync for: " : 'Sync started for: '}
                    <span className='uppercase font-bold'>{notificationEndpoint}</span>
                  </p>
                  <p className='mt-1 text-sm text-gray-500'>
                    {notificationMessage || 'Syncing data...'}
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='flex flex-col divide-y divide-gray-200'>
                  <div className='flex h-0 flex-1 justify-center items-center px-2'>
                    {!syncError ? (
                      <button
                        type='button'
                        onClick={() => {
                          if (notificationEndpoint) {
                            getSyncInfo(notificationEndpoint);
                          }
                        }}
                        className={` ${
                          syncInfoEndpoint !== null
                            ? 'py-1'
                            : 'bg-gray-700 duration-200 hover:bg-gray-900 text-white px-2 py-1 rounded truncate min-w-0 h-min text-sm'
                        }`}
                      >
                        {syncInfoEndpoint !== null ? (
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
                    ) : (
                      <button
                        onClick={() => {
                          if (notificationEndpoint) {
                            syncEndpoint(notificationEndpoint);
                          }
                        }}
                        className={` ${
                          syncingEndpoint !== null
                            ? 'py-1'
                            : 'bg-emerald-500 hover:bg-emerald-600 duration-200 text-white px-2 py-1 rounded text-sm'
                        }`}
                      >
                        {syncingEndpoint !== null ? (
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
                    )}
                  </div>
                  <div className='flex h-0 flex-1'>
                    <button
                      type='button'
                      className='flex w-full items-center justify-center rounded-none rounded-br-lg border border-transparent px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      onClick={() => {
                        setOpenNotification(false);
                      }}
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
