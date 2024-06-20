"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _logging = require("./util/logging.js");
var _root = _interopRequireDefault(require("./routes/root.js"));
var _sign = _interopRequireDefault(require("./routes/sign.js"));
var _content = _interopRequireDefault(require("./routes/content.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use("/", _root.default);
app.use("/api", _sign.default);
app.use("/api", _content.default);
app.use((err, req, res, next) => {
  (0, _logging.logError)(err);
  res.status(500).send("ERROR handling middleware!");
});
var _default = exports.default = app;