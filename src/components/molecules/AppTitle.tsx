import { TreePalm } from 'lucide-react';

interface IProps {
  iconOnly?: boolean;
}

function AppTitle({ iconOnly = false }: IProps) {
  return (
    <div className="flex items-center">
      <TreePalm className="size-30 shrink-0 md:size-min" />
      {!iconOnly && <h1 className="shrink-0">Places App</h1>}
    </div>
  );
}
export default AppTitle;
