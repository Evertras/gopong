FROM golang:1.11-alpine AS go-builder

WORKDIR /go/src/github.com/Evertras/gopong

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
	  go build -a -tags netgo \
	  -ldflags '-w -extldflags "-static"' \
	  -o /gopong \
	  ./cmd/gopong/main.go

FROM scratch

COPY --from=go-builder /gopong gopong

ENTRYPOINT ["/gopong"]
