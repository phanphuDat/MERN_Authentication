var asyncHandler = require("express-async-handler");
var bcrypt = require("bcryptjs");
var User = require("../model/user");
var jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/authenUser", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// @desc        Register new user
// @route       Post /
// @access      Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if user already exists
  const userFind = await User.findOne({ email });

  if (userFind) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc        Authenticate a user
// @route       Post /login
// @access      Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc        Get user data
// @route       Get /me
// @access      provite
const getMe = asyncHandler(async (req, res, next) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name, email,
  })
});

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3600 * 24,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
