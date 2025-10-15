const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require('../models/user');
const logger =require('../logger/logger')

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]
  logger.info("secretkey",config.secretkey);
  logger.info("t",token);
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
 
  jwt.verify(token,
            config.secretkey,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              logger.info("decoded",decoded.id);
              next();
            });
};
const isAdmin = async (req, res, next) => {
  console.log("is admin------")
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).send({ message: "User not found." });
    if (user.role == "admin") {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
};
module.exports = {
   verifyToken,isAdmin
};

 