/** "3d 4h" since a unix timestamp (seconds). */
export function formatTimeSince(unixSeconds: number, now = Date.now()): string {
  const elapsedHours = Math.max(0, Math.floor((now - unixSeconds * 1000) / 3_600_000));
  return `${Math.floor(elapsedHours / 24)}d ${elapsedHours % 24}h`;
}

export function formatPlaytime(minutes: number): string {
  return `Played ${Math.floor(minutes / 60)} hours`;
}
