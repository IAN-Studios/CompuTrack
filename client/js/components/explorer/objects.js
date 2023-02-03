class Objects {
    static Panels = {
        home : {
            href:"/client/html/components/explorer/explorer-home.html",
            id: "home"
        },
        recordCreate: {
            href:"/client/html/components/explorer/explorer-recordcreator.html",
            id: "CreateRecord"
        },
        properties: {
            href:"/client/html/components/explorer/explorer-recordproperties.html",
            id: "RecordProperties"
        },
        advancedSettings: {
            href:"/client/html/components/explorer-home.html"
        },
        securityPermissions: {
            href:"/client/html/components/explorer-home.html"
        },
        help: {
            href:"/client/html/components/explorer-home.html"
        }
    }
    static Layouts = {
        Panels: [

        ]
    }
    /**
     * @returns {(Object|Boolean)} Object requested, or False.
     * @param {String} query 
     */
    static Fetch(query) {
        for (const i in this.Panels) {
            if (query == this.Panels[i].id) {
                return this.Panels[i]
            }
        }
        console.warn("Attempted fetch of unknown object ID!")
        return false
    }
}