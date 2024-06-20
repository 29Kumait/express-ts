"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const rootRouter = _express.default.Router();
rootRouter.get("/", (req, res) => {
  res.send("Server !");
});
var _default = exports.default = rootRouter;