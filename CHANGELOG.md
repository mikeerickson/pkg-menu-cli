# package-menu-cli Changelog

## Overview

See `README.md` for installation and configuration details

### Just the changes

- 1.5.0: changes
  - Replaced `cli-table2` with `cli-table3`
    - `cli-table2` is not longer maintained
  -
- 1.4.2: Issues
  - Added terminal width check [#005](https://github.com/mikeerickson/pkg-menu-cli/issues/5)

- 1.4.0: Added `launch` interface
  - Further cli options will be passed to `launcher`
    - `$ package-menu -l -a | -m | -i`
        `  --all, -a run all scripts`
        `  --info, -i shows package description`
        `  --multiple, -m allow multiple selection`

- 1.3.0: Added `compress` switch
  - `$ package-menu --compress`
  - `$ package-menu -c`

- 1.1.1: Minor tweaks
  - Removed fixed column width for 'script' column

- 1.1.0: Internal refactoring for better testing

- 1.0.1: Adjust table width

- 1.0.1: Fix issue with package.json path

- 1.0.0: First tagged release

## Credits

package-menu-cli written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.org](http://codedungeon.org)
