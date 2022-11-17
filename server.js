// Module Imports
const http = require("http");
const ws = require("ws");
const mime = require("mime");
const dbman = require("./src/dbman")
const fs = require("fs");

const configuration = JSON.parse(fs.readFileSync("./config.json"))
class application {
    constructor(configfile) {

    }
}


new application();