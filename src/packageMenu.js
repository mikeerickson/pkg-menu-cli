const chalk   = require('chalk');
const pkgInfo = require('../package.json');
const Table   = require('cli-table2');         // INFO: https://www.npmjs.com/package/cli-table2

function buildMenu(opts = {}) {
  // instantiate
  let table = new Table({
      head: ['Name', 'Script'],
      colWidths: [50, 50]
  });

  let scripts = pkgInfo.scripts;
  const scriptNames = Object.keys(scripts);
  if (opts.sort) {
    scriptNames.sort();
  }
  scriptNames.map((item) => {
    table.push(
        [item, scripts[item]]
    );
  });

  console.log('');
  console.log(chalk.white.cyan(pkgInfo.name) + ': ' + chalk.white.bold(pkgInfo.version));
  console.log('');
  console.log(chalk.yellow(
    `Example: Run any script using script name
         $ npm run <name>
    `
  ));

  console.log(table.toString());

  return scripts;
}


let packageMenu = {
  build: (options) => {
    return buildMenu(options);
  }
}



module.exports = packageMenu;
