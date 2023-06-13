const express = require('express');
const router = express.Router();
const blogRouter = require('./blog.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');

const routes = [
	{
		path: '/blogs',
		route: blogRouter,
	},
	{
		path: '/users',
		route: userRouter,
	},
	{
		path: '/auth',
		route: authRouter,
	},
];

routes.map((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
