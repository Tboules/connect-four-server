const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: String,
  message: String,
});

const gameSchema = new Schema({
  gameInstance: String,
  messages: [messageSchema],
  gameBoard: Schema.Types.Mixed,
  lastTile: [Number],
});

module.exports = mongoose.model("game", gameSchema, "game");
