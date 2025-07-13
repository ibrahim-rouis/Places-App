import { auth, db } from '@/services/firebase-services';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useRating = (
  placeIDArg: string,
): [number, (ratingArg: number) => void] => {
  const userID = useMemo<string>(() => auth.currentUser!.uid, []);
  const placeID = useMemo<string>(() => placeIDArg, [placeIDArg]);
  const [rating, _setRating] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const placeDoc = doc(collection(db, 'places'), placeID);
        const ratingsCollection = collection(placeDoc, 'ratings');
        const mydoc = await getDoc(doc(ratingsCollection, userID));
        if (mydoc.exists()) {
          _setRating(mydoc.data().rating);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [userID, placeID]);

  const setRating = useCallback(
    (rating: number) => {
      const fn = async () => {
        try {
          if (rating <= 0 || rating > 5) {
            throw Error('Rating must be between 1 and 5');
          }
          const placeDoc = doc(collection(db, 'places'), placeID);
          const ratingsCollection = collection(placeDoc, 'ratings');
          const mydoc = doc(ratingsCollection, userID);
          await setDoc(mydoc, { rating });
          _setRating(rating);
        } catch (error) {
          console.error(error);
        }
      };

      fn();
    },
    [_setRating],
  );

  return [rating, setRating];
};

export default useRating;
