import { placeDataSchema, type Place } from '@/schemas/Place';
import { auth, db } from '@/services/firebase-services';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

const useFavorites = () => {
  const userID = useMemo(() => auth.currentUser!.uid, []);
  const favoritesDoc = useMemo(() => {
    return doc(collection(db, 'favorites'), userID);
  }, [userID]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<Array<Place> | null>(null);

  useEffect(() => {
    const fn = async () => {
      try {
        const favData = await getDoc(favoritesDoc);
        if (favData.exists()) {
          const favoritesIDs = favData.data().favorites;
          if (favoritesIDs) {
            const favPlaces: Array<Place> = [];
            for (const id of favoritesIDs) {
              try {
                const placeDoc = await getDoc(
                  doc(collection(db, 'places'), id),
                );
                if (placeDoc.exists()) {
                  const data = placeDoc.data();
                  data.id = placeDoc.id;
                  favPlaces.push(placeDataSchema.parse(data));
                }
              } catch (error) {
                console.error(error);
                continue;
              }
            }
            setData(favPlaces);
          } else {
            setData([]);
          }
        } else {
          setData([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fn();
  }, [favoritesDoc]);

  return { data, loading, error };
};

export default useFavorites;
