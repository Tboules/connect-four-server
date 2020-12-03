const express = require("express");
const router = express.Router();
const Game = require("./models/game");

router.get("/game", async (req, res) => {
  const game = await Game.find();
  res.send(game);
});

module.exports = router;
