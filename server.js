// Module Imports
const https = require("https");
const ws = require("ws");
const mime = require("mime");
const dbman = require("./src/dbman")
const fs = require("fs");

const config = require("./config.json");
const { runInThisContext } = require("vm");

wsp = config.Websocketserver.port
const options = {
    key: fs.readFileSync("./cert/cert.key"),
    cert: fs.readFileSync("./cert/cert.cer")
  };

// Client Object used in the authdClients Protocol as a login method
class application {
    constructor() {
        this.ASSETMAN = new dbman("./db/cred.mdb");
        this.webserver = https.createServer(options);
        this.websocketserver = new ws.Server({
            server:this.webserver,
        })
        this._authdClients = [];

        // Used for timestamps when logging
        this.stamp = function() {
            const now = new Date()
            var stamp = `[${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} @ ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] `
            return stamp;
        }


    // Time to Initalize Databases
        this.database = {
            LoginInfo,
            UserInfo,
            Assets,
            Issues: {
                All,
                Unresolved,
                Resolved
            }
        }
        // this.database.LoginInfo Fetch
        this.ASSETMAN.Credentials.fetchUserInfo().then(r=>{this.database.LoginInfo = Array.from(r);console.log(this.stamp() + `[APP] Loaded User Information From Database`)});
        // this.database.UserInfo

        // this.database.Assets

        // this.database.Issues.All



        // I TRUST Students to not abuse this, so for simplicity's sake I am allowing all requests to be direct paths.
        this.webserver.on("request", (request, response) => {
            var statuscode;
            var deeta;
            var deetatype


            //Favicon Load Before Client Authentication
            if (request.url == "/client/assets/icon.png") {
                var deeta = fs.readFileSync(`.${request.url}`)
                var deetatype = mime.getType(`.${request.url}`)

                response.statusCode = 200
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.setHeader('Content-Type', `${deetatype}`)
                response.write(deeta);
                response.end();
                return;
            }

            // Check if client is on authenticated list
            if (!this._authdClients.includes(request.socket.remoteAddress)) {
                var deeta = fs.readFileSync(`./client/html/login.html`)
                response.statusCode = 401;
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.setHeader('Content-Type', `Text/HTML`)
                response.write(deeta);
                response.end();
                return;
            }

            // Check if request includes database path
            if (request.url.startsWith("/db")) {
                response.statusCode = 301
                response.setHeader('Location', `/client/html/index.html`)
                response.write();
                response.end();
                return;
            }

            // Client Information Retrival System 
            // (Uses specific parameters to control data flow, and the SQL Queries are predefined & server-side only)

            if (request.url.startsWith("/request?q=")) {
                const req = request.url.slice(11).split("&")
                console.log(req)
                // Types of Requests
                const reqlist = [ "stats", "reqassets", "reqissues", "currentuser", "user" ];
                var res = "{"

                req.forEach(element => {
                    if (element == "stats") {
                        res = res + "STATS"
                    } else if (element == "reqassets") {
                        res = res + "REQASSETS"
                    } else if (element == "reqissues") {
                        res = res + "REQISSUES"
                    } else if (element == "currentuser") {
                        res = res + JSON.stringify(this.UserInfo);
                    } else {
                        console.log("client sent uh oh!")
                    }
                });
                res = res + "}"
                response.statusCode = 200;
                response.write(res);
                response.end();
                return;
            }





            // Handle Logout Request
            if (request.url == "/client/logout") {
                    response.statuscode = 200;
                    this._authdClients.splice(this._authdClients.indexOf(request.socket.remoteAddress), 1)
                    console.log(this._authdClients);
                    response.setHeader('Content-Type', `Text/HTML`)
                    response.write("<script>window.location.href = '/'</script>"); // smart way of doing something without use 301 status code
                    response.end()
                    return;
            }
        
            // Main Request Handler
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
                if (data.toString().startsWith("[AUTH]AUTHENTICATE(")) {
                    var msg = data.toString().replace("[AUTH]AUTHENTICATE(", "").replace(")", "");
                    var cred = msg.split(",");
                    if (cred.length != 2) {
                        // INTERNAL SERVER ERROR: PASSWORDS SHOULD NOT INCLUDE: () OR ,
                        console.log("Uh oh");
                        websocket.send("[ERR]Uhoh")
                        return;
                    }
                    console.log(this.stamp() + `[WSS] Validating Credentials of user ${cred[0]}`)

                    var auth = 0;
                    // Check database for client
                    console.log(cred)
                    this.UserInfo.forEach(item => {
                        if ((cred[0].toLowerCase() == item.Username.toLowerCase()) && (cred[1] == item.Password)) {
                            console.log(this.stamp() + `[WSS] Credientials of user ${cred[0]} Authorized.`)
                            this._authdClients.push(client.socket.remoteAddress)
                            websocket.send("[AUTH]200OK")
                            auth = 1;
                        }
                    })
                    if (auth == 0) {
                        console.log(this.stamp() + `[WSS] Credientials of user ${cred[0]} Unauthorized`)
                        websocket.send("[AUTH]401UNAUTHORIZED")
                        return;
                    }
                }


            
            })
        })
        this.websocketserver.on("listening",() => {console.log(this.stamp() + `[WSS] Websocket Server Listening on HTTPS Webserver listening on ${config.Webserver.port}, marking as READY.`);})
    }


    /**@param {Server Port} [port] Port to Listen on */
    Webserverlisten = function(port) {
        this.webserver.listen(port);
        console.log(this.stamp() + `[HTTP] Webserver Listening on port ${port}, marking as READY.`);
    }
}

// It's Servering Time.
new application().Webserverlisten(config.Webserver.port);