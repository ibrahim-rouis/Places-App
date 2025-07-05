import { Heart, Home, LogOut, Map, Search, TreePalm } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

function Navbar() {
  return (
    <nav className="bg-secondary text-secondary-foreground w-win flex h-screen flex-col items-center gap-3 px-1 py-3 md:items-start md:px-2">
      <div className="gap-2 md:flex md:items-center">
        <TreePalm className="size-10 shrink-0 md:size-7" />
        <h1 className="hidden md:block">Places</h1>
      </div>
      <div className="relative mt-2 flex items-center hover:text-sky-500 md:mx-1 md:w-45">
        <Search className="size-7 md:absolute md:left-2 md:size-5" />
        <Input
          type="search"
          placeholder="Search"
          className="hidden md:block md:w-full md:p-2 md:pl-9"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col items-start gap-2">
        <NavLink to={'/'} title="Home">
          {({ isActive }) => (
            <Button
              variant="link"
              className={`${isActive ? 'text-sky-500' : ''} hover:text-sky-500`}
            >
              <Home className={`${isActive ? 'fill-sky-100' : ''} size-7`} />{' '}
              <span className="hidden md:inline">Home</span>
            </Button>
          )}
        </NavLink>
        <NavLink to={'/explore'} title="Explore">
          {({ isActive }) => (
            <Button
              variant="link"
              className={`${isActive ? 'text-sky-500' : ''} hover:text-sky-500`}
            >
              <Map className={`${isActive ? 'fill-sky-100' : ''} size-7`} />{' '}
              <span className="hidden md:inline">Explore</span>
            </Button>
          )}
        </NavLink>
        <NavLink to={'/favorites'} title="Favorites">
          {({ isActive }) => (
            <Button
              variant="link"
              className={`${isActive ? 'text-pink-500' : ''} hover:text-pink-500`}
            >
              <Heart className={`${isActive ? 'fill-pink-100' : ''} size-7`} />{' '}
              <span className="hidden md:inline">Favorites</span>
            </Button>
          )}
        </NavLink>
      </div>
      <Button variant="default" title="Log out" className="mb-2 w-full">
        <LogOut />
        <span className="hidden md:inline">Log out</span>
      </Button>
    </nav>
  );
}
export default Navbar;
