import { NavLink } from 'react-router';
import { Button } from '../ui/button';
import { type LucideIcon } from 'lucide-react';

interface IProps {
  to: string;
  title: string;
  Icon: LucideIcon;
}

function MyNavLink({ to, title, Icon }: IProps) {
  return (
    <NavLink to={to} title={title}>
      {({ isActive }) => (
        <Button
          variant="link"
          className={`${isActive ? 'text-sky-500' : ''} hover:text-sky-500`}
        >
          <Icon className={`${isActive ? 'fill-sky-100' : ''} size-7`} />{' '}
          <span className="hidden md:inline">{title}</span>
        </Button>
      )}
    </NavLink>
  );
}
export default MyNavLink;
