"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends = _interopRequireDefault(_extends2).default;

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
var cloneElement = _react.cloneElement;
var Children = _react.Children;

var _deepEqual = require("deep-equal");

var isEqual = _interopRequireDefault(_deepEqual).default;

var _helper = require("./helper");

var diff = _helper.diff;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = 0;
var generateID = function generateID() {
  return index++;
};

var GeoJSONLayer = (_temp2 = _class = function (_Component) {
  _inherits(GeoJSONLayer, _Component);

  function GeoJSONLayer() {
    var _temp, _this, _ret;

    _classCallCheck(this, GeoJSONLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.id = _this.props.id || "geojson-" + generateID(), _this.layerIds = [], _this.createLayer = function (type) {
      var _this2 = _this;
      var id = _this2.id;
      var layerIds = _this2.layerIds;
      var before = _this.props.before;
      var map = _this.context.map;


      var layerId = id + "-" + type;
      layerIds.push(layerId);

      var paint = _this.props[type + "Paint"] || {};
      var layout = _this.props[type + "Layout"] || {};

      map.addLayer({
        id: layerId,
        source: id,
        type: type,
        paint: paint,
        layout: layout
      }, before);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  GeoJSONLayer.prototype.componentWillMount = function componentWillMount() {
    var id = this.id;
    var source = this.source;
    var map = this.context.map;


    this.source = map.addSource(id, _extends({}, this.props.sourceOptions, {
      data: this.props.data
    }));

    this.createLayer("symbol");
    this.createLayer("line");
    this.createLayer("fill");
    this.createLayer("circle");
  };

  GeoJSONLayer.prototype.componentWillUnmount = function componentWillUnmount() {
    var id = this.id;
    var layerIds = this.layerIds;
    var map = this.context.map;


    map.removeSource(id);

    layerIds.forEach(function (id) {
      return map.removeLayer(id);
    });
  };

  GeoJSONLayer.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var _props = this.props;
    var data = _props.data;
    var paint = _props.paint;
    var layout = _props.layout;
    var map = this.context.map;


    if (!isEqual(props.paint, paint)) {
      var paintDiff = diff(paint, props.paint);

      for (var key in paintDiff) {
        map.setPaintProperty(this.id, key, paintDiff[key]);
      }
    }

    if (!isEqual(props.layout, layout)) {
      var layoutDiff = diff(layout, props.layout);

      for (var _key2 in layoutDiff) {
        map.setLayoutProperty(this.id, _key2, layoutDiff[_key2]);
      }
    }

    if (props.data !== data) {
      map.getSource(this.id).setData(props.data);
    }
  };

  GeoJSONLayer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.paint, this.props.paint) || !isEqual(nextProps.layout, this.props.layout) || nextProps.data !== this.props.data;
  };

  GeoJSONLayer.prototype.render = function render() {
    return null;
  };

  return GeoJSONLayer;
}(Component), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  id: PropTypes.string,

  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

  lineLayout: PropTypes.object,
  symbolLayout: PropTypes.object,
  circleLayout: PropTypes.object,
  fillLayout: PropTypes.object,

  linePaint: PropTypes.object,
  symbolPaint: PropTypes.object,
  circlePaint: PropTypes.object,
  fillPaint: PropTypes.object,

  sourceOptions: PropTypes.object,
  before: PropTypes.string
}, _class.defaultProps = {
  sourceOptions: {
    type: "geojson"
  }
}, _temp2);
exports.default = GeoJSONLayer;
module.exports = exports['default'];