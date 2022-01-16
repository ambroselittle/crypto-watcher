
// see https://docs.cryptowat.ch/rest-api/markets/ohlc for positioning of data
const CLOSE_TIME = 0;
const VOLUME = 5;

module.exports = {
    prerequisites: ['getPairLatest'],
    runIf: async (data, context) => Array.isArray(context.pair.newCandles) && context.pair.newCandles.length > 0,
    process: async (data, context) => {
        // we
        context.pair.newCandles = context.pair.newCandles.map(candle => ({
            close_time: candle[CLOSE_TIME],
            volume: candle[VOLUME],
        }));

        // to save formatted data: require('fs').writeFileSync(require('path').join(__dirname, './__test__/formatPairData.json'), JSON.stringify(context.pair.newCandles));

        return { data, context };
    },
}