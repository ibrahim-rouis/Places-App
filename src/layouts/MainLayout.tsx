import Navbar from '@/components/organism/Navbar';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';
import { useAuthStore } from '@/store/useAuthStore';
import { Outlet } from 'react-router';

function MainLayout() {
  const logout = useLogout();
  const email = useAuthStore((state) => state.user?.email);
  return (
    <div className="flex flex-row gap-2">
      <Navbar />
      <Outlet />
    </div>
  );
}
export default MainLayout;
