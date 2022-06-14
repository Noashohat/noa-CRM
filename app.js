var express = require("express");
var path = require("path");
var logger = require("morgan");
const createError = require("http-errors");

const auth = require("./middleware/auth");

var customersRouter = require("./routes/customers");
var cardsRouter = require("./routes/cards");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client")));

// app.use("/", indexRouter);
// app.use("/users", auth, usersRouter);
// app.use("/customers", customersRouter);
// app.use("/cards", auth, cardsRouter);

// catch 404 err forward error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// custom error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(500).send(err);
});

module.exports = app;
