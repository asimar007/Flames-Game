export const FLAMES = "FLAMES";

// One entry per letter: full label, the emoji shown under the answer,
// whether it's a happy outcome, and the confetti particle set.
export const RESULTS = {
  F: { name: "Friends", emoji: ":)", positive: false, confetti: ["👫", "🤝", "😄", "🎉", "🫂"] },
  L: { name: "Love", emoji: "♡ ♡ ♡", positive: true, confetti: ["❤️", "💕", "💘", "💝", "😍"] },
  A: { name: "Affection", emoji: "♡ ♡ ♡", positive: true, confetti: ["🥰", "💗", "🌸", "💞", "😘"] },
  M: { name: "Marriage", emoji: "♡ ♡ ♡", positive: true, confetti: ["💍", "💒", "👰", "🎊", "🥂"] },
  E: { name: "Enemy", emoji: ":(", positive: false, confetti: ["😤", "💢", "⚡", "🔥", "😡"] },
  S: { name: "Siblings", emoji: null, positive: false, confetti: ["😂", "😂", "😂", "😂", "🙃"] },
};
