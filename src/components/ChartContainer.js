import React from "react";
import PropTypes from "prop-types";
import ChartNode from "./ChartNode";
import "./ChartContainer.css";

const propTypes = {
  datasource: PropTypes.object.isRequired,
  pan: PropTypes.bool,
  zoom: PropTypes.bool,
  zoomoutLimit: PropTypes.number,
  zoominLimit: PropTypes.number,
  containerClass: PropTypes.string,
  chartClass: PropTypes.string,
  nodeTemplate: PropTypes.elementType
};

const defaultProps = {
  pan: false,
  zoom: false,
  zoomoutLimit: 0.5,
  zoominLimit: 7,
  containerClass: "",
  chartClass: ""
};

class ChartContainer extends React.Component {
  startX = 0;
  startY = 0;
  constructor() {
    super();
    this.state = { transform: "", panning: false, cursor: "default" };
  }

  render() {
    const { datasource, containerClass, chartClass } = this.props;

    return (
      <div
        className={"orgchart-container " + containerClass}
        onWheel={this.props.zoom ? this.zoomHandler.bind(this) : undefined}
        onMouseUp={
          this.props.pan && this.state.panning
            ? this.panEndHandler.bind(this)
            : undefined
        }
      >
        <div
          className={"orgchart " + chartClass}
          style={{ transform: this.state.transform, cursor: this.state.cursor }}
          onMouseDown={
            this.props.pan ? this.panStartHandler.bind(this) : undefined
          }
          onMouseMove={
            this.props.pan && this.state.panning
              ? this.panHandler.bind(this)
              : undefined
          }
        >
          <ul>
            <ChartNode
              datasource={datasource}
              nodeTemplate={this.props.nodeTemplate}
            />
          </ul>
        </div>
      </div>
    );
  }

  panEndHandler() {
    this.setState({ panning: false, cursor: "default" });
  }

  panHandler(e) {
    let newX = 0;
    let newY = 0;
    if (!e.targetTouches) {
      // pand on desktop
      newX = e.pageX - this.startX;
      newY = e.pageY - this.startY;
    } else if (e.targetTouches.length === 1) {
      // pan on mobile device
      newX = e.targetTouches[0].pageX - this.startX;
      newY = e.targetTouches[0].pageY - this.startY;
    } else if (e.targetTouches.length > 1) {
      return;
    }
    if (this.state.transform === "") {
      if (this.state.transform.indexOf("3d") === -1) {
        this.setState({
          transform: "matrix(1,0,0,1," + newX + "," + newY + ")"
        });
      } else {
        this.setState({
          transform:
            "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + newX + ", " + newY + ",0,1)"
        });
      }
    } else {
      let matrix = this.state.transform.split(",");
      if (this.state.transform.indexOf("3d") === -1) {
        matrix[4] = newX;
        matrix[5] = newY + ")";
      } else {
        matrix[12] = newX;
        matrix[13] = newY;
      }
      this.setState({ transform: matrix.join(",") });
    }
  }

  panStartHandler(e) {
    if (e.target.closest(".oc-node")) {
      this.setState({ panning: false });
      return;
    } else {
      this.setState({ panning: true, cursor: "move" });
    }
    let lastX = 0;
    let lastY = 0;
    if (this.state.transform !== "") {
      let matrix = this.state.transform.split(",");
      if (this.state.transform.indexOf("3d") === -1) {
        lastX = parseInt(matrix[4]);
        lastY = parseInt(matrix[5]);
      } else {
        lastX = parseInt(matrix[12]);
        lastY = parseInt(matrix[13]);
      }
    }
    if (!e.targetTouches) {
      // pand on desktop
      this.startX = e.pageX - lastX;
      this.startY = e.pageY - lastY;
    } else if (e.targetTouches.length === 1) {
      // pan on mobile device
      this.startX = e.targetTouches[0].pageX - lastX;
      this.startY = e.targetTouches[0].pageY - lastY;
    } else if (e.targetTouches.length > 1) {
      return;
    }
  }

  setChartScale(newScale) {
    let matrix = [];
    let targetScale = 1;
    if (this.state.transform === "") {
      this.setState({
        transform: "matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)"
      });
    } else {
      matrix = this.state.transform.split(",");
      if (this.state.transform.indexOf("3d") === -1) {
        targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
        if (
          targetScale > this.props.zoomoutLimit &&
          targetScale < this.props.zoominLimit
        ) {
          matrix[0] = "matrix(" + targetScale;
          matrix[3] = targetScale;
          this.setState({ transform: matrix.join(",") });
        }
      } else {
        targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
        if (
          targetScale > this.props.zoomoutLimit &&
          targetScale < this.props.zoominLimit
        ) {
          matrix[0] = "matrix3d(" + targetScale;
          matrix[5] = targetScale;
          this.setState({ transform: matrix.join(",") });
        }
      }
    }
  }

  zoomHandler(e) {
    let newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
    this.setChartScale(newScale);
  }
}

ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;

export default ChartContainer;
