const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
	const { userName, password, fullName } = req.body;
	try {
		if (!userName) {
			const err = new Error('User name is required!');
			err.status = 400;
			throw err;
		}

		const existingUser = await User.findOne({ userName });
		if (existingUser) {
			const err = new Error('User already exists!');
			err.status = 400;
			throw err;
		}

		const user = await User.create({ userName, password, fullName });
		res.status(201).json({ user });
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			const err = new Error('User name or password is incorrect!');
			err.status = 401;
			throw err;
		}

		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});
		res.status(200).json({ token });
	} catch (err) {
		next(err);
	}
};

module.exports = { register, login };
