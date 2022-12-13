class Explorer {
    static sidebar = {
        defs: {
            // Template for Future Navigation Options
            /*
                internalid: {
                    text: "Display Text",
                    id: "HTML-ELement-ID",
                    type: [PAGE/TABLE/PANEL]
                }
            */
            $SEPERATOR$: {},
            help: {
                text: "Help",
                id: "explorer-help",
                type: "PAGE"
                
            },
            devices: {
                text: "Devices",
                id: "explorer-table-computers",
                type: "TABLE",
            },
            issues: {
                text: "Issues",
                id: "explorer-table-issues",
                type: "TABLE"
            },
            users: {
                text: "Users",
                id: "explorer-table-users",
                type: "TABLE"
            },
            hw: {
                text: "Hardware",
                id: "explorer-table-hw",
                type: "TABLE"
            },
            createRecord: {
                text: "Create Record...",
                id: "explorer-crecord",
                type: "PANEL"
            },
            advancedSettings: {
                text: "Advanced Settings",
                id: "explorer-advset",
                type: "PANEL",
                click: function() {console.log("PENIS")}
            },
            securityPermissions: {
                text: "Security & Permissions",
                id: "explorer-securitypanel",
                type: "PANEL"
            }


        }
    }


    // Occam's Razor.
    static Layout = [
        this.sidebar.defs.createRecord,


        this.sidebar.defs.$SEPERATOR$,


        this.sidebar.defs.devices,
        this.sidebar.defs.issues,
        this.sidebar.defs.hw,
        this.sidebar.defs.users,
        
        
        this.sidebar.defs.$SEPERATOR$,
        
        
        this.sidebar.defs.advancedSettings,
        this.sidebar.defs.securityPermissions,
        this.sidebar.defs.help
    ]




    static goto(loc) {
        explorerGOTO(document.getElementById(loc))
    }
}