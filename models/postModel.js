var mongoose = require("mongoose");
var { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  time: { type: Date, default: Date.now },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: {type: Array},
});

//Takes the date in the db and gives it an appropriate format
PostSchema.virtual("formatedDate").get(function () {
  return DateTime.fromJSDate(this.time).toFormat("HH:mm dd/MM/yyyy");
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
