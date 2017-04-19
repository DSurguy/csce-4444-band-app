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
    NONE: -1,
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
    })
    .catch(console.error);
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
/* global MenuComponent */
/* global Application */
/* global BandMember */

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
    var defer = $.Deferred();
    
    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];
    var that = this;
    
    $.ajax('/api/bands/'+id+'/applications', {
        method: 'GET'
    }).then(function (data){
        that.applications = data;
        defer.resolve();
    }).catch(defer.reject);

    $.ajax('/api/bands/'+id+'/role', {
        method: 'GET'
    }).then(function (data){
        that.bandMemberRole = data.role;
        defer.resolve();
    }).catch(defer.reject);  
    
    return defer.promise();
};

ApplicationsCtrl.prototype.processApplication = function (applicationId, processStatus, applicationStatus) {
    var defer = $.Deferred();
    
    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];

    $.ajax({
        url: '/api/bands/'+id+'/processapplication',
        type: 'POST',
        data: {applicationId : applicationId, processStatus : processStatus, applicationStatus : applicationStatus}
    }).then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

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
        
        var applicationId = parseInt($(this).parents('.modal').attr('data-application-id'), 10);
        var applicationStatus = parseInt($(this).parents('.modal').attr('data-application-status'), 10);
        
        page.ctrl.processApplication(applicationId, Application.STATUS.ACCEPTED, applicationStatus)
        .then(window.location.reload)
        .fail(console.error);
    });

    // Handle friend accept
    pageElem.on('click', '#btnReject', function (e){
        e.preventDefault();
        e.stopPropagation();
        
        var applicationId = parseInt($(this).parents('.modal').attr('data-application-id'), 10);
        var applicationStatus = parseInt($(this).parents('.modal').attr('data-application-status'), 10);
        
        page.ctrl.processApplication(applicationId, Application.STATUS.REJECTED, applicationStatus)
        .then(window.location.reload)
        .fail(console.error);
    });
};

ApplicationsView.prototype.showApplicationModal = function (applicationId, applicationStatus){
    var thisApplication = this.page.ctrl.applications.filter(function (application){
        return application.id == applicationId;
    })[0];
    
    var modalButtons = '';

    if (this.page.ctrl.bandMemberRole === BandMember.ROLE.OWNER || this.page.ctrl.bandMemberRole === BandMember.ROLE.MANAGER) {
        modalButtons =  '<button id="btnAccept" type="button" class="btn btn-success" data-dismiss="modal">Accept</button>'+
                        '<button id="btnReject" type="button" class="btn btn-danger" data-dismiss="modal">Reject</button>';
    }

    var applicationModal = $(this.page.elem).find('.application-modal');
    applicationModal.find('.modal').attr('data-application-id', thisApplication.id);
    applicationModal.find('.modal').attr('data-application-status', thisApplication.status);
    applicationModal.find('.modal-title').html(thisApplication.name+' - '+thisApplication.username);
    applicationModal.find('.modal-body').html('<p>Instrument: '+thisApplication.instrument+'</p><p>Message: '+thisApplication.message);
    applicationModal.find('.dynamic-buttons').html(modalButtons);
    applicationModal.find('.modal').modal();
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global MenuComponent */
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
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];

    //var id = window.location.search.substr(1);
    var defer = $.Deferred();
    var that = this;
    $.ajax('/api/bands/' + id, {
        method: 'GET'
    }).then(function (data){
        that.band = data;
        defer.resolve();
    }).catch(defer.reject);
    
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
    
    var bandInfoElem = bandElem.find('.card-block');
    bandInfoElem.append(''
        +'<p class="info card-text"><strong>Band Name</strong>: '+this.page.ctrl.band[0].bandName+'</p>'
        +'<p class="info card-text"><strong>Owner</strong>: '+this.page.ctrl.band[0].ownerName+'</p>'
        +'<p class="info card-text"><strong>Description</strong>: '+this.page.ctrl.band[0].description+'</p>'
    );
    
    this.bindEvents();
};

