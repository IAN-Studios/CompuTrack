const nmdb = require("@el3um4s/node-mdb");

class dbman {
    constructor(database) {
        this.database = database;
    }

    query = async function(sql){
        const data = await nmdb.query.sql({this:database, sql});
        return JSON.parse(data);
    }

    
}

module.exports = dbman;