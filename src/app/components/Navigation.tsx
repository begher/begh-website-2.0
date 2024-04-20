import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { extractUsernameFromEmail } from '../helpers/extractUsernameFromEmail';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const Navigation = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <nav className='h-20 flex items-center justify-between px-12 text-gray-800 mx-auto border-b border-begh-gray'>
      <div className='flex items-end gap-4'>
        <Link href='/home' className='font-bungee text-2xl'>
          BEGH
        </Link>
        <p className=' mb-[3px] text-sm font-medium italic'>Admin</p>
      </div>
      <Menu as='div' className='relative'>
        {({ open }) => (
          <>
            <Menu.Button className='flex flex-col items-center gap-1'>
              <div className='flex items-center gap-1'>
                <p className='text-xs font-medium'>
                  {!currentUser ? (
                    <span>Fetching..</span>
                  ) : currentUser.email ? (
                    <span className='capitalize'>
                      {extractUsernameFromEmail(currentUser.email)}
                    </span>
                  ) : (
                    <span>Loading..</span>
                  )}
                </p>
                <HiMiniChevronDown
                  className={`w-4 h-4 transition duration-700 ${open ? '-scale-100' : ''}`}
                />
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute shadow-begh-modals right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-begh-white py-1 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <Menu.Item>
                  <a href='#' className='block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200'>
                    Settings
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={() => {
                      signOut(auth).then(() => {
                        router.push('/');
                      });
                    }}
                    className='block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200'
                  >
                    Sign out
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      {/* <div>
      
        <button
         
          className="text-sm text-blue-900 font-medium float-end"
        >
          Logga ut
        </button>
      </div> */}
    </nav>
  );
};

export default Navigation;
