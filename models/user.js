const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  passWord: String,
  playerColor: String,
  gameInstance: Number,
});

module.exports = mongoose.model("user", userSchema);
