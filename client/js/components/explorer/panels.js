class Panels {
    static LoadPanel(panel) {
        const content = document.getElementById("explorer-table");
        const panelOBJ = Objects.Fetch(panel);
        if (panelOBJ == false) return panelOBJ;
        const newpanel = document.createElement("iframe");
        newpanel.id = "panel"
        newpanel.src = panelOBJ.href;
        content.appendChild(newpanel)
    }
}   
