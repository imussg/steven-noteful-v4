'use strict';
 
const express = require('express');
const passport = require('passport');

const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const router = express.Router();

function createAuthToken (user) {
	return jwt.sign({ user }, JWT_SECRET, {
		subject: user.username,
		expiresIn: JWT_EXPIRY
	});
}

const localAuth = passport.authenticate('local', {session: false, failWithError: true});

router.post('/', localAuth, function (req, res) {
	const authToken = createAuthToken(req.user);
	res.json({ authToken });
});

module.exports = router;
