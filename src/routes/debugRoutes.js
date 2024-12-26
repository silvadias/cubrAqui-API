const express = require('express');
const debug = require('../../debug');

const router = express.Router();

router.get('/', debug);

module.exports = router;
