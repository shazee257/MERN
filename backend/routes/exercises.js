const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// @route   GET /exercises
router.get("/", async (req, res) => {
  await Exercise.find({})
    .populate("user")
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route   POST /exercises/add
router.post("/add", async (req, res) => {
  const newExercise = await new Exercise({
    user: req.body.user,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  });
  await newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route   GET /exercises/:id
router.get("/:id", async (req, res) => {
  await Exercise.findById(req.params.id)
    .populate("user")
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route   DELETE /exercises/:id
router.delete("/:id", async (req, res) => {
  await Exercise.findByIdAndDelete(req.params.id)
    .then((exercise) => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route   Update /exercises/:id
router.put("/:id", async (req, res) => {
  await Exercise.findByIdAndUpdate(req.params.id, {
    user: req.body.user,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  })
    .then((exercise) => res.json("Exercise updated."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
