"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const contentSchema = new _mongoose.default.Schema({
  description: {
    type: String,
    required: true
  }
});
const Content = _mongoose.default.model("contents", contentSchema);
var _default = exports.default = Content;