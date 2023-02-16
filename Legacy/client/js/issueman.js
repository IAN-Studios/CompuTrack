// TODO: Add more documentation

var issue;
var ID = (window.location.search.split("=")[1]);
    fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
            data = JSON.parse(b);
            data.reqissuesall.forEach(element => {
                if (element.ID == ID) {
                    issue = element;
                    const levels = document.querySelectorAll('input[name="level"]')
                    const resolution = document.querySelectorAll('input[name="resolutionpolicy"]')
                    document.getElementById("issueID").value = `${issue.ID}`;
                    document.getElementById("assettag").value=`${issue['Asset Tag']}`
                    if (issue['Severity (Optional)'] = "Normal") {
                        levels[0].checked = true;
                    } else {
                        levels[1].checked = true;
                    }
                    console.log(issue['Resolved?'])
                    if (issue['Resolved?'] == 'True') {
                        resolution[0].checked = true;
                    } else if (issue['Resolved?'] == 'False') {
                        resolution[1].checked = true;
                    }
                    document.getElementById("desc").value = `${issue['Problem Description']}`
                    console.log(ID);
                }
            });
        })});