const express = require('express');

const {
	getUsers,
	getUserById,
	createUser,
	updateUserById,
	deleteUserById,
} = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(authMiddleware, createUser);

userRouter
	.route('/:userId')
	.get(getUserById)
	.put(authMiddleware, updateUserById)
	.delete(authMiddleware, deleteUserById);

module.exports = userRouter;
