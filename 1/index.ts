export const runPart1 = (input: string[], int = 1) =>
  input
    .map((element) => Number(element))
    .reduce(
      (prev, curr, index) =>
        Number(input[index + int]) > curr ? prev + 1 : prev,
      0
    );

export const runPart2 = (input: string[]) => runPart1(input, 3);
