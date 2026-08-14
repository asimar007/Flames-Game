// Cancel each shared letter once, returning the cancelled indices and what's left.
export function getMatchedPairs(n1, n2) {
  const a = [...n1.toUpperCase().replace(/[^A-Z]/g, "")];
  const b = [...n2.toUpperCase().replace(/[^A-Z]/g, "")];
  const cancelledA = new Set();
  const cancelledB = new Set();
  const pairs = [];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (!cancelledB.has(j) && a[i] === b[j]) {
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

// Josephus walk over FLAMES: count off `count` letters, strike one, repeat until one survives.
export function getFlamesElimination(count) {
  // count === 0 would make the modulo go negative, so use a fixed order.
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
