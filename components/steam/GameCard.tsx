import { Card } from "@heroui/react";
import Image from "next/image";
import type { SteamGame } from "@/types/steam";
import { formatPlaytime } from "./format";

export function GameCard({ game }: { game: SteamGame }) {
  return (
    <Card className="py-4">
      <Card.Header className="px-4 pt-2 pb-0">
        <Card.Title className="text-xs font-bold uppercase">{game.name}</Card.Title>
        <Card.Description className="text-xs">{formatPlaytime(game.playtimeMinutes)}</Card.Description>
      </Card.Header>
      {game.headerImageUrl && (
        <Card.Content className="py-2">
          <Image
            src={game.headerImageUrl}
            alt={`${game.name} header`}
            width={300}
            height={140}
            className="rounded-xl object-cover"
          />
        </Card.Content>
      )}
    </Card>
  );
}
