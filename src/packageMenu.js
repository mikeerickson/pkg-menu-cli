/*global require*/

const chalk = require('chalk')
const Table = require('cli-table2')  // INFO: https://www.npmjs.com/package/cli-table2
const fs    = require('fs')

function buildMenu(pkgInfo = {}, opts = {}) {

  if (!pkgInfo.hasOwnProperty('scripts')) {
    return {error: true, message: 'package.json does not contain any scripts'}
  }

  let table

// instantiate
  if (opts.compress) {
    table = new Table({
      head: ['Name'],
    })
  }
  else {
    table = new Table({
      head: ['Name', 'Script'],
      colWidths: [20, (process.stdout.columns - 25)],
    })
  }

  const scripts = pkgInfo.scripts
  const scriptNames = Object.keys(scripts)

  if (opts.sort) {
    scriptNames.sort()
  }
  if (!opts.compress) {
    scriptNames.map((item) => {
      table.push(
        [item, scripts[item]]
      )
    })
  }
  else {
    scriptNames.map((item) => {
      table.push([item])
    })
  }

  return table
}

function printMenu(filename = '', options = {}) {
  const pkgInfo = getPackageInfo(filename)
  if (pkgInfo.hasOwnProperty('error')) {
    console.log(chalk.red(pkgInfo.msg))
    return pkgInfo
  }
  else if (!pkgInfo.hasOwnProperty('scripts')) {
    console.log(chalk.red(
      `Error: Unable to locate Script items for ${chalk.bold(pkgInfo.name)}`))
    return {
      error: true,
      message: `Unable to locate Script items for ${pkgInfo.name}`,
    }
  }
  console.log(
    chalk.cyan.bold(pkgInfo.name) + ': ' + chalk.white.bold(pkgInfo.version))
  console.log('')
  console.log(chalk.yellow(
    `Example: Run any script using script name
         $ npm run <name>
     `
  ))

  const table = buildMenu(pkgInfo, options)
  return table.toString()
}

function getPackageInfo(filename = '') {

  if (filename.length === 0) {
    filename = process.env.PWD + '/package.json'
  }

  if (!fs.existsSync(filename)) {
    const err = {
      error: true,
      msg: `Error: Unable to locate ${chalk.red.bold(filename)}`,
    }
    return err
  }

  const pkgInfo = require(filename)
  return pkgInfo
}

let packageMenu = {

  getPackageInfo: (filename) => {
    return getPackageInfo(filename)
  },
  build: (pkgInfo, options) => {
    return buildMenu(pkgInfo, options)
  },
  print: (filename = '', options = {}) => {
    const menu = printMenu(filename, options)
    if (menu.hasOwnProperty('error')) {
      return menu
    }
    else {
      console.log(menu)
      return menu
    }
  },

}

module.exports = packageMenu
