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

        const server = http.createServer();

        server.listen(config.port);
    }
}


new application();