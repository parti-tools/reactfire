"use strict";

const path = require("path");
const glob = require("glob");
const buildFile = require("../lib/buildFile");

console.log("Compiling...");
let files = glob.sync("{src/**/*.js,!*.spec.js,!*.test.js}");
let compilation = files.map(f => path.resolve(process.cwd(), f)).map(buildFile);
Promise.all(compilation)
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    process.exit(1);
  });
