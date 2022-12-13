class Controls {
    static vars = {
        selectmode:0,
        selected:[]
    }
    static methods = {
        toggleselectmode: function() {
            if (Controls.vars.selectmode == 0) {
                Controls.vars.selectmode = 1
            } else {
                Controls.vars.selectmode = 0
            }
        }
    }
    static def = {
        global: {
            help: {
                text: "Help",
                icon: "help.svg",
                click: openhelp("global")
            }
        },
        devices: {
            create: {
                text: "Create New Record",
                icon: "new.svg",
                click: createRecord("devices")
            },
            properties: {
                text: "Device Properties",
                icon: "help.svg",
                click: openhelp("devices"),
                startoff: true,
                customid: "control-properties"
    
            },
            newissue: {
                text: "Create Issue",
                icon: "help.svg",
                click: openhelp("devices")
    
            },
            selectmode: {
                text: "Select Mode (0)",
                icon: "mode.svg",
                click: this.methods.toggleselectmode(),
                customid: "control-modeselector"
            },
            help: {
                text: "Help",
                icon: "help.svg",
                click: openhelp("devices")
            }
        },
        issues: {
            create: {
                text: "New Issue",
                icon: "new.svg",
                click: openhelp("issues")
            },
            properties: {
                text: "Issue Properties",
                icon: "help.svg",
                click: openhelp("issues"),
                startoff: true,
                customid: "control-properties"
            },
            selectmode: {
                text: "Select Mode (0)",
                icon: "mode.svg",
                click: this.methods.toggleselectmode(),
                customid: "control-modeselector"
            },
            help: {
                text: "Help",
                icon: "help.svg",
                click: openhelp("issues")
            }
        },
        users: {
            help: {
                text: "help",
                icon: "help.svg",
                click: openhelp("users")
            },
            properties: {
    
            }
        },
        hw: {
            create: {
                text: "New Record",
                icon: "new.svg",
                click: openhelp("issues")
            },
            properties: {
                text: "Properties",
                icon: "help.svg",
                click: openhelp("issues"),
                startoff: true,
                customid: "control-properties"
            },
            selectmode: {
                text: "Select Mode (0)",
                icon: "mode.svg",
                click: this.methods.toggleselectmode(),
                customid: "control-modeselector"
            },
            help: {
                text: "Help",
                icon: "help.svg",
                click: openhelp("issues")
            }
        }
    }

    // This defines what buttons, and in what order, appear on which panel.
    static Layout = {
        Global: [
            this.def.global.help
        ],
        Devices: [
            this.def.devices.create,
            this.def.devices.properties,
            this.def.devices.newissue,
            this.def.devices.selectmode,
            this.def.devices.help
        ],
        Issues: [
            this.def.issues.create,
            this.def.issues.properties,
            this.def.issues.selectmode,
            this.def.issues.help
        ],
        Users: [
            this.def.users.properties,
            this.def.users.help
        ],
        HW: [
            this.def.hw.create,
            this.def.hw.properties,
            this.def.hw.selectmode,
            this.def.hw.help
        ]
    }
}