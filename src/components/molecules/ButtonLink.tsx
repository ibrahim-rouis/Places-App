import { Link } from 'react-router';
import { Button } from '../ui/button';

interface IProps {
  to: string;
  title: string;
}

function ButtonLink({ to, title }: IProps) {
  return (
    <Link to={to} title={title}>
      <Button
        variant="link"
        className="text-sky-500 underline hover:cursor-pointer hover:no-underline"
      >
        {title}
      </Button>
    </Link>
  );
}
export default ButtonLink;
