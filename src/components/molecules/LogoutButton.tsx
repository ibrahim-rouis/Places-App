import { useLogout } from '@/hooks/useLogout';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

function LogoutButton() {
  const logout = useLogout();
  return (
    <Button
      variant="default"
      title="Log out"
      className="mb-2 w-full"
      onClick={logout}
    >
      <LogOut />
      <span className="hidden md:inline">Log out</span>
    </Button>
  );
}
export default LogoutButton;
