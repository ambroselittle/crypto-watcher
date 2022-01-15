# Database Info
We are using Postgres for our local store of market/pair info used in the APIs.

## Setup
For dev, install/run a local instance of psql.

TODO: Dockerize this and automate

Once you have instance running, run:
```sh
init-database.sh && setup-schema.sh && seed-db.sh
```
You can of course run separately or run the SQL some other way.

## Contributing
**DOCUMENT ALL CHANGES AS CHANGE SCRIPTS**

Use this format for changes: YYYY-MM-DD_[descriptive-name].psql

Try to make scripts idempotent when possible.

## Production
Would use something like Amazon's service, most likely: https://aws.amazon.com/free/database/