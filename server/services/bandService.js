var SimpleBand = require('../../shared/classes/simpleBand.js');
var Band = require('../../shared/classes/band.js');
var SearchedBand = require('../../shared/classes/searchedBand.js');
var Application = require('../../shared/classes/application.js');
var BandMember = require('../../shared/classes/bandMember.js');
var {Member} = require('../../shared/classes/user.js');

function registerBand(userId, bandName, description, genre, connection) {
    return new Promise((resolve, reject) => {
        var obj = {userId, bandName, description, genre, connection}

        // First we are going to check that a band does not already exist fo this user, then create the band
        checkBandAndUser(obj)
        .then(function (result) {
            if (result == false) {
                resolve(false);
                return;
            }

            return createBand(result);
        })
        .then(resolve)
        .catch(reject);
    })
}

function checkBandAndUser(data) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT BANDNAME FROM BAND " +  
        "WHERE BANDNAME = '"+data.bandName+"' AND OWNERID = '"+data.userId+"'";

        var connection = data.connection;

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }
                // Don't create band if user already has a band with this bandName 
            if (results.length > 0) {
                resolve(false);
                return;
            }    

            resolve(data);
        });
    });
}

function createBand(data) {
    return new Promise((resolve, reject) => {
        var query = "INSERT INTO BAND (OWNERID, BANDNAME, DESCRIPTION, GENRE) VALUES ( '"+data.userId+"','"+data.bandName+"','"+data.description+"','"+data.genre+"')";

        var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            resolve(true);
        });
    });
}

function getAllBands(userId, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT B.BANDID, BANDNAME, OWNERID, USERNAME FROM BAND B "+ 
        "JOIN USER U ON U.USERID = B.OWNERID "+
        "JOIN BANDMEMBER M ON M.BANDID = B.BANDID "+
        "WHERE M.USERID = "+userId;
        
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }
            // Return a list of SimpleBands
            var simpleBands = results.map(function (resultRow) {
                return new SimpleBand({id : resultRow.BANDID, 
                ownerName : resultRow.USERNAME, 
                ownerId : resultRow.OWNERID, 
                bandName : resultRow.BANDNAME});
            })

            resolve(simpleBands);
        });
    });
}

function getBand(bandId, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT BANDID, BANDNAME, OWNERID, USERNAME, DESCRIPTION FROM BAND B " + 
        "JOIN USER U ON U.USERID = B.OWNERID " +
        "WHERE B.BANDID = '"+bandId+"'";
        
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // Return this band's info
            var band = new Band({
                id : results[0].BANDID, 
                ownerName : results[0].USERNAME, 
                ownerId : results[0].OWNERID, 
                bandName : results[0].BANDNAME,
                description : results[0].DESCRIPTION
                });

            resolve(band);
        });
    });
}

function search(userId, searchString, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT B.BANDID, BANDNAME, DESCRIPTION, GENRE, "+
        "CASE WHEN STATUS = 0 THEN 'none' "+
            "WHEN STATUS = 1 THEN 'applied (manager)' "+
             "WHEN STATUS = 2 THEN 'applied (member)' "+
             "WHEN STATUS = 3 THEN 'applied (promoter)' "+
             "WHEN STATUS = 4 THEN 'accepted' "+
             "WHEN STATUS = 5 THEN 'rejected' "+
             "WHEN STATUS = 6 THEN 'blocked' "+ 
             "ELSE 'none' END AS STATUS, "+
        "CASE WHEN ROLE = 0 THEN 'owner' "+
             "WHEN ROLE = 1 THEN 'manager' "+
             "WHEN ROLE = 2 THEN 'member' "+
             "WHEN ROLE = 3 THEN 'promoter' "+
             "ELSE 'none' END AS ROLE "+
        "FROM BAND B " + 
        "LEFT JOIN APPLICATION A ON B.BANDID = A.BANDID AND A.USERID = '"+userId+"' " +
        "LEFT JOIN BANDMEMBER M ON B.BANDID = M.BANDID AND M.USERID = '"+userId+"' " +
        "WHERE B.BANDNAME LIKE '%"+searchString+"%' AND (STATUS <> 6 OR STATUS IS NULL)";

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            var searchedBands = results.map(function (resultRow) {
                return new SearchedBand({id : resultRow.BANDID, 
                    bandName : resultRow.BANDNAME,
                    applicationStatus : resultRow.STATUS,
                    role : resultRow.ROLE,
                    description : resultRow.DESCRIPTION,
                    genre : resultRow.GENRE});
            })

            resolve(searchedBands);
        });
    });
}

