var dialogopen = 0;


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
    if (dialogopen == 1) {alert("No Paradoxes");return;}
    var ele= Array.from(document.getElementsByClassName("Selected"))[0]
    fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
        data = JSON.parse(b);
        data.reqissuesall.forEach(element => {
            if (element.ID == Array.from(ele.children)[0].innerHTML) issue = element;
        });
        window.location.search = `?mode=MODIFY&ID=${issue.ID}`
    })})
}



function CreateIssue(issueobj) {
    console.log(issueobj);
    
}

function onload() {
    if (window.location.search == "?mode=CREATE") {
        console.log("Creating new Issue");
        dialogopen = 1;
        document.getElementById("Create").disabled = true;
        document.getElementById("Create").className = "table-header-create disabled"
        document.getElementById("MANAGE").disabled = true;
        var issueman = document.getElementById('issue-manager')
        issueman.className = 'creator-window'
        issueman.src = "/client/html/issuecreator.html";
        issueman.hidden = false;
    } else if (window.location.search.startsWith("?mode=MODIFY")) {
        var ID = window.location.search.split('&')[1].split("=")[1];
        fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
            data = JSON.parse(b);
            data.reqissuesall.forEach(element => {
                if (element.ID == ID) {
                    var issue = element;
                    console.log(issue);
                    console.log("Modifying Issue");
                    dialogopen = 1;
                    document.getElementById("Create").disabled = true;
                    document.getElementById("Create").className = "table-header-create disabled"
                    document.getElementById("MANAGE").disabled = true;
                    var issueman = document.getElementById('issue-manager')
                    issueman.className = 'creator-window'
                    issueman.src = `/client/html/issueman.html?id=${ID}`;
                    issueman.hidden = false;

                }
            });
        })});
    }
}

onload();