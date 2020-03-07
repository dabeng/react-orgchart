import React, { useRef } from "react";
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
    orgchart.current.exportTo();
  };

  return (
    <>
      <section className="toolbar">
        <button className="btn-export" onClick={exportTo}>
          Export
        </button>
      </section>
      <OrganizationChart ref={orgchart} datasource={ds} draggable={true} />
    </>
  );
};

export default ExportChart;
