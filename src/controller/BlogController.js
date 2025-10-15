const Blog = require('../models/blog');
const Comment = require('../models/comments');
const logger = require('../logger/logger');

async function insertBlog(req, res) {
  try {
    const { title, content } = req.body;

    const userId = req.userId;

    const blog = new Blog({
      title,
      content,
      author: userId   // store userId as reference
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const getAllBlogsWithComments = async (req, res) => {
  try {
    const blogs = await Blog.find().lean();

    if ( blogs.length === 0) {
      return res.status(404).json({ msg: "No blogs found" });
    }

    for (let blog of blogs) {
      const comments = await Comment.find({ BlogId: blog._id })
        .select('CommentText userId createdAt BlogId')
        .lean();

      blog.comments = comments; 
    }

    return res.status(200).json({Blogs: blogs });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ msg: "Unable to fetch blogs" });
  }
};
module.exports = {insertBlog,getAllBlogsWithComments};