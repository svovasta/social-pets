import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB3WVUZUy0oel-e5fgCPZe167iXd6giHEw',
  authDomain: 'social-pets-team.firebaseapp.com',
  projectId: 'social-pets-team',
  storageBucket: 'social-pets-team.appspot.com',
  messagingSenderId: '387097769590',
  appId: '1:387097769590:web:3092d9eb13902dcf591157',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
