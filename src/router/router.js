 const express = require('express');
 const router = express.Router();
const {insertUser,loginUser}= require('../controller/controller');
const {userValidationRules,validate,insertBlog} =require('../validation/validator')
const {verifyToken,isAdmin,isModerator} =require('../middlewares/tokenverification')

router.post("/insertUser", userValidationRules(),validate,insertUser);
router.get("/loginUser", userValidationRules(),validate,loginUser);
 module.exports = router;