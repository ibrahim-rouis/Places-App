import { placeDataSchema, type Place } from '@/schemas/Place';
import { db } from '@/services/firebase-services';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

type SortType = 'NEW' | 'TOP' | 'POPULAR';

/**
 * Fetch collection once hook
 *
 * refresh is a function that can refresh the data for you if not loading
 */
const usePlacesQuery = ({ sortBy }: { sortBy: SortType }) => {
  const [data, setData] = useState<Array<Place> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const _collection = collection(db, 'places');
        let q = query(_collection, limit(10));
        if (sortBy == 'NEW') {
          q = query(q, orderBy('createdAt', 'desc'));
        } else if (sortBy == 'TOP') {
          q = query(
            q,
            where('avgRating', '!=', null),
            orderBy('avgRating', 'desc'),
          );
        } else if (sortBy == 'POPULAR') {
          q = query(
            q,
            where('uniqueVisits', '!=', null),
            orderBy('uniqueVisits', 'desc'),
          );
        }
        const docs = await getDocs(q);
        setData(
          docs.docs.map((place) => {
            const data = place.data();
            data.id = place.id;
            return placeDataSchema.parse(data);
          }),
        );
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [sortBy]);

  return { data, loading, error };
};

export default usePlacesQuery;
