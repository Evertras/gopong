BINARY_NAME=gopong

all: test build

clean:
	rm -f gopong
	rm -f lib/static/build.go
	rm -f front/game.js
	rm -f front/game.js.map
	rm -f front/lib.wasm
	rm -rf messages/gomessage
	rm -rf messages/tsmessage

test: node_modules messages/gomessage lib/static/build.go
	npx tslint -p .
	npm test
	go test -v ./lib/...

build: messages/gomessage lib/static/build.go
	CG_ENABLED=0 go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

build-wasm: 
	GOARCH=wasm GOOS=js go build -o front/lib.wasm cmd/wasm/main.go

bench:
	go test -v -benchmem -bench . ./lib/...

run-dev: front/game.js lib/static/build.go
	go run -race ./cmd/gopong/main.go -d -t 3

generate: proto front/game.js lib/static/build.go

docker: clean generate
	docker build --rm -t evertras/gopong .

proto: messages/gomessage messages/tsmessage

# These are not files, so always run them when asked to
.PHONY: all clean test build bench run-dev generate proto

# Actual files that must be generated
front/game.js: node_modules messages/tsmessage
	npx webpack

lib/static/build.go: front/lib.wasm front/game.js
	go generate ./lib/static/

node_modules:
	npm install

messages/gomessage:
	mkdir messages/gomessage
	@# Slightly weird PWD syntax here to deal with Windows gitbash mangling it otherwise.
	@# This is intentional, don't remove the initial slash!
	docker run -v /${PWD}/messages:/defs namely/protoc-all -f *.proto -l go -o gomessage || (rmdir messages/gomessage && exit 1)

messages/tsmessage: node_modules
	mkdir messages/tsmessage
	npx pbjs -t static-module -w commonjs messages/*.proto > messages/tsmessage/messages.js || (rmdir messages/tsmessage && exit 1)
	npx pbts -o messages/tsmessage/messages.d.ts messages/tsmessage/messages.js || (rmdir messages/tsmessage && exit 1)

front/lib.wasm:
	GOARCH=wasm GOOS=js go build -o front/lib.wasm cmd/wasm/main.go
