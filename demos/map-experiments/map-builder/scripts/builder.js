var map;

var defaultWidth = currentWidth = "500";
var defaultHeight = currentHeight = "400";
var defaultCenter = currentCenter = new google.maps.LatLng(0, 0);
var lastCenter = "0, 0";
var defaultZoom = currentZoom = 1;
var defaultSaturation = currentSaturation = 0;

var layer;
var anotherLayer;

var defaultTableId = currentTableId = "";
var defaultLocationColumn = currentLocationColumn = "";
var defaultFilter = currentFilter = "";
var defaultAnotherTableId = currentAnotherTableId = "";
var defaultAnotherLocationColumn = currentAnotherLocationColumn = "";
var defaultAnotherFilter = currentAnotherFilter = "";

var defaultTextQueryLabel = currentTextQueryLabel = "";
var defaultTextQueryColumn = currentTextQueryColumn = "";
var defaultSelectQueryLabel = currentSelectQueryLabel = "";
var defaultSelectQueryColumn = currentSelectQueryColumn = "";

var selectOptions = "";

var queryAdded = false;
var selectQueryAdded = false;
var layerAdded = false;

var lastDisplayed = "";
var s = new goog.ui.Slider();

/*** Form Functionality ***/

//show defaults in text boxes
function initialize() {
  document.getElementById('mapwidth').value = defaultWidth;
  document.getElementById('mapheight').value = defaultHeight;
  document.getElementById('mapCenter').value = defaultCenter.lat() + ", " + defaultCenter.lng();
  document.getElementById('mapZoom').value = defaultZoom;
  
  //initialize slider
  var el = document.getElementById('s1');
	s.decorate(el);
	s.setMinimum(-99);
	s.setMaximum(99);
	s.addEventListener(goog.ui.Component.EventType.CHANGE, styleMap);
	
	updateTextArea();
}

//edit the map based on user-entered values
function editMap() {

	//map values
  currentWidth = document.getElementById('mapwidth').value ? 
  	parseInt(document.getElementById('mapwidth').value) : defaultWidth;
  currentHeight = document.getElementById('mapheight').value ? 
  	parseInt(document.getElementById('mapheight').value) : defaultHeight;
  currentZoom = document.getElementById('mapZoom').value ? 
  	parseInt(document.getElementById('mapZoom').value) : defaultZoom;
  currentSaturation = s.getValue() ?
  	parseInt(s.getValue()) : defaultSaturation;
	
	//resize
	document.getElementById('map_canvas').style.width = currentWidth + "px";
	document.getElementById('map_canvas').style.height = currentHeight + "px";
	google.maps.event.trigger(map, 'resize');

  //center
  if(document.getElementById("mapCenter").value != lastCenter) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': document.getElementById("mapCenter").value }, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		    currentCenter = results[0].geometry.location;
        lastCenter = document.getElementById("mapCenter").value;
        map.setCenter(currentCenter);
	    } else {
	      alert('Map Center failed to geocode, keeping map center at last value');
	      map.setCenter(currentCenter);
	    }
    });
  }
	
	//zoom
	map.setZoom(currentZoom);
	
	styleMap();
	if(currentTableId && currentLocationColumn) addLayerToMap();
	if(currentAnotherTableId && currentAnotherLocationColumn) addAnotherLayerToMap();
}

//STYLE MAP

function specs() {
  document.getElementById('specifics').style.display = 
    document.getElementById('specifics').style.display == "none" ? "inline" : "none";
}

function styleMapAll() {
  var setCheck = false;
  if(document.getElementById('allfeatures').checked) {
    setCheck = true;
	} 
	for(var i = 0; i < document.specform.specs.length; i++) {
    document.specform.specs[i].checked = setCheck;
  }
	styleMap();
}

