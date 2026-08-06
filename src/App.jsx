import { useState } from "react";
import NotebookPage from "./components/NotebookPage";
import InputForm from "./components/InputForm";
import GameSteps from "./components/GameSteps";
import { useFlamesGame } from "./hooks/useFlamesGame";

/**
 * Root component for the FLAMES game.
 * All logic lives in useFlamesGame hook; UI is composed from
 * NotebookPage, InputForm, and GameSteps.
 */
export default function App() {
  const [isMuted, setIsMuted] = useState(false);
  const game = useFlamesGame();

  return (
    <div className="relative min-h-screen flex items-start sm:items-center justify-center px-3 py-6 sm:p-6">
      {/* Blurred background layer */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px)",
          transform: "scale(1.05)",
        }}
      />
      <NotebookPage
        showSave={game.phase === "result"}
        crushName={game.name2.trim()}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      >
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
          <span style={{ color: "var(--color-red)" }}>♡</span> let the letters
          decide <span style={{ color: "var(--color-red)" }}>♡</span>
        </p>

        {/* Input phase */}
        {game.phase === "input" && <InputForm {...game} onSubmit={game.startGame} />}

        {/* Game animation phases */}
        {game.phase !== "input" && game.matchData && (
          <GameSteps
            {...game}
            name1={game.name1.trim()}
            name2={game.name2.trim()}
            onReset={game.resetGame}
          />
        )}
      </NotebookPage>
    </div>
  );
}
