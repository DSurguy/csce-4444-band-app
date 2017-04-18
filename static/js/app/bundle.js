function Application(json){
    this.id = json.id || 0;
    this.userId = json.userId || undefined;
    this.username = json.username || '';
    this.name = json.name || '';
    this.status = json.status || undefined;
    this.instrument = json.instrument || '';
    this.message = json.message || '';
}

Application.STATUS = {
	NONE: 0, 
    APPLIED_MANAGER: 1,
    APPLIED_MEMBER: 2,
    APPLIED_PROMOTER: 3,
	ACCEPTED: 4, 
	REJECTED: 5,
    BLOCKED: 6
}

if( typeof module !== 'undefined' ){ module.exports = Application; }
;//bundle semicolon

var USERROLES = {
    NONE: 0,
    MEMBER: 1,
    MANAGER: 2,
    PROMOTER: 3,
    MERCH: 3,
    OWNER: 4
};

function Band(json){
    this.id = json.id || 0;
    this.ownerName = json.ownerName || '';
    this.ownerId = json.ownerId || undefined;
    this.bandName = json.bandName || '';
    this.description = json.description || '';
    this.userRole = json.userRole || USERROLES.NONE;
    this.events = json.events || [];
    this.songs = json.songs || [];
    this.setLists = json.setLists || [];
    this.members = json.members || [];
}

if( typeof module !== 'undefined' ){ module.exports = Band; }
;//bundle semicolon

function BandMember(json){
    this.userId = json.userId || undefined;
    this.bandId = json.bandId || undefined;
    this.username = json.username || '';
    this.name = json.name || '';
    this.instrument = json.instrument || '';
    this.role = json.role || '';
}

BandMember.ROLE = {
    OWNER : 0,
    MANAGER: 1,
    MEMBER : 2,
    PROMOTER : 3
}

if( typeof module !== 'undefined' ){ module.exports = BandMember; }
;//bundle semicolon

function Friend(json){
    this.id = json.id || 0;
    this.userName = json.userName || '';
    this.bio = json.bio || undefined;
    this.name = json.name || '';
    this.status = json.status || '';
}

Friend.STATUS = {
	NONE: 0, 
	FRIEND: 1, 
	REQUESTED: 2, 
	PENDING: 3, 
	BLOCKED: 4 
}

if( typeof module !== 'undefined' ){ module.exports = Friend; }
;//bundle semicolon

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

;//bundle semicolon

function SearchedBand(json){
    this.id = json.id || 0;
    this.bandName = json.bandName || '';
    this.applicationStatus = json.applicationStatus || undefined;
    this.role = json.role || undefined;
    this.description = json.description || '';
    this.genre = json.genre || '';
}

SearchedBand.ROLE = {
    OWNER: 0,
    MANAGER: 1,
    MEMBER: 2,
    PROMOTER: 3
}

if( typeof module !== 'undefined' ){ module.exports = SearchedBand; }
;//bundle semicolon

function SimpleBand(json){
    this.id = json.id || 0;
    this.ownerName = json.ownerName || '';
    this.ownerId = json.ownerId || undefined;
    this.bandName = json.bandName || '';
}

if( typeof module !== 'undefined' ){ module.exports = SimpleBand; }
;//bundle semicolon

/* global $ */

function App(){
    this.currentPage = undefined;
    //this.pageHistory = [];
}
App.prototype.init = function (PageConstructor){
    this.currentPage = new PageConstructor(this);
    $(this.currentPage.elem).addClass('active');
    this.currentPage.init();
};
/*App.prototype.changePage = function (page, data){
    if( this.currentPage ){
        //store the constructor for the last page
        this.pageHistory.push(this.currentPage.constructor);
        $(this.currentPage.elem).removeClass('active');
    }
    //create a new instance of the next page
    this.currentPage = new page(this);
    $(this.currentPage.elem).addClass('active');
    this.currentPage.init();
};*/
;//bundle semicolon

/* global $ */
/** Inheritable Classes **/
function Page(app, elem, ctrlConstructor, viewConstructor, childComponents){
    this.app = app;
    this.elem = elem;
    this.ctrl = new ctrlConstructor(this);
    this.view = new viewConstructor(this);
    this.childComponents = childComponents || {};
}
Page.prototype.init = function (){
    var that = this;
    
    for( var component in this.childComponents ){
        this.childComponents[component].init();
    }
    
    this.ctrl.init()
    .then(function (){
        that.view.init.apply(that.view, arguments);
    });
};

function PageCtrl(page){
    this.page = page;
}
PageCtrl.prototype.init = function (){
    return $.Deferred().resolve().promise();
};

function PageView(page){
    this.page = page;
}
PageView.prototype.init = function (){};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

function MenuComponent(app, data){
    Page.call(this, app, $(data.element)[0], MenuCtrl, MenuView);
}
MenuComponent.prototype = Object.create(Page.prototype);
MenuComponent.prototype.constructor = MenuComponent;

function MenuCtrl(page){
    PageCtrl.call(this, page);
}
MenuCtrl.prototype = Object.create(PageCtrl.prototype);
MenuCtrl.prototype.constructor = MenuCtrl;
MenuCtrl.prototype.logout = function (){
    var defer = $.Deferred();
    
    $.ajax({
        method: 'POST',
        url: '/api/logout'
    }).then(defer.resolve).catch(defer.reject);
    
    return defer.promise();
};

function MenuView(page){
    PageView.call(this, page);
}
MenuView.prototype = Object.create(PageView.prototype);
MenuView.prototype.constructor = MenuView;
MenuView.prototype.init = function (){
    this.menuButtonContainer = $(this.page.elem);
    this.menuOverlayContainer = $('#menuOverlay');
    this.renderMenu();
    this.bindEvents();
};
MenuView.prototype.renderMenu = function (){
    
    /* render overlay */
    if( this.menuOverlayContainer.length == 0 ){
        $('body').append('<div id="menuOverlay" class="hidden"></div>');
        this.menuOverlayContainer = $("#menuOverlay");
    }
    this.menuOverlayContainer.empty();
    this.menuOverlayContainer.append('<div class="menu"></div>');
    this.menuOverlayContainer.find('.menu').append('<div class="menuSection">'
        +'<div class="action logout btn btn-secondary">Logout</div>'
    +'</div>');
    
    /* render menu button */
    this.menuButtonContainer.empty();
    this.menuButtonContainer.append('<div class="menu-toggle btn btn-secondary fa fa-bars"></div>');
};
MenuView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.menu-toggle', function (e){
        view.visible = !view.visible;
        
        if( view.visible ){
            view.menuOverlayContainer.removeClass('hidden');
        }
        else{
            view.menuOverlayContainer.addClass('hidden');
        }
    });
    
    view.menuOverlayContainer.on('click', '.menu .logout', function (e){
        view.page.ctrl.logout()
        .then(function (){
            window.location = '/login';
        }).catch(function (err){
            alert(err.message);
        });
    });
    
    view.menuOverlayContainer.on('click', '.menu', function (e){
        e.stopPropagation();
        e.preventDefault();
    });
    
    view.menuOverlayContainer.on('click', function (e){
        view.visible = !view.visible;
        
        if( view.visible ){
            view.menuOverlayContainer.removeClass('hidden');
        }
        else{
            view.menuOverlayContainer.addClass('hidden');
        }
    });
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Friend */

function AddFriendPage(app, data){
    Page.call(this, app, $('#addFriendPage')[0], AddFriendCtrl, AddFriendView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
AddFriendPage.prototype = Object.create(Page.prototype);
AddFriendPage.prototype.constructor = AddFriendPage;

function AddFriendCtrl(page){
    PageCtrl.call(this, page);
    this.friends = [];
}
AddFriendCtrl.prototype = Object.create(PageCtrl.prototype);
AddFriendCtrl.prototype.constructor = AddFriendCtrl;

AddFriendCtrl.prototype.search = function (form){
    var defer = $.Deferred();
    var that = this;
    that.friends = [];
    $.ajax({
        url: '/api/friends/search',
        type: 'POST',
        data: $(form).serialize()
    }).then(function (data){
        that.friends = data;
        that.page.view.updateUserList();
        defer.resolve();
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};

// This method will update the relation between the current user and the "to" user
AddFriendCtrl.prototype.updateStatus = function (toUserId, status){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/friends/updatestatus',
        type: 'POST',
        data: {toUserId : toUserId, status : status}
    }).then(function (result){
        defer.resolve(result);
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};

function AddFriendView(page){
    PageView.call(this, page);
}
AddFriendView.prototype = Object.create(PageView.prototype);
AddFriendView.prototype.constructor = AddFriendView;
AddFriendView.prototype.init = function (){   
    this.bindEvents();
    this.searchTimeout;
};

AddFriendView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;
    
    // This will run a search every second when the user presses a key. 
    $(document).on('keypress', 'form', function (e){
        var thisForm = $(this);
        clearTimeout(page.view.searchTimeout);
        page.view.searchTimeout = setTimeout(function () {
            thisForm.submit();
        }, 500);
    });

    // Submitting the search string
    pageElem.on('submit', 'form.search-user', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.search(this)
        .then(function (result) {
            //Handle Result
        })
        .fail(console.error);
    });
    
    pageElem.on('click', '.friend', function (e){
        page.view.showFriendModal(parseInt($(this).attr('data-friend-id'),10));
    });

    // Handle friend request
    pageElem.on('click', '.btnRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.REQUESTED)
        .then(function (result) {
            pageElem.find('form.search-user').submit();  
        })
        .fail(console.error);
    });

    // Handle block request
    pageElem.on('click', '.btnBlockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.BLOCKED)
        .then(function (result) {
            pageElem.find('form.search-user').submit();
        })
        .fail(console.error);
    });

    // Handle unblock request
    pageElem.on('click', '.btnUnblockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            pageElem.find('form.search-user').submit();
        })
        .fail(console.error);
    });

    // Handle cancel request
    pageElem.on('click', '.btnCancelRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            pageElem.find('form.search-user').submit();
        })
        .fail(console.error);
    });

    // Handle friend accept
    pageElem.on('click', '.btnAcceptModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.FRIEND)
        .then(function (result) {
            pageElem.find('form.search-user').submit();
        })
        .fail(console.error);
    });

    // Handle friend reject
    pageElem.on('click', '.btnRejectModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            pageElem.find('form.search-user').submit();
        })
        .fail(console.error);
    });

    // Handle unfriend
    pageElem.on('click', '.btnUnfriendModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            pageElem.find('form.search-user').submit();
        })
        .fail(console.error);
    });
};

