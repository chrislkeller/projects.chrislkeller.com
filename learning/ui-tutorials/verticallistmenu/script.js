var menuids=new Array("verticalmenu") //Enter id(s) of UL menus, separated by commas
var submenuoffset=-2 //Offset of submenus from main menu. Default is -2 pixels.

function createcssmenu(){
for (var i=0; i<menuids.length; i++){
  var ultags=document.getElementById(menuids[i]).getElementsByTagName("ul")
    for (var t=0; t<ultags.length; t++){
    var spanref=document.createElement("span")
		spanref.className="arrowdiv"
		spanref.innerHTML="&nbsp;&nbsp;"
		ultags[t].parentNode.getElementsByTagName("a")[0].appendChild(spanref)
    ultags[t].parentNode.onmouseover=function(){
    this.getElementsByTagName("ul")[0].style.left=this.parentNode.offsetWidth+submenuoffset+"px"
    this.getElementsByTagName("ul")[0].style.display="block"
    }
    ultags[t].parentNode.onmouseout=function(){
    this.getElementsByTagName("ul")[0].style.display="none"
    }
    }
  }
}


if (window.addEventListener)
window.addEventListener("load", createcssmenu, false)
else if (window.attachEvent)
window.attachEvent("onload", createcssmenu)