var mode = 0;
function changetheme() {
    if (mode == 0) {
        document.getElementById("theme").href = "/client/css/themes/darkmode.css";
        mode = 1;
    } else if (mode == 1) {
        document.getElementById("theme").href = "/client/css/themes/default.css";
        mode = 0;
    }
}