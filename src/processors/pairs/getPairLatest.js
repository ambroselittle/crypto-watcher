const axios = require('axios');
const { addDays } = require('date-fns');

const MARKET_API_ROOT = process.env.MARKET_API_ROOT || 'https://api.cryptowat.ch';
const API_KEY_HEADER = 'X-CW-API-Key';
const API_KEY_VALUE = process.env.MARKET_API_KEY;
const PERIOD_INDICATOR = 60;

const getPath = (exchange, pair) => `/markets/${exchange}/${pair}/ohlc`;

module.exports = {
    process: async (data, context) => {
        // console.log('Get Pair Latest:', context.pair);

        let after = context.pair.last_poll_timestamp;
        if (!after) {
            // default to a day ago
            const oneDayAgo = addDays(Date.now(), -1).getTime();
            after = oneDayAgo;
        }

        const requestOptions = {
            url: MARKET_API_ROOT + getPath(context.pair.exchange, context.pair.pair),
            params: {
                after: context.pair.last_poll_timestamp,
                periods: PERIOD_INDICATOR,
            },
            headers: {
                [API_KEY_HEADER]: API_KEY_VALUE,
            }
        }

        const result = await axios(requestOptions);
        // to save realistic test data: require('fs').writeFileSync(require('path').join(__dirname, './__test__/getPairLatest.json'), JSON.stringify(result.data));

        // store on context
        context.pair.candles = result.data.result[PERIOD_INDICATOR];

        return { data, context };
    },
}