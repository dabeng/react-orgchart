import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <a
        href="https://github.com/dabeng/react-orgchart"
        target="blank"
        className="repo-logo"
      >
        <svg width="860" height="240" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>Logo of Dabeng&#x27;s js studio</title>
            <text
              stroke="#b80036"
              transform="matrix(1.2821781635284424,0,0,1.313725471496582,-94.81186294555664,-18.196077346801758) "
              fill="#b80036"
              strokeWidth="3"
              strokeDasharray="null"
              strokeLinejoin="null"
              strokeLinecap="null"
              x="524.741312"
              y="134.910448"
              id="svg_4"
              fontSize="92"
              fontFamily="Sans-serif"
              textAnchor="middle"
              fontWeight="bold"
            >
              OrgChart
            </text>
            <g id="svg_5" stroke="null">
              <rect
                id="svg_1"
                height="43.609757"
                width="128.702291"
                y="45"
                x="95.791349"
                strokeLinecap="null"
                strokeLinejoin="null"
                strokeDasharray="null"
                strokeWidth="7"
                fill="none"
                rx="5"
                ry="5"
                stroke="#b80036"
              />
              <rect
                height="43.609757"
                width="128.702291"
                y="150.390247"
                x="172.297711"
                strokeLinecap="null"
                strokeLinejoin="null"
                strokeDasharray="null"
                strokeWidth="7"
                fill="none"
                id="svg_2"
                rx="5"
                ry="5"
                stroke="#b80036"
              />
              <rect
                height="43.609757"
                width="128.702291"
                y="150.390247"
                x="20"
                strokeLinecap="null"
                strokeLinejoin="null"
                strokeDasharray="null"
                strokeWidth="7"
                fill="none"
                id="svg_3"
                rx="5"
                ry="5"
                stroke="#b80036"
              />
              <line
                fill="none"
                strokeWidth="3"
                strokeDasharray="null"
                strokeLinejoin="null"
                strokeLinecap="null"
                x1="83.636139"
                y1="120.590246"
                x2="236.648851"
                y2="120.590246"
                id="svg_8"
                stroke="#b80036"
              />
              <line
                fill="none"
                strokeWidth="3"
                strokeDasharray="null"
                stroklinejoin="null"
                strokeLinecap="null"
                x1="84.351146"
                y1="119.86342"
                x2="84.351146"
                y2="148.209759"
                id="svg_10"
                stroke="#b80036"
              />
              <line
                fill="none"
                strokeWidth="3"
                strokeDasharray="null"
                strokeLinejoin="null"
                strokeLinecap="null"
                x1="235.933844"
                y1="119.863418"
                x2="235.933844"
                y2="148.209759"
                id="svg_11"
                stroke="#b80036"
              />
              <line
                fill="none"
                strokeWidth="3"
                strokeDasharray="null"
                strokeLinejoin="null"
                strokeLinecap="null"
                x1="160.142495"
                y1="90.790247"
                x2="160.142495"
                y2="119.863416"
                id="svg_12"
                stroke="#b80036"
              />
            </g>
          </g>
        </svg>
      </a>
      <a href="https://github.com/dabeng" target="blank" className="author-logo">
        <img src="https://rawgit.com/dabeng/OrgChart/master/demo/img/logo.png" alt="logo" />
      </a>
    </div>
  );
};

export default Home;
