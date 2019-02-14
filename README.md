# gopong

[![Build Status](https://travis-ci.org/Evertras/gopong.svg?branch=master)](https://travis-ci.org/Evertras/gopong)

A simple game of multiplayer browser Pong in Typescript with a Go server backing it.

The Go server is completely self-contained as a single binary for easy distribution; no separate
content or libraries are required.  The pages and javascript files being served to the browser are baked into
the executable via `go generate ./lib/static` creating a `build.go` file in the [lib/static](lib/static)
directory.  When run with the `-d` flag, files are served directly from disk to allow for an easier
development workflow.

Note that this entire project is **complete overkill** for Pong.  Even [the documentation](docs/) is overkill.
The point is to have a robust example of a multiplayer game that uses both Typescript and Go and
meets the following self-imposed requirements:

* Easy to develop/maintain
  * Code follows good practices and is extensible for new features
  * Tests are relatively painless to add and maintain to enable/encourage TDD where appropriate
  * Tests exist where reasonable so changes can be made confidently
  * Tests are enforced by the build process so no regressions sneak in
  * A development mode flag and webpack's watch mode make front end development frictionless - automatic rebuild for every save and a simple refresh in the browser to reload with the updated code
* Easy to build
  * As few global installs as possible (no npm install -g!)
  * CI should be essentially configless outside of stock Go and NodeJS installs
  * Everything should just work out of the box on any machine after cloning the repo
* Easy to distribute
  * Everything is self-contained into a single binary
    * Extremely lightweight containerization is trivial due to zero runtime dependencies; NodeJS runtime isn't required
    * Packaging a single executable binary is the simplest use case for any other package system if desired
* Easy to monitor
  * Emits metrics in a standard fashion that existing tools can read (statsd, prometheus, etc.)
  * Adding metrics is easy, to encourage more monitoring

## Development prerequisites

The code entry point for the back end is [cmd/gopong/main.go](cmd/gopong/main.go).

The code entry point for the front end is [front/src/main.ts](front/src/main.ts).

### Minimum requirements

The following is required to build this project after cloning the repo.

* [Go 1.11](https://golang.org/doc/install)
* [Node 8.x](https://nodejs.org/en/)

Older versions may work, but GLHF because you're on your own.  Newer versions should be fine.

### Technically optional requirements

#### Go Dep

If you add, update, or remove any third party Go dependencies, you'll need to update the vendor
folder by using [Go Dep](https://github.com/golang/dep).  This is not necessary to install otherwise.

#### Make

If you want to take advantage of the Makefile, you'll need `make` installed on your system.
This isn't strictly necessary for development as all commands from the Makefile can be run
manually, but it does make things easier.

If you need `make` for Linux because you're running a hipster distro, RTFM for your distro.

If you need `make` for Windows, [you can get it here](http://gnuwin32.sourceforge.net/packages/make.htm).

You should now be able to just run `make` in the root directory of this repository to test and
build everything with a `gopong` executable artifact created for your system.

#### Docker

If you want to build the Docker image or use the provided infrastructure stack in [the compose directory](compose).

## Running

```bash
# Build it
make

# Run it
./gopong
```

### Flags

The following flags can be provided at runtime:

| Long | Short | Description |
|------|-------|-------------|
| `--dev` | `-d` | When asked to serve a file, read the latest from disk instead of using baked-in.  Useful for development. |
| `--tick <rate-per-second>` | `-t <rate-per-second>` | How many ticks per second to run at for server side updates.  For example: `-t 10` will run at 10 Hz |
| `--statsd` | (none) | Send statsd metrics to the given endpoint.  For example: "--statsd localhost:8125" |
| `--prometheus` | (none) | Listen for Prometheus scrapes on the given address.  For example: "--prometheus :9090" |

```bash
# Run in development mode at 20 Hz
./gopong -d -t 20
```

### Running with Docker

```bash
# Build the docker image; unnecessary if you didn't make any changes, image is available on Docker Hub
make docker

# Run on host's port 8080 with a tick rate of 10
docker run --rm -d -p 8080:8000 evertras/gopong -t 10
```

### Running a full infrastructure/metrics stack with Docker Compose

See [the compose directory](compose) for more information.

## Running in development mode

Running `make run-dev` will generate the front end and start the back end server.  The content
files will be served off the disk, so updating the front end will be served without having to
restart the server.  This will also run go with the `-race` flag, which will write to the
console when any race conditions are detected during a run.  Any detected race conditions are
unacceptable and must be fixed immediately.

Running `npx webpack -w` in another terminal will automatically regenerate the javascript being
served whenever a typescript file is edited.

Once running, the game is available at [http://localhost:8000](http://localhost:8000) and will
connect automatically once loaded.
