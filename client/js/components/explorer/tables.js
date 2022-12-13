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

        },
        users: {
            
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
        ]
    }

    // Used to compress layout and definitons into one object.
    //TODO: Make more efficient.
    static options = {

    }
}