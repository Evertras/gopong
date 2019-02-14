# Full Docker Compose stack

This stack includes the following:

* Traefik to handle all incoming traffic
* A single running instance of a Gopong server
* A full TICK stack (Telegraf, InfluxDB, Chronograf, Kapacitor) for statsd metrics
* Prometheus configured to watch itself, Traefik, and Gopong

## Starting the stack

```bash
# If you're not already here
cd compose

# Add -d to run detached, or without -d to get logs of everything; Ctrl+C to shut it down
docker-compose up
```

## Bringing down the stack

If started with `-d`...

```bash
# If you're not already here
cd compose

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
