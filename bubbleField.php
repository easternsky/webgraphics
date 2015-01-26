<!DOCTYPE html>
<html class="no-js" lang="">
	<meta charset="utf-8">
	<title>Bubble Feld</title>
	<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
	<script type="text/javascript" src="js/webgraph.js"></script>
	<link rel="stylesheet" href="css/webgraph.css">
	<body>
		<?php 
			echo '<h2 class="title">' . $title = "Titel" . '</h2>'; 
			echo '<h4 class="subtitle">' . $subtitle = "Hier steht eine Unterzeile" . '</h4>'; 
		?>
		<svg class="chart" width="800" height="500">
			Webgrafik
		</svg>
		<script type="text/javascript">
			bubbleField();
		</script>
	</body>
</html>