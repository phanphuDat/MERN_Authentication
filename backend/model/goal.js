var mongoose = require("mongoose");
// var { isEmail } = require("validator")

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    text: {
      type: String,
      required: [ true, 'Please add a text value'],
    },
  },
  { collection: "goal" }
);

// Include virtuals
goalSchema.set('toObject', { virtuals: true });
goalSchema.set('toJSON', { virtuals: true });

// validateBeforeSave
goalSchema.set('validateBeforeSave', true);

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;

