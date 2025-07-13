import { useAuthListener } from '@/hooks/useAuthListener';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router';
import RouteGuard from './RouteGuard';
import Explore from '@/pages/Explore';
import Favorites from '@/pages/Favorites';
import CreatePlace from '@/pages/CreatePlace';
import Place from '@/pages/Place';

function RoutesConfig() {
  useAuthListener();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<RouteGuard requireAuth={true} redirectTo="/auth/login" />}
        >
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/create" element={<CreatePlace />} />
            <Route path="/place/:id" element={<Place />} />
          </Route>
        </Route>
        <Route element={<RouteGuard requireAuth={false} redirectTo="/" />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesConfig;
