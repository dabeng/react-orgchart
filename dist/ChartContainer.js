"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _service = require("./service");

var _jsonDigger = _interopRequireDefault(require("json-digger"));

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _jspdf = _interopRequireDefault(require("jspdf"));

var _ChartNode = _interopRequireDefault(require("./ChartNode"));

require("./ChartContainer.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var propTypes = {
  datasource: _propTypes.default.object.isRequired,
  pan: _propTypes.default.bool,
  zoom: _propTypes.default.bool,
  zoomoutLimit: _propTypes.default.number,
  zoominLimit: _propTypes.default.number,
  containerClass: _propTypes.default.string,
  chartClass: _propTypes.default.string,
  NodeTemplate: _propTypes.default.elementType,
  draggable: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  multipleSelect: _propTypes.default.bool,
  onClickNode: _propTypes.default.func,
  onClickChart: _propTypes.default.func,
  onZoomChange: _propTypes.default.func,
  onDropNode: _propTypes.default.func
};
var defaultProps = {
  pan: false,
  zoom: false,
  zoomoutLimit: 0.5,
  zoominLimit: 7,
  containerClass: "",
  chartClass: "",
  draggable: false,
  collapsible: true,
  multipleSelect: false
};
var ChartContainer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var datasource = _ref.datasource,
      pan = _ref.pan,
      zoom = _ref.zoom,
      zoomoutLimit = _ref.zoomoutLimit,
      zoominLimit = _ref.zoominLimit,
      containerClass = _ref.containerClass,
      chartClass = _ref.chartClass,
      NodeTemplate = _ref.NodeTemplate,
      draggable = _ref.draggable,
      collapsible = _ref.collapsible,
      multipleSelect = _ref.multipleSelect,
      onClickNode = _ref.onClickNode,
      onClickChart = _ref.onClickChart,
      onZoomChange = _ref.onZoomChange,
      onDropNode = _ref.onDropNode;
  var container = (0, _react.useRef)();
  var chart = (0, _react.useRef)();
  var downloadButton = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      panning = _useState2[0],
      setPanning = _useState2[1];

  var _useState3 = (0, _react.useState)("default"),
      _useState4 = _slicedToArray(_useState3, 2),
      cursor = _useState4[0],
      setCursor = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      exporting = _useState6[0],
      setExporting = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      dataURL = _useState8[0],
      setDataURL = _useState8[1];

  var _useState9 = (0, _react.useState)(""),
      _useState10 = _slicedToArray(_useState9, 2),
      download = _useState10[0],
      setDownload = _useState10[1];

  var _useState11 = (0, _react.useState)(1),
      _useState12 = _slicedToArray(_useState11, 2),
      scale = _useState12[0],
      setScale = _useState12[1];

  var debouncedScale = (0, _service.useDebouncedState)(scale);
  var attachRel = (0, _react.useCallback)(function (data, flags) {
    if (!!data && data.length) {
      data.forEach(function (item) {
        attachRel(item, flags === "00" ? flags : "1" + (data.length > 1 ? 1 : 0));
      });
    }

    data.relationship = flags + (data.children && data.children.length > 0 ? 1 : 0);

    if (data.children) {
      data.children.forEach(function (item) {
        attachRel(item, "1" + (data.children.length > 1 ? 1 : 0));
      });
    }

    return data;
  }, []);

  var _useState13 = (0, _react.useState)(datasource),
      _useState14 = _slicedToArray(_useState13, 2),
      ds = _useState14[0],
      setDS = _useState14[1];

  (0, _react.useEffect)(function () {
    setDS(datasource);
  }, [datasource]);
  var dsDigger = new _jsonDigger.default(datasource, "id", "children");

  var clickChartHandler = function clickChartHandler(event) {
    if (!event.target.closest(".oc-node")) {
      if (onClickChart) {
        onClickChart();
      }

      _service.selectNodeService.clearSelectedNodeInfo();
    }
  };

  var panEndHandler = function panEndHandler() {
    setCursor("default");
  };

  var _useState15 = (0, _react.useState)({
    oldX: 0,
    oldY: 0,
    x: 0,
    y: 0,
    z: 1
  }),
      _useState16 = _slicedToArray(_useState15, 2),
      position = _useState16[0],
      setPosition = _useState16[1];

  var panStartHandler = function panStartHandler(e) {
    if (e.target.closest(".oc-node")) {
      setPanning(false);
      return;
    } else {
      e.preventDefault();
      setPanning(true);
      setPosition(_objectSpread(_objectSpread({}, position), {}, {
        oldX: e.clientX,
        oldY: e.clientY
      }));
    }
  }; // const updateChartScale = newScale => {
  //   let matrix = [];
  //   let targetScale = 1;
  //   if (transform === "") {
  //     setTransform("matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)");
  //   } else {
  //     matrix = transform.split(",");
  //     if (transform.indexOf("3d") === -1) {
  //       targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
  //       if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
  //         matrix[0] = "matrix(" + targetScale;
  //         matrix[3] = targetScale;
  //         setTransform(matrix.join(","));
  //         onZoomChange && onZoomChange(targetScale);
  //       }
  //     } else {
  //       targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
  //       if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
  //         matrix[0] = "matrix3d(" + targetScale;
  //         matrix[5] = targetScale;
  //         setTransform(matrix.join(","));
  //         onZoomChange && onZoomChange(targetScale);
  //       }
  //     }
  //   }
  // };


  (0, _react.useEffect)(function () {
    var mouseup = function mouseup() {
      setPanning(false);
    };

    var mousemove = function mousemove(event) {
      if (panning) {
        setPosition(_objectSpread(_objectSpread({}, position), {}, {
          x: position.x + event.clientX - position.oldX,
          y: position.y + event.clientY - position.oldY,
          oldX: event.clientX,
          oldY: event.clientY
        }));
      }
    };

    window.addEventListener('mouseup', mouseup);
    window.addEventListener('mousemove', mousemove);
    return function () {
      window.removeEventListener('mouseup', mouseup);
      window.removeEventListener('mousemove', mousemove);
    };
  });

  var zoomHandler = function zoomHandler(e) {
    if (e.deltaY) {
      var sign = Math.sign(e.deltaY) / 100;

      var _scale = 1 - sign;

      var rect = container.current.getBoundingClientRect();
      var chartEl = container.current.getBoundingClientRect();
      var targetScale = position.z * _scale;

      if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
        setPosition(_objectSpread(_objectSpread({}, position), {}, {
          x: position.x * _scale - (rect.width / 2 - e.clientX + rect.x) * sign,
          y: position.y * _scale - (chartEl.height * rect.width / chartEl.width / 2 - e.clientY + rect.y) * sign,
          z: targetScale
        }));
        setScale(targetScale);
      }
    }
  };

  (0, _react.useEffect)(function () {
    onZoomChange && onZoomChange(debouncedScale);
  }, [onZoomChange, debouncedScale]);

  var exportPDF = function exportPDF(canvas, exportFilename) {
    var canvasWidth = Math.floor(canvas.width);
    var canvasHeight = Math.floor(canvas.height);
    var doc = canvasWidth > canvasHeight ? new _jspdf.default({
      orientation: "landscape",
      unit: "px",
      format: [canvasWidth, canvasHeight]
    }) : new _jspdf.default({
      orientation: "portrait",
      unit: "px",
      format: [canvasHeight, canvasWidth]
    });
    doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
    doc.save(exportFilename + ".pdf");
  };

  var exportPNG = function exportPNG(canvas, exportFilename) {
    var isWebkit = ("WebkitAppearance" in document.documentElement.style);
    var isFf = !!window.sidebar;
    var isEdge = navigator.appName === "Microsoft Internet Explorer" || navigator.appName === "Netscape" && navigator.appVersion.indexOf("Edge") > -1;

    if (!isWebkit && !isFf || isEdge) {
      window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + ".png");
    } else {
      setDataURL(canvas.toDataURL());
      setDownload(exportFilename + ".png");
      downloadButton.current.click();
    }
  };

  var changeHierarchy = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(draggedItemData, dropTargetId) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return dsDigger.removeNode(draggedItemData.id);

            case 2:
              _context.next = 4;
              return dsDigger.addChildren(dropTargetId, draggedItemData);

            case 4:
              setDS(_objectSpread({}, dsDigger.ds));
              return _context.abrupt("return", _objectSpread({}, dsDigger.ds));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function changeHierarchy(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      exportTo: function exportTo(exportFilename, exportFileextension) {
        exportFilename = exportFilename || "OrgChart";
        exportFileextension = exportFileextension || "png";
        setExporting(true);
        var originalScrollLeft = container.current.scrollLeft;
        container.current.scrollLeft = 0;
        var originalScrollTop = container.current.scrollTop;
        container.current.scrollTop = 0;
        (0, _html2canvas.default)(chart.current, {
          width: chart.current.clientWidth,
          height: chart.current.clientHeight,
          onclone: function onclone(clonedDoc) {
            clonedDoc.querySelector(".orgchart").style.background = "none";
            clonedDoc.querySelector(".orgchart").style.transform = "";
          }
        }).then(function (canvas) {
          if (exportFileextension.toLowerCase() === "pdf") {
            exportPDF(canvas, exportFilename);
          } else {
            exportPNG(canvas, exportFilename);
          }

          setExporting(false);
          container.current.scrollLeft = originalScrollLeft;
          container.current.scrollTop = originalScrollTop;
        }, function () {
          setExporting(false);
          container.current.scrollLeft = originalScrollLeft;
          container.current.scrollTop = originalScrollTop;
        });
      },
      expandAllNodes: function expandAllNodes() {
        chart.current.querySelectorAll(".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed").forEach(function (el) {
          el.classList.remove("hidden", "isSiblingsCollapsed", "isAncestorsCollapsed");
        });
      },
      setZoom: function setZoom(newScale) {
        if (newScale < zoomoutLimit) {
          newScale = zoomoutLimit;
        }

        if (newScale > zoominLimit) {
          newScale = zoominLimit;
        }

        setPosition(function (position) {
          return _objectSpread(_objectSpread({}, position), {}, {
            z: newScale
          });
        });
      },
      getChart: function getChart() {
        return ds.children;
      },
      resetPosition: function resetPosition() {
        setPosition({
          oldX: 0,
          oldY: 0,
          x: 0,
          y: 0,
          z: 0
        });
      }
    };
  });
  var dsWithAttachedRel = (0, _react.useMemo)(function () {
    return attachRel(ds, "00");
  }, [attachRel, ds]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: container,
    className: "orgchart-container " + containerClass,
    onWheel: zoom ? zoomHandler : undefined,
    onMouseUp: pan && panning ? panEndHandler : undefined
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: chart,
    className: "orgchart " + chartClass,
    style: {
      transform: "translate(".concat(position.x, "px, ").concat(position.y, "px) scale(").concat(position.z, ")"),
      cursor: cursor
    },
    onClick: clickChartHandler,
    onMouseDown: pan ? panStartHandler : undefined
  }, /*#__PURE__*/_react.default.createElement("ul", null, !!dsWithAttachedRel && dsWithAttachedRel.length ? dsWithAttachedRel.map(function (_ds) {
    return /*#__PURE__*/_react.default.createElement(_ChartNode.default, {
      datasource: _ds,
      NodeTemplate: NodeTemplate,
      draggable: draggable,
      collapsible: collapsible,
      multipleSelect: multipleSelect,
      changeHierarchy: changeHierarchy,
      onClickNode: onClickNode,
      onDropNode: onDropNode
    });
  }) : /*#__PURE__*/_react.default.createElement(_ChartNode.default, {
    datasource: dsWithAttachedRel,
    NodeTemplate: NodeTemplate,
    draggable: draggable,
    collapsible: collapsible,
    multipleSelect: multipleSelect,
    changeHierarchy: changeHierarchy,
    onClickNode: onClickNode,
    onDropNode: onDropNode
  }))), /*#__PURE__*/_react.default.createElement("a", {
    className: "oc-download-btn hidden",
    ref: downloadButton,
    href: dataURL,
    download: download
  }, "\xA0"), /*#__PURE__*/_react.default.createElement("div", {
    className: "oc-mask ".concat(exporting ? "" : "hidden")
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "oci oci-spinner spinner"
  })));
});
ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;
var _default = ChartContainer;
exports.default = _default;