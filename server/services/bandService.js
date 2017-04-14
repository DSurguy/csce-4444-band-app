var SimpleBand = require('../../shared/classes/simpleBand.js');
var Band = require('../../shared/classes/band.js');
var SearchedBand = require('../../shared/classes/searchedBand.js');

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
        var query = 'SELECT BANDID, BANDNAME, OWNERID, USERNAME FROM BAND B ' + 
                    'JOIN USER U ON U.USERID = B.OWNERID ' +
                    'WHERE B.OWNERID = \'' + userId + '\'';
        
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
        "SELECT BANDID, BANDNAME, OWNERID, USERNAME, DESCRIPTION, FROM BAND B " + 
        "JOIN USER U ON U.USERID = B.OWNERID " +
        "WHERE B.BANDID = '"+bandId+"'";
        
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // Return this band's info
            var band = results.map(function (resultRow) {
                return new Band({
                                        id : resultRow.BANDID, 
                                        ownerName : resultRow.USERNAME, 
                                        ownerId : resultRow.OWNERID, 
                                        bandName : resultRow.BANDNAME,
                                        description : resultRow.DESCRIPTION
                                    });
            })

            resolve(band);
        });
    });
}

function search(userId, searchString, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT B.BANDID, BANDNAME, DESCRIPTION, GENRE, "+
        "CASE WHEN STATUS = 0 THEN 'none' "+
             "WHEN STATUS = 1 THEN 'applied (member)' "+
             "WHEN STATUS = 2 THEN 'applied (promoter)' "+
             "WHEN STATUS = 3 THEN 'accepted' "+
             "WHEN STATUS = 4 THEN 'rejected' "+
             "WHEN STATUS = 5 THEN 'blocked' "+ 
             "ELSE 'none' END AS STATUS, "+
        "CASE WHEN ROLE = 0 THEN 'owner' "+
             "WHEN ROLE = 1 THEN 'manager' "+
             "WHEN ROLE = 2 THEN 'member' "+
             "WHEN ROLE = 3 THEN 'promoter' "+
             "ELSE 'none' END AS ROLE "+
        "FROM BAND B " + 
        "LEFT JOIN APPLICATION A ON B.BANDID = A.BANDID AND A.USERID = '"+userId+"' " +
        "LEFT JOIN BANDMEMBER M ON B.BANDID = M.BANDID AND M.USERID = '"+userId+"' " +
        "WHERE B.BANDNAME LIKE '%"+searchString+"%' AND (STATUS <> 5 OR STATUS IS NULL)";

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

function updateApplication(userId, bandId, status, connection) {
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
                query = "UPDATE APPLICATION SET STATUS = "+status+" WHERE USERID = "+userId+" AND BANDID = "+bandId;
            }
            // We're creating a new application
            else {
                query = "INSERT INTO APPLICATION (USERID, BANDID, STATUS) VALUES ("+userId+","+bandId+","+status+")";
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
        var query = ""+
        "SELECT USERID, BANDID, STATUS FROM APPLICATION WHERE USERID = "+userId+" AND BANDID = "+bandId;
       

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

module.exports = {registerBand, getAllBands, getBand, search, updateApplication, cancelApplication};
