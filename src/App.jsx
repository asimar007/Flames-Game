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
      <div
        className="min-h-screen flex items-start sm:items-center justify-center px-3 py-6 sm:p-6"
        style={{ background: "#c8b99a" }}
      >
        <NotebookPage showSave={phase === "result"} crushName={name2.trim()}>
          {/* Title */}
          <h1
            className="text-center mb-0.5 tracking-widest"
            style={{
              fontSize: "var(--fs-title)",
              fontWeight: 700,
              color: "var(--color-ink)",
              marginLeft: "var(--nb-title-offset)",
            }}
          >
            F.L.A.M.E.S
          </h1>
          <p
            className="text-center mb-5"
            style={{
              fontSize: 14,
              color: "rgba(40,50,80,0.35)",
              marginLeft: "var(--nb-title-offset)",
            }}
          >
            <span style={{ color: "var(--color-red)" }}>♡</span> let the letters decide <span style={{ color: "var(--color-red)" }}>♡</span>
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
