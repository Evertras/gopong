BINARY_NAME=gopong

all: test build

build: generate
	go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

clean:
	rm -rf front/build

test:
	go test -v ./lib/...

run: generate
	go run ./cmd/gopong/main.go

generate:
	npx webpack
	go generate ./lib/static/
