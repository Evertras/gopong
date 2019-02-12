BINARY_NAME=gopong

all: clean test build

clean:
	rm -f gopong
	rm -f lib/static/build.go
	rm -f front/game.js
	rm -f front/game.js.map
	rm -f front/src/network/messageTypes.ts
	rm -f front/src/game/states/play/messageTypes.ts
	rm -f front/src/game/states/starting/messageTypes.ts

test: node_modules lib/static/build.go
	npx tslint -p .
	npm test
	go test -v ./lib/...

build: lib/static/build.go
	go build -o $(BINARY_NAME) -v ./cmd/gopong/main.go

bench:
	go test -benchmem -bench . ./lib/...

run-dev: front/game.js lib/static/build.go
	go run -race ./cmd/gopong/main.go -d -t 3

generate: clean front/game.js lib/static/build.go

# Actual files that must be generated
front/game.js: \
		node_modules \
		front/src/network/messageTypes.ts \
		front/src/game/states/play/messageTypes.ts \
		front/src/game/states/starting/messageTypes.ts
	npx webpack

lib/static/build.go: front/game.js
	go generate ./lib/static/

front/src/network/messageTypes.ts:
	go generate ./lib/message/

front/src/game/states/play/messageTypes.ts:
	go generate ./lib/state/play/

front/src/game/states/starting/messageTypes.ts:
	go generate ./lib/state/starting/

node_modules:
	npm install
