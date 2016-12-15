#!/usr/bin/env node
'use strict';

// load all modules we will be using
const meow           = require('meow');
const updateNotifier = require('update-notifier');
const latestVersion  = require('latest-version');
const compare        = require('semver-compare');

// load package class
const pkg            = require('./package.json');
const packageMenu    = require('./src/packageMenu.js');

// see if we have a newer version of cli
latestVersion(pkg.name).then(version => {
  const notifier = updateNotifier({pkg});
  notifier.update = {latest: version, current: pkg.version}
  if (compare(pkg.version, version) === -1) {
    notifier.notify();
  }
});

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

console.log('');

packageMenu.print('', cli.flags)
