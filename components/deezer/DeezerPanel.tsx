import { Card, ScrollShadow, Separator } from "@heroui/react";
import type { ReactNode } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";

const DEEZER_API_DOCS = "https://developers.deezer.com/api";

/** Card shell shared by the Deezer activity widgets. */
export function DeezerPanel({ title, children }: { title: ReactNode; children: ReactNode }) {
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
        <ExternalLink href={DEEZER_API_DOCS} className="text-accent hover:underline">
          Deezer API
        </ExternalLink>
      </Card.Footer>
    </Card>
  );
}
