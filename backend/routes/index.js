const router = require('express').Router();

const auth = require('./auth.route');
const hotel = require('./hotel.route');
const weather = require('./weather.route');

router.use('/auth', auth);
router.use('/hotel', hotel);
router.use('/weather', weather);

module.exports = router;
