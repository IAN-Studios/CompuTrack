// Module Imports
const http = require("http");
const ws = require("ws");
const mime = require("mime");
const dbman = require("./src/dbman")
const fs = require("fs");

const config = require("./config.json");
const { WebSocketServer } = require("ws");
const { threadId } = require("worker_threads");

wsp = config.Websocketserver.port


// Client Object used in the authdClients Protocol as a login method
class authorizedclient {
    constructor(ipaddr) {
        this.ipaddr = ipaddr;
    }
}
class application {
    constructor() {
        this.ASSETMAN = new dbman(config.database);
        this.webserver = http.createServer();
        this.websocketserver = new ws.WebSocketServer({port:wsp})
        this._authdClients = [];

        // Used for timestamps when logging
        this.stamp = function() {
            const now = new Date()
            var stamp = `[${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} @ ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] `
            return stamp;
        }



        

        // I TRUST Students to not abuse this, so for simplicity's sake I am allowing all requests to be direct paths.
        this.webserver.on("request", (request, response) => {
            var statuscode;
            var deeta;
            var deetatype

            // Check if client is on authenticated list
            if (!this._authdClients.includes(new authorizedclient(request.socket.remoteAddress))) {
                var deeta = fs.readFileSync(`./client/html/login.html`)
                var deetatype = mime.getType(`./client/html/login.html`)
                statuscode = 401;
                response.statusCode = statuscode;
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.setHeader('Content-Type', `${deetatype}`)
                response.write(deeta);
                response.end();
                return;
            }





            try {
                var deeta = fs.readFileSync(`.${request.url}`)
                var deetatype = mime.getType(`.${request.url}`)
                var statuscode = 200
            } catch {
                if (request.url == "/") {
                    var deeta = fs.readFileSync(`./client/html/index.html`)
                    var deetatype = mime.getType(`./client/html/index.html`)
                    response.setHeader('Location', `/client/html/index.html`)
                    statuscode = 301;
                    response.statusCode = statuscode;
                    response.setHeader('Access-Control-Allow-Origin', '*')
                    response.setHeader('Content-Type', `${deetatype}`)
                    response.end();
                    return;
                } else {
                var deeta = fs.readFileSync(`./client/html/404.html`)
                var deetatype = mime.getType(`./client/html/404.html`)
                statuscode = 404;
                }
            }

            response.statusCode = statuscode;
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Content-Type', `${deetatype}`)
            response.write(deeta);
            response.end();
        })


        this.websocketserver.addListener("connection", (websocket, client) => {
            var cliaddr = `${client.socket.remoteAddress}:${client.socket.remotePort}`
            console.log(this.stamp() + `[WSS] Connection Established to  (${cliaddr})`);
            websocket.on("close", () => {console.log(this.stamp() + `[WSS] Connection Disconnected to (${cliaddr})`);})
            websocket.on("message", (data) => {
                console.log(this.stamp() + `[WSS] Message Recieved from client (${cliaddr}): ${data}`);
            })
        })
        this.websocketserver.on("listening",() => {console.log(this.stamp() + `[WSS] Websocket Server Listening on port 444, marking as READY.`);})
    }


    /**@param {Server Port} [port] Port to Listen on */
    Webserverlisten = function(port) {
        this.webserver.listen(port);
        console.log(this.stamp() + `[HTTP] Webserver Listening on port ${port}, marking as READY.`);
    }
}

// It's Servering Time.
new application().Webserverlisten(config.Webserver.port);