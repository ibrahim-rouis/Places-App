import { auth, db } from '@/services/firebase-services';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useMemo } from 'react';

const useViewPlace = (placeId: string) => {
  const userID = useMemo(() => auth.currentUser!.uid, []);
  const myViewDoc = useMemo(() => {
    return doc(collection(db, `places/${placeId}/views`), userID);
  }, [placeId]);

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
