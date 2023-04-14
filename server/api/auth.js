const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../database/models/User");

//Post/api/login route is the landing page for the app
router.post("/login", async (req, res) => {
  try {
    console.log('login route being accessed');
    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 

    const validPassword = await user.validPassword(req.body.password);
    console.log("validPassword: ", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: rememberMe ? "30d" : "1d", // Set the expiration time based on whether "Remember Me" is checked
    });
    console.log("token: ", token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
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