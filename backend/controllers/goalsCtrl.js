const asyncHandler = require("express-async-handler");
var Goal = require("../model/goal");
var User = require("../model/user");

// @desc        Get goals
// @route       Get /
// @access      Private
const getGoals = asyncHandler(async (req, res, next) => {
  const userGoal = req.user.id;
  const goals = await Goal.find({ userGoal });
  res.status(200).json(goals);
});

// @desc        Set goals
// @route       Post /
// @access      Private
const setGoals = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please add a text field!");
  }
  const goals = await Goal.create({
    text: text,
    user_id: req.user.id,
  });

  res.status(200).json(goals);
});

// @desc        update goals
// @route       Patch /:id
// @access      Private
const updateGoals = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check for user
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure thr logged in user matches the goals user.
  if(goal.user_id.toString() !== user.id) {
    res.status(400)
    throw new Error("User not authenrized");
  }

  const updateGoal = await Goal.findByIdAndUpdate(id, data, {
    new: true,
  });
  res.status(201).json(updateGoal);
});

// @desc        Delete goals
// @route       Delete /:id
// @access      Private
const deleteGoals = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // check for user
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure thr logged in user matches the goals user.
  if(goal.user_id.toString() !== user.id) {
    res.status(400)
    throw new Error("User not authenrized");
  }

  await goal.remove();
  res.status(201).json({ id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
