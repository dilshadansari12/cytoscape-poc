import React, { useEffect, useState } from "react";
import edgehandles from "cytoscape-edgehandles";
import cytoscape from "cytoscape";

cytoscape.use(edgehandles);
const Cytoscape = () => {
  useEffect(() => {
    const cs = cytoscape(
      {
        container: document.getElementById("cs"),
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

    cs.nodes().positions(function (ele, i) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      return { x: col * 100, y: row * 100 };
    });
  });

  return (
    <div>
      <h1>cytoscape-demo</h1>
      <div
        id="cs"
        style={{
          position: "absolute",
          left: "40%",
          top: "20%",
          bottom: 0,
          right: 0,
          zIndex: 999,
          border:"2px solid red"
        }}
      >
        {" "}
      </div>

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
    </div>
  );
};

export default Cytoscape;
