// Module Imports
const https = require("https");
const ws = require("ws");
const mime = require("mime");
const dbman = require("./src/dbman")
const fs = require("fs");

const config = require("./config.json");
const { runInThisContext } = require("vm");
const { throws } = require("assert");

wsp = config.Websocketserver.port
const options = {
    key: fs.readFileSync("./cert/cert.key"),
    cert: fs.readFileSync("./cert/cert.cer")
  };

// Client Object used in the authdClients Protocol as a login method
class application {
    constructor() {
        this.ASSETMAN = new dbman("./db/computrack-database.mdb");
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
        this.database = {Issues:{}}
        // Hugemongeous Block of code to dictate loading of all database items

        this.updateDB()


        // I TRUST Students to not abuse this, so for simplicity's sake I am allowing all requests to be direct paths.
        this.webserver.on("request", (request, response) => {
            var statuscode;
            var deeta;
            var deetatype


            //Favicon Load Before Client Authentication
            if (request.url == "/client/assets/icon.png") {
                var deeta = fs.readFileSync(`./client/assets/icon.svg`)
                var deetatype = mime.getType(`./client/assets/icon.svg`)

                response.statusCode = 200
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.setHeader('Content-Type', `${deetatype}`)
                response.write(deeta);
                response.end();
                return;
            }

            var authorized = 0;
            this._authdClients.forEach(element => {  
                if (element.address == request.socket.remoteAddress) authorized = 1;
            })
            // Check if client is on authenticated list
            if (authorized == 0) {
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

                // Types of Requests
                const reqlist = [ "stats", "reqassets", "reqissues", "currentuser", "user"];
                var res = "{"

                req.forEach(element => {
                    if (element == "stats") {
                        res = res + `"stats":${JSON.stringify(this.database.Statistics)}`
                    } else if (element == "reqassets") {
                        res = res + `"reqassets":${JSON.stringify(this.database.Assets)}`
                    } else if (element == "reqissuesall") {
                        res = res + `"reqissuesall":${JSON.stringify(this.database.Issues.All)}`
                    } else if (element == "reqissuesunresolved") {
                        res = res + `"reqissuesunresolved":${JSON.stringify(this.database.Issues.Unresolved)}`
                    } else if (element == "reqissuesresolved") {
                        res = res + `"reqissuesresolved":${JSON.stringify(this.database.Issues.Resolved)}`
                    } else if (element == "currentuser") {
                        res = res + `"userinfo":${JSON.stringify(this.database.UserInfo)}`
                    } else {
                        console.log("client sent uh oh!")
                    }
                    res = res + ","
                });
                res = res + `"end":"end"}`
                response.statusCode = 200;
                response.write(res);
                response.end();
                return;
            }




            // Handle Logout Request
            if (request.url == "/client/logout") {
                    response.statuscode = 200;
                    this._authdClients.forEach(element => {
                        if (element.address == request.socket.remoteAddress) this._authdClients.splice(this._authdClients.indexOf(element), 1)
                    })
                    console.log(this._authdClients);
                    response.setHeader('Content-Type', `Text/HTML`)
                    response.write("<script>window.location.href = '/'</script>"); // smart way of doing something without use 301 status code
                    response.end()
                    return;
            }

            if (request.url.startsWith("/client/html/issues.html")) {
                var deeta = fs.readFileSync(`./client/html/issues.html`)
                var deetatype = mime.getType(`./client/html/issues.html`)
                var statuscode = 200
                response.statusCode = statuscode;
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.setHeader('Content-Type', `${deetatype}`)
                response.write(deeta);
                response.end();
                return
            }
            if (request.url.startsWith("/client/html/search.html")) {
                var deeta = fs.readFileSync(`./client/html/search.html`)
                var deetatype = mime.getType(`./client/html/search.html`)
                var statuscode = 200
                response.statusCode = statuscode;
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.setHeader('Content-Type', `${deetatype}`)
                response.write(deeta);
                response.end();
                return
            }
            if (request.url.startsWith("/client/html/issueman.html")) {
                var deeta = fs.readFileSync(`./client/html/issueman.html`)
                var deetatype = mime.getType(`./client/html/issueman.html`)
                var statuscode = 200
                response.statusCode = statuscode;
                response.setHeader('Access-Control-Allow-Origin', '*')
                response.setHeader('Content-Type', `${deetatype}`)
                response.write(deeta);
                response.end();
                return
            }
        
            // Main Request Handler
            try {
                var deeta = fs.readFileSync(`.${request.url}`)
                var deetatype = mime.getType(`.${request.url}`)
                var statuscode = 200
            } catch {
                if ((request.url == "/")||(request.url.startsWith("/client/html/index.html"))||(request.url == "/?")) {
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
                   this.database.LoginInfo.forEach(item => {
                        if ((cred[0].toLowerCase() == item.Username.toLowerCase()) && (cred[1] == item.Password)) {
                            console.log(this.stamp() + `[WSS] Credientials of user ${cred[0]} Validated.`)
                            var Username = item.Username.toLowerCase();
                            var addr = client.socket.remoteAddress;
                            this._authdClients.push({address:addr, username:Username})
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

                // Database Handler
                if (data.toString().startsWith("DATABASE")) {
                    if (data.toString().startsWith("DATABASE.UPDATE")) {
                        var trim1 = data.toString().replace("DATABASE.UPDATE(data=[", "")
                        var trim2 = trim1.substring(0, trim1.length-2);
                        var updatedata = trim2.split(";,;");
                        this.ASSETMAN.Issues.update(updatedata[0], `[Asset Tag] = ${updatedata[1]}, [Severity (Optional)] = '${updatedata[2]}', [Resolved?] = ${updatedata[3]}, [Problem Description] = '${updatedata[4]}'`).then(() => {this.updateDB().then(setTimeout(() => {websocket.send("200OK")},1000))})
                    } else if (data.toString().startsWith("DATABASE.NEWISSUE")) {
                        var trim1 = data.toString().replace("DATABASE.NEWISSUE(data=[", "")
                        var trim2 = trim1.substring(0, trim1.length-2);
                        var updatedata = trim2.split(";,;");
                        this.ASSETMAN.Issues.new(updatedata[0],updatedata[1],updatedata[2]).then(() => {this.updateDB().then(setTimeout(() => {websocket.send("200OK")},1000))})
                    }
                    websocket.send("[DATABASE]500INTERNALSERVERERROR");
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





    
    async updateDB() {
        await this.ASSETMAN.Credentials.fetchUserLoginInfo().then(r=>{this.database.LoginInfo = r;console.log(this.stamp() + `[APP] Loaded User Login Information From Database`)}).catch((err) => {console.log(this.stamp() + `[APP] ${err} Failed to load Database`)})
        await this.ASSETMAN.Credentials.fetchUserInfo().then(r=>{this.database.UserInfo = r;console.log(this.stamp() + `[APP] Loaded User Profiles From Database`)}).catch((err) => {console.log(this.stamp() + `[APP] ${err} Failed to load Database`)})
        await this.ASSETMAN.Assets.devices.fetchAll().then(r=>{this.database.Assets = r;console.log(this.stamp() + `[APP] Loaded Assets From Database`)}).catch((err) => {console.log(this.stamp() + `[APP] ${err} Failed to load Database`)})
        await this.ASSETMAN.Issues.fetchAll().then(r=>{this.database.Issues.All = r;console.log(this.stamp() + `[APP] Loaded Issues.ALL From Database`)}).catch((err) => {console.log(this.stamp() + `[APP] ${err} Failed to load Database`)})
        await this.ASSETMAN.Issues.fetchAllUnresolved().then(r=>{this.database.Issues.Unresolved = r;console.log(this.stamp() + `[APP] Loaded Issues.UNRESOLVED From Database`)}).catch((err) => {console.log(this.stamp() + `[APP] ${err} Failed to load Database`)})
        await this.ASSETMAN.Issues.fetchAllResolved().then(r=>{this.database.Issues.Resolved = r;console.log(this.stamp() + `[APP] Loaded Issues.RESOLVED From Database`)}).catch((err) => {console.log(this.stamp() + `[APP] ${err} Failed to load Database`)})
    }

}

// It's Servering Time.
new application().Webserverlisten(config.Webserver.port);