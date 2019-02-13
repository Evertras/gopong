# Metrics

The Go server emits statsd metrics.  For development, a TICK stack is
available via [Docker Compose](https://docs.docker.com/compose/) in
the [tick](../tick) directory.  Note that Telegraf is commented out for
now because Windows hates exposing UDP... instead you'll have to run
an actual Telegraf executable locally using the config in
[the etc directory](../tick/etc/telegraf.conf).

```bash
cd ./tick/

# This will start the ICK part of TICK
docker-compose up -d

# In Windows
telegraf.exe --config etc/telegraf.conf

# In Linux
telegraf --config etc/telegraf.conf
```

After running the Gopong server for more than a few seconds, you can then
visit [Chronograf](http://localhost:8888) at http://localhost:8888 to explore
all available metrics.
