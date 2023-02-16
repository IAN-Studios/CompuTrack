class Renderer {
    static renderSideBar() {
        var sidebar = document.getElementById("sidebar")
        Explorer.Layout.forEach(item => {
            if (item == Explorer.sidebar.defs.$SEPERATOR$) {
                var seperator = document.createElement("div")
                seperator.classList.add("explorer-sidebar-spacer")
                sidebar.appendChild(seperator);
            } else {
                var block = document.createElement("div");
                block.innerHTML = item.text;
                block.id = item.id;
                
                block.addEventListener("click", (ele) => explorerGOTO(block));
                if (item.click) {
                    block.addEventListener("exploreselected", () => item.click());
                }
                block.classList.add("explorer-sidebar-item")
                sidebar.appendChild(block)
            }
        })
        var footer = document.createElement('div')
        footer.innerHTML = "Copyright (C) LOLOLOLOL 2022<br/>EHS Tech Department & IAN Studios"
        footer.classList.add("explorer-sidebar-footer")
        
        sidebar.appendChild(footer)
        document.getElementById("explorer-home").classList.add("explorer-tree-selected")
        explorerGOTO(document.getElementById("explorer-home"))
    }
    static renderTable(panel, table) {
        
    }
    static renderText(panel, table) {

    }
    static renderForm(panel, form) {

    }
}