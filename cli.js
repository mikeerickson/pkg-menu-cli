#!/usr/bin/env node

/*global require, module */

'use strict';

// load all modules we will be using
const meow = require('meow');
const updateNotifier = require('update-notifier');
const latestVersion = require('latest-version');
const compare = require('semver-compare');
const execa = require('execa');

// load package class
const pkg = require('./package.json');
const packageMenu = require('./src/packageMenu.js');
const ntlMenu = require('./src/ntlMenu.js');

// see if we have a newer version of cli
latestVersion(pkg.name).then(version => {
  const notifier = updateNotifier({ pkg });
  notifier.update = { latest: version, current: pkg.version };
  if (compare(pkg.version, version) === -1) {
    notifier.notify();
  }
});

const cli = meow(
  `
    Usage
      $ package-menu [options]

    Options
      --help, -h         Shows Help (this screen)
      --sort, -s         Sort Scripts (default: false)
      --compress, -c     Show Command Only (no description)
      --version, -V, -v  Show Package Menu Version,
      --launch, -l       Show Launcher Interface
        --all, -a        - Launch all scripts
        --info, -i       - Show script description within Launcher
        --multiple, -m   - Show launcher multiselect


    Examples
      $ package-menu --sort
      $ package-menu --launch
      $ package-menu -l -m
`,
  {
    alias: {
      s: 'sort',
      c: 'compress',
      h: 'help',
      V: 'version',
      v: 'version',
      l: 'launch'
    }
  }
);

if (cli.flags.launch || cli.flags.l) {
  ntlMenu.execute();
}
 else {
  console.log('');
  packageMenu.print('', cli.flags);
}
