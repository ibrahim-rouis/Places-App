import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

function MySearchBar() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      params.append('q', searchText.trim());
      navigate(`/explore?${params}`);
    },
    [searchText, navigate],
  );

  return (
    <form
      onSubmit={onSubmit}
      className="relative mt-2 flex items-center hover:text-sky-500 md:mx-1 md:w-45 md:hover:text-inherit"
    >
      <Search className="size-7 md:absolute md:left-2 md:size-5" />
      <Input
        type="search"
        placeholder="Search"
        className="hidden md:block md:w-full md:p-2 md:pl-9"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <input type="submit" hidden disabled={!searchText.trim()} />
    </form>
  );
}
export default MySearchBar;
