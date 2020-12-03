const express = require("express");
const router = express.Router();
const User = require("./models/user");

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user by that ID" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/users/validate", async (req, res) => {
  const checkUser = await User.findOne({
    userName: req.body.userName,
    passWord: req.body.passWord,
  });
  if (!checkUser) {
    res.status(400).json({
      error: "The username or password either or incorrect or do not exist",
      success: false,
    });
  } else {
    res.json(checkUser);
  }
});

router.get("/users/:id", getUser, async (req, res) => {
  res.send(res.user);
});

router.post("/users", async (req, res) => {
  const { userName, passWord, playerColor, gameInstance } = req.body;
  const checkUser = await User.findOne({ userName: req.body.userName });
  if (checkUser) {
    return res.status(400).json("That user already exists");
  } else {
    const user = new User({
      userName,
      passWord,
      playerColor,
      gameInstance,
    });
    await user.save();
    res.send(user);
  }
});

router.patch("/users/:id", getUser, async (req, res) => {
  if (req.body.playerColor != null) {
    res.user.playerColor = req.body.playerColor;
  }
  if (req.body.gameInstance != null) {
    res.user.gameInstance = req.body.gameInstance;
  }
  if (req.body.passWord != null) {
    res.user.passWord = req.body.passWord;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
