 const express = require('express');
 const router = express.Router();
const {insertUser,loginUser}= require('../controller/Usercontroller');
const {insertBlog,getAllBlogsWithComments,getcurrentUserBlogs,deleteBlog}= require('../controller/BlogController');
const {insertComment}= require('../controller/CommentController');
const {userValidationRules,validate,} =require('../validation/validator')
const { commentValidator } = require('../validation/CommentValidation');
const {blogValidationRules,validateBlog} = require('../validation/BlogValidation')
const {verifyToken,isAdmin} =require('../middlewares/tokenverification')

router.post("/insertUser", userValidationRules(),validate,insertUser);
router.get("/loginUser", userValidationRules(),validate,loginUser);
router.post("/inserBlog", verifyToken,blogValidationRules(),validateBlog,insertBlog);
router.post("/insertComment", verifyToken,commentValidator,insertComment);
router.get("/getAllBlogsWithComments", verifyToken,isAdmin,getAllBlogsWithComments);
router.get("/getcurrentUserBlogs", verifyToken,getcurrentUserBlogs);
router.delete("/DeleteBlog/:id", verifyToken,deleteBlog);

module.exports = router;