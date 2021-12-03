const getMostFrequentNum = (input: number[][]) => {
  return input
    .reduce(
      (acc, curr) =>
        (acc = acc.map((a: number, i: number) => {
          return a + curr[i];
        })),
      new Array(input[0].length).fill(0)
    )
    .map((pos) => (pos >= input.length / 2 ? 1 : 0));
};

/** Run part 1 of the day's challenge. */
export const runPart1 = (input: string[]) => {
  const binaryArray: number[] = [];
  const invertedArray: number[] = [];
  getMostFrequentNum(
    input.map((line) =>
      line
        .trim()
        .split("")
        .map((char) => Number(char))
    )
  ).forEach((pos) => {
    binaryArray.push(pos);
    invertedArray.push(pos === 1 ? 0 : 1);
  });
  return (
    parseInt(binaryArray.join(""), 2) * parseInt(invertedArray.join(""), 2)
  );
};
/** Run part 2 of the day's challenge. */
export const runPart2 = (input: string[]) => {
  const inputNums = input.map((line) =>
    line
      .trim()
      .split("")
      .map((char) => Number(char))
  );
  const measurements: number[][][] = [inputNums, inputNums];
  for (let i = 0; i < input[0].length; i++) {
    if (measurements[0].length > 1) {
      const oxygenFreq = getMostFrequentNum(measurements[0]);
      measurements[0] = measurements[0].filter(
        (item) => item[i] === oxygenFreq[i]
      );
    }
    if (measurements[1].length > 1) {
      const co2Freq = getMostFrequentNum(measurements[1]);
      measurements[1] = measurements[1].filter(
        (item) => item[i] !== co2Freq[i]
      );
    }
  }
  return measurements.reduce(
    (acc, curr) => acc * parseInt(curr[0].join(""), 2),
    1
  );
};
