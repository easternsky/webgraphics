<!DOCTYPE html>
<html class="no-js" lang="">
	<head>
	<meta charset="utf-8">
	<title>Balken animiert</title>
	<link rel="stylesheet" type="text/css" href="css/webgraph.css">
	</head>
	<body>
		<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
		<script type="text/javascript" src="js/webgraph.js"></script>

		<?php
			echo '<h2 class="title">' . $title = "Titel" . '</h2>';
			echo '<h4 class="subtitle">' . $subtitle = "Hier steht eine Unterzeile" . '</h4>';
		?>
			<div class="svg-container">
				<svg class="chart" viewBox="0 0 600 400" width="600" height="400" preserveAspectRatio="xMinYMin meet">
					Webgrafik
				</svg>
			</div>
		<script type="text/javascript">
			barAnimated();
		</script>
	</body>
</html>