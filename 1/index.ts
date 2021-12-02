/** Run part 1 of the day's challenge. */
export const runPart1 = (input: string[], int = 1) =>
  input
    .map((element) => Number(element))
    .reduce(
      (prev, curr, index) =>
        Number(input[index + int]) > curr ? prev + 1 : prev,
      0
    );

/** Run part 1 of the day's challenge. */
export const runPart2 = (input: string[]) => runPart1(input, 3);
