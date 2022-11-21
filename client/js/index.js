
var userinfo;
fetch(new Request("/request?q=currentuser")).then(a => {a.text().then(b=>{userinfo = JSON.parse(b).userinfo})})
