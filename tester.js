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

var myService = new NotificationService();
myService.notifyUser(connection)
.then(console.log)
.catch(console.error);