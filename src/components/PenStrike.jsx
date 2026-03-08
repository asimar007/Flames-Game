/**
 * Animated red pen strike-through line drawn over a letter.
 */
export default function PenStrike({ width = 4, height = 12 }) {
  return (
    <svg
      className="absolute overflow-visible"
      style={{
        left: -(width / 2),
        right: -(width / 2),
        top: "50%",
        width: `calc(100% + ${width}px)`,
        height,
        transform: "translateY(-50%)",
      }}
    >
      <line
        x1="0"
        y1={height / 2}
        x2="100%"
        y2={height / 2 - 1}
        stroke="#c83232"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="animate-[penStrike_0.25s_ease-out_forwards]"
        style={{ strokeDasharray: 30, strokeDashoffset: 0 }}
      />
    </svg>
  );
}
