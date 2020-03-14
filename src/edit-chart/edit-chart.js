import React, { useRef, useState } from "react";
import JSONDigger from "json-digger";
import { v4 as uuidv4 } from 'uuid';
import OrganizationChart from "../components/ChartContainer";
import "./edit-chart.css";

const EditChart = () => {
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
  // const [ds, setDS] = useState({...dsDigger.ds});
  // useEffect(
  //   () => {
  //     setDS(dsDigger.ds);
  //   },
  //   [dsDigger.ds],
  // );

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [newNodes, setNewNodes] = useState([{ name: "", title: "" }]);
  const [isEditMode, setIsEditMode] = useState(true);

  const readSelectedNode = nodeData => {
    setSelectedNodes([nodeData]);
  };

  const clearSelectedNode = () => {
    setSelectedNodes([]);
  };

  const onNameChange = (e, index) => {
    // const copy = [...newNodes];
    // copy[index].name = e.target.value;
    newNodes[index].name = e.target.value;
    setNewNodes([...newNodes]);
  };

  const onTitleChange = (e, index) => {
    // const copy = [...newNodes];
    // copy[index].title = e.target.value;
    newNodes[index].title = e.target.value;
    setNewNodes([...newNodes]);
  };

  const getNewNodes = () => {
    const nodes = [];
    for (const node of newNodes) {
      nodes.push({...node,id: uuidv4()});
    }
    return nodes;
  };

  const addChildNodes = async () => {
    await dsDigger.addChildren(selectedNodes[0].id, getNewNodes());
    setDS({ ...dsDigger.ds });
  };

  const addSiblingNodes = async () => {
    await dsDigger.addSiblings(selectedNodes[0].id, getNewNodes());
    setDS({ ...dsDigger.ds });
  };

  const addRootNode = () => {
    // dsDigger.addRoot(getNewNodes()[0]);
    // setDS({ ...dsDigger.ds });
    dsDigger.addRoot(getNewNodes()[0]);
    setDS({ ...dsDigger.ds });
  };

  const remove = async () => {
    await dsDigger.removeNode(selectedNodes[0].id);
    setDS({ ...dsDigger.ds });
  };

  const onModeChange = e => {
    setIsEditMode(e.target.checked);
  };

  return (
    <div className="edit-chart-wrapper">
      <section className="toolbar">
        {/* <div>{JSON.stringify(dsDigger.ds, null, 2)}</div> */}
        <div className="selected-nodes">
        <h4>Selected Node:</h4>
        <ul>
          {selectedNodes && selectedNodes.map(node => (
            <li key={node.id}>
              {node.name} - {node.title}
            </li>
          ))}
        </ul>
        </div>
        <div className="new-nodes">
        <h4>New Nodes:</h4>
        <ul>
          {newNodes && newNodes.map((node, index) => (
            <li key={index}>
              <input type="text" placeholder="name" value={node.name} onChange={(e) => onNameChange(e, index)} />
              <input type="text" placeholder="title" value={node.title} onChange={(e) => onTitleChange(e, index)} />
              <button>+</button>
            </li>
          ))}
        </ul>
        </div>
        <div className="action-buttons">
        <button onClick={addChildNodes}>Add Child Nodes</button>
        <button onClick={addSiblingNodes}>Add Sibling Nodes</button>
        <button onClick={addRootNode}>Add Root Node</button>
        <button onClick={remove}>Remove Nodes</button>
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
        onClickNode={readSelectedNode}
        onClickChart={clearSelectedNode}
      />
    </div>
  );
};

export default EditChart;
