import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { dragNodeService, selectNodeService } from "./service";
import "./ChartNode.css";

const propTypes = {
  datasource: PropTypes.object,
  NodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool,
  collapsible: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  changeHierarchy: PropTypes.func,
  onClickNode: PropTypes.func,
  onDropNode: PropTypes.func
};

const defaultProps = {
  draggable: false,
  collapsible: true,
  multipleSelect: false
};

const ChartNode = ({
  datasource,
  NodeTemplate,
  draggable,
  collapsible,
  multipleSelect,
  changeHierarchy,
  onClickNode,
  onDropNode
}) => {
  const node = useRef();

  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(false);
  const [topEdgeExpanded, setTopEdgeExpanded] = useState();
  const [rightEdgeExpanded, setRightEdgeExpanded] = useState();
  const [bottomEdgeExpanded, setBottomEdgeExpanded] = useState();
  const [leftEdgeExpanded, setLeftEdgeExpanded] = useState();
  const [allowedDrop, setAllowedDrop] = useState(false);
  const [selected, setSelected] = useState(false);

  const nodeClass = [
    "oc-node",
    isChildrenCollapsed ? "isChildrenCollapsed" : "",
    allowedDrop ? "allowedDrop" : "",
    selected ? "selected" : ""
  ]
    .filter(item => item)
    .join(" ");

  useEffect(() => {
    const subs1 = dragNodeService.getDragInfo().subscribe(draggedInfo => {
      if (draggedInfo) {
        setAllowedDrop(
          !document
            .querySelector("#" + draggedInfo.draggedNodeId)
            .closest("li")
            .querySelector("#" + node.current.id)
            ? true
            : false
        );
      } else {
        setAllowedDrop(false);
      }
    });

    const subs2 = selectNodeService
      .getSelectedNodeInfo()
      .subscribe(selectedNodeInfo => {
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

    return () => {
      subs1.unsubscribe();
      subs2.unsubscribe();
    };
  }, [multipleSelect, datasource]);

  const addArrows = e => {
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    const isAncestorsCollapsed =
      node && parent
        ? parent.firstChild.classList.contains("hidden")
        : undefined;
    const isSiblingsCollapsed = Array.from(
      node.parentNode.children
    ).some(item => item.classList.contains("hidden"));

    setTopEdgeExpanded(!isAncestorsCollapsed);
    setRightEdgeExpanded(!isSiblingsCollapsed);
    setLeftEdgeExpanded(!isSiblingsCollapsed);
    setBottomEdgeExpanded(!isChildrenCollapsed);
  };

  const removeArrows = () => {
    setTopEdgeExpanded(undefined);
    setRightEdgeExpanded(undefined);
    setBottomEdgeExpanded(undefined);
    setLeftEdgeExpanded(undefined);
  };

  const toggleAncestors = actionNode => {
    let node = actionNode.parentNode.closest("li");
    if (!node) return;
    const isAncestorsCollapsed = node.firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      // 向上展开，只展开一级
      actionNode.classList.remove("isAncestorsCollapsed");
      node.firstChild.classList.remove("hidden");
    } else {
      // 向下折叠，则折叠所有祖先节点以及祖先节点的兄弟节点
      const isSiblingsCollapsed = Array.from(
        actionNode.parentNode.children
      ).some(item => item.classList.contains("hidden"));
      if (!isSiblingsCollapsed) {
        toggleSiblings(actionNode);
      }
      actionNode.classList.add(
        ...(
          "isAncestorsCollapsed" +
          (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")
        ).split(" ")
      );
      node.firstChild.classList.add("hidden");
      // 如果还有展开的祖先节点，那继续折叠关闭之
      if (
        node.parentNode.closest("li") &&
        !node.parentNode.closest("li").firstChild.classList.contains("hidden")
      ) {
        toggleAncestors(node);
      }
    }
  };

  const topEdgeClickHandler = e => {
    e.stopPropagation();
    setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(e.target.closest("li"));
  };

  const bottomEdgeClickHandler = e => {
    e.stopPropagation();
    setIsChildrenCollapsed(!isChildrenCollapsed);
    setBottomEdgeExpanded(!bottomEdgeExpanded);
  };

  const toggleSiblings = actionNode => {
    let node = actionNode.previousSibling;
    const isSiblingsCollapsed = Array.from(
      actionNode.parentNode.children
    ).some(item => item.classList.contains("hidden"));
    actionNode.classList.toggle("isSiblingsCollapsed", !isSiblingsCollapsed);
    // 先处理同级的兄弟节点
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
    }
    // 在展开兄弟节点的同时，还要展开父节点
    const isAncestorsCollapsed = actionNode.parentNode
      .closest("li")
      .firstChild.classList.contains("hidden");
    if (isAncestorsCollapsed) {
      toggleAncestors(actionNode);
    }
  };

  const hEdgeClickHandler = e => {
    e.stopPropagation();
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(e.target.closest("li"));
  };

  const filterAllowedDropNodes = id => {
    dragNodeService.sendDragInfo(id);
  };

  const clickNodeHandler = event => {
    if (onClickNode) {
      onClickNode(datasource);
    }

    selectNodeService.sendSelectedNodeInfo(datasource.id);
  };

  const dragstartHandler = event => {
    const copyDS = { ...datasource };
    delete copyDS.relationship;
    event.dataTransfer.setData("text/plain", JSON.stringify(copyDS));
    // highlight all potential drop targets
    filterAllowedDropNodes(node.current.id);
  };

  const dragoverHandler = event => {
    // prevent default to allow drop
    event.preventDefault();
  };

  const dragendHandler = () => {
    // reset background of all potential drop targets
    dragNodeService.clearDragInfo();
  };

  const dropHandler = async (event) => {
    if (!event.currentTarget.classList.contains("allowedDrop")) {
      return;
    }
    dragNodeService.clearDragInfo();
    const data = await changeHierarchy(
      JSON.parse(event.dataTransfer.getData("text/plain")),
      event.currentTarget.id
    );

    onDropNode && onDropNode(data);
  };

  return (
    <li className="oc-hierarchy">
      <div
        ref={node}
        id={datasource.id}
        className={nodeClass}
        draggable={draggable ? "true" : undefined}
        onClick={clickNodeHandler}
        onDragStart={dragstartHandler}
        onDragOver={dragoverHandler}
        onDragEnd={dragendHandler}
        onDrop={dropHandler}
        onMouseEnter={addArrows}
        onMouseLeave={removeArrows}
      >
        {NodeTemplate ? (
          <NodeTemplate nodeData={datasource} />
        ) : (
          <>
            <div className="oc-heading">
              {datasource.relationship &&
                datasource.relationship.charAt(2) === "1" && (
                  <i className="oci oci-leader oc-symbol" />
                )}
              {datasource.name}
            </div>
            <div className="oc-content">{datasource.title}</div>
          </>
        )}
        {collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(0) === "1" && (
            <i
              className={`oc-edge verticalEdge topEdge oci ${topEdgeExpanded === undefined
                ? ""
                : topEdgeExpanded
                  ? "oci-chevron-down"
                  : "oci-chevron-up"
                }`}
              onClick={topEdgeClickHandler}
            />
          )}
        {collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(1) === "1" && (
            <>
              <i
                className={`oc-edge horizontalEdge rightEdge oci ${rightEdgeExpanded === undefined
                  ? ""
                  : rightEdgeExpanded
                    ? "oci-chevron-left"
                    : "oci-chevron-right"
                  }`}
                onClick={hEdgeClickHandler}
              />
              <i
                className={`oc-edge horizontalEdge leftEdge oci ${leftEdgeExpanded === undefined
                  ? ""
                  : leftEdgeExpanded
                    ? "oci-chevron-right"
                    : "oci-chevron-left"
                  }`}
                onClick={hEdgeClickHandler}
              />
            </>
          )}
        {collapsible &&
          datasource.relationship &&
          datasource.relationship.charAt(2) === "1" && (
            <i
              className={`oc-edge verticalEdge bottomEdge oci ${bottomEdgeExpanded === undefined
                ? ""
                : bottomEdgeExpanded
                  ? "oci-chevron-up"
                  : "oci-chevron-down"
                }`}
              onClick={bottomEdgeClickHandler}
            />
          )}
      </div>
      {datasource.children && datasource.children.length > 0 && (
        <ul className={isChildrenCollapsed ? "hidden" : ""}>
          {datasource.children.map(node => (
            <ChartNode
              datasource={node}
              NodeTemplate={NodeTemplate}
              id={node.id}
              key={node.id}
              draggable={draggable}
              collapsible={collapsible}
              multipleSelect={multipleSelect}
              changeHierarchy={changeHierarchy}
              onClickNode={onClickNode}
              onDropNode={onDropNode}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

ChartNode.propTypes = propTypes;
ChartNode.defaultProps = defaultProps;

export default ChartNode;
