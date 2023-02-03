/**
* @param {String} query
*/
function search(query) {
    q = query.split(" ").join("+")
    console.log(q)
    window.location.href = `/client/html/search.html?query=${q}`
}
function showsearchoptions() {
    document.getElementById("search")
}