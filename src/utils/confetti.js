import confetti from "canvas-confetti";
import { RESULTS } from "../constants";

export function fireConfetti(letter) {
  const emojis = RESULTS[letter]?.confetti;
  if (!emojis) return;

  const scalar = 2;
  // Safari chokes on many emoji particles, so mix cheap shapes in to look full.
  const emojiShapes = emojis.map((text) => confetti.shapeFromText({ text, scalar }));
  const shapes = [...emojiShapes, 'circle', 'square'];

  const end = Date.now() + 3000;

  (function frame() {
    // Left cannon
    confetti({
      particleCount: 8,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      shapes,
      scalar,
      gravity: 0.8,
      decay: 0.93,
      ticks: 120,
    });

    // Right cannon
    confetti({
      particleCount: 8,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      shapes,
      scalar,
      gravity: 0.8,
      decay: 0.93,
      ticks: 120,
    });

    if (Date.now() < end) {
      // 150ms instead of a rAF frame — Safari lags at 16ms.
      setTimeout(frame, 150);
    }
  })();
}
