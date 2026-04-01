import { useEffect } from "react";
import { FLAMES_FULL, POSITIVE_RESULTS, RESULT_EMOJI } from "../constants";
import { fireConfetti } from "../utils/confetti";
import { globalAudio } from "../utils/audio";

export default function ResultSection({ letter, name1, name2 }) {
  useEffect(() => {
    if (globalAudio) {
      globalAudio.src = `/Audio/${letter}.mp3`;
      globalAudio.volume = 0.7;
      globalAudio.play().catch(() => {});
    }

    // Fire result-specific confetti after a short delay
    const t = setTimeout(() => fireConfetti(letter), 400);

    return () => {
      clearTimeout(t);
      if (globalAudio) {
        globalAudio.pause();
        globalAudio.currentTime = 0;
      }
    };
  }, [letter]);
  const label = FLAMES_FULL[letter];
  const emoji  = RESULT_EMOJI[letter];
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
            fontSize: "var(--fs-flames-final)",
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
          className="mt-2 text-xl"
          style={{ letterSpacing: isPositive ? 4 : 0 }}
        >
          {emoji}
        </div>
      )}
    </div>
  );
}
