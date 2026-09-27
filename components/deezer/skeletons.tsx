import { Skeleton } from "@heroui/react";

export function TrackRowsSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-16 shrink-0 rounded-lg" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-5 w-3/5 rounded-lg" />
            <Skeleton className="h-5 w-2/5 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArtistTilesSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="size-32 rounded-lg" />
      ))}
    </div>
  );
}
