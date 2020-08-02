const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   GET /users
router.get("/", async (req, res) => {
  await User.find({}, "userName rollNumber")
    .sort({ userName: 1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route   Post /users/add
router.post("/add", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    rollNumber: Number(req.body.rollNumber),
  });
  await newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
