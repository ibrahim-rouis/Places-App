import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div>
      <p>MainLayout</p>
      <Outlet />
    </div>
  );
}
export default MainLayout;
