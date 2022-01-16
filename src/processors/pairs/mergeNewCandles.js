module.exports = {
    process: async (data, context) => {
        console.log('Hourly', context.pair);

        if (!Array.isArray(context.pair.candles)) {
            context.pair.candles = []; // should happen when no existing data for last day from db
        }
        // append new to any existing--to use in updating stdev
        context.pair.candles = [
            ...context.pair.candles,
            ...context.pair.newCandles,
        ];

        delete context.pair.newCandles;

        return { data, context };
    }
}