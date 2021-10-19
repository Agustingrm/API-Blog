const postModel = require("../models/postModel");
const { body } = require("express-validator");

exports.getAll = async (req, res, next) => {
  try {
    const post = await postModel.find().populate("author");;
    res.json(post);
  } catch (e) {}
};

exports.getById = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.json(post);
  } catch (e) {
    next(e);
  }
};

exports.create = [
  // Validate and sanitise fields.
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("content", "Content must not be empty.").trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    try {
      console.log(req.body);
      const post = new postModel({
        author: req.user._id,
        time: Date.now(),
        title: req.body.title,
        content: req.body.content,
      });
      const document = await post.save();
      console.log(document);
      res.json(document);
    } catch (e) {
      next(e);
    }
  },
];

exports.update = async (req, res, next) => {
  try {
    const post = await postModel.updateOne({ _id: req.params.id }, req.body);
    res.json(post);
  } catch (e) {}
};

exports.delete = async (req, res, next) => {
  try {
    const post = await postModel.deleteOne({ _id: req.params.id });
    res.json(post);
  } catch (e) {}
};
