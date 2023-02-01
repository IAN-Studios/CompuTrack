fetch(new Request("/request?q=reqassets")).then(a => {a.text().then(b=>{
    data = JSON.parse(b);
    data.reqassets.forEach(element => {
        document.getElementById("assetlist").innerHTML = document.getElementById("assetlist").innerHTML
        + `<tr class="Assets-Asset" id="${element["JCPS Tag"]}" onclick="selectIssue(${element['JCPS Tag']})"><td>${element['JCPS Tag']}</td><td>${element['Type']}</td><td>${element['Date Added']}</td><td>${element['Computer Model/Brand/Description']}</td><td>${element['Item Location']}</td></tr>`
   });
})})


function selectIssue(elementid) {
    Array.from(document.getElementsByClassName("Selected")).forEach(element => {element.className = "Issues-Issue"});
    document.getElementById(elementid).className="Issues-Issue Selected"
}