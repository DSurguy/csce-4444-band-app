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

if( typeof module !== 'undefined' ){
    module.exports = Notification;
}
;//bundle semicolon

function SearchedBand(json){
    this.id = json.id || 0;
    this.bandName = json.bandName || '';
    this.applicationStatus = json.applicationStatus || undefined;
    this.role = json.role || undefined;
    this.description = json.description || '';
    this.genre = json.genre || '';
}

SearchedBand.APPLICATION_STATUS = {
	NONE: 0, 
    APPLIED_MANAGER: 1,
    APPLIED_MEMBER: 2,
    APPLIED_PROMOTER: 3,
	ACCEPTED: 4, 
	REJECTED: 5,
    BLOCKED: 6
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
var searching = false;

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
};

AddFriendView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;
    
    // This will run a search every second when the user presses a key. 
    $(document).on('keypress', 'form', function (e){
        if (searching === false) {
            searching = true;
            setTimeout(function () {
                searching = false;
                pageElem.find('form').submit();
            }, 1000);
        }
    });

    // Submitting the search string
    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.search(this)
        .then(function (result) {
        })
        .fail(function (err) {
        });
    });

    // Handle friend request
    pageElem.on('click', '#btnRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 2)
        .then(function (result) {
            if (result === true) {
                alert("Success!");  
                pageElem.find('form').submit();  
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

    // Handle block request
    pageElem.on('click', '#btnBlockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 3)
        .then(function (result) {
            if (result === true) {
                alert("Success!");    
                pageElem.find('form').submit();
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

    // Handle unblock request
    pageElem.on('click', '#btnUnblockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
        .then(function (result) {
            if (result === true) {
                alert("Success!");    
                pageElem.find('form').submit();
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

    // Handle cancel request
    pageElem.on('click', '#btnCancelRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
        .then(function (result) {
            if (result === true) {
                alert("Success!");   
                pageElem.find('form').submit(); 
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
    pageElem.on('click', '#btnAcceptModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 1)
        .then(function (result) {
            if (result === true) {
                alert("Success!");    
                pageElem.find('form').submit();
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

    // Handle friend reject
    pageElem.on('click', '#btnRejectModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
        .then(function (result) {
            if (result === true) {
                alert("Success!");   
                pageElem.find('form').submit(); 
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

    // Handle unfriend
    pageElem.on('click', '#btnUnfriendModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
        .then(function (result) {
            if (result === true) {
                alert("Success!");    
                pageElem.find('form').submit();
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

AddFriendView.prototype.updateUserList = function (){
    var friendsElem = $(this.page.elem).find('.friends');
    var friendModal = $(this.page.elem).find('.friend-modal');
    var modalButtons = '';
    var colorSchema = '';
    var badge = '';

    // Clear any current cards from previous search
    $('.card').remove();
    $('.modal').remove();

    for( var i=0; i<this.page.ctrl.friends.length; i++ ){
        // Determine how to style each card and modal based on status
        if (this.page.ctrl.friends[i].status === 'friend') {
            colorSchema = '"card card-success" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnUnfriendModal" type="button" class="btn btn-danger" data-dismiss="modal">Unfriend</button>'+
                            '<button id="btnBlockModal" type="button" class="btn btn-default" data-dismiss="modal">Block User</button>';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'requested') { 
            colorSchema = '"card card-info" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnCancelRequestModal" type="button" class="btn btn-default" data-dismiss="modal">Cancel Request</button>'+
                           '<button id="btnBlockModal" type="button" class="btn btn-default" data-dismiss="modal">Block User</button>';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'pending') { 
            colorSchema = '"card card-warning" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnAcceptModal" type="button" class="btn btn-success" data-dismiss="modal">Accept</button>'+
                            '<button id="btnRejectModal" type="button" class="btn btn-danger" data-dismiss="modal">Reject</button>'+
                            '<button id="btnBlockModal" type="button" class="btn btn-default" data-dismiss="modal">Block User</button>';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'blocked') {
            colorSchema = '"card card-inverse" style="background-color: #333; border-color: #333; width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnUnblockModal" type="button" class="btn btn-default" data-dismiss="modal">Unblock User</button>';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status;
        }
        else if (this.page.ctrl.friends[i].status === 'none') {
            colorSchema = '"card card-primary" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnRequestModal" type="button" class="btn btn-success" data-dismiss="modal">Send Friend Request</button>'+
                            '<button id="btnBlockModal" type="button" class="btn btn-default" data-dismiss="modal">Block User</button>';
            badge = '';
        }

        // Add card for each user
        friendsElem.append('<div class='+colorSchema+' data-toggle="modal" data-target="#modal'+this.page.ctrl.friends[i].id+'">'+
                                '<div class="card-block">'+
                                    '<h4 class="card-title">'+this.page.ctrl.friends[i].userName+
                                        '<span style="display:inline-block; width: 10rem;"></span>'+
                                        '<small>('+this.page.ctrl.friends[i].name+')</small>'+badge+                                        
                                    '</h4>'+
                                '</div>'+
                            '</div><p/>');
        // Add modal for each user
        friendModal.append('<div id="modal'+this.page.ctrl.friends[i].id+'" class="modal fade" role="dialog">'+
                                '<div class="modal-dialog">'+
                                    '<div class="modal-content">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                            '<h4 class="modal-title">'+this.page.ctrl.friends[i].userName+'</h4>'+
                                        '</div>'+
                                        '<div class="modal-body">'+
                                            '<p>'+this.page.ctrl.friends[i].name+'</p>'+
                                            '<p>'+this.page.ctrl.friends[i].bio+'</p>'+
                                        '</div>'+
                                        '<div class="modal-footer">'+modalButtons+
                                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>');
    }
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

BandView.prototype.bindEvents = function (){};
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
    var friendsElem = $(this.page.elem).find('.friends');
    var friendModal = $(this.page.elem).find('.friend-modal');
    var modalButtons = '';
    var colorSchema = '';
    var badge = '';

    for( var i=0; i<this.page.ctrl.friends.length; i++ ){
        if (this.page.ctrl.friends[i].status === 'friend') {
            colorSchema = '"card card-success" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnUnfriendModal" type="button" class="btn btn-danger" data-dismiss="modal">Unfriend</button>';
        }
   else if (this.page.ctrl.friends[i].status === 'requested') { 
            colorSchema = '"card card-info" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnCancelRequestModal" type="button" class="btn btn-default" data-dismiss="modal">Cancel Request</button>'+
                           '<button id="btnBlockModal" type="button" class="btn btn-default" data-dismiss="modal">Block User</button>';
        }
        else if (this.page.ctrl.friends[i].status === 'pending') { 
            colorSchema = '"card card-warning" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnAcceptModal" type="button" class="btn btn-success" data-dismiss="modal">Accept</button>'+
                            '<button id="btnRejectModal" type="button" class="btn btn-danger" data-dismiss="modal">Reject</button>'+
                            '<button id="btnBlockModal" type="button" class="btn btn-default" data-dismiss="modal">Block User</button>';
        }
        else if (this.page.ctrl.friends[i].status === 'blocked') {
            colorSchema = '"card card-inverse" style="background-color: #333; border-color: #333; width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnUnblockModal" type="button" class="btn btn-default" data-dismiss="modal">Unblock User</button>';
        }

        friendsElem.append('<div class='+colorSchema+' data-toggle="modal" data-target="#modal'+this.page.ctrl.friends[i].id+'">'+
                                '<div class="card-block">'+
                                    '<h4 class="card-title">'+this.page.ctrl.friends[i].userName+
                                        '<span style="display:inline-block; width: 10rem;"></span>'+
                                        '<small>('+this.page.ctrl.friends[i].name+')</small>'+
                                        '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status+
                                    '</h4>'+
                                '</div>'+
                            '</div><p/>');
/*                            '<div class="card-block bands'+i+'">');
        var bandsElem = $(this.page.elem).find('.bands'+i);
        for( var j=0; j<this.page.ctrl.friends[i].bands.length; j++ ){
            bandsElem.append('<div class="band btn btn-secondary" id='+this.page.ctrl.friends[i].bands[j].id+'>'+this.page.ctrl.friends[i].bands[j].bandName+'</div><span style="display:inline-block; width: 1rem;"></span>');
        }   */ 
    //    friendsElem.append('</div></div><p/>');

        friendModal.append('<div id="modal'+this.page.ctrl.friends[i].id+'" class="modal fade" role="dialog">'+
                                '<div class="modal-dialog">'+
                                    '<div class="modal-content">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                            '<h4 class="modal-title">'+this.page.ctrl.friends[i].userName+'</h4>'+
                                        '</div>'+
                                        '<div class="modal-body">'+
                                            '<p>'+this.page.ctrl.friends[i].name+'</p>'+
                                            '<p>'+this.page.ctrl.friends[i].bio+'</p>'+
                                        '</div>'+
                                        '<div class="modal-footer">'+modalButtons+
                                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>');
    }
   
    this.bindEvents();
};

FriendsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;
    
    pageElem.on('click', '.add-friend', function (e){
        window.location = '/friends/add';
    });

    pageElem.on('click', '.friend', function (e){
        window.location = '/friends/' + e.target.id;
    });

    pageElem.on('click', '#btnRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 'requested')
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
    });

    pageElem.on('click', '#btnBlockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 3)
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
    });

    pageElem.on('click', '#btnUnblockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
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
    });

    pageElem.on('click', '#btnCancelRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
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
    });

    pageElem.on('click', '#btnAcceptModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 1)
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
    });

    pageElem.on('click', '#btnRejectModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
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
    });

    pageElem.on('click', '#btnUnfriendModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 0)
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
SearchBandsCtrl.prototype.submitApplication = function (form){
    var defer = $.Deferred();
    var that = this;
    $.ajax({
        url: '/api/bands/submitApplication',
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
        page.ctrl.submitApplication(this)
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
        page.ctrl.expandBandModal('Manager', SearchedBand.APPLICATION_STATUS.APPLIED_MANAGER, bandId);
    })

    // Handle member application request
    pageElem.on('click', '#btnApplyMember', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-band-id'),10)
        page.ctrl.expandBandModal('Member', SearchedBand.APPLICATION_STATUS.APPLIED_MEMBER, bandId);
    })

    // Handle promoter application request
    pageElem.on('click', '#btnApplyPromoter', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = parseInt($(this.parentElement.parentElement.parentElement.parentElement.parentElement).attr('data-band-id'),10)
        page.ctrl.expandBandModal('Promoter', SearchedBand.APPLICATION_STATUS.APPLIED_PROMOTER, bandId);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhbmQuanMiLCJmcmllbmQuanMiLCJub3RpZmljYXRpb24uanMiLCJzZWFyY2hlZEJhbmQuanMiLCJzaW1wbGVCYW5kLmpzIiwiYXBwLmpzIiwicGFnZS5qcyIsIm1lbnUuanMiLCJhZGRGcmllbmQuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJyZWdpc3Rlci5qcyIsInJlZ2lzdGVyQmFuZC5qcyIsInNlYXJjaEJhbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBUmpUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBU3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMzUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIEJhbmRQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYmFuZFBhZ2UnKVswXSwgQmFuZEN0cmwsIEJhbmRWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5CYW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFBhZ2U7XHJcblxyXG5mdW5jdGlvbiBCYW5kQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmJhbmQgPSB7fTtcclxufVxyXG5CYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkJhbmRDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRDdHJsO1xyXG5CYW5kQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIHZhciBpZCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuXHJcbiAgIC8vIHZhciBpZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzL2JhbmQvJyArIGlkLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5iYW5kID0gZGF0YTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICB0aGF0LmJhbmQgPSB7fTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5CYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkJhbmRWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRWaWV3O1xyXG5CYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGJhbmRFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQnKTtcclxuICAgIGJhbmRFbGVtLmFwcGVuZCgnPGgyIGNsYXNzPVwiY2FyZC10aXRsZVwiPk15IEJhbmQ8L2gyPicpO1xyXG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPjwvZGl2PicpO1xyXG4gICAgYmFuZEVsZW0uZmluZCgnLmNhcmQtYmxvY2snKS5hcHBlbmQoJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkJhbmQgTmFtZTwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLmJhbmROYW1lKyc8L3A+Jyk7XHJcbiAgICBiYW5kRWxlbS5maW5kKCcuY2FyZC1ibG9jaycpLmFwcGVuZCgnPHAgY2xhc3M9XCJpbmZvIGNhcmQtdGV4dFwiPjxzdHJvbmc+T3duZXI8L3N0cm9uZz46ICcrdGhpcy5wYWdlLmN0cmwuYmFuZFswXS5vd25lck5hbWUrJzwvcD4nKTtcclxuICAgIGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJykuYXBwZW5kKCc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5EZXNjcmlwdGlvbjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLmRlc2NyaXB0aW9uKyc8L3A+Jyk7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcbkJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7fTsiLCJmdW5jdGlvbiBGcmllbmQoanNvbil7XHJcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xyXG4gICAgdGhpcy51c2VyTmFtZSA9IGpzb24udXNlck5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLmJpbyA9IGpzb24uYmlvIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcclxuICAgIHRoaXMuc3RhdHVzID0ganNvbi5zdGF0dXMgfHwgJyc7XHJcbn1cclxuXHJcbkZyaWVuZC5TVEFUVVMgPSB7XHJcblx0Tk9ORTogMCwgXHJcblx0RlJJRU5EOiAxLCBcclxuXHRSRVFVRVNURUQ6IDIsIFxyXG5cdFBFTkRJTkc6IDMsIFxyXG5cdEJMT0NLRUQ6IDQgXHJcbn1cclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEZyaWVuZDsgfSIsImZ1bmN0aW9uIE5vdGlmaWNhdGlvbigpe1xyXG4gICAgdGhpcy51c2VySWQ7XHJcbiAgICB0aGlzLm1lc3NhZ2U7XHJcbiAgICB0aGlzLmxpbms7XHJcbiAgICB0aGlzLnVucmVhZDtcclxufVxyXG5Ob3RpZmljYXRpb24uTVNHX1RZUEUgPSB7XHJcbiAgICBOT19NRVNTQUdFOiAwLFxyXG4gICAgRlJJRU5EX1JFUVVFU1Q6IDEsXHJcbiAgICBGUklFTkRfQUNDRVBURUQ6IDIsXHJcbiAgICBCQU5EX0lOVklURTogMyxcclxuICAgIFJFTU9WRURfRlJPTV9CQU5EOiA0LFxyXG4gICAgRVZFTlRfSU5WSVRFOiA1LFxyXG4gICAgRVZFTlRfUkVNSU5ERVI6IDYsXHJcbiAgICBFUlJPUjogNyxcclxuICAgIFNVQ0NFU1M6IDgsXHJcbiAgICBXQVJOSU5HOiA5XHJcbn07XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gTm90aWZpY2F0aW9uO1xyXG59IiwiZnVuY3Rpb24gU2VhcmNoZWRCYW5kKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YXR1cyA9IGpzb24uYXBwbGljYXRpb25TdGF0dXMgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5yb2xlID0ganNvbi5yb2xlIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBqc29uLmRlc2NyaXB0aW9uIHx8ICcnO1xyXG4gICAgdGhpcy5nZW5yZSA9IGpzb24uZ2VucmUgfHwgJyc7XHJcbn1cclxuXHJcblNlYXJjaGVkQmFuZC5BUFBMSUNBVElPTl9TVEFUVVMgPSB7XHJcblx0Tk9ORTogMCwgXHJcbiAgICBBUFBMSUVEX01BTkFHRVI6IDEsXHJcbiAgICBBUFBMSUVEX01FTUJFUjogMixcclxuICAgIEFQUExJRURfUFJPTU9URVI6IDMsXHJcblx0QUNDRVBURUQ6IDQsIFxyXG5cdFJFSkVDVEVEOiA1LFxyXG4gICAgQkxPQ0tFRDogNlxyXG59XHJcblxyXG5TZWFyY2hlZEJhbmQuUk9MRSA9IHtcclxuICAgIE9XTkVSOiAwLFxyXG4gICAgTUFOQUdFUjogMSxcclxuICAgIE1FTUJFUjogMixcclxuICAgIFBST01PVEVSOiAzXHJcbn1cclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNlYXJjaGVkQmFuZDsgfSIsImZ1bmN0aW9uIFNpbXBsZUJhbmQoanNvbil7XHJcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xyXG4gICAgdGhpcy5vd25lck5hbWUgPSBqc29uLm93bmVyTmFtZSB8fCAnJztcclxuICAgIHRoaXMub3duZXJJZCA9IGpzb24ub3duZXJJZCB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmJhbmROYW1lID0ganNvbi5iYW5kTmFtZSB8fCAnJztcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gU2ltcGxlQmFuZDsgfSIsIi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBBcHAoKXtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAvL3RoaXMucGFnZUhpc3RvcnkgPSBbXTtcclxufVxyXG5BcHAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoUGFnZUNvbnN0cnVjdG9yKXtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgUGFnZUNvbnN0cnVjdG9yKHRoaXMpO1xyXG4gICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIHRoaXMuY3VycmVudFBhZ2UuaW5pdCgpO1xyXG59O1xyXG4vKkFwcC5wcm90b3R5cGUuY2hhbmdlUGFnZSA9IGZ1bmN0aW9uIChwYWdlLCBkYXRhKXtcclxuICAgIGlmKCB0aGlzLmN1cnJlbnRQYWdlICl7XHJcbiAgICAgICAgLy9zdG9yZSB0aGUgY29uc3RydWN0b3IgZm9yIHRoZSBsYXN0IHBhZ2VcclxuICAgICAgICB0aGlzLnBhZ2VIaXN0b3J5LnB1c2godGhpcy5jdXJyZW50UGFnZS5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH1cclxuICAgIC8vY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBuZXh0IHBhZ2VcclxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgcGFnZSh0aGlzKTtcclxuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcclxufTsqLyIsIi8qIGdsb2JhbCAkICovXHJcbi8qKiBJbmhlcml0YWJsZSBDbGFzc2VzICoqL1xyXG5mdW5jdGlvbiBQYWdlKGFwcCwgZWxlbSwgY3RybENvbnN0cnVjdG9yLCB2aWV3Q29uc3RydWN0b3IsIGNoaWxkQ29tcG9uZW50cyl7XHJcbiAgICB0aGlzLmFwcCA9IGFwcDtcclxuICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgICB0aGlzLmN0cmwgPSBuZXcgY3RybENvbnN0cnVjdG9yKHRoaXMpO1xyXG4gICAgdGhpcy52aWV3ID0gbmV3IHZpZXdDb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzID0gY2hpbGRDb21wb25lbnRzIHx8IHt9O1xyXG59XHJcblBhZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIFxyXG4gICAgZm9yKCB2YXIgY29tcG9uZW50IGluIHRoaXMuY2hpbGRDb21wb25lbnRzICl7XHJcbiAgICAgICAgdGhpcy5jaGlsZENvbXBvbmVudHNbY29tcG9uZW50XS5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuY3RybC5pbml0KClcclxuICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgIHRoYXQudmlldy5pbml0LmFwcGx5KHRoYXQudmlldywgYXJndW1lbnRzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gUGFnZUN0cmwocGFnZSl7XHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG59XHJcblBhZ2VDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBQYWdlVmlldyhwYWdlKXtcclxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XHJcbn1cclxuUGFnZVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXt9OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIE1lbnVDb21wb25lbnQoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoZGF0YS5lbGVtZW50KVswXSwgTWVudUN0cmwsIE1lbnVWaWV3KTtcclxufVxyXG5NZW51Q29tcG9uZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5NZW51Q29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVDb21wb25lbnQ7XHJcblxyXG5mdW5jdGlvbiBNZW51Q3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTWVudUN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5NZW51Q3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q3RybDtcclxuTWVudUN0cmwucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHVybDogJy9hcGkvbG9nb3V0J1xyXG4gICAgfSkudGhlbihkZWZlci5yZXNvbHZlKS5jYXRjaChkZWZlci5yZWplY3QpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gTWVudVZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk1lbnVWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuTWVudVZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudVZpZXc7XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLm1lbnVCdXR0b25Db250YWluZXIgPSAkKHRoaXMucGFnZS5lbGVtKTtcclxuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIgPSAkKCcjbWVudU92ZXJsYXknKTtcclxuICAgIHRoaXMucmVuZGVyTWVudSgpO1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5yZW5kZXJNZW51ID0gZnVuY3Rpb24gKCl7XHJcbiAgICBcclxuICAgIC8qIHJlbmRlciBvdmVybGF5ICovXHJcbiAgICBpZiggdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5sZW5ndGggPT0gMCApe1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgaWQ9XCJtZW51T3ZlcmxheVwiIGNsYXNzPVwiaGlkZGVuXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoXCIjbWVudU92ZXJsYXlcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnVcIj48L2Rpdj4nKTtcclxuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51U2VjdGlvblwiPidcclxuICAgICAgICArJzxkaXYgY2xhc3M9XCJhY3Rpb24gbG9nb3V0IGJ0biBidG4tc2Vjb25kYXJ5XCI+TG9nb3V0PC9kaXY+J1xyXG4gICAgKyc8L2Rpdj4nKTtcclxuICAgIFxyXG4gICAgLyogcmVuZGVyIG1lbnUgYnV0dG9uICovXHJcbiAgICB0aGlzLm1lbnVCdXR0b25Db250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51LXRvZ2dsZSBidG4gYnRuLXNlY29uZGFyeSBmYSBmYS1iYXJzXCI+PC9kaXY+Jyk7XHJcbn07XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICB2aWV3ID0gdGhpcztcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5tZW51LXRvZ2dsZScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCB2aWV3LnZpc2libGUgKXtcclxuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLm9uKCdjbGljaycsICcubWVudSAubG9nb3V0JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZpZXcucGFnZS5jdHJsLmxvZ291dCgpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBhbGVydChlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdmlldy52aXNpYmxlID0gIXZpZXcudmlzaWJsZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiggdmlldy52aXNpYmxlICl7XHJcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbnZhciBzZWFyY2hpbmcgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIEFkZEZyaWVuZFBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNhZGRGcmllbmRQYWdlJylbMF0sIEFkZEZyaWVuZEN0cmwsIEFkZEZyaWVuZFZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkFkZEZyaWVuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkFkZEZyaWVuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEFkZEZyaWVuZEN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5mcmllbmRzID0gW107XHJcbn1cclxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kQ3RybDtcclxuXHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHRoYXQuZnJpZW5kcyA9IFtdO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2ZyaWVuZHMvc2VhcmNoJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5mcmllbmRzID0gZGF0YTtcclxuICAgICAgICB0aGF0LnBhZ2Uudmlldy51cGRhdGVVc2VyTGlzdCgpO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIFwidG9cIiB1c2VyXHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQWRkRnJpZW5kVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kVmlldztcclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpeyAgIFxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICBcclxuICAgIC8vIFRoaXMgd2lsbCBydW4gYSBzZWFyY2ggZXZlcnkgc2Vjb25kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleS4gXHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5cHJlc3MnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBpZiAoc2VhcmNoaW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBzZWFyY2hpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnNlYXJjaCh0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMilcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICBcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIGJsb2NrIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXHJcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgdW5ibG9jayByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blVuYmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAwKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXHJcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgY2FuY2VsIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDApXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgIFxyXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDEpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgICBcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVqZWN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blJlamVjdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDApXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgIFxyXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEhhbmRsZSB1bmZyaWVuZFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5VbmZyaWVuZE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDApXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgICBcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSAgICBcclxufTtcclxuXHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZnJpZW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kcycpO1xyXG4gICAgdmFyIGZyaWVuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZC1tb2RhbCcpO1xyXG4gICAgdmFyIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG4gICAgdmFyIGNvbG9yU2NoZW1hID0gJyc7XHJcbiAgICB2YXIgYmFkZ2UgPSAnJztcclxuXHJcbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxyXG4gICAgJCgnLmNhcmQnKS5yZW1vdmUoKTtcclxuICAgICQoJy5tb2RhbCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIHN0YXR1c1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcclxuICAgICAgICAgICAgY29sb3JTY2hlbWEgPSAnXCJjYXJkIGNhcmQtc3VjY2Vzc1wiIHN0eWxlPVwid2lkdGg6IDUwcmVtOyBjdXJzb3I6IHBvaW50ZXJcIic7XHJcbiAgICAgICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuVW5mcmllbmRNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmZyaWVuZDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkJsb2NrTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxyXG4gICAgICAgICAgICBjb2xvclNjaGVtYSA9ICdcImNhcmQgY2FyZC1pbmZvXCIgc3R5bGU9XCJ3aWR0aDogNTByZW07IGN1cnNvcjogcG9pbnRlclwiJztcclxuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5CbG9ja01vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXHJcbiAgICAgICAgICAgIGNvbG9yU2NoZW1hID0gJ1wiY2FyZCBjYXJkLXdhcm5pbmdcIiBzdHlsZT1cIndpZHRoOiA1MHJlbTsgY3Vyc29yOiBwb2ludGVyXCInO1xyXG4gICAgICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkFjY2VwdE1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5SZWplY3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5CbG9ja01vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcclxuICAgICAgICAgICAgY29sb3JTY2hlbWEgPSAnXCJjYXJkIGNhcmQtaW52ZXJzZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzMzMzsgYm9yZGVyLWNvbG9yOiAjMzMzOyB3aWR0aDogNTByZW07IGN1cnNvcjogcG9pbnRlclwiJztcclxuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5VbmJsb2NrTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuYmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIGNvbG9yU2NoZW1hID0gJ1wiY2FyZCBjYXJkLXByaW1hcnlcIiBzdHlsZT1cIndpZHRoOiA1MHJlbTsgY3Vyc29yOiBwb2ludGVyXCInO1xyXG4gICAgICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0blJlcXVlc3RNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+U2VuZCBGcmllbmQgUmVxdWVzdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkJsb2NrTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxyXG4gICAgICAgIGZyaWVuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz0nK2NvbG9yU2NoZW1hKycgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI21vZGFsJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnVzZXJOYW1lK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvaDQ+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj48cC8+Jyk7XHJcbiAgICAgICAgLy8gQWRkIG1vZGFsIGZvciBlYWNoIHVzZXJcclxuICAgICAgICBmcmllbmRNb2RhbC5hcHBlbmQoJzxkaXYgaWQ9XCJtb2RhbCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCIgY2xhc3M9XCJtb2RhbCBmYWRlXCIgcm9sZT1cImRpYWxvZ1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrJzwvaDQ+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHA+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJzwvcD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8cD4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uYmlvKyc8L3A+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nK21vZGFsQnV0dG9ucytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nKTtcclxuICAgIH1cclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kc1BhZ2UnKVswXSwgQmFuZHNDdHJsLCBCYW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRzQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmJhbmRzID0gW107XHJcbn1cclxuQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5iYW5kcyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgdGhhdC5iYW5kcyA9IFtdO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNWaWV3O1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJiYW5kIGJ0biBidG4tc2Vjb25kYXJ5XCIgaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvcmVnaXN0ZXInO1xyXG4gICAgfSk7XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy9iYW5kLycgKyBlLnRhcmdldC5pZDtcclxuICAgIH0pXHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG5cclxuZnVuY3Rpb24gRnJpZW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNmcmllbmRzUGFnZScpWzBdLCBGcmllbmRzQ3RybCwgRnJpZW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkZyaWVuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5GcmllbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEZyaWVuZHNDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuZnJpZW5kcyA9IFtdO1xyXG59XHJcbkZyaWVuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuRnJpZW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc0N0cmw7XHJcbkZyaWVuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGF0LmZyaWVuZHMgPSBbXTtcclxuICAgICQuYWpheCgnL2FwaS9mcmllbmRzJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuRnJpZW5kc0N0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gRnJpZW5kc1ZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc1ZpZXc7XHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZnJpZW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kcycpO1xyXG4gICAgdmFyIGZyaWVuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZC1tb2RhbCcpO1xyXG4gICAgdmFyIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG4gICAgdmFyIGNvbG9yU2NoZW1hID0gJyc7XHJcbiAgICB2YXIgYmFkZ2UgPSAnJztcclxuXHJcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcclxuICAgICAgICAgICAgY29sb3JTY2hlbWEgPSAnXCJjYXJkIGNhcmQtc3VjY2Vzc1wiIHN0eWxlPVwid2lkdGg6IDUwcmVtOyBjdXJzb3I6IHBvaW50ZXJcIic7XHJcbiAgICAgICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuVW5mcmllbmRNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmZyaWVuZDwvYnV0dG9uPic7XHJcbiAgICAgICAgfVxyXG4gICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXHJcbiAgICAgICAgICAgIGNvbG9yU2NoZW1hID0gJ1wiY2FyZCBjYXJkLWluZm9cIiBzdHlsZT1cIndpZHRoOiA1MHJlbTsgY3Vyc29yOiBwb2ludGVyXCInO1xyXG4gICAgICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbFJlcXVlc3RNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIFJlcXVlc3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkJsb2NrTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxyXG4gICAgICAgICAgICBjb2xvclNjaGVtYSA9ICdcImNhcmQgY2FyZC13YXJuaW5nXCIgc3R5bGU9XCJ3aWR0aDogNTByZW07IGN1cnNvcjogcG9pbnRlclwiJztcclxuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BY2NlcHRNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuUmVqZWN0TW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQmxvY2tNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcclxuICAgICAgICAgICAgY29sb3JTY2hlbWEgPSAnXCJjYXJkIGNhcmQtaW52ZXJzZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogIzMzMzsgYm9yZGVyLWNvbG9yOiAjMzMzOyB3aWR0aDogNTByZW07IGN1cnNvcjogcG9pbnRlclwiJztcclxuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5VbmJsb2NrTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuYmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9Jytjb2xvclNjaGVtYSsnIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNtb2RhbCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0ubmFtZSsnKTwvc21hbGw+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvaDQ+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj48cC8+Jyk7XHJcbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9jayBiYW5kcycraSsnXCI+Jyk7XHJcbiAgICAgICAgdmFyIGJhbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kcycraSk7XHJcbiAgICAgICAgZm9yKCB2YXIgaj0wOyBqPHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uYmFuZHMubGVuZ3RoOyBqKysgKXtcclxuICAgICAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJhbmQgYnRuIGJ0bi1zZWNvbmRhcnlcIiBpZD0nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uYmFuZHNbal0uaWQrJz4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uYmFuZHNbal0uYmFuZE5hbWUrJzwvZGl2PjxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxcmVtO1wiPjwvc3Bhbj4nKTtcclxuICAgICAgICB9ICAgKi8gXHJcbiAgICAvLyAgICBmcmllbmRzRWxlbS5hcHBlbmQoJzwvZGl2PjwvZGl2PjxwLz4nKTtcclxuXHJcbiAgICAgICAgZnJpZW5kTW9kYWwuYXBwZW5kKCc8ZGl2IGlkPVwibW9kYWwnK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uaWQrJ1wiIGNsYXNzPVwibW9kYWwgZmFkZVwiIHJvbGU9XCJkaWFsb2dcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnVzZXJOYW1lKyc8L2g0PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxwPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKyc8L3A+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHA+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmJpbysnPC9wPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+Jyttb2RhbEJ1dHRvbnMrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+Jyk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5GcmllbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1mcmllbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvJyArIGUudGFyZ2V0LmlkO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgJ3JlcXVlc3RlZCcpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgIFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgIFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7ICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICBcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDApXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDEpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blJlamVjdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDApXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pOyAgICAgICAgXHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuLyoqXHJcbiAqIFBBR0VcclxuICogKi9cclxuZnVuY3Rpb24gTG9naW5QYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbG9naW5QYWdlJylbMF0sIExvZ2luQ3RybCwgTG9naW5WaWV3KTtcclxufVxyXG5Mb2dpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkxvZ2luUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpblBhZ2U7XHJcblxyXG4vKipcclxuICogQ09OVFJPTExFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBMb2dpbkN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5sb2dnaW5nSW4gPSBmYWxzZTtcclxufVxyXG5Mb2dpbkN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5Mb2dpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5DdHJsO1xyXG5cclxuTG9naW5DdHJsLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9sb2dpbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZWplY3QoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWSUVXRVJcclxuICogKi9cclxuZnVuY3Rpb24gTG9naW5WaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5Mb2dpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5Mb2dpblZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5WaWV3O1xyXG5Mb2dpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuTG9naW5WaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmKCBwYWdlLmN0cmwubG9nZ2luZ0luICl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXHJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcclxuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXHJcbiAgICAgICAgcGFnZS5jdHJsLmxvZ2luKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbWFpbic7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkxvZ2luIEZhaWxlZCE8L3N0cm9uZz4gVXNlcm5hbWUgb3IgcGFzc3dvcmQgd2FzIGluY29ycmVjdC4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBNYWluUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI21haW5QYWdlJylbMF0sIE1haW5DdHJsLCBNYWluVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuTWFpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbk1haW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5QYWdlO1xyXG5cclxuZnVuY3Rpb24gTWFpbkN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk1haW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuTWFpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpbkN0cmw7XHJcblxyXG5mdW5jdGlvbiBNYWluVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTWFpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5NYWluVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluVmlldztcclxuTWFpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuYmFuZHMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XHJcbiAgICB9KTtcclxuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmZyaWVuZHMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzJztcclxuICAgIH0pO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuYWRkLWZyaWVuZHMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XHJcbiAgICB9KTtcclxuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLnNlYXJjaC1iYW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3NlYXJjaCc7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG4vKipcclxuICogUEFHRVxyXG4gKiAqL1xyXG5mdW5jdGlvbiBSZWdpc3RlclBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNyZWdpc3RlclBhZ2UnKVswXSwgUmVnaXN0ZXJDdHJsLCBSZWdpc3RlclZpZXcpO1xyXG59XHJcblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyUGFnZTtcclxuXHJcbi8qKlxyXG4gKiBDT05UUk9MTEVSXHJcbiAqICovXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XHJcbn1cclxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQ3RybDtcclxuXHJcblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvcmVnaXN0ZXInLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVklFV0VSXHJcbiAqICovXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyVmlldztcclxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcclxuICAgICAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBpZiggcGFnZS5jdHJsLnJlZ2lzdGVyaW5nICl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xyXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXHJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cclxuICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXIodGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IHJlZ2lzdGVyIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXHJcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXHJcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xyXG4gICAgICAgICAgICArJzwvZGl2PicpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2xvZ2luJztcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJylcclxuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkxvZ2luIEZhaWxlZCE8L3N0cm9uZz4gVXNlcm5hbWUgb3IgcGFzc3dvcmQgd2FzIGluY29ycmVjdC4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZFBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNyZWdpc3RlckJhbmRQYWdlJylbMF0sIFJlZ2lzdGVyQmFuZEN0cmwsIFJlZ2lzdGVyQmFuZFZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblJlZ2lzdGVyQmFuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kUGFnZTtcclxuXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZEN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5yZWdpc3RlcmluZyA9IGZhbHNlO1xyXG59XHJcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZEN0cmw7XHJcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3JlZ2lzdGVyJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kVmlldztcclxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZSxcclxuICAgICAgICBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXHJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcclxuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXHJcbiAgICAgICAgcGFnZS5jdHJsLmxvZ2luKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXHJcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+UmVnaXN0cmF0aW9uIFN1Y2Nlc3NmdWwhPC9zdHJvbmc+IFJlZGlyZWN0aW5nIGluIDIgc2Vjb25kcy4uLidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXHJcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXHJcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXHJcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5CYW5kIFJlZ2lzdHJhdGlvbiBGYWlsZWQhPC9zdHJvbmc+J1xyXG4gICAgICAgICAgICArJzwvZGl2PicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG52YXIgc2VhcmNoaW5nID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBTZWFyY2hCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNzZWFyY2hCYW5kc1BhZ2UnKVswXSwgU2VhcmNoQmFuZHNDdHJsLCBTZWFyY2hCYW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblNlYXJjaEJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIFNlYXJjaEJhbmRzQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmJhbmRzID0gW107XHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IGZhbHNlO1xyXG59XHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc0N0cmw7XHJcblxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHRoYXQuYmFuZHMgPSBbXTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9zZWFyY2gnLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmJhbmRzID0gZGF0YTtcclxuICAgICAgICB0aGF0LnBhZ2Uudmlldy51cGRhdGVCYW5kTGlzdCgpO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIHNlbGVjdGVkIGJhbmRcclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5zdWJtaXRBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9zdWJtaXRBcHBsaWNhdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpOyBcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgZGVsZXRlIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhpcyBiYW5kXHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY2FuY2VsQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYmFuZElkKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9jYW5jZWxBcHBsaWNhdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHtiYW5kSWQgOiBiYW5kSWR9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5leHBhbmRCYW5kTW9kYWwgPSBmdW5jdGlvbihhcHBsaWNhdGlvblR5cGUsIGFwcGxpY2F0aW9uU3RhdHVzLCBiYW5kSWQpIHtcclxuICAgICQoJy5tb2RhbC1ib2R5JykucmVtb3ZlKCk7XHJcbiAgICAkKCcubW9kYWwtZm9vdGVyJykucmVtb3ZlKCk7ICAgIFxyXG5cclxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcubW9kYWwtY29udGVudCcpO1xyXG4gICAgdmFyIGJhbmROYW1lID0gYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwoKTtcclxuICAgIHZhciBpbnN0cnVtZW50RmllbGQgPSAnJztcclxuXHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbChiYW5kTmFtZSsnPGJyLz4nK2FwcGxpY2F0aW9uVHlwZSsnIEFwcGxpY2F0aW9uJyk7XHJcblxyXG4gICAgaWYgKGFwcGxpY2F0aW9uVHlwZSA9PT0gJ01lbWJlcicpIHtcclxuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHBsYWNlaG9sZGVyPVwiSW5zdHJ1bWVudFwiIC8+PHAvPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHZhbHVlPVwiTi9BXCIvPjxwLz4nOyAgXHJcbiAgICB9XHJcblxyXG4gICAgYmFuZE1vZGFsLmFwcGVuZCgnJytcclxuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPicrXHJcbiAgICAgICAgJzxmb3JtIGlkPVwiYXBwbHktZm9ybVwiIGNsYXNzPVwiYXBwbHktZm9ybVwiIG9uc3VibWl0PVwicmV0dXJuXCI+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcclxuICAgICAgICAgICAgICAgIGluc3RydW1lbnRGaWVsZCtcclxuICAgICAgICAgICAgICAgICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJNZXNzYWdlXCIgLz4nK1xyXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImJhbmRJZFwiIHZhbHVlPVwiJytiYW5kSWQrJ1wiIC8+JytcclxuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJhcHBsaWNhdGlvblN0YXR1c1wiIHZhbHVlPVwiJythcHBsaWNhdGlvblN0YXR1cysnXCIgLz4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPC9mb3JtPicrXHJcbiAgICAnPC9kaXY+JytcclxuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JysgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cInN1Ym1pdFwiIGZvcm09XCJhcHBseS1mb3JtXCI+JytcclxuICAgICAgICAgICAgICAgICdTdWJtaXQnK1xyXG4gICAgICAgICAgICAnPC9idXR0b24+JytcclxuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicrXHJcbiAgICAgICAgJzwvZGl2PicrICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICc8L2Rpdj4nKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFNlYXJjaEJhbmRzVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcbn1cclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzVmlldztcclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7ICAgXHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgXHJcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgJy5zZWFyY2gtZm9ybSBpbnB1dCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChwYWdlLnZpZXcuc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgcGFnZS52aWV3LnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN1Ym1pdHRpbmcgdGhlIHNlYXJjaCBzdHJpbmdcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5zZWFyY2gtZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgIFxyXG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KXsgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLmFwcGx5LWZvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICAgIFxyXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7ICAgXHJcbiAgICAgICAgcGFnZS5jdHJsLnN1Ym1pdEFwcGxpY2F0aW9uKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC1mb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIC8vaGFuZGxlIHRoZSBhcHBsaWNhdGlvbiByZXN1bHRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBUb2dnbGUgQmFuZCBNb2RhbFxyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgcGFnZS52aWV3LnNob3dCYW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIG1hbmFnZXIgYXBwbGljYXRpb24gcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseU1hbmFnZXInLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXHJcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWFuYWdlcicsIFNlYXJjaGVkQmFuZC5BUFBMSUNBVElPTl9TVEFUVVMuQVBQTElFRF9NQU5BR0VSLCBiYW5kSWQpO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgbWVtYmVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlNZW1iZXInLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXHJcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWVtYmVyJywgU2VhcmNoZWRCYW5kLkFQUExJQ0FUSU9OX1NUQVRVUy5BUFBMSUVEX01FTUJFUiwgYmFuZElkKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIHByb21vdGVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlQcm9tb3RlcicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcclxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdQcm9tb3RlcicsIFNlYXJjaGVkQmFuZC5BUFBMSUNBVElPTl9TVEFUVVMuQVBQTElFRF9QUk9NT1RFUiwgYmFuZElkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBhcHBsaWNhdGlvbiBjYW5jZWwgcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxyXG4gICAgICAgIHBhZ2UuY3RybC5jYW5jZWxBcHBsaWNhdGlvbihiYW5kSWQpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgICBcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLypwYWdlRWxlbS5vbignaGlkZGVuLmJzLm1vZGFsJywgJyNtb2RhbDcnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCYW5kTGlzdDtcclxuICAgIH0pOyovXHJcbn07XHJcblxyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZUJhbmRMaXN0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgYmFuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmRzJyk7XHJcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XHJcbiAgICB2YXIgYmFkZ2UgPSAnJztcclxuXHJcbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxyXG4gICAgJCgnLmNhcmQnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcclxuXHJcbiAgICAgICAgLy8gSWYgeW91IGhhdmUgYSByb2xlIHRoZW4geW91IGFyZSBpbiB0aGUgYmFuZCwgc28gbm8gbW9kYWwgYnV0dG9uc1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlICE9ICdub25lJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1zdWNjZXNzJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ucm9sZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ3JlamVjdGVkJykgeyBcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCBiYW5kXHJcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnJytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImJhbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1iYW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnXCIgPicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmdlbnJlKycpPC9zbWFsbD4nK2JhZGdlK1xyXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcclxuICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcclxuICAgIH1cclxufTtcclxuXHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuc2hvd0JhbmRNb2RhbCA9IGZ1bmN0aW9uIChiYW5kSWQpe1xyXG4gICAgdmFyIHRoaXNCYW5kID0gdGhpcy5wYWdlLmN0cmwuYmFuZHMuZmlsdGVyKGZ1bmN0aW9uIChiYW5kKXtcclxuICAgICAgICByZXR1cm4gYmFuZC5pZCA9PSBiYW5kSWQ7XHJcbiAgICB9KVswXSxcclxuICAgICAgICBtb2RhbEJ1dHRvbnM7XHJcbiAgICBcclxuICAgIGlmICh0aGlzQmFuZC5yb2xlICE9ICdub25lJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNYW5hZ2VyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNZW1iZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUHJvbW90ZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdyZWplY3RlZCcpIHsgXHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BcHBseU1hbmFnZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWFuYWdlcjwvYnV0dG9uPicrIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlNZW1iZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWVtYmVyPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5UHJvbW90ZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgUHJvbW90ZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgYmFuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQtbW9kYWwnKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnLHRoaXNCYW5kLmlkKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNCYW5kLmJhbmROYW1lKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0JhbmQuZGVzY3JpcHRpb24rJzwvcD4nKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtZm9vdGVyJykuaHRtbCgnPGRpdiBjbGFzcz1cImR5bmFtaWMtYnV0dG9uc1wiPjwvZGl2PjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcclxufTsiXX0=
