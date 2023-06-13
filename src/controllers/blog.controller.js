const Blog = require('../models/blog.model');

const getBlogs = async (req, res, next) => {
	try {
		const blogs = await Blog.find().populate({
			path: 'author',
			select: '-createdAt -updatedAt -__v',
		});
		res.status(200).json({ blogs });
	} catch (err) {
		next(err);
	}
};

const getBlog = async (req, res, next) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findById(blogId).populate({
			path: 'author',
			select: '-createdAt -updatedAt -__v',
		});
		if (!blog) {
			const err = new Error('Blog not found!');
			err.status = 404;
			throw err;
		}
		res.status(200).json({ blog });
	} catch (err) {
		next(err);
	}
};

const createBlog = async (req, res, next) => {
	const newBlog = req.body;
	try {
		const { title, content } = newBlog;
		if (!title || !content) {
			const err = new Error('Title or content is required!');
			err.status = 400;
			throw err;
		}
		if (!newBlog.author) {
			const err = new Error('Author is required!');
			err.status = 400;
			throw err;
		}
		const blog = await Blog.create(newBlog);
		if (!blog.image) blog.image = req.file.filename;
		res.status(201).json({ blog });
	} catch (err) {
		next(err);
	}
};

const updateBlogById = async (req, res, next) => {
	const { blogId } = req.params;
	const newBlog = req.body;
	try {
		const { title, content } = newBlog;
		if (!title || !content) {
			const err = new Error('Title or content is required!');
			err.status = 400;
			throw err;
		}
		if (!newBlog.author) {
			const err = new Error('Author is required!');
			err.status = 400;
			throw err;
		}
		const blog = await Blog.findByIdAndUpdate(blogId, newBlog);
		if (!blog) {
			const err = new Error('Blog not found!');
			err.status = 404;
			throw err;
		}
		res.status(200).json({ blog });
	} catch (err) {
		next(err);
	}
};

const deleteBlogById = async (req, res, next) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findByIdAndDelete(blogId);
		if (!blog) {
			const err = new Error('Blog not found!');
			err.status = 404;
			throw err;
		}
		res.status(200).json({ blog });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getBlogs,
	getBlog,
	createBlog,
	updateBlogById,
	deleteBlogById,
};
