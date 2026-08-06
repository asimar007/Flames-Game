// Run: node src/utils/flamesLogic.test.js
import assert from "node:assert/strict";
import { getMatchedPairs, getFlamesElimination } from "./flamesLogic.js";

// Case folding + non-letter stripping
const m = getMatchedPairs("Romeo", "juliet!");
assert.deepEqual(m.lettersA, [..."ROMEO"]);
assert.deepEqual(m.lettersB, [..."JULIET"]);
assert.deepEqual([...m.cancelledA], [3], "only the E in ROMEO cancels");
assert.deepEqual([...m.cancelledB], [4], "only the E in JULIET cancels");
assert.equal(m.remainingCount, 9);

// Each letter cancels at most once, and only against an uncancelled partner
const dup = getMatchedPairs("AAA", "AB");
assert.equal(dup.pairs.length, 1, "one A on the right cancels exactly one A on the left");
assert.equal(dup.remainingCount, 3); // AA left + B right

// Elimination is a Josephus walk: order covers 5 letters, final is the 6th
for (let count = 1; count <= 12; count++) {
  const { order, finalIdx } = getFlamesElimination(count);
  assert.equal(order.length, 5, `count=${count} eliminates 5`);
  assert.equal(new Set(order).size, 5, `count=${count} has no repeats`);
  assert.ok(!order.includes(finalIdx), `count=${count} survivor is not eliminated`);
  assert.deepEqual([...order, finalIdx].sort(), [0, 1, 2, 3, 4, 5]);
}

// count===0 (perfect anagram) is guarded — the modulo would otherwise go negative
const zero = getFlamesElimination(0);
assert.equal(zero.order.length, 5);
assert.ok(!zero.order.includes(zero.finalIdx));
assert.equal(getMatchedPairs("listen", "silent").remainingCount, 0);

console.log("flamesLogic ok");
