var Member = require('../../shared/classes/members.js'),
    NotificationService = require('./notificationService.js'),
    Notification = require('../../shared/classes/notification.js');

function getAllMembers(userId, connection) {
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
                     "WHEN STATUS = 1 THEN 'member' "+
                     "WHEN STATUS = 3 THEN 'blocked' "+
                     "WHEN STATUS = 0 THEN 'none' END AS STATUS "+
        "FROM FRIEND F "+
        "JOIN USER U ON U.USERID = F.FROMUSERID OR U.USERID = F.TOUSERID "+
        "WHERE USERID = '"+userId+"' AND (STATUS IN (1,2) OR (STATUS = 3 AND FROMUSERID = '"+userId+"'))) F "+
        "JOIN USER U ON USERID = FROMUSERID OR USERID = TOUSERID "+
        "ORDER BY FIELD(STATUS,'member','requested','pending','blocked'), USERNAME";

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            // We got some users, so transform the results into members and return
            var members = results.map(function (resultRow) {
                return new Member({id : resultRow.USERID, 
                    userName : resultRow.USERNAME, 
                    bio : resultRow.BIO, 
                    name : resultRow.NAME,
                    status : resultRow.STATUS
                });
            });

            resolve(members);
        });
    });
}

function updateMemberStatus(fromUserId, toUserId, status, connection) {
    var query;
    return new Promise((resolve, reject) => {
        // We're going to see if there is an existing relation between these users
        _checkExistingRelation(fromUserId, toUserId, connection)
        .then(function (relationExists){
            // If there is already a relation between the two users, update that relation
            if (relationExists){
                query = 'UPDATE FRIEND SET STATUS = '+status+', FROMUSERID = '+fromUserId+', TOUSERID = '+toUserId+' '+
                        'WHERE (FROMUSERID = '+fromUserId+' AND TOUSERID = '+toUserId+') '+
                        'OR (FROMUSERID = '+toUserId+' AND TOUSERID = '+fromUserId+')';
            }
            // Otherwise we are creating a new relation
            else {
                query = 'INSERT INTO FRIEND (FROMUSERID, TOUSERID, STATUS) VALUES ('+fromUserId+', '+toUserId+', '+status+')';
            }

            connection.query(query, function(err, results, fields) {
                if (err) {
                    reject(err);
                    return;
                }
                _notifyStatusUpdate(fromUserId, toUserId, status, connection).then(resolve).catch(reject);
            });
        });
    });
}

function _checkExistingRelation(from, to, connection){
    return new Promise(function (resolve, reject){
        var query = ''+
        'SELECT * FROM FRIEND '+
        'WHERE (FROMUSERID = '+from+' AND TOUSERID = '+to+') '+
        'OR (FROMUSERID = '+to+' AND TOUSERID = '+from+')';
        
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }
            else{
                resolve(!!results.length);
            }
        });
    });
}

function _notifyStatusUpdate(from, to, status, connection){
    if( status !== Member.STATUS.REQUESTED && status !== Member.STATUS.FRIEND ){
        return Promise.resolve();
    }
    return new Promise(function (resolve, reject){
        var query = 'SELECT Username FROM USER where UserID = '+from;
        connection.query(query, function (err, results){
            if( err ){ reject(err); }
            else{
                var notificationParams = {
                    userId: to,
                    link: '/members'
                };
                switch( status ){
                    case Member.STATUS.REQUESTED:
                        notificationParams.message = `New member request from ${results[0].Username}`;
                        notificationParams.type = Notification.TYPE.FRIEND_REQUEST;
                    break;
                    case Member.STATUS.FRIEND:
                        notificationParams.message = `You are now members with ${results[0].Username}!`;
                        notificationParams.type = Notification.TYPE.FRIEND_ACCEPTED;
                    break;
                }
                NotificationService.notifyUser(connection, notificationParams)
                .then(resolve)
                .catch(reject);
            }
        });
    });
}

module.exports = {getAllMembers, search, updateMemberStatus};