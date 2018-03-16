const path = require("path");

const WORKING_DIRECTORY = process.cwd();
const RELATIVE_PATH = path.relative(WORKING_DIRECTORY, __dirname);
const BIN = path.resolve(RELATIVE_PATH, "./node_modules/.bin");

module.exports.bin = function bin(name) {
  return path.resolve(BIN, name);
};

module.exports.script = function bin(name) {
  return path.resolve(__dirname, name);
};

module.exports.WORKING_DIRECTORY = WORKING_DIRECTORY;
