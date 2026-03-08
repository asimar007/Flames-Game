import { FLAMES } from "../constants";

/**
 * Displays the six FLAMES letters with animated elimination.
 * Highlights the current counting position and circles the final result.
 */
export default function FlamesRow({
  eliminatedSet,
  currentHighlight,
  finalIdx,
  phase,
}) {
  return (
    <div className="inline-flex gap-1 py-1 ml-4">
      {[...FLAMES].map((ch, i) => {
        const isEliminated = eliminatedSet.has(i);
        const isHighlight = currentHighlight === i && !isEliminated;
        const isFinal = phase === "result" && finalIdx === i;

        return (
          <span
            key={i}
            className="relative inline-block transition-all duration-200"
            style={{
              fontSize: isFinal ? 34 : 28,
              fontWeight: 700,
              color: isEliminated ? "rgba(200, 50, 50, 0.5)" : "var(--color-ink)",
              letterSpacing: 6,
              lineHeight: 1.4,
              background: isHighlight
                ? "rgba(30, 60, 160, 0.06)"
                : "transparent",
              borderRadius: 4,
              padding: "0 2px",
            }}
          >
            {ch}

            {/* Strike-through for eliminated letters */}
            {isEliminated && (
              <svg
                className="absolute overflow-visible"
                style={{
                  left: -3,
                  right: -3,
                  top: "50%",
                  width: "calc(100% + 6px)",
                  height: 14,
                  transform: "translateY(-50%)",
                }}
              >
                <line
                  x1="0"
                  y1="7"
                  x2="100%"
                  y2="6"
                  stroke="#c83232"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-[penStrike_0.25s_ease-out_forwards]"
                  style={{ strokeDasharray: 40, strokeDashoffset: 0 }}
                />
              </svg>
            )}

            {/* Circle around the final surviving letter */}
            {isFinal && (
              <svg
                className="absolute pointer-events-none overflow-visible"
                style={{
                  left: -8,
                  top: -6,
                  width: "calc(100% + 16px)",
                  height: "calc(100% + 12px)",
                }}
              >
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="48%"
                  ry="46%"
                  fill="none"
                  stroke="#c83232"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="animate-[penCircle_0.4s_ease-out_forwards]"
                  style={{ strokeDasharray: 120, strokeDashoffset: 0 }}
                />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}