function styleMap(value) {
  style = []
	currentSaturation = s.getValue();
	if(currentSaturation != 0) {
		style.push ({
			featureType: "all",
			elementType: "all",
			stylers: [
				{ saturation: currentSaturation },
			]
		});
	}
	
	var unchecked = false; //is one unchecked?
	for(var i = 0; i < document.specform.specs.length; i++) {
	  if(!document.specform.specs[i].checked) {
	    style.push ({
			  featureType: document.specform.specs[i].id,
			  elementType: "all",
			  stylers: [
				  { visibility: "off" },
			  ]
		  });
		  unchecked = true;
	  }
	}
	
	//if one is unchecked, uncheck the all features, otherwise, check it
	if(unchecked) document.getElementById('allfeatures').checked = false;
	else document.getElementById('allfeatures').checked = true;
	
	var styledMapType =  new google.maps.StyledMapType(style, {
		map: map,
		name: 'Styled Map'
	});
	
	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');
	
	updateTextArea();
}

//fill the select columns in the form after user enters table id
function fillSelectColumns() {
	selectMenu1 = document.getElementById('locationColumn');
	selectMenu2 = document.getElementById('textQueryColumn');
	selectMenu3 = document.getElementById('selectQueryColumn');
	removeChildren(selectMenu1);
	removeChildren(selectMenu2);
	removeChildren(selectMenu3);
	
	query = "SELECT%20*%20FROM%20" + document.getElementById('tableid').value + "%20LIMIT%201";
	var script = document.createElement("script");
	script.setAttribute("src", "https://www.google.com/fusiontables/api/query?sql=" + query + "&jsonCallback=selectColumns");
	document.body.appendChild(script);
}

//actually add the columns from the table to the select columns in the form
function selectColumns(response) {
	selectMenu1 = document.getElementById('locationColumn');
	selectMenu2 = document.getElementById('textQueryColumn');
	selectMenu3 = document.getElementById('selectQueryColumn');
	for(key in response['table']['cols']) {
		option1 = document.createElement("option");
		option1.setAttribute("value", response['table']['cols'][key]);
		option1.innerHTML = response['table']['cols'][key];
		option2 = document.createElement("option");
		option2.setAttribute("value", response['table']['cols'][key]);
		option2.innerHTML = response['table']['cols'][key];
		option3 = document.createElement("option");
		option3.setAttribute("value", response['table']['cols'][key]);
		option3.innerHTML = response['table']['cols'][key];
		selectMenu1.appendChild(option1);
		selectMenu2.appendChild(option2);
		selectMenu3.appendChild(option3);
	}
	selectMenu1.disabled = false;
	selectMenu2.disabled = false;
	selectMenu3.disabled = false;
}

//start adding the layer to the map, button click add layer
function addLayer() {
  if(!checkLayerForm()) return;
  
  currentTableId = document.getElementById('tableid').value ?
 		document.getElementById('tableid').value : defaultTableId;
  currentLocationColumn = document.getElementById('locationColumn').value ?
 		document.getElementById('locationColumn').value : defaultLocationColumn;
 	currentFilter = document.getElementById('filter').value ?
 		document.getElementById('filter').value : defaultFilter;
 	
	addLayerToMap();
	updateTextArea();
}

/*** EXTRA FEATURES ***/

//fill the select columns in the form after user enters table id
function fillAnotherSelectColumns() {
	selectMenu = document.getElementById('anotherLocationColumn');
	removeChildren(selectMenu);
	
	query = "SELECT%20*%20FROM%20" + document.getElementById('anotherTableid').value + "%20LIMIT%201";
	var script = document.createElement("script");
	script.setAttribute("src", "https://www.google.com/fusiontables/api/query?sql=" + query + "&jsonCallback=anotherSelectColumns");
	document.body.appendChild(script);
}


//actually add the columns from the table to the select columns in the form
function anotherSelectColumns(response) {
	selectMenu = document.getElementById('anotherLocationColumn');
	for(key in response['table']['cols']) {
		option = document.createElement("option");
		option.setAttribute("value", response['table']['cols'][key]);
		option.innerHTML = response['table']['cols'][key];
		selectMenu.appendChild(option);
	}
	selectMenu.disabled = false;
}

