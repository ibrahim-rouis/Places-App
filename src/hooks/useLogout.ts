import { logoutUser } from '@/services/auth-services';
import { useCallback } from 'react';

export const useLogout = () => {
  const callaback = useCallback(() => {
    return logoutUser();
  }, []);

  return callaback;
};
