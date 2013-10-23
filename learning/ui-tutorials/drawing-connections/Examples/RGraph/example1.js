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
data: {relation: "<p>This is a fictional account of crimes and connections, but the goal of the exercise is real. To see what kinds of open-source tools exist that might build the foundation for a news application that can visualize the connections between public figures, and in this case, crime suspects.</p><p>This visualization uses <a href=\"\http://thejit.org/\"\>JIT</a> (JavaScript InfoVis Toolkit) by Nicolas Garcia Belmonte</p><br><br><br><h2>PALMETTO <br> STREET GANG</h2><p>From January 2001 through March of the following year four members of the Palmetto Street Gang waged a non-stop war against their rivals in the drug trade.</p><p>Midland natives Brigid Lamontagna, Brunilda Akery, Michale Ballagas and Edmundo Ballena each face charged in connection with the deaths of five men over the span of 14 months.</p><p>Midland Police Chief Rick Smith-Pearson said the arrests were months in the making and couldn't have happened without the eyes of a watchful citizen.</p><br><br><br>"}

//end
};

    
    //init RGraph
    var rgraph = new $jit.RGraph({
        //Where to append the visualization
        injectInto: 'infovis',
        //Optional: create a background canvas that plots
        //concentric circles.
        background: {
          CanvasStyles: {
            strokeStyle: '#555'
          }
        },
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        Navigation: {
          enable: true,
          panning: true,
          zooming: 10
        },
        //Set Node and Edge styles.
        Node: {
            color: '#ddeeff'
        },
        
        Edge: {
          color: '#C17878',
          lineWidth:1.5
        },

        onBeforeCompute: function(node){
            Log.write("centering " + node.name + "...");
            //Add the relation list in the right column.
            //This list is taken from the data property of each JSON node.
            $jit.id('inner-details').innerHTML = node.data.relation;
        },
        
        onAfterCompute: function(){
            Log.write("done");
        },
        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                rgraph.onClick(node.id);
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ccc";
            
            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#494949";
            
            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load JSON data
    rgraph.loadJSON(json);
    //trigger small animation
    rgraph.graph.eachNode(function(n) {
      var pos = n.getPos();
      pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
      modes:['polar'],
      duration: 2000
    });
    //end
    //append information about the root relations in the right column
    $jit.id('inner-details').innerHTML = rgraph.graph.getNode(rgraph.root).data.relation;
}
