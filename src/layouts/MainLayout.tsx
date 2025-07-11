import Navbar from '@/components/organism/Navbar';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className="flex flex-row gap-2">
      <Navbar />
      <div className="max-h-screen w-full overflow-y-auto p-2 md:p-4">
        <Outlet />
      </div>
    </div>
  );
}
export default MainLayout;