//start adding the layer to the map, button click add layer
function addAnotherLayer() {
  if(!checkAnotherLayerForm()) return;
  
  currentAnotherTableId = document.getElementById('anotherTableid').value ?
 		document.getElementById('anotherTableid').value : defaultAnotherTableId;
  currentAnotherLocationColumn = document.getElementById('anotherLocationColumn').value ?
 		document.getElementById('anotherLocationColumn').value : defaultAnotherLocationColumn;
 	currentAnotherFilter = document.getElementById('anotherFilter').value ?
 	  document.getElementById('anotherFilter').value : defaultAnotherFilter;
 	
 	if(!layerAdded) {
		addAnotherLayerToMap();
		updateTextArea();
		layerAdded = true;
		switchSelectMenu();
	}
}


//start adding the text search, button click add text search
function addQuery() {
	if(!checkSearchForm()) return;
 	
	//query values
  currentTextQueryLabel = document.getElementById('textQueryLabel').value ?
 		document.getElementById('textQueryLabel').value : defaultTextQueryLabel;
  currentTextQueryColumn = document.getElementById('textQueryColumn').value ?
 		document.getElementById('textQueryColumn').value : defaultTextQueryColumn;

	if(!queryAdded) {
		addTextQuery();
		updateTextArea();
		queryAdded = true;
		switchSelectMenu();
	}
}

//start adding select menu under map, button click add select
function addSelectQuery() {
	if(!checkSelectForm()) return;
 	
	//query values
  currentSelectQueryLabel = document.getElementById('selectQueryLabel').value ?
 		document.getElementById('selectQueryLabel').value : defaultSelectQueryLabel;
  currentSelectQueryColumn = document.getElementById('selectQueryColumn').value ?
 		document.getElementById('selectQueryColumn').value : defaultSelectQueryColumn;

	if(!selectQueryAdded) {
		addSelectQueryUnderMap();
		selectQueryAdded = true;
		switchSelectMenu();
	}
}


//show the correct form (add layer, select or text query)
function showDiv(which) {
  document.getElementById(which).style.display = "block";
  if(lastDisplayed) document.getElementById(lastDisplayed).style.display = "none";
  lastDisplayed = which;
}

/*** RESET EXTRA FEATURE ***/

//remove any extra feature that was added
function resetAddFeature() {
	if(layerAdded) {
		removeAnotherLayer();
	  switchSelectMenu();
		
	} else if(queryAdded) {
		removeTextQuery();
	  switchSelectMenu();
		
	} else if(selectQueryAdded) {
  	removeSelectQuery();
	  switchSelectMenu();
	}
	
	updateTextArea();
}

//removes the layer from the map and resets the form
function removeAnotherLayer() {
	currentAnotherTableId = defaultAnotherTableId;
	currentAnotherLocationColumn = defaultAnotherLocationColumn;
	currentAnotherFilter = defaultAnotherFilter;
  if(anotherLayer) anotherLayer.setMap(null); 
  clearForm();
	layerAdded = false;
}

//reset the form
function clearForm() {
  //remove values from select menu
  removeChildren(document.getElementById('anotherLocationColumn'));
  //disable select menu
  document.getElementById('anotherLocationColumn').disabled = true;
}

function removeTextQuery() {
	currentTextQueryLabel = defaultTextQueryLabel;
	currentTextQueryColumn = defaultTextQueryColumn;
	removeQueryElement('textSearchDiv');
	layer.setQuery("SELECT '" + currentLocationColumn + "' FROM " + currentTableId);
	queryAdded = false;
}

function removeSelectQuery() {
	currentSelectQueryLabel = defaultSelectQueryLabel;
	currentSelectQueryColumn = defaultSelectQueryColumn;
	removeQueryElement('selectSearchDiv');
	layer.setQuery("SELECT '" + currentLocationColumn + "' FROM " + currentTableId);
	selectQueryAdded = false;
}

