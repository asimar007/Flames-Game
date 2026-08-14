import DemoPreview from "./DemoPreview";

// The two name fields plus the Calculate button.
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

  const fields = [
    ["Your Name", "Enter your name", name1, setName1, true],
    ["Crush's Name", "Enter crush's name", name2, setName2, false],
  ];

  return (
    <div className="animate-[inkFadeIn_0.3s_ease_both]">
      {fields.map(([label, placeholder, value, setValue, isFirst]) => (
        <div key={label} className="mb-4 flex items-baseline gap-2 flex-wrap">
          <label
            className="text-lg whitespace-nowrap font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            {label} :
          </label>
          <input
            className="name-input flex-1 min-w-30 border-0 border-b-2 bg-transparent outline-none transition-colors duration-200 placeholder:font-normal placeholder:normal-case"
            style={{
              fontSize: "var(--fs-input)",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--color-ink)",
              padding: "2px 4px",
              letterSpacing: "var(--fs-input-spacing)",
            }}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            autoFocus={isFirst}
          />
        </div>
      ))}

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
