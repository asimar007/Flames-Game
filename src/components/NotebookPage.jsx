import { useRef, useState } from "react";
import { toPng } from "html-to-image";

/**
 * The notebook page container — handles the ruled paper look,
 * spiral binding holes, red margin, and date stamp.
 */
export default function NotebookPage({
  children,
  showSave = false,
  crushName = "",
}) {
  const notebookRef = useRef(null);
  const [saving, setSaving] = useState(false);

  async function handleSaveImage() {
    if (!notebookRef.current || saving) return;
    setSaving(true);
    notebookRef.current.classList.add("is-capturing");
    try {
      // First pass warms up font loading
      await toPng(notebookRef.current, {
        pixelRatio: 2,
        backgroundColor: "#fdf6e3",
        fetchRequestInit: { cache: "force-cache" },
      });
      // Second pass ensures fonts are embedded correctly
      const dataUrl2 = await toPng(notebookRef.current, {
        pixelRatio: 2,
        backgroundColor: "#fdf6e3",
      });
      const link = document.createElement("a");
      link.download = `${crushName ? crushName.toLowerCase() : "flames"}-flames.png`;
      link.href = dataUrl2;
      link.click();
    } finally {
      notebookRef.current.classList.remove("is-capturing");
      setSaving(false);
    }
  }

  return (
    <div
      ref={notebookRef}
      className="relative w-full max-w-lg"
      style={{
        minHeight: "var(--nb-min-height)",
        background: "#fdf6e3",
        borderRadius: "4px 12px 12px 4px",
        paddingTop: 28,
        paddingBottom: 32,
        paddingLeft: "var(--nb-pl)",
        paddingRight: "var(--nb-pr)",
        boxShadow: `-4px 0 0 #e8dcc8, -8px 0 0 #fdf6e3, -9px 0 0 #e8dcc8, -13px 0 0 #fdf6e3, -14px 0 0 #e8dcc8, 4px 4px 20px rgba(80,60,30,0.25), 0 0 0 1px rgba(80,60,30,0.1)`,
      }}
    >
      {/* Spiral binding holes */}
      <div className="absolute left-5 top-10 bottom-10 w-6 flex flex-col justify-between pointer-events-none z-10">
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className="w-3.5 h-3.5 rounded-full ml-0.5"
            style={{
              background: "#c8b99a",
              border: "1.5px solid rgba(80,60,30,0.2)",
              boxShadow: "inset 0 1px 3px rgba(80,60,30,0.3)",
            }}
          />
        ))}
      </div>

      {/* Ruled lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(100,140,200,0.13) 31px, rgba(100,140,200,0.13) 32px)`,
          backgroundPositionY: 28,
        }}
      />

      {/* Red margin line */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none z-0"
        style={{
          left: "var(--nb-margin)",
          width: 1.5,
          background: "rgba(220,80,80,0.28)",
        }}
      />

      {/* Date stamp */}
      <div
        className="absolute top-2 right-4 z-10"
        style={{
          fontSize: 13,
          color: "#2563eb",
        }}
      >
        {new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>

      {/* Page content */}
      <div className="relative z-10">{children}</div>

      {/* Save as Image — absolutely positioned so it never affects notebook height */}
      {showSave && (
        <div
          className="absolute z-10 bottom-5 flex justify-center hide-on-save"
          style={{ left: "var(--nb-pl)", right: "var(--nb-pr)" }}
        >
          <button
            onClick={handleSaveImage}
            disabled={saving}
            style={{
              fontSize: 13,
              fontStyle: "italic",
              color: saving ? "rgba(40,50,80,0.3)" : "rgba(40,50,80,0.4)",
              background: "transparent",
              border: "1px dashed rgba(40,50,80,0.2)",
              borderRadius: 6,
              padding: "5px 16px",
              cursor: saving ? "default" : "pointer",
              transition: "color 0.2s, border-color 0.2s",
              letterSpacing: "0.03em",
              fontFamily: "var(--font-hand)",
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.color = "rgba(40,50,80,0.75)";
                e.currentTarget.style.borderColor = "rgba(40,50,80,0.45)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(40,50,80,0.4)";
              e.currentTarget.style.borderColor = "rgba(40,50,80,0.2)";
            }}
          >
            {saving ? "saving…" : "save as image"}
          </button>
        </div>
      )}
    </div>
  );
}
