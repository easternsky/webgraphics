/**
 * @author Thorsten Eberding
 */
//var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Definition aller Basisvariablen und -bestandteile
function basic() {

	//Entferne ggf. vorherige Grafik
	d3.select("g.parent").selectAll("*").remove();

	//Variablen, via php zu befüllen
	title = "Titel";
	subtitle = "Unterzeile";
	xKey = [];
	yValue = [];

	//Margin, width and
	margin = {
		top : 30,
		right : 10,
		bottom : 10,
		left : 20
	};
	width = 600 - margin.left - margin.right;
	height = 400 - margin.top - margin.bottom;
	radius = Math.min(width * 0.9, height * 0.9) / 2;

	pi = Math.PI, 
	arc = d3.svg.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4),
	outerArc = d3.svg.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

	barPadding = 1;
	dataRange = [];
	//Create SVG element
	svg = d3.select("svg.chart").attr("width", width + margin.left + margin.right).attr("height", height + 50).attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	datafile2 = "data/data2.csv";
	dataParteienProzent = "data/parteienProzent.csv";
	dataParteienOrder = "data/parteienReihenfolge.csv";
	
	div = d3.select("body").append("div")   
    .attr("class", "tool_tip")               
    .style("opacity", 0);
}

	
function type(d) {
	d.value = +d.value;
	return d;
}

/*
 function showProps(obj, objName) {
 result = "";
 for (var i in obj) {
 if (obj.hasOwnProperty(i)) {
 result += objName + "." + i + " = " + obj[i] + "\n";
 }
 }
 //return result;
 }
 */

function barAnimated() {
	basic();
	x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	y = d3.scale.linear().range([height, 0]);
	d3.csv(datafile2, type, function(error, data) {
		//headers = d3.keys(data[0]);
		x.domain(data.map(function(data) {
			return data.key;
		}));
		y.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);

		svg.selectAll("rect").data(data).enter().append("rect").attr("x", function(d) {
			return x(d.key);
		}).attr("width", x.rangeBand())
		.on("click", mouseClick)
		.on("mouseover", function(d) {
			var tool_tip =  (d.value * 100).toFixed(4).replace(".", ",");
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div.html(tool_tip)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        })

		// Transition
		.attr("y", function(d) {
			return y(d.value) + height + margin.top;
		}).attr("height", 0).transition().delay(function(d, i) {
			return i * 50;
		}).duration(2000).attr("y", function(d) {
			return y(d.value);
		}).attr("height", function(d) {
			return height - y(d.value) + margin.top;
		});

		svg.selectAll("text").data(data).enter().append("text").text(function(d) {
			return (d.value * 100).toFixed(1).replace(".", ",");
		}).attr().attr("x", function(d) {
			return x(d.key) + 2;
		})
		// Transition
		.attr("y", function(d) {
			return y(d.value) + height;
		}).transition().delay(function(d, i) {
			return i * 50;
		}).duration(2000).attr("y", function(d) {
			return y(d.value) - 10;
		});
	});

};

function mouseClick() {
	d3.selectAll("rect").classed( "active", false);
	//console.log("mouseClick");
    return d3.select(this).attr("class", "active");   
}

function barHorizontal() {
	basic();
	x = d3.scale.linear().range([0, width]);
	y = d3.scale.ordinal().rangeRoundBands([0, height], .2);
	xAxis = d3.svg.axis().scale(x).orient("top");

	svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv(datafile2, type, function(error, data) {
		x.domain(d3.extent(data, function(d) {
			return d.value;
		})).nice();
		y.domain(data.map(function(d) {
			return d.key;
		}));

		svg.selectAll(".bar").data(data).enter().append("rect").attr("class", function(d) {
			return d.value < 0 ? "bar negative" : "bar positive";
		}).attr("x", function(d) {
			return x(Math.min(0, d.value));
		}).attr("y", function(d) {
			return y(d.key);
		}).attr("width", function(d) {
			return Math.abs(x(d.value) - x(0));
		}).attr("height", y.rangeBand());

		svg.append("g").attr("class", "x axis").call(xAxis);

		svg.append("g").attr("class", "y axis").append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y2", height);

	});

};

