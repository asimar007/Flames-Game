import { useState, useEffect, useRef, useCallback } from "react";
import { getMatchedPairs, getFlamesElimination } from "../utils/flamesLogic";
import { FLAMES } from "../constants";

/**
 * Custom hook that manages the entire FLAMES game lifecycle:
 * input → matching → counting → eliminating → result
 */
export function useFlamesGame() {
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

  const canPlay = name1.trim().length > 0 && name2.trim().length > 0;

  const eliminatedSet = new Set(
    elimRevealIdx >= 0 ? elimOrder.slice(0, elimRevealIdx + 1) : [],
  );

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

  // Phase 1: Reveal matched letter pairs one by one
  useEffect(() => {
    if (phase !== "matching" || !matchData) return;
    const total = matchData.pairs.length;

    if (total === 0) {
      timerRef.current = setTimeout(() => setPhase("counting"), 600);
      return;
    }

    // Each pair has 2 sub-steps: first cross name1 letter, then name2 letter
    const totalSteps = total * 2;
    let idx = 0;
    function next() {
      if (idx >= totalSteps) {
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

  // Phase 2: Show remaining count, then prepare elimination
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

  // Phase 3: Animate FLAMES letter elimination
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

  return {
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
  };
}
