var extend = require('extend'),
    Notification = require('../../shared/classes/notification.js');

var NotificationService = {
    notifyUser: function (connection, params){
        return new Promise(function (resolve, reject){
            params = extend(true, {
                userId: 1,
                message: '',
                link: '',
                type: Notification.MSG_TYPE.NO_MESSAGE
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