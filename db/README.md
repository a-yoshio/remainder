## Remainder DB

## Docker
### Build
```
docker build -t eg_postgresql .
```

### Run
```
docker run --rm -P --name pg_test eg_postgresql
```

## Access to DB
```
psql -h localhost -p 32768 -d docker -U docker --password
```

## Reference
[Dockerize PostgresSQL](https://docs.docker.com/engine/examples/postgresql_service/)
