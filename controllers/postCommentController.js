const postCommentModel = require("../models/postCommentModel");
const { body } = require("express-validator");

exports.getAll = async (req, res, next) => {
  try {
    const comment = await postCommentModel.find();
    res.json(comment);
  } catch (e) {}
};

exports.create = [
  // Validate and sanitise fields.
  body("content", "Content must not be empty.").trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    try {
      const comment = new postCommentModel({
        post: req.originalUrl.split("/")[2],
        username: req.body.content,
        content: req.body.content,
        time: Date.now(),
      });
      const document = await comment.save();
      res.json(document);
    } catch (e) {
      next(e);
    }
  },
];

exports.update = async (req, res, next) => {
  try {
    const comment = await postCommentModel.updateOne({ _id: req.params.id }, req.body);
    res.json(comment);
  } catch (e) {}
};

exports.delete = async (req, res, next) => {
  try {
    const comment = await postCommentModel.deleteOne({ _id: req.params.id });
    res.json(comment);
  } catch (e) {}
};
