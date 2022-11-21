fetch(new Request("/request?q=reqassets")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.reqassets.forEach(element => {
        document.getElementById("assetlist").innerHTML = document.getElementById("assetlist").innerHTML
        + `<div class="Assets-Asset">Tag: ${element['JCPS Tag']}, Item Type: ${element['Item Type']}, Date Added: ${element['Date Added']}, Item Description: ${element['Item Description']}, Item Location: ${element['Item Location']}</div>`
    });
})})