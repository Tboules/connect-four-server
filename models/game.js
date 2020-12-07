const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: String,
  message: String,
});

const gameSchema = new Schema({
  gameInstance: String,
  messages: [messageSchema],
  gameBoard: Schema.Types.Mixed,
});

module.exports = mongoose.model("game", gameSchema, "game");
