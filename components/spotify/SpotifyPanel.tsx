import { Card, ScrollShadow, Separator } from "@heroui/react";
import type { ReactNode } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";

const SPOTIFY_API_DOCS = "https://developer.spotify.com/documentation/web-api";

/** Card shell shared by the Spotify activity widgets. */
export function SpotifyPanel({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <Card className="h-full w-full">
      <Card.Header>
        <Card.Title className="text-sm md:text-base lg:text-lg xl:text-xl">{title}</Card.Title>
      </Card.Header>
      <Separator />
      <Card.Content>
        <ScrollShadow hideScrollBar className="flex flex-wrap justify-center gap-4">
          {children}
        </ScrollShadow>
      </Card.Content>
      <Separator />
      <Card.Footer className="text-xs lg:text-base">
        Data fetched with&nbsp;
        <ExternalLink href={SPOTIFY_API_DOCS} className="text-accent hover:underline">
          Spotify API
        </ExternalLink>
      </Card.Footer>
    </Card>
  );
}
