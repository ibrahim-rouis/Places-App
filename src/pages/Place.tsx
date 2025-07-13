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

function Place() {
  const params = useParams();
  const placeID = useMemo(() => params.id!, [params]);
  const place = usePlace(placeID);
  if (place.loading) {
    return <ViewLoading />;
  } else if (place.error) {
    return <ViewError />;
  } else if (!place.data) {
    return <ViewEmpty />;
  } else {
    return (
      <main>
        <article className="mx-auto max-w-xl">
          <div className="flex justify-center sm:p-14">
            <Carousel
              className="w-full max-w-lg"
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
            <div className="my-3 flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold">{place.data.title}</h1>
              <div className="text-muted-foreground flex items-center gap-1">
                <MapPin className="size-4" />
                <p>{place.data.location}</p>
              </div>
            </div>
            <p className="my-3 text-sm">{place.data.description}</p>
          </div>
        </article>
      </main>
    );
  }
}
export default Place;
