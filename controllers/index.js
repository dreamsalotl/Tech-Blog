const router = require('express').Router();

const dashboardRoutes = require('./dashRoutes.js');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require("./api")

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;