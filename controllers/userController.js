const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {

  getAll: async function (req, res, next) {
    try {
      const user = await userModel.find();
      res.json(user);
    } catch (e) {}
  },

  create: async function (req, res, next) {
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
  
  login: async function (req, res, next) {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        res.json({ message: "Incorrect Email" });
        return;
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, req.app.get("secretKey"), { expiresIn: "1h" });
        res.json({ token: token });
        return;
      } else {
        res.json({ message: "Incorrect Password" });
        return;
      }
    } catch (e) {
      next(e);
    }
  },
};
