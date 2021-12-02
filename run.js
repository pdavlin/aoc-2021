const projectToRun = Deno.args[0];

console.log(`Running project ${projectToRun}`);

let inputFiles = [];

for await (const file of Deno.readDir(projectToRun)) {
  if (file.name.startsWith("input") && file.name.endsWith(".txt")) {
    const fileContents = await Deno.readTextFile(
      `${projectToRun}/${file.name}`
    );
    inputFiles.push(fileContents.split("\r\n"));
  }
}

import(`./${projectToRun}/index.js`).then((module) =>
  console.log(`Part 1 result: ${module.runPart1(inputFiles[0])}`)
);
import(`./${projectToRun}/index.js`).then((module) =>
  console.log(`Part 2 result: ${module.runPart2(inputFiles.at(-1))}`)
);
