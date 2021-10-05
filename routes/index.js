var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
var userController = require("../controllers/userController");

router.get("/", postController.getAll);
router.post("/", postController.create);
router.post("/login", userController.login);

module.exports = router;
