import { Outlet } from 'react-router';
import authLogo from '@/assets/auth-logo.webp';
import authLogoMobile from '@/assets/auth-logo-mobile.webp';

function AuthLayout() {
  return (
    <div className="mx-auto h-svh max-w-4xl items-center justify-center md:flex md:p-6">
      <div className="md:grid md:grid-cols-2">
        <main>
          <Outlet />
        </main>
        <aside className="mt-4 flex justify-center md:h-full">
          <img
            className="aspect-auto w-70 rounded-xl object-cover md:w-full"
            src={authLogo}
            srcSet={`${authLogoMobile} 400w, ${authLogo} 1000w`}
            sizes="(max-width: 768px) 400px, 1000px"
            alt="Authentication logo"
          />
        </aside>
      </div>
    </div>
  );
}
export default AuthLayout;
