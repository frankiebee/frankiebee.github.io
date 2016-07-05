$(document).ready(function(){
  pretyDrops()
})


pretyDrops = function(){
  var width = Math.max(960, innerWidth),
      height = Math.max(500, innerHeight);

  var i = 0;

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

  function particle() {
    svg.insert("circle", "rect")
        .attr("cx",Math.random() * width)
        .attr("cy", Math.random() * height)
        .attr("r", 1e-6)
        .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))

        .style("stroke-opacity", 1)
      .transition()
        .duration(3000)
        .ease(Math.sqrt)
        .attr("r", 700)
        .style("stroke-opacity", 1e-6)
        .remove();

    d3.event.preventDefault();
  }
}
