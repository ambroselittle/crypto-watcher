const axios = require('axios');

const MARKET_API_ROOT = process.env.MARKET_API_ROOT || 'https://api.cryptowat.ch';
const API_KEY_HEADER = 'X-CW-API-Key';
const API_KEY_VALUE = process.env.MARKET_API_KEY;
const PERIOD_INDICATOR = 60;

const getPath = (exchange, pair) => `/markets/${exchange}/${pair}/ohlc`;

const { inspect } = require('util');
const axiosConverter = (obj) => {
    if (obj && obj.isAxiosError) {
        obj.config = obj.config || {};
        const newObj = {
            message: obj.message,
            code: obj.code,
            method: obj.config.method,
            url: obj.config.url,
            timeout: obj.config.timeout,
            syscall: obj.syscall,
            address: obj.address,
            port: obj.port,
            headers: inspect(obj.config.headers ?? {}, { depth: 10 }),
            data: inspect(obj.config.data ?? {}, { depth: 10 }),
        };
        return newObj;
    }
    return obj;
}

module.exports = {
    API_KEY_HEADER,
    PERIOD_INDICATOR,
    prerequisites: ['determineRecency'],
    process: async (data, context) => {
        let after = context.pair.last_poll_timestamp ?? context.candlesSince;
        if (after < context.candlesSince) {
            // we only get for recency time period
            after = context.candlesSince;
        }

        const requestOptions = {
            url: MARKET_API_ROOT + getPath(context.pair.exchange, context.pair.pair),
            params: {
                after,
                periods: PERIOD_INDICATOR,
            },
            headers: {
                [API_KEY_HEADER]: API_KEY_VALUE,
            }
        }

        try {
            const result = await axios(requestOptions);
            // to save realistic test data: require('fs').writeFileSync(require('path').join(__dirname, './__test__/getPairLatest.json'), JSON.stringify(result.data));

            // store on context
            // save the new separately, cuz we only need to save back the new, later
            context.pair.newCandles = result.data.result[PERIOD_INDICATOR];
        } catch (ex) {
            console.log('ERROR: Getting latest candles.', axiosConverter(ex));
        }

        return { data, context };
    },
}