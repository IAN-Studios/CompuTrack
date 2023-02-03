
// Basic Function for fetching Cookies (Yum) (Used for fetching user prefrences such as account details and theme color)
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
  document.getElementById("logoutbutton").innerHTML = `Logout ${getCookie("account")}` // Fetches account name for the welcome message and logout button



// Fetches database information for use in the statistics pane
fetch(new Request("/request?q=reqissuesunresolved&reqissuesresolved&reqassets&reqissuesall")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);


    // Shut up if you are thinking about how this method of HTML DOM Element addition is "inefficient", it's a little impractical, easier than a loop, and I like it.
    document.getElementById('stats').innerHTML = document.getElementById('stats').innerHTML
    + `<div class="dashboard-statistic">Items Asseted:<span style="float:right">${data.reqassets.length}</span></div>`
    + `<div class="dashboard-statistic">Issue Count:<span style="float:right">${data.reqissuesall.length}</span></div>`
    + `<div class="dashboard-statistic">Unresolved Issues:<span style="float:right">${data.reqissuesunresolved.length}</span></div>`
    + `<div class="dashboard-statistic">Resolved Issues:<span style="float:right">${data.reqissuesall.length-data.reqissuesunresolved.length}</span></div>` 
    + `<div class="dashboard-statistic">Issue Resolution %:<span style="float:right">${Math.round((data.reqissuesresolved.length/data.reqissuesall.length) *10000)/100}%</span></div>` 
})})



// Yet Another Fetch for the welcome message
var displayname
fetch(new Request("/request?q=currentuser")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.userinfo.forEach(element => {
        if (element.Username.toLowerCase() == getCookie("account")) {
            displayname = element.Displayname;
            document.getElementById("title").innerHTML = `<div>Welcome back, ${displayname}.</div>`
        }
    });
})}) 











// legacy Code for movable parts of the dashboard, may be implemented lated -siebert
/*
function dragElement(elmnt) {  
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

  */
  //  dragElement(document.getElementById("stats"));
  //  dragElement(document.getElementById("cock"));
  //  dragElement(document.getElementById("actions"));