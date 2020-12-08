const express = require("express");
const router = express.Router();
const Game = require("./models/game");

router.get("/game", async (req, res) => {
  const game = await Game.find();
  res.send(game);
});

router.post("/getGame", async (req, res) => {
  const checkGame = await Game.find({ gameInstance: req.body.gameInstance });
  try {
    if (checkGame.length == 0) {
      res.status(400).json({ message: "That game does not exist" });
    } else {
      res.send(checkGame);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/newGame", async (req, res) => {
  const { gameInstance, messages, gameBoard, lastTile } = req.body;
  const checkGame = await Game.findOne({ gameInstance: gameInstance });
  try {
    if (checkGame) {
      res.status(400).json({ message: "That game already exists" });
    } else {
      const game = new Game({
        gameInstance,
        messages,
        gameBoard,
        lastTile,
      });
      await game.save();
      res.send(game);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch("/updateGame", async (req, res) => {
  const { gameInstance, messages, gameBoard, lastTile } = req.body;
  const checkGame = await Game.findOne({ gameInstance: gameInstance });
  if (messages) {
    checkGame.messages = [...checkGame.messages, ...messages];
  }
  if (gameBoard) {
    checkGame.gameBoard = gameBoard;
  }
  if (lastTile) {
    checkGame.lastTile = lastTile;
  }
  try {
    if (!checkGame) {
      res.status(400).json({ message: "Could not find a game to update" });
    } else {
      const updatedGame = await checkGame.save();
      res.json(updatedGame);
    }
  } catch (err) {
    res.status(500).json({ messages: err.message });
  }
});

router.delete("/deleteGame", async (req, res) => {
  const checkGame = await Game.findOne({ gameInstance: req.body.gameInstance });
  if (checkGame) {
    checkGame.remove();
    res.json({ message: "Deleted Game" });
  } else {
    res.status(400).json({ message: "Could not find that game" });
  }
});

module.exports = router;
