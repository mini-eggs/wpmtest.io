function calcWords(arr) {
  return arr.reduce((total, curr) => {
    return curr.letter === " "
      ? [...total, []]
      : [...total.slice(0, total.length - 1), [...(total[total.length - 1] || []), curr]];
  }, []);
}

export function calcCorrectWords(arr) {
  let words = calcWords(arr);

  return Math.max(
    words.slice(0, words.length - 1).filter(word => word.reduce((t, c) => (c.correct ? t : false), true)).length,
    0
  );
}