BandView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem);

    pageElem.on('click', '.applications', function (e){
        window.location = window.location.pathname+'/applications';
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
        window.location = '/bands/' + e.target.id;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJub3RpZmljYXRpb24uanMiLCJzZWFyY2hlZEJhbmQuanMiLCJzaW1wbGVCYW5kLmpzIiwiYXBwLmpzIiwicGFnZS5qcyIsIm1lbnUuanMiLCJhZGRGcmllbmQuanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QVZoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QVdqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMvTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBcHBsaWNhdGlvbihqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudXNlcm5hbWUgPSBqc29uLnVzZXJuYW1lIHx8ICcnO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XG4gICAgdGhpcy5tZXNzYWdlID0ganNvbi5tZXNzYWdlIHx8ICcnO1xufVxuXG5BcHBsaWNhdGlvbi5TVEFUVVMgPSB7XG5cdE5PTkU6IDAsIFxuICAgIEFQUExJRURfTUFOQUdFUjogMSxcbiAgICBBUFBMSUVEX01FTUJFUjogMixcbiAgICBBUFBMSUVEX1BST01PVEVSOiAzLFxuXHRBQ0NFUFRFRDogNCwgXG5cdFJFSkVDVEVEOiA1LFxuICAgIEJMT0NLRUQ6IDZcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IH0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kUGFnZScpWzBdLCBCYW5kQ3RybCwgQmFuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFBhZ2U7XG5cbmZ1bmN0aW9uIEJhbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kID0ge307XG59XG5CYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5CYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kQ3RybDtcbkJhbmRDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgIC8vdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJyArIGlkLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEJhbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5CYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kVmlldztcbkJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGJhbmRFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQnKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxoMiBjbGFzcz1cImNhcmQtdGl0bGVcIj5NeSBCYW5kPC9oMj4nKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+PC9kaXY+Jyk7XG4gICAgXG4gICAgdmFyIGJhbmRJbmZvRWxlbSA9IGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJyk7XG4gICAgYmFuZEluZm9FbGVtLmFwcGVuZCgnJ1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkJhbmQgTmFtZTwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLmJhbmROYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPk93bmVyPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRbMF0ub3duZXJOYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkRlc2NyaXB0aW9uPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRbMF0uZGVzY3JpcHRpb24rJzwvcD4nXG4gICAgKTtcbiAgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKycvYXBwbGljYXRpb25zJztcbiAgICB9KTtcbn07IiwiZnVuY3Rpb24gQmFuZE1lbWJlcihqc29uKXtcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmJhbmRJZCA9IGpzb24uYmFuZElkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnVzZXJuYW1lID0ganNvbi51c2VybmFtZSB8fCAnJztcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5pbnN0cnVtZW50ID0ganNvbi5pbnN0cnVtZW50IHx8ICcnO1xuICAgIHRoaXMucm9sZSA9IGpzb24ucm9sZSB8fCAnJztcbn1cblxuQmFuZE1lbWJlci5ST0xFID0ge1xuICAgIE5PTkU6IC0xLFxuICAgIE9XTkVSIDogMCxcbiAgICBNQU5BR0VSOiAxLFxuICAgIE1FTUJFUiA6IDIsXG4gICAgUFJPTU9URVIgOiAzXG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEJhbmRNZW1iZXI7IH0iLCJmdW5jdGlvbiBGcmllbmQoanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLnVzZXJOYW1lID0ganNvbi51c2VyTmFtZSB8fCAnJztcbiAgICB0aGlzLmJpbyA9IGpzb24uYmlvIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCAnJztcbn1cblxuRnJpZW5kLlNUQVRVUyA9IHtcblx0Tk9ORTogMCwgXG5cdEZSSUVORDogMSwgXG5cdFJFUVVFU1RFRDogMiwgXG5cdFBFTkRJTkc6IDMsIFxuXHRCTE9DS0VEOiA0IFxufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBGcmllbmQ7IH0iLCJmdW5jdGlvbiBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uSWQsIHVzZXJJZCwgdHlwZSwgbWVzc2FnZSwgbGluaywgdW5yZWFkKXtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbklkID0gbm90aWZpY2F0aW9uSWQ7XG4gICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMubGluayA9IGxpbms7XG4gICAgdGhpcy51bnJlYWQgPSB1bnJlYWQ7XG59XG5Ob3RpZmljYXRpb24uVFlQRSA9IHtcbiAgICBOT19NRVNTQUdFOiAwLFxuICAgIEZSSUVORF9SRVFVRVNUOiAxLFxuICAgIEZSSUVORF9BQ0NFUFRFRDogMixcbiAgICBCQU5EX0lOVklURTogMyxcbiAgICBSRU1PVkVEX0ZST01fQkFORDogNCxcbiAgICBFVkVOVF9JTlZJVEU6IDUsXG4gICAgRVZFTlRfUkVNSU5ERVI6IDYsXG4gICAgRVJST1I6IDcsXG4gICAgU1VDQ0VTUzogOCxcbiAgICBXQVJOSU5HOiA5XG59O1xuTm90aWZpY2F0aW9uLmZyb21PYmogPSBmdW5jdGlvbiAob2JqKXtcbiAgICB2YXIgbXlOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCk7XG4gICAgbXlOb3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQgPSBvYmoubm90aWZpY2F0aW9uSWQgfHwgb2JqLk5vdGlmaWNhdGlvbklkIHx8IC0xO1xuICAgIG15Tm90aWZpY2F0aW9uLnVzZXJJZCA9IG9iai51c2VySWQgfHwgb2JqLlVzZXJJZCB8fCAtMTtcbiAgICBteU5vdGlmaWNhdGlvbi50eXBlID0gb2JqLnR5cGUgfHwgb2JqLlR5cGUgfHwgTm90aWZpY2F0aW9uLlRZUEUuTk9fTUVTU0FHRTtcbiAgICBteU5vdGlmaWNhdGlvbi5tZXNzYWdlID0gb2JqLm1lc3NhZ2UgfHwgb2JqLk1lc3NhZ2UgfHwgJyc7XG4gICAgbXlOb3RpZmljYXRpb24ubGluayA9IG9iai5saW5rIHx8IG9iai5MaW5rIHx8ICcjJztcbiAgICBteU5vdGlmaWNhdGlvbi51bnJlYWQgPSBvYmoudW5yZWFkIHx8IG9iai5VbnJlYWQgfHwgdHJ1ZTtcbiAgICByZXR1cm4gbXlOb3RpZmljYXRpb247XG59O1xuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBOb3RpZmljYXRpb247IH1cbiIsImZ1bmN0aW9uIFNlYXJjaGVkQmFuZChqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xuICAgIHRoaXMuYXBwbGljYXRpb25TdGF0dXMgPSBqc29uLmFwcGxpY2F0aW9uU3RhdHVzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBqc29uLmRlc2NyaXB0aW9uIHx8ICcnO1xuICAgIHRoaXMuZ2VucmUgPSBqc29uLmdlbnJlIHx8ICcnO1xufVxuXG5TZWFyY2hlZEJhbmQuUk9MRSA9IHtcbiAgICBPV05FUjogMCxcbiAgICBNQU5BR0VSOiAxLFxuICAgIE1FTUJFUjogMixcbiAgICBQUk9NT1RFUjogM1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hlZEJhbmQ7IH0iLCJmdW5jdGlvbiBTaW1wbGVCYW5kKGpzb24pe1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy5vd25lck5hbWUgPSBqc29uLm93bmVyTmFtZSB8fCAnJztcbiAgICB0aGlzLm93bmVySWQgPSBqc29uLm93bmVySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVCYW5kOyB9IiwiLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gQXBwKCl7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHVuZGVmaW5lZDtcbiAgICAvL3RoaXMucGFnZUhpc3RvcnkgPSBbXTtcbn1cbkFwcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChQYWdlQ29uc3RydWN0b3Ipe1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgUGFnZUNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XG59O1xuLypBcHAucHJvdG90eXBlLmNoYW5nZVBhZ2UgPSBmdW5jdGlvbiAocGFnZSwgZGF0YSl7XG4gICAgaWYoIHRoaXMuY3VycmVudFBhZ2UgKXtcbiAgICAgICAgLy9zdG9yZSB0aGUgY29uc3RydWN0b3IgZm9yIHRoZSBsYXN0IHBhZ2VcbiAgICAgICAgdGhpcy5wYWdlSGlzdG9yeS5wdXNoKHRoaXMuY3VycmVudFBhZ2UuY29uc3RydWN0b3IpO1xuICAgICAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICAvL2NyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbmV4dCBwYWdlXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBwYWdlKHRoaXMpO1xuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XG59OyovIiwiLyogZ2xvYmFsICQgKi9cbi8qKiBJbmhlcml0YWJsZSBDbGFzc2VzICoqL1xuZnVuY3Rpb24gUGFnZShhcHAsIGVsZW0sIGN0cmxDb25zdHJ1Y3Rvciwgdmlld0NvbnN0cnVjdG9yLCBjaGlsZENvbXBvbmVudHMpe1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgdGhpcy5jdHJsID0gbmV3IGN0cmxDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICB0aGlzLnZpZXcgPSBuZXcgdmlld0NvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzID0gY2hpbGRDb21wb25lbnRzIHx8IHt9O1xufVxuUGFnZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBcbiAgICBmb3IoIHZhciBjb21wb25lbnQgaW4gdGhpcy5jaGlsZENvbXBvbmVudHMgKXtcbiAgICAgICAgdGhpcy5jaGlsZENvbXBvbmVudHNbY29tcG9uZW50XS5pbml0KCk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuY3RybC5pbml0KClcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgdGhhdC52aWV3LmluaXQuYXBwbHkodGhhdC52aWV3LCBhcmd1bWVudHMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xufTtcblxuZnVuY3Rpb24gUGFnZUN0cmwocGFnZSl7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbn1cblBhZ2VDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gUGFnZVZpZXcocGFnZSl7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbn1cblBhZ2VWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7fTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIE1lbnVDb21wb25lbnQoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKGRhdGEuZWxlbWVudClbMF0sIE1lbnVDdHJsLCBNZW51Vmlldyk7XG59XG5NZW51Q29tcG9uZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTWVudUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q29tcG9uZW50O1xuXG5mdW5jdGlvbiBNZW51Q3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTWVudUN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuTWVudUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudUN0cmw7XG5NZW51Q3RybC5wcm90b3R5cGUubG9nb3V0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvYXBpL2xvZ291dCdcbiAgICB9KS50aGVuKGRlZmVyLnJlc29sdmUpLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIE1lbnVWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5NZW51Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5NZW51Vmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Vmlldztcbk1lbnVWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoJyNtZW51T3ZlcmxheScpO1xuICAgIHRoaXMucmVuZGVyTWVudSgpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcbk1lbnVWaWV3LnByb3RvdHlwZS5yZW5kZXJNZW51ID0gZnVuY3Rpb24gKCl7XG4gICAgXG4gICAgLyogcmVuZGVyIG92ZXJsYXkgKi9cbiAgICBpZiggdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5sZW5ndGggPT0gMCApe1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwibWVudU92ZXJsYXlcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PicpO1xuICAgICAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyID0gJChcIiNtZW51T3ZlcmxheVwiKTtcbiAgICB9XG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5lbXB0eSgpO1xuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudVwiPjwvZGl2PicpO1xuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51U2VjdGlvblwiPidcbiAgICAgICAgKyc8ZGl2IGNsYXNzPVwiYWN0aW9uIGxvZ291dCBidG4gYnRuLXNlY29uZGFyeVwiPkxvZ291dDwvZGl2PidcbiAgICArJzwvZGl2PicpO1xuICAgIFxuICAgIC8qIHJlbmRlciBtZW51IGJ1dHRvbiAqL1xuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lci5lbXB0eSgpO1xuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51LXRvZ2dsZSBidG4gYnRuLXNlY29uZGFyeSBmYSBmYS1iYXJzXCI+PC9kaXY+Jyk7XG59O1xuTWVudVZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICAgICAgdmlldyA9IHRoaXM7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5tZW51LXRvZ2dsZScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmlldy52aXNpYmxlID0gIXZpZXcudmlzaWJsZTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB2aWV3LnZpc2libGUgKXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgJy5tZW51IC5sb2dvdXQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcucGFnZS5jdHJsLmxvZ291dCgpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLm9uKCdjbGljaycsICcubWVudScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEFkZEZyaWVuZFBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkRnJpZW5kUGFnZScpWzBdLCBBZGRGcmllbmRDdHJsLCBBZGRGcmllbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkRnJpZW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRQYWdlO1xuXG5mdW5jdGlvbiBBZGRGcmllbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5mcmllbmRzID0gW107XG59XG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kQ3RybDtcblxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhhdC5mcmllbmRzID0gW107XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmZyaWVuZHMgPSBkYXRhO1xuICAgICAgICB0aGF0LnBhZ2Uudmlldy51cGRhdGVVc2VyTGlzdCgpO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgcmVsYXRpb24gYmV0d2VlbiB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGUgXCJ0b1wiIHVzZXJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3RvVXNlcklkIDogdG9Vc2VySWQsIHN0YXR1cyA6IHN0YXR1c31cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBBZGRGcmllbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kVmlldztcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQ7XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlwcmVzcycsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC11c2VyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgLy9IYW5kbGUgUmVzdWx0XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwxMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGZyaWVuZCByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLlJFUVVFU1RFRClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpOyAgXG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGJsb2NrIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkJMT0NLRUQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgdW5ibG9jayByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgY2FuY2VsIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkNhbmNlbFJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5BY2NlcHRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuRlJJRU5EKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGZyaWVuZCByZWplY3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlamVjdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIHVuZnJpZW5kXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmZyaWVuZE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xufTtcblxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUudXBkYXRlVXNlckxpc3QgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZnJpZW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kcycpO1xuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcbiAgICB2YXIgYmFkZ2UgPSAnJztcblxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXG4gICAgJCgnLmNhcmQnKS5yZW1vdmUoKTtcblxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBzdGF0dXNcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC13YXJuaW5nJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWludmVyc2UnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5zaG93RnJpZW5kTW9kYWwgPSBmdW5jdGlvbiAoZnJpZW5kSWQpe1xuICAgIHZhciB0aGlzRnJpZW5kID0gdGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24gKGZyaWVuZCl7XG4gICAgICAgIHJldHVybiBmcmllbmQuaWQgPT0gZnJpZW5kSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucztcbiAgICAgICAgXG4gICAgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5VbmZyaWVuZE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmZyaWVuZDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkNhbmNlbFJlcXVlc3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAncGVuZGluZycpIHsgXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5BY2NlcHRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blJlamVjdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5SZWplY3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5VbmJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuYmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0blJlcXVlc3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+U2VuZCBGcmllbmQgUmVxdWVzdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIFxuICAgIHZhciBmcmllbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmQtbW9kYWwnKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcsdGhpc0ZyaWVuZC5pZCk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzRnJpZW5kLnVzZXJOYW1lKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0ZyaWVuZC5uYW1lKyc8L3A+PHA+Jyt0aGlzRnJpZW5kLmJpbysnPC9wPicpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBBcHBsaWNhdGlvbiAqL1xuLyogZ2xvYmFsIEJhbmRNZW1iZXIgKi9cblxuZnVuY3Rpb24gQXBwbGljYXRpb25zUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNhcHBsaWNhdGlvbnNQYWdlJylbMF0sIEFwcGxpY2F0aW9uc0N0cmwsIEFwcGxpY2F0aW9uc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkFwcGxpY2F0aW9uc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5BcHBsaWNhdGlvbnNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFwcGxpY2F0aW9uc1BhZ2U7XG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmFwcGxpY2F0aW9ucyA9IFtdO1xufVxuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFwcGxpY2F0aW9uc0N0cmw7XG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCgnL2FwaS9iYW5kcy8nK2lkKycvYXBwbGljYXRpb25zJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYXBwbGljYXRpb25zID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7XG5cbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJytpZCsnL3JvbGUnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kTWVtYmVyUm9sZSA9IGRhdGEucm9sZTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7ICBcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUucHJvY2Vzc0FwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIHByb2Nlc3NTdGF0dXMsIGFwcGxpY2F0aW9uU3RhdHVzKSB7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycraWQrJy9wcm9jZXNzYXBwbGljYXRpb24nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHthcHBsaWNhdGlvbklkIDogYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cyA6IHByb2Nlc3NTdGF0dXMsIGFwcGxpY2F0aW9uU3RhdHVzIDogYXBwbGljYXRpb25TdGF0dXN9XG4gICAgfSkudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBBcHBsaWNhdGlvbnNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zVmlldztcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgYXBwbGljYXRpb25zRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5hcHBsaWNhdGlvbnMnKTtcbiAgICB2YXIgYmFkZ2UgPSAnJztcblxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01BTkFHRVIpIHtcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5NYW5hZ2VyJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NRU1CRVIpIHtcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5NZW1iZXInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX1BST01PVEVSKSB7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+UHJvbW90ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbGljYXRpb25zRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJhcHBsaWNhdGlvbiBidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtYXBwbGljYXRpb24taWQ9XCInK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5pZCsnXCIgZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXM9XCInK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMrJ1wiPicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnVzZXJuYW1lKycgPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyc8L2Rpdj48cC8+Jyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9uJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0FwcGxpY2F0aW9uTW9kYWwocGFyc2VJbnQoJChlLnRhcmdldCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcpLDEwKSxwYXJzZUludCgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLDEwKSk7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQWNjZXB0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgYXBwbGljYXRpb25JZCA9IHBhcnNlSW50KCQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcpLCAxMCk7XG4gICAgICAgIHZhciBhcHBsaWNhdGlvblN0YXR1cyA9IHBhcnNlSW50KCQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwgMTApO1xuICAgICAgICBcbiAgICAgICAgcGFnZS5jdHJsLnByb2Nlc3NBcHBsaWNhdGlvbihhcHBsaWNhdGlvbklkLCBBcHBsaWNhdGlvbi5TVEFUVVMuQUNDRVBURUQsIGFwcGxpY2F0aW9uU3RhdHVzKVxuICAgICAgICAudGhlbih3aW5kb3cubG9jYXRpb24ucmVsb2FkKVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5SRUpFQ1RFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQpXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xufTtcblxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuc2hvd0FwcGxpY2F0aW9uTW9kYWwgPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgYXBwbGljYXRpb25TdGF0dXMpe1xuICAgIHZhciB0aGlzQXBwbGljYXRpb24gPSB0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhcHBsaWNhdGlvbil7XG4gICAgICAgIHJldHVybiBhcHBsaWNhdGlvbi5pZCA9PSBhcHBsaWNhdGlvbklkO1xuICAgIH0pWzBdO1xuICAgIFxuICAgIHZhciBtb2RhbEJ1dHRvbnMgPSAnJztcblxuICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk9XTkVSIHx8IHRoaXMucGFnZS5jdHJsLmJhbmRNZW1iZXJSb2xlID09PSBCYW5kTWVtYmVyLlJPTEUuTUFOQUdFUikge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAgJzxidXR0b24gaWQ9XCJidG5BY2NlcHRcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0blJlamVjdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5SZWplY3Q8L2J1dHRvbj4nO1xuICAgIH1cblxuICAgIHZhciBhcHBsaWNhdGlvbk1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9uLW1vZGFsJyk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJywgdGhpc0FwcGxpY2F0aW9uLmlkKTtcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJywgdGhpc0FwcGxpY2F0aW9uLnN0YXR1cyk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNBcHBsaWNhdGlvbi5uYW1lKycgLSAnK3RoaXNBcHBsaWNhdGlvbi51c2VybmFtZSk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPkluc3RydW1lbnQ6ICcrdGhpc0FwcGxpY2F0aW9uLmluc3RydW1lbnQrJzwvcD48cD5NZXNzYWdlOiAnK3RoaXNBcHBsaWNhdGlvbi5tZXNzYWdlKTtcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIEJhbmRzUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kc1BhZ2UnKVswXSwgQmFuZHNDdHJsLCBCYW5kc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkJhbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kc1BhZ2U7XG5cbmZ1bmN0aW9uIEJhbmRzQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYmFuZHMgPSBbXTtcbn1cbkJhbmRzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5CYW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNDdHJsO1xuQmFuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kcyA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgdGhhdC5iYW5kcyA9IFtdO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEJhbmRzVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuQmFuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkJhbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kc1ZpZXc7XG5CYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgYmFuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmRzJyk7XG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmJhbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJiYW5kIGJ0biBidG4tc2Vjb25kYXJ5XCIgaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3JlZ2lzdGVyJztcbiAgICB9KTtcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvJyArIGUudGFyZ2V0LmlkO1xuICAgIH0pXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEZyaWVuZHNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ZyaWVuZHNQYWdlJylbMF0sIEZyaWVuZHNDdHJsLCBGcmllbmRzVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuRnJpZW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5GcmllbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzUGFnZTtcblxuZnVuY3Rpb24gRnJpZW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmZyaWVuZHMgPSBbXTtcbn1cbkZyaWVuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkZyaWVuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNDdHJsO1xuRnJpZW5kc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuZnJpZW5kcyA9IFtdO1xuICAgICQuYWpheCgnL2FwaS9mcmllbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuRnJpZW5kc0N0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3RvVXNlcklkIDogdG9Vc2VySWQsIHN0YXR1cyA6IHN0YXR1c31cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBGcmllbmRzVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuRnJpZW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc1ZpZXc7XG5GcmllbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMudXBkYXRlVXNlckxpc3QoKTtcbn07XG5cbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1mcmllbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZnJpZW5kcy9hZGQnO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5mcmllbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93RnJpZW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpLDEwKSk7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUkVRVUVTVEVEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICBcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUEVORElORylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuYmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkNhbmNlbFJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5GUklFTkQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZWplY3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pOyAgICAgICAgXG59O1xuXG5GcmllbmRzVmlldy5wcm90b3R5cGUudXBkYXRlVXNlckxpc3QgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZnJpZW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kcycpO1xuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcbiAgICB2YXIgYmFkZ2UgPSAnJztcblxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXG4gICAgZnJpZW5kc0VsZW0uZmluZCgnLmNhcmQnKS5yZW1vdmUoKTtcblxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBzdGF0dXNcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC13YXJuaW5nJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWludmVyc2UnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5GcmllbmRzVmlldy5wcm90b3R5cGUuc2hvd0ZyaWVuZE1vZGFsID0gZnVuY3Rpb24gKGZyaWVuZElkKXtcbiAgICB2YXIgdGhpc0ZyaWVuZCA9IHRoaXMucGFnZS5jdHJsLmZyaWVuZHMuZmlsdGVyKGZ1bmN0aW9uIChmcmllbmQpe1xuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xuICAgIH0pWzBdLFxuICAgICAgICBtb2RhbEJ1dHRvbnM7XG4gICAgICAgIFxuICAgIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuVW5mcmllbmRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5mcmllbmQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5SZWplY3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdibG9ja2VkJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuVW5ibG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5SZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5QYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2xvZ2luUGFnZScpWzBdLCBMb2dpbkN0cmwsIExvZ2luVmlldyk7XG59XG5Mb2dpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5Mb2dpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5QYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBMb2dpbkN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmxvZ2dpbmdJbiA9IGZhbHNlO1xufVxuTG9naW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkxvZ2luQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpbkN0cmw7XG5cbkxvZ2luQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvbG9naW4nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8qKlxuICogVklFV0VSXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5WaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5Mb2dpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTG9naW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luVmlldztcbkxvZ2luVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuTG9naW5WaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggcGFnZS5jdHJsLmxvZ2dpbmdJbiApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwubG9nZ2luZ0luID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgICAgIFxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXG4gICAgICAgIHBhZ2UuY3RybC5sb2dpbih0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL21haW4nO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5Mb2dpbiBGYWlsZWQhPC9zdHJvbmc+IFVzZXJuYW1lIG9yIHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIE1haW5QYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI21haW5QYWdlJylbMF0sIE1haW5DdHJsLCBNYWluVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuTWFpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5NYWluUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluUGFnZTtcblxuZnVuY3Rpb24gTWFpbkN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1haW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbk1haW5DdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5DdHJsO1xuXG5mdW5jdGlvbiBNYWluVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTWFpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTWFpblZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblZpZXc7XG5NYWluVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlO1xuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmJhbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMnO1xuICAgIH0pO1xuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmFkZC1mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5zZWFyY2gtYmFuZHMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvc2VhcmNoJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5ub3RpZmljYXRpb25zJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL25vdGlmaWNhdGlvbnMnO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIE5vdGlmaWNhdGlvbiAqL1xuXG4vKipcbiAqIFBBR0VcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNub3RpZmljYXRpb25zUGFnZScpWzBdLCBOb3RpZmljYXRpb25zQ3RybCwgTm90aWZpY2F0aW9uc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbk5vdGlmaWNhdGlvbnNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc1BhZ2U7XG5cbi8qKlxuICogQ09OVFJPTExFUlxuICogKi9cbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zID0gW107XG59XG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zQ3RybDtcblxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICBjdHJsLmdldE5vdGlmaWNhdGlvbnMoKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG59O1xuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmdldE5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICAvL2dldCBub3RpZmljYXRpb25zXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9ub3RpZmljYXRpb25zJ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgICAgICBjdHJsLm5vdGlmaWNhdGlvbnMgPSBkYXRhLm1hcChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGlmaWNhdGlvbi5mcm9tT2JqKGl0ZW0pO1xuICAgICAgICAgICAgfSkgfHwgW107XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5kZWxldGVOb3RpZmljYXRpb24gPSBmdW5jdGlvbiAoKXtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zVmlldztcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbn07XG5cbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbG9zZS5icy5hbGVydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vZGVsZXRlIG5vdGlmaWNhdGlvbiBvbiB0aGUgc2VydmVyXG4gICAgICAgIHBhZ2UuY3RybC5kZWxldGVOb3RpZmljYXRpb24oJCh0aGlzKS5hdHRyKCdkYXRhLW5vdGlmaWNhdGlvbi1pZCcpKVxuICAgICAgICAudGhlbihwYWdlLmN0cmwuZ2V0Tm90aWZpY2F0aW9ucylcbiAgICAgICAgLnRoZW4ocGFnZS52aWV3LnJlbmRlcilcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgYWxlcnQoZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIHBhZ2UuY3RybC5nZXROb3RpZmljYXRpb25zKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBub3RpZmljYXRpb25FbGVtID0gJCgnI25vdGlmaWNhdGlvbnNQYWdlJykuZmluZCgnLm5vdGlmaWNhdGlvbnMnKS5lbXB0eSgpO1xuICAgIHRoaXMucGFnZS5jdHJsLm5vdGlmaWNhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobm90aWZpY2F0aW9uKXtcbiAgICAgICAgdmFyIGFsZXJ0VHlwZTtcbiAgICAgICAgc3dpdGNoKG5vdGlmaWNhdGlvbi50eXBlKXtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuU1VDQ0VTUzpcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuRlJJRU5EX0FDQ0VQVEVEOlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1zdWNjZXNzJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5XQVJOSU5HOlxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5SRU1PVkVEX0ZST01fQkFORDpcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtd2FybmluZyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuRVJST1I6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LWRhbmdlcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LWluZm8nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbm90aWZpY2F0aW9uRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8YSBocmVmPVwiJytub3RpZmljYXRpb24ubGluaysnXCIgY2xhc3M9XCJub3RpZmljYXRpb24gYWxlcnQgYWxlcnQtZGlzbWlzc2FibGUgJythbGVydFR5cGUrJ1wiIGRhdGEtbm90aWZpY2F0aW9uLWlkPVwiJytub3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQrJ1wiPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+JytcbiAgICAgICAgICAgICAgICAnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nK1xuICAgICAgICAgICAgJzwvYnV0dG9uPicrXG4gICAgICAgICAgICBub3RpZmljYXRpb24ubWVzc2FnZStcbiAgICAgICAgJzwvYT4nKTtcbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG4vKipcbiAqIFBBR0VcbiAqICovXG5mdW5jdGlvbiBSZWdpc3RlclBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjcmVnaXN0ZXJQYWdlJylbMF0sIFJlZ2lzdGVyQ3RybCwgUmVnaXN0ZXJWaWV3KTtcbn1cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlclBhZ2U7XG5cbi8qKlxuICogQ09OVFJPTExFUlxuICogKi9cbmZ1bmN0aW9uIFJlZ2lzdGVyQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbn1cblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5SZWdpc3RlckN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJDdHJsO1xuXG5SZWdpc3RlckN0cmwucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL3JlZ2lzdGVyJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIFJlZ2lzdGVyVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlclZpZXc7XG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXIodGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKVxuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5Mb2dpbiBGYWlsZWQhPC9zdHJvbmc+IFVzZXJuYW1lIG9yIHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyQmFuZFBhZ2UnKVswXSwgUmVnaXN0ZXJCYW5kQ3RybCwgUmVnaXN0ZXJCYW5kVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblJlZ2lzdGVyQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kUGFnZTtcblxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbn1cblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRDdHJsO1xuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvcmVnaXN0ZXInLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZFZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRWaWV3O1xuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlLFxuICAgICAgICBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggcGFnZS5jdHJsLnJlZ2lzdGVyaW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5CYW5kIFJlZ2lzdHJhdGlvbiBGYWlsZWQhPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG52YXIgc2VhcmNoaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIFNlYXJjaEJhbmRzUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNzZWFyY2hCYW5kc1BhZ2UnKVswXSwgU2VhcmNoQmFuZHNDdHJsLCBTZWFyY2hCYW5kc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblNlYXJjaEJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblNlYXJjaEJhbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc1BhZ2U7XG5cbmZ1bmN0aW9uIFNlYXJjaEJhbmRzQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYmFuZHMgPSBbXTtcbiAgICB0aGlzLnNlYXJjaGluZyA9IGZhbHNlO1xufVxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc0N0cmw7XG5cblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhhdC5iYW5kcyA9IFtdO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvc2VhcmNoJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xuICAgICAgICB0aGF0LnBhZ2Uudmlldy51cGRhdGVCYW5kTGlzdCgpO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgcmVsYXRpb24gdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGUgc2VsZWN0ZWQgYmFuZFxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5zdWJtaXRBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChiYW5kSWQsIGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgL2FwaS9iYW5kcy8ke2JhbmRJZH0vc3VibWl0QXBwbGljYXRpb25gLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBhbGVydChcIkVycm9yIVwiKTsgXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIGRlbGV0ZSB0aGUgYXBwbGljYXRpb24gZm9yIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoaXMgYmFuZFxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jYW5jZWxBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChiYW5kSWQpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL2NhbmNlbEFwcGxpY2F0aW9uJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7YmFuZElkIDogYmFuZElkfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuZXhwYW5kQmFuZE1vZGFsID0gZnVuY3Rpb24oYXBwbGljYXRpb25UeXBlLCBhcHBsaWNhdGlvblN0YXR1cywgYmFuZElkKSB7XG4gICAgJCgnLm1vZGFsLWJvZHknKS5yZW1vdmUoKTtcbiAgICAkKCcubW9kYWwtZm9vdGVyJykucmVtb3ZlKCk7ICAgIFxuXG4gICAgdmFyIGJhbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5tb2RhbC1jb250ZW50Jyk7XG4gICAgdmFyIGJhbmROYW1lID0gYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwoKTtcbiAgICB2YXIgaW5zdHJ1bWVudEZpZWxkID0gJyc7XG5cbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbChiYW5kTmFtZSsnPGJyLz4nK2FwcGxpY2F0aW9uVHlwZSsnIEFwcGxpY2F0aW9uJyk7XG5cbiAgICBpZiAoYXBwbGljYXRpb25UeXBlID09PSAnTWVtYmVyJykge1xuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHBsYWNlaG9sZGVyPVwiSW5zdHJ1bWVudFwiIC8+PHAvPic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHZhbHVlPVwiTi9BXCIvPjxwLz4nOyAgXG4gICAgfVxuXG4gICAgYmFuZE1vZGFsLmFwcGVuZCgnJytcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj4nK1xuICAgICAgICAnPGZvcm0gaWQ9XCJhcHBseS1mb3JtXCIgY2xhc3M9XCJhcHBseS1mb3JtXCIgb25zdWJtaXQ9XCJyZXR1cm5cIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50RmllbGQrXG4gICAgICAgICAgICAgICAgJzxpbnB1dCByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm1lc3NhZ2VcIiBwbGFjZWhvbGRlcj1cIk1lc3NhZ2VcIiAvPicrXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImJhbmRJZFwiIHZhbHVlPVwiJytiYW5kSWQrJ1wiIC8+JytcbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYXBwbGljYXRpb25TdGF0dXNcIiB2YWx1ZT1cIicrYXBwbGljYXRpb25TdGF0dXMrJ1wiIC8+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9mb3JtPicrXG4gICAgJzwvZGl2PicrXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nKyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cInN1Ym1pdFwiIGZvcm09XCJhcHBseS1mb3JtXCI+JytcbiAgICAgICAgICAgICAgICAnU3VibWl0JytcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicrXG4gICAgICAgICc8L2Rpdj4nKyAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgJzwvZGl2PicpO1xufTtcblxuZnVuY3Rpb24gU2VhcmNoQmFuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gdW5kZWZpbmVkO1xufVxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc1ZpZXc7XG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgXG4gICAgLy8gVGhpcyB3aWxsIHJ1biBhIHNlYXJjaCBldmVyeSBzZWNvbmQgd2hlbiB0aGUgdXNlciBwcmVzc2VzIGEga2V5LiBcbiAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCAnLnNlYXJjaC1mb3JtIGlucHV0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC1mb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICBcbiAgICAgICAgcGFnZS5jdHJsLnNlYXJjaCh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KXsgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uYXBwbHktZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgICBcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTsgICBcbiAgICAgICAgcGFnZS5jdHJsLnN1Ym1pdEFwcGxpY2F0aW9uKHBhcnNlSW50KCQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1iYW5kLWlkJyksIDEwKSwgdGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy9oYW5kbGUgdGhlIGFwcGxpY2F0aW9uIHJlc3VsdFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbiAgICAvLyBUb2dnbGUgQmFuZCBNb2RhbFxuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYmFuZCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZS52aWV3LnNob3dCYW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIG1hbmFnZXIgYXBwbGljYXRpb24gcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlNYW5hZ2VyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdNYW5hZ2VyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUiwgYmFuZElkKTtcbiAgICB9KVxuXG4gICAgLy8gSGFuZGxlIG1lbWJlciBhcHBsaWNhdGlvbiByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseU1lbWJlcicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWVtYmVyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUVNQkVSLCBiYW5kSWQpO1xuICAgIH0pXG5cbiAgICAvLyBIYW5kbGUgcHJvbW90ZXIgYXBwbGljYXRpb24gcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlQcm9tb3RlcicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnUHJvbW90ZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9QUk9NT1RFUiwgYmFuZElkKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBhcHBsaWNhdGlvbiBjYW5jZWwgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmNhbmNlbEFwcGxpY2F0aW9uKGJhbmRJZClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgIFxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLypwYWdlRWxlbS5vbignaGlkZGVuLmJzLm1vZGFsJywgJyNtb2RhbDcnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHRoaXMudXBkYXRlQmFuZExpc3Q7XG4gICAgfSk7Ki9cbn07XG5cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUudXBkYXRlQmFuZExpc3QgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgYmFuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmRzJyk7XG4gICAgdmFyIGNhcmRDb2xvciA9ICcnO1xuICAgIHZhciBiYWRnZSA9ICcnO1xuXG4gICAgLy8gQ2xlYXIgYW55IGN1cnJlbnQgY2FyZHMgZnJvbSBwcmV2aW91cyBzZWFyY2hcbiAgICAkKCcuY2FyZCcpLnJlbW92ZSgpO1xuXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmJhbmRzLmxlbmd0aDsgaSsrICl7XG5cbiAgICAgICAgLy8gSWYgeW91IGhhdmUgYSByb2xlIHRoZW4geW91IGFyZSBpbiB0aGUgYmFuZCwgc28gbm8gbW9kYWwgYnV0dG9uc1xuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ucm9sZSAhPSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ucm9sZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gYXBwbGljYXRpb24gc3RhdHVzIGlmIHRoZXkgZG8gbm90IGhhdmUgYSByb2xlIGluIHRoZSBiYW5kXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWFuYWdlciknKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAocHJvbW90ZXIpJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ3JlamVjdGVkJykgeyBcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICAgICAgYmFkZ2UgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIGJhbmRcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnJytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtYmFuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uaWQrJ1wiID4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uZ2VucmUrJyk8L3NtYWxsPicrYmFkZ2UrXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+PHAvPicpO1xuICAgIH1cbn07XG5cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuc2hvd0JhbmRNb2RhbCA9IGZ1bmN0aW9uIChiYW5kSWQpe1xuICAgIHZhciB0aGlzQmFuZCA9IHRoaXMucGFnZS5jdHJsLmJhbmRzLmZpbHRlcihmdW5jdGlvbiAoYmFuZCl7XG4gICAgICAgIHJldHVybiBiYW5kLmlkID09IGJhbmRJZDtcbiAgICB9KVswXSxcbiAgICAgICAgbW9kYWxCdXR0b25zO1xuICAgIFxuICAgIGlmICh0aGlzQmFuZC5yb2xlICE9ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnJztcbiAgICB9XG4gICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWFuYWdlciknKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIE1hbmFnZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1lbWJlciknKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIE1lbWJlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAocHJvbW90ZXIpJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBQcm9tb3RlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzICE9PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BcHBseU1hbmFnZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWFuYWdlcjwvYnV0dG9uPicrIFxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5TWVtYmVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIE1lbWJlcjwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlQcm9tb3RlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBQcm9tb3RlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIFxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZC1tb2RhbCcpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnLHRoaXNCYW5kLmlkKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQmFuZC5iYW5kTmFtZSk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzQmFuZC5kZXNjcmlwdGlvbisnPC9wPicpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtZm9vdGVyJykuaHRtbCgnPGRpdiBjbGFzcz1cImR5bmFtaWMtYnV0dG9uc1wiPjwvZGl2PjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiXX0=