AddFriendView.prototype.updateUserList = function (){
    var friendsElem = $(this.page.elem).find('.friends');
    var cardColor = '';
    var badge = '';

    // Clear any current cards from previous search
    $('.card').remove();

    for( var i=0; i<this.page.ctrl.friends.length; i++ ){
        // Determine how to style each card and modal based on status
        if (this.page.ctrl.friends[i].status === 'friend') {
            cardColor = 'card-success';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'requested') { 
            cardColor = 'card-info';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'pending') { 
            cardColor = 'card-warning';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'blocked') {
            cardColor = 'card-inverse';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'none') {
            cardColor = 'card-primary';
            badge = '';
        }

        // Add card for each user
        friendsElem.append(''+
        '<div class="friend card '+cardColor+'" data-friend-id="'+this.page.ctrl.friends[i].id+'">'+
            '<div class="card-block">'+
                '<h4 class="card-title">'+this.page.ctrl.friends[i].userName+
                    '<span style="display:inline-block; width: 10rem;"></span>'+
                    '<small>('+this.page.ctrl.friends[i].name+')</small>'+badge+                                        
                '</h4>'+
            '</div>'+
        '</div><p/>');
    }
};

AddFriendView.prototype.showFriendModal = function (friendId){
    var thisFriend = this.page.ctrl.friends.filter(function (friend){
        return friend.id == friendId;
    })[0],
        modalButtons;
        
    if (thisFriend.status === 'friend') {
        modalButtons = '<button type="button" class="btn btn-danger btnUnfriendModal" data-dismiss="modal">Unfriend</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'requested') { 
        modalButtons = '<button type="button" class="btn btn-default btnCancelRequestModal" data-dismiss="modal">Cancel Request</button>'+
                       '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'pending') { 
        modalButtons = '<button type="button" class="btn btn-success btnAcceptModal" data-dismiss="modal">Accept</button>'+
                        '<button type="button" class="btn btn-danger btnRejectModal" data-dismiss="modal">Reject</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'blocked') {
        modalButtons = '<button type="button" class="btn btn-default btnUnblockModal" data-dismiss="modal">Unblock User</button>';
    }
    else if (thisFriend.status === 'none') {
        modalButtons = '<button type="button" class="btn btn-success btnRequestModal" data-dismiss="modal">Send Friend Request</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    
    var friendModal = $(this.page.elem).find('.friend-modal');
    friendModal.find('.modal').attr('data-friend-id',thisFriend.id);
    friendModal.find('.modal-title').html(thisFriend.userName);
    friendModal.find('.modal-body').html('<p>'+thisFriend.name+'</p><p>'+thisFriend.bio+'</p>');
    friendModal.find('.dynamic-buttons').html(modalButtons);
    friendModal.find('.modal').modal();
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

function ApplicationsPage(app, data){
    Page.call(this, app, $('#applicationsPage')[0], ApplicationsCtrl, ApplicationsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
ApplicationsPage.prototype = Object.create(Page.prototype);
ApplicationsPage.prototype.constructor = ApplicationsPage;

function ApplicationsCtrl(page){
    PageCtrl.call(this, page);
    this.applications = [];
}
ApplicationsCtrl.prototype = Object.create(PageCtrl.prototype);
ApplicationsCtrl.prototype.constructor = ApplicationsCtrl;
ApplicationsCtrl.prototype.init = function (){
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    var defer = $.Deferred();
    var that = this;
    $.ajax('/api/bands/'+id+'/applications', {
        method: 'GET'
    }).then(function (data){
        that.applications = data;
        defer.resolve();
    }).catch(function (err){
        that.applications = [];
        defer.resolve();
    });
    
    return defer.promise();
};

ApplicationsCtrl.prototype.processApplication = function (applicationId, processStatus, applicationStatus) {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    var defer = $.Deferred();
    $.ajax({
        url: '/api/bands/'+id+'/processapplication',
        type: 'POST',
        data: {applicationId : applicationId, processStatus : processStatus, applicationStatus : applicationStatus}
    }).then(function (result){
        defer.resolve(result);
    }).catch(function (err){
        defer.resolve(err);
    });
    return defer.promise();
}

function ApplicationsView(page){
    PageView.call(this, page);
}
ApplicationsView.prototype = Object.create(PageView.prototype);
ApplicationsView.prototype.constructor = ApplicationsView;
ApplicationsView.prototype.init = function (){
    var applicationsElem = $(this.page.elem).find('.applications');
    var badge = '';

    for( var i=0; i<this.page.ctrl.applications.length; i++ ){
        if (this.page.ctrl.applications[i].status === Application.STATUS.APPLIED_MANAGER) {
            badge = '<span class="badge badge-pill badge-default pull-right">Manager';
        }
        else if (this.page.ctrl.applications[i].status === Application.STATUS.APPLIED_MEMBER) {
            badge = '<span class="badge badge-pill badge-default pull-right">Member';
        }
        else if (this.page.ctrl.applications[i].status === Application.STATUS.APPLIED_PROMOTER) {
            badge = '<span class="badge badge-pill badge-default pull-right">Promoter';
        }

        applicationsElem.append('<div class="application btn btn-secondary" data-application-id="'+this.page.ctrl.applications[i].id+'" data-application-status="'+this.page.ctrl.applications[i].status+'">'+this.page.ctrl.applications[i].username+' <small>('+this.page.ctrl.applications[i].name+')</small>'+badge+'</div><p/>');
    }
    
    this.bindEvents();
};

ApplicationsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;

    pageElem.on('click', '.application', function (e){
        page.view.showApplicationModal(parseInt($(e.target).attr('data-application-id'),10),parseInt($(e.target).attr('data-application-status'),10));
    });

    // Handle friend accept
    pageElem.on('click', '#btnAccept', function (e){
        e.preventDefault();
        e.stopPropagation();
        applicationId = parseInt($(this.parentElement.parentElement.parentElement.parentElement).attr('data-application-id'),10);
        applicationStatus = parseInt($(this.parentElement.parentElement.parentElement.parentElement).attr('data-application-status'),10);
        page.ctrl.processApplication(applicationId, Application.STATUS.ACCEPTED, applicationStatus)
        .then(function (result) {
            if (result === true) {
                alert("Success!"); 
                location.reload();   
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

        // Handle friend accept
    pageElem.on('click', '#btnReject', function (e){
        e.preventDefault();
        e.stopPropagation();
        applicationId = parseInt($(this.parentElement.parentElement.parentElement.parentElement).attr('data-application-id'),10);
        applicationStatus = parseInt($(this.parentElement.parentElement.parentElement.parentElement).attr('data-application-status'),10);
        page.ctrl.processApplication(applicationId, Application.STATUS.REJECTED, applicationStatus)
        .then(function (result) {
            if (result === true) {
                alert("Success!");
                location.reload();     
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })
};

ApplicationsView.prototype.showApplicationModal = function (applicationId, applicationStatus){
    var thisApplication = this.page.ctrl.applications.filter(function (application){
        return application.id == applicationId;
    })[0];
    
    var applicationModal = $(this.page.elem).find('.application-modal');
    applicationModal.find('.modal').attr('data-application-id',thisApplication.id);
    applicationModal.find('.modal').attr('data-application-status',thisApplication.status);
    applicationModal.find('.modal-title').html(thisApplication.name+' - '+thisApplication.username);
    applicationModal.find('.modal-body').html('<p>Instrument: '+thisApplication.instrument+'</p><p>Message: '+thisApplication.message);
    applicationModal.find('.modal').modal();
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

function BandPage(app, data){
    Page.call(this, app, $('#bandPage')[0], BandCtrl, BandView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
BandPage.prototype = Object.create(Page.prototype);
BandPage.prototype.constructor = BandPage;

function BandCtrl(page){
    PageCtrl.call(this, page);
    this.band = {};
}
BandCtrl.prototype = Object.create(PageCtrl.prototype);
BandCtrl.prototype.constructor = BandCtrl;
BandCtrl.prototype.init = function (){
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

   // var id = window.location.search.substr(1);
    var defer = $.Deferred();
    var that = this;
    $.ajax('/api/bands/band/' + id, {
        method: 'GET'
    }).then(function (data){
        that.band = data;
        defer.resolve();
    }).catch(function (err){
        that.band = {};
        defer.resolve();
    });
    
    return defer.promise();
};

function BandView(page){
    PageView.call(this, page);
}
BandView.prototype = Object.create(PageView.prototype);
BandView.prototype.constructor = BandView;
BandView.prototype.init = function (){
    var bandElem = $(this.page.elem).find('.band');
    bandElem.append('<h2 class="card-title">My Band</h2>');
    bandElem.append('<div class="card-block"></div>');
    bandElem.find('.card-block').append('<p class="info card-text"><strong>Band Name</strong>: '+this.page.ctrl.band[0].bandName+'</p>');
    bandElem.find('.card-block').append('<p class="info card-text"><strong>Owner</strong>: '+this.page.ctrl.band[0].ownerName+'</p>');
    bandElem.find('.card-block').append('<p class="info card-text"><strong>Description</strong>: '+this.page.ctrl.band[0].description+'</p>');
    this.bindEvents();
};

BandView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem);

     pageElem.on('click', '.applications', function (e){
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);

        window.location = '/applications/' + id;
    });
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

function BandsPage(app, data){
    Page.call(this, app, $('#bandsPage')[0], BandsCtrl, BandsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
BandsPage.prototype = Object.create(Page.prototype);
BandsPage.prototype.constructor = BandsPage;

function BandsCtrl(page){
    PageCtrl.call(this, page);
    this.bands = [];
}
BandsCtrl.prototype = Object.create(PageCtrl.prototype);
BandsCtrl.prototype.constructor = BandsCtrl;
BandsCtrl.prototype.init = function (){
    var defer = $.Deferred();
    var that = this;
    $.ajax('/api/bands', {
        method: 'GET'
    }).then(function (data){
        that.bands = data;
        defer.resolve();
    }).catch(function (err){
        that.bands = [];
        defer.resolve();
    });
    
    return defer.promise();
};

function BandsView(page){
    PageView.call(this, page);
}
BandsView.prototype = Object.create(PageView.prototype);
BandsView.prototype.constructor = BandsView;
BandsView.prototype.init = function (){
    var bandsElem = $(this.page.elem).find('.bands');
    for( var i=0; i<this.page.ctrl.bands.length; i++ ){
        bandsElem.append('<div class="band btn btn-secondary" id='+this.page.ctrl.bands[i].id+'>'+this.page.ctrl.bands[i].bandName+' <small>(owned by: '+this.page.ctrl.bands[i].ownerName+')</small></div>');
    }
    
    this.bindEvents();
};

BandsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem);
    
    pageElem.on('click', '.register-band', function (e){
        window.location = '/bands/register';
    });
    pageElem.on('click', '.band', function (e){
        window.location = '/bands/band/' + e.target.id;
    })
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Friend */

function FriendsPage(app, data){
    Page.call(this, app, $('#friendsPage')[0], FriendsCtrl, FriendsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
FriendsPage.prototype = Object.create(Page.prototype);
FriendsPage.prototype.constructor = FriendsPage;

function FriendsCtrl(page){
    PageCtrl.call(this, page);
    this.friends = [];
}
FriendsCtrl.prototype = Object.create(PageCtrl.prototype);
FriendsCtrl.prototype.constructor = FriendsCtrl;
FriendsCtrl.prototype.init = function (){
    var defer = $.Deferred();
    var that = this;
    that.friends = [];
    $.ajax('/api/friends', {
        method: 'GET'
    }).then(function (data){
        that.friends = data;
        defer.resolve();
    }).catch(function (err){
        defer.reject(err);
    });

    return defer.promise();
};

FriendsCtrl.prototype.updateStatus = function (toUserId, status){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/friends/updatestatus',
        type: 'POST',
        data: {toUserId : toUserId, status : status}
    }).then(function (result){
        defer.resolve(result);
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};

function FriendsView(page){
    PageView.call(this, page);
}
FriendsView.prototype = Object.create(PageView.prototype);
FriendsView.prototype.constructor = FriendsView;
FriendsView.prototype.init = function (){
    this.bindEvents();
    this.updateUserList();
};

FriendsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;
    
    pageElem.on('click', '.add-friend', function (e){
        window.location = '/friends/add';
    });

    pageElem.on('click', '.friend', function (e){
        page.view.showFriendModal(parseInt($(this).attr('data-friend-id'),10));
    });

    pageElem.on('click', '.btnRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.REQUESTED)
        .then(function (result) {
            window.location.reload();  
        }).fail(console.error);
    });

    pageElem.on('click', '.btnBlockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.PENDING)
        .then(function (result) {
            window.location.reload();  
        }).fail(console.error);
    });

    pageElem.on('click', '.btnUnblockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            window.location.reload();  
        }).fail(console.error);
    });

    pageElem.on('click', '.btnCancelRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            window.location.reload();  
        }).fail(console.error);
    });

    pageElem.on('click', '.btnAcceptModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.FRIEND)
        .then(function (result) {
            window.location.reload();  
        }).fail(console.error);
    });

    pageElem.on('click', '.btnRejectModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            window.location.reload();  
        }).fail(console.error);
    });

    pageElem.on('click', '.btnUnfriendModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (result) {
            window.location.reload();  
        }).fail(console.error);
    });        
};

