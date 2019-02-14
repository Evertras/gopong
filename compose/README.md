# Full Docker Compose stack

This stack includes the following:

* Traefik to handle all incoming traffic
* A single running instance of a Gopong server
* A full TICK stack (Telegraf, InfluxDB, Chronograf, Kapacitor) for statsd metrics
* Prometheus configured to watch itself, Traefik, and Gopong

## Controlling the stack

```bash
# If you're not already here
cd compose

# To run and see all the logs for all services (Ctrl+C to kill everything)
docker-compose up

# Or to run detached...
docker-compose up -d
```

If started with `-d`, you can shut the stack down as follows:

```bash
# If you're not already here
cd compose

# Brings down the stack
docker-compose down
```

## Exposed services

Services are exposed via Traefik.

The following can be reached on localhost:

| Service    | Address                       |
|------------|-------------------------------|
| Gopong     | [gopong.localhost](http://gopong.localhost) |
| Traefik    | [traefik.localhost](http://traefik.localhost) |
| Chronograf | [chronograf.localhost](http://chronograf.localhost) |
| Prometheus | [prometheus.localhost](http://prometheus.localhost) |
