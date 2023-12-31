import React, { useEffect, useState } from "react";
import edgehandles from "cytoscape-edgehandles";
import cytoscape from "cytoscape";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

cytoscape.use(edgehandles);
const Cytoscape = () => {
  const [nodes, setNodes] = useState([
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
  ]);

  const [edges, setEdge] = useState([
    { data: { source: "a", target: "e" } },
    { data: { source: "b", target: "f" } },
    { data: { source: "c", target: "g" } },
    { data: { source: "d", target: "h" } },
    { data: { source: "e", target: "l" } },
    { data: { source: "h", target: "Z" } },
    { data: { source: "a", target: "M" } },
  ]);

  useEffect(() => {
    const cs = cytoscape(
      {
        container: document.getElementById("cs"),
        // userPanningEnabled: false, //useTo stop move
        userZoomingEnabled: false,
        layout: {
          name: "grid", // Use preset layout for manual positioning
        },
        elements: {
          nodes: nodes,
          edges: edges,
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

          {
            selector: "edge",
            style: {
              "curve-style": "straight", // select style
              "target-arrow-shape": "triangle", // arrow
            },
          },

          {
            selector: ".eh-preview, .eh-ghost-edge",
            style: {
              "background-color": "red",
              "line-color": "red",
              "target-arrow-color": "red",
              "source-arrow-color": "red",
            },
          },

          {
            selector: ".eh-ghost-edge.eh-preview-active",
            style: {
              opacity: 0,
            },
          },
        ],
      },
      [nodes, edges]
    );

  // start :) 

    var eh = cs.edgehandles({
      snap: false, //for not auto connect
    });

  //on edge line click ---> 
    cs.edges().on("click",(e)=> {
      var ele = e.target;
      const setPositionOfCircle = document.querySelector("#remveEdge");
      setPositionOfCircle.style.display = "block";
      const bbCache = ele.boundingBox();
      const x = (bbCache.x1 + bbCache.x2) / 2;
      const y = (bbCache.y1 + bbCache.y2) / 2;

      // Set position of the circle
      setPositionOfCircle.style.left = x + "px";
      setPositionOfCircle.style.top = y + "px";
      setPositionOfCircle.style.color = "blue";
      console.log("clicked " + ele.id(), ele);
    });

    // ==> drow mood on button clikc 
    document.querySelector("#draw-on").addEventListener("click", () => {
      eh.enableDrawMode();
    });

    // == update state on add
    // cs.edges = for multi add at one time
    cs.on("ehcomplete", (event, sourceNode, targetNode, addedEles) => {
      const newEdge = {data: { source: sourceNode?.id(), target: targetNode?.id() }};
      setEdge((prevEdge) => [...prevEdge, newEdge]);
    });

    // ==> remove edge on icon click;
    document.querySelector("#remveEdge").addEventListener("click", () => {
      const selectedEdge = cs.edges(":selected").data();
      cs.edges(":selected").remove();
      setEdge((prev) => prev.filter((ed) => ed?.data?.id !== selectedEdge?.id));
      document.querySelector("#remveEdge").style.display = "none";
    });

    // cs.nodes().positions(function (ele, i) {
    //   const col = i % 4;
    //   const row = Math.floor(i / 4);
    //   return { x: col * 100, y: row * 100 };
    // });

  }, [edges, nodes]);

  useEffect(() => {
    console.log({ edges });
  }, [edges, nodes]);

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
      ></div>

      <FontAwesomeIcon
        icon={faCircleXmark}
        style={{
          fontSize: "25px",
          color: "red",
          position: "absolute",
          zIndex: 9999,
          display: "none",
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
      </div>
    </>
  );
};

export default Cytoscape;
