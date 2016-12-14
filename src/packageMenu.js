const chalk   = require('chalk');
const Table   = require('cli-table2');         // INFO: https://www.npmjs.com/package/cli-table2
const fs      = require('fs');

function buildMenu(pkgInfo = {}, opts = {}) {
  if (!pkgInfo.hasOwnProperty('scripts')) {
    return {err: true, messasge: 'package.json does not contain any scripts'};
  }
  // instantiate
  let table = new Table({
      head: ['Name', 'Script'],
      colWidths: [20]
  });

  const scripts     = pkgInfo.scripts;
  const scriptNames = Object.keys(scripts);
  if (opts.sort) {
    scriptNames.sort();
  }
  scriptNames.map((item) => {
    table.push(
        [item, scripts[item]]
    );
  });
  return table;
}

function printMenu(filename = '', options = {}) {
  const pkgInfo = getPackageInfo(filename);
  console.log(chalk.cyan.bold(pkgInfo.name) + ': ' + chalk.white.bold(pkgInfo.version));
  console.log('');
  console.log(chalk.yellow(
    `Example: Run any script using script name
         $ npm run <name>
  `
  ));

  const table = buildMenu(pkgInfo, options);
  return table.toString();
}

function getPackageInfo(filename = '') {

  if (filename.length === 0) {
    filename = process.env.PWD + '/package.json';
  }

  if (!fs.existsSync(filename)) {
    const err = {error: -43, msg:`Error: Unable to locate ${chalk.red.bold(filename)}`};
    return err;
  }

  const pkgInfo = require(filename);
  return pkgInfo;
}

let packageMenu = {

  getPackageInfo: (filename) => {
    return getPackageInfo(filename);
  },
  build: (pkgInfo, options) => {
    return buildMenu(pkgInfo, options);
  },
  print: (filename = '', options = {}) => {
    console.log(printMenu(filename, options));
  }

}

module.exports = packageMenu;
