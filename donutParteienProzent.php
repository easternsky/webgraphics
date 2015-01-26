<?php header("Content-Type: text/html; charset=utf-8");?>
<!DOCTYPE html>
<html class="no-js" lang="">
	<meta charset="utf-8">
	<title>Sitzverteilung Parlament</title>
	<script type="text/javascript" charset="utf-8" src="http://d3js.org/d3.v3.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/webgraph.js"></script>
	<link rel="stylesheet" href="css/webgraph.css">
	<body>
		<?php 
			echo '<h2 class="title">' . $title = "Titel" . '</h2>'; 
			echo '<h4 class="subtitle">' . $subtitle = "Hier steht eine Unterzeile" . '</h4>'; 
		?>
		<svg class="chart" width="800" height="500">
			Webgrafik
		</svg>
		<script charset="utf-8" type="text/javascript">
			donutParliament();
		</script>	
	</body>
</html>
<body>

