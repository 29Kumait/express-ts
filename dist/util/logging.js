"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logWarning = exports.logInfo = exports.logError = void 0;
const logInfo = message => {
  // eslint-disable-next-line no-console
  console.log(message);
};
exports.logInfo = logInfo;
const logWarning = message => {
  console.warn(message);
};
exports.logWarning = logWarning;
const logError = errorMessage => {
  if (errorMessage instanceof Error) {
    console.error(errorMessage.message, errorMessage.stack);
  } else {
    console.error("ERROR: ", errorMessage);
  }
};
exports.logError = logError;