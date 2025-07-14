import PlaceCard from '@/components/molecules/PlaceCard';
import { Input } from '@/components/ui/input';
import usePlacesQuery from '@/hooks/usePlacesQuery';
import { type SortType } from '@/schemas/Place';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ViewLoading from '@/components/molecules/ViewLoading';
import ViewError from '@/components/molecules/ViewError';
import ViewEmpty from '@/components/molecules/ViewEmpty';

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryText = useMemo(() => searchParams.get('q') ?? '', [searchParams]);
  const sortBy = useMemo<SortType>(
    () => (searchParams.get('sort') as SortType) ?? 'NEW',
    [searchParams],
  );
  const places = usePlacesQuery({
    textQuery: queryText,
    sortBy: sortBy,
    querylimit: 0,
  });
  return (
    <main>
      <h1 className="my-2 text-lg font-bold">Explore</h1>
      <aside className="my-5 flex flex-col items-center justify-center md:my-10 lg:flex-row">
        <Input
          value={queryText}
          className="max-w-xl md:text-lg"
          onChange={(e) =>
            setSearchParams((searchParams) => {
              searchParams.set('q', e.target.value);
              return searchParams;
            })
          }
          placeholder="Search"
        />
        <div className="mt-2 flex items-center gap-2 lg:mt-0 lg:ml-4">
          <label htmlFor="sortyBy">Sort by:</label>
          <Select
            value={sortBy}
            onValueChange={(value) =>
              setSearchParams((searchParams) => {
                searchParams.set('sort', value);
                return searchParams;
              })
            }
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort By</SelectLabel>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="TOP">Top rated</SelectItem>
                <SelectItem value="POPULAR">Most viewed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </aside>
      {places.loading && <ViewLoading />}
      {places.error != null && <ViewError />}
      {places.data && places.data.length == 0 && <ViewEmpty />}
      <section className="xs:grid-cols-2 grid grid-cols-1 justify-center gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {places.data &&
          places.data.length >= 0 &&
          places.data.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
      </section>
    </main>
  );
}
export default Explore;
