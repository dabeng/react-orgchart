import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ChartNode.css";

const propTypes = {
  datasource: PropTypes.object,
  nodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool
};

const defaultProps = {
  draggable: false
};

const ChartNode = ({ datasource, nodeTemplate, draggable }) => {

  const [isChildrenCollapsed, setIsChildrenCollapsed] = useState(false);
  const [topEdgeExpanded, setTopEdgeExpanded] = useState();
  const [rightEdgeExpanded, setRightEdgeExpanded] = useState();
  const [bottomEdgeExpanded, setBottomEdgeExpanded] = useState();
  const [leftEdgeExpanded, setLeftEdgeExpanded] = useState();

  const addArrows = (e) => {
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    const isAncestorsCollapsed = node && parent ? parent.firstChild.classList.contains("hidden") : undefined;
    const isSiblingsCollapsed = Array.from(node.parentNode.children).some(item => item.classList.contains("hidden"));

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

  const toggleAncestors = (actionNode) => {
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
      actionNode.classList.add(...("isAncestorsCollapsed" + (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")).split(" "));
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

  const topEdgeClickHandler = (e) => {
    setTopEdgeExpanded(!topEdgeExpanded);
    toggleAncestors(e.target.closest("li"));
  };

  const bottomEdgeClickHandler = () => {
    setIsChildrenCollapsed(!isChildrenCollapsed);
    setBottomEdgeExpanded(!bottomEdgeExpanded);
  };

  const toggleSiblings = (actionNode) => {
    let node = actionNode.previousSibling;
    const isSiblingsCollapsed = Array.from(actionNode.parentNode.children).some(
      item => item.classList.contains("hidden")
    );
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

  const hEdgeClickHandler = (e) => {
    setLeftEdgeExpanded(!leftEdgeExpanded);
    setRightEdgeExpanded(!rightEdgeExpanded);
    toggleSiblings(e.target.closest("li"));
  };

  return (
    <li>
      {nodeTemplate ? (
        <div id={datasource.id} className="oc-node" draggable={draggable ? "true" : undefined}>
          <this.props.nodeTemplate nodeData={datasource} />
        </div>
      ) : (
          <div
            id={datasource.id}
            className={`oc-node ${
              isChildrenCollapsed ? "isChildrenCollapsed" : ""
              }`}
            draggable={draggable ? "true" : undefined}
            onMouseEnter={addArrows}
            onMouseLeave={removeArrows}
          >
            <div className="oc-heading">
              {datasource.relationship.charAt(2) === "1" && (
                <i className="oci oci-leader oc-symbol" />
              )}
              {datasource.name}
            </div>
            <div className="oc-content">{datasource.title}</div>
            {datasource.relationship.charAt(0) === "1" && (
              <i
                className={`oc-edge verticalEdge topEdge oci ${
                  topEdgeExpanded === undefined
                    ? ""
                    : topEdgeExpanded
                      ? "oci-chevron-down"
                      : "oci-chevron-up"
                  }`}
                onClick={topEdgeClickHandler}
              />
            )}
            {datasource.relationship.charAt(1) === "1" && (
              <>
                <i
                  className={`oc-edge horizontalEdge rightEdge oci ${
                    rightEdgeExpanded === undefined
                      ? ""
                      : rightEdgeExpanded
                        ? "oci-chevron-left"
                        : "oci-chevron-right"
                    }`}
                  onClick={hEdgeClickHandler}
                />
                <i
                  className={`oc-edge horizontalEdge leftEdge oci ${
                    leftEdgeExpanded === undefined
                      ? ""
                      : leftEdgeExpanded
                        ? "oci-chevron-right"
                        : "oci-chevron-left"
                    }`}
                  onClick={hEdgeClickHandler}
                />
              </>
            )}
            {datasource.relationship.charAt(2) === "1" && (
              <i
                className={`oc-edge verticalEdge bottomEdge oci ${
                  bottomEdgeExpanded === undefined
                    ? ""
                    : bottomEdgeExpanded
                      ? "oci-chevron-up"
                      : "oci-chevron-down"
                  }`}
                onClick={bottomEdgeClickHandler}
              />
            )}
          </div>
        )}
      {datasource.children && (
        <ul className={isChildrenCollapsed ? "hidden" : ""}>
          {datasource.children.map(node => (
            <ChartNode
              datasource={node}
              nodeTemplate={nodeTemplate}
              id={node.id}
              key={node.id}
              draggable={draggable}
            />
          ))}
        </ul>
      )}
    </li>
  );

}

ChartNode.propTypes = propTypes;
ChartNode.defaultProps = defaultProps;

export default ChartNode;
