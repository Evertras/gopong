package main

import (
	"context"
	"log"
	"time"

	metrics "github.com/armon/go-metrics"
	"github.com/evertras/gopong/lib/game"
	"github.com/evertras/gopong/lib/server"
	"github.com/spf13/pflag"
)

func main() {
	initMetrics()

	ctx := context.Background()

	cfg := getConfig()

	s := server.New(ctx, cfg)

	log.Println("Starting")

	log.Fatal(s.Listen("localhost:8000"))
}

func getConfig() server.Config {
	tickRate := pflag.IntP("tick-rate", "t", 3, "How many ticks per second to update clients")

	pflag.Parse()

	cfg := server.Config{
		TickRate: time.Second / time.Duration(*tickRate),
		GameCfg: game.Config{
			BallRadius:   0.02,
			PaddleHeight: 0.2,
		},
		ReadStaticFilesPerRequest: true,
	}

	return cfg
}

func initMetrics() {
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

}
