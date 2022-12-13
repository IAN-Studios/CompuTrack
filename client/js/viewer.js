// Highly Inefficient System for managing Buttons (HISB)


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
        document.getElementById("header-title").innerHTML = "Database Explorer | Home"

        var Content = document.createElement("div")
        Content.classList.add("explorer-md", "explorer-visual")

        ComponentManager.components.fetch("/client/html/components/explorer-home.html").then(e => {Content.appendChild(e.getElementById("TEMPLATE"))})
        document.getElementById("explorer-table").appendChild(Content);

        Buttons.global.forEach(button => {
            var buttn = document.createElement("button")
            buttn.onclick = button.click
            buttn.innerHTML = button.text
            buttn.classList.add("explorer-visual", "control-button")
            document.getElementById("control").appendChild(buttn)
        })
    }
    if (location.id == "explorer-table-computers") {
        
        // Change Headers
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
            table.classList.add("explorer-visual","explorer-data")
            
            var tablebody = document.createElement("tbody");
            tablebody.classList.add("explorer-visual")
            var cols = document.createElement("tr");
            cols.classList.add("explorer-visual")

            // Initialize field headers
            var col_blank = document.createElement("td");
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
            cols.append(col_blank,col_id, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_location,col_netid)
            tablebody.appendChild(cols);
            table.appendChild(tablebody);


            data.reqassets.forEach(element => {
                var cols = document.createElement("tr");
                cols.classList.add("explorer-visual","explorer-table-row")

                var selectionbutton = document.createElement('input')
                selectionbutton.type = 'checkbox'
                cols.id = element['ID'];
                selectionbutton.onclick = function() {
                    selectRecord(cols);
                }

                
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
                
                cols.append(selectionbutton, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_location,col_netid)
                tablebody.appendChild(cols);
            })

            // add all to table
            document.getElementById("loadingpage").remove()
            
            document.getElementById("explorer-table").appendChild(table);
            Buttons.devices.forEach(button => {
                var buttn = document.createElement("button")
                buttn.onclick = button.click
                buttn.innerHTML = button.text
                buttn.classList.add("explorer-visual", "control-button")
                if (button.startoff) {buttn.disabled = true; buttn.classList.add("control-button-disabled")}
                if (button.customid) buttn.id = button.customid;
                document.getElementById("control").appendChild(buttn)
            })
        })});

    }
    if (location.id == "explorer-table-issues") {
        document.getElementById("header-title").innerHTML = "Database Explorer | Tables / Issues"


        // loaddddddd
        const loadingpage = document.createElement("div")
        loadingpage.classList.add("explorer-table-loading", "explorer-visual");
        loadingpage.id = "loadingpage"
        loadingpage.innerHTML = "Retrieving Information from database.....";
        document.getElementById("explorer-table").appendChild(loadingpage);
        
        // oh boy time to copy all my code again

        fetch(new Request("/request?q=reqissuesall")).then(a => {a.text().then(b=>{
            var data = JSON.parse(b);
            var table = document.createElement("table");
            table.classList.add("explorer-visual","explorer-data")
            
            var tablebody = document.createElement("tbody");
            tablebody.classList.add("explorer-visual")
            var cols = document.createElement("tr");
            cols.classList.add("explorer-visual")

            var blank_element = document.createElement("td")

            // Initialize field headers
            var col_id = document.createElement("td");
                col_id.classList.add("explorer-visual","explorer-table-col-header")
                col_id.innerHTML = "ID"
            var col_assettag = document.createElement("td");
                col_assettag.classList.add("explorer-visual","explorer-table-col-header")
                col_assettag.innerHTML = "Asset Tag"
            var col_type = document.createElement("td");
                col_type.classList.add("explorer-visual","explorer-table-col-header")
                col_type.innerHTML = "Severity"
            var col_desc = document.createElement("td");
                col_desc.classList.add("explorer-visual","explorer-table-col-header")
                col_desc.innerHTML = "Date Added"
            var col_compliant = document.createElement("td");
                col_compliant.classList.add("explorer-visual","explorer-table-col-header")
                col_compliant.innerHTML = "Resolved?"
            var col_dateadded = document.createElement("td");
                col_dateadded.classList.add("explorer-visual","explorer-table-col-header")
                col_dateadded.innerHTML = "Problem Description"
            var col_location = document.createElement("td");
                col_location.classList.add("explorer-visual","explorer-table-col-header")
                col_location.innerHTML = "Last known location"

            // add headers to table
            cols.append(blank_element,col_id, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_location)
            tablebody.appendChild(cols);
            table.appendChild(tablebody);


            data.reqissuesall.forEach(element => {
                var cols = document.createElement("tr");
                cols.classList.add("explorer-visual","explorer-table-row")
        
                var selectionbutton = document.createElement('input')
                selectionbutton.type = 'checkbox'
                cols.id = element['ID'];
                selectionbutton.onclick = function() {
                    selectRecord(cols)
                }


                var col_id = document.createElement("td");
                    col_id.classList.add("explorer-visual","explorer-table-row-cell")
                    col_id.innerHTML = element['ID']
                var col_assettag = document.createElement("td");
                    col_assettag.classList.add("explorer-visual","explorer-table-row-cell")
                    col_assettag.innerHTML = element['Asset Tag']
                var col_type = document.createElement("td");
                    col_type.classList.add("explorer-visual","explorer-table-row-cell")
                    col_type.innerHTML = element['Severity (Optional)']
                var col_desc = document.createElement("td");
                    col_desc.classList.add("explorer-visual","explorer-table-row-cell")
                    col_desc.innerHTML = element["Date Added"]
                var col_compliant = document.createElement("td");
                    col_compliant.classList.add("explorer-visual","explorer-table-row-cell")
                    col_compliant.innerHTML = element["Resolved?"]
                var col_dateadded = document.createElement("td");
                    col_dateadded.classList.add("explorer-visual","explorer-table-row-cell")
                    col_dateadded.innerHTML = element['Problem Description']
                var col_location = document.createElement("td");
                    col_location.classList.add("explorer-visual","explorer-table-row-cell")
                    col_location.innerHTML = element['Item Location']
                
                cols.append(selectionbutton, col_id, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_location)
                tablebody.appendChild(cols);
            })

            // add all to table
            document.getElementById("loadingpage").remove()
            document.getElementById("explorer-table").appendChild(table)
            Buttons.issues.forEach(button => {
                var buttn = document.createElement("button")
                buttn.onclick = button.click
                buttn.innerHTML = button.text
                buttn.classList.add("explorer-visual", "control-button")
                if (button.startoff) {buttn.disabled = true; buttn.classList.add("control-button-disabled")}
                if (button.customid) buttn.id = button.customid;
                document.getElementById("control").appendChild(buttn)
            })
        })});
    
    
    
    
    }
    if (location.id == "explorer-table-users") {
        const welcome = document.createElement("div")
        welcome.remove()
        welcome.classList.add("explorer-table-header", "explorer-visual")
        document.getElementById("explorer-table").appendChild(welcome)
        document.getElementById("header-title").innerHTML = "Database Explorer | Tables / Users"

        // Loading Page
        const loadingpage = document.createElement("div")
        loadingpage.classList.add("explorer-table-loading", "explorer-visual");
        loadingpage.id = "loadingpage"
        loadingpage.innerHTML = "Retrieving Information from database.....";
        document.getElementById("explorer-table").appendChild(loadingpage);


    }
    if (location.id == "explorer-table-hw") {
        document.getElementById("header-title").innerHTML = "Database Explorer | Tables / Hardware"


        // Loading Hardware
    // TODO: Clean up Variables
        const loadingpage = document.createElement("div")
        loadingpage.classList.add("explorer-table-loading", "explorer-visual");
        loadingpage.id = "loadingpage"
        loadingpage.innerHTML = "Retrieving Information from database.....";
        document.getElementById("explorer-table").appendChild(loadingpage);
        fetch(new Request("/request?q=hw")).then(a => {a.text().then(b=>{
            var data = JSON.parse(b);
            var table = document.createElement("table");
            table.classList.add("explorer-visual","explorer-data")
            
            var tablebody = document.createElement("tbody");
            tablebody.classList.add("explorer-visual")
            var cols = document.createElement("tr");
            cols.classList.add("explorer-visual")

            var blank_element = document.createElement("td")

            // Initialize field headers
            var col_id = document.createElement("td");
                col_id.classList.add("explorer-visual","explorer-table-col-header")
                col_id.innerHTML = "ID"
            var col_assettag = document.createElement("td");
                col_assettag.classList.add("explorer-visual","explorer-table-col-header")
                col_assettag.innerHTML = "Brand"
            var col_type = document.createElement("td");
                col_type.classList.add("explorer-visual","explorer-table-col-header")
                col_type.innerHTML = "Model"
            var col_desc = document.createElement("td");
                col_desc.classList.add("explorer-visual","explorer-table-col-header")
                col_desc.innerHTML = "Storage"
            var col_compliant = document.createElement("td");
                col_compliant.classList.add("explorer-visual","explorer-table-col-header")
                col_compliant.innerHTML = "Form Factor"
            var col_dateadded = document.createElement("td");
                col_dateadded.classList.add("explorer-visual","explorer-table-col-header")
                col_dateadded.innerHTML = "Connection Type"
            var col_location = document.createElement("td");
                col_location.classList.add("explorer-visual","explorer-table-col-header")
                col_location.innerHTML = "Drive Type"

            // add headers to table
            cols.append(blank_element,col_id, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_location)
            tablebody.appendChild(cols);
            table.appendChild(tablebody);


            data.hw.forEach(element => {
                var cols = document.createElement("tr");
                cols.classList.add("explorer-visual","explorer-table-row")
        
                var selectionbutton = document.createElement('input')
                selectionbutton.type = 'checkbox'
                cols.id = element['ID'];
                selectionbutton.onclick = function() {
                    selectRecord(cols)
                }


                var col_id = document.createElement("td");
                    col_id.classList.add("explorer-visual","explorer-table-row-cell")
                    col_id.innerHTML = element['ID']
                var col_assettag = document.createElement("td");
                    col_assettag.classList.add("explorer-visual","explorer-table-row-cell")
                    col_assettag.innerHTML = element['Brand']
                var col_type = document.createElement("td");
                    col_type.classList.add("explorer-visual","explorer-table-row-cell")
                    col_type.innerHTML = element['Model']
                var col_desc = document.createElement("td");
                    col_desc.classList.add("explorer-visual","explorer-table-row-cell")
                    col_desc.innerHTML = element["Storage"]
                var col_compliant = document.createElement("td");
                    col_compliant.classList.add("explorer-visual","explorer-table-row-cell")
                    col_compliant.innerHTML = element["Form Factor"]
                var col_dateadded = document.createElement("td");
                    col_dateadded.classList.add("explorer-visual","explorer-table-row-cell")
                    col_dateadded.innerHTML = element['Connection Type']
                var col_location = document.createElement("td");
                    col_location.classList.add("explorer-visual","explorer-table-row-cell")
                    col_location.innerHTML = element['Drive Type']
                
                cols.append(selectionbutton, col_id, col_assettag,col_type,col_desc,col_compliant,col_dateadded,col_location)
                tablebody.appendChild(cols);
            })

            // add all to table
            document.getElementById("loadingpage").remove()
            document.getElementById("explorer-table").appendChild(table)
            Buttons.hw.forEach(button => {
                var buttn = document.createElement("button")
                buttn.onclick = button.click
                buttn.innerHTML = button.text
                buttn.classList.add("explorer-visual", "control-button")
                if (button.startoff) {buttn.disabled = true; buttn.classList.add("control-button-disabled")}
                if (button.customid) buttn.id = button.customid;
                document.getElementById("control").appendChild(buttn)
            })
        })});
    }
}

