export const globalAudio = typeof Audio !== "undefined" ? new Audio() : null;

let audioUnlocked = false;
let isMuted = false;

let audioCtx = null;
function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(mute) {
  isMuted = mute;
  if (globalAudio) {
    globalAudio.muted = mute;
    if (mute && !globalAudio.paused) {
      globalAudio.pause();
    }
  }
}

// Warm the HTTP cache so the result song starts instantly.
export function preloadAudio(letter) {
  if (typeof Audio === "undefined") return;
  new Audio(`/Audio/${letter}.mp3`).load();
}

export function unlockAudio() {
  if (!globalAudio || audioUnlocked) return;

  getAudioContext();

  // iOS/Safari blocks programmatic play() until the element has played once
  // from a user gesture, so play a silent clip here.
  globalAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
  globalAudio.play().then(() => {
    globalAudio.pause();
    globalAudio.currentTime = 0;
    audioUnlocked = true;
  }).catch(() => {});
}

// One oscillator swept f0 to f1, gain popped to peak then back to 0.
function beep(type, f0, f1, peak, dur) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(f1, t + dur);

  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(peak, t + dur / 5);
  gain.gain.linearRampToValueAtTime(0, t + dur);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

export const playScratch = () => beep("triangle", 150, 40, 0.2, 0.05);
export const playTick = () => beep("sine", 800, 400, 0.1, 0.05);
export const playEliminate = () => beep("square", 200, 50, 0.15, 0.1);
