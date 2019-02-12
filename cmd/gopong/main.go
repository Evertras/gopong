package main

import (
	"context"
	"log"
	"time"

	"github.com/Evertras/gopong/lib/server"
	"github.com/Evertras/gopong/lib/store"
	metrics "github.com/armon/go-metrics"
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
	tickRate := pflag.IntP("tick-rate", "t", 5, "How many ticks per second to update clients.")
	devMode := pflag.BoolP("dev", "d", false, "If set, serve files from disk rather than in-memory so changes can be served without a restart.")

	pflag.Parse()

	// Use mostly defaults
	gameCfg := store.New()

	gameCfg.StepInterval = time.Second / time.Duration(*tickRate)

	cfg := server.Config{
		GameCfg:                   gameCfg,
		ReadStaticFilesPerRequest: *devMode,
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
