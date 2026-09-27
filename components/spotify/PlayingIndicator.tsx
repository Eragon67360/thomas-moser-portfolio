const BAR_DELAYS = ["0s", "-2.2s", "-3.7s"];

/** Three bouncing equalizer bars. */
export function PlayingIndicator() {
  return (
    <span className="flex h-3.25 w-3.25 justify-between" aria-hidden="true">
      {BAR_DELAYS.map((delay) => (
        <span
          key={delay}
          className="h-full w-0.75 origin-bottom animate-equalizer rounded-[3px] bg-[#1ED760]"
          style={{ animationDelay: delay }}
        />
      ))}
    </span>
  );
}
