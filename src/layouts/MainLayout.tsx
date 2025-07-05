import Navbar from '@/components/organism/Navbar';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className="flex flex-row gap-2">
      <Navbar />
      <Outlet />
    </div>
  );
}
export default MainLayout;
