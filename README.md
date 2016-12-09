# pkg-menu-cli

## Intro
Simple CLI to display table of `package.json` scripts information for current directory.


## Install

```
$ npm i -g pkg-menu-cli
```

## Usage

```
$ package-menu (returns menu)
┌──────────────────────────────────────────────────┬──────────────────────────────────────────────────┐
│ Name                                             │ Script                                           │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ test                                             │ mocha                                            │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ menu                                             │ node ./cli.js                                    │
└──────────────────────────────────────────────────┴──────────────────────────────────────────────────┘
```

You can supply of of switches
-- sort, -s   Sort Result

```
$ package-menu --sort
```

## Roadmap
   - [ ] Add simple launcher interface ()

## Credits

pkg-menu-cli written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.org](http://codedungeon.org)
