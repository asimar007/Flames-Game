import { FLAMES_FULL, POSITIVE_RESULTS, RESULT_EMOJI } from "../constants";

/**
 * Shows the final result: "Name1 & Name2 = Love/Friends/etc."
 * Includes a small decorative emoji based on the outcome.
 */
export default function ResultSection({ letter, name1, name2 }) {
  const label = FLAMES_FULL[letter];
  const emoji = RESULT_EMOJI[letter];
  const isPositive = POSITIVE_RESULTS.has(letter);

  return (
    <div className="mt-2 pl-4 animate-[inkFadeIn_0.6s_ease_both]">
      <div
        className="mb-1"
        style={{
          fontSize: 18,
          color: "rgba(40, 50, 80, 0.5)",
        }}
      >
        Answer:
      </div>

      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          className="text-xl"
          style={{ color: "var(--color-ink)" }}
        >
          {name1}
        </span>
        <span
          className="text-base"
          style={{ color: "var(--color-muted)" }}
        >
          &amp;
        </span>
        <span
          className="text-xl"
          style={{ color: "var(--color-ink)" }}
        >
          {name2}
        </span>
        <span
          className="text-base"
          style={{ color: "var(--color-muted)" }}
        >
          =
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "var(--color-red)",
            textDecoration: "underline",
            textDecorationStyle: "wavy",
            textDecorationColor: "rgba(200, 50, 50, 0.3)",
            textUnderlineOffset: 4,
          }}
        >
          {label}
        </span>
      </div>

      {emoji && (
        <div
          className="mt-2 text-sm"
          style={{
            color: isPositive ? "rgba(200, 50, 50, 0.3)" : "rgba(40,50,80,0.3)",
            letterSpacing: isPositive ? 4 : 0,
          }}
        >
          {emoji}
        </div>
      )}
    </div>
  );
}
