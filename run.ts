const startTime = Date.now();

console.log("🎄 Advent of Code 2021 🎄");

Deno.args.length === 0 ? await runAll() : await runProject(Deno.args[0]);

async function runAll() {
  for await (const file of Deno.readDir(".")) {
    file.isDirectory &&
      Number(file.name) &&
      (await runProject(file.name, true));
  }
  getRuntime();
}

async function runProject(projectToRun: string, runAll = false) {
  console.log(`Day ${projectToRun}`);

  const inputFiles: string[][] = [];

  for await (const file of Deno.readDir(projectToRun)) {
    if (file.name.startsWith("input") && file.name.endsWith(".txt")) {
      const fileContents = await Deno.readTextFile(
        `${projectToRun}/${file.name}`
      );
      inputFiles.push(fileContents.split("\r\n"));
    }
  }

  // default to using typescript
  let moduleFileName = "index.ts";
  for await (const file of Deno.readDir(projectToRun)) {
    // if there's a js file, use that instead
    if (file.name.startsWith("index") && file.name.endsWith(".js")) {
      moduleFileName = file.name;
    }
  }

  await import(`./${projectToRun}/${moduleFileName}`).then((module) => {
    console.log(`Part 1 result: ${module.runPart1(inputFiles[0])}`);
    console.log(`Part 2 result: ${module.runPart2(inputFiles.at(-1))}`);
  });

  !runAll && getRuntime();
}

function getRuntime() {
  const endTime = Date.now();
  console.log(`Runtime: ${(endTime - startTime) / 1000} seconds`);
}

console.log(`🎅: "Ho ho ho!"`);

export {};
