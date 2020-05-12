const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const session = require('./session');
const business = require('./business');
const locations = require('./locations');


router.use('/api/users', user);
router.use('/api/sessions', session);
router.use('/api/businesses', business);
router.use('/api/locations', locations);


module.exports = router;
