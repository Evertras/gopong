package main

import (
	"context"
	"log"
	"time"

	metrics "github.com/armon/go-metrics"
	"github.com/evertras/gopong/lib/game"
	"github.com/evertras/gopong/lib/server"
)

func main() {
	ctx := context.Background()
	cfg := server.Config{
		TickRate: time.Millisecond * 50,
		GameCfg: game.Config{
			BallRadius:   0.02,
			PaddleHeight: 0.2,
		},
		ReadStaticFilesPerRequest: true,
	}

	sink, err := metrics.NewMetricSinkFromURL("statsd://localhost:8125")

	if err != nil {
		log.Fatalf("Unable to create statsd sink: %v", err)
	}

	_, err = metrics.NewGlobal(
		&metrics.Config{
			ServiceName:        "gopong",
			EnableServiceLabel: true,

			HostName:            "tmp",
			EnableHostname:      false,
			EnableHostnameLabel: false,

			EnableTypePrefix: false,

			TimerGranularity:     time.Millisecond,
			ProfileInterval:      time.Second,
			EnableRuntimeMetrics: true,

			FilterDefault: true,
		},
		sink,
	)

	if err != nil {
		log.Fatalf("Unable to create global metrics: %v", err)
	}

	s := server.New(ctx, cfg)

	log.Println("Starting")

	log.Fatal(s.Listen("localhost:8000"))
}
