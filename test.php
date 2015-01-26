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
var daten = [1,2,3,4,5,6,7,8,9,10];
var xScale = d3.scale.linear().
  domain([0, daten.length]). // your data minimum and maximum
  range([0, 100]); // the pixels to map to, e.g., the width of the diagram.
  
  attr("x", xScale)
</script>
</body>