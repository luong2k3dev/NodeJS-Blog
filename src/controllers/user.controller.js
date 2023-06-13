const User = require('../models/user.model');

const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json({ users });
	} catch (err) {
		next(err);
	}
};

const getUserById = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);
		if (!user) {
			const err = new Error('User not found!');
			err.status = 404;
			throw err;
		}
		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};

const createUser = async (req, res, next) => {
	const newUser = req.body;
	try {
		if (!newUser.userName) {
			const err = new Error('User name is required!');
			err.status = 400;
			throw err;
		}
		const checkUser = await User.findOne({ userName: newUser.userName });
		if (checkUser) {
			const err = new Error('User already exists!');
			err.status = 400;
			throw err;
		}
		const user = await User.create(newUser);
		res.status(201).json({ user });
	} catch (err) {
		next(err);
	}
};

const updateUserById = async (req, res, next) => {
	const { userId } = req.params;
	const newUser = req.body;
	try {
		if (!newUser.userName) {
			const err = new Error('User name is required!');
			err.status = 400;
			throw err;
		}
		const user = await User.findByIdAndUpdate(userId, newUser);
		if (!user) {
			const err = new Error('User not found!');
			err.status = 404;
			throw err;
		}
		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};

const deleteUserById = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await User.findByIdAndDelete(userId);
		if (!user) {
			const err = new Error('User not found!');
			err.status = 404;
			throw err;
		}
		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
};
