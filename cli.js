#!/usr/bin/env node
'use strict';

const meow        = require('meow');
const packageMenu = require('./src/packageMenu.js');

const cli = meow(`
    Usage
      $ package-menu [options]

    Options
      --sort, -s  Sort Scripts (default: false)
      --version   Show Package Menu Version

    Examples
      $ package-menu --sort
`, {
    alias: {
        s: 'sort'
    }
});

// 'input: ', cli.input[0];
// console.log('flags', cli.flags);

packageMenu.build(cli.flags)


// foo(cli.input[0], cli.flags);
