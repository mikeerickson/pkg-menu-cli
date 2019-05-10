/*global require*/

const fs = require('fs');
const chalk = require('chalk');
const Table = require('cli-table3');

function buildMenu(pkgInfo = {}, opts = {}) {
  let table;

  if (!pkgInfo.hasOwnProperty('scripts')) {
    return { error: true, message: 'package.json does not contain any scripts' };
  }

  // instantiate
  if (opts.compress) {
    table = new Table({
      head: ['Name']
    });
  }
 else {
    table = new Table({
      head: [chalk.magenta.bold('Name'), chalk.magenta.bold('Script')],
      colWidths: [20, process.stdout.columns - 25]
    });
  }

  const scripts = pkgInfo.scripts;
  const scriptNames = Object.keys(scripts);

  if (opts.sort) {
    scriptNames.sort();
  }
  if (!opts.compress) {
    scriptNames.map(item => {
      table.push([chalk.bold(item), chalk.gray.bold(scripts[item])]);
    });
  }
 else {
    scriptNames.map(item => {
      table.push([item]);
    });
  }

  return table;
}

function printMenu(filename = '', options = {}) {
  const pkgInfo = getPackageInfo(filename);
  if (pkgInfo.hasOwnProperty('error')) {
    console.log(chalk.red(pkgInfo.msg));
    return pkgInfo;
  }
 else if (!pkgInfo.hasOwnProperty('scripts')) {
    console.log(chalk.red(`Error: Unable to locate Script items for ${chalk.bold(pkgInfo.name)}`));
    return {
      error: true,
      message: `Unable to locate Script items for ${pkgInfo.name}`
    };
  }

  let pkgVersion = pkgInfo.version;
  if (typeof pkgInfo.version === 'undefined') {
    pkgVersion = 'Unknown Version';
  }

  let pkgName = pkgInfo.name;
  if (typeof pkgInfo.name === 'undefined') {
    pkgName = 'Unknown Package Name';
  }

  console.log(chalk.cyan.bold(pkgName) + ': ' + chalk.white.bold(pkgVersion));
  console.log('');
  console.log(
    chalk.yellow(
      `Example: Run any script using script name
         $ npm run <name>
     `
    )
  );

  const table = buildMenu(pkgInfo, options);
  return table.toString();
}

function getPackageInfo(filename = '') {
  if (filename.length === 0) {
    filename = process.env.PWD + '/package.json';
  }

  if (!fs.existsSync(filename)) {
    const err = {
      error: true,
      msg: `Error: Unable to locate ${chalk.red.bold(filename)}`
    };
    return err;
  }

  const pkgInfo = require(filename);
  return pkgInfo;
}

let packageMenu = {
  getPackageInfo: filename => {
    return getPackageInfo(filename);
  },
  build: (pkgInfo, options) => {
    return buildMenu(pkgInfo, options);
  },
  print: (filename = '', options = {}) => {
    const menu = printMenu(filename, options);
    if (menu.hasOwnProperty('error')) {
      return menu;
    }
 else {
      console.log(menu);
      return menu;
    }
  }
};

module.exports = packageMenu;
