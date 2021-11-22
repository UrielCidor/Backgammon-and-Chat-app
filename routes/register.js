/*
API route for handling account registration.
*/

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// const secret = "UrielSecretBackgammon";

const { User, AccountToken } = require('../src/database');

module.exports = (router) => {
	router.post(
		'/register',

		// Validate username and password lengths
		[
			check('username').isString().isLength({ min: 3, max: 32 }),
			check('password').isString().isLength({ min: 5, max: 256 }),
		],
		async (req, res) => {
			const errors = validationResult(req);

			// If there are validation errors, return
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const { username, password, email } = req.body;

			// If the username already exists, return
			if (await User.exists({ username })) {
				return res.status(423).json({ error: 'Username already exists' });
			}

			// If the email already is in use, return
			if (await User.exists({ email })) {
				return res.status(423).json({ error: 'Email already in use' });
			}

			// Convert password into passwordHash using bcrypt hashing
			const passwordHash = await bcrypt.hash(password, 10);
			const averageWPM = 0;
			const gamesCompleted = 0;
			const gamesWon = 0;

			// Create a new user in the database with given username, email, passwordHash
			const user = await User.create({
				username,
				passwordHash,
				email,
				averageWPM,
				gamesCompleted,
				gamesWon,
			});
            
            //******Creat Chat room with each other user******* */

			// Create an account verification token
			const accountToken = await AccountToken.create({
				userId: user._id,
				token: crypto.randomBytes(16).toString('hex'),
			});

			res.json({
				user: {
					_id: user._id,
					username: user.username,
				},
			});
		}
	);
};