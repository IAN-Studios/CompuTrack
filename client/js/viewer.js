



class DBexplorer {
    constructor() {
        document.getElementById("explorer-home").classList.add("selected")
        explorerGOTO(document.getElementById("explorer-home"))
    }
}

/**@param {HTMLElement} location */
function explorerGOTO(location) {
    document.getElementsByClassName("selected").item(0).classList.remove("selected");
    location.classList.add("selected")
    Array.from(document.getElementsByClassName("explorer-visual")).forEach(element => {element.remove()})
    document.getElementById("header-title").innerHTML = "Database Explorer | Working....."

    if (location.id == "explorer-home") {
        const welcome = document.createElement("div")
        welcome.innerHTML = "Welcome to CompuTrack Explorer!";
        welcome.classList.add("explorer-table-header", "explorer-visual")
        document.getElementById("explorer-table").appendChild(welcome)
        document.getElementById("header-title").innerHTML = "Database Explorer | Home"
    }
    if (location.id == "explorer-table-computers") {
        
        // Change Headers
        const welcome = document.createElement("div")
        welcome.remove()
        welcome.classList.add("explorer-table-header", "explorer-visual")
        document.getElementById("explorer-table").appendChild(welcome)
        document.getElementById("header-title").innerHTML = "Database Explorer | Tables / Devices"

        // Loading Devices
        const loadingpage = document.createElement("div")
        loadingpage.classList.add("explorer-table-loading", "explorer-visual");
        loadingpage.id = "loadingpage"
        loadingpage.innerHTML = "Retrieving Information from database.....";
        document.getElementById("explorer-table").appendChild(loadingpage);
        fetch(new Request("/request?q=reqassets")).then(a => {a.text().then(b=>{
            var data = JSON.parse(b);
            var table = document.createElement("table");
            table.classList.add("explorer-visual")
            
            var tablebody = document.createElement("tbody");
            tablebody.classList.add("explorer-visual")
            var cols = document.createElement("tr");
            cols.classList.add("explorer-visual")

            // Initialize field headers
            var col_id = document.createElement("td");
                col_id.classList.add("explorer-visual","explorer-table-col-header")
                col_id.innerHTML = "ID"
            var col_assettag = document.createElement("td");
                col_assettag.classList.add("explorer-visual","explorer-table-col-header")
                col_assettag.innerHTML = "Asset Tag"
            var col_type = document.createElement("td");
                col_type.classList.add("explorer-visual","explorer-table-col-header")
                col_type.innerHTML = "Type"
            var col_desc = document.createElement("td");
                col_desc.classList.add("explorer-visual","explorer-table-col-header")
                col_desc.innerHTML = "Model/Brand/Description"
            var col_compliant = document.createElement("td");
                col_compliant.classList.add("explorer-visual","explorer-table-col-header")
                col_compliant.innerHTML = "Compliant?"
            var col_dateadded = document.createElement("td");
                col_dateadded.classList.add("explorer-visual","explorer-table-col-header")
                col_dateadded.innerHTML = "Date Added"
            var col_location = document.createElement("td");
                col_location.classList.add("explorer-visual","explorer-table-col-header")
                col_location.innerHTML = "Location"
            var col_netid = document.createElement("td");
                col_netid.classList.add("explorer-visual","explorer-table-col-header")
                col_netid.innerHTML = "NetworkID"

            // add headers to table
            cols.append(col_id, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_netid)
            tablebody.appendChild(cols);
            table.appendChild(tablebody);


            data.reqassets.forEach(element => {
                var cols = document.createElement("tr");
                cols.classList.add("explorer-visual","explorer-table-row")
    
                // Initialize field headers
                var col_id = document.createElement("td");
                    col_id.classList.add("explorer-visual","explorer-table-row-cell")
                    col_id.innerHTML = element['ID']
                var col_assettag = document.createElement("td");
                    col_assettag.classList.add("explorer-visual","explorer-table-row-cell")
                    col_assettag.innerHTML = element['JCPS Tag']
                var col_type = document.createElement("td");
                    col_type.classList.add("explorer-visual","explorer-table-row-cell")
                    col_type.innerHTML = element['Type']
                var col_desc = document.createElement("td");
                    col_desc.classList.add("explorer-visual","explorer-table-row-cell")
                    col_desc.innerHTML = element["Computer Model/Brand/Description"]
                var col_compliant = document.createElement("td");
                    col_compliant.classList.add("explorer-visual","explorer-table-row-cell")
                    col_compliant.innerHTML = element["Compliance"]
                var col_dateadded = document.createElement("td");
                    col_dateadded.classList.add("explorer-visual","explorer-table-row-cell")
                    col_dateadded.innerHTML = element['Date Added']
                var col_location = document.createElement("td");
                    col_location.classList.add("explorer-visual","explorer-table-row-cell")
                    col_location.innerHTML = element['Item Location']
                var col_netid = document.createElement("td");
                    col_netid.classList.add("explorer-visual","explorer-table-row-cell")
                    col_netid.innerHTML = element['Network ID']
                
                cols.append(col_id, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_netid)
                tablebody.appendChild(cols);
            })

            // add all to table
            document.getElementById("loadingpage").remove()
            document.getElementById("explorer-table").appendChild(table)
        })});

    }
    if (location.id == "explorer-table-issues") {
        const welcome = document.createElement("div")
        welcome.innerHTML = "Issues";
        welcome.classList.add("explorer-table-header", "explorer-visual")
        document.getElementById("explorer-table").appendChild(welcome)
        document.getElementById("header-title").innerHTML = "Database Explorer | Tables / Issues"
    }
    if (location.id == "explorer-table-users") {
        const welcome = document.createElement("div")
        welcome.innerHTML = "Users";
        welcome.classList.add("explorer-table-header", "explorer-visual")
        document.getElementById("explorer-table").appendChild(welcome)
        document.getElementById("header-title").innerHTML = "Database Explorer | Tables / Users"
    }
    if (location.id == "explorer-table-hw") {
        const welcome = document.createElement("div")
        welcome.innerHTML = "Registered Hardware";
        welcome.classList.add("explorer-table-header", "explorer-visual")
        document.getElementById("explorer-table").appendChild(welcome)
        document.getElementById("header-title").innerHTML = "Database Explorer | Tables / Hardware"
    }
}