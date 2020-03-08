import React, { useRef, useState } from "react";
import OrganizationChart from "../components/ChartContainer";
import "./edit-chart.css";

const EditChart = () => {
  const orgchart = useRef();
  const ds = {
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

  const [selectedNode, setSelectedNode] = useState("");
  const [rel, setRel] = useState("child");

  const readSelectedNode = nodeData => {
    setSelectedNode(nodeData.name);
  };
  const onRelChange = event => {
    setRel(event.target.value);
  };

  const add = event => {
    
  };

  const remove = event => {
    
  };

  return (
    <div className="edit-chart-wrapper">
      <section className="toolbar">
        <label htmlFor="txt-selected-node">Selected Node:</label>
        <input
        readOnly
          id="txt-selected-node"
          type="text"
          value={selectedNode}
          style={{ fontSize: "1rem", marginRight: "2rem" }}
        />
        <span>Relationship: </span>
        <input
          id="rd-parent"
          type="radio"
          value="parent"
          checked={rel === "parent"}
          onChange={onRelChange}
        />
        <label htmlFor="rd-parent">parent</label>
        <input
          style={{ marginLeft: "1rem" }}
          id="rd-child"
          type="radio"
          value="child"
          checked={rel === "child"}
          onChange={onRelChange}
        />
        <label htmlFor="rd-child">child</label>
        <input
          style={{ marginLeft: "1rem" }}
          id="rd-sibling"
          type="radio"
          value="sibling"
          checked={rel === "sibling"}
          onChange={onRelChange}
        />
        <label htmlFor="rd-sibling">sibling</label>
        <span style={{ marginLeft: "2rem" }}>New Nodes: </span>
        <ul>
          <li>
            <input type="text"/>
            <button>+</button>
          </li>
        </ul>
        <button onClick={add}>Add</button>
        <button onClick={remove}>Remove</button>
      </section>
      <OrganizationChart ref={orgchart} datasource={ds} onClickNode={readSelectedNode} />
    </div>
  );
};

export default EditChart;
