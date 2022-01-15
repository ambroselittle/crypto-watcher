const { Router } = require('express');

const router = new Router();

router.use('/pairs', require('./pairs'));
router.use('/monitors', require('./monitors'));

module.exports = router;