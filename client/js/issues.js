fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.reqissuesall.forEach(element => {
        document.getElementById("issuelist").innerHTML = document.getElementById("issuelist").innerHTML
        + `<tr class="Issues-Issue" id="${element['ID']}" onclick="selectIssue(${element['ID']})"><td>${element["ID"]}</td><td>${element['Asset Tag']}</td><td>${element['Severity (Optional)']}</td><td>${element['Date Added']}</td><td>${element['Resolved?']}</td><td>${element['Problem Description']}</td><tr>`
    });
})})

function selectIssue(elementid) {
    document.getElementById("MANAGE").className = "table-header-manage";
    document.getElementById("MANAGE").disabled = false; 
    Array.from(document.getElementsByClassName("Selected")).forEach(element => {element.className = "Issues-Issue"});
    document.getElementById(elementid).className="Issues-Issue Selected"
}

function manage() {
    var ele= Array.from(document.getElementsByClassName("Selected"))[0]
    fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
        data = JSON.parse(b);
        data.reqissuesall.forEach(element => {
            if (element.ID == Array.from(ele.children)[0].innerHTML) issue = element;
        });
    })})
}