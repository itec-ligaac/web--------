const router = require('express').Router();

const auth = require('./auth.route');
const hotel = require('./hotel.route');

router.use('/auth', auth);
router.use('/hotel', hotel);

module.exports = router;
