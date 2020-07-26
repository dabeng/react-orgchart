import React from "react";
import OrganizationChart from "../components/ChartContainer";
import MyNode from "./my-node";

const CustomNodeChart = () => {
  const ds = {
    id: "n1",
    name: "Lao Lao",
		title: "general manager",
		defaultExpanded: true,

		isLeaf: false,
    children: [
			{
				id: Math.random().toString(),
				name: "Henry Ford",
				title: "department manager",
				isLeaf: false,
				defaultExpanded: false,
			},
			{
				id: Math.random().toString(),
				name: "Steve",
				title: "department manager",
				isLeaf: false,
				defaultExpanded: false,
			},
		]
  };
	const onLoadData = (node) => {
		return new Promise((resolve, reject) => {
			resolve([
          {
            id: Math.random().toString(),
            name: "Armin",
            title: "department manager",
          },
          {
            id: Math.random().toString(),
            name: "Elon",
            title: "department manager",
          },
        ])
		})
	}
  return <OrganizationChart datasource={ds} chartClass="myChart" NodeTemplate={MyNode} loadOnDemand={true} onLoadData={onLoadData} />;
};

export default CustomNodeChart;
