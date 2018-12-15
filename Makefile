BINARY_NAME=gopong

all: test build

build: generate
	go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

test:
	go test -v ./lib/...

run: generate
	go run ./cmd/gopong/main.go

generate:
	go generate ./lib/static/
