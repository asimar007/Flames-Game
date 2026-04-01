export const globalAudio = typeof Audio !== "undefined" ? new Audio() : null;

let audioUnlocked = false;

export function unlockAudio() {
  if (!globalAudio || audioUnlocked) return;
  
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
