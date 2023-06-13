const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization;

		if (!authorization) {
			const err = new Error('Unauthorized!');
			err.status = 401;
			throw err;
		}

		const token = authorization.split(' ')[1];
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		const userId = payload.userId;
		const user = await User.findById(userId);

		if (!user) {
			const err = new Error('Unauthorized!');
			err.status = 401;
			throw err;
		}

		if (user.role !== 'admin') {
			const err = new Error('Forbidden!');
			err.status = 403;
			throw err;
		}

		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = authMiddleware;
