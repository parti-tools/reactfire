const shelljs = require('shelljs');
const {bin} = require('./_bin');

// compile to target js version
process.env.NODE_ENV = "production";
shelljs.exec(`${bin('babel')} --no-babelrc --presets=env,react-app src -d lib`);

// create flow files
shelljs.exec(`${bin('flow-copy-source')} -v src lib`);

