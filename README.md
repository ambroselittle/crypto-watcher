This provides an API that enables charting the recent changes in crypto trading volumes for particular exchanges to/from crypto and currencies.

- [API Usage](#api-usage)
  - [List Pairs](#list-pairs)
  - [Get Pair Recent History](#get-pair-recent-history)
  - [Get Monitors](#get-monitors)
  - [Start Monitors](#start-monitors)
  - [Stop Monitors](#stop-monitors)
- [Contributing](#contributing)
  - [Testing](#testing)
  - [Database](#database)
  - [API](#api)
  - [Monitors/Source Data Ingestion](#monitorssource-data-ingestion)
    - [Pair Markets](#pair-markets)
- [Future TODO](#future-todo)
  - [Scalability](#scalability)
  - [Testing](#testing-1)
  - [Docs](#docs)
  - [Feature Request](#feature-request)

# API Usage
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
```json
{
    "ok": true,
    "data": {
        "pair": {
            "exchange": "kraken",
            "pair": "btcusd",
            "stdDev": 23.13,
            "rank": 3,
            "candles": [
                {
                    "close_time": 1642237200,
                    "volume": 2.1092801899999993
                },
                {
                    "close_time": 1642240800,
                    "volume": 54.268609270000006
                },
                {
                    "close_time": 1642244400,
                    "volume": 37.34892125000002
                },
                {
                    "close_time": 1642248000,
                    "volume": 9.12654546
                },
                {
                    "close_time": 1642251600,
                    "volume": 56.42605361000001
                },
                {
                    "close_time": 1642255200,
                    "volume": 20.665159980000006
                },
                {
                    "close_time": 1642258800,
                    "volume": 71.86545995
                },
                {
                    "close_time": 1642262400,
                    "volume": 57.77584118
                },
                {
                    "close_time": 1642266000,
                    "volume": 56.71860313000002
                },
                {
                    "close_time": 1642269600,
                    "volume": 96.96745536
                },
                {
                    "close_time": 1642273200,
                    "volume": 48.280697060000016
                },
                {
                    "close_time": 1642276800,
                    "volume": 20.672249769999997
                },
                {
                    "close_time": 1642280400,
                    "volume": 62.49637877999998
                },
                {
                    "close_time": 1642284000,
                    "volume": 46.73211655999998
                },
                {
                    "close_time": 1642287600,
                    "volume": 31.685291509999995
                },
                {
                    "close_time": 1642291200,
                    "volume": 40.94462434999999
                },
                {
                    "close_time": 1642294800,
                    "volume": 27.637590470000006
                }
            ]
        }
    }
}
```

## Get Monitors
Route: `GET /api/monitors`

Gets the currently configure monitors and their status.

Response Sample:
```json
{"monitors":[{"name":"Pair Volumes","isValid":true,"started":true}]}
```

## Start Monitors
Route: `GET /api/monitors/start`

Starts all configured monitors, and returns the status after starting.

Response is same as Get Monitors.

## Stop Monitors
Route: `GET /api/monitors/stop`

Stops all configured monitors, and returns the status after starting.

Response is same as Get Monitors.


# Contributing
Clone this repo and run `npm i` to install dependencies.

After setting up the database, you should be able to run `npm start`.

To run the monitors, you need to get an API key as noted in the [dev.env file](./etc/dev.env).

## Testing
Run `npm test` and it should start Jest in watch mode. Should add tests for any new processors, fill in gaps, add tests when fixing bugs.

## Database
We are using a Postgres SQL for local data store. See the [DB readme](./db/readme.md) for details/setup.

## API
We surface a [REST API as documented here](./api/../README.md).
## Monitors/Source Data Ingestion
In order to populate our local store (which functions more as an intermediary cache), we have a basic monitoring system that calls monitored data from external sources and transforms/saves as needed into our local database.

### Pair Markets
This monitor watches for our known exchange pairs. It should poll for updates as configured by the `PAIR_POLLING_INTERVAL_SEC` environment variable.

It should ensure we have data for at least the last 24 hours, in minute increments.

# Future TODO

There are a handful of "TODO" markers throughout the code. These would need to be done (at least) before this could be considered more or less fully functional. In this, I tried to find a happy medium between how I would "really" structure something like this and keeping this relatively runnable as a standalone sample.

## Scalability

* Docker - I started to make this somewhat dockerizable, but deferred that to focus on functionality. I prefer (generally) being able to run the "core" app directly while developing, because I find developing with docker to be painfully slow. But it is useful, especially for service dependencies that you may not easily/normally have running. So I'd put those into the docker compose for sure, even if I ran the API server on the host machine directly. I've done this hybrid approach with some success.
* Monitors - I would normally not just spin this up inside the API server process. I'd break that out so that it could be containerized and scaled. I might break it into two parts--one part would enqueue raw data. The other would do the processing and caching. Maybe.. depends on how fancy I thought we'd get.
* I was on the fence about granularity. I saw the "feature request" that indicated we'd need to compare per minute for alerts, so I thought getting data as minute would be good and then just aggregating hourly for charting/deviation. That ended up being a little problematic, so maybe I'd switch to hourly and just poll last period instead. Always a balance between storing enough detail to drill into the granularity you want and not just storing unnecessary stuff..

## Testing
I used my "compozor" framework to break things into easily testable units of work, and wrote some (not all) tests for those. In the real apps I use that on, I also tend to do some basic smoke testing on e2e for the configured processes, because some of them are dependent on each other. So that's one thing I'd probably add.

I usually set these up to execute on commit, and then also as a GitHub action for PRs--to run basic unit test CI.

Also, for a proper API, I'd have some actual API tests that exercise it via HTTP and ensure at least happy day and maybe some reasonable border cases are covered. We'd need to set up some proper mocking and/or DB setup/tear down to get closer to full integration tests.

## Docs
I like to use readme next the the relevant code, which I've shown a little here. I also normally add JSDoc (e.g., func-level) for functions, especially if they may be called outside of > 1 context.

For the API itself, I'd probably use some framework that made it easy to generate Open API docs (aka Swagger). That's if the API was intended to be used by something other than like one app it was specifically designed for.

## Feature Request
I started to anticipate this by grabbing candles by minute, as noted elsewhere. Not convinced that's right, but it could be if we polished some of the rough edges. Anyhow, the idea was to reuse the monitor in place. What we could add to that is a subscriber that would look for the alert condition and, if found, send the notification. That could be done through a variety of mechanisms: client polling, sockets (Web sockets, probably), and whatever other push notification tools might be available (e.g., for mobile devices).
