var width = 400, height = 500;
var projection = d3.geo.mercator().center([19, 51]).scale(2000).rotate([0, 0]);
var svg = d3.select("body").append("div").attr("id", "map").append("svg").attr("width", width).attr("height", height);
var path = d3.geo.path().projection(projection);
var g = svg.append("g");

var tooltip = d3.select("#map").append("div")
    .attr("class", "tooltip");
var datafield = d3.select("#map").append("div")
.attr("class", "datafield");

queue()
.defer(d3.json, "map/kreise_laender.topojson")
.defer(d3.csv, "data/04Kreise.csv")
/*.defer(d3.csv, "data/control.csv")*/
.await(ready);

function ready(error, topology, csv) {
  	  
  // csv: ermittle Spaltenüberschriften und davon 1. Spalte
  var headerRowCsv = Object.keys(csv[0]);  // damit werden Spaltenüberschriften automatisch ausgelesen
  var keyColumnCsv = headerRowCsv[0]; // Titel 1. Spalte ('r1' = ID)
  var valueColumnCsv = headerRowCsv[8]; // Titel 9. Spalte ('r9' = value)
  var keyColumnCsv2 = headerRowCsv[2];
  
  // csv: lösche Zeilen ohne id
  function cleanEmptyRowsCsv(item) {return item[keyColumnCsv] > 0;}; // für csv
  csv = csv.map( function(d) {return d;}).filter(cleanEmptyRowsCsv);
  
  // Werte: Leerzeichen entfernen + in Zahlen umwandeln
  var csvValue = csv.map(function(d) {return +d[valueColumnCsv].replace(/\s/g, "");});
  //console.log(csvValue);
  
  // für Skala nur Werte > 0 auslesen
  var csvValueNot0 = csvValue.filter( function(d,i) {return d > 0;});
  //console.log(csvValueNot0);
  
  /* // Funktion, um Leerzeichen in array zu entfernen 
  function trimArray(arr) {
      for(i=0;i<arr.length;i++) {
          arr[i] = +arr[i].replace(/\s/g, "");
      }
      return arr;
  }*/    
  
  // Farbskala einrichten         
  var scale = chroma.scale(['white', 'darkred']).domain(d3.extent(csvValueNot0, function(d) { return d; })/*, 100, 'log'*/ ); // Zusatz: Anzahl der Schritte, hier: zu ungenau
  
  // jeweils 1. Spalte csv + topojson in array speichern
  //var keyRowTopology = topology.map( function(d) {return d[keyColumnTopology];});
  //var keyRowTopology = topology;
  var keyRowTopology = topology.objects.kreise.geometries.map(function(d) {return d.id;}); // Auslesen der IDs aus topojson für alle Kreise in array
  var keyRowCsv = csv.map( function(d) {return +d[keyColumnCsv];}); // Auslesen der IDs aus csv in array (falls String: wird in Zahl umgewandelt)
  //console.log(keyRowCsv);
  // binde topojson an .kreis
  var kreis = g.selectAll(".kreis").data(topojson.feature(topology, topology.objects.kreise).features).enter();
  
  // erzeuge  svg-Elemente 
  kreis.append("path").attr("d", path).attr("class", function(d) {return "kreis";}).attr("id", function(d) {return d.properties.GEN;});
  
  g.selectAll(".land").data(topojson.feature(topology, topology.objects.bundeslaender).features).enter().append("path").attr("class", function(d) {
  	return "land " + d.id + " " + d.properties.GEN;
  }).attr("d", path);
  	
  // Ordne id der csv-Datei zum richtigen Element mit id der topojson-Datei zu
  function compareId(comp) {         
    var currentRow = new Array();
    var csvRow = new Array();
    var currentCsvValue = new Array();
            
    csv.forEach(function(d,i){csvRow[i] = d;});
    
    // Abgleich von Element-id und 2. Datei-id
    var allTags = g.selectAll(".kreis")
    .each(function(d,i) {
      var currentId = +d.id; // Id des aktuellen Elements, z.zt 1 - 16077 (String wird in Zahl umgewandelt)
      //console.log(currentId);
      //var currentId = d[keyColumnTopology];             // Id des aktuellen Elements, z.zt 1 - 16077
      //var currentId = this.__data__[keyColumnTopology]; // Id des aktuellen Elements, z.zt 1 - 16077
      var identIndex = keyRowCsv.indexOf(currentId); // 0 - 458
      currentRow = csvRow[identIndex]; // dazu passende Datenreihe
      currentCsvValue[i] = csvValue[identIndex];
      d3.select(this).datum(currentRow).style("fill", scale(currentCsvValue[i]))
      //Show/hide tooltip
      .on("mousemove", function(d,i) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
        tooltip
          .classed("hidden", false)
          .attr("style", "left:"+(mouse[0]+25)+"px;top:"+mouse[1]+"px")
          .html(d[keyColumnCsv2]);
      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true);
      })
     .on("click", function(d){click(d);});

      
      function click(d) 
        {
          console.log(d); //considering dot has a title attribute
          d3.selectAll(".datafields").remove();
          
//					datafield.append('div').attr("class", "title").text("Bevölkerung:");
          for(i=0; i < headerRowCsv.length; i++) {
            if(i > 1 && i != 3){
            datafield.append('div').attr("class", "datafields label").text(headerRowCsv[i]); 
            datafield.append('div').attr("class", "datafields value").attr('id', headerRowCsv[i]).text(d[headerRowCsv[i]]);
            } 
          }
        }
      
    });
  };
  
  compareId();
    
};
  		
function type(d) {
	d.value = +d.value;
	return d;
}