const Blog = require('../models/blog');
const Comment = require('../models/comments');
const logger = require('../logger/logger');
const mongoose = require('mongoose');
const comments = require('../models/comments');

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
    const blogsWithComments = await Blog.aggregate([
      {
        $lookup: {
          from: 'comments',         
          localField: '_id',        
          foreignField: 'BlogId',  
          as: 'comments'           
        }
      }
    ]);

    if (!blogsWithComments || blogsWithComments.length === 0) {
      return res.status(404).json({ msg: "No blogs found" });
    }

    return res.status(200).json({ Blogs: blogsWithComments });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ msg: "Unable to fetch blogs"});
  }
};
const getcurrentUserBlogs = async (req, res) => {
  try {
   const currentUserId = new mongoose.Types.ObjectId(req.userId);
    logger.info(currentUserId);
    const blogsWithComments = await Blog.aggregate([
      {
        $match: { author: currentUserId } // only blogs of current user
      },
      {
        $lookup: {
          from: 'comments',         
          localField: '_id',        
          foreignField: 'BlogId',  
          as: 'comments'           
        }
      }
    ]);

    if (!blogsWithComments || blogsWithComments.length === 0) {
      return res.status(404).json({ msg: "No blogs found" });
    }

    return res.status(200).json({ Blogs: blogsWithComments });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ msg: "Unable to fetch blogs"});
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const currentUserId = new mongoose.Types.ObjectId(req.userId);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    if (!blog.author.equals(currentUserId)) {
        return res.status(403).json({ msg: "You are not authorized to delete this blog" });
        }
    const deleteBlog = await Blog.findByIdAndDelete(blogId, { useFindAndModify: false });
    await Comment.deleteMany({ BlogId: blogId });

    res.status(200).json({
      msg: "Blog and associated Comment deleted successfully",
      data: deleteBlog
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const currentUserId = new mongoose.Types.ObjectId(req.userId);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    if (!blog.author.equals(currentUserId)) {
        return res.status(403).json({ msg: "You are not authorized to delete this blog" });
        }
     const updatedData = {};
    if (req.body.title) updatedData.title = req.body.title;
    if (req.body.content) updatedData.content = req.body.content;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: updatedData },
      { new: true } // returns the updated document
    );

    res.status(200).json({
      msg: "Blog updated successfully",
      data: updatedBlog
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = {insertBlog,getAllBlogsWithComments,getcurrentUserBlogs,deleteBlog,updateBlog};