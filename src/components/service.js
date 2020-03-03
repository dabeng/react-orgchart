import { Subject } from "rxjs";

const subject1 = new Subject();

export const dragNodeService = {
  sendDragInfo: id => subject1.next({ draggedNodeId: id }),
  clearDragInfo: () => subject1.next(),
  getDragInfo: () => subject1.asObservable()
};
