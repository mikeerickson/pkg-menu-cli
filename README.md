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
┌───────────────────────────────────────┬───────────────────────────────────────────┐
│ Name                                  │ Script                                    │
├───────────────────────────────────────┼───────────────────────────────────────────┤
│ test                                  │ mocha                                     │
├───────────────────────────────────────┼───────────────────────────────────────────┤
│ menu                                  │ node ./cli.js                             │
└───────────────────────────────────────┴───────────────────────────────────────────┘
```

You can supply of of switches
```
-- sort, -s     Sort Result
-- compress, -c Display Script Name Only
-- launch, -l   Display Launcher Interface
```

Addtional switches when using `--launch`
```
   --multiple, -m  Allow multiple selection
   --all, -a       Run all scripts
   --info, -i      Shows script description
```

```
$ package-menu --sort
```

```
$ package-menu -l                  // show launcher
$ package-menu --launch --multiple // show launcher with multiselect
$ package-menu -lm                 // Supports CLI shorthand
```

## Credits

pkg-menu-cli written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.org](http://codedungeon.org)

Special Credit to [ruyadorno](https://github.com/ruyadorno/ntl) for his work on [ntl](https://github.com/ruyadorno/ntl)
