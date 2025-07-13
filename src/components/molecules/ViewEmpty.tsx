import { CloudAlert } from 'lucide-react';

function ViewEmpty() {
  return (
    <div className="text-foreground flex h-32 flex-col items-center justify-center gap-2">
      <CloudAlert className="size-8 shrink-0" />
      <p className="text-center">Nothing to show here.</p>
    </div>
  );
}
export default ViewEmpty;
