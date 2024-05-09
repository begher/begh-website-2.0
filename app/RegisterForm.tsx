import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  setErrorMessage: (message: string) => void;
}

const LoginForm = ({ setErrorMessage }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setLoading } = useAuth();

  const auth = getAuth();

  const onSubmit = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign in
        const user = userCredential.user;
        console.log('user', user);
        setErrorMessage('');
        router.push('/home');
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setLoading(false);
      });
  };

  return (
    <form className='space-y-6' onSubmit={onSubmit}>
      <div>
        <div className='flex items-center justify-between'>
          <label htmlFor='email' className='block text-sm font-medium leading-6 text-white'>
            Email address
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@example.com'
            autoComplete='email'
            className='block w-full indent-2 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <label htmlFor='password' className='block text-sm font-medium leading-6 text-white'>
            Password
          </label>
          <div className='text-sm'>
            <a href='#' className='font-semibold text-indigo-400 hover:text-indigo-300'>
              Forgot password?
            </a>
          </div>
        </div>
        <div className='mt-2'>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            autoComplete='current-password'
            className='block indent-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
          />
        </div>
      </div>
      <div>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
