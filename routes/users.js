var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.post("/", userController.create_post);
router.post("/login", userController.login_post);
// router.get("/logout", userController.logout_get);

module.exports = router;
