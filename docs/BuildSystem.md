# Build System

## TLDR

```bash
# Runs 'npm install' if necessary, generates generated files via go generate and webpack,
# runs all tests for both Go and Typescript, and outputs a self-contained binary named 'gopong'
make
```

## Details

This project uses [Go Dep](https://github.com/golang/dep) to handle its Go dependencies. Note that the
`vendor` folder is checked in intentionally, but in a 'real' project this should probably be
handled better by the build system; maybe?  For this, it's fine.

This project uses [webpack](https://webpack.js.org/) with the
[stock typescript loader](https://github.com/TypeStrong/ts-loader) and a slightly tweaked tslint config.

Relevant front end build configuration:

* [package.json](../package.json)
* [tsconfig.json](../tsconfig.json)
* [tslint.json](../tslint.json)
* [webpack.config.js](../webpack.config.js)

Good ol' `make` is used for build script consolidation since both Go and Typescript are present.
See [the Makefile](../Makefile) for available commands and what they do.

## Typescript Linting

See [tslint.json](../tslint.json) for Typescript linter settings.

Running `npx tslint -p . --fix` will fix most Typescript linting errors.  This script has also
been added as `npm run-script lint-fix`.  Most editors will have a plugin of some sort that
will run the linter for you as well, and potentially even fix errors on save.

## Travis CI

The build badge at the top of this README will take you to the Travis CI page for this project.
Travis CI simply runs `make` which will run all tests to ensure everything is correct.

## Docker Build

`make docker` will create a Docker image named `evertras/gopong`.  This image is based off `scratch`,
making it very tiny (<10 mb) but without access to a shell to exec into while running.  See [the Dockerfile](../Dockerfile)
for details.

## Test tools

To run all tests, run `make test`.  See [the Makefile](../Makefile) for more information.

Go just uses the stock Go testing libraries included with Go.  Run `go test -v ./lib/...` to run all Go tests.

Typescript uses [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/).
Running `npm test` will run all Typescript tests.

## Server benchmarks

A few [Go benchmarks](https://golang.org/pkg/testing/) have been added.  Run `make bench`
or explicitly `go test -bench . ./lib/...` to run them.
