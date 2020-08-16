import React from "react";
import PropTypes from "prop-types";
import { loadDataAsync } from ".";
import "./custom-node.css";

const propTypes = {
	nodeData: PropTypes.object.isRequired,
};

const MyNode = ({ nodeData, addChildren }) => {
	const selectNode = async () => {
		if (addChildren) {
			const children = await loadDataAsync();
			addChildren(children);
		}
	};

	return (
		<div>
      <div className="position">{nodeData.data.title}</div>
      <div className="fullname">{nodeData.data.name}</div>
    </div>
	);
};

MyNode.propTypes = propTypes;

export default MyNode;
