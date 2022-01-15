const { compose } = require('compozor');

const listPairsProcess = compose('List Pairs', {
    processorsPath: require('path').join(__dirname, './processors'),
    pipeline: [
        'getPairs',
    ],
})

const listPairs = (req, res) => {
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
