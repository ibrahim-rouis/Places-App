import { useAuthStore } from '@/store/useAuthStore';
import { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

interface RouteGuardProps {
  requireAuth: boolean;
  redirectTo: string;
}

function RouteGuard({ requireAuth, redirectTo }: RouteGuardProps) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const isLoggedIn = useMemo(() => !!user, [user]);
  const location = useLocation();

  // TODO: Make a loading component
  if (loading) return <div>Loading...</div>;

  if (!isLoggedIn && requireAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (isLoggedIn && !requireAuth) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
export default RouteGuard;
