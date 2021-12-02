export const runPart1 = (input, int = 1) =>
  input
    .map((element) => Number(element))
    .reduce(
      (prev, curr, index) => (input[index + int] > curr ? prev + 1 : prev),
      0
    );

export const runPart2 = (input) => runPart1(input, 3);
