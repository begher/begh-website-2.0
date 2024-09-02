import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDtFkjSXKRYXwqYUV4aFYsK24kf0JW8BFc',
  authDomain: 'listig-428113.firebaseapp.com',
  projectId: 'listig-428113',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
