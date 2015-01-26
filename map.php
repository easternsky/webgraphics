<!DOCTYPE html>
<html class="no-js" lang="">
<head>
	<meta charset="utf-8">
	<title>Map</title>
	<script type="text/javascript" src="js/d3.min.js"></script>
	<script type="text/javascript" src="js/topojson.js"></script>
	<script type="text/javascript" src="js/webgraph.js"></script>
	<link rel="stylesheet" href="css/webgraph.css">
<body>
	<?php 
		echo '<h2 class="title">' . $title = "Titel" . '</h2>'; 
		echo '<h4 class="subtitle">' . $subtitle = "Hier steht eine Unterzeile" . '</h4>'; 
	?>
	<svg>Webgrafik</svg>
	
	<script>
	mapBundestagswahl();
	/*
var width = 800,
    height = 700;

var projection = d3.geo.albers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(3200)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "deutschland");

d3.json("map/wahlkreise5_topo.json", function(error, wk) {
  var wahlkreise = topojson.feature(wk, wk.objects.wahlkreise)
  /*, places = topojson.feature(wk, wk.objects.places)*/;
/*
  svg.selectAll(".wahlkreis")
      .data(wahlkreise.features)
    .enter().append("path")
      .attr("class", function(d) { return "wahlkreis wk-" + d.id; })
      .attr("d", path);

 svg.append("path")
      .datum(topojson.mesh(wk, wk.objects.wahlkreise, function(a, b) { return a !== b; }))
      .attr("d", path)
      .attr("class", "wahlkreis-boundary");

  svg.selectAll(".wahlkreis-label")
      .data(wahlkreise.features)
  	  .enter().append("text")
      .attr("class", function(d) { return "wahlkreis-label " + d.id; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.WKR_NR; });

});*/
</script>
</body>