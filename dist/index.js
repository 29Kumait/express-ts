"use strict";

var dotenv = _interopRequireWildcard(require("dotenv"));
var _app = _interopRequireDefault(require("./app.js"));
var _logging = require("./util/logging.js");
var _connectDB = _interopRequireDefault(require("./db/connectDB.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
dotenv.config();
const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await (0, _connectDB.default)();
    _app.default.listen(port, () => (0, _logging.logInfo)(`Server started on port ${port}`));
  } catch (error) {
    (0, _logging.logError)(error);
  }
};
startServer();