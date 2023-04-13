const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

//Logging Middleware
app.use(morgan("dev"));

//Static Middleware
app.use(express.static(path.join(__dirname, "../public")));

//Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Auth and API Routes
app.use("/api", require("./api"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//sends index.html
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//redirects to login page if not logged in
// app.use("*", function (req, res) {
//   res.redirect("/login");
// });


//error handling endware
app.use(function (err, req, res, next) {
  console.log(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

module.exports = app
