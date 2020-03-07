import React from "react";
import PropTypes from "prop-types";
import "./my-node.css";

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const MyNode = ({ nodeData }) => {
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
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
