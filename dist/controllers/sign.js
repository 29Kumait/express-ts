"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSignUp = exports.handleSignIn = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _logging = require("../util/logging.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const handleSignUp = async (req, res, next) => {
  const {
    email,
    username,
    password
  } = req.body;
  (0, _logging.logInfo)(`Signup attempt for username: ${username}, email: ${email}`);
  try {
    (0, _logging.logInfo)(`Checking if user already exists: ${username}`);
    const userExists = await _User.default.findOne({
      $or: [{
        email
      }, {
        username
      }]
    });
    if (userExists) {
      (0, _logging.logInfo)(`User already exists: ${userExists.username}`);
      return res.status(400).json({
        message: 'User already exists'
      });
    }
    (0, _logging.logInfo)(`Creating user: ${username}`);
    const user = await createUser({
      email,
      username,
      password
    });
    const token = generateAuthToken(user._id);
    (0, _logging.logInfo)(`Token generated for user: ${user.username}, ID: ${user._id}`);
    return res.status(201).send({
      token
    });
  } catch (err) {
    (0, _logging.logError)(`Sign up error for user ${username}: ${err.message}`);
    next(err);
  }
};
exports.handleSignUp = handleSignUp;
const handleSignIn = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  (0, _logging.logInfo)(`Sign-in attempt for username: ${username}`);
  try {
    (0, _logging.logInfo)(`Finding user by credentials for username: ${username}`);
    const user = await findUserByCredentials(username, password);
    if (!user) {
      (0, _logging.logInfo)(`Authentication failed for username: ${username}`);
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    const token = generateAuthToken(user._id);
    (0, _logging.logInfo)(`Token generated for successful sign-in: ${user.username}, ID: ${user._id}`);
    return res.send({
      token
    });
  } catch (err) {
    (0, _logging.logError)(`Sign in error for user ${username}: ${err.message}`);
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
exports.handleSignIn = handleSignIn;
const createUser = async userData => {
  try {
    const {
      email,
      username
    } = userData;
    const userExists = await _User.default.findOne({
      $or: [{
        email
      }, {
        username
      }]
    });
    if (userExists) {
      throw new Error(userExists.email === email ? 'User with this email already exists' : 'User with this username already exists');
    }
    const user = new _User.default(userData);
    await user.save();
    (0, _logging.logInfo)(`User saved to the database: ${user.username}`);
    return user;
  } catch (error) {
    (0, _logging.logError)(`Error creating user ${userData.username} with email ${userData.email}: ${error.message}`);
    throw error;
  }
};
const generateAuthToken = userId => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return _jsonwebtoken.default.sign({
    userId
  }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};
const findUserByCredentials = async (username, password) => {
  const user = await _User.default.findOne({
    username
  });
  if (user && (await user.comparePassword(password))) {
    return user;
  }
  return null;
};