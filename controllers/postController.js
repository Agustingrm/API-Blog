const postModel = require("../models/postModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const post = await postModel.find();
      res.json(post);
    } catch (e) {}
  },

  getById: async function (req, res, next) {
    try {
      const post = await postModel.findById(req.params.id);
      res.json(post);
    } catch (e) {}
  },

  create: async function (req, res, next) {
    //Insert
    try {
      console.log(req.body);
      const post = new postModel({
        author: req.body.author,
        time: Date.now(),
        title: req.body.title,
        content: req.body.content,
        comments: req.body.comments,
      });

      const document = await post.save();
      console.log(document);
      res.json(document);
    } catch (e) {}
  },

  update: async function (req, res, next) {
    //Insert
    console.log(req.params.id); //URL
    console.log(req.body);
    try {
      const post = await postModel.updateOne({ _id: req.params.id }, req.body);
      res.json(post);
    } catch (e) {}
  },

  delete: async function (req, res, next) {
    //Insert
    try {
      const post = await postModel.deleteOne({ _id: req.params.id });
      res.json(post);
    } catch (e) {}
  },
};
