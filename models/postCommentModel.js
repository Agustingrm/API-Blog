var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;
var PostCommentSchema = new Schema({
  post: { type: String },
  username: { type: String },
  content: { type: String },
  time: { type: Date, default: Date.now },
});

//Takes the date in the db and gives it an appropriate format
PostCommentSchema.virtual("formatedDate").get(function () {
  return DateTime.fromJSDate(this.time).toFormat("HH:mm dd/MM/yyyy");
});

//Export model
module.exports = mongoose.model("PostComment", PostCommentSchema);
