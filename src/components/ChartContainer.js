import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback
} from "react";
import PropTypes from "prop-types";
import { selectNodeService, useDebouncedState } from "./service";
import JSONDigger from "json-digger";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
  draggable: PropTypes.bool,
  collapsible: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  onClickNode: PropTypes.func,
  onClickChart: PropTypes.func,
  onZoomChange: PropTypes.func,
  onDropNode: PropTypes.func,
};

const defaultProps = {
  pan: false,
  zoom: false,
  zoomoutLimit: 0.5,
  zoominLimit: 7,
  containerClass: "",
  chartClass: "",
  draggable: false,
  collapsible: true,
  multipleSelect: false
};

const ChartContainer = forwardRef(
  (
    {
      datasource,
      pan,
      zoom,
      zoomoutLimit,
      zoominLimit,
      containerClass,
      chartClass,
      NodeTemplate,
      draggable,
      collapsible,
      multipleSelect,
      onClickNode,
      onClickChart,
      onZoomChange,
      onDropNode
    },
    ref
  ) => {
    const container = useRef();
    const chart = useRef();
    const downloadButton = useRef();

    const [panning, setPanning] = useState(false);
    const [cursor, setCursor] = useState("default");
    const [exporting, setExporting] = useState(false);
    const [dataURL, setDataURL] = useState("");
    const [download, setDownload] = useState("");
    const [position, setPosition] = useState({
      oldX: 0,
      oldY: 0,
      x: 0,
      y: 0,
      z: 1,
    });
    const [scale, setScale] = useState(1);
    const debouncedScale = useDebouncedState(scale);

    const attachRel = useCallback((data, flags) => {
      if (!!data && data.length) {
        data.forEach(function (item) {
          attachRel(item, flags === "00" ? flags : "1" + (data.length > 1 ? 1 : 0));
        });
      }
      data.relationship =
        flags + (data.children && data.children.length > 0 ? 1 : 0);
      if (data.children) {
        data.children.forEach(function (item) {
          attachRel(item, "1" + (data.children.length > 1 ? 1 : 0));
        });
      }
      return data;
    }, []);

    const [ds, setDS] = useState(datasource);
    useEffect(() => {
      setDS(datasource);
    }, [datasource]);

    const dsDigger = new JSONDigger(datasource, "id", "children");

    const clickChartHandler = event => {
      if (!event.target.closest(".oc-node")) {
        if (onClickChart) {
          onClickChart();
        }
        selectNodeService.clearSelectedNodeInfo();
      }
    };

    const panEndHandler = () => {
      setCursor("default");
    };

    const panStartHandler = e => {
      if (e.target.closest(".oc-node")) {
        setPanning(false);
        return;
      } else {
        e.preventDefault();
        setPanning(true);
        setPosition({
          ...position,
          oldX: e.clientX,
          oldY: e.clientY
        });
      }
    };

    useEffect(() => {
      const mouseup = () => {
        setPanning(false);
      };
      const mousemove = (event) => {
        if (panning) {
          setPosition({
            ...position,
            x: position.x + event.clientX - position.oldX,
            y: position.y + event.clientY - position.oldY,
            oldX: event.clientX,
            oldY: event.clientY,
          });
        }
      };
      window.addEventListener('mouseup', mouseup);
      window.addEventListener('mousemove', mousemove);
      return () => {
        window.removeEventListener('mouseup', mouseup);
        window.removeEventListener('mousemove', mousemove);
      };
    });

    const zoomHandler = e => {
      if (e.deltaY) {
        const sign = Math.sign(e.deltaY) / 100;
        const scale = 1 - sign;
        const rect = container.current.getBoundingClientRect();
        const chartEl = container.current.getBoundingClientRect();
        
        const targetScale = position.z * scale;
        if (targetScale > zoomoutLimit && targetScale < zoominLimit) {
          setPosition({
            ...position,
            x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
            y: position.y * scale - (chartEl.height * rect.width / chartEl.width / 2 - e.clientY + rect.y) * sign,
            z: targetScale,
          });
          setScale(targetScale);
        }
      }
    };
    
    useEffect(() => {
      onZoomChange && onZoomChange(debouncedScale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedScale])

    const exportPDF = (canvas, exportFilename) => {
      const canvasWidth = Math.floor(canvas.width);
      const canvasHeight = Math.floor(canvas.height);
      const doc =
        canvasWidth > canvasHeight
          ? new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvasWidth, canvasHeight]
          })
          : new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvasHeight, canvasWidth]
          });
      doc.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0);
      doc.save(exportFilename + ".pdf");
    };

    const exportPNG = (canvas, exportFilename) => {
      const isWebkit = "WebkitAppearance" in document.documentElement.style;
      const isFf = !!window.sidebar;
      const isEdge =
        navigator.appName === "Microsoft Internet Explorer" ||
        (navigator.appName === "Netscape" &&
          navigator.appVersion.indexOf("Edge") > -1);

      if ((!isWebkit && !isFf) || isEdge) {
        window.navigator.msSaveBlob(canvas.msToBlob(), exportFilename + ".png");
      } else {
        setDataURL(canvas.toDataURL());
        setDownload(exportFilename + ".png");
        downloadButton.current.click();
      }
    };

    const changeHierarchy = async (draggedItemData, dropTargetId) => {
      await dsDigger.removeNode(draggedItemData.id);
      await dsDigger.addChildren(dropTargetId, draggedItemData);
      setDS({ ...dsDigger.ds });

      return { ...dsDigger.ds };
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
        }).then(
          canvas => {
            if (exportFileextension.toLowerCase() === "pdf") {
              exportPDF(canvas, exportFilename);
            } else {
              exportPNG(canvas, exportFilename);
            }
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          },
          () => {
            setExporting(false);
            container.current.scrollLeft = originalScrollLeft;
            container.current.scrollTop = originalScrollTop;
          }
        );
      },
      expandAllNodes: () => {
        chart.current
          .querySelectorAll(
            ".oc-node.hidden, .oc-hierarchy.hidden, .isSiblingsCollapsed, .isAncestorsCollapsed"
          )
          .forEach(el => {
            el.classList.remove(
              "hidden",
              "isSiblingsCollapsed",
              "isAncestorsCollapsed"
            );
          });
      },
      setZoom: (newScale) => {
        if (newScale < zoomoutLimit) {
          newScale = zoomoutLimit
        }
        if (newScale > zoominLimit) {
          newScale = zoominLimit;
        }
        setPosition((position) => ({ ...position, z: newScale }))
      },
      getChart: () => {
        return ds.children;
      },
      resetPosition: () => {
        setPosition({ oldX: 0, oldY: 0, x: 0, y: 0, z: 0 })
      }
    }));

    const dsWithAttachedRel = useMemo(() => attachRel(ds, "00"), [attachRel, ds]);

    return (
      <div
        ref={container}
        className={"orgchart-container " + containerClass}
        onWheel={zoom ? zoomHandler : undefined}
        onMouseUp={pan && panning ? panEndHandler : undefined}
      >
        <div
          ref={chart}
          className={"orgchart " + chartClass}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
            cursor: cursor,
          }}
          onClick={clickChartHandler}
          onMouseDown={pan ? panStartHandler : undefined}
        >
          <ul>
            {!!dsWithAttachedRel && dsWithAttachedRel.length ? dsWithAttachedRel.map((_ds) => (
              <ChartNode
                datasource={_ds}
                NodeTemplate={NodeTemplate}
                draggable={draggable}
                collapsible={collapsible}
                multipleSelect={multipleSelect}
                changeHierarchy={changeHierarchy}
                onClickNode={onClickNode}
                onDropNode={onDropNode}
              />
            )) : (
              <ChartNode
                datasource={dsWithAttachedRel}
                NodeTemplate={NodeTemplate}
                draggable={draggable}
                collapsible={collapsible}
                multipleSelect={multipleSelect}
                changeHierarchy={changeHierarchy}
                onClickNode={onClickNode}
                onDropNode={onDropNode}
              />
            )}
          </ul>
        </div>
        <a
          className="oc-download-btn hidden"
          ref={downloadButton}
          href={dataURL}
          download={download}
        >
          &nbsp;
        </a>
        <div className={`oc-mask ${exporting ? "" : "hidden"}`}>
          <i className="oci oci-spinner spinner"></i>
        </div>
      </div>
    );
  }
);

ChartContainer.propTypes = propTypes;
ChartContainer.defaultProps = defaultProps;

export default ChartContainer;
