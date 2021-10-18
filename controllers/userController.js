const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
var passport = require("passport");

exports.getAll = async (req, res, next) => {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (e) {}
};

exports.create_post = [
  // Validate and sanitise fields.
  body("firstName", "First Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("lastName", "Last Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("username", "Username must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("email", "Email must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("password", "Password must be ar least 8 characters.").trim().isLength({ min: 8 }).escape(),
  body("passwordConfirmation", "Password Confirmation must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value, { req }) => {
      //Verifies if password and password confirmation match
      if (value !== req.body.password) throw new Error("Passwords do not macht");
      return true;
    }),
  async (req, res, next) => {
    try {
      const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const document = await user.save();
      res.json(document);
    } catch (e) {
      next(e);
    }
  },
];

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

// exports.login_post = async (req, res, next) => {
//   try {
//     const user = await userModel.findOne({ username: req.body.username });
//     if (!user) {
//       res.json({ message: "There is no user registered with this username" });
//       return;
//     }
//     if (bcrypt.compareSync(req.body.password, user.password)) {
//       const token = jwt.sign({ userId: user._id }, process.env.secretKeyToken, { expiresIn: "2h" });
//       res.status(201).json({token:token})
//       return;
//     } else {
//       res.json({ message: "Incorrect Password" });
//       return;
//     }
//   } catch (e) {
//     next(e);
//   }
// };

exports.logout_get = (req, res) => {
  req.logout();
  res.redirect("/");
};
