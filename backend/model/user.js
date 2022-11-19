var mongoose = require("mongoose");
// var { isEmail } = require("validator")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { collection: "users" }
);

// Include virtuals
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

// validateBeforeSave
userSchema.set("validateBeforeSave", true);

const User = mongoose.model("User", userSchema);

module.exports = User;
