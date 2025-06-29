import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <div>
      <p>AuthLayout</p>
      <Outlet />
    </div>
  );
}
export default AuthLayout;
