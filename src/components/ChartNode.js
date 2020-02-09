import React from "react";
import PropTypes from "prop-types";
import "./ChartNode.css";

const propTypes = {
  datasource: PropTypes.object,
  nodeTemplate: PropTypes.elementType
};

class ChartNode extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChildrenCollapsed: false,
      topEdgeExpanded: undefined,
      rightEdgeExpanded: undefined,
      bottomEdgeExpanded: undefined,
      leftedgeExpanded: undefined
    };
  }

  render() {
    const { datasource } = this.props;

    return (
      <li>
        {this.props.nodeTemplate ? (
          <div id={datasource.id} className="oc-node">
            <this.props.nodeTemplate nodeData={datasource} />
          </div>
        ) : (
          <div
            id={datasource.id}
            className={`oc-node ${
              this.state.isChildrenCollapsed ? "isChildrenCollapsed" : ""
            }`}
            onMouseEnter={this.addArrows.bind(this)}
            onMouseLeave={this.removeArrows.bind(this)}
          >
            <div className="oc-heading">
              {datasource.relationship.charAt(2) === "1" && (
                <i className="oci oci-leader oc-symbol"/>
              )}
              {datasource.name}
            </div>
            <div className="oc-content">{datasource.title}</div>
            {datasource.relationship.charAt(0) === "1" && (
              <i
                className={`oc-edge verticalEdge topEdge oci ${
                  this.state.topEdgeExpanded === undefined
                    ? ""
                    : this.state.topEdgeExpanded
                    ? "oci-chevron-down"
                    : "oci-chevron-up"
                }`}
                onClick={this.topEdgeClickHandler.bind(this)}
              />
            )}
            {datasource.relationship.charAt(1) === "1" && (
              <>
                <i
                  className={`oc-edge horizontalEdge rightEdge oci ${
                    this.state.rightEdgeExpanded === undefined
                      ? ""
                      : this.state.rightEdgeExpanded
                      ? "oci-chevron-left"
                      : "oci-chevron-right"
                  }`}
                  onClick={this.hEdgeClickHandler.bind(this)}
                />
                <i
                  className={`oc-edge horizontalEdge leftEdge oci ${
                    this.state.leftEdgeExpanded === undefined
                      ? ""
                      : this.state.leftEdgeExpanded
                      ? "oci-chevron-right"
                      : "oci-chevron-left"
                  }`}
                  onClick={this.hEdgeClickHandler.bind(this)}
                />
              </>
            )}
            {datasource.relationship.charAt(2) === "1" && (
              <i
                className={`oc-edge verticalEdge bottomEdge oci ${
                  this.state.bottomEdgeExpanded === undefined
                    ? ""
                    : this.state.bottomEdgeExpanded
                    ? "oci-chevron-up"
                    : "oci-chevron-down"
                }`}
                onClick={this.bottomEdgeClickHandler.bind(this)}
              />
            )}
          </div>
        )}
        {datasource.children && (
          <ul className={this.state.isChildrenCollapsed ? "hidden" : ""}>
            {datasource.children.map(node => (
              <ChartNode
                datasource={node}
                nodeTemplate={this.props.nodeTemplate}
                id={node.id}
                key={node.id}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  addArrows(e) {
    const node = e.target.closest("li");
    const parent = node.parentNode.closest("li");
    const isAncestorsCollapsed = node && parent ? parent.firstChild.classList.contains("hidden") : undefined;
    const isSiblingsCollapsed = Array.from(node.parentNode.children).some(item => item.classList.contains("hidden"));
    this.setState({
      topEdgeExpanded: !isAncestorsCollapsed,
      rightEdgeExpanded: !isSiblingsCollapsed,
      leftEdgeExpanded: !isSiblingsCollapsed,
      bottomEdgeExpanded: !this.state.isChildrenCollapsed
    });
  }

  removeArrows() {
    this.setState({
      topEdgeExpanded: undefined,
      rightEdgeExpanded: undefined,
      bottomEdgeExpanded: undefined,
      leftEdgeExpanded: undefined
    });
  }

  toggleAncestors(actionNode) {
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
        this.toggleSiblings(actionNode);
      }
      actionNode.classList.add(...("isAncestorsCollapsed" + (isSiblingsCollapsed ? "" : " isSiblingsCollapsed")).split(" "));
      node.firstChild.classList.add("hidden");
      // 如果还有展开的祖先节点，那继续折叠关闭之
      if (
        node.parentNode.closest("li") &&
        !node.parentNode.closest("li").firstChild.classList.contains("hidden")
      ) {
        this.toggleAncestors(node);
      }
    }
  }

  topEdgeClickHandler(e) {
    this.setState({
      topEdgeExpanded: !this.state.topEdgeExpanded
    });
    this.toggleAncestors(e.target.closest("li"));
  }

  bottomEdgeClickHandler() {
    this.setState({
      isChildrenCollapsed: !this.state.isChildrenCollapsed,
      bottomEdgeExpanded: !this.state.bottomEdgeExpanded
    });
  }

  toggleSiblings(actionNode) {
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
      this.toggleAncestors(actionNode);
    }
  }

  hEdgeClickHandler(e) {
    this.setState({
      leftEdgeExpanded: !this.state.leftEdgeExpanded,
      rightEdgeExpanded: !this.state.rightEdgeExpanded
    });
    this.toggleSiblings(e.target.closest("li"));
  }
}

ChartNode.propTypes = propTypes;

export default ChartNode;
