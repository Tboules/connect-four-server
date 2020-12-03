const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: String,
  message: String,
});

const rowSchema = new Schema({
  rows: [String],
});

const gameSchema = new Schema({
  gameInstance: Number,
  messages: [messageSchema],
  gameBoard: [rowSchema],
});

module.exports = mongoose.model("game", gameSchema, "game");
