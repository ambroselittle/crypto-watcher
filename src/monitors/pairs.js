const { compose } = require('compozor');

const PAIR_POLLING_INTERVAL_SEC = Number.parseInt(process.env.PAIR_POLLING_INTERVAL_SEC) || 60;

const monitorPairs = compose('Monitor Pair Volumes', {
    processorsPath: require('path').join(__dirname, './processors'),
    pipeline: [
        'getPairs',
        'updatePairs',
    ],
});

module.exports = {
    name: 'Pair Volumes',
    start: monitorPairs.fireAndForget,
    interval: PAIR_POLLING_INTERVAL_SEC * 1000,
}