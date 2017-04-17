var Notification = require('./shared/classes/notification.js'),
    NotificationService = require('./server/services/notificationService.js');

var mysql = require('mysql');

var config;
try{
    config = require('./config.json');
}
catch (e){
    config = {
        db: {
            host: 'localhost',
            user: 'root',
            password: 'test',
            database: 'band'
        }
    };
}

var connection = mysql.createConnection(config.db);

NotificationService.notifyUser(connection, {
    userId: 1,
    message: 'This is a test notification',
    link: '/profile',
    type: Notification.TYPE.ERROR
})
.then(function (){
    console.log('Success');
})
.catch(console.error);