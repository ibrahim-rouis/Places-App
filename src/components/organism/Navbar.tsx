import { Heart, Home, Map } from 'lucide-react';
import LogoutButton from '../molecules/LogoutButton';
import MyNavLink from '../molecules/MyNavLink';
import MySearchBar from '../molecules/SearchBar';
import NavBarTitle from '../molecules/NavBarTitle';

function Navbar() {
  return (
    <nav className="bg-secondary text-secondary-foreground w-win flex h-screen flex-col items-center gap-3 px-1 py-3 md:items-start md:px-2">
      <NavBarTitle />
      <MySearchBar />
      <div className="mt-4 flex flex-1 flex-col items-start gap-2">
        <MyNavLink to="/" title="Home" Icon={Home} />
        <MyNavLink to="/explore" title="Explore" Icon={Map} />
        <MyNavLink to="/favorites" title="Favorites" Icon={Heart} />
      </div>
      <LogoutButton />
    </nav>
  );
}
export default Navbar;
