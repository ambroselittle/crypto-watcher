module.exports = {
    process: async (data, context) => {
        // TODO: save new pair entries to pair_ohlc database table
        console.log('TODO: Save New Pair Candles', context.pair);

        return { data, context };
    },
}