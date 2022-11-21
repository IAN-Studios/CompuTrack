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
                SELECT ASSETS.*
                FROM ASSETS;
                `
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetch: async function(sql) {
                var data = "NOT IMPLEMENTED"
                //var data = await nmdb.query.sql({database, sql})
                return data;
            }
        }
        /**@param Issues Manage Issues */
        this.Issues = {
            fetchAll: async function() {
                var sql = `
                SELECT ISSUES.*
                FROM ISSUES;
                `
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetchAllUnresolved: async function() {
                var sql = `
                SELECT ISSUES.ID, ISSUES.[Asset Tag], ISSUES.[Severity (Optional)], ISSUES.[Date Added], ISSUES.[Resolved?], ISSUES.[Problem Description]
                FROM ISSUES
                WHERE (((ISSUES.[Resolved?])=False));                
                `
                var data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetchAllResolved: async function() {
                var sql = `
                SELECT ISSUES.ID, ISSUES.[Asset Tag], ISSUES.[Severity (Optional)], ISSUES.[Date Added], ISSUES.[Resolved?], ISSUES.[Problem Description]
                FROM ISSUES
                WHERE (((ISSUES.[Resolved?])=True));     
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
                SELECT USERS.UUID, USERS.Username, USERS.Displayname, AUTH.Password, AUTH.PermissionLevel
                FROM AUTH INNER JOIN USERS ON AUTH.UUID = USERS.UUID;
                `
                const data = await nmdb.query.sql({database, sql})
                return data;
            },
            fetchUserInfo : async function() {
                var sql = `
                SELECT USERS.UUID, USERS.Username, USERS.Displayname, AUTH.PermissionLevel
                FROM AUTH INNER JOIN USERS ON AUTH.UUID = USERS.UUID;
                `
                const data = await nmdb.query.sql({database, sql});
                return data;
            }
        }
    }
}

module.exports = dbman;