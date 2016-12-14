#!/usr/bin/env node
'use strict';

const meow           = require('meow');
const execa          = require('execa');
const updateNotifier = require('update-notifier');
const pkg            = require('./package.json');
const packageMenu    = require('./src/packageMenu.js');

updateNotifier({pkg}).notify();

const cli = meow(`
    Usage
      $ package-menu [options]

    Options
      --help, -h         Shows Help (this screen)
      --sort, -s         Sort Scripts (default: false)
      --version, -V, -v  Show Package Menu Version

    Examples
      $ package-menu --sort
`, {
    alias: {
        s: 'sort',
        h: 'help',
        V: 'version',
        v: 'version'
    }
});

if (cli.flags.update) {
  execa('npm i -g package-menu-cli@latest', []).then(result => {
    console.log(result.stdout);
});
}
else {
  packageMenu.print('', cli.flags)
}
