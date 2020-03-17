import React, { useRef, useState } from "react";
import JSONDigger from "json-digger";
import { v4 as uuidv4 } from "uuid";
import OrganizationChart from "../components/ChartContainer";
import "./edit-node.css";

const EditNode = () => {
  const orgchart = useRef();
  const datasource = {
    id: "n1",
    name: "Lao Lao",
    title: "general manager",
    children: [
      { id: "n2", name: "Bo Miao", title: "department manager" },
      {
        id: "n3",
        name: "Su Miao",
        title: "department manager",
        children: [
          { id: "n4", name: "Tie Hua", title: "senior engineer" },
          {
            id: "n5",
            name: "Hei Hei",
            title: "senior engineer",
            children: [
              { id: "n6", name: "Dan Dan", title: "engineer" },
              { id: "n7", name: "Xiang Xiang", title: "engineer" }
            ]
          },
          { id: "n8", name: "Pang Pang", title: "senior engineer" }
        ]
      },
      { id: "n9", name: "Hong Miao", title: "department manager" },
      {
        id: "n10",
        name: "Chun Miao",
        title: "department manager",
        children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }]
      }
    ]
  };
  const [ds, setDS] = useState(datasource);
  const dsDigger = new JSONDigger(ds, "id", "children");

  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [isEditMode, setIsEditMode] = useState(true);
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);

  const readSelectedNode = nodeData => {
    if (isMultipleSelect) {
      setSelectedNodes(prev => new Set(prev.add(nodeData)));
    } else {
      setSelectedNodes(new Set([nodeData]));
    }
  };

  const clearSelectedNode = () => {
    setSelectedNodes(new Set());
  };

  const onNameChange = e => {
    setNewNodeName(e.target.value);
  };

  const onTitleChange = e => {
    setNewNodeTitle(e.target.value);
  };

  const updateNodes = async () => {
    await dsDigger.updateNodes([...selectedNodes].map(node => node.id), { id: uuidv4(), name: newNodeName, title: newNodeTitle });
    setDS({ ...dsDigger.ds });
  };

  const onMultipleSelectChange = e => {
    setIsMultipleSelect(e.target.checked);
  };

  const onModeChange = e => {
    setIsEditMode(e.target.checked);
    if (e.target.checked) {
      orgchart.current.expandAllNodes();
    }
  };

  return (
    <div className="edit-chart-wrapper">
      <section className="toolbar">
        <div className="selected-nodes">
          <div>
            <h4 style={{ display: "inline-block" }}>Selected Node</h4>
            <input
              style={{ marginLeft: "1rem" }}
              id="cb-multiple-select"
              type="checkbox"
              checked={isMultipleSelect}
              onChange={onMultipleSelectChange}
            />
            <label htmlFor="cb-multiple-select">Multiple Select</label>
          </div>
          <ul>
            {Array.from(selectedNodes).map(node => (
              <li key={node.id}>
                {node.name} - {node.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="new-nodes">
          <h4>New Node</h4>

                  <input
                    type="text"
                    placeholder="name"
                    value={newNodeName}
                    onChange={onNameChange}
                  />
                  <input
                    type="text"
                    placeholder="title"
                    value={newNodeTitle}
                    onChange={onTitleChange}
                  />
  
        </div>
        <div className="action-buttons">
          <button disabled={!isEditMode} onClick={updateNodes}>
            Update Nodes
          </button>
          <input
            style={{ marginLeft: "1rem" }}
            id="cb-mode"
            type="checkbox"
            checked={isEditMode}
            onChange={onModeChange}
          />
          <label htmlFor="cb-mode">Edit Mode</label>
        </div>
      </section>
      <OrganizationChart
        ref={orgchart}
        datasource={ds}
        collapsible={!isEditMode}
        multipleSelect={isMultipleSelect}
        onClickNode={readSelectedNode}
        onClickChart={clearSelectedNode}
      />
    </div>
  );
};

export default EditNode;
