const { compose } = require('compozor');

const updatePair = compose('Update Pair', {
    processorsPath: require('path').join(__dirname, './'),
    pipeline: [
        'getPairLatest',
        'calculateDeviation',
        'savePair',
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