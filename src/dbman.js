const nmdb = require("@el3um4s/node-mdb");

// Be thankful I use Javadoc for documentation
class dbman {
    /**@param {String} database database to manage*/
    constructor(database) {
        this.database = database;
        
        /**@param Assets Manage Assets */
        this.Assets = {
            fetchAll: async function() {
                var sql = `
                SELECT Assets.*
                FROM Assets;
                `
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetch: async function(sql) {
                var data = await nmdb.query.sql({database, sql})
                return data;
            }
        }
        /**@param Issues Manage Issues */
        this.Issues = {
            fetchAll: async function() {
                var sql = `
                SELECT Issues.*
                FROM Issues;
                `
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetchAllUnresolved: async function() {
                var sql = `
                SELECT Issues.*
                FROM Issues
                WHEN (((Issues.resolved) = "no"));
                `
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetchAllResolved: async function() {
                var sql = `
                SELECT Issues.*
                FROM Issues
                WHEN (((Issues.resolved) = "yes"));
                `
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            /**@param {String} sql SQL Code to run (DEPRECIATED)*/
            query: async function(sql) {
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            /**
             * @param {Number} ID ID Number of Issue
             * @param {String} AssetTag Asset Tag of Item
             * @param {String} value New Status of Issue
             **/
            updateStatus: function(ID, AssetTag, value) {

            },
            /**
             * @param {String} AssetTag Asset Tag of Item
             * @param {String} Severity Severity of Issue
             * @param {String} Description Description for Issue
             **/
            new: function(AssetTag, Severity, Description) {

            }
        }

        this.Credentials = {
            fetchUserLoginInfo: async function() {
                var sql = `
                SELECT Credentials.UUID, Credentials.Username, Credentials.Displayname, Auth.Password, Auth.PermissionLevel
                FROM Auth INNER JOIN Credentials ON Auth.UUID = Credentials.UUID;
                `
                const data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetchUserInfo : async function() {
                var sql = `
                SELECT Credentials.UUID, Credentials.Username, Credentials.Displayname, Auth.PermissionLevel
                FROM Auth INNER JOIN Credentials ON Auth.UUID = Credentials.UUID;
                `
                const data = await nmdb.query.sql({database, sql});
                return data;
            }
        }
    }
}

module.exports = dbman;