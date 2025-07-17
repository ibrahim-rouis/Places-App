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
import { Eye, Heart, MapPin } from 'lucide-react';
import { Rating } from '@smastrom/react-rating';
import useRating from '@/hooks/useRating';
import useViewPlace from '@/hooks/useViewPlace';
import { Button } from '@/components/ui/button';
import useFavorite from '@/hooks/useFavorite';

function Place() {
  const params = useParams();
  const placeID = useMemo(() => params.id!, [params]);
  const place = usePlace(placeID);
  const [rating, setRating] = useRating(placeID);
  const [isFavorite, addToFavorites, removeFromFavorites] =
    useFavorite(placeID);

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
        <article className="mx-auto max-w-2xl">
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
                {isFavorite == true && (
                  <Heart
                    className="ml-2 fill-pink-500 stroke-pink-700 hover:cursor-pointer hover:fill-pink-300"
                    onClick={removeFromFavorites}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between px-2 sm:px-1">
              {place.data.avgRating ? (
                <div className="flex items-center gap-1">
                  <Rating
                    value={place.data.avgRating}
                    readOnly
                    className="max-w-36 md:max-w-50"
                  />
                  <p className="text-base">{place.data.avgRating.toFixed(1)}</p>
                </div>
              ) : (
                <span className="text-muted">Not rated yet.</span>
              )}
              <p className="xs:text-base flex items-center gap-2 text-sm">
                <Eye className="xs:size-7 size-5" />
                <span>
                  {place.data.uniqueVisits ? place.data.uniqueVisits : 0}
                </span>
              </p>
            </div>
            <p className="my-3 text-base">{place.data.description}</p>
            <hr className="my-2" />
            <div className="flex flex-col items-center justify-center gap-2">
              <p>Rate this place</p>
              <Rating
                className="max-w-36 md:max-w-50"
                value={rating}
                onChange={(rating: number) => setRating(rating)}
              />
              {isFavorite == false && (
                <Button
                  className="my-2 bg-pink-500 hover:cursor-pointer hover:bg-pink-700"
                  onClick={addToFavorites}
                >
                  <Heart className="fill-white" />
                  <span>Add To Favorites</span>
                </Button>
              )}
            </div>
          </div>
        </article>
      </main>
    );
  }
}
export default Place;
