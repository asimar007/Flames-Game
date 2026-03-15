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
  const shapes = emojis.map((text) => confetti.shapeFromText({ text, scalar }));

  const end = Date.now() + 4000; // fire for 4 seconds

  (function frame() {
    // Left cannon
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      shapes,
      scalar,
      gravity: 0.8,
      decay: 0.93,
      ticks: 80,
    });

    // Right cannon
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      shapes,
      scalar,
      gravity: 0.8,
      decay: 0.93,
      ticks: 80,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