FriendsView.prototype.updateUserList = function (){
    var friendsElem = $(this.page.elem).find('.friends');
    var cardColor = '';
    var badge = '';

    // Clear any current cards from previous search
    friendsElem.find('.card').remove();

    for( var i=0; i<this.page.ctrl.friends.length; i++ ){
        // Determine how to style each card and modal based on status
        if (this.page.ctrl.friends[i].status === 'friend') {
            cardColor = 'card-success';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'requested') { 
            cardColor = 'card-info';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'pending') { 
            cardColor = 'card-warning';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'blocked') {
            cardColor = 'card-inverse';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'none') {
            cardColor = 'card-primary';
            badge = '';
        }

        // Add card for each user
        friendsElem.append(''+
        '<div class="friend card '+cardColor+'" data-friend-id="'+this.page.ctrl.friends[i].id+'">'+
            '<div class="card-block">'+
                '<h4 class="card-title">'+this.page.ctrl.friends[i].userName+
                    '<span style="display:inline-block; width: 10rem;"></span>'+
                    '<small>('+this.page.ctrl.friends[i].name+')</small>'+badge+                                        
                '</h4>'+
            '</div>'+
        '</div><p/>');
    }
};

FriendsView.prototype.showFriendModal = function (friendId){
    var thisFriend = this.page.ctrl.friends.filter(function (friend){
        return friend.id == friendId;
    })[0],
        modalButtons;
        
    if (thisFriend.status === 'friend') {
        modalButtons = '<button type="button" class="btn btn-danger btnUnfriendModal" data-dismiss="modal">Unfriend</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'requested') { 
        modalButtons = '<button type="button" class="btn btn-default btnCancelRequestModal" data-dismiss="modal">Cancel Request</button>'+
                       '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'pending') { 
        modalButtons = '<button type="button" class="btn btn-success btnAcceptModal" data-dismiss="modal">Accept</button>'+
                        '<button type="button" class="btn btn-danger btnRejectModal" data-dismiss="modal">Reject</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'blocked') {
        modalButtons = '<button type="button" class="btn btn-default btnUnblockModal" data-dismiss="modal">Unblock User</button>';
    }
    else if (thisFriend.status === 'none') {
        modalButtons = '<button type="button" class="btn btn-success btnRequestModal" data-dismiss="modal">Send Friend Request</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    
    var friendModal = $(this.page.elem).find('.friend-modal');
    friendModal.find('.modal').attr('data-friend-id',thisFriend.id);
    friendModal.find('.modal-title').html(thisFriend.userName);
    friendModal.find('.modal-body').html('<p>'+thisFriend.name+'</p><p>'+thisFriend.bio+'</p>');
    friendModal.find('.dynamic-buttons').html(modalButtons);
    friendModal.find('.modal').modal();
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

/**
 * PAGE
 * */
function LoginPage(app, data){
    Page.call(this, app, $('#loginPage')[0], LoginCtrl, LoginView);
}
LoginPage.prototype = Object.create(Page.prototype);
LoginPage.prototype.constructor = LoginPage;

/**
 * CONTROLLER
 * */
function LoginCtrl(page){
    PageCtrl.call(this, page);
    this.loggingIn = false;
}
LoginCtrl.prototype = Object.create(PageCtrl.prototype);
LoginCtrl.prototype.constructor = LoginCtrl;

LoginCtrl.prototype.login = function (form){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: $(form).serialize()
    }).then(function (result){
        defer.resolve();
    }).fail(function (result){
        defer.reject();
    });
    return defer.promise();
};

/**
 * VIEWER
 * */
function LoginView(page){
    PageView.call(this, page);
}
LoginView.prototype = Object.create(PageView.prototype);
LoginView.prototype.constructor = LoginView;
LoginView.prototype.init = function (){
    this.bindEvents();
};

LoginView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        page = this.page;
        
    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( page.ctrl.loggingIn ){
            return false;
        }
        else{
            page.ctrl.loggingIn = true;
        }
        
        //show spinner
        var form = $(this),
            submitButton = form.find('[type=submit]');
        
        //close any existing alerts
        form.find('.alert').alert('close');
        
        //show the login thinking spinner
        submitButton.html('<div class="fa fa-spinner animation-spin"></div>');
        
        //actually try to login
        page.ctrl.login(this)
        .then(function (){
            submitButton.removeClass('btn-primary').addClass('btn-success');
            submitButton.find('div').removeClass('fa-spinner animation-spin').addClass('fa-check');
            //change page
            setTimeout(function (){
                window.location = '/main';
            }, 500);
        }).fail(function (err){
            submitButton.removeClass('btn-primary').addClass('btn-danger');
            submitButton.find('div').removeClass('fa-spinner animation-spin').addClass('fa-times');
            //change page
            setTimeout(function (){
                submitButton.html('Login').addClass('btn-primary').removeClass('btn-danger');
                page.ctrl.loggingIn = false;
            }, 1000);
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Login Failed!</strong> Username or password was incorrect.'
            +'</div>');
        });
    });
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global MenuComponent */
/* global $ */

function MainPage(app, data){
    Page.call(this, app, $('#mainPage')[0], MainCtrl, MainView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
MainPage.prototype = Object.create(Page.prototype);
MainPage.prototype.constructor = MainPage;

function MainCtrl(page){
    PageCtrl.call(this, page);
}
MainCtrl.prototype = Object.create(PageCtrl.prototype);
MainCtrl.prototype.constructor = MainCtrl;

function MainView(page){
    PageView.call(this, page);
}
MainView.prototype = Object.create(PageView.prototype);
MainView.prototype.constructor = MainView;
MainView.prototype.init = function (){
    var page = this.page;
    $(page.elem).on('click', '.bands', function (e){
        window.location = '/bands';
    });
    $(page.elem).on('click', '.friends', function (e){
        window.location = '/friends';
    });
    $(page.elem).on('click', '.add-friends', function (e){
        window.location = '/friends/add';
    });
    $(page.elem).on('click', '.search-bands', function (e){
        window.location = '/bands/search';
    });
    $(page.elem).on('click', '.notifications', function (e){
        window.location = '/notifications';
    });
};
;//bundle semicolon

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
        ctrl.getNotifications().then(resolve).catch(reject);
    });
};
NotificationsCtrl.prototype.getNotifications = function (){
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

NotificationsCtrl.prototype.deleteNotification = function (){
    return Promise.resolve();
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
    var pageElem = $(this.page.elem),
        page = this.page;
        
    pageElem.on('close.bs.alert', function (e) {
        //delete notification on the server
        page.ctrl.deleteNotification($(this).attr('data-notification-id'))
        .then(page.ctrl.getNotifications)
        .then(page.view.render)
        .catch(function (err){
            alert(err.stack);
            page.ctrl.getNotifications();
        });
    });
};

NotificationsView.prototype.render = function (){
    var notificationElem = $('#notificationsPage').find('.notifications').empty();
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
        notificationElem.append(''+
        '<a href="'+notification.link+'" class="notification alert alert-dismissable '+alertType+'" data-notification-id="'+notification.notificationId+'">'+
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
            '</button>'+
            notification.message+
        '</a>');
    });
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

/**
 * PAGE
 * */
function RegisterPage(app, data){
    Page.call(this, app, $('#registerPage')[0], RegisterCtrl, RegisterView);
}
RegisterPage.prototype = Object.create(Page.prototype);
RegisterPage.prototype.constructor = RegisterPage;

/**
 * CONTROLLER
 * */
function RegisterCtrl(page){
    PageCtrl.call(this, page);
    this.registering = false;
}
RegisterCtrl.prototype = Object.create(PageCtrl.prototype);
RegisterCtrl.prototype.constructor = RegisterCtrl;

RegisterCtrl.prototype.register = function (form){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/register',
        type: 'POST',
        data: $(form).serialize()
    }).then(function (result){
        defer.resolve();
    }).fail(function (result){
        defer.reject();
    });
    return defer.promise();
};

/**
 * VIEWER
 * */
