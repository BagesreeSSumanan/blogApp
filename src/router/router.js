 const express = require('express');
 const router = express.Router();
const {insertUser,loginUser,insertBlog,insertComment}= require('../controller/controller');
const {userValidationRules,validate,} =require('../validation/validator')
const {verifyToken} =require('../middlewares/tokenverification')

router.post("/insertUser", userValidationRules(),validate,insertUser);
router.get("/loginUser", userValidationRules(),validate,loginUser);
router.post("/inserBlog", verifyToken,insertBlog);
router.post("/insertComment", verifyToken,insertComment);
 module.exports = router;