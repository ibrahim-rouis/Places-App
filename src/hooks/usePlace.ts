import { placeDataSchema, type Place } from '@/schemas/Place';
import { db } from '@/services/firebase-services';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

/**
 * Get place by ID
 */
const usePlace = (placeID: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<Place | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const mydoc = await getDoc(doc(collection(db, 'places'), placeID));
        if (mydoc.exists()) {
          const data = mydoc.data();
          data.id = mydoc.id;
          setData(placeDataSchema.parse(data));
        } else {
          setData(null);
        }
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [placeID]);

  return { loading, error, data };
};

export default usePlace;