function removeQueryElement(elementId) {
  searchDiv = document.getElementById(elementId);
  if(searchDiv.hasChildNodes()) {
    while (searchDiv.childNodes.length > 0) {
      searchDiv.removeChild(searchDiv.lastChild);       
    }
  }
  searchDiv.parentNode.removeChild(searchDiv);
}

/*** FORM CHECKS ***/

//check the layer form
function checkLayerForm() {
 	if(!document.getElementById('tableid').value) {
 		alert("Table ID required!");
 		return false;
 	}
 	
 	if(!document.getElementById('locationColumn').value) {
 		alert("Location Column required!");
 		return false;
 	}
 	
 	return true;
}

//check the layer form
function checkAnotherLayerForm() {
  if(!checkLayerForm()) return false;
  
 	if(!document.getElementById('anotherTableid').value) {
 		alert("Table ID required!");
 		return false;
 	}
 	
 	if(!document.getElementById('anotherLocationColumn').value) {
 		alert("Location Column required!");
 		return false;
 	}
 	
 	return true;
}

//check the text search form
function checkSearchForm(message) { 	
	if(!checkLayerForm()) return false;
 	
 	if(!document.getElementById('textQueryLabel').value) {
 		alert("Label required!");
 		return false;
 	}
 	
 	if(!document.getElementById('textQueryColumn').value) {
 		alert("Query Column required!");
 		return false;
 	}
 	
 	return true;
}

//check the select menu form
function checkSelectForm(message) { 	
	if(!checkLayerForm()) return false;
 	
 	if(!document.getElementById('selectQueryLabel').value) {
 		alert("Label required!");
 		return false;
 	}
 	
 	if(!document.getElementById('selectQueryColumn').value) {
 		alert("Query Column required!");
 		return false;
 	}
 	
 	return true;
}


/*** Preview Generator ***/

//actually add text-based search under map
function addTextQuery() {
	var mapDiv = document.getElementById('map_section');
	var div = document.createElement("div");
	div.setAttribute("id", "textSearchDiv");
	div.style.marginTop = "10px";
	
	var label = document.createElement("label");
	label.innerHTML = currentTextQueryLabel + "&nbsp;";
	
	var input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("id", "textSearch");
	
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("onclick", "javascript:textQueryChangeMap();");
	button.setAttribute("value", "Search");
	
	div.appendChild(label);
	div.appendChild(input);
	div.appendChild(button);
	mapDiv.appendChild(div);
}

//actually add select under map
function addSelectQueryUnderMap() {
  var mapDiv = document.getElementById('map_section');
	var div = document.createElement("div");
	div.setAttribute("id", "selectSearchDiv");
	div.style.marginTop = "10px";
	
	var label = document.createElement("label");
	label.innerHTML = currentSelectQueryLabel + "&nbsp;";
	
	var select = document.createElement("select");
	select.setAttribute("id", "selectSearch");
	select.setAttribute("disabled", "true");
	select.setAttribute("onchange", "javascript:selectQueryChangeMap();");
	
	var option = document.createElement("option");
	option.setAttribute("value", "%");
	option.innerHTML = "--Select--";
	select.appendChild(option);
	
	div.appendChild(label);
	div.appendChild(select);
	mapDiv.appendChild(div);
	
	if(currentFilter)
	  query = "SELECT%20'" + document.getElementById('selectQueryColumn').value + "',COUNT()%20FROM%20" + currentTableId + 
	    " WHERE " + currentFilter +
	    " GROUP BY '" + document.getElementById('selectQueryColumn').value + "'";
	else
	  query = "SELECT%20'" + document.getElementById('selectQueryColumn').value + "',COUNT()%20FROM%20" + currentTableId + 
	    " GROUP BY '" + document.getElementById('selectQueryColumn').value + "'";
	
	var script = document.createElement("script");
	script.setAttribute("src", "https://www.google.com/fusiontables/api/query?sql=" + query + "&jsonCallback=selectData");
	document.body.appendChild(script);
}

