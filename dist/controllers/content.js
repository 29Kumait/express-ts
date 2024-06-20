"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContent = exports.createContent = void 0;
var _Content = _interopRequireDefault(require("../models/Content.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createContent = async (req, res) => {
  try {
    const {
      description
    } = req.body;
    if (!description) {
      return res.status(400).json({
        error: "Description is required"
      });
    }
    const newContent = new _Content.default({
      description
    });
    await newContent.save();
    return res.status(201).json(newContent);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
exports.createContent = createContent;
const getContent = async (req, res) => {
  try {
    const content = await _Content.default.find();
    return res.status(200).json(content);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};
exports.getContent = getContent;