const path = require("path");
const glob = require("glob");
const _compile = require("./_compile");

console.log("Compiling...");
let files = glob.sync("{**/*.js.flow,!node_modules/**}");
let compilation = files.map(f => path.resolve(process.cwd(), f)).map(_compile);
Promise.all(compilation)
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    process.exit(1);
  });
