import PenStrike from "./PenStrike";

/**
 * Displays a name as individual letters. Cancelled (matching) letters
 * are progressively struck through with a red pen animation.
 */
export default function NameRow({ letters, cancelled, revealedUpTo, nameIndex = 0 }) {
  return (
    <div className="mb-1.5 pl-4">
      <div className="inline-flex gap-3 flex-wrap items-baseline">
        {letters.map((ch, i) => {
          const isCancelled = cancelled.has(i);
          const pairIndex = isCancelled ? [...cancelled].indexOf(i) : -1;
          // Each pair reveals name1 first (sub-step pairIndex*2), then name2 (pairIndex*2+1)
          const showStrike = isCancelled && (pairIndex * 2 + nameIndex) <= revealedUpTo;

          return (
            <span
              key={i}
              className="relative inline-block transition-colors duration-300"
              style={{
                fontSize: "var(--fs-name)",
                fontWeight: 600,
                color: showStrike ? "rgba(200, 50, 50, 0.65)" : "var(--color-ink)",
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
