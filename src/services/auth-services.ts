import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-services';

export const login = async (email: string, password: string) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
};
