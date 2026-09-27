import { Avatar, Card } from "@heroui/react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import type { SteamPlayer } from "@/types/steam";
import { formatTimeSince } from "./format";

export function SteamProfileCard({ player }: { player: SteamPlayer }) {
  return (
    <Card className="w-full max-w-85">
      <Card.Header className="flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <Avatar.Image src={player.avatarUrl} alt={player.personaName} />
            <Avatar.Fallback>{player.personaName.slice(0, 2)}</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            {player.realName && <p className="text-sm leading-none font-semibold">{player.realName}</p>}
            <p className="text-sm tracking-tight text-muted">{player.personaName}</p>
          </div>
        </div>
        <ExternalLink
          href={player.profileUrl}
          className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Profile
        </ExternalLink>
      </Card.Header>
      <Card.Content className="text-sm text-muted">
        <p>Status: {player.status}</p>
        <p>{player.currentGame ? `Playing - ${player.currentGame} 😆` : "Not playing currently"}</p>
      </Card.Content>
      <Card.Footer className="flex gap-3 text-sm text-muted">
        {player.countryCode && (
          <p>
            <span className="font-semibold">Country:</span> {player.countryCode}
          </p>
        )}
        {player.lastLogoff && (
          <p>
            <span className="font-semibold">Connected:</span> {formatTimeSince(player.lastLogoff)} ago
          </p>
        )}
      </Card.Footer>
    </Card>
  );
}
