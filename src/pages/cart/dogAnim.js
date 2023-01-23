import Zdog from "zdog";

console.log("DOG¿?");

const illo = new Zdog.Illustration({
  // set canvas with selector
  element: ".zdog-canvas",
});

// add circle
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  stroke: 20,
  color: "#636",
});

// update & render
illo.updateRenderGraph();
