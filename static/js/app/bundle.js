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
    this.bandMemberRole = undefined;
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

    $.ajax('/api/bands/'+id+'/role', {
        method: 'GET'
    }).then(function (data){
        that.bandMemberRole = data;
        defer.resolve();
    }).catch(function (err){
        that.bandMemberRole = undefined;
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
        applicationId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-id'),10);
        applicationStatus = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-status'),10);
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
        applicationId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-id'),10);
        applicationStatus = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-status'),10);
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
    
    var modalButtons = '';

    if (this.page.ctrl.bandMemberRole === BandMember.ROLE.OWNER || this.page.ctrl.bandMemberRole === BandMember.ROLE.MANAGER) {
        modalButtons =  '<button id="btnAccept" type="button" class="btn btn-success" data-dismiss="modal">Accept</button>'+
                        '<button id="btnReject" type="button" class="btn btn-danger" data-dismiss="modal">Reject</button>'
    }

    var applicationModal = $(this.page.elem).find('.application-modal');
    applicationModal.find('.modal').attr('data-application-id',thisApplication.id);
    applicationModal.find('.modal').attr('data-application-status',thisApplication.status);
    applicationModal.find('.modal-title').html(thisApplication.name+' - '+thisApplication.username);
    applicationModal.find('.modal-body').html('<p>Instrument: '+thisApplication.instrument+'</p><p>Message: '+thisApplication.message);
    applicationModal.find('.dynamic-buttons').html(modalButtons);
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
    else if (thisBand.applicationStatus !== 'blocked') {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJub3RpZmljYXRpb24uanMiLCJzZWFyY2hlZEJhbmQuanMiLCJzaW1wbGVCYW5kLmpzIiwiYXBwLmpzIiwicGFnZS5qcyIsIm1lbnUuanMiLCJhZGRGcmllbmQuanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QVZwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QVdqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMvTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBcHBsaWNhdGlvbihqc29uKXtcclxuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XHJcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMudXNlcm5hbWUgPSBqc29uLnVzZXJuYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBqc29uLm1lc3NhZ2UgfHwgJyc7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLlNUQVRVUyA9IHtcclxuXHROT05FOiAwLCBcclxuICAgIEFQUExJRURfTUFOQUdFUjogMSxcclxuICAgIEFQUExJRURfTUVNQkVSOiAyLFxyXG4gICAgQVBQTElFRF9QUk9NT1RFUjogMyxcclxuXHRBQ0NFUFRFRDogNCwgXHJcblx0UkVKRUNURUQ6IDUsXHJcbiAgICBCTE9DS0VEOiA2XHJcbn1cclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uOyB9IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gQmFuZFBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kUGFnZScpWzBdLCBCYW5kQ3RybCwgQmFuZFZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5CYW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuYmFuZCA9IHt9O1xyXG59XHJcbkJhbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQmFuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZEN0cmw7XHJcbkJhbmRDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgdmFyIGlkID0gdXJsLnN1YnN0cmluZyh1cmwubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG5cclxuICAgLy8gdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvYmFuZC8nICsgaWQsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmJhbmQgPSBkYXRhO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIHRoYXQuYmFuZCA9IHt9O1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQmFuZFZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkJhbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFZpZXc7XHJcbkJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgYmFuZEVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZCcpO1xyXG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8aDIgY2xhc3M9XCJjYXJkLXRpdGxlXCI+TXkgQmFuZDwvaDI+Jyk7XHJcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+PC9kaXY+Jyk7XHJcbiAgICBiYW5kRWxlbS5maW5kKCcuY2FyZC1ibG9jaycpLmFwcGVuZCgnPHAgY2xhc3M9XCJpbmZvIGNhcmQtdGV4dFwiPjxzdHJvbmc+QmFuZCBOYW1lPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRbMF0uYmFuZE5hbWUrJzwvcD4nKTtcclxuICAgIGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJykuYXBwZW5kKCc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5Pd25lcjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLm93bmVyTmFtZSsnPC9wPicpO1xyXG4gICAgYmFuZEVsZW0uZmluZCgnLmNhcmQtYmxvY2snKS5hcHBlbmQoJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkRlc2NyaXB0aW9uPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRbMF0uZGVzY3JpcHRpb24rJzwvcD4nKTtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQmFuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xyXG5cclxuICAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAgIHZhciBpZCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9hcHBsaWNhdGlvbnMvJyArIGlkO1xyXG4gICAgfSk7XHJcbn07IiwiZnVuY3Rpb24gQmFuZE1lbWJlcihqc29uKXtcclxuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5iYW5kSWQgPSBqc29uLmJhbmRJZCB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnVzZXJuYW1lID0ganNvbi51c2VybmFtZSB8fCAnJztcclxuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcclxuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcclxuICAgIHRoaXMucm9sZSA9IGpzb24ucm9sZSB8fCAnJztcclxufVxyXG5cclxuQmFuZE1lbWJlci5ST0xFID0ge1xyXG4gICAgT1dORVIgOiAwLFxyXG4gICAgTUFOQUdFUjogMSxcclxuICAgIE1FTUJFUiA6IDIsXHJcbiAgICBQUk9NT1RFUiA6IDNcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQmFuZE1lbWJlcjsgfSIsImZ1bmN0aW9uIEZyaWVuZChqc29uKXtcclxuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XHJcbiAgICB0aGlzLnVzZXJOYW1lID0ganNvbi51c2VyTmFtZSB8fCAnJztcclxuICAgIHRoaXMuYmlvID0ganNvbi5iaW8gfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCAnJztcclxufVxyXG5cclxuRnJpZW5kLlNUQVRVUyA9IHtcclxuXHROT05FOiAwLCBcclxuXHRGUklFTkQ6IDEsIFxyXG5cdFJFUVVFU1RFRDogMiwgXHJcblx0UEVORElORzogMywgXHJcblx0QkxPQ0tFRDogNCBcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gRnJpZW5kOyB9IiwiZnVuY3Rpb24gTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbklkLCB1c2VySWQsIHR5cGUsIG1lc3NhZ2UsIGxpbmssIHVucmVhZCl7XHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbklkID0gbm90aWZpY2F0aW9uSWQ7XHJcbiAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgdGhpcy5saW5rID0gbGluaztcclxuICAgIHRoaXMudW5yZWFkID0gdW5yZWFkO1xyXG59XHJcbk5vdGlmaWNhdGlvbi5UWVBFID0ge1xyXG4gICAgTk9fTUVTU0FHRTogMCxcclxuICAgIEZSSUVORF9SRVFVRVNUOiAxLFxyXG4gICAgRlJJRU5EX0FDQ0VQVEVEOiAyLFxyXG4gICAgQkFORF9JTlZJVEU6IDMsXHJcbiAgICBSRU1PVkVEX0ZST01fQkFORDogNCxcclxuICAgIEVWRU5UX0lOVklURTogNSxcclxuICAgIEVWRU5UX1JFTUlOREVSOiA2LFxyXG4gICAgRVJST1I6IDcsXHJcbiAgICBTVUNDRVNTOiA4LFxyXG4gICAgV0FSTklORzogOVxyXG59O1xyXG5Ob3RpZmljYXRpb24uZnJvbU9iaiA9IGZ1bmN0aW9uIChvYmope1xyXG4gICAgdmFyIG15Tm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbigpO1xyXG4gICAgbXlOb3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQgPSBvYmoubm90aWZpY2F0aW9uSWQgfHwgb2JqLk5vdGlmaWNhdGlvbklkIHx8IC0xO1xyXG4gICAgbXlOb3RpZmljYXRpb24udXNlcklkID0gb2JqLnVzZXJJZCB8fCBvYmouVXNlcklkIHx8IC0xO1xyXG4gICAgbXlOb3RpZmljYXRpb24udHlwZSA9IG9iai50eXBlIHx8IG9iai5UeXBlIHx8IE5vdGlmaWNhdGlvbi5UWVBFLk5PX01FU1NBR0U7XHJcbiAgICBteU5vdGlmaWNhdGlvbi5tZXNzYWdlID0gb2JqLm1lc3NhZ2UgfHwgb2JqLk1lc3NhZ2UgfHwgJyc7XHJcbiAgICBteU5vdGlmaWNhdGlvbi5saW5rID0gb2JqLmxpbmsgfHwgb2JqLkxpbmsgfHwgJyMnO1xyXG4gICAgbXlOb3RpZmljYXRpb24udW5yZWFkID0gb2JqLnVucmVhZCB8fCBvYmouVW5yZWFkIHx8IHRydWU7XHJcbiAgICByZXR1cm4gbXlOb3RpZmljYXRpb247XHJcbn07XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBOb3RpZmljYXRpb247IH1cclxuIiwiZnVuY3Rpb24gU2VhcmNoZWRCYW5kKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YXR1cyA9IGpzb24uYXBwbGljYXRpb25TdGF0dXMgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5yb2xlID0ganNvbi5yb2xlIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBqc29uLmRlc2NyaXB0aW9uIHx8ICcnO1xyXG4gICAgdGhpcy5nZW5yZSA9IGpzb24uZ2VucmUgfHwgJyc7XHJcbn1cclxuXHJcblNlYXJjaGVkQmFuZC5ST0xFID0ge1xyXG4gICAgT1dORVI6IDAsXHJcbiAgICBNQU5BR0VSOiAxLFxyXG4gICAgTUVNQkVSOiAyLFxyXG4gICAgUFJPTU9URVI6IDNcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gU2VhcmNoZWRCYW5kOyB9IiwiZnVuY3Rpb24gU2ltcGxlQmFuZChqc29uKXtcclxuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XHJcbiAgICB0aGlzLm93bmVyTmFtZSA9IGpzb24ub3duZXJOYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5vd25lcklkID0ganNvbi5vd25lcklkIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xyXG59XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVCYW5kOyB9IiwiLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIEFwcCgpe1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHVuZGVmaW5lZDtcclxuICAgIC8vdGhpcy5wYWdlSGlzdG9yeSA9IFtdO1xyXG59XHJcbkFwcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChQYWdlQ29uc3RydWN0b3Ipe1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBQYWdlQ29uc3RydWN0b3IodGhpcyk7XHJcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XHJcbn07XHJcbi8qQXBwLnByb3RvdHlwZS5jaGFuZ2VQYWdlID0gZnVuY3Rpb24gKHBhZ2UsIGRhdGEpe1xyXG4gICAgaWYoIHRoaXMuY3VycmVudFBhZ2UgKXtcclxuICAgICAgICAvL3N0b3JlIHRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGxhc3QgcGFnZVxyXG4gICAgICAgIHRoaXMucGFnZUhpc3RvcnkucHVzaCh0aGlzLmN1cnJlbnRQYWdlLmNvbnN0cnVjdG9yKTtcclxuICAgICAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gICAgLy9jcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG5leHQgcGFnZVxyXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBwYWdlKHRoaXMpO1xyXG4gICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UuaW5pdCgpO1xyXG59OyovIiwiLyogZ2xvYmFsICQgKi9cclxuLyoqIEluaGVyaXRhYmxlIENsYXNzZXMgKiovXHJcbmZ1bmN0aW9uIFBhZ2UoYXBwLCBlbGVtLCBjdHJsQ29uc3RydWN0b3IsIHZpZXdDb25zdHJ1Y3RvciwgY2hpbGRDb21wb25lbnRzKXtcclxuICAgIHRoaXMuYXBwID0gYXBwO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgIHRoaXMuY3RybCA9IG5ldyBjdHJsQ29uc3RydWN0b3IodGhpcyk7XHJcbiAgICB0aGlzLnZpZXcgPSBuZXcgdmlld0NvbnN0cnVjdG9yKHRoaXMpO1xyXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMgPSBjaGlsZENvbXBvbmVudHMgfHwge307XHJcbn1cclxuUGFnZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgXHJcbiAgICBmb3IoIHZhciBjb21wb25lbnQgaW4gdGhpcy5jaGlsZENvbXBvbmVudHMgKXtcclxuICAgICAgICB0aGlzLmNoaWxkQ29tcG9uZW50c1tjb21wb25lbnRdLmluaXQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5jdHJsLmluaXQoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgdGhhdC52aWV3LmluaXQuYXBwbHkodGhhdC52aWV3LCBhcmd1bWVudHMpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBQYWdlQ3RybChwYWdlKXtcclxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XHJcbn1cclxuUGFnZUN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFBhZ2VWaWV3KHBhZ2Upe1xyXG4gICAgdGhpcy5wYWdlID0gcGFnZTtcclxufVxyXG5QYWdlVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe307IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gTWVudUNvbXBvbmVudChhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJChkYXRhLmVsZW1lbnQpWzBdLCBNZW51Q3RybCwgTWVudVZpZXcpO1xyXG59XHJcbk1lbnVDb21wb25lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbk1lbnVDb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudUNvbXBvbmVudDtcclxuXHJcbmZ1bmN0aW9uIE1lbnVDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5NZW51Q3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbk1lbnVDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVDdHJsO1xyXG5NZW51Q3RybC5wcm90b3R5cGUubG9nb3V0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICBcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAnL2FwaS9sb2dvdXQnXHJcbiAgICB9KS50aGVuKGRlZmVyLnJlc29sdmUpLmNhdGNoKGRlZmVyLnJlamVjdCk7XHJcbiAgICBcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBNZW51VmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTWVudVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5NZW51Vmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51VmlldztcclxuTWVudVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lciA9ICQodGhpcy5wYWdlLmVsZW0pO1xyXG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoJyNtZW51T3ZlcmxheScpO1xyXG4gICAgdGhpcy5yZW5kZXJNZW51KCk7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuTWVudVZpZXcucHJvdG90eXBlLnJlbmRlck1lbnUgPSBmdW5jdGlvbiAoKXtcclxuICAgIFxyXG4gICAgLyogcmVuZGVyIG92ZXJsYXkgKi9cclxuICAgIGlmKCB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmxlbmd0aCA9PSAwICl7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGRpdiBpZD1cIm1lbnVPdmVybGF5XCIgY2xhc3M9XCJoaWRkZW5cIj48L2Rpdj4nKTtcclxuICAgICAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyID0gJChcIiNtZW51T3ZlcmxheVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudVwiPjwvZGl2PicpO1xyXG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5maW5kKCcubWVudScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnVTZWN0aW9uXCI+J1xyXG4gICAgICAgICsnPGRpdiBjbGFzcz1cImFjdGlvbiBsb2dvdXQgYnRuIGJ0bi1zZWNvbmRhcnlcIj5Mb2dvdXQ8L2Rpdj4nXHJcbiAgICArJzwvZGl2PicpO1xyXG4gICAgXHJcbiAgICAvKiByZW5kZXIgbWVudSBidXR0b24gKi9cclxuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnUtdG9nZ2xlIGJ0biBidG4tc2Vjb25kYXJ5IGZhIGZhLWJhcnNcIj48L2Rpdj4nKTtcclxufTtcclxuTWVudVZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgICAgIHZpZXcgPSB0aGlzO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLm1lbnUtdG9nZ2xlJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZpZXcudmlzaWJsZSA9ICF2aWV3LnZpc2libGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xyXG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgJy5tZW51IC5sb2dvdXQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdmlldy5wYWdlLmN0cmwubG9nb3V0KClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVyci5tZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLm9uKCdjbGljaycsICcubWVudScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCB2aWV3LnZpc2libGUgKXtcclxuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cclxuLyogZ2xvYmFsIEZyaWVuZCAqL1xyXG5cclxuZnVuY3Rpb24gQWRkRnJpZW5kUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FkZEZyaWVuZFBhZ2UnKVswXSwgQWRkRnJpZW5kQ3RybCwgQWRkRnJpZW5kVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuQWRkRnJpZW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQWRkRnJpZW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRQYWdlO1xyXG5cclxuZnVuY3Rpb24gQWRkRnJpZW5kQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmZyaWVuZHMgPSBbXTtcclxufVxyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRDdHJsO1xyXG5cclxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgdGhhdC5mcmllbmRzID0gW107XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy9zZWFyY2gnLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmZyaWVuZHMgPSBkYXRhO1xyXG4gICAgICAgIHRoYXQucGFnZS52aWV3LnVwZGF0ZVVzZXJMaXN0KCk7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vLyBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgcmVsYXRpb24gYmV0d2VlbiB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGUgXCJ0b1wiIHVzZXJcclxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUudXBkYXRlU3RhdHVzID0gZnVuY3Rpb24gKHRvVXNlcklkLCBzdGF0dXMpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2ZyaWVuZHMvdXBkYXRlc3RhdHVzJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge3RvVXNlcklkIDogdG9Vc2VySWQsIHN0YXR1cyA6IHN0YXR1c31cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBBZGRGcmllbmRWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRWaWV3O1xyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7ICAgXHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIHRoaXMuc2VhcmNoVGltZW91dDtcclxufTtcclxuXHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcclxuICAgIFxyXG4gICAgLy8gVGhpcyB3aWxsIHJ1biBhIHNlYXJjaCBldmVyeSBzZWNvbmQgd2hlbiB0aGUgdXNlciBwcmVzc2VzIGEga2V5LiBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlwcmVzcycsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZhciB0aGlzRm9ybSA9ICQodGhpcyk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0KTtcclxuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzRm9ybS5zdWJtaXQoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3VibWl0dGluZyB0aGUgc2VhcmNoIHN0cmluZ1xyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC11c2VyJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vSGFuZGxlIFJlc3VsdFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5mcmllbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgcGFnZS52aWV3LnNob3dGcmllbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyksMTApKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUkVRVUVTVEVEKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpOyAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBibG9jayByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuQkxPQ0tFRClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIHVuYmxvY2sgcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGNhbmNlbCByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkNhbmNlbFJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5BY2NlcHRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5GUklFTkQpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVqZWN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlamVjdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSB1bmZyaWVuZFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmZyaWVuZE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUudXBkYXRlVXNlckxpc3QgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBmcmllbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmRzJyk7XHJcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XHJcbiAgICB2YXIgYmFkZ2UgPSAnJztcclxuXHJcbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxyXG4gICAgJCgnLmNhcmQnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBzdGF0dXNcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdmcmllbmQnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXdhcm5pbmcnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdibG9ja2VkJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbnZlcnNlJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCB1c2VyXHJcbiAgICAgICAgZnJpZW5kc0VsZW0uYXBwZW5kKCcnK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xyXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0ubmFtZSsnKTwvc21hbGw+JytiYWRnZSsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPC9kaXY+PHAvPicpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuc2hvd0ZyaWVuZE1vZGFsID0gZnVuY3Rpb24gKGZyaWVuZElkKXtcclxuICAgIHZhciB0aGlzRnJpZW5kID0gdGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24gKGZyaWVuZCl7XHJcbiAgICAgICAgcmV0dXJuIGZyaWVuZC5pZCA9PSBmcmllbmRJZDtcclxuICAgIH0pWzBdLFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucztcclxuICAgICAgICBcclxuICAgIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5VbmZyaWVuZE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmZyaWVuZDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blJlamVjdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5SZWplY3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnbm9uZScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5TZW5kIEZyaWVuZCBSZXF1ZXN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcsdGhpc0ZyaWVuZC5pZCk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNGcmllbmQudXNlck5hbWUpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNhcHBsaWNhdGlvbnNQYWdlJylbMF0sIEFwcGxpY2F0aW9uc0N0cmwsIEFwcGxpY2F0aW9uc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkFwcGxpY2F0aW9uc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkFwcGxpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc0N0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvbnMgPSBbXTtcclxuICAgIHRoaXMuYmFuZE1lbWJlclJvbGUgPSB1bmRlZmluZWQ7XHJcbn1cclxuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zQ3RybDtcclxuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIHZhciBpZCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuXHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJytpZCsnL2FwcGxpY2F0aW9ucycsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmFwcGxpY2F0aW9ucyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBbXTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJytpZCsnL3JvbGUnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5iYW5kTWVtYmVyUm9sZSA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgdGhhdC5iYW5kTWVtYmVyUm9sZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KTsgIFxyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUucHJvY2Vzc0FwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIHByb2Nlc3NTdGF0dXMsIGFwcGxpY2F0aW9uU3RhdHVzKSB7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgdmFyIGlkID0gdXJsLnN1YnN0cmluZyh1cmwubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG5cclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2lkKycvcHJvY2Vzc2FwcGxpY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge2FwcGxpY2F0aW9uSWQgOiBhcHBsaWNhdGlvbklkLCBwcm9jZXNzU3RhdHVzIDogcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMgOiBhcHBsaWNhdGlvblN0YXR1c31cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBBcHBsaWNhdGlvbnNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNWaWV3O1xyXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgYXBwbGljYXRpb25zRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5hcHBsaWNhdGlvbnMnKTtcclxuICAgIHZhciBiYWRnZSA9ICcnO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnMubGVuZ3RoOyBpKysgKXtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUikge1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+TWFuYWdlcic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUikge1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+TWVtYmVyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIpIHtcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPlByb21vdGVyJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFwcGxpY2F0aW9uc0VsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYXBwbGljYXRpb24gYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWFwcGxpY2F0aW9uLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uaWQrJ1wiIGRhdGEtYXBwbGljYXRpb24tc3RhdHVzPVwiJyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzKydcIj4nK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS51c2VybmFtZSsnIDxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0ubmFtZSsnKTwvc21hbGw+JytiYWRnZSsnPC9kaXY+PHAvPicpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9uJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHBhZ2Uudmlldy5zaG93QXBwbGljYXRpb25Nb2RhbChwYXJzZUludCgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksMTApLHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyksMTApKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFjY2VwdCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcpLDEwKTtcclxuICAgICAgICBhcHBsaWNhdGlvblN0YXR1cyA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyksMTApO1xyXG4gICAgICAgIHBhZ2UuY3RybC5wcm9jZXNzQXBwbGljYXRpb24oYXBwbGljYXRpb25JZCwgQXBwbGljYXRpb24uU1RBVFVTLkFDQ0VQVEVELCBhcHBsaWNhdGlvblN0YXR1cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7IFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7ICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGZyaWVuZCBhY2NlcHRcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuUmVqZWN0JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksMTApO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwxMCk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnByb2Nlc3NBcHBsaWNhdGlvbihhcHBsaWNhdGlvbklkLCBBcHBsaWNhdGlvbi5TVEFUVVMuUkVKRUNURUQsIGFwcGxpY2F0aW9uU3RhdHVzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufTtcclxuXHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcclxuICAgIHZhciB0aGlzQXBwbGljYXRpb24gPSB0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhcHBsaWNhdGlvbil7XHJcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uLmlkID09IGFwcGxpY2F0aW9uSWQ7XHJcbiAgICB9KVswXTtcclxuICAgIFxyXG4gICAgdmFyIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk9XTkVSIHx8IHRoaXMucGFnZS5jdHJsLmJhbmRNZW1iZXJSb2xlID09PSBCYW5kTWVtYmVyLlJPTEUuTUFOQUdFUikge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICAnPGJ1dHRvbiBpZD1cImJ0bkFjY2VwdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+J1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcHBsaWNhdGlvbk1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9uLW1vZGFsJyk7XHJcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnLHRoaXNBcHBsaWNhdGlvbi5pZCk7XHJcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyx0aGlzQXBwbGljYXRpb24uc3RhdHVzKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQXBwbGljYXRpb24ubmFtZSsnIC0gJyt0aGlzQXBwbGljYXRpb24udXNlcm5hbWUpO1xyXG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPkluc3RydW1lbnQ6ICcrdGhpc0FwcGxpY2F0aW9uLmluc3RydW1lbnQrJzwvcD48cD5NZXNzYWdlOiAnK3RoaXNBcHBsaWNhdGlvbi5tZXNzYWdlKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kc1BhZ2UnKVswXSwgQmFuZHNDdHJsLCBCYW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRzQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmJhbmRzID0gW107XHJcbn1cclxuQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5iYW5kcyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgdGhhdC5iYW5kcyA9IFtdO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNWaWV3O1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJiYW5kIGJ0biBidG4tc2Vjb25kYXJ5XCIgaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvcmVnaXN0ZXInO1xyXG4gICAgfSk7XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy9iYW5kLycgKyBlLnRhcmdldC5pZDtcclxuICAgIH0pXHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG4vKiBnbG9iYWwgRnJpZW5kICovXHJcblxyXG5mdW5jdGlvbiBGcmllbmRzUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ZyaWVuZHNQYWdlJylbMF0sIEZyaWVuZHNDdHJsLCBGcmllbmRzVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuRnJpZW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkZyaWVuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNQYWdlO1xyXG5cclxuZnVuY3Rpb24gRnJpZW5kc0N0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5mcmllbmRzID0gW107XHJcbn1cclxuRnJpZW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5GcmllbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzQ3RybDtcclxuRnJpZW5kc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHRoYXQuZnJpZW5kcyA9IFtdO1xyXG4gICAgJC5hamF4KCcvYXBpL2ZyaWVuZHMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5mcmllbmRzID0gZGF0YTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5GcmllbmRzQ3RybC5wcm90b3R5cGUudXBkYXRlU3RhdHVzID0gZnVuY3Rpb24gKHRvVXNlcklkLCBzdGF0dXMpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2ZyaWVuZHMvdXBkYXRlc3RhdHVzJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge3RvVXNlcklkIDogdG9Vc2VySWQsIHN0YXR1cyA6IHN0YXR1c31cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBGcmllbmRzVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5GcmllbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzVmlldztcclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgdGhpcy51cGRhdGVVc2VyTGlzdCgpO1xyXG59O1xyXG5cclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hZGQtZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZnJpZW5kcy9hZGQnO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5mcmllbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgcGFnZS52aWV3LnNob3dGcmllbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyksMTApKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLlJFUVVFU1RFRClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxyXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUEVORElORylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxyXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuYmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXHJcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICBcclxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5BY2NlcHRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5GUklFTkQpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICBcclxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZWplY3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXHJcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXHJcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pOyAgICAgICAgXHJcbn07XHJcblxyXG5GcmllbmRzVmlldy5wcm90b3R5cGUudXBkYXRlVXNlckxpc3QgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBmcmllbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmRzJyk7XHJcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XHJcbiAgICB2YXIgYmFkZ2UgPSAnJztcclxuXHJcbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxyXG4gICAgZnJpZW5kc0VsZW0uZmluZCgnLmNhcmQnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBzdGF0dXNcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdmcmllbmQnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXdhcm5pbmcnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdibG9ja2VkJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbnZlcnNlJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCB1c2VyXHJcbiAgICAgICAgZnJpZW5kc0VsZW0uYXBwZW5kKCcnK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xyXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0ubmFtZSsnKTwvc21hbGw+JytiYWRnZSsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPC9kaXY+PHAvPicpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLnNob3dGcmllbmRNb2RhbCA9IGZ1bmN0aW9uIChmcmllbmRJZCl7XHJcbiAgICB2YXIgdGhpc0ZyaWVuZCA9IHRoaXMucGFnZS5jdHJsLmZyaWVuZHMuZmlsdGVyKGZ1bmN0aW9uIChmcmllbmQpe1xyXG4gICAgICAgIHJldHVybiBmcmllbmQuaWQgPT0gZnJpZW5kSWQ7XHJcbiAgICB9KVswXSxcclxuICAgICAgICBtb2RhbEJ1dHRvbnM7XHJcbiAgICAgICAgXHJcbiAgICBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdmcmllbmQnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuVW5mcmllbmRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5mcmllbmQ8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkNhbmNlbFJlcXVlc3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIFJlcXVlc3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAncGVuZGluZycpIHsgXHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bkFjY2VwdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5SZWplY3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdibG9ja2VkJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5VbmJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuYmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0blJlcXVlc3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+U2VuZCBGcmllbmQgUmVxdWVzdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIGZyaWVuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZC1tb2RhbCcpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzRnJpZW5kLnVzZXJOYW1lKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzRnJpZW5kLm5hbWUrJzwvcD48cD4nK3RoaXNGcmllbmQuYmlvKyc8L3A+Jyk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG4vKipcclxuICogUEFHRVxyXG4gKiAqL1xyXG5mdW5jdGlvbiBMb2dpblBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNsb2dpblBhZ2UnKVswXSwgTG9naW5DdHJsLCBMb2dpblZpZXcpO1xyXG59XHJcbkxvZ2luUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuTG9naW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luUGFnZTtcclxuXHJcbi8qKlxyXG4gKiBDT05UUk9MTEVSXHJcbiAqICovXHJcbmZ1bmN0aW9uIExvZ2luQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmxvZ2dpbmdJbiA9IGZhbHNlO1xyXG59XHJcbkxvZ2luQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkxvZ2luQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpbkN0cmw7XHJcblxyXG5Mb2dpbkN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZJRVdFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBMb2dpblZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkxvZ2luVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkxvZ2luVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpblZpZXc7XHJcbkxvZ2luVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5Mb2dpblZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICAgICAgXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5sb2dnaW5nSW4gKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwYWdlLmN0cmwubG9nZ2luZ0luID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xyXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXHJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cclxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9tYWluJztcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwubG9nZ2luZ0luID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIE1haW5QYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbWFpblBhZ2UnKVswXSwgTWFpbkN0cmwsIE1haW5WaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5NYWluUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuTWFpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblBhZ2U7XHJcblxyXG5mdW5jdGlvbiBNYWluQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTWFpbkN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5NYWluQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluQ3RybDtcclxuXHJcbmZ1bmN0aW9uIE1haW5WaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5NYWluVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbk1haW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5WaWV3O1xyXG5NYWluVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5iYW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcclxuICAgIH0pO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMnO1xyXG4gICAgfSk7XHJcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5hZGQtZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcclxuICAgIH0pO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuc2VhcmNoLWJhbmRzJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvc2VhcmNoJztcclxuICAgIH0pO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcubm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL25vdGlmaWNhdGlvbnMnO1xyXG4gICAgfSk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG4vKiBnbG9iYWwgTm90aWZpY2F0aW9uICovXHJcblxyXG4vKipcclxuICogUEFHRVxyXG4gKiAqL1xyXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI25vdGlmaWNhdGlvbnNQYWdlJylbMF0sIE5vdGlmaWNhdGlvbnNDdHJsLCBOb3RpZmljYXRpb25zVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuTm90aWZpY2F0aW9uc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbk5vdGlmaWNhdGlvbnNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNQYWdlO1xyXG5cclxuLyoqXHJcbiAqIENPTlRST0xMRVJcclxuICogKi9cclxuZnVuY3Rpb24gTm90aWZpY2F0aW9uc0N0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25zID0gW107XHJcbn1cclxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zQ3RybDtcclxuXHJcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgY3RybCA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgY3RybC5nZXROb3RpZmljYXRpb25zKCkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xyXG4gICAgfSk7XHJcbn07XHJcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5nZXROb3RpZmljYXRpb25zID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgY3RybCA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgLy9nZXQgbm90aWZpY2F0aW9uc1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucydcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICAgICAgY3RybC5ub3RpZmljYXRpb25zID0gZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGlmaWNhdGlvbi5mcm9tT2JqKGl0ZW0pO1xyXG4gICAgICAgICAgICB9KSB8fCBbXTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuZGVsZXRlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKCl7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVklFV0VSXHJcbiAqICovXHJcbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNWaWV3O1xyXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG59O1xyXG5cclxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICAgICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xvc2UuYnMuYWxlcnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vZGVsZXRlIG5vdGlmaWNhdGlvbiBvbiB0aGUgc2VydmVyXHJcbiAgICAgICAgcGFnZS5jdHJsLmRlbGV0ZU5vdGlmaWNhdGlvbigkKHRoaXMpLmF0dHIoJ2RhdGEtbm90aWZpY2F0aW9uLWlkJykpXHJcbiAgICAgICAgLnRoZW4ocGFnZS5jdHJsLmdldE5vdGlmaWNhdGlvbnMpXHJcbiAgICAgICAgLnRoZW4ocGFnZS52aWV3LnJlbmRlcilcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVyci5zdGFjayk7XHJcbiAgICAgICAgICAgIHBhZ2UuY3RybC5nZXROb3RpZmljYXRpb25zKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBub3RpZmljYXRpb25FbGVtID0gJCgnI25vdGlmaWNhdGlvbnNQYWdlJykuZmluZCgnLm5vdGlmaWNhdGlvbnMnKS5lbXB0eSgpO1xyXG4gICAgdGhpcy5wYWdlLmN0cmwubm90aWZpY2F0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChub3RpZmljYXRpb24pe1xyXG4gICAgICAgIHZhciBhbGVydFR5cGU7XHJcbiAgICAgICAgc3dpdGNoKG5vdGlmaWNhdGlvbi50eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5TVUNDRVNTOlxyXG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkZSSUVORF9BQ0NFUFRFRDpcclxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1zdWNjZXNzJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuV0FSTklORzpcclxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5SRU1PVkVEX0ZST01fQkFORDpcclxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC13YXJuaW5nJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuRVJST1I6XHJcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtZGFuZ2VyJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3RpZmljYXRpb25FbGVtLmFwcGVuZCgnJytcclxuICAgICAgICAnPGEgaHJlZj1cIicrbm90aWZpY2F0aW9uLmxpbmsrJ1wiIGNsYXNzPVwibm90aWZpY2F0aW9uIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlICcrYWxlcnRUeXBlKydcIiBkYXRhLW5vdGlmaWNhdGlvbi1pZD1cIicrbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbklkKydcIj4nK1xyXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+JytcclxuICAgICAgICAgICAgICAgICc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPicrXHJcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb24ubWVzc2FnZStcclxuICAgICAgICAnPC9hPicpO1xyXG4gICAgfSk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuLyoqXHJcbiAqIFBBR0VcclxuICogKi9cclxuZnVuY3Rpb24gUmVnaXN0ZXJQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjcmVnaXN0ZXJQYWdlJylbMF0sIFJlZ2lzdGVyQ3RybCwgUmVnaXN0ZXJWaWV3KTtcclxufVxyXG5SZWdpc3RlclBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlclBhZ2U7XHJcblxyXG4vKipcclxuICogQ09OVFJPTExFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBSZWdpc3RlckN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5yZWdpc3RlcmluZyA9IGZhbHNlO1xyXG59XHJcblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckN0cmw7XHJcblxyXG5SZWdpc3RlckN0cmwucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL3JlZ2lzdGVyJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZJRVdFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBSZWdpc3RlclZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlclZpZXc7XHJcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICAgICAgXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXHJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcclxuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXHJcbiAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXHJcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+UmVnaXN0cmF0aW9uIFN1Y2Nlc3NmdWwhPC9zdHJvbmc+IFJlZGlyZWN0aW5nIGluIDIgc2Vjb25kcy4uLidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtdGltZXMnKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpXHJcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXHJcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXHJcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXHJcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5Mb2dpbiBGYWlsZWQhPC9zdHJvbmc+IFVzZXJuYW1lIG9yIHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QuJ1xyXG4gICAgICAgICAgICArJzwvZGl2PicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0iLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjcmVnaXN0ZXJCYW5kUGFnZScpWzBdLCBSZWdpc3RlckJhbmRDdHJsLCBSZWdpc3RlckJhbmRWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5SZWdpc3RlckJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5SZWdpc3RlckJhbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZFBhZ2U7XHJcblxyXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcclxufVxyXG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRDdHJsO1xyXG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9yZWdpc3RlcicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZWplY3QoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZFZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZFZpZXc7XHJcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2UgPSB0aGlzLnBhZ2UsXHJcbiAgICAgICAgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXHJcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxyXG4gICAgICAgIHBhZ2UuY3RybC5sb2dpbih0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlJlZ2lzdHJhdGlvbiBTdWNjZXNzZnVsITwvc3Ryb25nPiBSZWRpcmVjdGluZyBpbiAyIHNlY29uZHMuLi4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMnO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+QmFuZCBSZWdpc3RyYXRpb24gRmFpbGVkITwvc3Ryb25nPidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cclxudmFyIHNlYXJjaGluZyA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gU2VhcmNoQmFuZHNQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjc2VhcmNoQmFuZHNQYWdlJylbMF0sIFNlYXJjaEJhbmRzQ3RybCwgU2VhcmNoQmFuZHNWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5TZWFyY2hCYW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcblNlYXJjaEJhbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc1BhZ2U7XHJcblxyXG5mdW5jdGlvbiBTZWFyY2hCYW5kc0N0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5iYW5kcyA9IFtdO1xyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSBmYWxzZTtcclxufVxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNDdHJsO1xyXG5cclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGF0LmJhbmRzID0gW107XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvc2VhcmNoJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5iYW5kcyA9IGRhdGE7XHJcbiAgICAgICAgdGhhdC5wYWdlLnZpZXcudXBkYXRlQmFuZExpc3QoKTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSByZWxhdGlvbiB0aGUgYXBwbGljYXRpb24gZm9yIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoZSBzZWxlY3RlZCBiYW5kXHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuc3VibWl0QXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYmFuZElkLCBmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBgL2FwaS9iYW5kcy8ke2JhbmRJZH0vc3VibWl0QXBwbGljYXRpb25gLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBhbGVydChcIkVycm9yIVwiKTsgXHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vLyBUaGlzIG1ldGhvZCB3aWxsIGRlbGV0ZSB0aGUgYXBwbGljYXRpb24gZm9yIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoaXMgYmFuZFxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmNhbmNlbEFwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGJhbmRJZCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvY2FuY2VsQXBwbGljYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7YmFuZElkIDogYmFuZElkfVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuZXhwYW5kQmFuZE1vZGFsID0gZnVuY3Rpb24oYXBwbGljYXRpb25UeXBlLCBhcHBsaWNhdGlvblN0YXR1cywgYmFuZElkKSB7XHJcbiAgICAkKCcubW9kYWwtYm9keScpLnJlbW92ZSgpO1xyXG4gICAgJCgnLm1vZGFsLWZvb3RlcicpLnJlbW92ZSgpOyAgICBcclxuXHJcbiAgICB2YXIgYmFuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLm1vZGFsLWNvbnRlbnQnKTtcclxuICAgIHZhciBiYW5kTmFtZSA9IGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKCk7XHJcbiAgICB2YXIgaW5zdHJ1bWVudEZpZWxkID0gJyc7XHJcblxyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwoYmFuZE5hbWUrJzxici8+JythcHBsaWNhdGlvblR5cGUrJyBBcHBsaWNhdGlvbicpO1xyXG5cclxuICAgIGlmIChhcHBsaWNhdGlvblR5cGUgPT09ICdNZW1iZXInKSB7XHJcbiAgICAgICAgaW5zdHJ1bWVudEZpZWxkID0gJzxpbnB1dCByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImluc3RydW1lbnRcIiBwbGFjZWhvbGRlcj1cIkluc3RydW1lbnRcIiAvPjxwLz4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaW5zdHJ1bWVudEZpZWxkID0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImluc3RydW1lbnRcIiB2YWx1ZT1cIk4vQVwiLz48cC8+JzsgIFxyXG4gICAgfVxyXG5cclxuICAgIGJhbmRNb2RhbC5hcHBlbmQoJycrXHJcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj4nK1xyXG4gICAgICAgICc8Zm9ybSBpZD1cImFwcGx5LWZvcm1cIiBjbGFzcz1cImFwcGx5LWZvcm1cIiBvbnN1Ym1pdD1cInJldHVyblwiPicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXHJcbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50RmllbGQrXHJcbiAgICAgICAgICAgICAgICAnPGlucHV0IHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiTWVzc2FnZVwiIC8+JytcclxuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJiYW5kSWRcIiB2YWx1ZT1cIicrYmFuZElkKydcIiAvPicrXHJcbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYXBwbGljYXRpb25TdGF0dXNcIiB2YWx1ZT1cIicrYXBwbGljYXRpb25TdGF0dXMrJ1wiIC8+JytcclxuICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzwvZm9ybT4nK1xyXG4gICAgJzwvZGl2PicrXHJcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicrICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiBmb3JtPVwiYXBwbHktZm9ybVwiPicrXHJcbiAgICAgICAgICAgICAgICAnU3VibWl0JytcclxuICAgICAgICAgICAgJzwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj4nK1xyXG4gICAgICAgICc8L2Rpdj4nKyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAnPC9kaXY+Jyk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBTZWFyY2hCYW5kc1ZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gdW5kZWZpbmVkO1xyXG59XHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc1ZpZXc7XHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpeyAgIFxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcclxuICAgIFxyXG4gICAgLy8gVGhpcyB3aWxsIHJ1biBhIHNlYXJjaCBldmVyeSBzZWNvbmQgd2hlbiB0aGUgdXNlciBwcmVzc2VzIGEga2V5LiBcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsICcuc2VhcmNoLWZvcm0gaW5wdXQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdmFyIHRoaXNGb3JtID0gJCh0aGlzKTtcclxuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgIHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXNGb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uc2VhcmNoLWZvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICBcclxuICAgICAgICBwYWdlLmN0cmwuc2VhcmNoKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7ICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5hcHBseS1mb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgICBcclxuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpOyAgIFxyXG4gICAgICAgIHBhZ2UuY3RybC5zdWJtaXRBcHBsaWNhdGlvbihwYXJzZUludCgkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLCAxMCksIHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC1mb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIC8vaGFuZGxlIHRoZSBhcHBsaWNhdGlvbiByZXN1bHRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBUb2dnbGUgQmFuZCBNb2RhbFxyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgcGFnZS52aWV3LnNob3dCYW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIG1hbmFnZXIgYXBwbGljYXRpb24gcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseU1hbmFnZXInLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXHJcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWFuYWdlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01BTkFHRVIsIGJhbmRJZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEhhbmRsZSBtZW1iZXIgYXBwbGljYXRpb24gcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseU1lbWJlcicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcclxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdNZW1iZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NRU1CRVIsIGJhbmRJZCk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEhhbmRsZSBwcm9tb3RlciBhcHBsaWNhdGlvbiByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5UHJvbW90ZXInLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXHJcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnUHJvbW90ZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9QUk9NT1RFUiwgYmFuZElkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBhcHBsaWNhdGlvbiBjYW5jZWwgcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxyXG4gICAgICAgIHBhZ2UuY3RybC5jYW5jZWxBcHBsaWNhdGlvbihiYW5kSWQpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgICBcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypwYWdlRWxlbS5vbignaGlkZGVuLmJzLm1vZGFsJywgJyNtb2RhbDcnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCYW5kTGlzdDtcclxuICAgIH0pOyovXHJcbn07XHJcblxyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZUJhbmRMaXN0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgYmFuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmRzJyk7XHJcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XHJcbiAgICB2YXIgYmFkZ2UgPSAnJztcclxuXHJcbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxyXG4gICAgJCgnLmNhcmQnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcclxuXHJcbiAgICAgICAgLy8gSWYgeW91IGhhdmUgYSByb2xlIHRoZW4geW91IGFyZSBpbiB0aGUgYmFuZCwgc28gbm8gbW9kYWwgYnV0dG9uc1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlICE9ICdub25lJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1zdWNjZXNzJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ucm9sZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWFuYWdlciknKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdyZWplY3RlZCcpIHsgXHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggYmFuZFxyXG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJycrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtYmFuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uaWQrJ1wiID4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xyXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmJhbmROYW1lK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5nZW5yZSsnKTwvc21hbGw+JytiYWRnZStcclxuICAgICAgICAgICAgICAgICc8L2g0PicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLnNob3dCYW5kTW9kYWwgPSBmdW5jdGlvbiAoYmFuZElkKXtcclxuICAgIHZhciB0aGlzQmFuZCA9IHRoaXMucGFnZS5jdHJsLmJhbmRzLmZpbHRlcihmdW5jdGlvbiAoYmFuZCl7XHJcbiAgICAgICAgcmV0dXJuIGJhbmQuaWQgPT0gYmFuZElkO1xyXG4gICAgfSlbMF0sXHJcbiAgICAgICAgbW9kYWxCdXR0b25zO1xyXG4gICAgXHJcbiAgICBpZiAodGhpc0JhbmQucm9sZSAhPSAnbm9uZScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnJztcclxuICAgIH1cclxuICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBhcHBsaWNhdGlvbiBzdGF0dXMgaWYgdGhleSBkbyBub3QgaGF2ZSBhIHJvbGUgaW4gdGhlIGJhbmRcclxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWFuYWdlciknKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgTWFuYWdlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1lbWJlciknKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgTWVtYmVyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAocHJvbW90ZXIpJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIFByb21vdGVyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzICE9PSAnYmxvY2tlZCcpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5TWFuYWdlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBNYW5hZ2VyPC9idXR0b24+JysgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5BcHBseU1lbWJlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBNZW1iZXI8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlQcm9tb3RlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBQcm9tb3RlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZC1tb2RhbCcpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYmFuZC1pZCcsdGhpc0JhbmQuaWQpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0JhbmQuYmFuZE5hbWUpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzQmFuZC5kZXNjcmlwdGlvbisnPC9wPicpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXInKS5odG1sKCc8ZGl2IGNsYXNzPVwiZHluYW1pYy1idXR0b25zXCI+PC9kaXY+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+Jyk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xyXG59OyJdfQ==
