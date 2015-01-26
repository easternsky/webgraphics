<!DOCTYPE html>
<html class="no-js" lang="">
	<meta charset="utf-8">
	<title>Tortendiagramm</title>
	<style>
		.chart rect {
			fill: steelblue;
		}
		
		.chart text {
			fill: grey;
			font: 18px sans-serif;
			font-weight: bold;
		/*text-anchor: middle;*/
		}
		
		.chart rect:hover {
		  fill: brown;
		}
		
		.chart text.textInside {
			fill: white;
		}
	</style>
	<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
	<body>

		<svg class="chart" width="800" height="500">
			Webgrafik
		</svg>

		<script type="text/javascript">

		var margin = { top : 30, right : 30, bottom : 0, left : 40}, 
			width = 600 - margin.left - margin.right - 100,
			height = 360;
				
        var circleWidth = 360;
        var circleHeight = 360;
        var radius = Math.min(circleWidth, circleHeight) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var color = d3.scale.category20b();

        var svg = d3.select('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g');
          //.attr('transform', 'translate(' + (width / 2) + 
           // ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return d.value; })
          .sort(null);

        d3.csv('data.csv', function(error, dataset) {           // NEW
          dataset.forEach(function(d) {                             // NEW
            d.value = +d.value;                                     // NEW
          });                                                       // NEW

          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
              return color(d.data.key);
            });
          
          //Labels
			var labels = svg.selectAll("text")
				.data(pie(dataset))
            	.enter()
            	.append('text')
            	.attr("class", "textInside")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			    .text(function(d) {
			    	return d.value;
			   	});
			   	
          var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var legendHeight = legendRectSize + legendSpacing;
              var offset =  legendHeight * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * legendHeight - offset;
              return 'translate(' + (horz + radius + 100) + ',' + vert + ')';
            });

          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);
            
          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });                       

        });                                                         // NEW

/*      
			//Width and height
			var margin = { top : 30, right : 30, bottom : 0, left : 40}, 
				width = 960 - margin.left - margin.right - 100,
				height = 500;


			var outerRadius = (height - 100) / 2;
			var innerRadius = 100;
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);
			var legendRectSize = 18;
        	var legendSpacing = 4;
			//Easy colors accessible via a 10-step ordinal scale
			var color = d3.scale.category10();

			//Create SVG element
			var svg = d3.select("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			d3.tsv("http://web.local/graphics/data.tsv", type, function(error, dataset) {
			
			var pie = d3.layout.pie()
  				.value(function(d) { return d.value; })
  				.sort(null);
  					
			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(dataset))
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
			
			//Draw arc paths
			/*arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc);*/
			
	/*		var path = svg.selectAll('path')
	            .data(pie(data))
	            .enter()
	            .append('path')
	            .attr('d', arc)
	            .attr('fill', function(d, i) { 
	              return color(d.data.name);
            });
            
			//Labels
			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			    .text(function(d) {
			    	return d.value;
			   	});
			 
			  var legend = svg.selectAll('.legend')
	            .data(color.domain())
	            .enter()
	            .append('g')
	            .attr('class', 'legend')
	            .attr('transform', function(d, i) {
	              var legendHeight = legendRectSize + legendSpacing;
              var offset =  legendHeight * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * legendHeight - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });
            
             legend.append('rect')
	            .attr('width', legendRectSize)
	            .attr('height', legendRectSize)
	            .style('fill', color)
	            .style('stroke', color);
	            
	          legend.append('text')
	            .attr('x', legendRectSize + legendSpacing)
	            .attr('y', legendRectSize - legendSpacing)
	            .text(function(d) { return d; });     
	            
			});
			 
			function type(d) {
			  d.value = +d.value;
			  return d;
			}*/
		</script>

	</body>
</html>