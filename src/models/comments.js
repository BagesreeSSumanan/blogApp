const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  CommentText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId :{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
  BlogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
