fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.reqissuesall.forEach(element => {
        document.getElementById("issuelist").innerHTML = document.getElementById("issuelist").innerHTML
        + `<div class="Assets-Asset">Issue Id: ${element["ID"]}, Tag: ${element['Asset Tag']}, Issue Severity: ${element['Severity (Optional)']}, Date Added: ${element['Date Added']}, Problem Resolved: ${element['Resolved?']}, Issue Description: ${element['Problem Description']}</div>`
    });
})})