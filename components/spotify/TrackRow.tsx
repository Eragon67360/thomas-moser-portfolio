import Image from "next/image";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Track } from "@/types/spotify";

export function TrackRow({ track }: { track: Track }) {
  return (
    <ExternalLink
      href={track.songUrl}
      className="flex w-full items-center gap-4 rounded-lg p-2 transition-colors hover:bg-surface-hover"
    >
      <Image
        src={track.imageUrl}
        alt={`Album cover: ${track.title}`}
        width={80}
        height={80}
        className="size-10 shrink-0 rounded-md object-cover sm:size-12 md:size-14 lg:size-20"
      />
      <div className="flex min-w-0 flex-col justify-center text-xs md:text-sm lg:text-base">
        <p className="truncate font-semibold">{track.title}</p>
        <p className="truncate font-light opacity-80">{track.artist}</p>
      </div>
    </ExternalLink>
  );
}
