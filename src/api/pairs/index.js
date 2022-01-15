const { Router } = require('express');

const router = new Router();

router.route('/')
    .get(require('./list').listPairs);

router.route('/:exchange/:pair/history')
    .get(require('./history').getPairHistory)

module.exports = router;