function barAxis() {
	basic();
	x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	y = d3.scale.linear().range([height - 20, 0]);
	xAxis = d3.svg.axis().scale(x).orient("bottom");
	yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");

	d3.csv(datafile2, type, function(error, data) {
		x.domain(data.map(function(d) {
			return d.key;
		}));
		y.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);
		d3.selectAll("svg").attr("transform", "translate(" + 30 + ", 0 )"); 
		

		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

		svg.append("g").attr("class", "y axis").attr("transform", "translate(0," + (margin.top - 10) + ")").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 0).attr("dy", ".71em").style("text-anchor", "end").text("in Prozent");

		svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
			return x(d.key);
		}).attr("width", x.rangeBand()).attr("y", function(d) {
			return y(d.value);
		}).attr("height", function(d) {
			return height - y(d.value);
		});

	});
};

function barStatic() {
	basic();
	x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	y = d3.scale.linear().range([height, 0]);
	xAxis = d3.svg.axis().scale(x).orient("bottom");
	yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");

	d3.csv(datafile2, type, function(error, data) {
		x.domain(data.map(function(d) {
			return d.key;
		}));
		y.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);

		svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
			return x(d.key);
		}).attr("width", x.rangeBand()).attr("y", function(d) {
			return y(d.value);
		}).attr("height", function(d) {
			return height - y(d.value);
		});

	});
};

function bubbleGraph() {

	basic();
	height = height + margin.top + margin.bottom;
	width = width + margin.left + margin.right;
	yKorr = 50;
	// schiebt Grafik etwas nach oben, ggf. ändern
	var r = height, format = d3.format(",d"), fill = d3.scale.category20c();

	var bubble = d3.layout.pack().sort(null).size([r, r]);

	var vis = d3.select(".chart").attr("width", width).attr("height", r).attr("class", "bubble");

	d3.json("data/flare.json", function(json) {
		var node = vis.selectAll("g.node").data(bubble.nodes(classes(json)).filter(function(d) {
			return !d.children;
		})).enter().append("svg:g").attr("class", "node").attr("transform", function(d) {
			return "translate(" + d.x + "," + (d.y - yKorr) + ")";
		});

		node.append("svg:title").text(function(d) {
			return d.className + ": " + format(d.value);
		});

		node.append("svg:circle").attr("r", function(d) {
			return d.r;
		}).style("fill", function(d) {
			return fill(d.packageName);
		});

		node.append("svg:text").attr("text-anchor", "middle").attr("dy", ".3em").text(function(d) {
			return d.className.substring(0, d.r / 3);
		});
	});

	// Returns a flattened hierarchy containing all leaf nodes under the root.
	function classes(root) {
		var classes = [];

		function recurse(name, node) {
			if (node.children)
				node.children.forEach(function(child) {
					recurse(node.name, child);
				});
			else
				classes.push({
					packageName : name,
					className : node.name,
					value : node.size
				});
		}

		recurse(null, root);
		return {
			children : classes
		};
	}

}

function bubbleField() {
	basic();
	x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
	y = d3.scale.linear().range([height, 0]);
	xAxis = d3.svg.axis().scale(x).orient("bottom");
	//yAxis = d3.svg.axis().scale(y).orient("left").ticks(10, "%");

	r = d3.scale.linear().range([2, 30]);

	formatxAxis = d3.format(",%");
	formatAsPercentage = d3.format(".1%");

	yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(formatAsPercentage);

	d3.csv(datafile2, type, function(error, data) {
		//Create scale functions
		x.domain(data.map(function(d) {
			return d.key;
		}));
		y.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);
		r.domain([0, d3.max(data, function(d) {
			return d.value;
		})]);

		svg.selectAll("circle").data(data).enter().append("circle").attr("cx", function(d) {
			return x(d.key);
		}).attr("cy", function(d) {
			return y(d.value);
		}).attr("r", function(d) {
			return r(d.value);
		});

		svg.selectAll("text").data(data).enter().append("text").text(function(d) {
			return (d.key + ": " + (d.value * 100).toFixed(1)).replace(".", ",");
		}).attr("x", function(d) {
			return x(d.key);
		}).attr("y", function(d) {
			return y(d.value) - r(d.value) - 5;
		});

		svg.append("g").attr("class", "axis").attr("transform", "translate(0," + (height - margin.top) + ")").call(xAxis);

		svg.append("g").attr("class", "axis").attr("transform", "translate(" + margin.left + ",0)")
		/*.tickValues.replace(".",",")*/.call(yAxis);

	});
}

