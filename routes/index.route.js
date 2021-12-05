const express = require('express');
const apiRoutes = require('./api.route');
const userRoutes = require('./user.route');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/', userRoutes); 
router.use('/api', apiRoutes);
module.exports = router;
