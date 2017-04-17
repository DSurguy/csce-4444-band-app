function Notification(notificationId, userId, type, message, link, unread){
    this.notificationId = notificationId;
    this.userId = userId;
    this.type = type;
    this.message = message;
    this.link = link;
    this.unread = unread;
}
Notification.TYPE = {
    NO_MESSAGE: 0,
    FRIEND_REQUEST: 1,
    FRIEND_ACCEPTED: 2,
    BAND_INVITE: 3,
    REMOVED_FROM_BAND: 4,
    EVENT_INVITE: 5,
    EVENT_REMINDER: 6,
    ERROR: 7,
    SUCCESS: 8,
    WARNING: 9
};
Notification.fromObj = function (obj){
    var myNotification = new Notification();
    myNotification.notificationId = obj.notificationId || obj.NotificationId || -1;
    myNotification.userId = obj.userId || obj.UserId || -1;
    myNotification.type = obj.type || obj.Type || Notification.TYPE.NO_MESSAGE;
    myNotification.message = obj.message || obj.Message || '';
    myNotification.link = obj.link || obj.Link || '#';
    myNotification.unread = obj.unread || obj.Unread || true;
    return myNotification;
};

if( typeof module !== 'undefined' ){ module.exports = Notification; }