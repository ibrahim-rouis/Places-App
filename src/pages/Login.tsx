import AppTitle from '@/components/molecules/AppTitle';
import LoginForm from '@/components/organism/LoginForm';
import { Link } from 'react-router';

function Login() {
  return (
    <div className="m-auto max-w-100 px-5 md:mt-6 md:w-full md:px-4">
      <div className="mt-6 flex justify-center gap-2 text-4xl md:justify-start md:text-xl">
        <AppTitle />
      </div>
      <div className="mt-5">
        <p className="text-3xl font-bold md:text-4xl">
          Hello,
          <br />
          Welcome back!
        </p>
        <p className="text-muted-foreground mt-2 text-sm md:text-lg">
          Hey, welcome back to your special place!
        </p>
      </div>
      <div className="mt-2">
        <p className="text-foreground">
          Don't have an account?{' '}
          <Link
            className="text-sky-500 underline hover:text-sky-700 hover:no-underline"
            to="/auth/register"
          >
            Sign up
          </Link>
        </p>
      </div>
      <div className="mt-6 mb-10">
        <LoginForm />
      </div>
    </div>
  );
}
export default Login;
