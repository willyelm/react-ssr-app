## Running Docker
```sh
# generate build
npm run build
# start docker instance
docker compose up --build -d
# stop instance
docker compose down
# build
docker compose build
```

## Request SSL certificates

To request the certificates, we have to create the container with:

```
docker compose up -d certbot
```

## Automate certificate renewal

The last step is to automatically renew the certificates before they run out. A certificate has a lifetime of 90 days, and it is recommended to update them after a timespan of 60 days.

```
crontab -e
```

And adding a line with the following structure:

```
0 5 1 */2 * /usr/local/bin/docker-compose up -f /var/docker/docker-compose.yml certbot
```

The command means: Run docker-compose up -d at 5 am on the first day every 2nd month.
