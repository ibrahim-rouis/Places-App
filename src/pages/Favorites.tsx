import PlaceCard from '@/components/molecules/PlaceCard';
import ViewEmpty from '@/components/molecules/ViewEmpty';
import ViewError from '@/components/molecules/ViewError';
import ViewLoading from '@/components/molecules/ViewLoading';
import useFavorites from '@/hooks/useFavorites';

function Favorites() {
  const favorites = useFavorites();

  return (
    <main>
      <h1 className="my-2 text-lg font-bold">Favorites</h1>
      {favorites.loading && <ViewLoading />}
      {favorites.error != null && <ViewError />}
      {favorites.data && favorites.data.length == 0 && <ViewEmpty />}
      <section className="xs:grid-cols-2 grid grid-cols-1 justify-center gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.data &&
          favorites.data.length >= 0 &&
          favorites.data.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
      </section>
    </main>
  );
}
export default Favorites;
