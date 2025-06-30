import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase-services';

export const loginUser = async (email: string, password: string) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
};

export const registerUser = async (email: string, password: string) => {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return credentials.user;
};
