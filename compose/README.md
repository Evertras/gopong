# Full Docker Compose stack

This stack includes the following:

* Traefik to handle all incoming traffic
* A single running instance of a Gopong server
* A full TICK stack (Telegraf, InfluxDB, Chronograf, Kapacitor) for statsd metrics
* Prometheus configured to watch itself, Traefik, and Gopong

## Exposed service ports

The following can be reached on localhost:

| Service    | Address                       |
|------------|-------------------------------|
| Gopong     | [gopong.localhost](http://gopong.localhost) |
| Traefik    | [traefik.localhost](http://traefik.localhost) |
| Chronograf | [chronograf.localhost](http://chronograf.localhost) |
| Prometheus | [prometheus.localhost](http://prometheus.localhost) |
