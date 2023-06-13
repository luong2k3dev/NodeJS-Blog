const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		image: {
			type: String,
			default: null,
		},
		comment: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
