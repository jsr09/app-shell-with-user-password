const express = require("express");
const router = express.Router();
const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


//Post/api/login route is the landing page for the app
router.post("/login", async (req, res, next) => {
  try {
    console.log("login route being accessed");
    // const { email, password } = req.body;
    const email = "john.doe@example.com";
    const password = "password1";

    
    const user = await User.findAll({ where: { email } });
    console.log("User found:", user);

    const validPassword = await user.validPassword(password);
    console.log("validPassword: ", validPassword);

    if(!user ||!validPassword) {
      res.status(401).json({ message: "Invalid email or password" });
    }

    // if (!user) {
    //   return res.status(401).json({ message: "User not found" });
    // } 

    // const validPassword = await user.validPassword(password);
    // console.log("validPassword: ", validPassword);

    // if (!validPassword) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }
    const token = jwt.sign({userId: user.id}, process.env.JWT, {
      expiresIn: rememberMe ? "30d" : "1d", // Set the expiration time based on whether "Remember Me" is checked
    });
    res.json({ token });
    console.log("token: ", token);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
    next(err);
  }
});

//Post/api/registration
router.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;