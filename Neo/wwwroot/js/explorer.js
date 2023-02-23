// Implementing Javascript Later, c# First.
// TODO: Work

class exp {

    navigation_select(NavigationID) {
        var selection = document.getElementById(NavigationID);
        var selectables = document.getElementsByClassName("explorer-navbar-item");
        Array.from(selectables).forEach(item => {
            if (item.classList.contains("explorer-navbar-item-selected")) item.classList.remove("explorer-navbar-item-selected");
            if (item.id == selection.id) item.classList.add("explorer-navbar-item-selected");
        })
        document.getElementById("explorer-navbar-header-text").innerHTML = `Explorer - ${selection.innerText}`;
    }
}
Explorer = new exp();