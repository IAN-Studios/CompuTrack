class COMman {
    constructor() {
        
        this.components = {
            /**
             * @param {String} file
             * @returns {HTMLElement} Output Element Cluster
             */
            fetch: async function(file) {
                return await fetch(new Request(file)).then(async(a)=>{return await a.text().then(content => {
                    var parser = new DOMParser();
                    const result = parser.parseFromString(content, "text/html");
                    return result;
                })})
            } 
        }
    }
}
const ComponentManager = new COMman();