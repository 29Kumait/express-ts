"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const connectDB = () => _mongoose.default.connect(String(process.env.MONGODB_URL));
var _default = exports.default = connectDB;