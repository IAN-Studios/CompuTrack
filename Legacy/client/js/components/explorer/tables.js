class Tables {
    static defs = {
        devices: {
            cols:7,
            selectable:true, // Requres Select Mode Button Definition for Panel!

            headers: { // Always start at 0 for arrays, kid. 1-1=0, so 7-1=6. Length of 7, largest number 6.
                0: {
                    name: "Asset Tag",
                    sqlfieldname: "Asset Tag"
                },
                1: {
                    name: "Type",
                    sqlfieldname: "Type"
                },
                2: {
                    name: "Model / Description / Info",
                    sqlfieldname: "Model/Brand/Description"
                },
                3: {
                    name: "Compliance",
                    sqlfieldname: "Compliance"
                },
                4: {
                    name: "Date Added",
                    sqlfieldname: "Date Added"
                },
                5: {
                    name: "Location",
                    sqlfieldname: "Location"
                },
                6: {
                    name: "Hostname",
                    sqlfieldname: "Network ID"
                }
            }
        },
        issues: {
            cols:7,
            selectable:true,

            headers: {
                0: {
                    name: "ID",
                    sqlfieldname: "ID"
                },
                1: {
                    name: "Asset Tag",
                    sqlfieldname: "JCPS Tag"
                },
                2: {
                    name: "Severity",
                    sqlfieldname: "Severity (Optional)"
                },
                3: {
                    name: "Date Added",
                    sqlfieldname: "Date Added"
                },
                4: {
                    name: "Resolution",
                    sqlfieldname: "Resolved?"
                },
                5: {
                    name: "Description",
                    sqlfieldname: "Problem Description"
                },
                6: {
                    name: "Last Known Location",
                    sqlfieldname: "location"
                }
            }
        },
        users: {
            cols:4,
            selectable:false,

            headers: {
                0: {
                    name: "UUID",
                    sqlfieldname: "UUID"
                },
                1: {
                    name: "User Name",
                    sqlfieldname: "Username"
                },
                2: {
                    name: "Display Name",
                    sqlfieldname: "Displayname"
                },
                3: {
                    name: "Permission Group",
                    sqlfieldname: "Permissionlevel"
                }
            }
        },
        hw: {

        }
    }
    static Layout = {
        Devices: [
            this.defs.devices.headers[0],
            this.defs.devices.headers[1],
            this.defs.devices.headers[2],
            this.defs.devices.headers[3],
            this.defs.devices.headers[4],
            this.defs.devices.headers[5],
            this.defs.devices.headers[6]
        ],
        Issues: [
            this.defs.issues.headers[0],
            this.defs.issues.headers[1],
            this.defs.issues.headers[2],
            this.defs.issues.headers[3],
            this.defs.issues.headers[4],
            this.defs.issues.headers[5],
            this.defs.issues.headers[6]
        ],
        Users: [
            this.defs.users.headers[0],
            this.defs.users.headers[1],
            this.defs.users.headers[2],
            this.defs.users.headers[3]
        ]
    }

    // Used to compress layout and definitons into one object.
    //TODO: Make more efficient.
    static options = {

    }
}