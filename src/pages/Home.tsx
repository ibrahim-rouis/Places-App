import ButtonLink from '@/components/molecules/ButtonLink';
import GoToCreate from '@/components/molecules/GoToCreate';
import usePlacesQuery from '@/hooks/usePlacesQuery';
import { BadgeAlert, CloudAlert, LoaderCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PlaceCard from '@/components/molecules/PlaceCard';
import Autoplay from 'embla-carousel-autoplay';

function Home() {
  const newPlaces = usePlacesQuery({ sortBy: 'NEW' });
  const topRatedPlaces = usePlacesQuery({ sortBy: 'TOP' });
  const mostViewedPlaces = usePlacesQuery({ sortBy: 'POPULAR' });
  return (
    <main className="relative">
      <GoToCreate />
      <div className="mt-15">
        <section>
          <div className="my-1 ml-2 flex items-center">
            <h2 className="text-xl font-bold">New Places</h2>
            <ButtonLink to="/explore" title="Show more" />
          </div>
          <div className="md:px-10">
            {newPlaces.loading && ViewLoading()}
            {newPlaces.error != null && ViewError()}
            {newPlaces.data && newPlaces.data.length == 0 && ViewEmpty()}
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
                  {newPlaces.data.map((place, index) => (
                    <CarouselItem
                      key={index}
                      className="xs:basis-1/2 lg:basis-1/3 xl:basis-1/5"
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
            {topRatedPlaces.loading && ViewLoading()}
            {topRatedPlaces.error != null && ViewError()}
            {topRatedPlaces.data &&
              topRatedPlaces.data.length == 0 &&
              ViewEmpty()}
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
                  {topRatedPlaces.data.map((place, index) => (
                    <CarouselItem
                      key={index}
                      className="xs:basis-1/2 lg:basis-1/3 xl:basis-1/5"
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
            {mostViewedPlaces.loading && ViewLoading()}
            {mostViewedPlaces.error != null && ViewError()}
            {mostViewedPlaces.data &&
              mostViewedPlaces.data.length == 0 &&
              ViewEmpty()}
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
                  {mostViewedPlaces.data.map((place, index) => (
                    <CarouselItem
                      key={index}
                      className="xs:basis-1/2 lg:basis-1/3 xl:basis-1/5"
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
function ViewLoading() {
  return (
    <div className="flex h-32 w-full items-center justify-center gap-2">
      <LoaderCircle className="size-16 animate-spin" />
    </div>
  );
}

function ViewError() {
  return (
    <div className="text-destructive flex h-32 flex-col items-center justify-center gap-2">
      <BadgeAlert className="size-8 shrink-0" />
      <p className="text-center">Something went wrong.</p>
    </div>
  );
}

function ViewEmpty() {
  return (
    <div className="text-foreground flex h-32 flex-col items-center justify-center gap-2">
      <CloudAlert className="size-8 shrink-0" />
      <p className="text-center">Nothing to show here.</p>
    </div>
  );
}
