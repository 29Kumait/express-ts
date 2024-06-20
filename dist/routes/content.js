"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _content = require("../controllers/content.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerContent = _express.default.Router();
routerContent.get("/", _content.getContent);
routerContent.post("/create", _content.createContent);
var _default = exports.default = routerContent;