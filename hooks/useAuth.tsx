import { useState, useEffect, useContext, createContext, ReactElement } from 'react';
import { auth } from '../app/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Loading from '../app/loading';
import { useRouter, usePathname } from 'next/navigation';
import { Service } from '../types/serviceStatus';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  services: Service[] | null;
  token: string | null;
}

async function getServices(token: string) {
  const response = await fetch('https://api.imats.se/control-service/servicestatus', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  setLoading: () => {},
  services: null,
  token: null,
});

export const AuthProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[] | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        user.getIdToken().then((idToken) => {
          setToken(idToken);
          getServices(idToken)
            .then((data) => {
              setLoading(false);
              setServices(data);
            })
            .catch((error) => {
              console.error('Error:', error);
              setLoading(false);
              setServices(null);
            });
        });
      } else if (!user && pathname !== '/access-denied' && pathname !== '/') {
        router.push('/access-denied');
        setLoading(false);
      } else {
        setLoading(false);
        setServices(null);
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang='en' className={poppins.className}>
      <body className='bg-begh-background p-4 sm:p-6 h-screen '>
        <AuthContext.Provider value={{ currentUser, loading, setLoading, services, token }}>
          <div className=' bg-begh-white h-full shadow-begh-body mx-auto rounded-2xl overflow-x-hidden overflow-y-auto'>
            {loading ? <Loading /> : children}
          </div>
        </AuthContext.Provider>
      </body>
    </html>
  );
};

export const useAuth = () => useContext(AuthContext);
