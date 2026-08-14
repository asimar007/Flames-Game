import NameRow from "./NameRow";
import FlamesRow from "./FlamesRow";

const font = "var(--font-hand)";
const ink = "var(--color-ink)";
const red = "var(--color-red)";
const muted = "var(--color-muted)";

const stepLabel = { fontFamily: font, fontSize: 12, color: muted, marginBottom: 4 };

// Sample output card. Uses the real NameRow/FlamesRow so it can't drift from the game.
export default function DemoPreview() {
  return (
    <div
      className="mt-6 w-full select-none pointer-events-none"
      style={{
        border: "1px dashed rgba(40,50,80,0.15)",
        borderRadius: 8,
        padding: "14px 18px",
        background: "rgba(40,50,80,0.02)",
        // Scale the shared rows down to sample size.
        "--fs-name": "21px",
        "--fs-flames": "21px",
        "--fs-flames-final": "21px",
      }}
    >
      {/* Header */}
      <p
        style={{
          ...stepLabel,
          fontSize: 11,
          textAlign: "center",
          letterSpacing: 2,
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        ~ sample output ~
      </p>

      {/* Step 1 — ROMEO / JULIET with the shared E cancelled */}
      <p style={stepLabel}>Step 1) Cancel common letters:</p>
      <NameRow letters={[..."ROMEO"]} cancelled={new Set([3])} revealedUpTo={Infinity} />
      <NameRow letters={[..."JULIET"]} cancelled={new Set([4])} revealedUpTo={Infinity} />

      {/* Step 2 */}
      <p style={{ ...stepLabel, marginTop: 10, marginBottom: 2 }}>
        Step 2) Count remaining letters:
      </p>
      <div style={{ fontFamily: font, fontSize: 16, color: ink, marginBottom: 10 }}>
        Remaining ={" "}
        <span style={{ fontSize: 22, fontWeight: 700, color: red }}>9</span>
      </div>

      {/* Step 3 — every letter struck but E */}
      <p style={{ ...stepLabel, marginBottom: 6 }}>Step 3) Count &amp; cancel in FLAMES:</p>
      <FlamesRow
        eliminatedSet={new Set([0, 1, 2, 3, 5])}
        currentHighlight={-1}
        finalIdx={4}
        phase="result"
      />

      {/* Divider */}
      <hr
        style={{
          border: "none",
          borderTop: "1px dashed rgba(40,50,80,0.15)",
          margin: "10px 0",
        }}
      />

      {/* Answer */}
      <div style={{ fontFamily: font, textAlign: "center" }}>
        <span style={{ fontSize: 13, color: muted }}>Answer: </span>
        <span style={{ fontSize: 17, color: ink }}>ROMEO &amp; JULIET = </span>
        <span style={{ fontSize: 22, fontWeight: 700, color: red }}>Enemy</span>
      </div>
    </div>
  );
}
