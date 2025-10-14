const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require('../models/user');
 
 
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]
  console.log("secretkey",config.secretkey);
  console.log("t",token);
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
              console.log("decoded",decoded.id);
              next();
            });
};
