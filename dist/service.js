"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectNodeService = exports.dragNodeService = void 0;

var _rxjs = require("rxjs");

var subject1 = new _rxjs.Subject();
var subject2 = new _rxjs.Subject();
var dragNodeService = {
  sendDragInfo: function sendDragInfo(id) {
    return subject1.next({
      draggedNodeId: id
    });
  },
  clearDragInfo: function clearDragInfo() {
    return subject1.next();
  },
  getDragInfo: function getDragInfo() {
    return subject1.asObservable();
  }
};
exports.dragNodeService = dragNodeService;
var selectNodeService = {
  sendSelectedNodeInfo: function sendSelectedNodeInfo(id) {
    return subject2.next({
      selectedNodeId: id
    });
  },
  clearSelectedNodeInfo: function clearSelectedNodeInfo() {
    return subject2.next();
  },
  getSelectedNodeInfo: function getSelectedNodeInfo() {
    return subject2.asObservable();
  }
};
exports.selectNodeService = selectNodeService;