function RegisterView(page){
    PageView.call(this, page);
}
RegisterView.prototype = Object.create(PageView.prototype);
RegisterView.prototype.constructor = RegisterView;
RegisterView.prototype.init = function (){
    this.bindEvents();
};

RegisterView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        page = this.page;
        
    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( page.ctrl.registering ){
            return false;
        }
        else{
            page.ctrl.registering = true;
        }
        //show spinner
        var form = $(this),
            submitButton = form.find('[type=submit]');
        
        //close any existing alerts
        form.find('.alert').alert('close');
        
        //show the login thinking spinner
        submitButton.html('<div class="fa fa-spinner animation-spin"></div>');
        
        //actually try to login
        page.ctrl.register(this)
        .then(function (){
            submitButton.removeClass('btn-primary').addClass('btn-success');
            submitButton.find('div').removeClass('fa-spinner animation-spin').addClass('fa-check');
            //display register failure
            form.prepend('<div class="alert alert-success alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Registration Successful!</strong> Redirecting in 2 seconds...'
            +'</div>');
            //change page
            setTimeout(function (){
                window.location = '/login';
            }, 2000);
        }).fail(function (err){
            submitButton.removeClass('btn-primary').addClass('btn-danger');
            submitButton.find('div').removeClass('fa-spinner animation-spin').addClass('fa-times');
            
            setTimeout(function (){
                submitButton.html('Login').addClass('btn-primary').removeClass('btn-danger')
                page.ctrl.registering = false;
            }, 1000);
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Login Failed!</strong> Username or password was incorrect.'
            +'</div>');
        });
    });
}
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

function RegisterBandPage(app, data){
    Page.call(this, app, $('#registerBandPage')[0], RegisterBandCtrl, RegisterBandView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
RegisterBandPage.prototype = Object.create(Page.prototype);
RegisterBandPage.prototype.constructor = RegisterBandPage;

function RegisterBandCtrl(page){
    PageCtrl.call(this, page);
    this.registering = false;
}
RegisterBandCtrl.prototype = Object.create(PageCtrl.prototype);
RegisterBandCtrl.prototype.constructor = RegisterBandCtrl;
RegisterBandCtrl.prototype.login = function (form){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/bands/register',
        type: 'POST',
        data: $(form).serialize()
    }).then(function (result){
        defer.resolve();
    }).fail(function (result){
        defer.reject();
    });
    return defer.promise();
};

function RegisterBandView(page){
    PageView.call(this, page);
}
RegisterBandView.prototype = Object.create(PageView.prototype);
RegisterBandView.prototype.constructor = RegisterBandView;
RegisterBandView.prototype.init = function (){
    this.bindEvents();
};

RegisterBandView.prototype.bindEvents = function (){
    var page = this.page,
        pageElem = $(this.page.elem);
    
    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( page.ctrl.registering ){
            return false;
        }
        else{
            page.ctrl.registering = true;
        }
        
        //show spinner
        var form = $(this),
            submitButton = form.find('[type=submit]');
        
        //close any existing alerts
        form.find('.alert').alert('close');
        
        //show the login thinking spinner
        submitButton.html('<div class="fa fa-spinner animation-spin"></div>');
        
        //actually try to login
        page.ctrl.login(this)
        .then(function (){
            submitButton.removeClass('btn-primary').addClass('btn-success');
            submitButton.find('div').removeClass('fa-spinner animation-spin').addClass('fa-check');
            //display register failure
            form.prepend('<div class="alert alert-success alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Registration Successful!</strong> Redirecting in 2 seconds...'
            +'</div>');
            //change page
            setTimeout(function (){
                window.location = '/bands';
            }, 2000);
        }).catch(function (err){
            submitButton.removeClass('btn-primary').addClass('btn-danger');
            submitButton.find('div').removeClass('fa-spinner animation-spin').addClass('fa-times');
            //change page
            setTimeout(function (){
                submitButton.html('Login').addClass('btn-primary').removeClass('btn-danger');
                page.ctrl.registering = false;
            }, 1000);
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Band Registration Failed!</strong>'
            +'</div>');
        });
    });
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
var searching = false;

function SearchBandsPage(app, data){
    Page.call(this, app, $('#searchBandsPage')[0], SearchBandsCtrl, SearchBandsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
SearchBandsPage.prototype = Object.create(Page.prototype);
SearchBandsPage.prototype.constructor = SearchBandsPage;

function SearchBandsCtrl(page){
    PageCtrl.call(this, page);
    this.bands = [];
    this.searching = false;
}
SearchBandsCtrl.prototype = Object.create(PageCtrl.prototype);
SearchBandsCtrl.prototype.constructor = SearchBandsCtrl;

SearchBandsCtrl.prototype.search = function (form){
    var defer = $.Deferred();
    var that = this;
    that.bands = [];
    $.ajax({
        url: '/api/bands/search',
        type: 'POST',
        data: $(form).serialize()
    }).then(function (data){
        that.bands = data;
        that.page.view.updateBandList();
        defer.resolve();
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};

// This method will update the relation the application for the current user and the selected band
SearchBandsCtrl.prototype.submitApplication = function (bandId, form){
    var defer = $.Deferred();
    var that = this;
    $.ajax({
        url: `/api/bands/${bandId}/submitApplication`,
        type: 'POST',
        data: $(form).serialize()
    }).then(function (result){
        if (result === true) {
            alert("Success!"); 
        }
        else {
            alert("Failure!");
        }
        defer.resolve(result);
    }).catch(function (err){
        alert("Error!"); 
        defer.reject(err);
    });
    return defer.promise();
};

// This method will delete the application for the current user and this band
SearchBandsCtrl.prototype.cancelApplication = function (bandId){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/bands/cancelApplication',
        type: 'POST',
        data: {bandId : bandId}
    }).then(function (result){
        defer.resolve(result);
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};

SearchBandsCtrl.prototype.expandBandModal = function(applicationType, applicationStatus, bandId) {
    $('.modal-body').remove();
    $('.modal-footer').remove();    

    var bandModal = $(this.page.elem).find('.modal-content');
    var bandName = bandModal.find('.modal-title').html();
    var instrumentField = '';

    bandModal.find('.modal-title').html(bandName+'<br/>'+applicationType+' Application');

    if (applicationType === 'Member') {
        instrumentField = '<input required class="form-control" type="text" name="instrument" placeholder="Instrument" /><p/>';
    }
    else {
        instrumentField = '<input type="hidden" name="instrument" value="N/A"/><p/>';  
    }

    bandModal.append(''+
    '<div class="modal-body">'+
        '<form id="apply-form" class="apply-form" onsubmit="return">'+
            '<div class="form-group">'+
                instrumentField+
                '<input required class="form-control" type="text" name="message" placeholder="Message" />'+
                '<input type="hidden" name="bandId" value="'+bandId+'" />'+
                '<input type="hidden" name="applicationStatus" value="'+applicationStatus+'" />'+
            '</div>'+
        '</form>'+
    '</div>'+
    '<div class="modal-footer">'+                        
            '<button class="btn btn-primary" type="submit" name="submit" form="apply-form">'+
                'Submit'+
            '</button>'+
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
        '</div>'+                       
    '</div>');
};

function SearchBandsView(page){
    PageView.call(this, page);
    this.searchTimeout = undefined;
}
SearchBandsView.prototype = Object.create(PageView.prototype);
SearchBandsView.prototype.constructor = SearchBandsView;
SearchBandsView.prototype.init = function (){   
    this.bindEvents();
};

SearchBandsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;
    
    // This will run a search every second when the user presses a key. 
    $(document).on('keyup', '.search-form input', function (e){
        var thisForm = $(this);
        clearTimeout(page.view.searchTimeout);
        page.view.searchTimeout = setTimeout(function () {
            thisForm.submit();
        }, 500);
    });

    // Submitting the search string
    pageElem.on('submit', 'form.search-form', function (e){
        e.preventDefault();
        e.stopPropagation();     
        page.ctrl.search(this)
        .then(function (result){           
        })
        .fail(console.error);
    });
    
    pageElem.on('submit', 'form.apply-form', function (e){
        e.preventDefault();
        e.stopPropagation();       
        $('.modal').modal('hide');   
        page.ctrl.submitApplication(parseInt($(this).parents('.modal').attr('data-band-id'), 10), this)
        .then(function (result) {
            pageElem.find('form.search-form').submit();
            //handle the application result
        })
        .fail(console.error);
    });
    // Toggle Band Modal
    
    pageElem.on('click', '.band', function (e){
        page.view.showBandModal(parseInt($(this).attr('data-band-id'),10));
    });

    // Handle manager application request
    pageElem.on('click', '#btnApplyManager', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-band-id'),10)
        page.ctrl.expandBandModal('Manager', Application.STATUS.APPLIED_MANAGER, bandId);
    })

    // Handle member application request
    pageElem.on('click', '#btnApplyMember', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-band-id'),10)
        page.ctrl.expandBandModal('Member', Application.STATUS.APPLIED_MEMBER, bandId);
    })

    // Handle promoter application request
    pageElem.on('click', '#btnApplyPromoter', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-band-id'),10)
        page.ctrl.expandBandModal('Promoter', Application.STATUS.APPLIED_PROMOTER, bandId);
    });

    // Handle application cancel request
    pageElem.on('click', '#btnCancelApplicationModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-band-id'),10)
        page.ctrl.cancelApplication(bandId)
        .then(function (result) {
            if (result === true) {
                alert("Success!");    
                pageElem.find('form').submit();
            }
            else {
                alert("Failure!");
            }
        })
        .fail(console.error);
    });

    /*pageElem.on('hidden.bs.modal', '#modal7', function (e){
        this.updateBandList;
    });*/
};

SearchBandsView.prototype.updateBandList = function (){
    var bandsElem = $(this.page.elem).find('.bands');
    var cardColor = '';
    var badge = '';

    // Clear any current cards from previous search
    $('.card').remove();

    for( var i=0; i<this.page.ctrl.bands.length; i++ ){

        // If you have a role then you are in the band, so no modal buttons
        if (this.page.ctrl.bands[i].role != 'none') {
            cardColor = 'card-success';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.bands[i].role;
        }
        // Determine how to style each card and modal based on application status if they do not have a role in the band
        else if (this.page.ctrl.bands[i].applicationStatus === 'applied (manager)') {
            cardColor = 'card-info';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.bands[i].applicationStatus;

        }
        else if (this.page.ctrl.bands[i].applicationStatus === 'applied (member)') {
            cardColor = 'card-info';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.bands[i].applicationStatus;

        }
        else if (this.page.ctrl.bands[i].applicationStatus === 'applied (promoter)') {
            cardColor = 'card-info';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.bands[i].applicationStatus;
        }
        else if (this.page.ctrl.bands[i].applicationStatus === 'rejected') { 
            cardColor = 'card-primary';
        }
        else if (this.page.ctrl.bands[i].applicationStatus === 'none') {
            cardColor = 'card-primary';
            badge = '';
        }

        // Add card for each band
        bandsElem.append(''+
        '<div class="band card '+cardColor+'" data-band-id="'+this.page.ctrl.bands[i].id+'" >'+
            '<div class="card-block">'+
                '<h4 class="card-title">'+this.page.ctrl.bands[i].bandName+
                    '<span style="display:inline-block; width: 10rem;"></span>'+
                    '<small>('+this.page.ctrl.bands[i].genre+')</small>'+badge+
                '</h4>'+
            '</div>'+
        '</div><p/>');
    }
};

