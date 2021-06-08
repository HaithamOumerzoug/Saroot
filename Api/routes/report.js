const express = require('express');
const router = express.Router();
const report = require('../controllers/reportController');


router.post('/report',report.report);
router.delete('/:id',report.deleteReport);
router.get('/showReportsByReported/:id',report.showReportsByReported);
router.get('/showReportsByReporter/:id',report.showReportsByReporter);
module.exports = router;