function donutAnimated() {
	basic();
	svg.attr("class", "chart donut").append("g").attr("class", "slices");
	svg.append("g").attr("class", "labels");
	svg.append("g").attr("class", "lines");

	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	});

	svg.attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

	var key = function(d) {
		return d.data.label;
	};

	var color = d3.scale.ordinal().domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"]).range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	function randomData() {
		var labels = color.domain();
		return labels.map(function(label) {
			return {
				label : label,
				value : Math.random()
			}
		});
	}

	change(randomData());

	d3.select(".randomize").on("click", function() {
		change(randomData());
	});

	function change(data) {

		/* ------- PIE SLICES -------*/
		var slice = svg.select(".slices").selectAll("path.slice").data(pie(data), key);

		slice.enter().insert("path").style("fill", function(d) {
			return color(d.data.label);
		}).attr("class", "slice");

		slice.transition().duration(1000).attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

		slice.exit().remove();

		/* ------- TEXT LABELS -------*/

		var text = svg.select(".labels").selectAll("text").data(pie(data), key);

		text.enter().append("text").attr("dy", ".35em").text(function(d) {
			return d.data.label;
		});

		function midAngle(d) {
			return d.startAngle + (d.endAngle - d.startAngle) / 2;
		}


		text.transition().duration(1000).attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate(" + pos + ")";
			};
		}).styleTween("text-anchor", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start" : "end";
			};
		});

		text.exit().remove();

		/* ------- SLICE TO TEXT POLYLINES -------*/

		var polyline = svg.select(".lines").selectAll("polyline").data(pie(data), key);

		polyline.enter().append("polyline");

		polyline.transition().duration(1000).attrTween("points", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};
		});

		polyline.exit().remove();
	};
}

/*
function parteienReihenfolge() {
	d3.csv(dataParteienOrder, type, function(error, data) {
    	data.forEach(function(d,i) {
        	dataRange = data[i];
        	
//        vis = svg.data([data]).attr("width", width).attr("height", height).append("svg:g").attr("transform", "translate(" + radius + "," + radius + ")");
		  vis = svg.data([data]).attr("width", width).attr("height", height).append("svg:g").attr("transform", "translate(" + radius + "," + radius + ")").attr("class", "partei " + dataRange.value);
		
		
		//console.log(dataRange);
			//return vis;
   		 });
	});
}*/
	
function donutParliament() {
	basic();
	//color = ["purple", "red", "green", "orange", "yellow", "black", "blue"]; 
    //color = [["Linke", "purple"],["SPD", "red"],["Grüne", "green"],["Piraten", "orange"],["FDP", "yellow"],["CDU", "black"],["AfD", "blue"]]; 
    //color = {type:"Fiat", model:500, color:"white"};
    color = {
        Linke: "#FA58AC",
    		SPD:"red",
    		Grüne:"#5FB404",
    		Piraten:"orange",
    		FDP:"yellow",
    		CDU:"black",
    		AfD:"#01A9DB"
    	}; 
	pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	}).startAngle(-90 * (pi / 180)).endAngle(90 * (pi / 180));
	
	d3.csv(dataParteienProzent, type, function(error, data) {

		data = data.filter(function(d){ return d.value > 4.9; });
				
		// sort the data
		data.sort(function(a, b) {
			if(a.index === b.index) { 
	            return b.key - a.key; 
        	}
    	   	return a.index - b.index; 
		});

		// Transition
					
		vis = svg.data([data]).attr("width", width).attr("height", height).append("svg:g").attr("transform", "translate(" + radius + "," + radius + ")");		
		arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice partei");//.color(d3.scale.partyColor().range());
//		console.log(data);

		arcs.append("svg:path")
		.attr("fill", function(d, i) {
			if (data[i].key) {
				j = data[i].key;
	//			console.log(j);
				return color[j]; //color[i];
			}
		}).attr("d", arc).attr("class", "pie");

	arcs.append("svg:text").attr("class", "inside").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		}).attr("text-anchor", "middle").text(function(d, i) {
			return data[i].key;
		});
		arcs.append("svg:text").attr("class", "inside").attr("transform", function(d) {
			return "translate(" + arc.centroid(d) + ")";
		})
		.attr("text-anchor", "middle")
		.attr("y", 12)
		.text(function(d, i) {
			return data[i].value;
		});
	});

}

