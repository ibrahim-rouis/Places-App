import { auth } from '@/services/firebase-services';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error(
          `onAuthStateChanged listener error:\nError name: ${error.name}\nError message: ${error.message}`,
        );
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [setUser, setLoading]);
};
