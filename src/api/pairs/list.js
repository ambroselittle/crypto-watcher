const { compose } = require('compozor');

const listPairsProcess = compose('List Pairs', {
    processorsPath: require('path').resolve('./src/processors/pairs'),
    pipeline: [
        'getPairs',
    ],
})

const listPairs = (req, res) => {
    // note: exception handling is done in the compozor framework for us..
    listPairsProcess.send(res, {
        params: {
            ...req.query,
            ...req.params,
        },
    });
}

module.exports = {
    listPairs,
}
