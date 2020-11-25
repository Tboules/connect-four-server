const express = require("express");
const router = express.Router();
const User = require("./models/user");

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/users", async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    dob: req.body.dob,
  });
  await user.save();
  res.send(user);
});

module.exports = router;
