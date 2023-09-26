import React, { useEffect } from "react";
import edgehandles from "cytoscape-edgehandles";
import cytoscape from "cytoscape";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

cytoscape.use(edgehandles);
const Cytoscape = () => {
  useEffect(() => {
    const cs = cytoscape(
      {
        container: document.getElementById("cs"),
        // userPanningEnabled: false, //useTo stop move
        userZoomingEnabled: false,
        layout: {
          name: "random", // Use preset layout for manual positioning
        },
        elements: {
          nodes: [
            { data: { id: "a", name: "Dilshad" } },
            { data: { id: "b" } },
            { data: { id: "c" } },
            { data: { id: "d" } },
            { data: { id: "e" } },
            { data: { id: "f" } },
            { data: { id: "g" } },
            { data: { id: "h" } },
            { data: { id: "l" } },
            { data: { id: "Z" } },
            { data: { id: "M" } },
          ],
          edges: [
            { data: { source: "a", target: "e" } },
            { data: { source: "b", target: "f" } },
            { data: { source: "c", target: "g" } },
            { data: { source: "d", target: "h" } },
            { data: { source: "e", target: "l" } },
            { data: { source: "h", target: "Z" } },
            { data: { source: "a", target: "M" } },
          ],
        },

        style: [
          {
            selector: "node", // Apply these styles to all nodes
            style: {
              width: 50, // Set width of nodes
              height: 50, // Set height of nodes
              //   label: "data(name)", // Show the node id as label
              label: "data(id)",
            },
          },
        ],
      },
      []
    );

    // forDrow
    var eh = cs.edgehandles();

    cs.edges().on("click", function (e) {
      var ele = e.target;
      const setPostionOfCircle = document.querySelector("#remveEdge");
      setPostionOfCircle.style.display = "block";
      const bbCache = ele.boundingBox();
      const x = (bbCache.x1 + bbCache.x2) / 2;
      const y = (bbCache.y1 + bbCache.y2) / 2;

      // Set position of the circle
      setPostionOfCircle.style.left = x + "px";
      setPostionOfCircle.style.top = y + "px";
      setPostionOfCircle.style.color = "blue";

      console.log("clicked " + ele.id(), ele);
    });

    document.querySelector("#draw-on").addEventListener("click", () => {
      eh.enableDrawMode();
    });

    // for removing edge and node both

    // document.querySelector("#remove-edge").addEventListener("click", () => {
    //   eh.disableDrawMode();
    //   const selectedNode = cs.$(":selected");
    //   if (selectedNode.nonempty()) {
    //     selectedNode.remove();
    //   }
    // });

    //for removing only edge
    document.querySelector("#remove-edge").addEventListener("click", () => {
      if (eh.enableDrawMode) {
        eh.disableDrawMode();
      }
      cs.edges(":selected").remove();
    });

    // ==> remove edge on icon click;
    document.querySelector("#remveEdge").addEventListener("click", () => {
      cs.edges(":selected").remove();
      document.querySelector("#remveEdge").style.display = "none";
    });

    cs.nodes().positions(function (ele, i) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      return { x: col * 100, y: row * 100 };
    });
  });

  return (
    <>
      <div
        id="cs"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          zIndex: 999,
          border: "2px solid red",
        }}
      >
        {" "}
      </div>

      <FontAwesomeIcon
        icon={faCircleXmark}
        style={{
          fontSize: "25px",
          color: "red",
          position: "absolute",
          zIndex: 9999,
          display:"none"
        }}
        id="remveEdge"
      />

      <div
        id="buttons"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 99999,
          margin: "1em",

        }}
      >
        <button style={{ margin: "10px" }} id="draw-on">
          Add edges{" "}
        </button>
        <button id="remove-edge">remove edges</button>
      </div>
    </>
  );
};

export default Cytoscape;
