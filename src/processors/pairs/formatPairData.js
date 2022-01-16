
// see https://docs.cryptowat.ch/rest-api/markets/ohlc for positioning of data
const CLOSE_TIME = 0;
const VOLUME = 5;

module.exports = {
    prerequisites: ['getPairLatest'],
    runIf: async (data, context) => Array.isArray(context.pair.candles) && context.pair.candles.length > 0,
    process: async (data, context) => {
        // we
        context.pair.candles = context.pair.candles.map(candle => ({
            close_time: candle[CLOSE_TIME],
            volume: candle[VOLUME],
        }));

        // to save formatted data: require('fs').writeFileSync(require('path').join(__dirname, './__test__/formatPairData.json'), JSON.stringify(context.pair.candles));

        return { data, context };
    },
}