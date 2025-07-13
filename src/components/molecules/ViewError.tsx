import { BadgeAlert } from 'lucide-react';

function ViewError() {
  return (
    <div className="text-destructive flex h-32 flex-col items-center justify-center gap-2">
      <BadgeAlert className="size-8 shrink-0" />
      <p className="text-center">Something went wrong.</p>
    </div>
  );
}
export default ViewError;
