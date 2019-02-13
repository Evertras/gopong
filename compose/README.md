# Full Docker Compose stack

This stack includes the following:

* A single running instace of a Gopong server
* A full TICK stack (Telegraf, InfluxDB, Chronograf, Kapacitor) for statsd metrics
* Prometheus configured to watch itself and Gopong

## Exposed service ports

The following can be reached on localhost:

| Service    | Port                          |
|------------|-------------------------------|
| Gopong     | [8000](http://localhost:8000) |
| Chronograf | [8888](http://localhost:8888) |
| Prometheus | [9090](http://localhost:9090) |
