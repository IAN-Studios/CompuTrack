fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.reqissuesall.forEach(element => {
        document.getElementById("issuelist").innerHTML = document.getElementById("issuelist").innerHTML
        + `<tr class="Issues-Issue"><td>${element["ID"]}</td><td>${element['Asset Tag']}</td><td>${element['Severity (Optional)']}</td><td>${element['Date Added']}</td><td>${element['Resolved?']}</td><td>${element['Problem Description']}</td><tr>`
    });
})})