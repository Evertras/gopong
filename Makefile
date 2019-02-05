BINARY_NAME=gopong

all: test build

build: lib/static/build.go
	go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

clean:
	rm -f lib/static/build.go

test: lib/static/build.go
	npx tslint -p .
	npm test
	go test -v ./lib/...

bench:
	go test -benchmem -bench . ./...

run-dev:
	go run -race ./cmd/gopong/main.go -d -t 3

generate: clean lib/static/build.go

lib/static/build.go:
	npx webpack
	go generate ./lib/static/
