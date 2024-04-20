'use client';

import { useState, useEffect } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState(2);

  const searchParams = useSearchParams();

  useEffect(() => {
    const form = searchParams.get('form');
    if (form === 'login') {
      setFormState(1);
    } else {
      setFormState(2);
    }
  }, [searchParams]);

  return (
    <div className='h-screen'>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800'>
            {formState === 2 && 'Register your account'}
            {formState === 1 && 'Login to your account'}
          </h1>
        </div>
        {errorMessage.length > 0 && (
          <p className='text-center text-orange-300 text-sm font-semibold'>{errorMessage}</p>
        )}
        <div className='sm:max-w-md mx-auto mt-10   flex w-full rounded-t-2xl overflow-hidden'>
          <button
            onClick={() => setFormState(1)}
            className={`w-1/2 text-center tracking-wider py-2.5 bg-gray-700 ${
              formState === 1 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setFormState(2)}
            className={`w-1/2 text-center tracking-wider  h-full py-2.5 ${
              formState === 2 ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Register
          </button>
        </div>
        <div className='sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 px-6 py-8 rounded-b-2xl'>
          {formState === 2 && <RegisterForm setErrorMessage={setErrorMessage} />}
          {formState === 1 && <LoginForm setErrorMessage={setErrorMessage} />}
        </div>
      </div>
    </div>
  );
}
