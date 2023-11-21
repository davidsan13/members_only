const mongoose = require("mongoose");

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  title: {type: String},
  text: {type: String},
  created: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: "User"}
})

MessageSchema.virtual("url").get(function () {
  return `/message/${this._id}`
})
module.exports = mongoose.model("Message", MessageSchema)