const router = require('express').Router();

const auth = require('./auth.route');
const hotel = require('./hotel.route');
const covid = require('./covid.route');

router.use('/auth', auth);
router.use('/hotel', hotel);
router.use('/covid', covid);

module.exports = router;
