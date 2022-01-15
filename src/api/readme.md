# REST API
This folder contains code pertaining to the APIs we are exposing using REST-like endpoints.

We use Express routing. Everything will live under `/api`.

If your API is simple enough, just put it in one file named after the next-level route.

Single File Ex: [monitors](./monitors.js)

More typically, you will create a folder that has an `index.js`, which exports all the sub-routes for that particular API.

Multi-File Ex: [pairs](./pairs/).

In either case, the default export should be the relevant Express router.

Add this to the [routes.js](./routes.js) file, following the examples there. That should contain all routes for the API and is imported/used in [server.js](../server.js) to wire up all of them under `/api`.

**Recommended**: Use the [`compozor`](https://github.com/ambroselittle/compozor) framework for your APIs and add tests for individual processors. See the pairs API for examples.

## Database Access
You should use the exports from [db.js](../lib/db.js) for querying this solution's Postgres db. The `sql` export is handy for more readable string templating of queries, and helps avoid SQL injection problems. See example in [the getPairs processor](./pairs/processors/getPairs.js).