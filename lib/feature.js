"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var React = _interopRequireDefault(_react).default;

var PropTypes = _react.PropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Feature = function Feature() {
  return null;
};

Feature.propTypes = {
  coordinates: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onEndHover: PropTypes.func,
  properties: PropTypes.object
};

exports.default = Feature;
module.exports = exports['default'];