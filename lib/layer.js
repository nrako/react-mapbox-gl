"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator = _interopRequireDefault(_getIterator2).default;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends = _interopRequireDefault(_extends2).default;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn = _interopRequireDefault(_possibleConstructorReturn2).default;

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits = _interopRequireDefault(_inherits2).default;

var _class, _temp2;

var _mapboxGl = require("mapbox-gl/dist/mapbox-gl");

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

var _feature = require("./feature");

var Feature = _interopRequireDefault(_feature).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = 0;
var generateID = function generateID() {
  return index++;
};

var Layer = (_temp2 = _class = function (_Component) {
  _inherits(Layer, _Component);

  function Layer() {
    var _temp, _this, _ret;

    _classCallCheck(this, Layer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.hover = [], _this.id = _this.props.id || "layer-" + generateID(), _this.geometry = function (coordinates) {
      switch (_this.props.type) {
        case "symbol":
        case "circle":
          return {
            type: "Point",
            coordinates: coordinates
          };

        case "fill":
          return {
            type: coordinates.length > 1 ? "MultiPolygon" : "Polygon",
            coordinates: coordinates
          };

        case "line":
          return {
            type: "LineString",
            coordinates: coordinates
          };

        default:
          return null;
      }
    }, _this.feature = function (props, id) {
      return {
        type: "Feature",
        geometry: _this.geometry(props.coordinates),
        properties: _extends({}, props.properties, {
          id: id
        })
      };
    }, _this.onClick = function (evt) {
      var children = [].concat(_this.props.children);
      var map = _this.context.map;
      var _this2 = _this;
      var id = _this2.id;


      var features = map.queryRenderedFeatures(evt.point, { layers: [id] });

      for (var _iterator = features, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var feature = _ref;
        var properties = feature.properties;

        var child = children[properties.id];

        var onClick = child && child.props.onClick;
        onClick && onClick(_extends({}, evt, {
          feature: feature,
          map: map
        }));
      }
    }, _this.onMouseMove = function (evt) {
      var children = [].concat(_this.props.children);
      var map = _this.context.map;
      var _this3 = _this;
      var id = _this3.id;


      var oldHover = _this.hover;
      var hover = [];

      var features = map.queryRenderedFeatures(evt.point, { layers: [id] });

      for (var _iterator2 = features, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var feature = _ref2;
        var properties = feature.properties;

        var child = children[properties.id];
        hover.push(properties.id);

        var onHover = child && child.props.onHover;
        onHover && onHover(_extends({}, evt, {
          feature: feature,
          map: map
        }));
      }

      oldHover.filter(function (prevHoverId) {
        return hover.indexOf(prevHoverId) === -1;
      }).forEach(function (id) {
        var onEndHover = children[id] && children[id].props.onEndHover;
        onEndHover && onEndHover(_extends({}, evt, {
          map: map
        }));
      });

      _this.hover = hover;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Layer.prototype.componentWillMount = function componentWillMount() {
    var id = this.id;
    var _props = this.props;
    var type = _props.type;
    var layout = _props.layout;
    var paint = _props.paint;
    var layerOptions = _props.layerOptions;
    var sourceId = _props.sourceId;
    var before = _props.before;
    var map = this.context.map;


    var layer = _extends({
      id: id,
      source: sourceId || id,
      type: type,
      layout: layout,
      paint: paint
    }, layerOptions);

    var source = map.getSource(sourceId || id);
    if (source) {
      source.setData({
        type: "FeatureCollection",
        features: []
      });
    } else {
      map.addSource(sourceId || id, _extends({}, this.props.sourceOptions, {
        data: {
          type: "FeatureCollection",
          features: []
        }
      }));
    }

    map.addLayer(layer, before);

    map.on("click", this.onClick);
    map.on("mousemove", this.onMouseMove);
  };

  Layer.prototype.componentWillUnmount = function componentWillUnmount() {
    var id = this.id;
    var map = this.context.map;


    map.removeLayer(id);
    map.removeSource(id);

    map.off("click", this.onClick);
    map.off("mousemove", this.onMouseMove);
  };

  Layer.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var _props2 = this.props;
    var paint = _props2.paint;
    var layout = _props2.layout;
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
  };

  Layer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.children, this.props.children) || !isEqual(nextProps.paint, this.props.paint) || !isEqual(nextProps.layout, this.props.layout);
  };

  Layer.prototype.render = function render() {
    var _this4 = this;

    if (this.props.children) {
      var children = [].concat(this.props.children);
      var map = this.context.map;


      var features = children.map(function (_ref3, id) {
        var props = _ref3.props;
        return _this4.feature(props, id);
      }).filter(Boolean);

      map.getSource(this.props.sourceId || this.id).setData({
        type: "FeatureCollection",
        features: features
      });
    }

    return null;
  };

  return Layer;
}(Component), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  id: PropTypes.string,

  type: PropTypes.oneOf(["symbol", "line", "fill", "circle"]),

  layout: PropTypes.object,
  paint: PropTypes.object,
  sourceOptions: PropTypes.object,
  layerOptions: PropTypes.object,
  sourceId: PropTypes.string,
  before: PropTypes.string
}, _class.defaultProps = {
  type: "symbol",
  layout: {},
  paint: {},
  sourceOptions: {
    type: "geojson"
  }
}, _temp2);
exports.default = Layer;
module.exports = exports['default'];