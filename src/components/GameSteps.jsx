import NameRow from "./NameRow";
import FlamesRow from "./FlamesRow";
import ResultSection from "./ResultSection";

function Divider() {
  return (
    <hr
      className="my-3 border-0"
      style={{ borderTop: "1px dashed rgba(40,50,80,0.15)" }}
    />
  );
}

function StepLabel({ children }) {
  return (
    <p
      className="mb-1 pl-4 font-medium"
      style={{
        fontSize: 15,
        color: "var(--color-muted)",
      }}
    >
      {children}
    </p>
  );
}

// All game steps: letter matching, remaining count, elimination, result.
export default function GameSteps({
  phase,
  matchData,
  matchRevealIdx,
  name1,
  name2,
  elimHighlight,
  eliminatedSet,
  finalIdx,
  resultLetter,
  onReset,
}) {
  const showCount =
    phase === "counting" || phase === "eliminating" || phase === "result";
  const showElim = phase === "eliminating" || phase === "result";

  return (
    <div>
      <StepLabel>Step 1) Cancel common letters:</StepLabel>
      <NameRow
        letters={matchData.lettersA}
        cancelled={matchData.cancelledA}
        revealedUpTo={
          phase === "matching" ? matchRevealIdx : matchData.pairs.length * 2 - 1
        }
        nameIndex={0}
      />
      <NameRow
        letters={matchData.lettersB}
        cancelled={matchData.cancelledB}
        revealedUpTo={
          phase === "matching" ? matchRevealIdx : matchData.pairs.length * 2 - 1
        }
        nameIndex={1}
      />

      {showCount && (
        <>
          <Divider />
          <StepLabel>Step 2) Count remaining letters:</StepLabel>
          <div
            className="pl-4 my-2.5 animate-[inkFadeIn_0.4s_ease_both]"
            style={{
              fontSize: 20,
              color: "var(--color-ink)",
            }}
          >
            Remaining ={" "}
            <span
              className="underline"
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "var(--color-red)",
                textUnderlineOffset: 3,
              }}
            >
              {matchData.remainingCount}
            </span>
          </div>
        </>
      )}

      {showElim && (
        <>
          <Divider />
          <StepLabel>Step 3) Count &amp; cancel in FLAMES:</StepLabel>
          <FlamesRow
            eliminatedSet={eliminatedSet}
            currentHighlight={phase === "eliminating" ? elimHighlight : -1}
            finalIdx={finalIdx}
            phase={phase}
          />
        </>
      )}

      {phase === "result" && resultLetter && (
        <>
          <Divider />
          <ResultSection letter={resultLetter} name1={name1} name2={name2} />
          <button
            className="hide-on-save ink-btn block mx-auto mt-4 rounded-md border border-dashed px-6 py-1.5"
            style={{ fontSize: 16, fontWeight: 500 }}
            onClick={onReset}
          >
            try again?
          </button>
        </>
      )}
    </div>
  );
}
