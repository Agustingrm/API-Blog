var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var passport = require("passport");
// const session = require("express-session");
// const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
var cors = require("cors");
var compression = require("compression");
var helmet = require("helmet");
require("dotenv").config();
var slash = require("express-slash");

// const User = require("./models/userModel");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var commentsRouter = require("./routes/comments");

var app = express();

app.use(slash());
app.use(cors());

app.use(compression()); //Compress all routes
app.use(helmet());

//Passport to persist sessions
// app.use(session({ secret: 'rome', resave: false, saveUninitialized: true, cookie: { expires: 240000 } }));

/** HEADER START */
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
//   next();
// });
// app.options("/*", function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
//   res.send(200);
// });
/** HEADER END */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (res) {
//           // passwords match! log user in
//           return done(null, user);
//         } else {
//           // passwords do not match!
//           return done(null, false, { message: "Incorrect password" });
//         }
//       });
//     });
//   })
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// app.use(passport.initialize());
// app.use(passport.session());

//User available everywhere
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//Set up mongoose connection
var mongoose = require("mongoose");
var dev_db_url = `${process.env.mongoDB}`;
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments/:id", commentsRouter);

function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], process.env.secretKeyToken, function (err, decoded) {
    if (err) {
      res.json({ message: err.message });
    } else {
      console.log(decoded);
      next();
    }
  });
}

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
  res.render("error");
});

module.exports = app;
