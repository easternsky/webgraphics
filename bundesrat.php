<?php header("Content-Type: text/html; charset=utf-8");?>
<!DOCTYPE html>
<html class="no-js" lang="">
	<meta charset="utf-8">
	<title>Sitzverteilung Parlament</title>
	<script type="text/javascript" charset="utf-8" src="http://d3js.org/d3.v3.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/bundesrat.js"></script>
	<link rel="stylesheet" href="css/bundesrat.css">
	<body>
		<?php 
			echo '<h2 class="title">' . $title = "Titel" . '</h2>'; 
			echo '<h4 class="subtitle">' . $subtitle = "Hier steht eine Unterzeile" . '</h4>'; 
		?>

		<script charset="utf-8" type="text/javascript">
			bundesrat();
		</script>	
	</body>
</html>
<body>

