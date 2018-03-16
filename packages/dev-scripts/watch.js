const shelljs = require('shelljs');
const {bin, script} = require('./_bin');

shelljs.exec(`${bin('chokidar')} 'src/**' -c 'node ${script('build')}'`);
