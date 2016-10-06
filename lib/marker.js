"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn = _interopRequireDefault(_possibleConstructorReturn2).default;

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits = _interopRequireDefault(_inherits2).default;

var _class, _temp2;

var _mapboxGl = require("mapbox-gl/dist/mapbox-gl.js");

var MapboxGl = _interopRequireDefault(_mapboxGl).default;

var _react = require("react");

var React = _interopRequireDefault(_react).default;

var Component = _react.Component;
var PropTypes = _react.PropTypes;

var _reactDom = require("react-dom");

var render = _reactDom.render;
var unmountComponentAtNode = _reactDom.unmountComponentAtNode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactMapboxGl = (_temp2 = _class = function (_Component) {
  _inherits(ReactMapboxGl, _Component);

  function ReactMapboxGl() {
    var _temp, _this, _ret;

    _classCallCheck(this, ReactMapboxGl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.div = document.createElement("div"), _temp), _possibleConstructorReturn(_this, _ret);
  }

  ReactMapboxGl.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var map = this.context.map;
    var _props = this.props;
    var children = _props.children;
    var coordinates = _props.coordinates;
    var container = _props.container;


    if (container && container.nodeName) {
      this.div = container;
    }

    this.marker = new MapboxGl.Marker(this.div).setLngLat(coordinates);

    render(children, this.div, function () {
      _this2.marker.addTo(map);
    });
  };

  ReactMapboxGl.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var marker = this.marker;
    var div = this.div;
    var coordinates = nextProps.coordinates;
    var children = nextProps.children;


    if (children) {
      render(children, div);
    }

    if (this.props.coordinates !== coordinates) {
      marker.setLngLat(coordinates);
    }
  };

  ReactMapboxGl.prototype.componentWillUnmount = function componentWillUnmount() {
    var marker = this.marker;
    var div = this.div;


    marker.remove();
    unmountComponentAtNode(div);
  };

  ReactMapboxGl.prototype.render = function render() {
    return null;
  };

  return ReactMapboxGl;
}(Component), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  container: PropTypes.object
}, _temp2);
exports.default = ReactMapboxGl;
module.exports = exports['default'];