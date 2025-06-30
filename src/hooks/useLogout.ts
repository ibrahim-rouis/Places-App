import { auth } from '@/services/firebase-services';
import { signOut } from 'firebase/auth';
import { useCallback } from 'react';

export const useLogout = () => {
  const callaback = useCallback(() => {
    return signOut(auth);
  }, []);

  return callaback;
};
