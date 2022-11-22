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