const babel = require("babel-core");
const fs = require("fs");
const path = require("path");
const pify = require("pify");
const mkdir = require("make-dir");

// compile to target js version
process.env.NODE_ENV = "production";

let presets = ["env", "react-app"];
let options = {
  presets,
  sourceMaps: true,
  babelrc: false
};

module.exports = function(file) {
  return transformFile(file);
};

const writeFile = pify(fs.writeFile);
const readFile = pify(fs.readFile);
const babelTransformFile = pify(babel.transformFile);

function transformFile(file) {
  return new Promise(function(resolve, reject) {
    if (/.*\.(spec|test)\.[^\\]+/.test(file)) {
      // skipping
      return resolve(false);
    }

    let srcDirPos = file.lastIndexOf("/src/");
    if (srcDirPos === -1) {
      // skipping
      return resolve(false);
    }

    let outFile =
      file.substr(0, srcDirPos) + "/lib/" + file.substr(srcDirPos + 5);
    let mapFile = outFile + ".map";
    let flowFile = outFile + ".flow";

    let p = babelTransformFile(file, options).then(result => {
      return Promise.all([readFile(file), mkdir(path.dirname(outFile))])
        .then(([source]) => {
          return Promise.all([
            writeFile(outFile, result.code),
            writeFile(mapFile, JSON.stringify(result.map)),
            writeFile(flowFile, source)
          ]);
        })
        .then(() => true);
    });
    resolve(p);
  });
}
