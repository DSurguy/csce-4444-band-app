var extend = require('extend'),
    Notification = require('../../shared/classes/notification.js');

var NotificationService = {
    getNotifications: function (connection, userId){
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM NOTIFICATION WHERE UserId='${userId}'`;
            
            connection.query(query, function (err, result){
                if( err ){
                    reject(err);
                }
                else{
                    resolve(Array.prototype.slice.call(result, 0));
                }
            });
        });
    },
    notifyUser: function (connection, params){
        return new Promise(function (resolve, reject){
            params = extend(true, {
                userId: 1,
                message: '',
                link: '',
                type: Notification.TYPE.NO_MESSAGE
            }, params);
            
            params.unread = true;
            
            var query = `INSERT INTO NOTIFICATION (UserId, Type, Message, Link, Unread) VALUES (${params.userId}, ${params.type}, '${params.message}', '${params.link}', 0)`;
            console.log(query);
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