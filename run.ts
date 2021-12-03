const startTime = Date.now();

console.log("🎄 Advent of Code 2021 🎄\n-------------------------------------------");

Deno.args.length === 0 ? await runAll() : await runProject(Deno.args[0]);

/**
 * Run all projects in the current directory.
 */
async function runAll() {
  for await (const file of Deno.readDir(".")) {
    file.isDirectory &&
      Number(file.name) &&
      (await runProject(file.name, true));
  }
  getRuntime();
}

/**
 * Import and run the code for a specific project.
 * @param projectToRun project number to run
 * @param skipTimeCalc whether to skip calculating run time (when running all projects)
 */
async function runProject(projectToRun: string, skipTimeCalc = false) {
  console.log(`Day ${projectToRun}: https://adventofcode.com/2021/day/${projectToRun}`);

  const inputFiles: string[][] = [];
  // default to using typescript
  let moduleFileName = "index.ts"

  for await (const file of Deno.readDir(projectToRun)) {
    if (file.name.startsWith("input") && file.name.endsWith(".txt")) {
      const fileContents = await Deno.readTextFile(
        `${projectToRun}/${file.name}`
      );
      inputFiles.push(fileContents.split("\r\n"));
    }
    // if there's a js file, use that instead
    if (file.name.startsWith("index") && file.name.endsWith(".js")) {
      moduleFileName = file.name;
    }
  }

  await import(`./${projectToRun}/${moduleFileName}`).then((module) => {
    // Use the first input file
    console.log(`Part 1 result: ${module.runPart1(inputFiles[0])}`);
    // Use the last input file. should run properly for one or two input files,
    // corresponding roughly to one or two parts of the challenge.
    console.log(`Part 2 result: ${module.runPart2(inputFiles.at(-1))}`);
  });
  console.log('-------------------------------------------');

  !skipTimeCalc && getRuntime();
}

/** Calculate how long this dumb code took to run */
function getRuntime() {
  const endTime = Date.now();
  console.log(`Runtime: ${(endTime - startTime) / 1000} seconds\n(just as long as it takes for Santa to drop the gifts!)`);
}

console.log(`🎅: "Ho ho ho!"`);

export {};
