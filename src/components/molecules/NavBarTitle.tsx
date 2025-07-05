import { TreePalm } from 'lucide-react';

function NavBarTitle() {
  return (
    <div className="gap-2 md:flex md:items-center">
      <TreePalm className="size-10 shrink-0 md:size-7" />
      <h1 className="hidden md:block">Places</h1>
    </div>
  );
}
export default NavBarTitle;
