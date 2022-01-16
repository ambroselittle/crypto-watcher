const { compose, parallel } = require('compozor');

const updatePair = compose('Update Pair', {
    processorsPath: require('path').resolve('./src/processors/pairs'),
    pipeline: [
        'determineRecency',
        parallel(
            'getPairHistory', // get existing candles for the time period
            'getPairLatest', // get new since last poll or current time period
        ),
        'formatPairData',
        'saveNewCandles',
        'mergeNewCandles',
        'groupHistoryHourly', // we calculate deviation by the subset of time slices
        'calculateDeviation',
    ],
});

module.exports = {
    prerequisites: ['getPairs'],
    runIf: async (data) => Array.isArray(data.pairs) && data.pairs.length > 0,
    process: async (data, context) => {
        console.log('Updating Pairs', data.pairs);

        data.pairs.forEach(pair => {
            updatePair.fireAndForget({
                pair,
            });
        })
    },
}