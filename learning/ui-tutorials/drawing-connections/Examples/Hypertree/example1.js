var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){


//init data
var json =

//hub
{"id": "347_0",
"name": "PALMETTO<br>STREET GANG",
    	
//primary spokes
"children": [

//primary hub
{"id": "126510_1",
"name": "BRUNILDA AKERY",
"data": {
"relation": "<h2>Brunilda Akery</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Charged with shooting 18-year-old Filiberto Kulback in January 2001 and killing him.</p>"},

//child hub
"children": [
{"id": "52163_2",
"name": "Filiberto Kulback",
"data": {
"relation": "<h2>Filiberto Kulback</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Killed January 2001. Brunilda Akery remains jailed on first-degree murder charges in connection with the homicide.</p>"},
"children": []
}]
},

//primary hub
{"id": "1",
"name": "BRIGID LAMONTAGNA",
"data": {
"relation": "<h2>Brigid Lamontagna</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Awaiting trial on charges of first-degree murder for the April 2001 shooting death of Erasmo Bungart, and separate first-degree murder charges for the March 2002 shooting death of Manual Kulback.</p>"},

//child hub
"children": [

{"id": "2382_7",
"name": "Erasmo Bungart",
"data": {
"relation": "<h2>Erasmo Bungart</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Killed April 2001. Brigid Lamontagna is awaiting trial on charges of first-degree murder, and Michale Ballagas is charged with failure to report a homicide in connection with Bungart's death.</p>"},

"children": []
},

//child hub
{"id": "3",
"name": "Manual Kulback",
"data": {
"relation": "<h2>Manual Kulback</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Killed March 2002. Brigid Lamontagna is awaiting trial on charges of first-degree murder.</p>"},

"children": []
}]
},

//primary hub
{"id": "235951_6",
"name": "EDMUNDO BALLENA",
"data": {
"relation": "<h2>Edmundo Ballena</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Remains jailed on two counts of first-degree murder in connection with the February 2001 homicide of Modesto Hondel, and two counts of second-degree murder for the March 2001 shooting death of Jarod Ageboi.</p>"},

//child hub
"children": [
{"id": "5000",
"name": "Modesto Hondel",
"data": {
"relation": "<h2>Modesto Hondel</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Killed February 2001. Michale Ballagas and Edmundo Ballena both remain jailed on two counts of first-degree murder each in connection with the homicide.</p>"},
"children": []
},

//child hub
{"id": "6000",
"name": "Jarod Ageboi",
"data": {
"relation": "<h2>Jarod Ageboi</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Killed March 2001. Edmundo Ballena remains jailed two counts of second-degree murder in connection with Aegoboi's death.</p>"},

"children": []
}]
},
        
//primary hub
{"id": "2396_14",
"name": "MICHALE BALLAGAS",
"data": {
"relation": "<h2>Michale Ballagas</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Remains jailed on first-degree murder charges in connection with the shooting death of Modesto Hondel, and is charged with failure to report a homicide in connection with the April 2001 shooting death of Erasmo Bungart.</p>"},

//child hub
"children": [

{"id": "2382_7",
"name": "Erasmo Bungart",
"data": {
"relation": "<h2>Erasmo Bungart</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Killed April 2001. Brigid Lamontagna is awaiting trial on charges of first-degree murder, and Michale Ballagas is charged with failure to report a homicide in connection with Bungart's death.</p>"},

"children": []
},

//child hub
{"id": "5000",
"name": "Modesto Hondel",
"data": {
"relation": "<h2>Modesto Hondel</h2><img src=\"\http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm\"\ width=\"\50px\"\ /><p>Killed February 2001. Michale Ballagas and Edmundo Ballena both remain jailed on two counts of first-degree murder each in connection with the homicide.</p>"},
children: []}
]},

//end primary and children
],

        

//patent node data
data: {relation: ""}

//end
};

    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: w,
      height: h,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00"
      },
      Edge: {
          lineWidth: 2,
          color: "#088"
      },
      onBeforeCompute: function(node){
          Log.write("centering");
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          domElement.innerHTML = node.name;
          $jit.util.addEvent(domElement, 'click', function () {
              ht.onClick(node.id);
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
          if (node._depth <= 1) {
              style.fontSize = "0.8em";
              style.color = "#ddd";

          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#555";

          } else {
              style.display = 'none';
          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';
      },
      
      onAfterCompute: function(){
          Log.write("done");
          
          //Build the right column relations list.
          //This is done by collecting the information (stored in the data property) 
          //for all the nodes adjacent to the centered node.
          var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
              if (child.data) {
                  var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                  //html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
              }
          });
          html += "</ul>";
          $jit.id('inner-details').innerHTML = html;
      }
    });
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onAfterCompute();
}
