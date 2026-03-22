export function PostSkeleton() {
  return (
    <div className="w-full bg-card-post rounded-[12px] border border-edge p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-4 w-28 rounded bg-edge" />
        <div className="h-4 w-20 rounded bg-edge" />
        <div className="h-4 w-24 rounded bg-edge" />
      </div>
      <div className="h-5 w-3/4 rounded bg-edge" />
      <div className="h-4 w-full rounded bg-edge" />
      <div className="h-4 w-5/6 rounded bg-edge" />
      <div className="h-6 w-6 rounded-full bg-edge mt-1" />
    </div>
  );
}