import { useState, useEffect, useContext, createContext, ReactElement } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Loading from '../loading';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

async function postUser(accessToken: string) {
  const response = await fetch('https://api.imats.se/customer-service', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
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
});

export const AuthProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log('user', user);

      if (user) {
        console.log(user.getIdToken());

        user.getIdToken().then((accessToken) => {
          postUser(accessToken)
            .then((data) => {
              console.log('data', data);
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error:', error);
              setLoading(false);
            });
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <html lang='en'>
      <AuthContext.Provider value={{ currentUser, loading, setLoading }}>
        <body>{loading ? <Loading /> : children}</body>
      </AuthContext.Provider>
    </html>
  );
};

export const useAuth = () => useContext(AuthContext);
