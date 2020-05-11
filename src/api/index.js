const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const session = require('./session');
const business = require('./business');


router.use('/api/users', user);
router.use('/api/sessions', session);
router.use('/api/businesses', business);


module.exports = router;
