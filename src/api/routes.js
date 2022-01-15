const { Router } = require('express');

const router = new Router();

router.use('/monitors', require('./monitors'));

module.exports = router;