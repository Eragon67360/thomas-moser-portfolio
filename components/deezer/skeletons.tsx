import { Skeleton } from "@heroui/react";

/** Same box as `TrackRow` (padding, cover size and two text lines) so the rows don't jump when data arrives. */
export function TrackRowsSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex w-full items-center gap-4 p-2">
          <Skeleton className="size-10 shrink-0 rounded-md sm:size-12 md:size-14 lg:size-20" />
          <div className="flex w-full flex-col">
            <Skeleton className="my-0.5 h-3 w-3/5 rounded-md md:h-4 lg:my-1 lg:h-4" />
            <Skeleton className="my-0.5 h-3 w-2/5 rounded-md md:h-4 lg:my-1 lg:h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Same box as `ArtistTile`; rendered as siblings so the panel wraps them exactly like the tiles. */
export function ArtistTilesSkeleton({ count }: { count: number }) {
  return Array.from({ length: count }, (_, i) => (
    <Skeleton key={i} className="aspect-square w-[14.44dvw] max-w-52 rounded-2xl" />
  ));
}
