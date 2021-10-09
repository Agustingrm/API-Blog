var express = require('express');
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/",userController.getAll);
router.post("/", userController.create);
router.post("/login", userController.login);

module.exports = router;
