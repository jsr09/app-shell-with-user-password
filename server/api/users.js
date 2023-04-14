const express = require("express");
const router = express.Router();
const { User } = require("../database/models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

const authMiddleware = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next(error);

    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Get /api/user/profile
router.get("/profile", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
});

//Post/api/user/profile

//Put/api/user/profile

//delete/api/user/profile

module.exports = router
