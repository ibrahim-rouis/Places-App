import { useNavigate } from 'react-router';
import { Button } from '../ui/button';

function GoToCreate() {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      className="text-foreground hover:text-background fixed top-4 right-4 bg-green-500 hover:bg-green-700"
      onClick={() => navigate('/create')}
    >
      Create Place
    </Button>
  );
}
export default GoToCreate;
