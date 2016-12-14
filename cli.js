#!/usr/bin/env node
'use strict';

const meow        = require('meow');
const packageMenu = require('./src/packageMenu.js');

const cli = meow(`
    Usage
      $ package-menu [options]

    Options
      --help, -h      Shows Help (this screen)
      --sort, -s      Sort Scripts (default: false)
      --version, -V   Show Package Menu Version

    Examples
      $ package-menu --sort
`, {
    alias: {
        s: 'sort',
        h: 'help',
        V: 'version'
    }
});

packageMenu.print('', cli.flags)
