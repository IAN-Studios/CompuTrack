class MDCompanion {
    constructor() {

        this.Convert = {
            /**
             * @param {String} file
             * @returns {HTMLElement} Output Element Cluster
             */
            fromMDFile: async function(file) {
                return await fetch(new Request(file)).then(async(a)=>{return await a.text().then(content => {
                    console.log(content);
                    const lines = content.split("\n");

                    const result = document.createElement("div");

                    lines.forEach(element => {
                        var done = 0

                        var container;
                        var containertype;



                        if (element.startsWith("*")) {
                            var list = document.createElement("ul");
                            container = list;
                            containertype = "LIST";
                        } else if (element.startsWith("##")) {
                            var newele = document.createElement("h2");
                            container = newele;
                        } else if (element.startsWith("#")) {
                            var newele = document.createElement("h1");
                            container = newele;
                        } else {
                            var newele = document.createElement("p");
                            container = newele;
                        }




                        if (element.includes("[")) {
                            var startlink = element.indexOf("[");
                            var transition = element.indexOf("](")
                            var endlink = element.indexOf(")");
                            var linktext = element.substring(startlink,transition).replace("[", "").replace("]","").replace(")", "").replace("(","");
                            var linksrc = element.substring(transition,endlink).replace("[", "").replace("]","").replace(")", "").replace("(","");
                            console.log(linktext);
                            console.log(linksrc);
                            var ele = document.createElement("a");
                            ele.href = linksrc
                            ele.innerHTML = linktext
                            if (containertype == "LIST") {
                                var span1 = document.createElement("li");
                            } else {
                                var span1 = document.createElement("span");
                            }
                            span1.innerHTML = element.substring(0,startlink).replace("* ", "").replace("#", "").replace("# ", "")
                            span1.appendChild(ele)
                            span1.innerHTML += element.substring(endlink + 1, element.length).replace("* ", "").replace("#", "").replace("# ", "")

                            console.log(span1)
                            container.appendChild(span1);  
                        } else {
                            console.log(container)
                            container.innerHTML = element.replace("* ", "").replace("#", "").replace("# ", "")
                        }









                        result.appendChild(container)
                    });
                    console.log(result)
                    return result;
                })})
            } 
        }




    }
}

