BINARY_NAME=gopong

all: test build

build: generate
	go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

clean:
	rm -rf front/build

test: generate
	npx tslint -p .
	npm test
	go test -v ./lib/...

bench:
	go test -benchmem -bench . ./...

run-dev:
	go run -race ./cmd/gopong/main.go -d -t 3

generate:
	npx webpack
	go generate ./lib/static/
