import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { Outlet } from 'react-router';

function MainLayout() {
  const logout = useLogout();

  return (
    <div>
      <p>
        MainLayout{' '}
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </p>
      <Outlet />
    </div>
  );
}
export default MainLayout;
