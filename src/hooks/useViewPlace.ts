import { db } from '@/services/firebase-services';
import { useAuthStore } from '@/store/useAuthStore';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';

const useViewPlace = (placeId: string) => {
  const userID = useAuthStore((state) => state.user?.uid);
  const myViewDoc = useMemo(() => {
    return doc(collection(db, `places/${placeId}/views`), userID);
  }, [placeId, userID]);

  useEffect(() => {
    const setViewed = async () => {
      try {
        await setDoc(myViewDoc, {
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.error(error);
      }
    };

    setViewed();
  }, [myViewDoc]);
};

export default useViewPlace;
