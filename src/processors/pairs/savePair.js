module.exports = {
    process: async (data, context) => {
        console.log('Save Pair', context.pair);

        // TODO: save pair summary (deviation/last polled) to pair database table
        // TODO: save new pair entries to pair_ohlc database table

        return { data, context };
    },
}