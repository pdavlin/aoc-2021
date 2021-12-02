const projectToRun = Deno.args[0];

console.log(`Running code for Day ${projectToRun} of Advent of Code 2021`);

let inputFiles = [];

for await (const file of Deno.readDir(projectToRun)) {
  if (file.name.startsWith("input") && file.name.endsWith(".txt")) {
    const fileContents = await Deno.readTextFile(
      `${projectToRun}/${file.name}`
    );
    inputFiles.push(fileContents.split("\r\n"));
  }
}

const startTime = Date.now();
await import(`./${projectToRun}/index.js`).then((module) =>
  console.log(`Part 1 result: ${module.runPart1(inputFiles[0])}`)
);
await import(`./${projectToRun}/index.js`).then((module) =>
  console.log(`Part 2 result: ${module.runPart2(inputFiles.at(-1))}`)
);

const endTime = Date.now();
console.log(`Runtime: ${(endTime - startTime) / 1000} seconds`);