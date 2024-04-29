import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHmJ2mMVOnhmJMO3eY1ouwmzHoH9R2T-0',
  authDomain: 'holidays-415709.firebaseapp.com',
  projectId: 'holidays-415709',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
