import { db } from '@/services/firebase-services';
import { useAuthStore } from '@/store/useAuthStore';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useFavorite = (
  placeID: string,
): [boolean | null, () => Promise<void>, () => Promise<void>] => {
  const userID = useAuthStore((state) => state.user?.uid);
  const [isFavorite, setFavorite] = useState<boolean | null>(null);
  const favDoc = useMemo(
    () => doc(collection(db, 'favorites'), userID),
    [userID],
  );

  useEffect(() => {
    const fn = async () => {
      try {
        const docRef = await getDoc(favDoc);
        if (docRef.exists()) {
          if (docRef.data().favorites.includes(placeID)) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        } else {
          await setDoc(favDoc, { favorites: [] });
          setFavorite(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fn();
  }, [placeID, favDoc]);

  const addToFavorite = useCallback(async () => {
    try {
      await updateDoc(favDoc, { favorites: arrayUnion(placeID) });
      setFavorite(true);
    } catch (error) {
      console.error(error);
    }
  }, [placeID, favDoc]);

  const removeFromFavorites = useCallback(async () => {
    try {
      await updateDoc(favDoc, { favorites: arrayRemove(placeID) });
      setFavorite(false);
    } catch (error) {
      console.error(error);
    }
  }, [placeID, favDoc]);

  return [isFavorite, addToFavorite, removeFromFavorites];
};

export default useFavorite;
