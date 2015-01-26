/**
 * @author Murkel
 */

function bundesrat() {
//Width and height
  var w = 800;
  var h = 500;
  
  var pi = Math.PI;
  var outerRadiusLabel = 275;
  var innerRadiusLabel = 250;
  var versatz1 = outerRadiusLabel-innerRadiusLabel;
  var arcLabel = d3.svg.arc()
          .innerRadius(innerRadiusLabel)
          .outerRadius(outerRadiusLabel);
  var outerRadius1 = 250;
  var innerRadius1 = 200;
  var versatz2 = outerRadiusLabel-innerRadius1;
  var arc1 = d3.svg.arc()
          .innerRadius(innerRadius1)
          .outerRadius(outerRadius1);
  var outerRadius2 = 200;
  var innerRadius2 = 175;
  var versatz3 = outerRadiusLabel-innerRadius2;
  var arc2 = d3.svg.arc()
          .innerRadius(innerRadius2)
          .outerRadius(outerRadius2);
  var outerRadius3 = 175;
  var innerRadius3 = 155;
  var versatz4 = outerRadiusLabel-innerRadius3;
  var arc3 = d3.svg.arc()
          .innerRadius(innerRadius3)
          .outerRadius(outerRadius3);
  
  var color = {
        Linke: "#FA58AC",
        SPD:"red",
        Grüne:"#5FB404",
        Piraten:"orange",
        FDP:"yellow",
        CDU:"black",
        AfD:"#01A9DB",
        CSU:"darkgray",
        SSW:"blue"
      }; 
  
  d3.csv("data/landesregierungen.csv", type, function(error, dataset) {

    var pie = d3.layout.pie().sort(null).value(function(d) {return d.Sitze;})
    .startAngle(-90 * (pi / 180)).endAngle(90 * (pi / 180));
    
    //Create SVG element
    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
     var arcs1 = svg
      .append("g")
      .attr("class", "arc1")
      .attr("transform", "translate(" + versatz1 + "," + versatz1 + ")");
      
    var arcs2 = svg
      .append("g")
      .attr("class", "arc2")
      .attr("transform", "translate(" + versatz2 + "," + versatz2 + ")");
      
    var arcs3 = svg
      .append("g")
      .attr("class", "arc3")
      .attr("transform", "translate(" + versatz3 + "," + versatz3 + ")");
    
    var arcsLabelSitz = svg
      .append("g")
      .attr("class", "arcLabelSitz");
      
    var arcsLabelLand = svg
      .append("g")
      .attr("class", "arcLabelLand");
    
    //Set up groups
    var regPar1 = svg.select(".arc1").selectAll(".regPar1")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "regPar1")
      .attr("transform", "translate(" + outerRadius1 + "," + outerRadius1 + ")");
    
    //Draw arc paths
    regPar1.append("path")
      .attr("fill", function(d, i) {
        return color[d.data.Regierungspartei1];
      })
      .attr("d", arc1);
    
    var regPar2 = svg.select(".arc2").selectAll(".regPar2")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "regPar2")
      .attr("transform", "translate(" + outerRadius2 + "," + outerRadius2 + ")");
    
    //Draw arc paths
    regPar2.append("path")
      .attr("fill", function(d, i) {
        (d.data.Regierungspartei2) ? currColor = color[d.data.Regierungspartei2] : currColor = color[d.data.Regierungspartei1];
        return currColor;
      })
      .attr("d", arc2);
      
    var regPar3 = svg.select(".arc3").selectAll(".regPar3")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "regPar3")
      .attr("transform", "translate(" + outerRadius3 + "," + outerRadius3 + ")");
    
    //Draw arc paths
    regPar3.append("path")
      .attr("fill", function(d, i) {
        (d.data.Regierungspartei3) ? currColor = color[d.data.Regierungspartei3] : (d.data.Regierungspartei2) ? currColor = color[d.data.Regierungspartei2] : currColor = color[d.data.Regierungspartei1];
        return currColor;;
      })
      .attr("d", arc3);
    
    //Set up groups
    var labelSitze = svg.select(".arcLabelSitz").selectAll(".labelSitze")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "labelSitze")
      .attr("transform", "translate(" + outerRadiusLabel + "," + outerRadiusLabel + ")");
 
    //Labels
    labelSitze.append("text")
      .attr("transform", function(d) {
        return "translate(" + arcLabel.centroid(d) + ")";
      })
      //.attr("dx", "2em")
      //.attr("dy", "0.1em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.value;
      });
 
    var key = function(d) {
      return d.data.Bundesland;
    };
    
    var labelLand = svg.select(".arcLabelLand").selectAll(".labelLand")
      .data(pie(dataset), key)
      .enter()
      .append("g")
      .attr("class", "labelLand");
      
    labelLand
      .append("text")
      .attr("dy", ".35em")
      .text(function(d) {
        return d.data.Bundesland;
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
    
    radius = Math.min(w * 0.9, h * 0.9) / 2;
    arc = d3.svg.arc().outerRadius(outerRadiusLabel).innerRadius(radius * 0.4), 
    outerArc = d3.svg.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);
  
  
    labelLand.transition().duration(1000).attrTween("transform", function(d) {
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

    //labelLand.exit().remove();
    

/*
    var labelLand = svg.select(".arcLabelLand").selectAll(".labelLand")
      .data(dataset)
      .enter()
      .append("text").text(function(d) {
        return d.Bundesland;
      }).attr("x", function(d) {
      return x(d.Sitze) + 2;
    })
    // Transition
    .attr("y", function(d) {
      return y(d.Sitze) + height;
    }).transition().delay(function(d, i) {
      return i * 50;
    }).duration(2000).attr("y", function(d) {
      return y(d.Sitze) - 10;
    });
*/
  });
};

function type(d) {
  d.value = +d.value;
  return d;
}