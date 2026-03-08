import { NotebookPage, InputForm, GameSteps } from "./components";
import { useFlamesGame } from "./hooks/useFlamesGame";

/**
 * Root component for the FLAMES game.
 * All logic lives in useFlamesGame hook; UI is composed from
 * NotebookPage, InputForm, and GameSteps.
 */
export default function App() {
  const {
    name1,
    name2,
    setName1,
    setName2,
    phase,
    matchData,
    matchRevealIdx,
    elimHighlight,
    eliminatedSet,
    finalIdx,
    resultLetter,
    canPlay,
    startGame,
    resetGame,
  } = useFlamesGame();

  return (
    <>
      <style>{`
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
        input::placeholder { letter-spacing: normal; }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "#c8b99a", fontFamily: "'Caveat', cursive" }}
      >
        <NotebookPage>
          {/* Title */}
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

          {/* Input phase */}
          {phase === "input" && (
            <InputForm
              name1={name1}
              name2={name2}
              setName1={setName1}
              setName2={setName2}
              canPlay={canPlay}
              onSubmit={startGame}
            />
          )}

          {/* Game animation phases */}
          {phase !== "input" && matchData && (
            <GameSteps
              phase={phase}
              matchData={matchData}
              matchRevealIdx={matchRevealIdx}
              name1={name1.trim()}
              name2={name2.trim()}
              elimHighlight={elimHighlight}
              eliminatedSet={eliminatedSet}
              finalIdx={finalIdx}
              resultLetter={resultLetter}
              onReset={resetGame}
            />
          )}
        </NotebookPage>
      </div>
    </>
  );
}
