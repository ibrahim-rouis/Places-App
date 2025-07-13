import { placeDataSchema, type Place } from '@/schemas/Place';
import { db } from '@/services/firebase-services';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

/**
 * Get place by ID
 */
const usePlace = (placeIDArg: string) => {
  const PlaceID = useMemo(() => placeIDArg, [placeIDArg]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<Place | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const mydoc = await getDoc(doc(collection(db, 'places'), PlaceID));
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
  }, [PlaceID]);

  return { loading, error, data };
};

export default usePlace;
