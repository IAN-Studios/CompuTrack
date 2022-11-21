fetch(new Request("/request?q=reqassets")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.reqassets.forEach(element => {
        document.getElementById("assetlist").innerHTML = document.getElementById("assetlist").innerHTML
        + `<tr class="Assets-Asset"><td>${element['JCPS Tag']}</td><td>${element['Item Type']}</td><td>${element['Date Added']}</td><td>${element['Item Description']}</td><td>${element['Item Location']}</td></tr>`
   });
})})