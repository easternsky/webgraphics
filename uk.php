<!DOCTYPE html>
<html class="no-js" lang="">
<head>
	<meta charset="utf-8">
	<title>Map</title>
	<script type="text/javascript" src="js/d3.min.js"></script>
	<script type="text/javascript" src="js/topojson.js"></script>
	<!--<script src="js/jquery-2.1.1.min.js"></script>
	<script src="http://d3js.org/topojson.v1.min.js"></script>
	<!--<script type="text/javascript" src="js/webgraph.js"></script
	<!--<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
    <script src="js/kartograph.min.js"></script>-->
       
	<!--<link rel="stylesheet" href="css/webgraph.css">-->

	<!--<script type="text/javascript" src="js/jquery.csv-0.71.min.js"></script>-->
<style>

.subunit.SCT { fill: #ddc; }
.subunit.WLS { fill: #cdd; }
.subunit.NIR { fill: #cdc; }
.subunit.ENG { fill: #dcd; }

.subunit.IRL,
.subunit-label.IRL {
  display: none;
}

.subunit-boundary {
  fill: none;
  stroke: #777;
  stroke-dasharray: 2,2;
  stroke-linejoin: round;
}

.subunit-boundary.IRL {
  stroke: #aaa;
}

.subunit-label {
  fill: #777;
  fill-opacity: .5;
  font-size: 20px;
  font-weight: 300;
  text-anchor: middle;
}

.place,
.place-label {
  fill: #444;
}

text {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10px;
  pointer-events: none;
}

</style>
<body>
	<?php 
		echo '<h2 class="title">' . $title = "Titel" . '</h2>'; 
		echo '<h4 class="subtitle">' . $subtitle = "Hier steht eine Unterzeile" . '</h4>'; 
	?>
	<!--<object data="svg/wahlkreise.svg" type="image/svg+xml" width="800" height="500"></object>-->
	<!--<div id="map"></div>-->
	<svg>Webgrafik</svg>
	<script>
var width = 960,
    height = 1160;

var projection = d3.geo.albers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(1200 * 5)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("map/uk.json", function(error, uk) {
  var subunits = topojson.feature(uk, uk.objects.subunits),
      places = topojson.feature(uk, uk.objects.places);

  svg.selectAll(".subunit")
      .data(subunits.features)
    .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary");

  svg.append("path")
      .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
      .attr("d", path)
      .attr("class", "subunit-boundary IRL");

  svg.selectAll(".subunit-label")
      .data(subunits.features)
    .enter().append("text")
      .attr("class", function(d) { return "subunit-label " + d.id; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.name; });

  svg.append("path")
      .datum(places)
      .attr("d", path)
      .attr("class", "place");

  svg.selectAll(".place-label")
      .data(places.features)
    .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
      .attr("dy", ".35em")
      .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
      .text(function(d) { return d.properties.name; });
});
/*
		var width = 960,
		    height = 1160;
		
		var projection = d3.geo.albers()
		    .center([0, 55.4])
		    .rotate([4.4, 0])
		    .parallels([50, 60])
		    .scale(12 * 5)
		    .translate([width / 2, height / 2]);
		
		var path = d3.geo.path()
		    .projection(projection);
		
		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height);

		d3.json("map/wahlkreise_topo.json", function(error, wk) {
		  svg.append("path")
		      .datum(topojson.feature(wk, wk.objects))
		      .attr("d", path);
});
	*/
</script>
</body>