export const runPart1 = (input) => {
  // horizontal, depth
  let storage = [0, 0];
  input.forEach((curr) =>
    curr.split(" ")[0] === "forward"
      ? (storage[0] = storage[0] + Number(curr.split(" ")[1]))
      : curr.split(" ")[0] === "up"
      ? (storage[1] = storage[1] - Number(curr.split(" ")[1]))
      : (storage[1] = storage[1] + Number(curr.split(" ")[1]))
  );
  return storage[0] * storage[1];
};

export const runPart2 = (input) => {
  // horizontal, depth, aim
  let storage = [0, 0, 0];
  input
    .map((line) => line.split(" "))
    .forEach((curr) => {
      if (curr[0] === "forward") {
        storage[0] = storage[0] + Number(curr[1]);
        storage[1] = storage[1] + storage[2] * Number(curr[1]);
      } else if (curr[0] === "up") {
        storage[2] = storage[2] - Number(curr[1]);
      } else {
        storage[2] = storage[2] + Number(curr[1]);
      }
    });
  return storage[0] * storage[1];
};
