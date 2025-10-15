const Blog = require('../models/blog');
const Comment = require('../models/comments');

async function insertComment(req, res) {
  try {
    const { CommentText, BlogId } = req.body;
    const userId = req.userId;

    const blog = await Blog.findById(BlogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }


    const comment = new Comment({
      userId: userId,
      CommentText: CommentText,
      BlogId :BlogId
    });

    await comment.save();

    res.status(201).json({ message: 'Comment added successfully', blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = { insertComment};
