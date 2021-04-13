import React from "react";
import OrganizationChart from "../components/ChartContainer";
import MyNode from "./custom-node";

export const loadDataAsync = (node) => {
  return new Promise((resolve, reject) => {
    resolve([
      { id: "n2", name: "Bo Miao", title: "department manager" },
      {
        id: "n3",
        name: "Su Miao",
        title: "department manager",
      }
    ])
  })
}

const lazyloadChart = () => {
  const ds = {
    id: "n1",
    name: "Lao Lao",
    title: "general manager",
  };


  return <OrganizationChart datasource={ds} chartClass="lazyload-chart" NodeTemplate={MyNode} loadOnDemand={true} loadData={loadDataAsync} />;
};

export default lazyloadChart;