/*
function donutParliament() {
	basic();
	//var w = 300, //width
	//h = 300, //height
	//r = 100, //radius
	//ir = 50, 
	pi = Math.PI, color = d3.scale.category20c();

	data = [{
		"label" : "Linke",
		"value" : 8
	}, {
		"label" : "SPD",
		"value" : 30
	}, {
		"label" : "Grüne",
		"value" : 10
	}, {
		"label" : "CDU",
		"value" : 40
	}, {
		"label" : "AfD",
		"value" : 7
	}];
	


	
	var pie = d3.layout.pie().sort(null).value(function(d) {
		return d.value;
	}).startAngle(-90 * (pi / 180)).endAngle(90 * (pi / 180));

	//d3.csv(dataParteienProzent, type, function(error, data) {
	var vis = d3.select("svg").data([data]).attr("width", width).attr("height", height).append("svg:g").attr("transform", "translate(" + radius + "," + radius + ")");
	
	var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

	arcs.append("svg:path").attr("fill", function(d, i) {
		return color(i);
	}).attr("d", arc);

	arcs.append("svg:text").attr("class", "inside").attr("transform", function(d) {
		return "translate(" + arc.centroid(d) + ")";
	}).attr("text-anchor", "middle").text(function(d, i) {
		return data[i].label;
	});
	arcs.append("svg:text").attr("class", "inside").attr("transform", function(d) {
		return "translate(" + arc.centroid(d) + ")";
	})
	.attr("text-anchor", "middle")
	.attr("y", 12)
	.text(function(d, i) {
		return data[i].value;
	});
	//}
}
 */

function mapBundestagswahl() {
	/*basic();	*/
	width = 600,
    height = 600;

    projection = d3.geo.albers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(3200)
    .translate([width / 2, height / 2]);

    path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);

	svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "deutschland");

	d3.json("map/wahlkreise5_topo.json", function(error, wk) {
	  var wahlkreise = topojson.feature(wk, wk.objects.wahlkreise)/*,
	      places = topojson.feature(wk, wk.objects.places)*/;
	
	  svg.selectAll(".wahlkreis")
	      .data(wahlkreise.features)
	    .enter().append("path")
	      .attr("class", function(d) { return "wahlkreis wk-" + d.id; })
	      .attr("d", path);
	
	 svg.append("path")
	      .datum(topojson.mesh(wk, wk.objects.wahlkreise, function(a, b) { return a !== b; }))
	      .attr("d", path)
	      .attr("class", "wahlkreis-boundary");
	
	 /* svg.append("path")
	      .datum(topojson.mesh(wk, wk.objects.wahlkreise, function(a, b) { return a === b && a.id === "IRL"; }))
	      .attr("d", path)
	      .attr("class", "wahlkreis-boundary IRL");
	*/
	  svg.selectAll(".wahlkreis-label")
	      .data(wahlkreise.features)
	  	  .enter().append("text")
	      .attr("class", function(d) { return "wahlkreis-label " + d.id; })
	      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
	      .attr("dy", ".35em")
	      .text(function(d) { return d.properties.WKR_NR; });
	
	/*  svg.append("path")
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
	      */
});
}