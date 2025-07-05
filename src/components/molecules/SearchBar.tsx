import { Search } from 'lucide-react';
import { Input } from '../ui/input';

function MySearchBar() {
  return (
    <div className="relative mt-2 flex items-center hover:text-sky-500 md:mx-1 md:w-45">
      <Search className="size-7 md:absolute md:left-2 md:size-5" />
      <Input
        type="search"
        placeholder="Search"
        className="hidden md:block md:w-full md:p-2 md:pl-9"
      />
    </div>
  );
}
export default MySearchBar;
