import-cli
==========

Prepare your CLI too

```
$ npm install
```

Parse a boka.se export into JSON

```
$ ./bin/run --parseBokaSePdf ./Boka.se.pdf
```

You will have to edit the resulting JSON file by hand.  In general, the PDF-to-text system is inconsistent around the top and bottom of pages, so depending on where page splits occur, the last entry on a page and the first entry on the next page might be parsed incorrectly.


Debug failed parsing
```
$ ./bin/run --dumpPdf ./Boka.se.pdf
```

Create list of product names
```
$ ./bin/run --parseBokaSePdf ./Boka.se.pdf|  jq '.bookings[] | .product' | sort -u | sort
```


Import CLI tool

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/import-cli.svg)](https://npmjs.org/package/import-cli)
[![CircleCI](https://circleci.com/gh/import-cli/import-cli/tree/master.svg?style=shield)](https://circleci.com/gh/import-cli/import-cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/import-cli.svg)](https://npmjs.org/package/import-cli)
[![License](https://img.shields.io/npm/l/import-cli.svg)](https://github.com/import-cli/import-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g import-cli
$ import-cli COMMAND
running command...
$ import-cli (-v|--version|version)
import-cli/0.0.0 darwin-x64 node-v14.15.5
$ import-cli --help [COMMAND]
USAGE
  $ import-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
