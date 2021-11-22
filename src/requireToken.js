const jwt = require('jsonwebtoken');

const secret = "UrielSecretBackgammon";

module.exports = (req, res, next) => {
	const token = req.get('Authorization');
	if (token) {
		try {
			req.payload = jwt.verify(token, secret);
			return next();
		} catch (err) {
			console.log(err);
		}
	}

	// No valid token
	res.status(403).json({ error: 'Invalid token' });
};