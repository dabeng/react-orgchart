import { Subject } from "rxjs";

const subject1 = new Subject();
const subject2 = new Subject();

export const dragNodeService = {
  sendDragInfo: id => subject1.next({ draggedNodeId: id }),
  clearDragInfo: () => subject1.next(),
  getDragInfo: () => subject1.asObservable()
};

export const selectNodeService = {
  sendSelectedNodeInfo: id => subject2.next({ selectedNodeId: id }),
  clearSelectedNodeInfo: () => subject2.next(),
  getSelectedNodeInfo: () => subject2.asObservable()
};
