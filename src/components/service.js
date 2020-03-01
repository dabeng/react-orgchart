import { Subject } from 'rxjs';

const subject = new Subject();

export const dragNodeService = {
    sendDragInfo: id => subject.next({ draggedNodeId: id }),
    clearDragInfo: () => subject.next(),
    getDragInfo: () => subject.asObservable()
};