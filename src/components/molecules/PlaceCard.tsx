import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Place } from '@/schemas/Place';
import { MapPin } from 'lucide-react';

interface IProps {
  place: Place;
}

function PlaceCard({ place }: IProps) {
  return (
    <Card className="aspect-square">
      <CardHeader>
        <CardTitle className="text-lg">{place.title}</CardTitle>
        <CardDescription>
          <p>{place.description.slice(0, 35) + '...'}</p>
          <div className="mt-2 flex items-center gap-1">
            <MapPin className="size-4" />
            <p>{place.location}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img className="aspect-square object-cover" src={place.images[0]} />
      </CardContent>
    </Card>
  );
}
export default PlaceCard;
