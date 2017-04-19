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
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];

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
        that.bandMemberRole = data.role;
        defer.resolve();
    }).catch(function (err){
        that.bandMemberRole = undefined;
        defer.resolve();
    });  
    
    return defer.promise();
};

ApplicationsCtrl.prototype.processApplication = function (applicationId, processStatus, applicationStatus) {
    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];

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
        var applicationId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-id'),10);
        var applicationStatus = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-status'),10);
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
        var applicationId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-id'),10);
        var applicationStatus = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-application-status'),10);
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

        window.location = '/bands/'+id+'/applications';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJub3RpZmljYXRpb24uanMiLCJzZWFyY2hlZEJhbmQuanMiLCJzaW1wbGVCYW5kLmpzIiwiYXBwLmpzIiwicGFnZS5qcyIsIm1lbnUuanMiLCJhZGRGcmllbmQuanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBVnBLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBV2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEFwcGxpY2F0aW9uKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy51c2VybmFtZSA9IGpzb24udXNlcm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcclxuICAgIHRoaXMubWVzc2FnZSA9IGpzb24ubWVzc2FnZSB8fCAnJztcclxufVxyXG5cclxuQXBwbGljYXRpb24uU1RBVFVTID0ge1xyXG5cdE5PTkU6IDAsIFxyXG4gICAgQVBQTElFRF9NQU5BR0VSOiAxLFxyXG4gICAgQVBQTElFRF9NRU1CRVI6IDIsXHJcbiAgICBBUFBMSUVEX1BST01PVEVSOiAzLFxyXG5cdEFDQ0VQVEVEOiA0LCBcclxuXHRSRUpFQ1RFRDogNSxcclxuICAgIEJMT0NLRUQ6IDZcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IH0iLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBCYW5kUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2JhbmRQYWdlJylbMF0sIEJhbmRDdHJsLCBCYW5kVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuQmFuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkJhbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRQYWdlO1xyXG5cclxuZnVuY3Rpb24gQmFuZEN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5iYW5kID0ge307XHJcbn1cclxuQmFuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5CYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kQ3RybDtcclxuQmFuZEN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICB2YXIgaWQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcblxyXG4gICAvLyB2YXIgaWQgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKTtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuYWpheCgnL2FwaS9iYW5kcy9iYW5kLycgKyBpZCwge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuYmFuZCA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgdGhhdC5iYW5kID0ge307XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBCYW5kVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuQmFuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5CYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kVmlldztcclxuQmFuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBiYW5kRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kJyk7XHJcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxoMiBjbGFzcz1cImNhcmQtdGl0bGVcIj5NeSBCYW5kPC9oMj4nKTtcclxuICAgIGJhbmRFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj48L2Rpdj4nKTtcclxuICAgIGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJykuYXBwZW5kKCc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5CYW5kIE5hbWU8L3N0cm9uZz46ICcrdGhpcy5wYWdlLmN0cmwuYmFuZFswXS5iYW5kTmFtZSsnPC9wPicpO1xyXG4gICAgYmFuZEVsZW0uZmluZCgnLmNhcmQtYmxvY2snKS5hcHBlbmQoJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPk93bmVyPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRbMF0ub3duZXJOYW1lKyc8L3A+Jyk7XHJcbiAgICBiYW5kRWxlbS5maW5kKCcuY2FyZC1ibG9jaycpLmFwcGVuZCgnPHAgY2xhc3M9XCJpbmZvIGNhcmQtdGV4dFwiPjxzdHJvbmc+RGVzY3JpcHRpb248L3N0cm9uZz46ICcrdGhpcy5wYWdlLmN0cmwuYmFuZFswXS5kZXNjcmlwdGlvbisnPC9wPicpO1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5CYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XHJcblxyXG4gICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb25zJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgICAgdmFyIGlkID0gdXJsLnN1YnN0cmluZyh1cmwubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG5cclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzLycraWQrJy9hcHBsaWNhdGlvbnMnO1xyXG4gICAgfSk7XHJcbn07IiwiZnVuY3Rpb24gQmFuZE1lbWJlcihqc29uKXtcclxuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5iYW5kSWQgPSBqc29uLmJhbmRJZCB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnVzZXJuYW1lID0ganNvbi51c2VybmFtZSB8fCAnJztcclxuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcclxuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcclxuICAgIHRoaXMucm9sZSA9IGpzb24ucm9sZSB8fCAnJztcclxufVxyXG5cclxuQmFuZE1lbWJlci5ST0xFID0ge1xyXG4gICAgTk9ORTogLTEsXHJcbiAgICBPV05FUiA6IDAsXHJcbiAgICBNQU5BR0VSOiAxLFxyXG4gICAgTUVNQkVSIDogMixcclxuICAgIFBST01PVEVSIDogM1xyXG59XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBCYW5kTWVtYmVyOyB9IiwiZnVuY3Rpb24gRnJpZW5kKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMudXNlck5hbWUgPSBqc29uLnVzZXJOYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5iaW8gPSBqc29uLmJpbyB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8ICcnO1xyXG59XHJcblxyXG5GcmllbmQuU1RBVFVTID0ge1xyXG5cdE5PTkU6IDAsIFxyXG5cdEZSSUVORDogMSwgXHJcblx0UkVRVUVTVEVEOiAyLCBcclxuXHRQRU5ESU5HOiAzLCBcclxuXHRCTE9DS0VEOiA0IFxyXG59XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBGcmllbmQ7IH0iLCJmdW5jdGlvbiBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uSWQsIHVzZXJJZCwgdHlwZSwgbWVzc2FnZSwgbGluaywgdW5yZWFkKXtcclxuICAgIHRoaXMubm90aWZpY2F0aW9uSWQgPSBub3RpZmljYXRpb25JZDtcclxuICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmxpbmsgPSBsaW5rO1xyXG4gICAgdGhpcy51bnJlYWQgPSB1bnJlYWQ7XHJcbn1cclxuTm90aWZpY2F0aW9uLlRZUEUgPSB7XHJcbiAgICBOT19NRVNTQUdFOiAwLFxyXG4gICAgRlJJRU5EX1JFUVVFU1Q6IDEsXHJcbiAgICBGUklFTkRfQUNDRVBURUQ6IDIsXHJcbiAgICBCQU5EX0lOVklURTogMyxcclxuICAgIFJFTU9WRURfRlJPTV9CQU5EOiA0LFxyXG4gICAgRVZFTlRfSU5WSVRFOiA1LFxyXG4gICAgRVZFTlRfUkVNSU5ERVI6IDYsXHJcbiAgICBFUlJPUjogNyxcclxuICAgIFNVQ0NFU1M6IDgsXHJcbiAgICBXQVJOSU5HOiA5XHJcbn07XHJcbk5vdGlmaWNhdGlvbi5mcm9tT2JqID0gZnVuY3Rpb24gKG9iail7XHJcbiAgICB2YXIgbXlOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCk7XHJcbiAgICBteU5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25JZCA9IG9iai5ub3RpZmljYXRpb25JZCB8fCBvYmouTm90aWZpY2F0aW9uSWQgfHwgLTE7XHJcbiAgICBteU5vdGlmaWNhdGlvbi51c2VySWQgPSBvYmoudXNlcklkIHx8IG9iai5Vc2VySWQgfHwgLTE7XHJcbiAgICBteU5vdGlmaWNhdGlvbi50eXBlID0gb2JqLnR5cGUgfHwgb2JqLlR5cGUgfHwgTm90aWZpY2F0aW9uLlRZUEUuTk9fTUVTU0FHRTtcclxuICAgIG15Tm90aWZpY2F0aW9uLm1lc3NhZ2UgPSBvYmoubWVzc2FnZSB8fCBvYmouTWVzc2FnZSB8fCAnJztcclxuICAgIG15Tm90aWZpY2F0aW9uLmxpbmsgPSBvYmoubGluayB8fCBvYmouTGluayB8fCAnIyc7XHJcbiAgICBteU5vdGlmaWNhdGlvbi51bnJlYWQgPSBvYmoudW5yZWFkIHx8IG9iai5VbnJlYWQgfHwgdHJ1ZTtcclxuICAgIHJldHVybiBteU5vdGlmaWNhdGlvbjtcclxufTtcclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IE5vdGlmaWNhdGlvbjsgfVxyXG4iLCJmdW5jdGlvbiBTZWFyY2hlZEJhbmQoanNvbil7XHJcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xyXG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uU3RhdHVzID0ganNvbi5hcHBsaWNhdGlvblN0YXR1cyB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGpzb24uZGVzY3JpcHRpb24gfHwgJyc7XHJcbiAgICB0aGlzLmdlbnJlID0ganNvbi5nZW5yZSB8fCAnJztcclxufVxyXG5cclxuU2VhcmNoZWRCYW5kLlJPTEUgPSB7XHJcbiAgICBPV05FUjogMCxcclxuICAgIE1BTkFHRVI6IDEsXHJcbiAgICBNRU1CRVI6IDIsXHJcbiAgICBQUk9NT1RFUjogM1xyXG59XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hlZEJhbmQ7IH0iLCJmdW5jdGlvbiBTaW1wbGVCYW5kKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMub3duZXJOYW1lID0ganNvbi5vd25lck5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLm93bmVySWQgPSBqc29uLm93bmVySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XHJcbn1cclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUJhbmQ7IH0iLCIvKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gQXBwKCl7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgLy90aGlzLnBhZ2VIaXN0b3J5ID0gW107XHJcbn1cclxuQXBwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKFBhZ2VDb25zdHJ1Y3Rvcil7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IFBhZ2VDb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcclxufTtcclxuLypBcHAucHJvdG90eXBlLmNoYW5nZVBhZ2UgPSBmdW5jdGlvbiAocGFnZSwgZGF0YSl7XHJcbiAgICBpZiggdGhpcy5jdXJyZW50UGFnZSApe1xyXG4gICAgICAgIC8vc3RvcmUgdGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgbGFzdCBwYWdlXHJcbiAgICAgICAgdGhpcy5wYWdlSGlzdG9yeS5wdXNoKHRoaXMuY3VycmVudFBhZ2UuY29uc3RydWN0b3IpO1xyXG4gICAgICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICAvL2NyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbmV4dCBwYWdlXHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IHBhZ2UodGhpcyk7XHJcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XHJcbn07Ki8iLCIvKiBnbG9iYWwgJCAqL1xyXG4vKiogSW5oZXJpdGFibGUgQ2xhc3NlcyAqKi9cclxuZnVuY3Rpb24gUGFnZShhcHAsIGVsZW0sIGN0cmxDb25zdHJ1Y3Rvciwgdmlld0NvbnN0cnVjdG9yLCBjaGlsZENvbXBvbmVudHMpe1xyXG4gICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5jdHJsID0gbmV3IGN0cmxDb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHRoaXMudmlldyA9IG5ldyB2aWV3Q29uc3RydWN0b3IodGhpcyk7XHJcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50cyA9IGNoaWxkQ29tcG9uZW50cyB8fCB7fTtcclxufVxyXG5QYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBcclxuICAgIGZvciggdmFyIGNvbXBvbmVudCBpbiB0aGlzLmNoaWxkQ29tcG9uZW50cyApe1xyXG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRzW2NvbXBvbmVudF0uaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmN0cmwuaW5pdCgpXHJcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICB0aGF0LnZpZXcuaW5pdC5hcHBseSh0aGF0LnZpZXcsIGFyZ3VtZW50cyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFBhZ2VDdHJsKHBhZ2Upe1xyXG4gICAgdGhpcy5wYWdlID0gcGFnZTtcclxufVxyXG5QYWdlQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gUGFnZVZpZXcocGFnZSl7XHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG59XHJcblBhZ2VWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7fTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBNZW51Q29tcG9uZW50KGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKGRhdGEuZWxlbWVudClbMF0sIE1lbnVDdHJsLCBNZW51Vmlldyk7XHJcbn1cclxuTWVudUNvbXBvbmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuTWVudUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q29tcG9uZW50O1xyXG5cclxuZnVuY3Rpb24gTWVudUN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk1lbnVDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuTWVudUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudUN0cmw7XHJcbk1lbnVDdHJsLnByb3RvdHlwZS5sb2dvdXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICB1cmw6ICcvYXBpL2xvZ291dCdcclxuICAgIH0pLnRoZW4oZGVmZXIucmVzb2x2ZSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIE1lbnVWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5NZW51Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVWaWV3O1xyXG5NZW51Vmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyID0gJCh0aGlzLnBhZ2UuZWxlbSk7XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyID0gJCgnI21lbnVPdmVybGF5Jyk7XHJcbiAgICB0aGlzLnJlbmRlck1lbnUoKTtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5NZW51Vmlldy5wcm90b3R5cGUucmVuZGVyTWVudSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgXHJcbiAgICAvKiByZW5kZXIgb3ZlcmxheSAqL1xyXG4gICAgaWYoIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIubGVuZ3RoID09IDAgKXtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwibWVudU92ZXJsYXlcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PicpO1xyXG4gICAgICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIgPSAkKFwiI21lbnVPdmVybGF5XCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51XCI+PC9kaXY+Jyk7XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudVNlY3Rpb25cIj4nXHJcbiAgICAgICAgKyc8ZGl2IGNsYXNzPVwiYWN0aW9uIGxvZ291dCBidG4gYnRuLXNlY29uZGFyeVwiPkxvZ291dDwvZGl2PidcclxuICAgICsnPC9kaXY+Jyk7XHJcbiAgICBcclxuICAgIC8qIHJlbmRlciBtZW51IGJ1dHRvbiAqL1xyXG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLm1lbnVCdXR0b25Db250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudS10b2dnbGUgYnRuIGJ0bi1zZWNvbmRhcnkgZmEgZmEtYmFyc1wiPjwvZGl2PicpO1xyXG59O1xyXG5NZW51Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICAgICAgdmlldyA9IHRoaXM7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcubWVudS10b2dnbGUnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdmlldy52aXNpYmxlID0gIXZpZXcudmlzaWJsZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiggdmlldy52aXNpYmxlICl7XHJcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUgLmxvZ291dCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2aWV3LnBhZ2UuY3RybC5sb2dvdXQoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2xvZ2luJztcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgJy5tZW51JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZpZXcudmlzaWJsZSA9ICF2aWV3LnZpc2libGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xyXG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG4vKiBnbG9iYWwgRnJpZW5kICovXHJcblxyXG5mdW5jdGlvbiBBZGRGcmllbmRQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkRnJpZW5kUGFnZScpWzBdLCBBZGRGcmllbmRDdHJsLCBBZGRGcmllbmRWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZEZyaWVuZFBhZ2U7XHJcblxyXG5mdW5jdGlvbiBBZGRGcmllbmRDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuZnJpZW5kcyA9IFtdO1xyXG59XHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZEZyaWVuZEN0cmw7XHJcblxyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGF0LmZyaWVuZHMgPSBbXTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3NlYXJjaCcsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XHJcbiAgICAgICAgdGhhdC5wYWdlLnZpZXcudXBkYXRlVXNlckxpc3QoKTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSByZWxhdGlvbiBiZXR3ZWVuIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoZSBcInRvXCIgdXNlclxyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7dG9Vc2VySWQgOiB0b1VzZXJJZCwgc3RhdHVzIDogc3RhdHVzfVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEFkZEZyaWVuZFZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZEZyaWVuZFZpZXc7XHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgdGhpcy5zZWFyY2hUaW1lb3V0O1xyXG59O1xyXG5cclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgXHJcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXByZXNzJywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdmFyIHRoaXNGb3JtID0gJCh0aGlzKTtcclxuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgIHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXNGb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uc2VhcmNoLXVzZXInLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnNlYXJjaCh0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9IYW5kbGUgUmVzdWx0XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwxMCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGZyaWVuZCByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7ICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGJsb2NrIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5CTE9DS0VEKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgdW5ibG9jayByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuYmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgY2FuY2VsIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkZSSUVORClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGZyaWVuZCByZWplY3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIHVuZnJpZW5kXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS51cGRhdGVVc2VyTGlzdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcclxuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcclxuICAgIHZhciBiYWRnZSA9ICcnO1xyXG5cclxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXHJcbiAgICAkKCcuY2FyZCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIHN0YXR1c1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWludmVyc2UnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmcmllbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1mcmllbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uaWQrJ1wiPicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICc8L2g0PicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5zaG93RnJpZW5kTW9kYWwgPSBmdW5jdGlvbiAoZnJpZW5kSWQpe1xyXG4gICAgdmFyIHRoaXNGcmllbmQgPSB0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmZpbHRlcihmdW5jdGlvbiAoZnJpZW5kKXtcclxuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xyXG4gICAgfSlbMF0sXHJcbiAgICAgICAgbW9kYWxCdXR0b25zO1xyXG4gICAgICAgIFxyXG4gICAgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnZnJpZW5kJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blVuZnJpZW5kTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5BY2NlcHRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuUmVqZWN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuVW5ibG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5SZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBmcmllbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmQtbW9kYWwnKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyx0aGlzRnJpZW5kLmlkKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0ZyaWVuZC5uYW1lKyc8L3A+PHA+Jyt0aGlzRnJpZW5kLmJpbysnPC9wPicpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb25zUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FwcGxpY2F0aW9uc1BhZ2UnKVswXSwgQXBwbGljYXRpb25zQ3RybCwgQXBwbGljYXRpb25zVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNQYWdlO1xyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb25zQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9ucyA9IFtdO1xyXG4gICAgdGhpcy5iYW5kTWVtYmVyUm9sZSA9IHVuZGVmaW5lZDtcclxufVxyXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNDdHJsO1xyXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9hcHBsaWNhdGlvbnMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBkYXRhO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIHRoYXQuYXBwbGljYXRpb25zID0gW107XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9yb2xlJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuYmFuZE1lbWJlclJvbGUgPSBkYXRhLnJvbGU7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgdGhhdC5iYW5kTWVtYmVyUm9sZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KTsgIFxyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuQXBwbGljYXRpb25zQ3RybC5wcm90b3R5cGUucHJvY2Vzc0FwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIHByb2Nlc3NTdGF0dXMsIGFwcGxpY2F0aW9uU3RhdHVzKSB7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycraWQrJy9wcm9jZXNzYXBwbGljYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7YXBwbGljYXRpb25JZCA6IGFwcGxpY2F0aW9uSWQsIHByb2Nlc3NTdGF0dXMgOiBwcm9jZXNzU3RhdHVzLCBhcHBsaWNhdGlvblN0YXR1cyA6IGFwcGxpY2F0aW9uU3RhdHVzfVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1ZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFwcGxpY2F0aW9uc1ZpZXc7XHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBhcHBsaWNhdGlvbnNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9ucycpO1xyXG4gICAgdmFyIGJhZGdlID0gJyc7XHJcblxyXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NQU5BR0VSKSB7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5NYW5hZ2VyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUVNQkVSKSB7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5NZW1iZXInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9QUk9NT1RFUikge1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+UHJvbW90ZXInO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXBwbGljYXRpb25zRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJhcHBsaWNhdGlvbiBidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtYXBwbGljYXRpb24taWQ9XCInK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5pZCsnXCIgZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXM9XCInK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMrJ1wiPicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnVzZXJuYW1lKycgPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyc8L2Rpdj48cC8+Jyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb24nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgcGFnZS52aWV3LnNob3dBcHBsaWNhdGlvbk1vZGFsKHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwxMCkscGFyc2VJbnQoJChlLnRhcmdldCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwxMCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGZyaWVuZCBhY2NlcHRcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQWNjZXB0JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcpLDEwKTtcclxuICAgICAgICB2YXIgYXBwbGljYXRpb25TdGF0dXMgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLDEwKTtcclxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5BQ0NFUFRFRCwgYXBwbGljYXRpb25TdGF0dXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyBcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blJlamVjdCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgYXBwbGljYXRpb25JZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwxMCk7XHJcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwxMCk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnByb2Nlc3NBcHBsaWNhdGlvbihhcHBsaWNhdGlvbklkLCBBcHBsaWNhdGlvbi5TVEFUVVMuUkVKRUNURUQsIGFwcGxpY2F0aW9uU3RhdHVzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufTtcclxuXHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcclxuICAgIHZhciB0aGlzQXBwbGljYXRpb24gPSB0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhcHBsaWNhdGlvbil7XHJcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uLmlkID09IGFwcGxpY2F0aW9uSWQ7XHJcbiAgICB9KVswXTtcclxuICAgIFxyXG4gICAgdmFyIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk9XTkVSIHx8IHRoaXMucGFnZS5jdHJsLmJhbmRNZW1iZXJSb2xlID09PSBCYW5kTWVtYmVyLlJPTEUuTUFOQUdFUikge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICAnPGJ1dHRvbiBpZD1cImJ0bkFjY2VwdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+J1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhcHBsaWNhdGlvbk1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9uLW1vZGFsJyk7XHJcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnLHRoaXNBcHBsaWNhdGlvbi5pZCk7XHJcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyx0aGlzQXBwbGljYXRpb24uc3RhdHVzKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQXBwbGljYXRpb24ubmFtZSsnIC0gJyt0aGlzQXBwbGljYXRpb24udXNlcm5hbWUpO1xyXG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPkluc3RydW1lbnQ6ICcrdGhpc0FwcGxpY2F0aW9uLmluc3RydW1lbnQrJzwvcD48cD5NZXNzYWdlOiAnK3RoaXNBcHBsaWNhdGlvbi5tZXNzYWdlKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kc1BhZ2UnKVswXSwgQmFuZHNDdHJsLCBCYW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRzQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmJhbmRzID0gW107XHJcbn1cclxuQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5iYW5kcyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgdGhhdC5iYW5kcyA9IFtdO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNWaWV3O1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJiYW5kIGJ0biBidG4tc2Vjb25kYXJ5XCIgaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvcmVnaXN0ZXInO1xyXG4gICAgfSk7XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy8nICsgZS50YXJnZXQuaWQ7XHJcbiAgICB9KVxyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cclxuLyogZ2xvYmFsIEZyaWVuZCAqL1xyXG5cclxuZnVuY3Rpb24gRnJpZW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNmcmllbmRzUGFnZScpWzBdLCBGcmllbmRzQ3RybCwgRnJpZW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkZyaWVuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5GcmllbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEZyaWVuZHNDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuZnJpZW5kcyA9IFtdO1xyXG59XHJcbkZyaWVuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuRnJpZW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc0N0cmw7XHJcbkZyaWVuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGF0LmZyaWVuZHMgPSBbXTtcclxuICAgICQuYWpheCgnL2FwaS9mcmllbmRzJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuRnJpZW5kc0N0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gRnJpZW5kc1ZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc1ZpZXc7XHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIHRoaXMudXBkYXRlVXNlckxpc3QoKTtcclxufTtcclxuXHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYWRkLWZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHBhZ2Uudmlldy5zaG93RnJpZW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpLDEwKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICBcclxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5CbG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLlBFTkRJTkcpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7ICBcclxuICAgICAgICB9KS5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxyXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkNhbmNlbFJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXHJcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQWNjZXB0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuRlJJRU5EKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAgXHJcbiAgICAgICAgfSkuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxyXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgIFxyXG4gICAgICAgIH0pLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTsgICAgICAgIFxyXG59O1xyXG5cclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZnJpZW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kcycpO1xyXG4gICAgdmFyIGNhcmRDb2xvciA9ICcnO1xyXG4gICAgdmFyIGJhZGdlID0gJyc7XHJcblxyXG4gICAgLy8gQ2xlYXIgYW55IGN1cnJlbnQgY2FyZHMgZnJvbSBwcmV2aW91cyBzZWFyY2hcclxuICAgIGZyaWVuZHNFbGVtLmZpbmQoJy5jYXJkJykucmVtb3ZlKCk7XHJcblxyXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmZyaWVuZHMubGVuZ3RoOyBpKysgKXtcclxuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnZnJpZW5kJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1zdWNjZXNzJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC13YXJuaW5nJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW52ZXJzZSc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxyXG4gICAgICAgIGZyaWVuZHNFbGVtLmFwcGVuZCgnJytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImZyaWVuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWZyaWVuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCI+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcclxuICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnVzZXJOYW1lK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcclxuICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcclxuICAgIH1cclxufTtcclxuXHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5zaG93RnJpZW5kTW9kYWwgPSBmdW5jdGlvbiAoZnJpZW5kSWQpe1xyXG4gICAgdmFyIHRoaXNGcmllbmQgPSB0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmZpbHRlcihmdW5jdGlvbiAoZnJpZW5kKXtcclxuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xyXG4gICAgfSlbMF0sXHJcbiAgICAgICAgbW9kYWxCdXR0b25zO1xyXG4gICAgICAgIFxyXG4gICAgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnZnJpZW5kJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blVuZnJpZW5kTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5BY2NlcHRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuUmVqZWN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuVW5ibG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5SZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBmcmllbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmQtbW9kYWwnKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyx0aGlzRnJpZW5kLmlkKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0ZyaWVuZC5uYW1lKyc8L3A+PHA+Jyt0aGlzRnJpZW5kLmJpbysnPC9wPicpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuLyoqXHJcbiAqIFBBR0VcclxuICogKi9cclxuZnVuY3Rpb24gTG9naW5QYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbG9naW5QYWdlJylbMF0sIExvZ2luQ3RybCwgTG9naW5WaWV3KTtcclxufVxyXG5Mb2dpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkxvZ2luUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpblBhZ2U7XHJcblxyXG4vKipcclxuICogQ09OVFJPTExFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBMb2dpbkN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5sb2dnaW5nSW4gPSBmYWxzZTtcclxufVxyXG5Mb2dpbkN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5Mb2dpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5DdHJsO1xyXG5cclxuTG9naW5DdHJsLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9sb2dpbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZWplY3QoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWSUVXRVJcclxuICogKi9cclxuZnVuY3Rpb24gTG9naW5WaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5Mb2dpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5Mb2dpblZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5WaWV3O1xyXG5Mb2dpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuTG9naW5WaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmKCBwYWdlLmN0cmwubG9nZ2luZ0luICl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXHJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcclxuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXHJcbiAgICAgICAgcGFnZS5jdHJsLmxvZ2luKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbWFpbic7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkxvZ2luIEZhaWxlZCE8L3N0cm9uZz4gVXNlcm5hbWUgb3IgcGFzc3dvcmQgd2FzIGluY29ycmVjdC4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBNYWluUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI21haW5QYWdlJylbMF0sIE1haW5DdHJsLCBNYWluVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuTWFpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbk1haW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5QYWdlO1xyXG5cclxuZnVuY3Rpb24gTWFpbkN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk1haW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuTWFpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpbkN0cmw7XHJcblxyXG5mdW5jdGlvbiBNYWluVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTWFpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5NYWluVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluVmlldztcclxuTWFpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuYmFuZHMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XHJcbiAgICB9KTtcclxuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmZyaWVuZHMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzJztcclxuICAgIH0pO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuYWRkLWZyaWVuZHMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XHJcbiAgICB9KTtcclxuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLnNlYXJjaC1iYW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3NlYXJjaCc7XHJcbiAgICB9KTtcclxuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLm5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9ub3RpZmljYXRpb25zJztcclxuICAgIH0pO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cclxuLyogZ2xvYmFsIE5vdGlmaWNhdGlvbiAqL1xyXG5cclxuLyoqXHJcbiAqIFBBR0VcclxuICogKi9cclxuZnVuY3Rpb24gTm90aWZpY2F0aW9uc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNub3RpZmljYXRpb25zUGFnZScpWzBdLCBOb3RpZmljYXRpb25zQ3RybCwgTm90aWZpY2F0aW9uc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbk5vdGlmaWNhdGlvbnNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5Ob3RpZmljYXRpb25zUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zUGFnZTtcclxuXHJcbi8qKlxyXG4gKiBDT05UUk9MTEVSXHJcbiAqICovXHJcbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xyXG59XHJcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc0N0cmw7XHJcblxyXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGN0cmwgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgIGN0cmwuZ2V0Tm90aWZpY2F0aW9ucygpLnRoZW4ocmVzb2x2ZSkuY2F0Y2gocmVqZWN0KTtcclxuICAgIH0pO1xyXG59O1xyXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuZ2V0Tm90aWZpY2F0aW9ucyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGN0cmwgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgIC8vZ2V0IG5vdGlmaWNhdGlvbnNcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL25vdGlmaWNhdGlvbnMnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgICAgIGN0cmwubm90aWZpY2F0aW9ucyA9IGRhdGEubWFwKGZ1bmN0aW9uIChpdGVtKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOb3RpZmljYXRpb24uZnJvbU9iaihpdGVtKTtcclxuICAgICAgICAgICAgfSkgfHwgW107XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmRlbGV0ZU5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uICgpe1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZJRVdFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zVmlldztcclxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxufTtcclxuXHJcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2Nsb3NlLmJzLmFsZXJ0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvL2RlbGV0ZSBub3RpZmljYXRpb24gb24gdGhlIHNlcnZlclxyXG4gICAgICAgIHBhZ2UuY3RybC5kZWxldGVOb3RpZmljYXRpb24oJCh0aGlzKS5hdHRyKCdkYXRhLW5vdGlmaWNhdGlvbi1pZCcpKVxyXG4gICAgICAgIC50aGVuKHBhZ2UuY3RybC5nZXROb3RpZmljYXRpb25zKVxyXG4gICAgICAgIC50aGVuKHBhZ2Uudmlldy5yZW5kZXIpXHJcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBhbGVydChlcnIuc3RhY2spO1xyXG4gICAgICAgICAgICBwYWdlLmN0cmwuZ2V0Tm90aWZpY2F0aW9ucygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgbm90aWZpY2F0aW9uRWxlbSA9ICQoJyNub3RpZmljYXRpb25zUGFnZScpLmZpbmQoJy5ub3RpZmljYXRpb25zJykuZW1wdHkoKTtcclxuICAgIHRoaXMucGFnZS5jdHJsLm5vdGlmaWNhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobm90aWZpY2F0aW9uKXtcclxuICAgICAgICB2YXIgYWxlcnRUeXBlO1xyXG4gICAgICAgIHN3aXRjaChub3RpZmljYXRpb24udHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuU1VDQ0VTUzpcclxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5GUklFTkRfQUNDRVBURUQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtc3VjY2Vzcyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLldBUk5JTkc6XHJcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuUkVNT1ZFRF9GUk9NX0JBTkQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtd2FybmluZyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkVSUk9SOlxyXG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LWRhbmdlcic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LWluZm8nO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbm90aWZpY2F0aW9uRWxlbS5hcHBlbmQoJycrXHJcbiAgICAgICAgJzxhIGhyZWY9XCInK25vdGlmaWNhdGlvbi5saW5rKydcIiBjbGFzcz1cIm5vdGlmaWNhdGlvbiBhbGVydCBhbGVydC1kaXNtaXNzYWJsZSAnK2FsZXJ0VHlwZSsnXCIgZGF0YS1ub3RpZmljYXRpb24taWQ9XCInK25vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25JZCsnXCI+JytcclxuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPicrXHJcbiAgICAgICAgICAgICAgICAnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAnPC9idXR0b24+JytcclxuICAgICAgICAgICAgbm90aWZpY2F0aW9uLm1lc3NhZ2UrXHJcbiAgICAgICAgJzwvYT4nKTtcclxuICAgIH0pO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbi8qKlxyXG4gKiBQQUdFXHJcbiAqICovXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyUGFnZScpWzBdLCBSZWdpc3RlckN0cmwsIFJlZ2lzdGVyVmlldyk7XHJcbn1cclxuUmVnaXN0ZXJQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5SZWdpc3RlclBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJQYWdlO1xyXG5cclxuLyoqXHJcbiAqIENPTlRST0xMRVJcclxuICogKi9cclxuZnVuY3Rpb24gUmVnaXN0ZXJDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcclxufVxyXG5SZWdpc3RlckN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5SZWdpc3RlckN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJDdHJsO1xyXG5cclxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9yZWdpc3RlcicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZWplY3QoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWSUVXRVJcclxuICogKi9cclxuZnVuY3Rpb24gUmVnaXN0ZXJWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJWaWV3O1xyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXHJcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxyXG4gICAgICAgIHBhZ2UuY3RybC5yZWdpc3Rlcih0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlJlZ2lzdHJhdGlvbiBTdWNjZXNzZnVsITwvc3Ryb25nPiBSZWRpcmVjdGluZyBpbiAyIHNlY29uZHMuLi4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKVxyXG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyQmFuZFBhZ2UnKVswXSwgUmVnaXN0ZXJCYW5kQ3RybCwgUmVnaXN0ZXJCYW5kVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRQYWdlO1xyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XHJcbn1cclxuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kQ3RybDtcclxuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvcmVnaXN0ZXInLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRWaWV3O1xyXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlLFxyXG4gICAgICAgIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBpZiggcGFnZS5jdHJsLnJlZ2lzdGVyaW5nICl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xyXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXHJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cclxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IHJlZ2lzdGVyIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXHJcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXHJcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xyXG4gICAgICAgICAgICArJzwvZGl2PicpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtdGltZXMnKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkJhbmQgUmVnaXN0cmF0aW9uIEZhaWxlZCE8L3N0cm9uZz4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbnZhciBzZWFyY2hpbmcgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIFNlYXJjaEJhbmRzUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3NlYXJjaEJhbmRzUGFnZScpWzBdLCBTZWFyY2hCYW5kc0N0cmwsIFNlYXJjaEJhbmRzVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5TZWFyY2hCYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNQYWdlO1xyXG5cclxuZnVuY3Rpb24gU2VhcmNoQmFuZHNDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuYmFuZHMgPSBbXTtcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gZmFsc2U7XHJcbn1cclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzQ3RybDtcclxuXHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgdGhhdC5iYW5kcyA9IFtdO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3NlYXJjaCcsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xyXG4gICAgICAgIHRoYXQucGFnZS52aWV3LnVwZGF0ZUJhbmRMaXN0KCk7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vLyBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgcmVsYXRpb24gdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGUgc2VsZWN0ZWQgYmFuZFxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnN1Ym1pdEFwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGJhbmRJZCwgZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogYC9hcGkvYmFuZHMvJHtiYW5kSWR9L3N1Ym1pdEFwcGxpY2F0aW9uYCxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7IFxyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLy8gVGhpcyBtZXRob2Qgd2lsbCBkZWxldGUgdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGlzIGJhbmRcclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jYW5jZWxBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChiYW5kSWQpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL2NhbmNlbEFwcGxpY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge2JhbmRJZCA6IGJhbmRJZH1cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmV4cGFuZEJhbmRNb2RhbCA9IGZ1bmN0aW9uKGFwcGxpY2F0aW9uVHlwZSwgYXBwbGljYXRpb25TdGF0dXMsIGJhbmRJZCkge1xyXG4gICAgJCgnLm1vZGFsLWJvZHknKS5yZW1vdmUoKTtcclxuICAgICQoJy5tb2RhbC1mb290ZXInKS5yZW1vdmUoKTsgICAgXHJcblxyXG4gICAgdmFyIGJhbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5tb2RhbC1jb250ZW50Jyk7XHJcbiAgICB2YXIgYmFuZE5hbWUgPSBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCgpO1xyXG4gICAgdmFyIGluc3RydW1lbnRGaWVsZCA9ICcnO1xyXG5cclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKGJhbmROYW1lKyc8YnIvPicrYXBwbGljYXRpb25UeXBlKycgQXBwbGljYXRpb24nKTtcclxuXHJcbiAgICBpZiAoYXBwbGljYXRpb25UeXBlID09PSAnTWVtYmVyJykge1xyXG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJpbnN0cnVtZW50XCIgcGxhY2Vob2xkZXI9XCJJbnN0cnVtZW50XCIgLz48cC8+JztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnN0cnVtZW50XCIgdmFsdWU9XCJOL0FcIi8+PHAvPic7ICBcclxuICAgIH1cclxuXHJcbiAgICBiYW5kTW9kYWwuYXBwZW5kKCcnK1xyXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+JytcclxuICAgICAgICAnPGZvcm0gaWQ9XCJhcHBseS1mb3JtXCIgY2xhc3M9XCJhcHBseS1mb3JtXCIgb25zdWJtaXQ9XCJyZXR1cm5cIj4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1bWVudEZpZWxkK1xyXG4gICAgICAgICAgICAgICAgJzxpbnB1dCByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm1lc3NhZ2VcIiBwbGFjZWhvbGRlcj1cIk1lc3NhZ2VcIiAvPicrXHJcbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYmFuZElkXCIgdmFsdWU9XCInK2JhbmRJZCsnXCIgLz4nK1xyXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImFwcGxpY2F0aW9uU3RhdHVzXCIgdmFsdWU9XCInK2FwcGxpY2F0aW9uU3RhdHVzKydcIiAvPicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Zvcm0+JytcclxuICAgICc8L2Rpdj4nK1xyXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nKyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgZm9ybT1cImFwcGx5LWZvcm1cIj4nK1xyXG4gICAgICAgICAgICAgICAgJ1N1Ym1pdCcrXHJcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+JytcclxuICAgICAgICAnPC9kaXY+JysgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgJzwvZGl2PicpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gU2VhcmNoQmFuZHNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHVuZGVmaW5lZDtcclxufVxyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNWaWV3O1xyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICBcclxuICAgIC8vIFRoaXMgd2lsbCBydW4gYSBzZWFyY2ggZXZlcnkgc2Vjb25kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleS4gXHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCAnLnNlYXJjaC1mb3JtIGlucHV0JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZhciB0aGlzRm9ybSA9ICQodGhpcyk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0KTtcclxuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzRm9ybS5zdWJtaXQoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3VibWl0dGluZyB0aGUgc2VhcmNoIHN0cmluZ1xyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC1mb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgXHJcbiAgICAgICAgcGFnZS5jdHJsLnNlYXJjaCh0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpeyAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uYXBwbHktZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICAgXHJcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTsgICBcclxuICAgICAgICBwYWdlLmN0cmwuc3VibWl0QXBwbGljYXRpb24ocGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwgMTApLCB0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAvL2hhbmRsZSB0aGUgYXBwbGljYXRpb24gcmVzdWx0XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgLy8gVG9nZ2xlIEJhbmQgTW9kYWxcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5iYW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHBhZ2Uudmlldy5zaG93QmFuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyksMTApKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBtYW5hZ2VyIGFwcGxpY2F0aW9uIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlNYW5hZ2VyJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxyXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ01hbmFnZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NQU5BR0VSLCBiYW5kSWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgbWVtYmVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlNZW1iZXInLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXHJcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWVtYmVyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUVNQkVSLCBiYW5kSWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgcHJvbW90ZXIgYXBwbGljYXRpb24gcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseVByb21vdGVyJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxyXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ1Byb21vdGVyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIsIGJhbmRJZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgYXBwbGljYXRpb24gY2FuY2VsIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcclxuICAgICAgICBwYWdlLmN0cmwuY2FuY2VsQXBwbGljYXRpb24oYmFuZElkKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXHJcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qcGFnZUVsZW0ub24oJ2hpZGRlbi5icy5tb2RhbCcsICcjbW9kYWw3JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHRoaXMudXBkYXRlQmFuZExpc3Q7XHJcbiAgICB9KTsqL1xyXG59O1xyXG5cclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS51cGRhdGVCYW5kTGlzdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGJhbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kcycpO1xyXG4gICAgdmFyIGNhcmRDb2xvciA9ICcnO1xyXG4gICAgdmFyIGJhZGdlID0gJyc7XHJcblxyXG4gICAgLy8gQ2xlYXIgYW55IGN1cnJlbnQgY2FyZHMgZnJvbSBwcmV2aW91cyBzZWFyY2hcclxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XHJcblxyXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmJhbmRzLmxlbmd0aDsgaSsrICl7XHJcblxyXG4gICAgICAgIC8vIElmIHlvdSBoYXZlIGEgcm9sZSB0aGVuIHlvdSBhcmUgaW4gdGhlIGJhbmQsIHNvIG5vIG1vZGFsIGJ1dHRvbnNcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ucm9sZSAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLnJvbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBhcHBsaWNhdGlvbiBzdGF0dXMgaWYgdGhleSBkbyBub3QgaGF2ZSBhIHJvbGUgaW4gdGhlIGJhbmRcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1hbmFnZXIpJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1lbWJlciknKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAocHJvbW90ZXIpJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAncmVqZWN0ZWQnKSB7IFxyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIGJhbmRcclxuICAgICAgICBiYW5kc0VsZW0uYXBwZW5kKCcnK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYmFuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWJhbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmlkKydcIiA+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcclxuICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5iYW5kTmFtZStcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uZ2VucmUrJyk8L3NtYWxsPicrYmFkZ2UrXHJcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPC9kaXY+PHAvPicpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5zaG93QmFuZE1vZGFsID0gZnVuY3Rpb24gKGJhbmRJZCl7XHJcbiAgICB2YXIgdGhpc0JhbmQgPSB0aGlzLnBhZ2UuY3RybC5iYW5kcy5maWx0ZXIoZnVuY3Rpb24gKGJhbmQpe1xyXG4gICAgICAgIHJldHVybiBiYW5kLmlkID09IGJhbmRJZDtcclxuICAgIH0pWzBdLFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucztcclxuICAgIFxyXG4gICAgaWYgKHRoaXNCYW5kLnJvbGUgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XHJcbiAgICB9XHJcbiAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gYXBwbGljYXRpb24gc3RhdHVzIGlmIHRoZXkgZG8gbm90IGhhdmUgYSByb2xlIGluIHRoZSBiYW5kXHJcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1hbmFnZXIpJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIE1hbmFnZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIE1lbWJlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBQcm9tb3RlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyAhPT0gJ2Jsb2NrZWQnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BcHBseU1hbmFnZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWFuYWdlcjwvYnV0dG9uPicrIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlNZW1iZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWVtYmVyPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5UHJvbW90ZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgUHJvbW90ZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgYmFuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQtbW9kYWwnKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnLHRoaXNCYW5kLmlkKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNCYW5kLmJhbmROYW1lKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0JhbmQuZGVzY3JpcHRpb24rJzwvcD4nKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtZm9vdGVyJykuaHRtbCgnPGRpdiBjbGFzcz1cImR5bmFtaWMtYnV0dG9uc1wiPjwvZGl2PjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcclxufTsiXX0=
