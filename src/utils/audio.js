export const globalAudio = typeof Audio !== "undefined" ? new Audio() : null;

let audioUnlocked = false;
let isMuted = false;

// AudioContext for synthesized SFX
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

export function getIsMuted() {
  return isMuted;
}

// Preload audio and keep it in cache
const preloadedAudio = {};
export function preloadAudio(letter) {
  if (typeof Audio === "undefined") return;
  if (!preloadedAudio[letter]) {
    const a = new Audio(`/Audio/${letter}.mp3`);
    a.preload = "auto";
    a.load();
    preloadedAudio[letter] = a;
  }
}

export function unlockAudio() {
  if (!globalAudio || audioUnlocked) return;
  
  getAudioContext(); // Initialize AC

  // Play a silent base64 audio to unlock the audio element on iOS/Safari
  // Without this, play() will be blocked when called programmatically later.
  globalAudio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
  globalAudio.play().then(() => {
    globalAudio.pause();
    globalAudio.currentTime = 0;
    audioUnlocked = true;
  }).catch(() => {
    // Ignore errors that might occur
  });
}

export function stopGlobalAudio() {
  if (!globalAudio || globalAudio.paused) return;
  
  globalAudio.pause();
  globalAudio.currentTime = 0;
}

// Synthesized Sound Effects
export function playScratch() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05); // sharp drop
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

export function playTick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05); // quick chirp
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

export function playEliminate() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'square';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1); // lower pop
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}
