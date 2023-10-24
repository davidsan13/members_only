const mongoose = require("mongoose");

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  title: {type: String},
  text: {type: String},
  created: new Timestamp(),
  user: {type: Schema.Types.ObjectId, ref: "User"}
})

MessageSchema.virtual("url").get(function () {
  return `/message_room/${this._id}`
})
module.exports = mongoose.model("Message", MessageSchema)