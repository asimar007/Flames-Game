/**
 * Find matching letter pairs between two names and cancel them out.
 * Returns the cancelled indices, remaining letters, and count.
 */
export function getMatchedPairs(n1, n2) {
  const a = [...n1.toUpperCase().replace(/[^A-Z]/g, "")];
  const b = [...n2.toUpperCase().replace(/[^A-Z]/g, "")];
  const cancelledA = new Set();
  const cancelledB = new Set();
  const pairs = [];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (!cancelledB.has(j) && a[i].toLowerCase() === b[j].toLowerCase() && !cancelledA.has(i)) {
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

/**
 * Simulate the FLAMES elimination process.
 * Counts through 6 letters, removing one each round,
 * until a single letter remains.
 */
export function getFlamesElimination(count) {
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
