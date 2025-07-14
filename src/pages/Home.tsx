import ButtonLink from '@/components/molecules/ButtonLink';
import GoToCreate from '@/components/molecules/GoToCreate';
import usePlacesQuery from '@/hooks/usePlacesQuery';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PlaceCard from '@/components/molecules/PlaceCard';
import Autoplay from 'embla-carousel-autoplay';
import ViewLoading from '@/components/molecules/ViewLoading';
import ViewEmpty from '@/components/molecules/ViewEmpty';
import ViewError from '@/components/molecules/ViewError';

function Home() {
  const newPlaces = usePlacesQuery({ sortBy: 'NEW', querylimit: 10 });
  const topRatedPlaces = usePlacesQuery({ sortBy: 'TOP', querylimit: 10 });
  const mostViewedPlaces = usePlacesQuery({
    sortBy: 'POPULAR',
    querylimit: 10,
  });
  return (
    <main className="relative">
      <GoToCreate />
      <div className="mt-2">
        <section>
          <div className="my-1 ml-2 flex items-center">
            <h2 className="text-xl font-bold">New Places</h2>
            <ButtonLink to="/explore" title="Show more" />
          </div>
          <div className="md:px-10">
            {newPlaces.loading && <ViewLoading />}
            {newPlaces.error != null && <ViewError />}
            {newPlaces.data && newPlaces.data.length == 0 && <ViewEmpty />}
            {newPlaces.data && newPlaces.data.length > 0 && (
              <Carousel
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                    stopOnFocusIn: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {newPlaces.data.map((place) => (
                    <CarouselItem
                      key={place.id}
                      className="xs:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <PlaceCard place={place} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            )}
          </div>
        </section>
        <section className="mt-4">
          <div className="my-1 ml-2 flex items-center">
            <h2 className="text-xl font-bold">Top Rated</h2>
            <ButtonLink to="/" title="Show more" />
          </div>
          <div className="md:px-10">
            {topRatedPlaces.loading && <ViewLoading />}
            {topRatedPlaces.error != null && <ViewError />}
            {topRatedPlaces.data && topRatedPlaces.data.length == 0 && (
              <ViewEmpty />
            )}
            {topRatedPlaces.data && topRatedPlaces.data.length > 0 && (
              <Carousel
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                    stopOnFocusIn: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {topRatedPlaces.data.map((place) => (
                    <CarouselItem
                      key={place.id}
                      className="xs:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <PlaceCard place={place} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            )}
          </div>
        </section>
        <section className="mt-4">
          <div className="my-1 ml-2 flex items-center">
            <h2 className="text-xl font-bold">Most Popular</h2>
            <ButtonLink to="/" title="Show more" />
          </div>
          <div className="md:px-10">
            {mostViewedPlaces.loading && <ViewLoading />}
            {mostViewedPlaces.error != null && <ViewError />}
            {mostViewedPlaces.data && mostViewedPlaces.data.length == 0 && (
              <ViewEmpty />
            )}
            {mostViewedPlaces.data && mostViewedPlaces.data.length > 0 && (
              <Carousel
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                    stopOnFocusIn: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {mostViewedPlaces.data.map((place) => (
                    <CarouselItem
                      key={place.id}
                      className="xs:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <PlaceCard place={place} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
export default Home;
