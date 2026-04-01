import confetti from "canvas-confetti";

const RESULT_EMOJIS = {
  F: ["👫", "🤝", "😄", "🎉", "🫂"],
  L: ["❤️", "💕", "💘", "💝", "😍"],
  A: ["🥰", "💗", "🌸", "💞", "😘"],
  M: ["💍", "💒", "👰", "🎊", "🥂"],
  E: ["😤", "💢", "⚡", "🔥", "😡"],
  S: ["😂", "😂", "😂", "😂", "🙃"],
};

export function fireConfetti(letter) {
  const emojis = RESULT_EMOJIS[letter];
  if (!emojis) return;

  const scalar = 2;
  // Mac/Safari struggles with high number of custom DOM-based/canvas particles.
  const emojiShapes = emojis.map((text) => confetti.shapeFromText({ text, scalar }));
  // Mix in some standard shapes to make it performant and look fuller without the heavy cost
  const shapes = [...emojiShapes, 'circle', 'square'];

  const end = Date.now() + 3000; // fire for 3 seconds

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
      // Throttle firing to every 150ms instead of 16ms to avoid Safari lag
      setTimeout(frame, 150);
    }
  })();
}
