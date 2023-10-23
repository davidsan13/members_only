const mongoose = require("mongoose");

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  title: {type: String},
  text: {type: String},
  created: new Timestamp(),
  user: {type: Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model("Message", MessageSchema)