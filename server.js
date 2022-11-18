// Module Imports
const http = require("http");
const ws = require("ws");
const mime = require("mime");
const dbman = require("./src/dbman")
const fs = require("fs");

const config = require("./config.json")
class application {
    constructor() {
        this.ASSETMAN = new dbman(config.database);
        this.server = http.createServer();

        // I TRUST Students to not abuse this, so for simplicity's sake I am allowing all requests to be direct paths.
        this.server.on("request", (request, response) => {
            var statuscode;
            var deeta;
            var deetatype

            try {
                var deeta = fs.readFileSync(`.${request.url}`)
                var deetatype = mime.getType(`.${request.url}`)
                var statuscode = 200
            } catch {
                if (request.url == "/") {
                    var deeta = fs.readFileSync(`./client/html/index.html`)
                    var deetatype = mime.getType(`./client/html/index.html`)
                    statuscode = 200;
                }
                var deeta = fs.readFileSync(`./client/html/404.html`)
                var deetatype = mime.getType(`./client/html/404.html`)
                statuscode = 404;
            }

            response.statusCode = statuscode;
            response.setHeader('Access-Control-Allow-Origin', '*')
            response.setHeader('Content-Type', `${deetatype}`)
            response.write(deeta);
            response.end();
        })
    }


    /**@param {Server Port} [port] Port to Listen on */
    listen = function(port) {
        server.listen(port);
    }
}

// It's Servering Time.
new application().listen(config.port);