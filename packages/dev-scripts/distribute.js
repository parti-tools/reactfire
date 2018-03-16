const shelljs = require("shelljs");
const path = require("path");
const { bin, WORKING_DIRECTORY } = require("./_bin");

let moduleDir = WORKING_DIRECTORY;
let moduleName = require(path.resolve(WORKING_DIRECTORY, "package.json")).name;
let packageList = shelljs.ls("../");
for (let possibleDependee of packageList) {
  if (possibleDependee === path.basename(moduleDir)) {
    continue;
  }
  let possibleDependeeDir = "../" + possibleDependee;
  let pkgDependencies = require(possibleDependeeDir + "/package.json")
    .dependencies;
  if (pkgDependencies[moduleName]) {
    let depPath = path.resolve(
      possibleDependeeDir,
      `node_modules/${moduleName}/`
    );
    shelljs.rm(depPath);
    shelljs.mkdir(depPath);
    shelljs.cp("-R", "lib/", path.resolve(depPath, "lib"));
    shelljs.cp("package.json", path.resolve(depPath, "package.json"));
  }

  console.log(possibleDependee);
}
