import { useState, useEffect, useRef, useCallback } from "react";

const FLAMES_FULL = {
  F: "Friends",
  L: "Love",
  A: "Affection",
  M: "Marriage",
  E: "Enemy",
  S: "Siblings",
};
const FLAMES = "FLAMES";

function getMatchedPairs(n1, n2) {
  const a = [...n1.toLowerCase().replace(/[^a-z]/g, "")];
  const b = [...n2.toLowerCase().replace(/[^a-z]/g, "")];
  const cancelledA = new Set();
  const cancelledB = new Set();
  const pairs = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (!cancelledB.has(j) && a[i] === b[j] && !cancelledA.has(i)) {
        cancelledA.add(i);
        cancelledB.add(j);
        pairs.push({ ai: i, bj: j, letter: a[i] });
        break;
      }
    }
  }
  const remainingCount =
    a.length - cancelledA.size + (b.length - cancelledB.size);
  return {
    pairs,
    cancelledA,
    cancelledB,
    lettersA: a,
    lettersB: b,
    remainingCount,
  };
}

function getFlamesElimination(count) {
  if (count === 0) return { order: [0, 2, 4, 1, 3], finalIdx: 5 };
  let letters = [0, 1, 2, 3, 4, 5];
  let idx = 0;
  const order = [];
  while (letters.length > 1) {
    idx = (idx + count - 1) % letters.length;
    order.push(letters[idx]);
    letters.splice(idx, 1);
    if (idx === letters.length) idx = 0;
  }
  return { order, finalIdx: letters[0] };
}

