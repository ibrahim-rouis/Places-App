import ViewError from '@/components/molecules/ViewError';
import ViewLoading from '@/components/molecules/ViewLoading';
import usePlace from '@/hooks/usePlace';
import { useMemo } from 'react';
import { useParams } from 'react-router';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ViewEmpty from '@/components/molecules/ViewEmpty';
import { MapPin } from 'lucide-react';
import { Rating } from '@smastrom/react-rating';
import useRating from '@/hooks/useRating';
import useViewPlace from '@/hooks/useViewPlace';

function Place() {
  const params = useParams();
  const placeID = useMemo(() => params.id!, [params]);
  const place = usePlace(placeID);
  const [rating, setRating] = useRating(placeID);
  useViewPlace(placeID);

  if (place.loading) {
    return <ViewLoading />;
  } else if (place.error) {
    return <ViewError />;
  } else if (!place.data) {
    return <ViewEmpty />;
  } else {
    return (
      <main>
        <article className="mx-auto max-w-lg">
          <div className="flex justify-center sm:p-14">
            <Carousel
              className="bg-muted w-full max-w-lg rounded-lg p-1"
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                  stopOnFocusIn: true,
                }),
              ]}
            >
              <CarouselContent className="flex items-center">
                {place.data?.images.map((imageUrl, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <img src={imageUrl} className="w-full" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
          <div>
            <div className="mt-2 mb-3 flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold">{place.data.title}</h1>
              <div className="text-muted-foreground flex items-center gap-1">
                <MapPin className="size-4" />
                <p>{place.data.location}</p>
              </div>
            </div>
            <Rating
              className="max-w-36 md:max-w-50"
              value={rating}
              onChange={(rating: number) => setRating(rating)}
            />
            <p className="my-3 text-sm">{place.data.description}</p>
            <div>
              <p>
                Average rating:{' '}
                {place.data.avgRating
                  ? place.data.avgRating.toFixed(1)
                  : 'Not rated'}
              </p>
              <p>
                Unique Views:{' '}
                {place.data.uniqueVisits ? place.data.uniqueVisits : 0}
              </p>
            </div>
          </div>
        </article>
      </main>
    );
  }
}
export default Place;
