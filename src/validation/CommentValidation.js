const mongoose = require('mongoose');

const commentValidator = (req, res, next) => {
    let blogId = req.body.BlogId 

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: 'Invalid Blog ID format' });
    }
    next();
};

module.exports = {
  commentValidator
};
