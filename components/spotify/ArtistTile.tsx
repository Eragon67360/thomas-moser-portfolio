import Image from "next/image";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { Artist } from "@/types/spotify";

export function ArtistTile({ artist }: { artist: Artist }) {
  return (
    <ExternalLink
      href={artist.artistUrl}
      className="relative block aspect-square w-[14.44dvw] max-w-52 overflow-hidden rounded-2xl"
    >
      <Image src={artist.imageUrl} alt={`Artist: ${artist.name}`} fill sizes="208px" className="object-cover" />
      <p className="absolute inset-x-1 bottom-1 hidden truncate rounded-xl border border-white/20 bg-black/40 px-2 py-1 text-center text-xs text-white/80 backdrop-blur-md sm:block md:text-sm lg:text-base">
        {artist.name}
      </p>
    </ExternalLink>
  );
}
