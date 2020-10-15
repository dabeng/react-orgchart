import React from "react";
import PropTypes from "prop-types";
import "./custom-node.css";

const propTypes = {
	nodeData: PropTypes.object.isRequired,
};

const MyNode = ({ nodeData, addChildren, setCollapse}) => {

	return (
		<div>
      <div className="position">{nodeData.title}</div>
      <div className="fullname">{nodeData.name}</div>
    </div>
	);
};

MyNode.propTypes = propTypes;

export default MyNode;
