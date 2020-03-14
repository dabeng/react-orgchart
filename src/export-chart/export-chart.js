import React, { useRef, useState } from "react";
import OrganizationChart from "../components/ChartContainer";
import "./export-chart.css";

const ExportChart = () => {
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

  const exportTo = () => {
    orgchart.current.exportTo(filename, fileextension);
  };

  const [filename, setFilename] = useState("organization_chart");
  const [fileextension, setFileextension] = useState("png");

  const onNameChange = event => {
    setFilename(event.target.value);
  };

  const onExtensionChange = event => {
    setFileextension(event.target.value);
  };

  return (
    <>
      <section className="toolbar">
        <label htmlFor="txt-filename">Filename:</label>
        <input
          id="txt-filename"
          type="text"
          value={filename}
          onChange={onNameChange}
          style={{ fontSize: "1rem", marginRight: "2rem" }}
        />
        <span>Fileextension: </span>
        <input
          id="rd-png"
          type="radio"
          value="png"
          checked={fileextension === "png"}
          onChange={onExtensionChange}
        />
        <label htmlFor="rd-png">png</label>
        <input
          style={{ marginLeft: "1rem" }}
          id="rd-pdf"
          type="radio"
          value="pdf"
          checked={fileextension === "pdf"}
          onChange={onExtensionChange}
        />
        <label htmlFor="rd-pdf">pdf</label>
        <button
          onClick={exportTo}
          style={{ marginLeft: "2rem" }}
        >
          Export
        </button>
      </section>
      <OrganizationChart ref={orgchart} datasource={ds} />
    </>
  );
};

export default ExportChart;
