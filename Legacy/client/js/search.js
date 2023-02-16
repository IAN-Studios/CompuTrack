class Search {
    constructor() {
        this.data = undefined
        this.query = window.location.search.replace("?query=","").split("&")


        fetch(new Request("/request?q=reqassets&reqissuesall&currentuser")).then(a => {a.text().then(b=>{this.data = JSON.parse(b);

            var candidates = []
            var data = JSON.parse(b)
            this.query.forEach(ele => {
            if (this.query == "") {
                document.getElementById("resultshead").innerHTML = "Query Empty, Displaying all info."
                data.reqassets.forEach(element => {
                    var row = document.createElement("tr")
                    var tablename = document.createElement("td")
                    tablename.innerHTML = "ASSETS"
                    var id = document.createElement("td")
                    id.innerHTML = element['ID']
                    var tag = document.createElement("td")
                    tag.innerHTML = element['JCPS Tag']
                    var type = document.createElement("td")
                    type.innerHTML = element['Item Type']
                    var dateadded = document.createElement("td")
                    dateadded.innerHTML = element['Date Added']
                    var desc = document.createElement("td")
                    desc.innerHTML = element['Item Description']
                    var loc = document.createElement("td")
                    loc.innerHTML = element['Item Location']
                    row.appendChild(tablename)
                    row.appendChild(id)
                    row.appendChild(tag)
                    row.appendChild(type)
                    row.appendChild(dateadded)
                    row.appendChild(desc)
                    row.appendChild(loc)
                    document.getElementById("resultsbody").appendChild(row)
                });
                data.reqissuesall.forEach(element => {
                    var row = document.createElement("tr")
                    var id = document.createElement("td")
                    var tablename = document.createElement("td")
                    tablename.innerHTML = "ISSUES"
                    id.innerHTML = element['ID']
                    var tag = document.createElement("td")
                    tag.innerHTML = element['Asset Tag']
                    var desc = document.createElement("td")
                    desc.innerHTML = element['Problem Description']
                    var resolutionpolicy = document.createElement("td")
                    resolutionpolicy.innerHTML = element['Resolved?']
                    var severity = document.createElement("td")
                    severity.innerHTML = element['Severity (Optional)']
                    row.appendChild(tablename)
                    row.appendChild(id)
                    row.appendChild(tag)
                    row.appendChild(resolutionpolicy)
                    row.appendChild(severity)
                    row.appendChild(desc)
                    document.getElementById("resultsbody").appendChild(row)
                });
                data.userinfo.forEach(element => {
                    var row = document.createElement("tr")
                    var id = document.createElement("td")
                    var tablename = document.createElement("td")
                    tablename.innerHTML = "USERS"
                    id.innerHTML = element['UUID']
                    var tag = document.createElement("td")
                    tag.innerHTML = element['Username']
                    var type = document.createElement("td")
                    type.innerHTML = element['Displayname']
                    var dateadded = document.createElement("td")
                    dateadded.innerHTML = element['PermissionLevel']
                    row.appendChild(tablename)
                    row.appendChild(id)
                    row.appendChild(tag)
                    row.appendChild(type)
                    row.appendChild(dateadded)
                    document.getElementById("resultsbody").appendChild(row)
                })
            } else if (ele.startsWith("issue:")) {
                document.getElementById("resultshead").innerHTML = this.query
                data.reqissuesall.forEach(element => {
                    if (candidates.includes(element)) return
                    if (element['ID'] == ele.replace("issue:","")) {
                        candidates.push(element);
                    }
                });
            } else if (ele.startsWith("asset:")) {
                document.getElementById("resultshead").innerHTML = this.query
                data.reqassets.forEach(element => {
                    if (candidates.includes(element)) return;
                    if (element['JCPS Tag'] == ele.replace("asset:","")) {
                        candidates.push(element);
                    }
                });
                data.reqissuesall.forEach(element => {
                    if (candidates.includes(element)) return;
                    if (element['Asset Tag'] == ele.replace("asset:","")) {
                        candidates.push(element);
                    }
                });
            }
            if ((document.getElementById("resultsbody").innerHTML == "")||(document.getElementById("resultsbody").innerHTML == undefined)) {
                document.getElementById("resultshead").innerHTML = "No Results found."
            }
        });
        console.log(candidates)
        })})
    }
}


var query = new Search()


Search