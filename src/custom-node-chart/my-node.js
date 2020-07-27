import React from "react";
import PropTypes from "prop-types";
import { onLoadData } from './custom-node-chart'
import "./my-node.css";

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const MyNode = ({ nodeData, addChildren}) => {
  const selectNode = async () => {
		const children = await onLoadData()
		console.log(children)
		addChildren(children);
	};

  return (
    <div onClick={selectNode}>
      <div className="position">{nodeData.title}</div>
      <div className="fullname">{nodeData.name}</div>
    </div>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;
