const Blog = require('../models/blog');
const Comment = require('../models/comments');
const mongoose = require('mongoose');


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

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const currentUserId = new mongoose.Types.ObjectId(req.userId);
    const currentComment = await Comment.findById(commentId);
    if (!currentComment) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    if (!currentComment.userId.equals(currentUserId)) {
        return res.status(403).json({ msg: "You are not authorized to delete this blog" });
        }
     const updatedData = {};
    if (req.body.CommentText) updatedData.CommentText = req.body.CommentText;

    const updatedComent = await Comment.findByIdAndUpdate(
      commentId,
      { $set: updatedData },
      { new: true } // returns the updated document
    );

    res.status(200).json({
      msg: "Comment updated successfully",
      data: updatedComent
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = { insertComment,updateComment};
