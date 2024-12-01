const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');

router.get('/getReport', reportController.GetReport);
router.get('/getFirstOrder', reportController.GetReportFirst);

module.exports = router;