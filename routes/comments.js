var express = require('express');
var router = express.Router();
var postCommentController = require("../controllers/postCommentController");

router.get("/",postCommentController.getAll);
router.post("/:id",(req,res,next)=>{req.app.validateUser(req,res,next)}, postCommentController.create);
router.put("/:id",(req,res,next)=>{req.app.validateUser(req,res,next)}, postCommentController.update);
router.delete("/:id",(req,res,next)=>{req.app.validateUser(req,res,next)}, postCommentController.delete);


module.exports = router;
