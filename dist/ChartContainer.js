"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ChartNode = _interopRequireDefault(require("./ChartNode"));

require("./ChartContainer.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  datasource: _propTypes.default.object.isRequired,
  pan: _propTypes.default.bool,
  zoom: _propTypes.default.bool,
  zoomoutLimit: _propTypes.default.number,
  zoominLimit: _propTypes.default.number,
  containerClass: _propTypes.default.string,
  chartClass: _propTypes.default.string,
  nodeTemplate: _propTypes.default.elementType
};
var defaultProps = {
  pan: false,
  zoom: false,
  zoomoutLimit: 0.5,
  zoominLimit: 7,
  containerClass: "",
  chartClass: ""
};

var ChartContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ChartContainer, _React$Component);

  function ChartContainer() {
    var _this;

    _classCallCheck(this, ChartContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChartContainer).call(this));

    _defineProperty(_assertThisInitialized(_this), "startX", 0);

    _defineProperty(_assertThisInitialized(_this), "startY", 0);

    _this.state = {
      transform: "",
      panning: false,
      cursor: "default"
    };
    return _this;
  }

  _createClass(ChartContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          datasource = _this$props.datasource,
          containerClass = _this$props.containerClass,
          chartClass = _this$props.chartClass;
      return _react.default.createElement("div", {
        className: "orgchart-container " + containerClass,
        onWheel: this.props.zoom ? this.zoomHandler.bind(this) : undefined,
        onMouseUp: this.props.pan && this.state.panning ? this.panEndHandler.bind(this) : undefined
      }, _react.default.createElement("div", {
        className: "orgchart " + chartClass,
        style: {
          transform: this.state.transform,
          cursor: this.state.cursor
        },
        onMouseDown: this.props.pan ? this.panStartHandler.bind(this) : undefined,
        onMouseMove: this.props.pan && this.state.panning ? this.panHandler.bind(this) : undefined
      }, _react.default.createElement("ul", null, _react.default.createElement(_ChartNode.default, {
        datasource: datasource,
        nodeTemplate: this.props.nodeTemplate
      }))));
    }
  }, {
    key: "panEndHandler",
    value: function panEndHandler() {
      this.setState({
        panning: false,
        cursor: "default"
      });
    }
  }, {
    key: "panHandler",
    value: function panHandler(e) {
      var newX = 0;
      var newY = 0;

      if (!e.targetTouches) {
        // pand on desktop
        newX = e.pageX - this.startX;
        newY = e.pageY - this.startY;
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        newX = e.targetTouches[0].pageX - this.startX;
        newY = e.targetTouches[0].pageY - this.startY;
      } else if (e.targetTouches.length > 1) {
        return;
      }

      if (this.state.transform === "") {
        if (this.state.transform.indexOf("3d") === -1) {
          this.setState({
            transform: "matrix(1,0,0,1," + newX + "," + newY + ")"
          });
        } else {
          this.setState({
            transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + newX + ", " + newY + ",0,1)"
          });
        }
      } else {
        var matrix = this.state.transform.split(",");

        if (this.state.transform.indexOf("3d") === -1) {
          matrix[4] = newX;
          matrix[5] = newY + ")";
        } else {
          matrix[12] = newX;
          matrix[13] = newY;
        }

        this.setState({
          transform: matrix.join(",")
        });
      }
    }
  }, {
    key: "panStartHandler",
    value: function panStartHandler(e) {
      if (e.target.closest(".oc-node")) {
        this.setState({
          panning: false
        });
        return;
      } else {
        this.setState({
          panning: true,
          cursor: "move"
        });
      }

      var lastX = 0;
      var lastY = 0;

      if (this.state.transform !== "") {
        var matrix = this.state.transform.split(",");

        if (this.state.transform.indexOf("3d") === -1) {
          lastX = parseInt(matrix[4]);
          lastY = parseInt(matrix[5]);
        } else {
          lastX = parseInt(matrix[12]);
          lastY = parseInt(matrix[13]);
        }
      }

      if (!e.targetTouches) {
        // pand on desktop
        this.startX = e.pageX - lastX;
        this.startY = e.pageY - lastY;
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        this.startX = e.targetTouches[0].pageX - lastX;
        this.startY = e.targetTouches[0].pageY - lastY;
      } else if (e.targetTouches.length > 1) {
        return;
      }
    }
  }, {
    key: "setChartScale",
    value: function setChartScale(newScale) {
      var matrix = [];
      var targetScale = 1;

      if (this.state.transform === "") {
        this.setState({
          transform: "matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)"
        });
      } else {
        matrix = this.state.transform.split(",");

        if (this.state.transform.indexOf("3d") === -1) {
          targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);

          if (targetScale > this.props.zoomoutLimit && targetScale < this.props.zoominLimit) {
            matrix[0] = "matrix(" + targetScale;
            matrix[3] = targetScale;
            this.setState({
              transform: matrix.join(",")
            });
          }
        } else {
          targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);

          if (targetScale > this.props.zoomoutLimit && targetScale < this.props.zoominLimit) {
            matrix[0] = "matrix3d(" + targetScale;
            matrix[5] = targetScale;
            this.setState({
              transform: matrix.join(",")
            });
          }
        }
      }
    }
  }, {
    key: "zoomHandler",
    value: function zoomHandler(e) {
      var newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
      this.setChartScale(newScale);
    }
  }]);

  return ChartContainer;
}(_react.default.Component);

ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;
var _default = ChartContainer;
exports.default = _default;