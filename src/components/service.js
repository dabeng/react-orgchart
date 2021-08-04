import { useEffect, useState } from "react";
import { Subject } from "rxjs";

let selectedNodes = [];
const dragNodeSubject = new Subject();
const selectedNodesSubject = new Subject();

export const dragNodeService = {
  sendDragInfo: id => dragNodeSubject.next({ draggedNodeId: id }),
  clearDragInfo: () => dragNodeSubject.next(),
  getDragInfo: () => dragNodeSubject.asObservable()
};

export const selectNodeService = {
  toggleSelectNode: node => {
    var index = selectedNodes.find((n) => n.id === node.id);

    if (index) {
      selectedNodes = [...selectedNodes.filter((find) => find.id !== node.id)];
    } else {
      selectedNodes = [...selectedNodes, node];
    }

    selectedNodesSubject.next(selectedNodes);
  },
  clearSelectedNodes: () => {
    selectedNodes = [];
    selectedNodesSubject.next(selectedNodes)
  },
  getSelectedNodes: () => selectedNodesSubject.asObservable()
};

export function useDebouncedState(value, delay = 300) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [delay, value],
  );

  return debouncedValue;
}