let chokidar = require("chokidar");
const path = require("path");
const buildFile = require("../lib/buildFile");

chokidar
  .watch(path.resolve(process.cwd(), "src/**/*.*"), {
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
