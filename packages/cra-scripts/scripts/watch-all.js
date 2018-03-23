let chokidar = require("chokidar");
const path = require("path");
const buildFile = require("../lib/buildFile");

let directories = [];
let foundDirsPara = false;
for(let arg of process.argv) {
  if(arg === '--dirs') {
    foundDirsPara = true;
  } else if(foundDirsPara) {
    directories.push(path.resolve(process.cwd(), arg, "src/**/*.*"))
  }
}

chokidar
  .watch(directories, {
    followSymlinks: false,
    ignored: /\bnode_modules\b/
  })
  .on("all", function(event, filePath, details) {
    if (!/add|change/.test(event)) {
      return;
    }
    buildFile(filePath).then(compiled => {
      if (compiled) {
        console.log("compiled " + filePath);
      }
    });
  });
