/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Notification */

/**
 * PAGE
 * */
function NotificationsPage(app, data){
    Page.call(this, app, $('#notificationsPage')[0], NotificationsCtrl, NotificationsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
NotificationsPage.prototype = Object.create(Page.prototype);
NotificationsPage.prototype.constructor = NotificationsPage;

/**
 * CONTROLLER
 * */
function NotificationsCtrl(page){
    PageCtrl.call(this, page);
    this.notifications = [];
}
NotificationsCtrl.prototype = Object.create(PageCtrl.prototype);
NotificationsCtrl.prototype.constructor = NotificationsCtrl;

NotificationsCtrl.prototype.init = function (){
    var ctrl = this;
    return new Promise(function (resolve, reject){
        //get notifications
        $.ajax({
            method: 'GET',
            url: '/api/notifications'
        })
        .then(function (data){
            ctrl.notifications = data.map(function (item){
                return Notification.fromObj(item);
            }) || [];
            resolve();
        })
        .catch(console.error);
    });
};

/**
 * VIEWER
 * */
function NotificationsView(page){
    PageView.call(this, page);
}
NotificationsView.prototype = Object.create(PageView.prototype);
NotificationsView.prototype.constructor = NotificationsView;
NotificationsView.prototype.init = function (){
    this.bindEvents();
    this.render();
};

NotificationsView.prototype.bindEvents = function (){
    /*var pageElem = $(this.page.elem),
        page = this.page;*/
}

NotificationsView.prototype.render = function (){
    var notificationElem = $('#notificationsPage').find('.notifications');
    this.page.ctrl.notifications.forEach(function (notification){
        var alertType;
        switch(notification.type){
            case Notification.TYPE.SUCCESS:
            case Notification.TYPE.FRIEND_ACCEPTED:
                alertType = 'alert-success';
            break;
            case Notification.TYPE.WARNING:
            case Notification.TYPE.REMOVED_FROM_BAND:
                alertType = 'alert-warning';
            break;
            case Notification.TYPE.ERROR:
                alertType = 'alert-danger';
            break;
            default:
                alertType = 'alert-info';
            break;
        }
        notificationElem.append('<a href="'+notification.link+'" class="alert '+alertType+'" data-notification-id="'+notification.notificationId+'">'+notification.message+'</a>');
    });
};