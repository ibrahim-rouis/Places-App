import { LoaderCircle } from 'lucide-react';

function ViewLoading() {
  return (
    <div className="flex h-32 w-full items-center justify-center gap-2">
      <LoaderCircle className="size-16 animate-spin" />
    </div>
  );
}
export default ViewLoading;
