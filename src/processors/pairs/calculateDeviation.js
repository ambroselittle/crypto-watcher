const stDev = require('node-stdev');

module.exports = {
    prerequisites: ['getPairLatest'],

    process: async (data, context) => {
        context.pair.stdDev = stDev.population(context.pair.candles.map(candle => candle.volume));

        return { data, context };
    },
}