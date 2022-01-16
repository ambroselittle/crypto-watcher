const { compose } = require('compozor');

const getPairHistoryProcess = compose('Get Pair History', {
    processorsPath: require('path').resolve('./src/processors/pairs'),
    pipeline: [
        'determineRecency',
        'getPairHistory',
        'groupHistoryHourly',
        'sendHistory',
    ],
})

const getPairHistory = (req, res) => {
    // note: exception handling is done in the compozor framework for us..
    getPairHistoryProcess.send(res, {
        params: {
            ...req.query,
            ...req.params,
        },
    });
}

module.exports = {
    getPairHistory,
}
