import { placeDataSchema, type Place, type SortType } from '@/schemas/Place';
import { db } from '@/services/firebase-services';
import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

/**
 * Fetch collection once hook
 *
 * refresh is a function that can refresh the data for you if not loading
 */
const usePlacesQuery = ({
  textQuery = '',
  sortBy = 'NEW',
  querylimit,
}: {
  textQuery?: string;
  sortBy?: SortType;
  querylimit: number;
}) => {
  const [data, setData] = useState<Array<Place> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const _collection = collection(db, 'places');
        let q = query(_collection);
        if (textQuery) {
          q = query(q, orderBy('titleUppercase', 'asc'));
        }
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

        if (textQuery) {
          q = query(
            q,
            startAt(textQuery.toUpperCase()),
            endAt(textQuery.toUpperCase() + '\uf8ff'),
          );
        }

        if (querylimit) {
          q = query(q, limit(querylimit));
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
  }, [sortBy, textQuery, querylimit]);

  return { data, loading, error };
};

export default usePlacesQuery;
