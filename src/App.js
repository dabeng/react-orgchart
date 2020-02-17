import React, { useState, useRef } from 'react';
import OrganizationChart from "./components/ChartContainer";
import './App.css';

const App = () => {
  const orgchart = useRef();
  const [ds, setDs] = useState(
    {
      id: "1",
      name: "Lao Lao",
      title: "general manager",
      children: [
        { id: "2", name: "Bo Miao", title: "department manager" },
        {
          id: "3",
          name: "Su Miao",
          title: "department manager",
          children: [
            { id: "4", name: "Tie Hua", title: "senior engineer" },
            {
              id: "5",
              name: "Hei Hei",
              title: "senior engineer",
              children: [
                { id: "6", name: "Dan Dan", title: "engineer" },
                { id: "7", name: "Xiang Xiang", title: "engineer" }
              ]
            },
            { id: "8", name: "Pang Pang", title: "senior engineer" }
          ]
        },
        { id: "9", name: "Hong Miao", title: "department manager" },
        {
          id: "10", name: "Chun Miao", title: "department manager",
          children: [
            { id: "11", name: "Yue Yue", title: "senior engineer" }
          ]
        }
      ]
    }
  );

  const exportTo = () => {
    orgchart.current.exportTo();
  };

  return (
    <>
      <section className="toolbar">
        <button className="btn-export" onClick={exportTo}>Export</button>
      </section>
      <OrganizationChart ref={orgchart} datasource={ds} pan={true} zoom={true} />
    </>
  );

};

export default App;
