import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { useAuthStore } from '@/store/useAuthStore';
import { Outlet } from 'react-router';

function MainLayout() {
  const logout = useLogout();
  const email = useAuthStore((state) => state.user?.email);
  return (
    <div>
      <p>
        <p>Welcome {email}</p>
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </p>
      <Outlet />
    </div>
  );
}
export default MainLayout;
