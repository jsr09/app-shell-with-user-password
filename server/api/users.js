const express = require("express");
const router = express.Router();
const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

const authMiddleware = async function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    console.log(token);
    try {
      const id = jwt.verify(token, process.env.JWT);
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
      next(error);
    }
  } else {
    next();
  }
}

// Get /api/user/profile
router.get("/profile", authMiddleware, async (req, res, next) => {
  try {
    console.log(req.user);
    if(req.user)
    res.json(req.user);
  } catch (error) {
    res.status(400).json({message: 'Please log in'});
    next(error);
  }
});

//Post/api/user/profile

//Put/api/user/profile

//delete/api/user/profile

module.exports = router
