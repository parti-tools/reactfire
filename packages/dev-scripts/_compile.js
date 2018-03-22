const babel = require("babel-core");
const fs = require("fs");

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

function transformFile(file) {
  return new Promise(function(resolve, reject) {
    babel.transformFile(file, options, function(err, result) {
      if (err) {
        return reject(err);
      }
      if (!/^(.+)\.flow$/i.test(file)) {
        // skipping
        return resolve(false);
      }
      let outFile = /^(.+)\.flow$/i.exec(file)[1];
      console.log(`  >>> ${file}`);
      let mapFile = outFile + ".map";
      fs.writeFileSync(outFile, result.code);
      fs.writeFileSync(mapFile, JSON.stringify(result.map));
      resolve(true);
    });
  });
}
