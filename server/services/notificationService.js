var extend = require('extend'),
    Notification = require('../../shared/classes/notification.js');

var NotificationService = {
    getNotifications: function (connection, userId, unreadOnly){
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM NOTIFICATION WHERE UserId=${userId}${unreadOnly?' AND Unread = 1':''}`;
            //Get all unread notification or user
            connection.query(query, function (err, result){
                if( err ){
                    reject(err);
                }
                else{
                    resolve(Array.prototype.slice.call(result, 0));
                }
            });
        });
    },//Get the count of unread notification
    getNotificationCount: function (connection, userId, unreadOnly){
        return new Promise(function (resolve, reject){
            var query = `SELECT COUNT(NotificationID) AS total FROM NOTIFICATION WHERE UserId=${userId}${unreadOnly?' AND Unread = 1':''}`;
            
            connection.query(query, function (err, result){
                if( err ){
                    reject(err);
                }
                else{
                    resolve(result[0].total);
                }
            });
        });
    },//Send the notification to user
    notifyUser: function (connection, params){
        return new Promise(function (resolve, reject){
            params = extend(true, {
                userId: 1,
                message: '',
                link: '',
                type: Notification.TYPE.NO_MESSAGE
            }, params);
            
            params.unread = true;
            
            var query = `INSERT INTO NOTIFICATION (UserId, Type, Message, Link, Unread) VALUES (${params.userId}, ${params.type}, '${params.message}', '${params.link}', 1)`;
            connection.query(query, function (err, result, fields){
                if( err ){
                    reject(err); return;
                }
                resolve();
            });
        });
    }
};

module.exports = NotificationService;