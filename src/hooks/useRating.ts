import { auth, db } from '@/services/firebase-services';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useRating = (placeID: string): [number, (ratingArg: number) => void] => {
  const userID = useMemo<string>(() => auth.currentUser!.uid, []);
  const [rating, _setRating] = useState<number>(0);

  const myRatingDoc = useMemo(() => {
    const placeDoc = doc(collection(db, 'places'), placeID);
    const ratingsCollection = collection(placeDoc, 'ratings');
    return doc(ratingsCollection, userID);
  }, [placeID, userID]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const mydoc = await getDoc(myRatingDoc);
        if (mydoc.exists()) {
          _setRating(mydoc.data().rating);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [myRatingDoc]);

  const setRating = useCallback(
    (rating: number) => {
      const fn = async () => {
        try {
          if (rating <= 0 || rating > 5) {
            throw Error('Rating must be between 1 and 5');
          }
          await setDoc(myRatingDoc, { rating });
          _setRating(rating);
        } catch (error) {
          console.error(error);
        }
      };

      fn();
    },
    [myRatingDoc],
  );

  return [rating, setRating];
};

export default useRating;
