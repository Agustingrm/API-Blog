var express = require('express');
var router = express.Router();
var postController = require("../controllers/postController");

router.get("/",postController.getAll);
router.post("/",(req,res,next)=>{req.app.validateUser(req,res,next)}, postController.create);
router.get("/esp/:id", postController.getById);
router.put("/esp/:id",(req,res,next)=>{req.app.validateUser(req,res,next)}, postController.update);
router.delete("/esp/:id",(req,res,next)=>{req.app.validateUser(req,res,next)}, postController.delete);


module.exports = router;
