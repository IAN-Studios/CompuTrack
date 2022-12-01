function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  document.getElementById("logoutbutton").innerHTML = `Logout ${getCookie("account")}`
fetch(new Request("/request?q=reqissuesunresolved&reqissuesresolved&reqassets&reqissuesall")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    document.getElementById('stats').innerHTML = document.getElementById('stats').innerHTML
    + `<div class="dashboard-statistic">Items Asseted:<span style="float:right">${data.reqassets.length}</span></div>`
    + `<div class="dashboard-statistic">Issue Count:<span style="float:right">${data.reqissuesall.length}</span></div>`
    + `<div class="dashboard-statistic">Unresolved Issues:<span style="float:right">${data.reqissuesunresolved.length}</span></div>`
    + `<div class="dashboard-statistic">Resolved Issues:<span style="float:right">${data.reqissuesall.length-data.reqissuesunresolved.length}</span></div>` 
})})
var displayname
fetch(new Request("/request?q=currentuser")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.userinfo.forEach(element => {
        if (element.Username.toLowerCase() == getCookie("account")) {
            displayname = element.Displayname;
            document.getElementById("title").innerHTML = `<div style="font-size:24pt;text-align:left;padding:10px">Welcome back, ${displayname}.</div>`
        }
    });
})}) 

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      diffy =  e.clientY - elmnt.style.top.split("px")[0]
      diffx = e.clientX - elmnt.style.left.split("px")[0]
      console.log(diffy)
      console.log(diffx)
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves
      document.onmousemove = elementDrag
    }
  
    function elementDrag(e) {
      e = e || window.event;
      console.log(e)
      e.preventDefault();
      if (e.clientY < 50) return;
      // set the element's new position:
      elmnt.style.top = (e.clientY - diffy) + "px";
      elmnt.style.left = (e.clientX - diffx) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  dragElement(document.getElementById("stats"));
  //dragElement(document.getElementById("actions"));