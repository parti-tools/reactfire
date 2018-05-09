let chokidar = require("chokidar");
const path = require("path");
const _compile = require("./_compile");

chokidar
  .watch(path.resolve(process.cwd(), "**/src/**/*.js"), {
    followSymlinks: false,
    ignored: /\bnode_modules\b/
  })
  .on("all", function(event, filePath, details) {
    _compile(filePath).then(compiled => {
      if (compiled) {
        console.log("compiled " + filePath);
      }
    });
  });

// shelljs.exec(`${bin("chokidar")} 'src/**' -c 'node ${script("build")}'`);
