import PenStrike from "./PenStrike";

/**
 * Displays a name as individual letters. Cancelled (matching) letters
 * are progressively struck through with a red pen animation.
 */
export default function NameRow({ letters, cancelled, revealedUpTo }) {
  return (
    <div className="mb-1.5 pl-4">
      <div className="inline-flex gap-3 flex-wrap items-baseline">
        {letters.map((ch, i) => {
          const isCancelled = cancelled.has(i);
          const pairIndex = isCancelled ? [...cancelled].indexOf(i) : -1;
          const showStrike = isCancelled && pairIndex <= revealedUpTo;

          return (
            <span
              key={i}
              className="relative inline-block transition-colors duration-300"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 26,
                fontWeight: 600,
                color: showStrike ? "rgba(200, 50, 50, 0.65)" : "#1a2a5e",
                letterSpacing: 3,
                lineHeight: 1.3,
              }}
            >
              {ch}
              {showStrike && <PenStrike />}
            </span>
          );
        })}
      </div>
    </div>
  );
}
