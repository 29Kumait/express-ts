"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _sign = require("../controllers/sign.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerSign = _express.default.Router();
routerSign.post("/signup", _sign.handleSignUp);
routerSign.post("/signin", _sign.handleSignIn);
var _default = exports.default = routerSign;