BINARY_NAME=gopong

all: clean test build

clean:
	rm -f lib/static/build.go

test: node_modules lib/static/build.go
	npx tslint -p .
	npm test
	go test -v ./lib/...

build: node_modules lib/static/build.go
	go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

bench:
	go test -benchmem -bench . ./...

run-dev: generate
	go run -race ./cmd/gopong/main.go -d -t 3

generate: clean lib/static/build.go

# Actual files/directories that must exist
lib/static/build.go:
	npx webpack
	go generate ./lib/static/

node_modules:
	npm install
