import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { PlusIcon } from 'lucide-react';

function GoToCreate() {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      className="text-foreground hover:text-background fixed right-8 bottom-4 z-10 aspect-square h-16 rounded-full border-none bg-green-500 shadow hover:bg-green-700"
      onClick={() => navigate('/create')}
    >
      <PlusIcon className="size-5" />
    </Button>
  );
}
export default GoToCreate;
