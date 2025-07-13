import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Place } from '@/schemas/Place';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

interface IProps {
  place: Place;
}

function PlaceCard({ place }: IProps) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/place/${place.id}`)}
      className="hover:cursor-pointer"
    >
      <CardContent>
        <img className="aspect-square object-cover" src={place.images[0]} />
      </CardContent>
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
    </Card>
  );
}
export default PlaceCard;
