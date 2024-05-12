import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SyncInfoProps } from '../types/syncInfoProps';
import { FidgetSpinner } from 'react-loader-spinner';

interface SyncInfoModalProps {
  syncInfoModal: boolean;
  setSyncInfoModal: (open: boolean) => void;
  syncInfo: SyncInfoProps | null;
}

export default function SyncInfoModal({
  syncInfoModal,
  setSyncInfoModal,
  syncInfo,
}: SyncInfoModalProps) {
  const calculateDuration = () => {
    if (syncInfo?.data?.start?.createdAt && syncInfo?.data?.completed?.createdAt) {
      const start = new Date(syncInfo.data.start.createdAt);
      const end = new Date(syncInfo.data.completed.createdAt);
      return ((end.getTime() - start.getTime()) / 1000).toFixed(2);
    }
    return null;
  };

  const duration = calculateDuration();
  const errorMessage = syncInfo?.data?.error?.message;
  const syncStarted = syncInfo?.data?.start?.createdAt
    ? new Date(syncInfo.data.start.createdAt)
    : null;

  const syncEnded = syncInfo?.data?.completed?.createdAt
    ? new Date(syncInfo.data.completed.createdAt)
    : null;

  return (
    <Transition.Root show={syncInfoModal} as={Fragment}>
      <Dialog className='relative z-10 ' onClose={setSyncInfoModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                {syncInfo ? (
                  <div>
                    <div>
                      <Dialog.Title
                        as='h3'
                        className='text-base sm:text-lg leading-6 text-begh-gray'
                      >
                        Latest sync details for{' '}
                        <span className='font-semibold'>{syncInfo.name}</span>
                      </Dialog.Title>
                      <div className='mt-4'>
                        <ul className='text-gray-500 text-sm'>
                          <li>
                            Sync started:{' '}
                            <span className='text-begh-gray font-semibold block'>
                              {syncStarted ? syncStarted.toLocaleString() : 'Not started'}
                            </span>
                          </li>
                          <li className='mb-4'>
                            Sync ended:{' '}
                            <span className='text-begh-gray font-semibold block'>
                              {syncEnded ? syncEnded.toLocaleString() : 'Not ended'}
                            </span>
                          </li>
                          <li className='mb-4'>
                            Time to sync endpoint:{' '}
                            <span className='text-begh-gray font-semibold block'>
                              {duration ? `${duration} sec` : '--'}
                            </span>
                          </li>
                          <li>
                            Error message:{' '}
                            <span className='text-begh-gray font-semibold block'>
                              {errorMessage && syncEnded
                                ? errorMessage
                                : !errorMessage && !syncEnded
                                ? 'No error reported yet'
                                : 'No error reported'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-center py-6'>
                    <div className='flex flex-col items-center gap-2'>
                      <FidgetSpinner
                        height={32}
                        width={32}
                        backgroundColor='#EB737A'
                        ballColors={['#909090', '#4078C0', '#C0A440']}
                      />
                      <p>Loading ...</p>
                    </div>
                  </div>
                )}
                <div className='mt-5 sm:mt-6 flex gap-4'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded font-poppins tracking-wider bg-gray-700 px-2 py-2 text-sm text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
                    onClick={() => setSyncInfoModal(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