function createRecord() {

}

function editRecord() {

}

/**@param {Object} button */
function drawButton(button) {
    var buttn = document.createElement("button");
    buttn.innerHTML = button.text;
    if (button.startoff) buttn.disabled == true();
    if (button.customid) buttn.id = button.customid;
    document.getElementById("control").appendChild(buttn)
}
function openhelp(page) {

}

/**@param {HTMLElement} element */
function selectRecord(element) {
    if (modes.selectmode == 0) {
        if (element.children[0].checked == false) {element.classList.remove("selected");return;}
        Array.from(document.getElementsByClassName("selected")).forEach(item => {item.classList.remove("selected");item.children[0].checked = false})
        if (element.classList.contains('selected')) {
            element.classList.remove("selected")
        } else {
            element.classList.add("selected")
        }
        modes.selected = [];
        Array.from(document.getElementsByClassName("selected")).forEach(element => {
            modes.selected.push(element);
        })
    } else if (modes.selectmode == 1) {
        if (element.classList.contains('selected')) {
            element.classList.remove("selected")
        } else {
            element.classList.add("selected")
        }
        modes.selected = [];
        Array.from(document.getElementsByClassName("selected")).forEach(element => {
            modes.selected.push(element);
        })
    }


}

function toggleselectmode() {
    //if (modes.selectmode == 0) {modes.selectmode = 1;document.getElementById("control-modeselector").innerHTML = "Select Mode (1)"}
    //if (modes.selectmode == 1) {modes.selectmode = 0;document.getElementById("control-modeselector").innerHTML = "Select Mode (0)"}     
}