//fill the select menu with data from table
function selectData(response) {
  var selectMenu = document.getElementById('selectSearch');
  selectOptions = "  &lt;select id=\"searchString\" onchange=\"changeMap(this.value);\"&gt;\n"
  selectOptions += "    &lt;option value=\"%\"&gt;--Select--&lt;/option&gt;\n";
  for(var i = 0; i < response['table']['rows'].length; i++) {
    rowValue = response['table']['rows'][i][0];
		option = document.createElement("option");
		option.setAttribute("value", rowValue);
		option.innerHTML = rowValue;
		selectMenu.appendChild(option);
		selectOptions += "    &lt;option value=\"" + rowValue + "\"&gt;" + rowValue + "&lt;/option&gt;\n";
  }
  selectMenu.disabled = false;
  selectOptions += "  &lt;/select&gt;\n";
  updateTextArea();
}

/*** Preview ***/

//initialize the map
function initializeMap() {
	document.getElementById('map_canvas').style.width = defaultWidth + "px";
	document.getElementById('map_canvas').style.height = defaultHeight + "px";

	map = new google.maps.Map(document.getElementById('map_canvas'), {
		center: defaultCenter,
		zoom: defaultZoom, //zoom
		mapTypeId: google.maps.MapTypeId.ROADMAP //the map style
	});
  addListeners();
}

//add the layer to the map
function addLayerToMap() {
	if(layer) layer.setMap(null); 
	layer = new google.maps.FusionTablesLayer(parseInt(currentTableId));
	if(currentFilter) layer.setQuery("SELECT '" + currentLocationColumn + "' FROM " + currentTableId + " WHERE " + currentFilter);
	else layer.setQuery("SELECT '" + currentLocationColumn + "' FROM " + currentTableId);
	layer.setMap(map);
}

//add another layer to the map
function addAnotherLayerToMap() {
	if(anotherLayer) anotherLayer.setMap(null); 
	anotherLayer = new google.maps.FusionTablesLayer(parseInt(currentAnotherTableId));
	if(currentAnotherFilter) anotherLayer.setQuery("SELECT '" + currentAnotherLocationColumn + "' FROM " + currentAnotherTableId + " WHERE " + currentAnotherFilter);
	else anotherLayer.setQuery("SELECT '" + currentAnotherLocationColumn + "' FROM " + currentAnotherTableId);
	anotherLayer.setMap(map);
}

//change the map based on query
function textQueryChangeMap() {
  var searchString = document.getElementById('textSearch').value.replace("'", "\\'");
  if(currentFilter)
	  layer.setQuery("SELECT '" + currentLocationColumn + 
		  "' FROM " + currentTableId + 
		  " WHERE '" + currentTextQueryColumn + "' = '" + searchString + "'" +
		  " AND " + currentFilter);
	else
		layer.setQuery("SELECT '" + currentLocationColumn + 
		  "' FROM " + currentTableId + 
		  " WHERE '" + currentTextQueryColumn + "' = '" + searchString + "'");
}

//change the map based on select menu
function selectQueryChangeMap() {
  var searchString = document.getElementById('selectSearch').value.replace("'", "\\'");
  if(currentFilter)
	  layer.setQuery("SELECT '" + currentLocationColumn + 
		  "' FROM " + currentTableId + 
		  " WHERE '" + currentSelectQueryColumn + "' LIKE '" + searchString + "'" +
		  " AND " + currentFilter);
  else
	  layer.setQuery("SELECT '" + currentLocationColumn + 
		  "' FROM " + currentTableId + 
		  " WHERE '" + currentSelectQueryColumn + "' LIKE '" + searchString + "'");
}

/*** HTML CODE - TEXTAREA ***/

