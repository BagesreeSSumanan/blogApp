const Blog = require('../models/blog');
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
module.exports = {insertBlog};