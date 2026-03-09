const font = "var(--font-hand)";
const ink = "var(--color-ink)";
const red = "var(--color-red)";
const muted = "var(--color-muted)";

function Strike({ children }) {
  return (
    <span
      style={{
        position: "relative",
        color: "rgba(200,50,50,0.75)",
        display: "inline-block",
      }}
    >
      {children}
      <svg
        style={{
          position: "absolute",
          left: -1,
          right: -1,
          top: "50%",
          width: "calc(100% + 2px)",
          height: 10,
          transform: "translateY(-50%)",
          overflow: "visible",
        }}
      >
        <line
          x1="0"
          y1="5"
          x2="100%"
          y2="4"
          stroke={red}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Circle({ children }) {
  return (
    <span style={{ position: "relative", display: "inline-block", color: ink }}>
      <span
        style={{
          position: "absolute",
          inset: "-5px -7px",
          border: `1.8px solid ${red}`,
          borderRadius: "50%",
          display: "block",
        }}
      />
      {children}
    </span>
  );
}

/**
 * Demo preview card shown below the input form
 * to illustrate what the game output looks like.
 */
export default function DemoPreview() {
  return (
    <div
      className="mt-6 w-full select-none pointer-events-none"
      style={{
        border: "1px dashed rgba(40,50,80,0.15)",
        borderRadius: 8,
        padding: "14px 18px",
        background: "rgba(40,50,80,0.02)",
      }}
    >
      {/* Header */}
      <p
        style={{
          fontFamily: font,
          fontSize: 11,
          color: muted,
          textAlign: "center",
          letterSpacing: 2,
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        ~ sample output ~
      </p>

      {/* Step 1 */}
      <p
        style={{
          fontFamily: font,
          fontSize: 12,
          color: muted,
          marginBottom: 4,
        }}
      >
        Step 1) Cancel common letters:
      </p>
      <div
        style={{
          display: "flex",
          gap: 8,
          fontFamily: font,
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: 3,
          color: ink,
          marginBottom: 2,
        }}
      >
        <span>R</span>
        <span>O</span>
        <span>M</span>
        <Strike>E</Strike>
        <span>O</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          fontFamily: font,
          fontSize: 21,
          fontWeight: 600,
          letterSpacing: 3,
          color: ink,
          marginBottom: 10,
        }}
      >
        <span>J</span>
        <span>U</span>
        <span>L</span>
        <span>I</span>
        <Strike>E</Strike>
        <span>T</span>
      </div>

      {/* Step 2 */}
      <p
        style={{
          fontFamily: font,
          fontSize: 12,
          color: muted,
          marginBottom: 2,
        }}
      >
        Step 2) Count remaining letters:
      </p>
      <div
        style={{ fontFamily: font, fontSize: 16, color: ink, marginBottom: 10 }}
      >
        Remaining ={" "}
        <span style={{ fontSize: 22, fontWeight: 700, color: red }}>9</span>
      </div>

      {/* Step 3 */}
      <p
        style={{
          fontFamily: font,
          fontSize: 12,
          color: muted,
          marginBottom: 6,
        }}
      >
        Step 3) Count &amp; cancel in FLAMES:
      </p>
      <div
        style={{
          display: "flex",
          gap: 10,
          fontFamily: font,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: 3,
          marginBottom: 10,
        }}
      >
        {["F", "L", "A", "M", "E", "S"].map((ch, i) =>
          i === 4 ? (
            <Circle key={i}>{ch}</Circle>
          ) : (
            <Strike key={i}>{ch}</Strike>
          ),
        )}
      </div>

      {/* Divider */}
      <hr
        style={{
          border: "none",
          borderTop: "1px dashed rgba(40,50,80,0.15)",
          marginBottom: 10,
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
