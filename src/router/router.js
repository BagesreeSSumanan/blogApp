 const express = require('express');
 const router = express.Router();
const {insertUser,loginUser}= require('../controller/Usercontroller');
const {insertBlog,getAllBlogsWithComments}= require('../controller/BlogController');
const {insertComment}= require('../controller/CommentController');
const {userValidationRules,validate,} =require('../validation/validator')
const {verifyToken} =require('../middlewares/tokenverification')

router.post("/insertUser", userValidationRules(),validate,insertUser);
router.get("/loginUser", userValidationRules(),validate,loginUser);
router.post("/inserBlog", verifyToken,insertBlog);
router.post("/insertComment", verifyToken,insertComment);
router.post("/getAllBlogsWithComments", verifyToken,getAllBlogsWithComments);
 module.exports = router;