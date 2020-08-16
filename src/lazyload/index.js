import React from "react";
import OrganizationChart from "../components/ChartContainer";
import MyNode from "./custom-node";

export const loadDataAsync = (node) => {
	return new Promise((resolve, reject) => {
		resolve([
			{ id: "n9", name: "Hong Miao",
			data: { title: "department manager", name: "Hong Miao"}},
      {
        id: "n10",
        name: "Chun Miao",
        data: {title: "department manager", name: "Hong Miao"},
      }
			])
	})
}

const lazyloadChart = () => {
  const ds = {
		id: "n1",
		data: {
			name: "Lao Lao",
			title: "general manager",
		},
		isLeaf: false
	};
	

  return <OrganizationChart datasource={ds} chartClass="myChart" NodeTemplate={MyNode} loadOnDemand={true} loadData={loadDataAsync} />;
};

export default lazyloadChart;
