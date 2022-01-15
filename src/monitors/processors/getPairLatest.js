const axios = require('axios');

const MARKET_API_ROOT = process.env.MARKET_API_ROOT || 'https://api.cryptowat.ch';
const API_KEY_HEADER = 'X-CW-API-Key';
const API_KEY_VALUE = process.env.MARKET_API_KEY;

const getPath = (exchange, pair) => `/markets/${exchange}/${pair}/ohlc`;

module.exports = {
    process: async (data, context) => {
        console.log('Get Pair Latest:', context.pair);

        const requestOptions = {
            url: MARKET_API_ROOT + getPath(context.pair.exchange, context.pair.pair_name),
            headers: {
                [API_KEY_HEADER]: API_KEY_VALUE,
            }
        }

        const result = await axios()

        return { data, context };
    },
}