/* ── Handwritten name letters with red pen strike ── */
function NameRow({ letters, cancelled, revealedUpTo, label }) {
  return (
    <div className="mb-1.5 pl-4">
      <span
        className="text-base mr-2.5 font-medium select-none"
        style={{
          fontFamily: "'Caveat', cursive",
          color: "rgba(40, 50, 80, 0.45)",
        }}
      >
        {label}:
      </span>
      <div className="inline-flex gap-0.5 flex-wrap items-baseline">
        {letters.map((ch, i) => {
          const isCancelled = cancelled.has(i);
          const pairIndex = isCancelled ? [...cancelled].indexOf(i) : -1;
          const showStrike = isCancelled && pairIndex <= revealedUpTo;
          return (
            <span
              key={i}
              className="relative inline-block transition-colors duration-300"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 26,
                fontWeight: 600,
                color: showStrike ? "rgba(200, 50, 50, 0.65)" : "#1a2a5e",
                letterSpacing: 3,
                lineHeight: 1.3,
              }}
            >
              {ch}
              {showStrike && (
                <svg
                  className="absolute overflow-visible"
                  style={{
                    left: -2,
                    right: -2,
                    top: "50%",
                    width: "calc(100% + 4px)",
                    height: 12,
                    transform: "translateY(-50%)",
                  }}
                >
                  <line
                    x1="0"
                    y1="6"
                    x2="100%"
                    y2="5"
                    stroke="#c83232"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="animate-[penStrike_0.25s_ease-out_forwards]"
                    style={{ strokeDasharray: 30, strokeDashoffset: 0 }}
                  />
                </svg>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── FLAMES letters written on paper ── */
function FlamesRow({ eliminatedSet, currentHighlight, finalIdx, phase }) {
  return (
    <div className="inline-flex gap-1 py-1 ml-4">
      {[...FLAMES].map((ch, i) => {
        const isEliminated = eliminatedSet.has(i);
        const isHighlight = currentHighlight === i && !isEliminated;
        const isFinal = phase === "result" && finalIdx === i;
        return (
          <span
            key={i}
            className="relative inline-block transition-all duration-200"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: isFinal ? 34 : 28,
              fontWeight: 700,
              color: isEliminated ? "rgba(200, 50, 50, 0.5)" : "#1a2a5e",
              letterSpacing: 6,
              lineHeight: 1.4,
              background: isHighlight
                ? "rgba(30, 60, 160, 0.06)"
                : "transparent",
              borderRadius: 4,
              padding: "0 2px",
            }}
          >
            {ch}
            {isEliminated && (
              <svg
                className="absolute overflow-visible"
                style={{
                  left: -3,
                  right: -3,
                  top: "50%",
                  width: "calc(100% + 6px)",
                  height: 14,
                  transform: "translateY(-50%)",
                }}
              >
                <line
                  x1="0"
                  y1="7"
                  x2="100%"
                  y2="6"
                  stroke="#c83232"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-[penStrike_0.25s_ease-out_forwards]"
                  style={{ strokeDasharray: 40, strokeDashoffset: 0 }}
                />
              </svg>
            )}
            {isFinal && (
              <svg
                className="absolute pointer-events-none overflow-visible"
                style={{
                  left: -8,
                  top: -6,
                  width: "calc(100% + 16px)",
                  height: "calc(100% + 12px)",
                }}
              >
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="48%"
                  ry="46%"
                  fill="none"
                  stroke="#c83232"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="animate-[penCircle_0.4s_ease-out_forwards]"
                  style={{ strokeDasharray: 120, strokeDashoffset: 0 }}
                />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}

/* ── The result written in pen ── */
function ResultSection({ letter, name1, name2 }) {
  const label = FLAMES_FULL[letter];
  return (
    <div className="mt-2 pl-4 animate-[inkFadeIn_0.6s_ease_both]">
      <div
        className="mb-1"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 18,
          color: "rgba(40, 50, 80, 0.5)",
        }}
      >
        Answer:
      </div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          className="text-xl"
          style={{ fontFamily: "'Caveat', cursive", color: "#1a2a5e" }}
        >
          {name1}
        </span>
        <span
          className="text-base"
          style={{
            fontFamily: "'Caveat', cursive",
            color: "rgba(40,50,80,0.4)",
          }}
        >
          &amp;
        </span>
        <span
          className="text-xl"
          style={{ fontFamily: "'Caveat', cursive", color: "#1a2a5e" }}
        >
          {name2}
        </span>
        <span
          className="text-base"
          style={{
            fontFamily: "'Caveat', cursive",
            color: "rgba(40,50,80,0.4)",
          }}
        >
          =
        </span>
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 32,
            fontWeight: 700,
            color: "#c83232",
            textDecoration: "underline",
            textDecorationStyle: "wavy",
            textDecorationColor: "rgba(200, 50, 50, 0.3)",
            textUnderlineOffset: 4,
          }}
        >
          {label}
        </span>
      </div>

      {(letter === "L" || letter === "A" || letter === "M") && (
        <div
          className="mt-2 text-sm tracking-widest"
          style={{
            fontFamily: "'Caveat', cursive",
            color: "rgba(200, 50, 50, 0.3)",
          }}
        >
          ♡ ♡ ♡
        </div>
      )}
      {letter === "E" && (
        <div
          className="mt-2 text-sm"
          style={{
            fontFamily: "'Caveat', cursive",
            color: "rgba(40,50,80,0.3)",
          }}
        >
          :(
        </div>
      )}
      {letter === "F" && (
        <div
          className="mt-2 text-sm"
          style={{
            fontFamily: "'Caveat', cursive",
            color: "rgba(40,50,80,0.3)",
          }}
        >
          :)
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════ MAIN ══════════════════════════ */
export default function App() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [phase, setPhase] = useState("input");
  const [matchData, setMatchData] = useState(null);
  const [matchRevealIdx, setMatchRevealIdx] = useState(-1);
  const [elimOrder, setElimOrder] = useState([]);
  const [elimRevealIdx, setElimRevealIdx] = useState(-1);
  const [elimHighlight, setElimHighlight] = useState(-1);
  const [finalIdx, setFinalIdx] = useState(-1);
  const [resultLetter, setResultLetter] = useState(null);
  const timerRef = useRef(null);

  const resetGame = () => {
    clearTimeout(timerRef.current);
    setName1("");
    setName2("");
    setPhase("input");
    setMatchData(null);
    setMatchRevealIdx(-1);
    setElimOrder([]);
    setElimRevealIdx(-1);
    setElimHighlight(-1);
    setFinalIdx(-1);
    setResultLetter(null);
  };

  const startGame = useCallback(() => {
    const a = name1.trim();
    const b = name2.trim();
    if (!a || !b) return;
    const data = getMatchedPairs(a, b);
    setMatchData(data);
    setMatchRevealIdx(-1);
    setPhase("matching");
  }, [name1, name2]);

  useEffect(() => {
    if (phase !== "matching" || !matchData) return;
    const total = matchData.pairs.length;
    if (total === 0) {
      timerRef.current = setTimeout(() => setPhase("counting"), 600);
      return;
    }
    let idx = 0;
    function next() {
      if (idx >= total) {
        timerRef.current = setTimeout(() => setPhase("counting"), 800);
        return;
      }
      setMatchRevealIdx(idx);
      idx++;
      timerRef.current = setTimeout(next, 500);
    }
    timerRef.current = setTimeout(next, 400);
    return () => clearTimeout(timerRef.current);
  }, [phase, matchData]);

  useEffect(() => {
    if (phase !== "counting") return;
    timerRef.current = setTimeout(() => {
      const remaining = matchData.remainingCount;
      const { order, finalIdx: fi } = getFlamesElimination(remaining);
      setElimOrder(order);
      setFinalIdx(fi);
      setResultLetter(FLAMES[fi]);
      setElimRevealIdx(-1);
      setPhase("eliminating");
    }, 1600);
    return () => clearTimeout(timerRef.current);
  }, [phase, matchData]);

  useEffect(() => {
    if (phase !== "eliminating") return;
    const remaining = matchData.remainingCount;
    let elimStep = 0;
    let alive = [0, 1, 2, 3, 4, 5];
    let countIdx = 0;

    function eliminateNext() {
      if (elimStep >= elimOrder.length) {
        setElimHighlight(-1);
        timerRef.current = setTimeout(() => setPhase("result"), 500);
        return;
      }
      let subCount = 0;
      function countTick() {
        if (subCount >= remaining) {
          const target = alive[countIdx % alive.length];
          setElimRevealIdx(elimStep);
          setElimHighlight(-1);
          alive = alive.filter((x) => x !== target);
          elimStep++;
          if (alive.length > 0) countIdx = countIdx % alive.length;
          timerRef.current = setTimeout(eliminateNext, 450);
          return;
        }
        setElimHighlight(alive[countIdx % alive.length]);
        subCount++;
        countIdx++;
        timerRef.current = setTimeout(countTick, 90);
      }
      countTick();
    }
    timerRef.current = setTimeout(eliminateNext, 300);
    return () => clearTimeout(timerRef.current);
  }, [phase, elimOrder, matchData]);

  const canPlay = name1.trim().length > 0 && name2.trim().length > 0;
  const eliminatedSet = new Set(
    elimRevealIdx >= 0 ? elimOrder.slice(0, elimRevealIdx + 1) : [],
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');

        @keyframes penStrike {
          from { stroke-dashoffset: 30; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes penCircle {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes inkFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Root - kraft paper background */}
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "#c8b99a", fontFamily: "'Caveat', cursive" }}
      >
        {/* Notebook page */}
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

          {/* Ruled lines via pseudo-element */}
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

          {/* Date */}
          <div
            className="absolute top-2 right-4 text-xs z-10"
            style={{
              fontFamily: "'Caveat', cursive",
              color: "rgba(40,50,80,0.3)",
              fontSize: 13,
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>

          {/* Page content */}
          <div className="relative z-10">
            <h1
              className="text-center mb-0.5 tracking-widest"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 32,
                fontWeight: 700,
                color: "#1a2a5e",
                marginLeft: -48,
              }}
            >
              F.L.A.M.E.S
            </h1>
            <p
              className="text-center mb-5"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 15,
                color: "rgba(40,50,80,0.35)",
                marginLeft: -48,
              }}
            >
              ~ the love calculator ~
            </p>

            {/* ── INPUT PHASE ── */}
            {phase === "input" && (
              <div className="animate-[inkFadeIn_0.3s_ease_both]">
                <div className="mb-4 flex items-baseline gap-2 flex-wrap">
                  <label
                    className="text-lg whitespace-nowrap font-medium"
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "rgba(40,50,80,0.55)",
                    }}
                  >
                    Name 1 :
                  </label>
                  <input
                    className="flex-1 min-w-[120px] border-0 border-b-2 bg-transparent outline-none transition-colors duration-200 placeholder:font-normal"
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#1a2a5e",
                      borderBottomColor: "rgba(100,140,200,0.25)",
                      padding: "2px 4px",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = "#1a2a5e")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(100,140,200,0.25)")
                    }
                    placeholder="write here..."
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && canPlay && startGame()
                    }
                    autoFocus
                  />
                </div>
                <div className="mb-4 flex items-baseline gap-2 flex-wrap">
                  <label
                    className="text-lg whitespace-nowrap font-medium"
                    style={{
                      fontFamily: "'Caveat', cursive",
                      color: "rgba(40,50,80,0.55)",
                    }}
                  >
                    Name 2 :
                  </label>
                  <input
                    className="flex-1 min-w-[120px] border-0 border-b-2 bg-transparent outline-none transition-colors duration-200 placeholder:font-normal"
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#1a2a5e",
                      borderBottomColor: "rgba(100,140,200,0.25)",
                      padding: "2px 4px",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = "#1a2a5e")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(100,140,200,0.25)")
                    }
                    placeholder="write here..."
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && canPlay && startGame()
                    }
                  />
                </div>
                <button
                  className="block mx-auto mt-5 rounded-md px-9 py-2 tracking-wide cursor-pointer transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed hover:enabled:bg-[rgba(26,42,94,0.06)]"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#1a2a5e",
                    background: "transparent",
                    border: "1.8px solid #1a2a5e",
                  }}
                  disabled={!canPlay}
                  onClick={startGame}
                >
                  Calculate →
                </button>
              </div>
            )}

            {/* ── GAME PHASES ── */}
            {phase !== "input" && matchData && (
              <div>
                {/* Step 1: Matching */}
                <p
                  className="mt-4 mb-1 pl-4 font-medium"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: 15,
                    color: "rgba(40,50,80,0.4)",
                  }}
                >
                  Step 1) Cancel common letters:
                </p>
                <NameRow
                  letters={matchData.lettersA}
                  cancelled={matchData.cancelledA}
                  revealedUpTo={
                    phase === "matching"
                      ? matchRevealIdx
                      : matchData.pairs.length - 1
                  }
                  label={name1.trim()}
                />
                <NameRow
                  letters={matchData.lettersB}
                  cancelled={matchData.cancelledB}
                  revealedUpTo={
                    phase === "matching"
                      ? matchRevealIdx
                      : matchData.pairs.length - 1
                  }
                  label={name2.trim()}
                />

                {/* Step 2: Count */}
                {(phase === "counting" ||
                  phase === "eliminating" ||
                  phase === "result") && (
                  <>
                    <hr
                      className="my-3 border-0"
                      style={{
                        borderTop: "1px dashed rgba(40,50,80,0.15)",
                      }}
                    />
                    <p
                      className="mb-1 pl-4 font-medium"
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: 15,
                        color: "rgba(40,50,80,0.4)",
                      }}
                    >
                      Step 2) Count remaining letters:
                    </p>
                    <div
                      className="pl-4 my-2.5 animate-[inkFadeIn_0.4s_ease_both]"
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: 20,
                        color: "#1a2a5e",
                      }}
                    >
                      Remaining ={" "}
                      <span
                        className="underline"
                        style={{
                          fontSize: 28,
                          fontWeight: 700,
                          color: "#c83232",
                          textUnderlineOffset: 3,
                        }}
                      >
                        {matchData.remainingCount}
                      </span>
                    </div>
                  </>
                )}

                {/* Step 3: FLAMES elimination */}
                {(phase === "eliminating" || phase === "result") && (
                  <>
                    <hr
                      className="my-3 border-0"
                      style={{
                        borderTop: "1px dashed rgba(40,50,80,0.15)",
                      }}
                    />
                    <p
                      className="mb-1 pl-4 font-medium"
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: 15,
                        color: "rgba(40,50,80,0.4)",
                      }}
                    >
                      Step 3) Count &amp; cancel in FLAMES:
                    </p>
                    <FlamesRow
                      eliminatedSet={eliminatedSet}
                      currentHighlight={
                        phase === "eliminating" ? elimHighlight : -1
                      }
                      finalIdx={finalIdx}
                      phase={phase}
                    />
                  </>
                )}

                {/* Result */}
                {phase === "result" && resultLetter && (
                  <>
                    <hr
                      className="my-3 border-0"
                      style={{
                        borderTop: "1px dashed rgba(40,50,80,0.15)",
                      }}
                    />
                    <ResultSection
                      letter={resultLetter}
                      name1={name1.trim()}
                      name2={name2.trim()}
                    />
                    <button
                      className="block mx-auto mt-4 rounded-md px-6 py-1.5 cursor-pointer transition-all duration-200 hover:opacity-100"
                      style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "rgba(40,50,80,0.4)",
                        background: "transparent",
                        border: "1px dashed rgba(40,50,80,0.2)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#1a2a5e";
                        e.target.style.borderColor = "#1a2a5e";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "rgba(40,50,80,0.4)";
                        e.target.style.borderColor = "rgba(40,50,80,0.2)";
                      }}
                      onClick={resetGame}
                    >
                      try again?
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
