import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import JSONDigger from "json-digger";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf'
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
  NodeTemplate: PropTypes.elementType,
  draggable: PropTypes.bool
};

const defaultProps = {
  pan: false,
  zoom: false,
  zoomoutLimit: 0.5,
  zoominLimit: 7,
  containerClass: "",
  chartClass: "",
  draggable: false
};

const ChartContainer = forwardRef(({ datasource, pan, zoom, zoomoutLimit, zoominLimit, containerClass, chartClass, NodeTemplate, draggable }, ref) => {


  const container = useRef();
  const chart = useRef();
  const downloadButton = useRef();

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [transform, setTransform] = useState("");
  const [panning, setPanning] = useState(false);
  const [cursor, setCursor] = useState("default");
  const [exporting, setExporting] = useState(false);
  const [dataURL, setDataURL] = useState("");
  const [download, setDownload] = useState("");

  const attachRel = (data, flags) => {
    data.relationship =
      flags + (data.children && data.children.length > 0 ? 1 : 0);
    if (data.children) {
      data.children.forEach(function (item) {
        attachRel(item, "1" + (data.children.length > 1 ? 1 : 0));
      });
    }
    return data;
  };

  const [ds, setDS] = useState(attachRel(datasource, "00"));
  const dsDigger = new JSONDigger(ds, "id", "children");

  const panEndHandler = () => {
    setPanning(false);
    setCursor("default");
  };

  const panHandler = (e) => {
    let newX = 0;
    let newY = 0;
    if (!e.targetTouches) {
      // pand on desktop
      newX = e.pageX - startX;
      newY = e.pageY - startY;
    } else if (e.targetTouches.length === 1) {
      // pan on mobile device
      newX = e.targetTouches[0].pageX - startX;
      newY = e.targetTouches[0].pageY - startY;
    } else if (e.targetTouches.length > 1) {
      return;
    }
    if (transform === "") {
      if (transform.indexOf("3d") === -1) {
        setTransform("matrix(1,0,0,1," + newX + "," + newY + ")");
      } else {
        setTransform("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + newX + ", " + newY + ",0,1)");
      }
    } else {
      let matrix = transform.split(",");
      if (transform.indexOf("3d") === -1) {
        matrix[4] = newX;
        matrix[5] = newY + ")";
      } else {
        matrix[12] = newX;
        matrix[13] = newY;
      }
      setTransform(matrix.join(","));
    }
  }

  const panStartHandler = (e) => {
    if (e.target.closest(".oc-node")) {
      setPanning(false);
      return;
    } else {
      setPanning(true);
      setCursor("move");
    }
    let lastX = 0;
    let lastY = 0;
    if (transform !== "") {
      let matrix = transform.split(",");
      if (transform.indexOf("3d") === -1) {
        lastX = parseInt(matrix[4]);
        lastY = parseInt(matrix[5]);
      } else {
        lastX = parseInt(matrix[12]);
        lastY = parseInt(matrix[13]);
      }
    }
    if (!e.targetTouches) {
      // pand on desktop
      setStartX(e.pageX - lastX);
      setStartY(e.pageY - lastY);
    } else if (e.targetTouches.length === 1) {
      // pan on mobile device
      setStartX(e.targetTouches[0].pageX - lastX);
      setStartY(e.targetTouches[0].pageY - lastY);
    } else if (e.targetTouches.length > 1) {
      return;
    }
  }

  const updateChartScale = (newScale) => {
    let matrix = [];
    let targetScale = 1;
    if (transform === "") {
      setTransform("matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)");
    } else {
      matrix = transform.split(",");
      if (transform.indexOf("3d") === -1) {
        targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
        if (
          targetScale > zoomoutLimit &&
          targetScale < zoominLimit
        ) {
          matrix[0] = "matrix(" + targetScale;
          matrix[3] = targetScale;
          setTransform(matrix.join(","));
        }
      } else {
        targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
        if (
          targetScale > zoomoutLimit &&
          targetScale < zoominLimit
        ) {
          matrix[0] = "matrix3d(" + targetScale;
          matrix[5] = targetScale;
          setTransform(matrix.join(","));
        }
      }
    }
  };

  const zoomHandler = (e) => {
    let newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
    updateChartScale(newScale);
  }

  const exportPDF = (canvas, exportFilename) => {
    const canvasWidth = Math.floor(canvas.width);
    const canvasHeight = Math.floor(canvas.height);
    const doc = canvasWidth > canvasHeight
      ? new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvasWidth, canvasHeight]
      })
      : new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvasHeight, canvasWidth]
      });
    doc.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0);
    doc.save(exportFilename + '.pdf');
  }

  const exportPNG = (canvas, exportFilename) => {
    const isWebkit = "WebkitAppearance" in document.documentElement.style;
    const isFf = !!window.sidebar;
    const isEdge = navigator.appName === "Microsoft Internet Explorer" || (navigator.appName === "Netscape" && navigator.appVersion.indexOf("Edge") > -1);

    if ((!isWebkit && !isFf) || isEdge) {
      window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + ".png");
    } else {
      setDataURL(canvas.toDataURL());
      setDownload(exportFilename + ".png");
      downloadButton.current.click();
    }
  }

  const changeHierarchy = async (draggedItemData, dropTargetId) => {
    await dsDigger.removeNode(draggedItemData.id);
    await dsDigger.addChildren(dropTargetId, draggedItemData);
    setDS(attachRel(dsDigger.ds, "00"));
  };

  useImperativeHandle(ref, () => ({

    exportTo: (exportFilename, exportFileextension) => {
      exportFilename = exportFilename || "OrgChart";
      exportFileextension = exportFileextension || "png";
      setExporting(true);
      const originalScrollLeft = container.current.scrollLeft;
      container.current.scrollLeft = 0;
      const originalScrollTop = container.current.scrollTop;
      container.current.scrollTop = 0;
      html2canvas(chart.current, {
        width: chart.current.clientWidth,
        height: chart.current.clientHeight,
        onclone: function (clonedDoc) {
          clonedDoc.querySelector(".orgchart").style.background = "none";
          clonedDoc.querySelector(".orgchart").style.transform = "";
        }
      })
        .then(canvas => {
          if (exportFileextension.toLowerCase() === "pdf") {
            exportPDF(canvas, exportFilename);
          } else {
            exportPNG(canvas, exportFilename);
          }
          setExporting(false);
          container.current.scrollLeft = originalScrollLeft;
          container.current.scrollTop = originalScrollTop;
        }, () => {
          setExporting(false);
          container.current.scrollLeft = originalScrollLeft;
          container.current.scrollTop = originalScrollTop;
        });
    }

  }));

  return (
    <div ref={container}
      className={"orgchart-container " + containerClass}
      onWheel={zoom ? zoomHandler : undefined}
      onMouseUp={
        pan && panning
          ? panEndHandler
          : undefined
      }
    >
      <div
        ref={chart}
        className={"orgchart " + chartClass}
        style={{ transform: transform, cursor: cursor }}
        onMouseDown={
          pan ? panStartHandler : undefined
        }
        onMouseMove={
          pan && panning
            ? panHandler
            : undefined
        }
      >
        <ul>
          <ChartNode
            datasource={ds}
            NodeTemplate={NodeTemplate}
            draggable={draggable}
            changeHierarchy={changeHierarchy}
          />
        </ul>
      </div>
      <a className="oc-download-btn hidden" ref={downloadButton} href={dataURL} download={download}>&nbsp;</a>
      <div className={`oc-mask ${exporting ? "" : "hidden"}`}>
        <i className="oci oci-spinner spinner"></i>
      </div>
    </div>
  );

});

ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;

export default ChartContainer;
