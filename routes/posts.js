var express = require('express');
var router = express.Router();
var postController = require("../controllers/postController");

router.get("/",postController.getAll);
router.post("/", postController.create);
router.post("/update", postController.update);
router.post("/delete", postController.delete);


module.exports = router;
