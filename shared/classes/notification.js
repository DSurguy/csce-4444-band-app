function Notification(){
    this.userId;
    this.message;
    this.link;
    this.unread;
}
Notification.MSG_TYPE = {
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

if( typeof module !== 'undefined' ){ module.exports = Notification; }