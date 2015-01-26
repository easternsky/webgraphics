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
	/*mapVerwaltungskarte();*/
	var width = 600, height = 600;
    
	var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "deutschland");
	
d3.json("map/vg2500_1_topo.json", function(error, prop) {
  if (error) return console.error(error);

	svg.append("path")
	.datum(topojson.mesh(prop, prop.objects.vg2500_krs, function(a, b) { return a !== b; }))
	.attr("d", path)
	.attr("class", "kreisgrenze");
	/*      
	svg.append("path")
  	.data(vg2500_krs.features))
  	.attr("d", d3.geo.path().projection(d3.geo.mercator()));
  */
  svg.selectAll(".kreis")
	      .data(vg2500_krs.features)
	    .enter().append("path")
	      .attr("class", function(d) { return "kreis " + d.id; })
	      .attr("d", path);
});
</script>
</body>