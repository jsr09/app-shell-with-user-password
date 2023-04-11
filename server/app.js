const express = require("express");
const morgan = require("morgan");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const { User } = require("./models");

//Logging Middleware
app.use(morgan("dev"));

//Static Middleware
app.use(express.static(path.join(__dirname, "../public")));

//Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//token authentication middleware
app.use(async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

//Auth and API Routes
app.use('/auth', require('./auth'));
app.use("/api", require("./api"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//sends index.html
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//error handling endware
app.use(function (err, req, res, next) {
  console.log(err);
  console.error(err.stack);
  res.satus(err.status || 500).send(err.message || "Internal Server Error");
});

module.exports = app;
