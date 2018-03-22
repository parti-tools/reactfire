let chokidar = require("chokidar");
const path = require("path");
const _compile = require("./_compile");

chokidar
  .watch(path.resolve(process.cwd(), "**/*.js.flow"), {
    followSymlinks: false,
    ignored: /\bnode_modules\b/
  })
  .on("all", function(event, filePath, details) {
    console.log('----' , event, filePath)
    _compile(filePath).then(() => {
      console.log("compiled " + filePath)
    });
  });

// shelljs.exec(`${bin("chokidar")} 'src/**' -c 'node ${script("build")}'`);