SearchBandsView.prototype.showBandModal = function (bandId){
    var thisBand = this.page.ctrl.bands.filter(function (band){
        return band.id == bandId;
    })[0],
        modalButtons;
    
    if (thisBand.role != 'none') {
        modalButtons = '';
    }
    // Determine how to style each card and modal based on application status if they do not have a role in the band
    else if (thisBand.applicationStatus === 'applied (manager)') {
        modalButtons = '<button id="btnCancelApplicationModal" type="button" class="btn btn-default" data-dismiss="modal">Cancel Manager Application</button>';
    }
    else if (thisBand.applicationStatus === 'applied (member)') {
        modalButtons = '<button id="btnCancelApplicationModal" type="button" class="btn btn-default" data-dismiss="modal">Cancel Member Application</button>';
    }
    else if (thisBand.applicationStatus === 'applied (promoter)') {
        modalButtons = '<button id="btnCancelApplicationModal" type="button" class="btn btn-default" data-dismiss="modal">Cancel Promoter Application</button>';
    }
    else if (thisBand.applicationStatus === 'rejected') { 
        modalButtons = '';
    }
    else if (thisBand.applicationStatus === 'none') {
        modalButtons = '<button id="btnApplyManager" type="button" class="btn btn-success">Apply for Manager</button>'+ 
                       '<button id="btnApplyMember" type="button" class="btn btn-success">Apply for Member</button>'+
                       '<button id="btnApplyPromoter" type="button" class="btn btn-success">Apply for Promoter</button>';
    }
    
    var bandModal = $(this.page.elem).find('.band-modal');
    bandModal.find('.modal').attr('data-band-id',thisBand.id);
    bandModal.find('.modal-title').html(thisBand.bandName);
    bandModal.find('.modal-body').html('<p>'+thisBand.description+'</p>');
    bandModal.find('.modal-footer').html('<div class="dynamic-buttons"></div><button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
    bandModal.find('.dynamic-buttons').html(modalButtons);
    bandModal.find('.modal').modal();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJub3RpZmljYXRpb24uanMiLCJzZWFyY2hlZEJhbmQuanMiLCJzaW1wbGVCYW5kLmpzIiwiYXBwLmpzIiwicGFnZS5qcyIsIm1lbnUuanMiLCJhZGRGcmllbmQuanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FWakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FXakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gQXBwbGljYXRpb24oanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnVzZXJuYW1lID0ganNvbi51c2VybmFtZSB8fCAnJztcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5pbnN0cnVtZW50ID0ganNvbi5pbnN0cnVtZW50IHx8ICcnO1xuICAgIHRoaXMubWVzc2FnZSA9IGpzb24ubWVzc2FnZSB8fCAnJztcbn1cblxuQXBwbGljYXRpb24uU1RBVFVTID0ge1xuXHROT05FOiAwLCBcbiAgICBBUFBMSUVEX01BTkFHRVI6IDEsXG4gICAgQVBQTElFRF9NRU1CRVI6IDIsXG4gICAgQVBQTElFRF9QUk9NT1RFUjogMyxcblx0QUNDRVBURUQ6IDQsIFxuXHRSRUpFQ1RFRDogNSxcbiAgICBCTE9DS0VEOiA2XG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uOyB9IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kUGFnZScpWzBdLCBCYW5kQ3RybCwgQmFuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFBhZ2U7XG5cbmZ1bmN0aW9uIEJhbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kID0ge307XG59XG5CYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5CYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kQ3RybDtcbkJhbmRDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XG5cbiAgIC8vIHZhciBpZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzL2JhbmQvJyArIGlkLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICB0aGF0LmJhbmQgPSB7fTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBCYW5kVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuQmFuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFZpZXc7XG5CYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kJyk7XG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8aDIgY2xhc3M9XCJjYXJkLXRpdGxlXCI+TXkgQmFuZDwvaDI+Jyk7XG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPjwvZGl2PicpO1xuICAgIGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJykuYXBwZW5kKCc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5CYW5kIE5hbWU8L3N0cm9uZz46ICcrdGhpcy5wYWdlLmN0cmwuYmFuZFswXS5iYW5kTmFtZSsnPC9wPicpO1xuICAgIGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJykuYXBwZW5kKCc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5Pd25lcjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLm93bmVyTmFtZSsnPC9wPicpO1xuICAgIGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJykuYXBwZW5kKCc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5EZXNjcmlwdGlvbjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLmRlc2NyaXB0aW9uKyc8L3A+Jyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5CYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xuXG4gICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb25zJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICB2YXIgaWQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9hcHBsaWNhdGlvbnMvJyArIGlkO1xuICAgIH0pO1xufTsiLCJmdW5jdGlvbiBCYW5kTWVtYmVyKGpzb24pe1xuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuYmFuZElkID0ganNvbi5iYW5kSWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudXNlcm5hbWUgPSBqc29uLnVzZXJuYW1lIHx8ICcnO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XG4gICAgdGhpcy5yb2xlID0ganNvbi5yb2xlIHx8ICcnO1xufVxuXG5CYW5kTWVtYmVyLlJPTEUgPSB7XG4gICAgT1dORVIgOiAwLFxuICAgIE1BTkFHRVI6IDEsXG4gICAgTUVNQkVSIDogMixcbiAgICBQUk9NT1RFUiA6IDNcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQmFuZE1lbWJlcjsgfSIsImZ1bmN0aW9uIEZyaWVuZChqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMudXNlck5hbWUgPSBqc29uLnVzZXJOYW1lIHx8ICcnO1xuICAgIHRoaXMuYmlvID0ganNvbi5iaW8gfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8ICcnO1xufVxuXG5GcmllbmQuU1RBVFVTID0ge1xuXHROT05FOiAwLCBcblx0RlJJRU5EOiAxLCBcblx0UkVRVUVTVEVEOiAyLCBcblx0UEVORElORzogMywgXG5cdEJMT0NLRUQ6IDQgXG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEZyaWVuZDsgfSIsImZ1bmN0aW9uIE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25JZCwgdXNlcklkLCB0eXBlLCBtZXNzYWdlLCBsaW5rLCB1bnJlYWQpe1xuICAgIHRoaXMubm90aWZpY2F0aW9uSWQgPSBub3RpZmljYXRpb25JZDtcbiAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5saW5rID0gbGluaztcbiAgICB0aGlzLnVucmVhZCA9IHVucmVhZDtcbn1cbk5vdGlmaWNhdGlvbi5UWVBFID0ge1xuICAgIE5PX01FU1NBR0U6IDAsXG4gICAgRlJJRU5EX1JFUVVFU1Q6IDEsXG4gICAgRlJJRU5EX0FDQ0VQVEVEOiAyLFxuICAgIEJBTkRfSU5WSVRFOiAzLFxuICAgIFJFTU9WRURfRlJPTV9CQU5EOiA0LFxuICAgIEVWRU5UX0lOVklURTogNSxcbiAgICBFVkVOVF9SRU1JTkRFUjogNixcbiAgICBFUlJPUjogNyxcbiAgICBTVUNDRVNTOiA4LFxuICAgIFdBUk5JTkc6IDlcbn07XG5Ob3RpZmljYXRpb24uZnJvbU9iaiA9IGZ1bmN0aW9uIChvYmope1xuICAgIHZhciBteU5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24oKTtcbiAgICBteU5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25JZCA9IG9iai5ub3RpZmljYXRpb25JZCB8fCBvYmouTm90aWZpY2F0aW9uSWQgfHwgLTE7XG4gICAgbXlOb3RpZmljYXRpb24udXNlcklkID0gb2JqLnVzZXJJZCB8fCBvYmouVXNlcklkIHx8IC0xO1xuICAgIG15Tm90aWZpY2F0aW9uLnR5cGUgPSBvYmoudHlwZSB8fCBvYmouVHlwZSB8fCBOb3RpZmljYXRpb24uVFlQRS5OT19NRVNTQUdFO1xuICAgIG15Tm90aWZpY2F0aW9uLm1lc3NhZ2UgPSBvYmoubWVzc2FnZSB8fCBvYmouTWVzc2FnZSB8fCAnJztcbiAgICBteU5vdGlmaWNhdGlvbi5saW5rID0gb2JqLmxpbmsgfHwgb2JqLkxpbmsgfHwgJyMnO1xuICAgIG15Tm90aWZpY2F0aW9uLnVucmVhZCA9IG9iai51bnJlYWQgfHwgb2JqLlVucmVhZCB8fCB0cnVlO1xuICAgIHJldHVybiBteU5vdGlmaWNhdGlvbjtcbn07XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IE5vdGlmaWNhdGlvbjsgfVxuIiwiZnVuY3Rpb24gU2VhcmNoZWRCYW5kKGpzb24pe1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YXR1cyA9IGpzb24uYXBwbGljYXRpb25TdGF0dXMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucm9sZSA9IGpzb24ucm9sZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGpzb24uZGVzY3JpcHRpb24gfHwgJyc7XG4gICAgdGhpcy5nZW5yZSA9IGpzb24uZ2VucmUgfHwgJyc7XG59XG5cblNlYXJjaGVkQmFuZC5ST0xFID0ge1xuICAgIE9XTkVSOiAwLFxuICAgIE1BTkFHRVI6IDEsXG4gICAgTUVNQkVSOiAyLFxuICAgIFBST01PVEVSOiAzXG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNlYXJjaGVkQmFuZDsgfSIsImZ1bmN0aW9uIFNpbXBsZUJhbmQoanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLm93bmVyTmFtZSA9IGpzb24ub3duZXJOYW1lIHx8ICcnO1xuICAgIHRoaXMub3duZXJJZCA9IGpzb24ub3duZXJJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUJhbmQ7IH0iLCIvKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBBcHAoKXtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdW5kZWZpbmVkO1xuICAgIC8vdGhpcy5wYWdlSGlzdG9yeSA9IFtdO1xufVxuQXBwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKFBhZ2VDb25zdHJ1Y3Rvcil7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBQYWdlQ29uc3RydWN0b3IodGhpcyk7XG4gICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcbn07XG4vKkFwcC5wcm90b3R5cGUuY2hhbmdlUGFnZSA9IGZ1bmN0aW9uIChwYWdlLCBkYXRhKXtcbiAgICBpZiggdGhpcy5jdXJyZW50UGFnZSApe1xuICAgICAgICAvL3N0b3JlIHRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGxhc3QgcGFnZVxuICAgICAgICB0aGlzLnBhZ2VIaXN0b3J5LnB1c2godGhpcy5jdXJyZW50UGFnZS5jb25zdHJ1Y3Rvcik7XG4gICAgICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfVxuICAgIC8vY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBuZXh0IHBhZ2VcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IHBhZ2UodGhpcyk7XG4gICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcbn07Ki8iLCIvKiBnbG9iYWwgJCAqL1xuLyoqIEluaGVyaXRhYmxlIENsYXNzZXMgKiovXG5mdW5jdGlvbiBQYWdlKGFwcCwgZWxlbSwgY3RybENvbnN0cnVjdG9yLCB2aWV3Q29uc3RydWN0b3IsIGNoaWxkQ29tcG9uZW50cyl7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICB0aGlzLmN0cmwgPSBuZXcgY3RybENvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHRoaXMudmlldyA9IG5ldyB2aWV3Q29uc3RydWN0b3IodGhpcyk7XG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMgPSBjaGlsZENvbXBvbmVudHMgfHwge307XG59XG5QYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgIGZvciggdmFyIGNvbXBvbmVudCBpbiB0aGlzLmNoaWxkQ29tcG9uZW50cyApe1xuICAgICAgICB0aGlzLmNoaWxkQ29tcG9uZW50c1tjb21wb25lbnRdLmluaXQoKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5jdHJsLmluaXQoKVxuICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICB0aGF0LnZpZXcuaW5pdC5hcHBseSh0aGF0LnZpZXcsIGFyZ3VtZW50cyk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBQYWdlQ3RybChwYWdlKXtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xufVxuUGFnZUN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBQYWdlVmlldyhwYWdlKXtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xufVxuUGFnZVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXt9OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gTWVudUNvbXBvbmVudChhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoZGF0YS5lbGVtZW50KVswXSwgTWVudUN0cmwsIE1lbnVWaWV3KTtcbn1cbk1lbnVDb21wb25lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5NZW51Q29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVDb21wb25lbnQ7XG5cbmZ1bmN0aW9uIE1lbnVDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG59XG5NZW51Q3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5NZW51Q3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q3RybDtcbk1lbnVDdHJsLnByb3RvdHlwZS5sb2dvdXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9hcGkvbG9nb3V0J1xuICAgIH0pLnRoZW4oZGVmZXIucmVzb2x2ZSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gTWVudVZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1lbnVWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbk1lbnVWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVWaWV3O1xuTWVudVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLm1lbnVCdXR0b25Db250YWluZXIgPSAkKHRoaXMucGFnZS5lbGVtKTtcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyID0gJCgnI21lbnVPdmVybGF5Jyk7XG4gICAgdGhpcy5yZW5kZXJNZW51KCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuTWVudVZpZXcucHJvdG90eXBlLnJlbmRlck1lbnUgPSBmdW5jdGlvbiAoKXtcbiAgICBcbiAgICAvKiByZW5kZXIgb3ZlcmxheSAqL1xuICAgIGlmKCB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmxlbmd0aCA9PSAwICl7XG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgaWQ9XCJtZW51T3ZlcmxheVwiIGNsYXNzPVwiaGlkZGVuXCI+PC9kaXY+Jyk7XG4gICAgICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIgPSAkKFwiI21lbnVPdmVybGF5XCIpO1xuICAgIH1cbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmVtcHR5KCk7XG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51XCI+PC9kaXY+Jyk7XG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5maW5kKCcubWVudScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnVTZWN0aW9uXCI+J1xuICAgICAgICArJzxkaXYgY2xhc3M9XCJhY3Rpb24gbG9nb3V0IGJ0biBidG4tc2Vjb25kYXJ5XCI+TG9nb3V0PC9kaXY+J1xuICAgICsnPC9kaXY+Jyk7XG4gICAgXG4gICAgLyogcmVuZGVyIG1lbnUgYnV0dG9uICovXG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnUtdG9nZ2xlIGJ0biBidG4tc2Vjb25kYXJ5IGZhIGZhLWJhcnNcIj48L2Rpdj4nKTtcbn07XG5NZW51Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICB2aWV3ID0gdGhpcztcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLm1lbnUtdG9nZ2xlJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUgLmxvZ291dCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmlldy5wYWdlLmN0cmwubG9nb3V0KClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2xvZ2luJztcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgICBhbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgJy5tZW51JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcudmlzaWJsZSA9ICF2aWV3LnZpc2libGU7XG4gICAgICAgIFxuICAgICAgICBpZiggdmlldy52aXNpYmxlICl7XG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBGcmllbmQgKi9cblxuZnVuY3Rpb24gQWRkRnJpZW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNhZGRGcmllbmRQYWdlJylbMF0sIEFkZEZyaWVuZEN0cmwsIEFkZEZyaWVuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkFkZEZyaWVuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZEZyaWVuZFBhZ2U7XG5cbmZ1bmN0aW9uIEFkZEZyaWVuZEN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmZyaWVuZHMgPSBbXTtcbn1cbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRDdHJsO1xuXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGF0LmZyaWVuZHMgPSBbXTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2ZyaWVuZHMvc2VhcmNoJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XG4gICAgICAgIHRoYXQucGFnZS52aWV3LnVwZGF0ZVVzZXJMaXN0KCk7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8vIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSByZWxhdGlvbiBiZXR3ZWVuIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoZSBcInRvXCIgdXNlclxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUudXBkYXRlU3RhdHVzID0gZnVuY3Rpb24gKHRvVXNlcklkLCBzdGF0dXMpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2ZyaWVuZHMvdXBkYXRlc3RhdHVzJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7dG9Vc2VySWQgOiB0b1VzZXJJZCwgc3RhdHVzIDogc3RhdHVzfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEFkZEZyaWVuZFZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRWaWV3O1xuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpeyAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuc2VhcmNoVGltZW91dDtcbn07XG5cbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgIFxuICAgIC8vIFRoaXMgd2lsbCBydW4gYSBzZWFyY2ggZXZlcnkgc2Vjb25kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleS4gXG4gICAgJChkb2N1bWVudCkub24oJ2tleXByZXNzJywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZhciB0aGlzRm9ybSA9ICQodGhpcyk7XG4gICAgICAgIGNsZWFyVGltZW91dChwYWdlLnZpZXcuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzRm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9KTtcblxuICAgIC8vIFN1Ym1pdHRpbmcgdGhlIHNlYXJjaCBzdHJpbmdcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uc2VhcmNoLXVzZXInLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcGFnZS5jdHJsLnNlYXJjaCh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAvL0hhbmRsZSBSZXN1bHRcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5mcmllbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93RnJpZW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpLDEwKSk7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZnJpZW5kIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUkVRVUVTVEVEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7ICBcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgYmxvY2sgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuQkxPQ0tFRClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSB1bmJsb2NrIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuYmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBjYW5jZWwgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGZyaWVuZCBhY2NlcHRcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5GUklFTkQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZnJpZW5kIHJlamVjdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgdW5mcmllbmRcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS51cGRhdGVVc2VyTGlzdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBmcmllbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmRzJyk7XG4gICAgdmFyIGNhcmRDb2xvciA9ICcnO1xuICAgIHZhciBiYWRnZSA9ICcnO1xuXG4gICAgLy8gQ2xlYXIgYW55IGN1cnJlbnQgY2FyZHMgZnJvbSBwcmV2aW91cyBzZWFyY2hcbiAgICAkKCcuY2FyZCcpLnJlbW92ZSgpO1xuXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmZyaWVuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIHN0YXR1c1xuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdmcmllbmQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1zdWNjZXNzJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXdhcm5pbmcnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdibG9ja2VkJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW52ZXJzZSc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCB1c2VyXG4gICAgICAgIGZyaWVuZHNFbGVtLmFwcGVuZCgnJytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmcmllbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1mcmllbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uaWQrJ1wiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnVzZXJOYW1lK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0ubmFtZSsnKTwvc21hbGw+JytiYWRnZSsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+PHAvPicpO1xuICAgIH1cbn07XG5cbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLnNob3dGcmllbmRNb2RhbCA9IGZ1bmN0aW9uIChmcmllbmRJZCl7XG4gICAgdmFyIHRoaXNGcmllbmQgPSB0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmZpbHRlcihmdW5jdGlvbiAoZnJpZW5kKXtcbiAgICAgICAgcmV0dXJuIGZyaWVuZC5pZCA9PSBmcmllbmRJZDtcbiAgICB9KVswXSxcbiAgICAgICAgbW9kYWxCdXR0b25zO1xuICAgICAgICBcbiAgICBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdmcmllbmQnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blVuZnJpZW5kTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bkFjY2VwdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuUmVqZWN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5TZW5kIEZyaWVuZCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgXG4gICAgdmFyIGZyaWVuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZC1tb2RhbCcpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyx0aGlzRnJpZW5kLmlkKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNGcmllbmQudXNlck5hbWUpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzRnJpZW5kLm5hbWUrJzwvcD48cD4nK3RoaXNGcmllbmQuYmlvKyc8L3A+Jyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYXBwbGljYXRpb25zUGFnZScpWzBdLCBBcHBsaWNhdGlvbnNDdHJsLCBBcHBsaWNhdGlvbnNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5BcHBsaWNhdGlvbnNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNQYWdlO1xuXG5mdW5jdGlvbiBBcHBsaWNhdGlvbnNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5hcHBsaWNhdGlvbnMgPSBbXTtcbn1cbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNDdHJsO1xuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnN1YnN0cmluZyh1cmwubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJytpZCsnL2FwcGxpY2F0aW9ucycsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmFwcGxpY2F0aW9ucyA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBbXTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5wcm9jZXNzQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMpIHtcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBpZCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcblxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycraWQrJy9wcm9jZXNzYXBwbGljYXRpb24nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHthcHBsaWNhdGlvbklkIDogYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cyA6IHByb2Nlc3NTdGF0dXMsIGFwcGxpY2F0aW9uU3RhdHVzIDogYXBwbGljYXRpb25TdGF0dXN9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn1cblxuZnVuY3Rpb24gQXBwbGljYXRpb25zVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFwcGxpY2F0aW9uc1ZpZXc7XG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGFwcGxpY2F0aW9uc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYXBwbGljYXRpb25zJyk7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NQU5BR0VSKSB7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+TWFuYWdlcic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUVNQkVSKSB7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+TWVtYmVyJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9QUk9NT1RFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPlByb21vdGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGxpY2F0aW9uc0VsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYXBwbGljYXRpb24gYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWFwcGxpY2F0aW9uLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uaWQrJ1wiIGRhdGEtYXBwbGljYXRpb24tc3RhdHVzPVwiJyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzKydcIj4nK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS51c2VybmFtZSsnIDxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0ubmFtZSsnKTwvc21hbGw+JytiYWRnZSsnPC9kaXY+PHAvPicpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hcHBsaWNhdGlvbicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZS52aWV3LnNob3dBcHBsaWNhdGlvbk1vZGFsKHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwxMCkscGFyc2VJbnQoJChlLnRhcmdldCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwxMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGZyaWVuZCBhY2NlcHRcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFjY2VwdCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwxMCk7XG4gICAgICAgIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyksMTApO1xuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5BQ0NFUFRFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyBcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYXBwbGljYXRpb25JZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksMTApO1xuICAgICAgICBhcHBsaWNhdGlvblN0YXR1cyA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLDEwKTtcbiAgICAgICAgcGFnZS5jdHJsLnByb2Nlc3NBcHBsaWNhdGlvbihhcHBsaWNhdGlvbklkLCBBcHBsaWNhdGlvbi5TVEFUVVMuUkVKRUNURUQsIGFwcGxpY2F0aW9uU3RhdHVzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XG4gICAgICAgIH0pO1xuICAgIH0pXG59O1xuXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5zaG93QXBwbGljYXRpb25Nb2RhbCA9IGZ1bmN0aW9uIChhcHBsaWNhdGlvbklkLCBhcHBsaWNhdGlvblN0YXR1cyl7XG4gICAgdmFyIHRoaXNBcHBsaWNhdGlvbiA9IHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGFwcGxpY2F0aW9uKXtcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uLmlkID09IGFwcGxpY2F0aW9uSWQ7XG4gICAgfSlbMF07XG4gICAgXG4gICAgdmFyIGFwcGxpY2F0aW9uTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYXBwbGljYXRpb24tbW9kYWwnKTtcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnLHRoaXNBcHBsaWNhdGlvbi5pZCk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycsdGhpc0FwcGxpY2F0aW9uLnN0YXR1cyk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNBcHBsaWNhdGlvbi5uYW1lKycgLSAnK3RoaXNBcHBsaWNhdGlvbi51c2VybmFtZSk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPkluc3RydW1lbnQ6ICcrdGhpc0FwcGxpY2F0aW9uLmluc3RydW1lbnQrJzwvcD48cD5NZXNzYWdlOiAnK3RoaXNBcHBsaWNhdGlvbi5tZXNzYWdlKTtcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gQmFuZHNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2JhbmRzUGFnZScpWzBdLCBCYW5kc0N0cmwsIEJhbmRzVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQmFuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzUGFnZTtcblxuZnVuY3Rpb24gQmFuZHNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kcyA9IFtdO1xufVxuQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkJhbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kc0N0cmw7XG5CYW5kc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCgnL2FwaS9iYW5kcycsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmJhbmRzID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICB0aGF0LmJhbmRzID0gW107XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzVmlldztcbkJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJhbmQgYnRuIGJ0bi1zZWNvbmRhcnlcIiBpZD0nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmlkKyc+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5iYW5kTmFtZSsnIDxzbWFsbD4ob3duZWQgYnk6ICcrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ub3duZXJOYW1lKycpPC9zbWFsbD48L2Rpdj4nKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5CYW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLnJlZ2lzdGVyLWJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvcmVnaXN0ZXInO1xuICAgIH0pO1xuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYmFuZCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy9iYW5kLycgKyBlLnRhcmdldC5pZDtcbiAgICB9KVxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIEZyaWVuZCAqL1xuXG5mdW5jdGlvbiBGcmllbmRzUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNmcmllbmRzUGFnZScpWzBdLCBGcmllbmRzQ3RybCwgRnJpZW5kc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkZyaWVuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuRnJpZW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc1BhZ2U7XG5cbmZ1bmN0aW9uIEZyaWVuZHNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5mcmllbmRzID0gW107XG59XG5GcmllbmRzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5GcmllbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzQ3RybDtcbkZyaWVuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGF0LmZyaWVuZHMgPSBbXTtcbiAgICAkLmFqYXgoJy9hcGkvZnJpZW5kcycsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmZyaWVuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbkZyaWVuZHNDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gRnJpZW5kc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkZyaWVuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNWaWV3O1xuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLnVwZGF0ZVVzZXJMaXN0KCk7XG59O1xuXG5GcmllbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hZGQtZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwxMCkpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLlJFUVVFU1RFRClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLlBFTkRJTkcpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5DYW5jZWxSZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5BY2NlcHRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuRlJJRU5EKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICBcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmZyaWVuZE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICBcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTsgICAgICAgIFxufTtcblxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgIGZyaWVuZHNFbGVtLmZpbmQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbnZlcnNlJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICAgICAgYmFkZ2UgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcbiAgICAgICAgZnJpZW5kc0VsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImZyaWVuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWZyaWVuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XG4gICAgfVxufTtcblxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLnNob3dGcmllbmRNb2RhbCA9IGZ1bmN0aW9uIChmcmllbmRJZCl7XG4gICAgdmFyIHRoaXNGcmllbmQgPSB0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmZpbHRlcihmdW5jdGlvbiAoZnJpZW5kKXtcbiAgICAgICAgcmV0dXJuIGZyaWVuZC5pZCA9PSBmcmllbmRJZDtcbiAgICB9KVswXSxcbiAgICAgICAgbW9kYWxCdXR0b25zO1xuICAgICAgICBcbiAgICBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdmcmllbmQnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blVuZnJpZW5kTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bkFjY2VwdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuUmVqZWN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5TZW5kIEZyaWVuZCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgXG4gICAgdmFyIGZyaWVuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZC1tb2RhbCcpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyx0aGlzRnJpZW5kLmlkKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNGcmllbmQudXNlck5hbWUpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzRnJpZW5kLm5hbWUrJzwvcD48cD4nK3RoaXNGcmllbmQuYmlvKyc8L3A+Jyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbi8qKlxuICogUEFHRVxuICogKi9cbmZ1bmN0aW9uIExvZ2luUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNsb2dpblBhZ2UnKVswXSwgTG9naW5DdHJsLCBMb2dpblZpZXcpO1xufVxuTG9naW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTG9naW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5DdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5sb2dnaW5nSW4gPSBmYWxzZTtcbn1cbkxvZ2luQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5Mb2dpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5DdHJsO1xuXG5Mb2dpbkN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIExvZ2luVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTG9naW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkxvZ2luVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpblZpZXc7XG5Mb2dpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkxvZ2luVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5sb2dnaW5nSW4gKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9tYWluJztcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5sb2dnaW5nSW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBNYWluUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNtYWluUGFnZScpWzBdLCBNYWluQ3RybCwgTWFpblZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbk1haW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTWFpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblBhZ2U7XG5cbmZ1bmN0aW9uIE1haW5DdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG59XG5NYWluQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5NYWluQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluQ3RybDtcblxuZnVuY3Rpb24gTWFpblZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1haW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbk1haW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5WaWV3O1xuTWFpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5iYW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5hZGQtZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuc2VhcmNoLWJhbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3NlYXJjaCc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcubm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9ub3RpZmljYXRpb25zJztcbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBOb3RpZmljYXRpb24gKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gTm90aWZpY2F0aW9uc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbm90aWZpY2F0aW9uc1BhZ2UnKVswXSwgTm90aWZpY2F0aW9uc0N0cmwsIE5vdGlmaWNhdGlvbnNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5Ob3RpZmljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbk5vdGlmaWNhdGlvbnNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNQYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xufVxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc0N0cmw7XG5cbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgY3RybC5nZXROb3RpZmljYXRpb25zKCkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xufTtcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5nZXROb3RpZmljYXRpb25zID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgLy9nZXQgbm90aWZpY2F0aW9uc1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucydcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICAgICAgY3RybC5ub3RpZmljYXRpb25zID0gZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RpZmljYXRpb24uZnJvbU9iaihpdGVtKTtcbiAgICAgICAgICAgIH0pIHx8IFtdO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuZGVsZXRlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKCl7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuLyoqXG4gKiBWSUVXRVJcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc1ZpZXc7XG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG59O1xuXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignY2xvc2UuYnMuYWxlcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvL2RlbGV0ZSBub3RpZmljYXRpb24gb24gdGhlIHNlcnZlclxuICAgICAgICBwYWdlLmN0cmwuZGVsZXRlTm90aWZpY2F0aW9uKCQodGhpcykuYXR0cignZGF0YS1ub3RpZmljYXRpb24taWQnKSlcbiAgICAgICAgLnRoZW4ocGFnZS5jdHJsLmdldE5vdGlmaWNhdGlvbnMpXG4gICAgICAgIC50aGVuKHBhZ2Uudmlldy5yZW5kZXIpXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIGFsZXJ0KGVyci5zdGFjayk7XG4gICAgICAgICAgICBwYWdlLmN0cmwuZ2V0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgbm90aWZpY2F0aW9uRWxlbSA9ICQoJyNub3RpZmljYXRpb25zUGFnZScpLmZpbmQoJy5ub3RpZmljYXRpb25zJykuZW1wdHkoKTtcbiAgICB0aGlzLnBhZ2UuY3RybC5ub3RpZmljYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG5vdGlmaWNhdGlvbil7XG4gICAgICAgIHZhciBhbGVydFR5cGU7XG4gICAgICAgIHN3aXRjaChub3RpZmljYXRpb24udHlwZSl7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLlNVQ0NFU1M6XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkZSSUVORF9BQ0NFUFRFRDpcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuV0FSTklORzpcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuUkVNT1ZFRF9GUk9NX0JBTkQ6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LXdhcm5pbmcnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkVSUk9SOlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1kYW5nZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1pbmZvJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG5vdGlmaWNhdGlvbkVsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGEgaHJlZj1cIicrbm90aWZpY2F0aW9uLmxpbmsrJ1wiIGNsYXNzPVwibm90aWZpY2F0aW9uIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlICcrYWxlcnRUeXBlKydcIiBkYXRhLW5vdGlmaWNhdGlvbi1pZD1cIicrbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbklkKydcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPicrXG4gICAgICAgICAgICAgICAgJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+JytcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uLm1lc3NhZ2UrXG4gICAgICAgICc8L2E+Jyk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gUmVnaXN0ZXJQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyUGFnZScpWzBdLCBSZWdpc3RlckN0cmwsIFJlZ2lzdGVyVmlldyk7XG59XG5SZWdpc3RlclBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5SZWdpc3RlclBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJQYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBSZWdpc3RlckN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG59XG5SZWdpc3RlckN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQ3RybDtcblxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9yZWdpc3RlcicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5mYWlsKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZWplY3QoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLyoqXG4gKiBWSUVXRVJcbiAqICovXG5mdW5jdGlvbiBSZWdpc3RlclZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cblJlZ2lzdGVyVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJWaWV3O1xuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAgICAgXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcbiAgICAgICAgXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xuICAgICAgICBcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xuICAgICAgICBcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cbiAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyKHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+UmVnaXN0cmF0aW9uIFN1Y2Nlc3NmdWwhPC9zdHJvbmc+IFJlZGlyZWN0aW5nIGluIDIgc2Vjb25kcy4uLidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJylcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNyZWdpc3RlckJhbmRQYWdlJylbMF0sIFJlZ2lzdGVyQmFuZEN0cmwsIFJlZ2lzdGVyQmFuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblJlZ2lzdGVyQmFuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5SZWdpc3RlckJhbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZFBhZ2U7XG5cbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZEN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG59XG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kQ3RybDtcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3JlZ2lzdGVyJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kVmlldztcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZSxcbiAgICAgICAgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcbiAgICAgICAgXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xuICAgICAgICBcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xuICAgICAgICBcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cbiAgICAgICAgcGFnZS5jdHJsLmxvZ2luKHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+UmVnaXN0cmF0aW9uIFN1Y2Nlc3NmdWwhPC9zdHJvbmc+IFJlZGlyZWN0aW5nIGluIDIgc2Vjb25kcy4uLidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMnO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtdGltZXMnKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+QmFuZCBSZWdpc3RyYXRpb24gRmFpbGVkITwvc3Ryb25nPidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xudmFyIHNlYXJjaGluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBTZWFyY2hCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjc2VhcmNoQmFuZHNQYWdlJylbMF0sIFNlYXJjaEJhbmRzQ3RybCwgU2VhcmNoQmFuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5TZWFyY2hCYW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5TZWFyY2hCYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNQYWdlO1xuXG5mdW5jdGlvbiBTZWFyY2hCYW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmJhbmRzID0gW107XG4gICAgdGhpcy5zZWFyY2hpbmcgPSBmYWxzZTtcbn1cblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNDdHJsO1xuXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuYmFuZHMgPSBbXTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmJhbmRzID0gZGF0YTtcbiAgICAgICAgdGhhdC5wYWdlLnZpZXcudXBkYXRlQmFuZExpc3QoKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIHNlbGVjdGVkIGJhbmRcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuc3VibWl0QXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYmFuZElkLCBmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC9hcGkvYmFuZHMvJHtiYW5kSWR9L3N1Ym1pdEFwcGxpY2F0aW9uYCxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7IFxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCBkZWxldGUgdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGlzIGJhbmRcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY2FuY2VsQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYmFuZElkKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9jYW5jZWxBcHBsaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge2JhbmRJZCA6IGJhbmRJZH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmV4cGFuZEJhbmRNb2RhbCA9IGZ1bmN0aW9uKGFwcGxpY2F0aW9uVHlwZSwgYXBwbGljYXRpb25TdGF0dXMsIGJhbmRJZCkge1xuICAgICQoJy5tb2RhbC1ib2R5JykucmVtb3ZlKCk7XG4gICAgJCgnLm1vZGFsLWZvb3RlcicpLnJlbW92ZSgpOyAgICBcblxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcubW9kYWwtY29udGVudCcpO1xuICAgIHZhciBiYW5kTmFtZSA9IGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKCk7XG4gICAgdmFyIGluc3RydW1lbnRGaWVsZCA9ICcnO1xuXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwoYmFuZE5hbWUrJzxici8+JythcHBsaWNhdGlvblR5cGUrJyBBcHBsaWNhdGlvbicpO1xuXG4gICAgaWYgKGFwcGxpY2F0aW9uVHlwZSA9PT0gJ01lbWJlcicpIHtcbiAgICAgICAgaW5zdHJ1bWVudEZpZWxkID0gJzxpbnB1dCByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImluc3RydW1lbnRcIiBwbGFjZWhvbGRlcj1cIkluc3RydW1lbnRcIiAvPjxwLz4nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5zdHJ1bWVudEZpZWxkID0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImluc3RydW1lbnRcIiB2YWx1ZT1cIk4vQVwiLz48cC8+JzsgIFxuICAgIH1cblxuICAgIGJhbmRNb2RhbC5hcHBlbmQoJycrXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+JytcbiAgICAgICAgJzxmb3JtIGlkPVwiYXBwbHktZm9ybVwiIGNsYXNzPVwiYXBwbHktZm9ybVwiIG9uc3VibWl0PVwicmV0dXJuXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgaW5zdHJ1bWVudEZpZWxkK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJNZXNzYWdlXCIgLz4nK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJiYW5kSWRcIiB2YWx1ZT1cIicrYmFuZElkKydcIiAvPicrXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImFwcGxpY2F0aW9uU3RhdHVzXCIgdmFsdWU9XCInK2FwcGxpY2F0aW9uU3RhdHVzKydcIiAvPicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZm9ybT4nK1xuICAgICc8L2Rpdj4nK1xuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JysgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiBmb3JtPVwiYXBwbHktZm9ybVwiPicrXG4gICAgICAgICAgICAgICAgJ1N1Ym1pdCcrXG4gICAgICAgICAgICAnPC9idXR0b24+JytcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj4nK1xuICAgICAgICAnPC9kaXY+JysgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICc8L2Rpdj4nKTtcbn07XG5cbmZ1bmN0aW9uIFNlYXJjaEJhbmRzVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHVuZGVmaW5lZDtcbn1cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNWaWV3O1xuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7ICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgIFxuICAgIC8vIFRoaXMgd2lsbCBydW4gYSBzZWFyY2ggZXZlcnkgc2Vjb25kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleS4gXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgJy5zZWFyY2gtZm9ybSBpbnB1dCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmFyIHRoaXNGb3JtID0gJCh0aGlzKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgcGFnZS52aWV3LnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXNGb3JtLnN1Ym1pdCgpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH0pO1xuXG4gICAgLy8gU3VibWl0dGluZyB0aGUgc2VhcmNoIHN0cmluZ1xuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5zZWFyY2gtZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgXG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7ICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLmFwcGx5LWZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICAgXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7ICAgXG4gICAgICAgIHBhZ2UuY3RybC5zdWJtaXRBcHBsaWNhdGlvbihwYXJzZUludCgkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLCAxMCksIHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLWZvcm0nKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vaGFuZGxlIHRoZSBhcHBsaWNhdGlvbiByZXN1bHRcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG4gICAgLy8gVG9nZ2xlIEJhbmQgTW9kYWxcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93QmFuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyksMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBtYW5hZ2VyIGFwcGxpY2F0aW9uIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWFuYWdlcicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWFuYWdlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01BTkFHRVIsIGJhbmRJZCk7XG4gICAgfSlcblxuICAgIC8vIEhhbmRsZSBtZW1iZXIgYXBwbGljYXRpb24gcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlNZW1iZXInLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ01lbWJlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUiwgYmFuZElkKTtcbiAgICB9KVxuXG4gICAgLy8gSGFuZGxlIHByb21vdGVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5UHJvbW90ZXInLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ1Byb21vdGVyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIsIGJhbmRJZCk7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgYXBwbGljYXRpb24gY2FuY2VsIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5jYW5jZWxBcHBsaWNhdGlvbihiYW5kSWQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgICBcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8qcGFnZUVsZW0ub24oJ2hpZGRlbi5icy5tb2RhbCcsICcjbW9kYWw3JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB0aGlzLnVwZGF0ZUJhbmRMaXN0O1xuICAgIH0pOyovXG59O1xuXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZUJhbmRMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGJhbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kcycpO1xuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcbiAgICB2YXIgYmFkZ2UgPSAnJztcblxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXG4gICAgJCgnLmNhcmQnKS5yZW1vdmUoKTtcblxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgIC8vIElmIHlvdSBoYXZlIGEgcm9sZSB0aGVuIHlvdSBhcmUgaW4gdGhlIGJhbmQsIHNvIG5vIG1vZGFsIGJ1dHRvbnNcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLnJvbGUgIT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1zdWNjZXNzJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLnJvbGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1hbmFnZXIpJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdyZWplY3RlZCcpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCBiYW5kXG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYmFuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWJhbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmlkKydcIiA+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmJhbmROYW1lK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmdlbnJlKycpPC9zbWFsbD4nK2JhZGdlK1xuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLnNob3dCYW5kTW9kYWwgPSBmdW5jdGlvbiAoYmFuZElkKXtcbiAgICB2YXIgdGhpc0JhbmQgPSB0aGlzLnBhZ2UuY3RybC5iYW5kcy5maWx0ZXIoZnVuY3Rpb24gKGJhbmQpe1xuICAgICAgICByZXR1cm4gYmFuZC5pZCA9PSBiYW5kSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucztcbiAgICBcbiAgICBpZiAodGhpc0JhbmQucm9sZSAhPSAnbm9uZScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XG4gICAgfVxuICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBhcHBsaWNhdGlvbiBzdGF0dXMgaWYgdGhleSBkbyBub3QgaGF2ZSBhIHJvbGUgaW4gdGhlIGJhbmRcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1hbmFnZXIpJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNYW5hZ2VyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNZW1iZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUHJvbW90ZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ3JlamVjdGVkJykgeyBcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BcHBseU1hbmFnZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWFuYWdlcjwvYnV0dG9uPicrIFxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5TWVtYmVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIE1lbWJlcjwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlQcm9tb3RlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBQcm9tb3RlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIFxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZC1tb2RhbCcpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnLHRoaXNCYW5kLmlkKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQmFuZC5iYW5kTmFtZSk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzQmFuZC5kZXNjcmlwdGlvbisnPC9wPicpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtZm9vdGVyJykuaHRtbCgnPGRpdiBjbGFzcz1cImR5bmFtaWMtYnV0dG9uc1wiPjwvZGl2PjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiXX0=
