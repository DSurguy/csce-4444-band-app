var SimpleBand = require('../../shared/classes/simpleBand.js');
var Band = require('../../shared/classes/band.js');
var SearchedBand = require('../../shared/classes/searchedBand.js');

function registerBand(userId, bandName, description, genre, connection) {
    return new Promise((resolve, reject) => {
        var obj = {userId, bandName, description, genre, connection}

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
        var query = 'SELECT BANDNAME FROM BAND ' +  
                    'WHERE BANDNAME = \'' + data.bandName + '\' AND OWNERID = \'' + data.userId + '\'';

        var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

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
                console.log(err);
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

            var simpleBands = results.map(function (resultRow) {
                return new SimpleBand({id : resultRow.BANDID, ownerName : resultRow.USERNAME, ownerId : resultRow.OWNERID, bandName : resultRow.BANDNAME});
            })

            resolve(simpleBands);
        });
    });
}

function getBand(bandId, connection) {
    return new Promise((resolve, reject) => {
        var query = 'SELECT BANDID, BANDNAME, OWNERID, USERNAME, DESCRIPTION, FROM BAND B ' + 
                    'JOIN USER U ON U.USERID = B.OWNERID ' +
                    'WHERE B.BANDID = \'' + bandId + '\'';
        
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

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
             "WHEN STATUS = 1 THEN 'applied' "+
             "WHEN STATUS = 2 THEN 'accepted' "+
             "WHEN STATUS = 3 THEN 'rejected' "+
             "WHEN STATUS = 4 THEN 'blocked' "+ 
             "ELSE 'none' END AS STATUS, "+
        "CASE WHEN ROLE = 0 THEN 'owner' "+
             "WHEN ROLE = 1 THEN 'manager' "+
             "WHEN ROLE = 2 THEN 'member' "+
             "WHEN ROLE = 3 THEN 'promoter' "+
             "ELSE 'none' END AS ROLE "+
        "FROM BAND B " + 
        "LEFT JOIN APPLICATION A ON B.BANDID = A.BANDID AND A.USERID = '"+userId+"' " +
        "LEFT JOIN BANDMEMBER M ON B.BANDID = M.BANDID AND M.USERID = '"+userId+"' " +
        "WHERE B.BANDNAME LIKE '%"+searchString+"%' AND (STATUS <> 4 OR STATUS IS NULL)";
        console.log(query);
        connection.query(query, function(err, results, fields) {
            if (err) {
                console.log(err);
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

module.exports = {registerBand, getAllBands, getBand, search};
