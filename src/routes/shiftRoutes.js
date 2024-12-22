const express = require('express');
const ShiftController = require('../controllers/ShiftController');

const router = express.Router();

router.get('/shifts', ShiftController.getAllShifts);

module.exports = router;
