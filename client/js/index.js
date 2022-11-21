var data;fetch(new Request("/request?q=currentuser")).then(a => {a.text().then(b=>{data = JSON.parse(b)})})
