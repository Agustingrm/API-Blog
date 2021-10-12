var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");

router.get("/", postController.getAll);

module.exports = router;
