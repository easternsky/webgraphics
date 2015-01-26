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
  //      var dataset = [ 5, 10, 20, 45, 6, 25 ];

    var pie = d3.layout.pie().sort(null).value(function(d) {return d.Sitze;})
    .startAngle(-90 * (pi / 180)).endAngle(90 * (pi / 180));
    
    //Easy colors accessible via a 10-step ordinal scale
    //var color = d3.scale.category10();
    
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
    
    var arcsLabel = svg
      .append("g")
      .attr("class", "arcLabel");
 
    
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
    var labelSitze = svg.select(".arcLabel").selectAll(".labelSitze")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "labelSitze")
      .attr("transform", "translate(" + outerRadiusLabel + "," + outerRadiusLabel + ")");
 
 
    //Labels
    labelSitze.append("text")
      .attr("transform", function(d) {
        console.log(d.data.Sitze);
        return "translate(" + arcLabel.centroid(d) + ")";
      })
      //.attr("dx", "2em")
      //.attr("dy", "0.1em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.value;
      });
          
    });
  };

function type(d) {
  d.value = +d.value;
  return d;
}