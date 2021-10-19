var express = require('express');
var router = express.Router();
var postController = require("../controllers/postController");

router.get("/",postController.getAll);
router.post("/", postController.create);
router.get("/esp/:id", postController.getById);
router.put("/esp/:id", postController.update);
router.delete("/:id", postController.delete);


module.exports = router;
