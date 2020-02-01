import React from "react";
import PropTypes from "prop-types";
import "./ChartNode.css";

const propTypes = {
  datasource: PropTypes.object.isRequired,
  nodeTemplate: PropTypes.elementType
};

class ChartNode extends React.Component {
  render() {
    const { datasource } = this.props;

    return (
      <li>
        {this.props.nodeTemplate ? (
          <div className="oc-node">
            <this.props.nodeTemplate nodeData={datasource} />
          </div>
        ) : (
          <div className="oc-node">
            <div className="oc-heading">{datasource.name}</div>
            <div className="oc-content">{datasource.title}</div>
          </div>
        )}
        {datasource.children && (
          <ul>
            {datasource.children.map(node => (
              <ChartNode
                datasource={node}
                nodeTemplate={this.props.nodeTemplate}
                key={node.id}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }
}

ChartNode.propTypes = propTypes;

export default ChartNode;