function updateTextArea() {
	var textArea =
	  "<!DOCTYPE html>\n" +
		"<html>\n" +
		"<head>\n" +
		"<style>\n" +
		"  #map_canvas { width: " + currentWidth + "px; height: " + currentHeight + "px; }\n" +
		"</style>\n\n" +
		
		"<script type=\"text/javascript\" src=\"http://maps.google.com/maps/api/js?sensor=false\"></script>\n" +
		"<script type=\"text/javascript\">\n" +
		"var map;\n\n";
			
	if(currentTableId) {
		textArea += 
			"var layer;\n" +
			"var tableid = " + currentTableId + ";\n\n";
	}
	
	if(currentAnotherTableId) {
		textArea += 
			"var layer2;\n" +
			"var tableid2 = " + currentAnotherTableId + ";\n\n";
	}
			
	textArea += 
		"function initialize() {\n" +
		"  map = new google.maps.Map(document.getElementById('map_canvas'), {\n" +
		"    center: new google.maps.LatLng(" + currentCenter.lat() + ", " + currentCenter.lng() + "),\n" +
		"    zoom: " + currentZoom + ",\n" +
		"    mapTypeId: google.maps.MapTypeId.ROADMAP\n" +
		"  });\n";
		
	
	// Is there a feature that has been checked? show style if so
	var oneChecked = false;
	for(var i = 0; i < document.specform.specs.length; i++) {
    if(!document.specform.specs[i].checked) {
      oneChecked = true;
      break;
    }
  }
	if(currentSaturation != 0 || oneChecked) {
	
		textArea +=
			"\n  var style = [\n";
			
		oneabove = false;
		if(currentSaturation != 0) {
			textArea +=
			  "    {\n" +
				"      featureType: 'all',\n" +
    		"      elementType: 'all',\n" +
				"      stylers: [\n" +
      	"        { saturation: " + currentSaturation + " }\n" +
    		"      ]\n" +
		    "    }";
		  oneabove = true;
		}
		
		for(var i = 0; i < document.specform.specs.length; i++) {
	    if(!document.specform.specs[i].checked) {
	      if(oneabove) textArea += " ,\n";
			  textArea +=
			    "    {\n" +
				  "      featureType: '" + document.specform.specs[i].id + "',\n" +
      		"      elementType: 'all',\n" +
				  "      stylers: [\n" +
        	"        { visibility: 'off' }\n" +
      		"      ]\n" +
		      "    }";
		    oneabove = true;
	    }
	  }
		
		textArea +=
		  "\n  ];\n\n" +

			"  var styledMapType = new google.maps.StyledMapType(style, {\n" +
			"    map: map,\n" +
			"    name: 'Styled Map'\n" +
			"  });\n\n" +
			
			"  map.mapTypes.set('map-style', styledMapType);\n" +
			"  map.setMapTypeId('map-style');\n";
	}
	
	if(currentTableId) {
		textArea += 
			"\n  layer = new google.maps.FusionTablesLayer(tableid);\n";
		if(currentFilter) {
		  textArea += 
		    "  layer.setQuery(\"SELECT '" + currentLocationColumn + "' FROM \" + tableid + \"" +
		    " WHERE " + currentFilter + "\");\n";
		} else {
		  textArea += 
		    "  layer.setQuery(\"SELECT '" + currentLocationColumn + "' FROM \" + tableid);\n";
		}
		textArea +=
			"  layer.setMap(map);\n";
	}

	if(currentAnotherTableId) {
		textArea += 
			"\n  layer2 = new google.maps.FusionTablesLayer(tableid2);\n";
		if(currentAnotherFilter) {
		  textArea += 
		    "  layer2.setQuery(\"SELECT '" + currentAnotherLocationColumn + "' FROM \" + tableid2 + \"" +
		    " WHERE " + currentAnotherFilter + "\");\n";
		} else {
		  textArea += 
		    "  layer2.setQuery(\"SELECT '" + currentAnotherLocationColumn + "' FROM \" + tableid2);\n";
		}
		textArea +=
			"  layer2.setMap(map);\n";
	}
	
	textArea += 
		"}\n";
		
	if(currentTextQueryLabel) {
		textArea +=
			"\n" +
			"function changeMap() {\n" +
			"  var searchString = document.getElementById('searchString').value.replace(\"'\", \"\\\\'\");\n";
		if(currentFilter) {
		  textArea +=
		    "  layer.setQuery(\"SELECT '" + currentLocationColumn + "' FROM \" + tableid + \"" +
		    " WHERE '" + currentTextQueryColumn + "' = '\" + searchString + \"'" +
		    " AND " + currentFilter + "\");\n";
		} else {
		  textArea +=
		    "  layer.setQuery(\"SELECT '" + currentLocationColumn + "' FROM \" + tableid + \"" +
		    " WHERE '" + currentTextQueryColumn + "' = '\" + searchString + \"'\");\n";
		}
		textArea +=
			"}\n";
	}
	
	if(currentSelectQueryLabel) {
		textArea +=
			"\n" +
			"function changeMap() {\n" +
			"  var searchString = document.getElementById('searchString').value.replace(\"'\", \"\\\\'\");\n";
	  if(currentFilter) {
		  textArea +=
			  "  layer.setQuery(\"SELECT '" + currentLocationColumn + "' FROM \" + tableid + \"" +
			  " WHERE '" + currentSelectQueryColumn + "' LIKE '\" + searchString + \"'" +
			  " AND " + currentFilter + "\");\n";
	  } else {
		  textArea +=
			  "  layer.setQuery(\"SELECT '" + currentLocationColumn + "' FROM \" + tableid + \"" +
			  " WHERE '" + currentSelectQueryColumn + "' LIKE '\" + searchString + \"'\");\n";
		}
		textArea +=
			"}\n";
	}
	
	textArea +=
		"</script>\n\n" +
		
		"</head>\n" +
		"<body onload=\"initialize();\">\n\n" +
		
		"<div id=\"map_canvas\"></div>\n\n";
	
	if(currentTextQueryLabel) {
		textArea += 
		  "<div style=\"margin-top: 10px;\">\n" +
			"  <label>" + currentTextQueryLabel + " &lt;/label>\n" +
			"  <input type=\"text\" id=\"searchString\" />\n" +
			"  <input type=\"button\" onclick=\"changeMap();\" value=\"Search\" />\n" +
			"<\div>\n\n";
	}
	
	if(currentSelectQueryLabel) {
	  textArea += 
		  "<div style=\"margin-top: 10px;\">\n" +
	    "  <label>" + currentSelectQueryLabel + " &lt;/label>\n" +
	    selectOptions +
			"<\div>\n\n";
	}
	
	textArea +=
		"</body>\n" +
		"</html>";
		
	document.getElementById('htmlCode').value = textArea;
}

/*** UTILS ***/

//remove child nodes from a menu
function removeChildren(menu) {
	if(menu.hasChildNodes()) {
    while (menu.childNodes.length > 2) {
      menu.removeChild(menu.lastChild);       
    } 
  }
}

//if select menu on, turn off. if off, turn on
function switchSelectMenu() {
	document.getElementById('addFeature').disabled = 
		document.getElementById('addFeature').disabled ? false : true;
}

//add listeners to the map
function addListeners() {
	google.maps.event.addListener(map, 'zoom_changed', function() {
	  document.getElementById('mapZoom').value = map.getZoom();
	  currentZoom = map.getZoom();
	  updateTextArea(); 
	});
	
	google.maps.event.addListener(map, 'center_changed', function() {
	  document.getElementById('mapCenter').value = map.getCenter().lat() + ", " + map.getCenter().lng();
	  lastCenter = map.getCenter().lat() + ", " + map.getCenter().lng();
	  currentCenter = map.getCenter();
	  updateTextArea();
	});
}
