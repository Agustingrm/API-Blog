var express = require('express');
var router = express.Router();
var postCommentController = require("../controllers/postCommentController");

router.get("/",postCommentController.getAll);
router.post("/", postCommentController.create);
router.put("/:id", postCommentController.update);
router.delete("/:id", postCommentController.delete);


module.exports = router;
