fetch(new Request("/request?q=reqissuesunresolved&reqissuesresolved&reqassets&reqissuesall")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    document.getElementById('stats').innerHTML = document.getElementById('stats').innerHTML
    + `<div class="dashboard-statistic">Items Asseted:<span style="float:right">${data.reqassets.length}</span></div>`
    + `<div class="dashboard-statistic">Issue Count:<span style="float:right">${data.reqissuesall.length}</span></div>`
    + `<div class="dashboard-statistic">Unresolved Issues:<span style="float:right">${data.reqissuesunresolved.length}</span></div>`
    + `<div class="dashboard-statistic">Resolved Issues:<span style="float:right">${data.reqissuesresolved.length}</span></div>`
})})