function getAllApplications(userId, bandId, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT ID, A.USERID, BANDID, STATUS, INSTRUMENT, MESSAGE, USERNAME, CONCAT(FIRSTNAME,' ', LASTNAME) AS NAME "+
        "FROM APPLICATION A "+
        "JOIN USER U ON A.USERID = U.USERID "+
        "WHERE BANDID = "+bandId+" AND "+userId+" IN "+
            "(SELECT USERID FROM BANDMEMBER WHERE USERID = "+userId+" AND BANDID = "+bandId+")"+
            "AND STATUS IN ("+Application.STATUS.APPLIED_MANAGER+","+Application.STATUS.APPLIED_MEMBER+","+Application.STATUS.APPLIED_PROMOTER+")";

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            resolve(results.map(function (resultRow) {
                return new Application({id : resultRow.ID, 
                    userId : resultRow.USERID,
                    status : resultRow.STATUS,
                    instrument : resultRow.INSTRUMENT,
                    message : resultRow.MESSAGE,
                    username : resultRow.USERNAME,
                    name : resultRow.NAME
                });
            }));       
        });
    });    
}

function submitApplication(userId, bandId, instrument, message, applicationStatus, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT USERID, BANDID, STATUS FROM APPLICATION WHERE USERID = "+userId+" AND BANDID = "+bandId;
       

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // If there is already an application then we are updating it
            if (results.length > 0){
                query = "UPDATE APPLICATION SET STATUS = "+applicationStatus+", INSTRUMENT = '"+instrument+"', MESSAGE = '"+message+"' WHERE USERID = "+userId+" AND BANDID = "+bandId;
            }
            // We're creating a new application
            else {
                query = "INSERT INTO APPLICATION (USERID, BANDID, STATUS, INSTRUMENT, MESSAGE) VALUES ("+userId+","+bandId+","+applicationStatus+",'"+instrument+"','"+message+"')";
            }

            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(true);
            });
        });
    });
}

function cancelApplication(userId, bandId, connection) {
    return new Promise((resolve, reject) => {
        var query = "SELECT USERID, BANDID, STATUS FROM APPLICATION WHERE USERID = "+userId+" AND BANDID = "+bandId;
       

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // If we found an application remove it
            if (results.length > 0){
                query = "DELETE FROM APPLICATION WHERE USERID = "+userId+" AND BANDID = "+bandId;
            }

            else {
                resolve(false);
                return;
            }

            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(true);
            });
        });
    });
}

function processApplication(userId, bandId, applicationId, processStatus, applicationStatus, connection) {
    return new Promise((resolve, reject) => {
        var role = '';

        switch(parseInt(applicationStatus)) {
            case Application.STATUS.APPLIED_MANAGER:
                role = BandMember.ROLE.MANAGER;
                break;
            case Application.STATUS.APPLIED_MEMBER:
                role = BandMember.ROLE.MEMBER;
                break;
            case Application.STATUS.APPLIED_PROMOTER:
                role = BandMember.ROLE.PROMOTER;
                break;
        }

        // Check that the user has permission to approve this application
        var query = "SELECT USERID, BANDID FROM BANDMEMBER WHERE USERID = "+userId+" AND BANDID = "+bandId+" AND ROLE IN ("+BandMember.ROLE.OWNER+","+BandMember.ROLE.MANAGER+")";
    
        connection.beginTransaction(function(err) {
            if (err) {
                reject(err);
                return;
            }

            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                    return connection.rollback(function() {});
                }

                // If we found an application remove it
                if (results.length === 0){
                    resolve(false);
                    return;
                }

                else {
                    query = "UPDATE APPLICATION SET STATUS = "+processStatus+" WHERE ID = "+applicationId;
                }

                connection.query(query, function(err, results, fields) {
                    if (err) {
                        reject(err);
                        return connection.rollback(function() {});
                    }

                    if (processStatus == Application.STATUS.ACCEPTED) {
                        query = ""+
                        "INSERT INTO BANDMEMBER (USERID, BANDID, ROLE) VALUES "+
                        "((SELECT USERID FROM APPLICATION WHERE ID = "+applicationId+"),"+bandId+","+role+")";
                    }

                    connection.query(query, function(err, results, fields) {
                        if (err) {
                            reject(err);
                            return connection.rollback(function() {});
                        }

                        connection.commit(function(err){
                            if (err) {
                                reject(err);
                                return connection.rollback(function() {});
                            }
                            resolve(true);
                        });
                    });
                });
            });
        });
    });
}

function getBandMemberRole(userId, bandId, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT ROLE FROM BANDMEMBER WHERE BANDID = "+bandId+" AND USERID = "+userId;
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // Return a list of SimpleBands
            if (results.length > 0) {
                resolve({ role : results[0].ROLE });
            }
            else {
                resolve({ role : BandMember.ROLE.NONE });
            }
        });
    });
}

function getBandMembers(bandId, connection){
    return new Promise(function (resolve, reject){
        var query = `SELECT U.*, B.Role FROM USER U INNER JOIN BANDMEMBER B on B.UserID = U.UserID AND B.BandID = ${bandId}`;
        connection.query(query, function (err, results){
            if (err) {
                reject(err);
                return;
            }
            
            resolve(results.map(function (member){
                return new Member(member);
            }));
        });
    });
}

module.exports = {
    registerBand, 
    getAllBands, 
    getBand, search, 
    submitApplication, 
    cancelApplication, 
    getAllApplications, 
    processApplication,
    getBandMemberRole,
    getBandMembers
};
