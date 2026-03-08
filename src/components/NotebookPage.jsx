/**
 * The notebook page container — handles the ruled paper look,
 * spiral binding holes, red margin, and date stamp.
 */
export default function NotebookPage({ children }) {
  return (
    <div
      className="relative w-full max-w-lg overflow-hidden"
      style={{
        minHeight: 680,
        background: "#fdf6e3",
        borderRadius: "4px 12px 12px 4px",
        padding: "28px 24px 32px 72px",
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
          left: 62,
          width: 1.5,
          background: "rgba(220,80,80,0.28)",
        }}
      />

      {/* Date stamp */}
      <div
        className="absolute top-2 right-4 z-10"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 13,
          color: "rgba(40,50,80,0.3)",
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
    </div>
  );
}
