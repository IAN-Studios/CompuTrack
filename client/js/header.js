function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

if (getCookie("style") == "Dark") {
    var mode = 1;
    document.getElementById("theme").href = "/client/css/themes/darkmode.css";
} else if (!getCookie("Style")) {
    document.getElementById("theme").href = "/client/css/themes/default.css";
    var mode = 0;
}
function changetheme() {
    if (mode == 0) {
        document.cookie = `style=Dark; path=/;`
        document.getElementById("theme").href = "/client/css/themes/darkmode.css";
        mode = 1;
    } else if (mode == 1) {
        document.cookie = 'style=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        document.getElementById("theme").href = "/client/css/themes/default.css";
        mode = 0;
    }
}