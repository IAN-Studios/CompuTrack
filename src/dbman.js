const nmdb = require("@el3um4s/node-mdb");

// Be thankful I use Javadoc for documentation
class dbman {
    /**@param {database} database database to manage*/
    constructor(database) {
        this.database = database;
        
        /**@param Assets Manage Assets */
        this.Assets = {
            fetchAll: async function() {
                var sql = `
                SELECT Assets.*
                FROM Assets;
                `
                var data = await nmdb.query.sql({this:database, sql})
                return JSON.parse(data);
            },
            fetch: async function(sql) {
                var data = await nmdb.query.sql({this:database, sql})
                return JSON.parse(data);
            }
        }
        /**@param Issues Manage Issues */
        this.Issues = {
            fetchAll: async function() {
                var sql = `
                SELECT Issues.*
                FROM Issues;
                `
                var data = await nmdb.query.sql({this:database, sql})
                return JSON.parse(data);
            },
            fetchAllUnresolved: async function() {
                var sql = `
                SELECT Issues.*
                FROM Issues
                WHEN (((Issues.resolved) = "no"));
                `
                var data = await nmdb.query.sql({this:database, sql})
                return JSON.parse(data);
            },
            /**@param {sql} sql SQL Code to run (DEPRECIATED)*/
            query: async function(sql) {
                var data = await nmdb.query.sql({this:database, sql})
                return JSON.parse(data);
            },
            /**
             * @param {Issue ID} [ID] ID Number of Issue
             * @param {Asset Tag} [AssetTag] Asset Tag of Item
             * @param {New Status} [value] New Status of Issue
             **/
            updateStatus: function(ID, AssetTag, value) {

            },
            /**
             * @param {Asset Tag} [AssetTag] Asset Tag of Item
             * @param {Severity Level} [Severity] Severity of Issue
             * @param {Description} [Description] Description for Issue
             **/
            new: function(AssetTag, Severity, Description) {

            }
        }
    }
}

module.exports = dbman;