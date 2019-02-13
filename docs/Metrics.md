# Metrics

The Go server emits statsd metrics.  For development, a full infrastructure
stack with monitoring, etc. is available via [Docker Compose](https://docs.docker.com/compose/)
in [the compose directory](../compose).

```bash
cd swarm

docker-compose up -d
```

After running the Gopong server for more than a few seconds, you can then
visit [Chronograf](http://localhost:8888) at http://localhost:8888 to explore
all available metrics.
