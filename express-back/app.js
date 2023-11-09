const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose");

const config = require("./config/app");
require("dotenv").config();

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api.js");
const authRouter = require("./routes/auth.js");

const userService = require("./service/user-service.js");
const testService = require("./service/test-service.js");

const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

// Custom request tracing middleware
app.use((req, res, next) => {
  console.log("Received a request:");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);

  // If you want to log the request body as well:
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    console.log("Request Body:", body);
    next(); // Continue processing the request
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err });
});

app.use(errorMiddleware);

const initialize = () => {
  try {
    userService.fillUsers();
    testService.fillTests();
  } catch (err) {
    console.log("Users and/or tests can't initializing in database!");
  }
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: config.MongoDB.selectionTimeout,
    });
    console.log("Connection to MongoDB server is established...");
    initialize();
  } catch (err) {
    console.log(
      "Can't connection to MongoDB server, will try after some seconds"
    );
    setTimeout(() => {
      connectToMongoDB();
    }, config.MongoDB.restartSec);
  }
};

connectToMongoDB();

module.exports = app;
