import DemoPreview from "./DemoPreview";

/**
 * Two handwriting-style input fields for entering names,
 * plus the "Calculate" button.
 */
export default function InputForm({
  name1,
  name2,
  setName1,
  setName2,
  canPlay,
  onSubmit,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && canPlay) onSubmit();
  };

  const inputStyle = {
    fontSize: 28,
    textTransform: "uppercase",
    fontWeight: 600,
    color: "var(--color-ink)",
    borderBottomColor: "rgba(100,140,200,0.25)",
    padding: "2px 4px",
    letterSpacing: 6,
  };

  const handleFocus = (e) => (e.target.style.borderBottomColor = "#1a2a5e");
  const handleBlur = (e) =>
    (e.target.style.borderBottomColor = "rgba(100,140,200,0.25)");

  return (
    <div className="animate-[inkFadeIn_0.3s_ease_both]">
      <div className="mb-4 flex items-baseline gap-2 flex-wrap">
        <label
          className="text-lg whitespace-nowrap font-medium"
          style={{ color: "rgba(40,50,80,0.55)" }}
        >
          Your Name :
        </label>
        <input
          className="flex-1 min-w-[120px] border-0 border-b-2 bg-transparent outline-none transition-colors duration-200 placeholder:font-normal placeholder:normal-case"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter your name"
          value={name1}
          onChange={(e) => setName1(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>

      <div className="mb-4 flex items-baseline gap-2 flex-wrap">
        <label
          className="text-lg whitespace-nowrap font-medium"
          style={{ color: "rgba(40,50,80,0.55)" }}
        >
          Crush's Name :
        </label>
        <input
          className="flex-1 min-w-[120px] border-0 border-b-2 bg-transparent outline-none transition-colors duration-200 placeholder:font-normal placeholder:normal-case"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter crush's name"
          value={name2}
          onChange={(e) => setName2(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button
        className="block mx-auto mt-5 rounded-md px-9 py-2 tracking-wide cursor-pointer transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed hover:enabled:bg-[rgba(26,42,94,0.06)]"
        style={{
          fontSize: 19,
          fontWeight: 700,
          color: "var(--color-ink)",
          background: "transparent",
          border: "1.8px solid var(--color-ink)",
        }}
        disabled={!canPlay}
        onClick={onSubmit}
      >
        Calculate →
      </button>

      <DemoPreview />
    </div>
  );
}
