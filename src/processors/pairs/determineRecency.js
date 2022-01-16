const { addDays } = require('date-fns');

const TEST_RECENCY = process.env.RECENCY_TIME_MS; // allow for this to be configured (mostly for the history API to work with the seed data ;) )

module.exports = {
    /** Calculates the time period we use for "recent" history */
    process: async (data, context) => {
        // for now it's hard coded one day
        const oneDayAgo = addDays(Date.now(), -1).getTime();
        context.candlesSince = Number(TEST_RECENCY) || oneDayAgo;
        return { data, context };
    }
}