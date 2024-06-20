"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _validator = _interopRequireDefault(require("validator"));
var _logging = require("../util/logging.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const userSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: value => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      message: "Password must be at least 8 characters long and contain both numbers and letters"
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [_validator.default.isEmail, "Please provide a valid email address"]
  }
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    (0, _logging.logInfo)(`Hashing password for user: ${this.username}`);
    this.password = await _bcryptjs.default.hash(this.password, 12);
    (0, _logging.logInfo)(`Password hashing completed for user: ${this.username}`);
  }
  next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  (0, _logging.logInfo)(`Comparing password for user: ${this.username}`);
  const match = await _bcryptjs.default.compare(candidatePassword, this.password);
  (0, _logging.logInfo)(`Password comparison result for user: ${this.username}: ${match}`);
  return match;
};
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  (0, _logging.logInfo)(`Serializing user data for user: ${user.username}`);
  return user;
};
const User = _mongoose.default.model("User", userSchema);
var _default = exports.default = User;