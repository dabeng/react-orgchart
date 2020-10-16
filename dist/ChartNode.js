"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _service = require("./service");

require("./ChartNode.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var propTypes = {
  datasource: _propTypes.default.object,
  NodeTemplate: _propTypes.default.elementType,
  draggable: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  multipleSelect: _propTypes.default.bool,
  changeHierarchy: _propTypes.default.func,
  onClickNode: _propTypes.default.func
};
var defaultProps = {
  draggable: false,
  collapsible: true,
  multipleSelect: false
};

var ChartNode = function ChartNode(_ref) {
  var datasource = _ref.datasource,
      NodeTemplate = _ref.NodeTemplate,
      draggable = _ref.draggable,
      collapsible = _ref.collapsible,
      multipleSelect = _ref.multipleSelect,
      changeHierarchy = _ref.changeHierarchy,
      onClickNode = _ref.onClickNode;
  var node = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isChildrenCollapsed = _useState2[0],
      setIsChildrenCollapsed = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      topEdgeExpanded = _useState4[0],
      setTopEdgeExpanded = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      rightEdgeExpanded = _useState6[0],
      setRightEdgeExpanded = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      bottomEdgeExpanded = _useState8[0],
      setBottomEdgeExpanded = _useState8[1];

  var _useState9 = (0, _react.useState)(),
      _useState10 = _slicedToArray(_useState9, 2),
      leftEdgeExpanded = _useState10[0],
      setLeftEdgeExpanded = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      allowedDrop = _useState12[0],
      setAllowedDrop = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      selected = _useState14[0],
      setSelected = _useState14[1];

  var nodeClass = ["oc-node", isChildrenCollapsed ? "isChildrenCollapsed" : "", allowedDrop ? "allowedDrop" : "", selected ? "selected" : ""].filter(function (item) {
    return item;
  }).join(" ");
  (0, _react.useEffect)(function () {
    var subs1 = _service.dragNodeService.getDragInfo().subscribe(function (draggedInfo) {
      if (draggedInfo) {
        setAllowedDrop(!document.querySelector("#" + draggedInfo.draggedNodeId).closest("li").querySelector("#" + node.current.id) ? true : false);
      } else {
        setAllowedDrop(false);
      }
    });

    var subs2 = _service.selectNodeService.getSelectedNodeInfo().subscribe(function (selectedNodeInfo) {
      if (selectedNodeInfo) {
        if (multipleSelect) {
          if (selectedNodeInfo.selectedNodeId === datasource.id) {
            setSelected(true);
          }
        } else {
          setSelected(selectedNodeInfo.selectedNodeId === datasource.id);
        }
      } else {
        setSelected(false);
      }
    });

    return function () {
      subs1.unsubscribe();
      subs2.unsubscribe();
    };
  }, [multipleSelect, datasource]);

  var addArrows = function addArrows(e) {
    var node = e.target.closest("li");
    var parent = node.parentNode.closest("li");
    var isAncestorsCollapsed = node && parent ? parent.firstChild.classList.contains("hidden") : undefined;
    var isSiblingsCollapsed = Array.from(node.parentNode.children).some(function (item) {
      return item.classList.contains("hidden");
    });
    setTopEdgeExpanded(!isAncestorsCollapsed);
    setRightEdgeExpanded(!isSiblingsCollapsed);
    setLeftEdgeExpanded(!isSiblingsCollapsed);
    setBottomEdgeExpanded(!isChildrenCollapsed);
  };

  var removeArrows = function removeArrows() {
    setTopEdgeExpanded(undefined);
    setRightEdgeExpanded(undefined);
    setBottomEdgeExpanded(undefined);
    setLeftEdgeExpanded(undefined);
  };

  var toggleAncestors = function toggleAncestors(actionNode) {
    var node = actionNode.parentNode.closest("li");
    if (!node) return;
    var isAncestorsCollapsed = node.firstChild.classList.contains("hidden");

    if (isAncestorsCollapsed) {
      // 向上展开，只展开一级
      actionNode.classList.remove("isAncestorsCollapsed");
      node.firstChild.classList.remove("hidden");
    } else {
      var _actionNode$classList;

      // 向下折叠，则折叠所有祖先节点以及祖先节点的兄弟节点
      var isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some(function (item) {
        return item.classList.contains("hidden");
      });

      if (!isSiblingsCollapsed) {
        toggleSiblings(actionNode);
      }

      (_actionNode$classList = actionNode.classList).add.apply(_actionNode$classList, _toConsumableArray(("isAncestorsCollapsed" + (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")).split(" ")));

      node.firstChild.classList.add("hidden"); // 如果还有展开的祖先节点，那继续折叠关闭之

      if (node.parentNode.closest("li") && !node.parentNode.closest("li").firstChild.classList.contains("hidden")) {
        toggleAncestors(node);
      }
    }
  };

  var topEdgeClickHandler = function topEdgeClickHandler(e) {
    e.stopPropagation();
    setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(e.target.closest("li"));
  };

  var bottomEdgeClickHandler = function bottomEdgeClickHandler(e) {
    e.stopPropagation();
    setIsChildrenCollapsed(!isChildrenCollapsed);
    setBottomEdgeExpanded(!bottomEdgeExpanded);
  };

  var toggleSiblings = function toggleSiblings(actionNode) {
    var node = actionNode.previousSibling;
    var isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some(function (item) {
      return item.classList.contains("hidden");
    });
    actionNode.classList.toggle("isSiblingsCollapsed", !isSiblingsCollapsed); // 先处理同级的兄弟节点

    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }

      node = node.previousSibling;
    }

    node = actionNode.nextSibling;

    while (node) {
      if (isSiblingsCollapsed) {
        node.classList.remove("hidden");
      } else {
        node.classList.add("hidden");
      }

      node = node.nextSibling;
    } // 在展开兄弟节点的同时，还要展开父节点


    var isAncestorsCollapsed = actionNode.parentNode.closest("li").firstChild.classList.contains("hidden");

    if (isAncestorsCollapsed) {
      toggleAncestors(actionNode);
    }
  };

  var hEdgeClickHandler = function hEdgeClickHandler(e) {
    e.stopPropagation();
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(e.target.closest("li"));
  };

  var filterAllowedDropNodes = function filterAllowedDropNodes(id) {
    _service.dragNodeService.sendDragInfo(id);
  };

  var clickNodeHandler = function clickNodeHandler(event) {
    if (onClickNode) {
      onClickNode(datasource);
    }

    _service.selectNodeService.sendSelectedNodeInfo(datasource.id);
  };

  var dragstartHandler = function dragstartHandler(event) {
    var copyDS = _objectSpread({}, datasource);

    delete copyDS.relationship;
    event.dataTransfer.setData("text/plain", JSON.stringify(copyDS)); // highlight all potential drop targets

    filterAllowedDropNodes(node.current.id);
  };

  var dragoverHandler = function dragoverHandler(event) {
    // prevent default to allow drop
    event.preventDefault();
  };

  var dragendHandler = function dragendHandler() {
    // reset background of all potential drop targets
    _service.dragNodeService.clearDragInfo();
  };

  var dropHandler = function dropHandler(event) {
    if (!event.currentTarget.classList.contains("allowedDrop")) {
      return;
    }

    _service.dragNodeService.clearDragInfo();

    changeHierarchy(JSON.parse(event.dataTransfer.getData("text/plain")), event.currentTarget.id);
  };

  return _react.default.createElement("li", {
    className: "oc-hierarchy"
  }, _react.default.createElement("div", {
    ref: node,
    id: datasource.id,
    className: nodeClass,
    draggable: draggable ? "true" : undefined,
    onClick: clickNodeHandler,
    onDragStart: dragstartHandler,
    onDragOver: dragoverHandler,
    onDragEnd: dragendHandler,
    onDrop: dropHandler,
    onMouseEnter: addArrows,
    onMouseLeave: removeArrows
  }, NodeTemplate ? _react.default.createElement(NodeTemplate, {
    nodeData: datasource
  }) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "oc-heading"
  }, datasource.relationship && datasource.relationship.charAt(2) === "1" && _react.default.createElement("i", {
    className: "oci oci-leader oc-symbol"
  }), datasource.name), _react.default.createElement("div", {
    className: "oc-content"
  }, datasource.title)), collapsible && datasource.relationship && datasource.relationship.charAt(0) === "1" && _react.default.createElement("i", {
    className: "oc-edge verticalEdge topEdge oci ".concat(topEdgeExpanded === undefined ? "" : topEdgeExpanded ? "oci-chevron-down" : "oci-chevron-up"),
    onClick: topEdgeClickHandler
  }), collapsible && datasource.relationship && datasource.relationship.charAt(1) === "1" && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("i", {
    className: "oc-edge horizontalEdge rightEdge oci ".concat(rightEdgeExpanded === undefined ? "" : rightEdgeExpanded ? "oci-chevron-left" : "oci-chevron-right"),
    onClick: hEdgeClickHandler
  }), _react.default.createElement("i", {
    className: "oc-edge horizontalEdge leftEdge oci ".concat(leftEdgeExpanded === undefined ? "" : leftEdgeExpanded ? "oci-chevron-right" : "oci-chevron-left"),
    onClick: hEdgeClickHandler
  })), collapsible && datasource.relationship && datasource.relationship.charAt(2) === "1" && _react.default.createElement("i", {
    className: "oc-edge verticalEdge bottomEdge oci ".concat(bottomEdgeExpanded === undefined ? "" : bottomEdgeExpanded ? "oci-chevron-up" : "oci-chevron-down"),
    onClick: bottomEdgeClickHandler
  })), datasource.children && datasource.children.length > 0 && _react.default.createElement("ul", {
    className: isChildrenCollapsed ? "hidden" : ""
  }, datasource.children.map(function (node) {
    return _react.default.createElement(ChartNode, {
      datasource: node,
      NodeTemplate: NodeTemplate,
      id: node.id,
      key: node.id,
      draggable: draggable,
      collapsible: collapsible,
      multipleSelect: multipleSelect,
      changeHierarchy: changeHierarchy,
      onClickNode: onClickNode
    });
  })));
};

ChartNode.propTypes = propTypes;
ChartNode.defaultProps = defaultProps;
var _default = ChartNode;
exports.default = _default;