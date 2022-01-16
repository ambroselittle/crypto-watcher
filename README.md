# crypto-watcher
This provides an API that enables charting the recent changes in crypto trading volumes for particular exchanges to/from crypto and currencies.

## List Pairs
Route: `GET /api/pairs`

Gets a list of pairs for which we currently have histories.

Response Sample:
```json
{
    "ok": true,
    "data": {
        "pairs": [
            {
                "id": 1,
                "exchange": "kraken",
                "pair_name": "btcusd",
                "last_poll_timestamp": null,
                "day_std_dev": null
            },
            {
                "id": 2,
                "exchange": "kraken",
                "pair_name": "ltcusd",
                "last_poll_timestamp": null,
                "day_std_dev": null
            },
            {
                "id": 3,
                "exchange": "kraken",
                "pair_name": "ethusd",
                "last_poll_timestamp": null,
                "day_std_dev": null
            }
        ]
    }
}
```

## Get Pair Recent History
Route: `GET /api/pairs/:exchange/:pair/history`

Gets the history for a particular pair on a particular exchange.

Response Sample:
// TODO: Add sample response
```json

```

## Contributing
Clone this repo and run `npm i` to install dependencies.

### Database
We are using a Postgres SQL for local data store. See the [DB readme](./db/readme.md) for details/setup.

### API
We surface a [REST API as documented here](./api/../README.md).
### Monitors/Source Data Ingestion
In order to populate our local store (which functions more as an intermediary cache), we have a basic monitoring system that calls monitored data from external sources and transforms/saves as needed into our local database.

#### Pair Markets
This monitor watches for our known exchange pairs. It should poll for updates as configured by the `PAIR_POLLING_INTERVAL_SEC` environment variable.

It should ensure we have data for at least the last 24 hours.