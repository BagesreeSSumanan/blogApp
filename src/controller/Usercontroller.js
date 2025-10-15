
const User = require('../models/user');
const Blog = require('../models/blog');
const Comment = require('../models/comments');
const config = require('../config/config');
const bcrypt=require('bcrypt');  
const jwt = require("jsonwebtoken");
const jwtexpiry =12000;
const logger = require('../logger/logger');

async function  insertUser(req, res) {
  const {email, password, roles} = req.body;
  await User.create({
    email: email,
    password: bcrypt.hashSync(password, 8),
    role:roles
    }).then(user => {
     
          res.send({ message: "User was registered successfully!" });
     
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
 logger.info(email,password);
  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
 
    const passwordIsValid = bcrypt.compareSync(password, user.password);
 
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }
 
    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, config.secretkey, {
      algorithm: "HS256",
      expiresIn: jwtexpiry, // 24 hours
    });
 
    // Get user's roles and create an array of authorities
    const authorities = [];
    const roles = await user.role;
    if (roles) {
      authorities.push("ROLE_" + roles.toUpperCase());
    }
 
    // Send the response with user details and token
    res.status(200).send({
      id: user.id,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    logger.info(err);
    res.status(500).send({ message: err.message });
  }
}

module.exports = { insertUser,loginUser,};