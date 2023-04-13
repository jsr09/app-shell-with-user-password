const express = require("express");
const morgan = require("morgan");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
console.log(process.env.JWT);
const app = express();
const { User } = require("./database/models/User");

//Logging Middleware
app.use(morgan("dev"));

//Static Middleware
app.use(express.static(path.join(__dirname, "../public")));

//Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//token authentication middleware


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

module.exports = app
