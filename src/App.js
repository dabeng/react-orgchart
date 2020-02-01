import React, { Component } from 'react';
import { render } from "react-dom";
import OrganizationChart from "./components/ChartContainer";
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ds: {
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
          { id: "10", name: "Chun Miao", title: "department manager",
            children: [
              { id: "11", name: "Yue Yue", title: "senior engineer" }
            ]
          }
        ]
      }
    };
  }
  render() {
    return (
      <OrganizationChart datasource={this.state.ds}/>
    );
  }
}

export default App;
