BINARY_NAME=gopong

all: clean test build

clean:
	rm -f lib/static/build.go
	rm -f front/src/network/messageTypes.ts

test: node_modules front/src/network/messageTypes.ts lib/static/build.go
	npx tslint -p .
	npm test
	go test -v ./lib/...

build: node_modules lib/static/build.go
	go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

bench:
	go test -benchmem -bench . ./...

run-dev: generate
	go run -race ./cmd/gopong/main.go -d -t 3

generate: clean front/src/network/messageTypes.ts lib/static/build.go

# Actual files/directories that must exist
lib/static/build.go: front/src/network/messageTypes.ts
	npx webpack
	go generate ./lib/static/

front/src/network/messageTypes.ts:
	go generate ./lib/message/

node_modules:
	npm install
