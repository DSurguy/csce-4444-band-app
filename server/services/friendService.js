var Friend = require('../../shared/classes/friend.js');

function getAllFriends(userId, connection) {
    return new Promise((resolve, reject) => {
        // This query finds all users with which the current user has a relation. It will not return users that have 
        // blocked the current user.
        var query = ""+
        "SELECT CASE WHEN FROMUSERID <> '' THEN FROMUSERID ELSE TOUSERID END AS USERID, "+
            "STATUS, USERNAME, CONCAT(FIRSTNAME,' ', LASTNAME) AS NAME, BIO "+
        "FROM "+
        "(SELECT CASE WHEN FROMUSERID = '"+userId+"' THEN '' ELSE FROMUSERID END AS FROMUSERID, "+
                "CASE WHEN TOUSERID = '"+userId+"' THEN '' ELSE TOUSERID END AS TOUSERID, "+
                "CASE WHEN STATUS = 2 AND FROMUSERID = '"+userId+"' THEN 'requested' "+
                     "WHEN STATUS = 2 AND TOUSERID = '"+userId+"' THEN 'pending' "+
                     "WHEN STATUS = 1 THEN 'friend' "+
                     "WHEN STATUS = 3 THEN 'blocked' "+
                     "WHEN STATUS = 0 THEN 'none' END AS STATUS "+
        "FROM FRIEND F "+
        "JOIN USER U ON U.USERID = F.FROMUSERID OR U.USERID = F.TOUSERID "+
        "WHERE USERID = '"+userId+"' AND (STATUS IN (1,2) OR (STATUS = 3 AND FROMUSERID = '"+userId+"'))) F "+
        "JOIN USER U ON USERID = FROMUSERID OR USERID = TOUSERID "+
        "ORDER BY FIELD(STATUS,'friend','requested','pending','blocked'), USERNAME";

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // We got some users, so transform the results into friends and return
            var friends = results.map(function (resultRow) {
                return new Friend({id : resultRow.USERID, 
                    userName : resultRow.USERNAME, 
                    bio : resultRow.BIO, 
                    name : resultRow.NAME,
                    status : resultRow.STATUS
                });
            });

            resolve(friends);
        });
    });
}

function search(userId, searchString, connection) {
    return new Promise((resolve, reject) => {
        // This query finds all users that have not blocked the current user. It also will not return the current user.
        var query = ""+
        "SELECT CASE WHEN FROMUSERID <> '' THEN FROMUSERID ELSE TOUSERID END AS USERID, "+
               "STATUS, USERNAME, CONCAT(FIRSTNAME,' ', LASTNAME) AS NAME, BIO "+
        "FROM "+
        "(SELECT CASE WHEN FROMUSERID = '"+userId+"' THEN '' ELSE FROMUSERID END AS FROMUSERID, "+
                "CASE WHEN TOUSERID = '"+userId+"' THEN '' ELSE TOUSERID END AS TOUSERID, "+
                "CASE WHEN STATUS = 2 AND FROMUSERID = '"+userId+"' THEN 'requested' "+
                     "WHEN STATUS = 2 AND TOUSERID = '"+userId+"' THEN 'pending' "+
                     "WHEN STATUS = 1 THEN 'friend' "+
                     "WHEN STATUS = 3 THEN 'blocked' "+
                     "WHEN STATUS = 0 THEN 'none' END AS STATUS "+
        "FROM FRIEND F "+
        "JOIN USER U ON U.USERID = F.FROMUSERID OR U.USERID = F.TOUSERID "+
        "WHERE USERID = '"+userId+"' AND (STATUS <> 3 OR (STATUS = 3 AND FROMUSERID = '"+userId+"'))) F "+
        "JOIN USER U ON USERID = FROMUSERID OR USERID = TOUSERID "+
        "WHERE USERNAME LIKE '%"+searchString+"%' AND (STATUS <> 3 OR (STATUS = 3 AND FROMUSERID = '"+userId+"')) "+
        "UNION "+
        "SELECT USERID, 'none' AS STATUS, USERNAME, CONCAT(FIRSTNAME,' ', LASTNAME) AS NAME, BIO "+
        "FROM USER "+
        "WHERE USERID NOT IN (SELECT FROMUSERID FROM FRIEND WHERE TOUSERID = '"+userId+"' "+
                               "UNION "+
                               "SELECT TOUSERID FROM FRIEND WHERE FROMUSERID = '"+userId+"') "+
        "AND USERNAME LIKE '%"+searchString+"%' AND USERID <> '"+userId+"' "+
        "ORDER BY FIELD(STATUS,'friend','requested','pending','blocked'), USERNAME ";
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // We got some users, so transform the results into friends and return
            var friends = results.map(function (resultRow) {
                return new Friend({id : resultRow.USERID, 
                    userName : resultRow.USERNAME, 
                    bio : resultRow.BIO, 
                    name : resultRow.NAME,
                    status : resultRow.STATUS
                });
            });

            resolve(friends);
        });
    });
}

function updateFriendStatus(fromUserId, toUserId, status, connection) {
    return new Promise((resolve, reject) => {
        // We're going to see if there is an existing relation between these users
        var query = 'SELECT * FROM FRIEND '+
                    'WHERE (FROMUSERID = '+fromUserId+' AND TOUSERID = '+toUserId+') '+
                    'OR (FROMUSERID = '+toUserId+' AND TOUSERID = '+fromUserId+')';
        
        var statusNum;
        if (status === 'friend') {
            statusNum = 1;
        }
        else if (status === 'requested' || status === 'pending') {
            statusNum = 2;
        }
        else if (status === 'blocked') {
            statusNum = 3;
        }
        else if (status === 'none') {
            statusNum = 0;
        }

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }
            // If there is already a relation between the two users, update that relation
            if (results.length > 0){
                query = 'UPDATE FRIEND SET STATUS = '+statusNum+', FROMUSERID = '+fromUserId+', TOUSERID = '+toUserId+' '+
                        'WHERE (FROMUSERID = '+fromUserId+' AND TOUSERID = '+toUserId+') '+
                        'OR (FROMUSERID = '+toUserId+' AND TOUSERID = '+fromUserId+')';
            }
            // Otherwise we are creating a new relation
            else {
                query = 'INSERT INTO FRIEND (FROMUSERID, TOUSERID, STATUS) VALUES ('+fromUserId+', '+toUserId+', '+statusNum+')';
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

module.exports = {getAllFriends, search, updateFriendStatus};

