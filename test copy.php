<!DOCTYPE html>
<html class="no-js" lang="">
<head>
	<meta charset="utf-8">
	<title>Map</title>
	<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="http://d3js.org/topojson.v1.min.js"></script>
	<script type="text/javascript" src="js/webgraph.js"></script>
	<!--<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js"></script>
    <script src="js/kartograph.min.js"></script>-->
       
	<!--<link rel="stylesheet" href="css/webgraph.css">-->

	<script type="text/javascript" src="js/jquery.csv-0.71.min.js"></script>

<body>
		<?php 
			echo '<h2 class="title">' . $title = "Titel" . '</h2>'; 
			echo '<h4 class="subtitle">' . $subtitle = "Hier steht eine Unterzeile" . '</h4>'; 
		?>
		<!--<object data="svg/wahlkreise.svg" type="image/svg+xml" width="800" height="500"></object>-->
		<!--<div id="map"></div>-->
		<script>
		var width = 960,
		    height = 1160;
		
		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height);
		
		d3.json("map/wahlkreise.json", function(error, uk) {
		  if (error) return console.error(error);
		
		  svg.append("path")
		      .datum(topojson.feature(uk, uk.objects.subunits))
		      .attr("d", d3.geo.path().projection(d3.geo.mercator()));
		});	
		/*var map = $K.map('#map', 700, 400);
		
		map.loadCSS('css/map.css', function() {
	    	map.loadMap('map/wahlkreise.svg', function() {
			    // do something with your map, add layers etc.
				map.addLayer('layer');
			});
    	});
    	*/
    	
/*
$(function() {
    var map, updateMap, symbols,
        mc = $('#map');

    map = kartograph.map('#map');

    map.loadCSS('css/map.css', function() {

        map.loadMap('map/wahlkreise.svg', function() {
            map.addLayer('context');
 */           /*map.addLayer('spain', { key: 'nuts', title: function(d) {
                return d.nuts
            } });*/

  /*          $.get('unemployment-es.csv', function(data) {
                data = $.parseCSV(data);

                updateMap = function() {
                    var scale,
                        prop = $('.gender.btn-primary').data('val')+'-'+$('.age.btn-primary').data('val'),
                        type = $('.chart.btn-primary').data('val');

                    scale = kartograph.scale.linear(data.rows, 'AREA');

                    if (symbols) symbols.remove();

                    symbols = map.addSymbols({
                        data: data.rows,
                        type: kartograph[type],
                        colors: ['#1f68b4', '#aaceff'],
                        border: '#fff',
                        values: function(d) { return [d[prop],100-d[prop]] },
                        location: function(d) { return 'spain.'+d.GEO; },
                        radius: function(d) { return Math.max(8, Math.sqrt(scale(d.AREA))*35) }
                    });

                };

                updateMap();
            });
        });
    });

    $('.btn').click(function(event) {
        var tgt = $(event.target), par = tgt.parent();
        $('.btn', par).removeClass('btn-primary');
        tgt.addClass('btn-primary');
        updateMap();
    });
});
</script>

<!--<div class="map-container">
    <div id="map-overlay"></div>
    <div id="map" style="height:500px;margin-bottom:20px"></div>
</div>
<div class="row">
    <div class="span4 content">
        <p>
        One disadvantage of choropleth maps is that you always need to look at the legend in order to read the actual numbers. While this is inevitable for absolute quantities, there are more effective ways for visualizing percentages.
        </p>
        <p>
        This map shows how unemployment rates in Spain.
        </p>
    </div>
    <div class="span3" style="position:relative">

        <div >
            <label style="width:80px;vertical-align:text-bottom;display:inline-block">Gender: </label>
            <div class="btn-group" style="display:inline-block">
                <button class="gender btn btn-primary" data-val="T">Total</button>
                <button class="gender btn" data-val="M">Male</button>
                <button class="gender btn" data-val="F">Female</button>
            </div>
        </div>
        <div >
            <label style="width:80px;vertical-align:text-bottom;display:inline-block">Age:</label>
            <div class="btn-group" style="display:inline-block">
                <button class="age btn btn-primary" data-val="Y15-24">15-24</button>
                <button class="age btn" data-val="Y-GE25">25+</button>
            </div>
        </div>
        <div>
            <label style="width:80px;vertical-align:text-bottom;display:inline-block">Chart: </label>
            <div class="btn-group" style="display:inline-block">
                <button class="chart btn btn-primary" data-val="PieChart">Pie</button>
                <button class="chart btn" data-val="StackedBarChart">Bar</button>
            </div>
        </div>
    </div>
<div></div>-->


</body>