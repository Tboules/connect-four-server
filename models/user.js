const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  dob: Date,
});

module.exports = mongoose.model("user", userSchema);
