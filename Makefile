BINARY_NAME=gopong

all: clean generate test build

clean:
	rm -f gopong
	rm -f lib/static/build.go
	rm -f front/game.js
	rm -f front/game.js.map
	rm -f front/src/network/messageTypes.ts
	rm -f front/src/game/states/play/messageTypes.ts
	rm -f front/src/game/states/starting/messageTypes.ts
	rm -rf messages/gomessage
	rm -rf messages/tsmessage

test: node_modules lib/static/build.go
	npx tslint -p .
	npm test
	go test -v ./lib/...

build: lib/static/build.go
	CG_ENABLED=0 go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

bench:
	go test -benchmem -bench . ./lib/...

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

lib/static/build.go: front/game.js
	go generate ./lib/static/

node_modules:
	npm install

messages/gomessage:
	mkdir messages/gomessage
	@# Slightly weird PWD syntax here to deal with Windows gitbash mangling it otherwise.
	@# This is intentional, don't remove the initial slash!
	docker run -v /${PWD}/messages:/defs namely/protoc-all -f *.proto -l go -o gomessage

messages/tsmessage: node_modules
	mkdir messages/tsmessage
	npx pbjs -t static-module -w commonjs messages/*.proto > messages/tsmessage/messages.js
	npx pbts -o messages/tsmessage/messages.d.ts messages/tsmessage/messages.js
