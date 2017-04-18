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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJub3RpZmljYXRpb24uanMiLCJzZWFyY2hlZEJhbmQuanMiLCJzaW1wbGVCYW5kLmpzIiwiYXBwLmpzIiwicGFnZS5qcyIsIm1lbnUuanMiLCJhZGRGcmllbmQuanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJyZWdpc3Rlci5qcyIsInJlZ2lzdGVyQmFuZC5qcyIsInNlYXJjaEJhbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDalRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QVZoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QVdqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBcHBsaWNhdGlvbihqc29uKXtcclxuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XHJcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMudXNlcm5hbWUgPSBqc29uLnVzZXJuYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBqc29uLm1lc3NhZ2UgfHwgJyc7XHJcbn1cclxuXHJcbkFwcGxpY2F0aW9uLlNUQVRVUyA9IHtcclxuXHROT05FOiAwLCBcclxuICAgIEFQUExJRURfTUFOQUdFUjogMSxcclxuICAgIEFQUExJRURfTUVNQkVSOiAyLFxyXG4gICAgQVBQTElFRF9QUk9NT1RFUjogMyxcclxuXHRBQ0NFUFRFRDogNCwgXHJcblx0UkVKRUNURUQ6IDUsXHJcbiAgICBCTE9DS0VEOiA2XHJcbn1cclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uOyB9IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gQmFuZFBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kUGFnZScpWzBdLCBCYW5kQ3RybCwgQmFuZFZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5CYW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuYmFuZCA9IHt9O1xyXG59XHJcbkJhbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQmFuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZEN0cmw7XHJcbkJhbmRDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgdmFyIGlkID0gdXJsLnN1YnN0cmluZyh1cmwubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG5cclxuICAgLy8gdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvYmFuZC8nICsgaWQsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmJhbmQgPSBkYXRhO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIHRoYXQuYmFuZCA9IHt9O1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQmFuZFZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkJhbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFZpZXc7XHJcbkJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgYmFuZEVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZCcpO1xyXG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8aDIgY2xhc3M9XCJjYXJkLXRpdGxlXCI+TXkgQmFuZDwvaDI+Jyk7XHJcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+PC9kaXY+Jyk7XHJcbiAgICBiYW5kRWxlbS5maW5kKCcuY2FyZC1ibG9jaycpLmFwcGVuZCgnPHAgY2xhc3M9XCJpbmZvIGNhcmQtdGV4dFwiPjxzdHJvbmc+QmFuZCBOYW1lPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRbMF0uYmFuZE5hbWUrJzwvcD4nKTtcclxuICAgIGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJykuYXBwZW5kKCc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5Pd25lcjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLm93bmVyTmFtZSsnPC9wPicpO1xyXG4gICAgYmFuZEVsZW0uZmluZCgnLmNhcmQtYmxvY2snKS5hcHBlbmQoJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkRlc2NyaXB0aW9uPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRbMF0uZGVzY3JpcHRpb24rJzwvcD4nKTtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQmFuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xyXG5cclxuICAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAgIHZhciBpZCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9hcHBsaWNhdGlvbnMvJyArIGlkO1xyXG4gICAgfSk7XHJcbn07IiwiZnVuY3Rpb24gQmFuZE1lbWJlcihqc29uKXtcclxuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5iYW5kSWQgPSBqc29uLmJhbmRJZCB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnVzZXJuYW1lID0ganNvbi51c2VybmFtZSB8fCAnJztcclxuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcclxuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcclxuICAgIHRoaXMucm9sZSA9IGpzb24ucm9sZSB8fCAnJztcclxufVxyXG5cclxuQmFuZE1lbWJlci5ST0xFID0ge1xyXG4gICAgT1dORVIgOiAwLFxyXG4gICAgTUFOQUdFUjogMSxcclxuICAgIE1FTUJFUiA6IDIsXHJcbiAgICBQUk9NT1RFUiA6IDNcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQmFuZE1lbWJlcjsgfSIsImZ1bmN0aW9uIEZyaWVuZChqc29uKXtcclxuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XHJcbiAgICB0aGlzLnVzZXJOYW1lID0ganNvbi51c2VyTmFtZSB8fCAnJztcclxuICAgIHRoaXMuYmlvID0ganNvbi5iaW8gfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCAnJztcclxufVxyXG5cclxuRnJpZW5kLlNUQVRVUyA9IHtcclxuXHROT05FOiAwLCBcclxuXHRGUklFTkQ6IDEsIFxyXG5cdFJFUVVFU1RFRDogMiwgXHJcblx0UEVORElORzogMywgXHJcblx0QkxPQ0tFRDogNCBcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gRnJpZW5kOyB9IiwiZnVuY3Rpb24gTm90aWZpY2F0aW9uKCl7XHJcbiAgICB0aGlzLnVzZXJJZDtcclxuICAgIHRoaXMubWVzc2FnZTtcclxuICAgIHRoaXMubGluaztcclxuICAgIHRoaXMudW5yZWFkO1xyXG59XHJcbk5vdGlmaWNhdGlvbi5NU0dfVFlQRSA9IHtcclxuICAgIE5PX01FU1NBR0U6IDAsXHJcbiAgICBGUklFTkRfUkVRVUVTVDogMSxcclxuICAgIEZSSUVORF9BQ0NFUFRFRDogMixcclxuICAgIEJBTkRfSU5WSVRFOiAzLFxyXG4gICAgUkVNT1ZFRF9GUk9NX0JBTkQ6IDQsXHJcbiAgICBFVkVOVF9JTlZJVEU6IDUsXHJcbiAgICBFVkVOVF9SRU1JTkRFUjogNixcclxuICAgIEVSUk9SOiA3LFxyXG4gICAgU1VDQ0VTUzogOCxcclxuICAgIFdBUk5JTkc6IDlcclxufTtcclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApe1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBOb3RpZmljYXRpb247XHJcbn0iLCJmdW5jdGlvbiBTZWFyY2hlZEJhbmQoanNvbil7XHJcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xyXG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uU3RhdHVzID0ganNvbi5hcHBsaWNhdGlvblN0YXR1cyB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGpzb24uZGVzY3JpcHRpb24gfHwgJyc7XHJcbiAgICB0aGlzLmdlbnJlID0ganNvbi5nZW5yZSB8fCAnJztcclxufVxyXG5cclxuU2VhcmNoZWRCYW5kLlJPTEUgPSB7XHJcbiAgICBPV05FUjogMCxcclxuICAgIE1BTkFHRVI6IDEsXHJcbiAgICBNRU1CRVI6IDIsXHJcbiAgICBQUk9NT1RFUjogM1xyXG59XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hlZEJhbmQ7IH0iLCJmdW5jdGlvbiBTaW1wbGVCYW5kKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMub3duZXJOYW1lID0ganNvbi5vd25lck5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLm93bmVySWQgPSBqc29uLm93bmVySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XHJcbn1cclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUJhbmQ7IH0iLCIvKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gQXBwKCl7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgLy90aGlzLnBhZ2VIaXN0b3J5ID0gW107XHJcbn1cclxuQXBwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKFBhZ2VDb25zdHJ1Y3Rvcil7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IFBhZ2VDb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcclxufTtcclxuLypBcHAucHJvdG90eXBlLmNoYW5nZVBhZ2UgPSBmdW5jdGlvbiAocGFnZSwgZGF0YSl7XHJcbiAgICBpZiggdGhpcy5jdXJyZW50UGFnZSApe1xyXG4gICAgICAgIC8vc3RvcmUgdGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgbGFzdCBwYWdlXHJcbiAgICAgICAgdGhpcy5wYWdlSGlzdG9yeS5wdXNoKHRoaXMuY3VycmVudFBhZ2UuY29uc3RydWN0b3IpO1xyXG4gICAgICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICAvL2NyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbmV4dCBwYWdlXHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IHBhZ2UodGhpcyk7XHJcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XHJcbn07Ki8iLCIvKiBnbG9iYWwgJCAqL1xyXG4vKiogSW5oZXJpdGFibGUgQ2xhc3NlcyAqKi9cclxuZnVuY3Rpb24gUGFnZShhcHAsIGVsZW0sIGN0cmxDb25zdHJ1Y3Rvciwgdmlld0NvbnN0cnVjdG9yLCBjaGlsZENvbXBvbmVudHMpe1xyXG4gICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5jdHJsID0gbmV3IGN0cmxDb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHRoaXMudmlldyA9IG5ldyB2aWV3Q29uc3RydWN0b3IodGhpcyk7XHJcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50cyA9IGNoaWxkQ29tcG9uZW50cyB8fCB7fTtcclxufVxyXG5QYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBcclxuICAgIGZvciggdmFyIGNvbXBvbmVudCBpbiB0aGlzLmNoaWxkQ29tcG9uZW50cyApe1xyXG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRzW2NvbXBvbmVudF0uaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmN0cmwuaW5pdCgpXHJcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICB0aGF0LnZpZXcuaW5pdC5hcHBseSh0aGF0LnZpZXcsIGFyZ3VtZW50cyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFBhZ2VDdHJsKHBhZ2Upe1xyXG4gICAgdGhpcy5wYWdlID0gcGFnZTtcclxufVxyXG5QYWdlQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gUGFnZVZpZXcocGFnZSl7XHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG59XHJcblBhZ2VWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7fTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBNZW51Q29tcG9uZW50KGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKGRhdGEuZWxlbWVudClbMF0sIE1lbnVDdHJsLCBNZW51Vmlldyk7XHJcbn1cclxuTWVudUNvbXBvbmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuTWVudUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q29tcG9uZW50O1xyXG5cclxuZnVuY3Rpb24gTWVudUN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk1lbnVDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuTWVudUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudUN0cmw7XHJcbk1lbnVDdHJsLnByb3RvdHlwZS5sb2dvdXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICB1cmw6ICcvYXBpL2xvZ291dCdcclxuICAgIH0pLnRoZW4oZGVmZXIucmVzb2x2ZSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIE1lbnVWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5NZW51Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVWaWV3O1xyXG5NZW51Vmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyID0gJCh0aGlzLnBhZ2UuZWxlbSk7XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyID0gJCgnI21lbnVPdmVybGF5Jyk7XHJcbiAgICB0aGlzLnJlbmRlck1lbnUoKTtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5NZW51Vmlldy5wcm90b3R5cGUucmVuZGVyTWVudSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgXHJcbiAgICAvKiByZW5kZXIgb3ZlcmxheSAqL1xyXG4gICAgaWYoIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIubGVuZ3RoID09IDAgKXtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwibWVudU92ZXJsYXlcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PicpO1xyXG4gICAgICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIgPSAkKFwiI21lbnVPdmVybGF5XCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51XCI+PC9kaXY+Jyk7XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudVNlY3Rpb25cIj4nXHJcbiAgICAgICAgKyc8ZGl2IGNsYXNzPVwiYWN0aW9uIGxvZ291dCBidG4gYnRuLXNlY29uZGFyeVwiPkxvZ291dDwvZGl2PidcclxuICAgICsnPC9kaXY+Jyk7XHJcbiAgICBcclxuICAgIC8qIHJlbmRlciBtZW51IGJ1dHRvbiAqL1xyXG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLm1lbnVCdXR0b25Db250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudS10b2dnbGUgYnRuIGJ0bi1zZWNvbmRhcnkgZmEgZmEtYmFyc1wiPjwvZGl2PicpO1xyXG59O1xyXG5NZW51Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICAgICAgdmlldyA9IHRoaXM7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcubWVudS10b2dnbGUnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdmlldy52aXNpYmxlID0gIXZpZXcudmlzaWJsZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiggdmlldy52aXNpYmxlICl7XHJcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUgLmxvZ291dCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2aWV3LnBhZ2UuY3RybC5sb2dvdXQoKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2xvZ2luJztcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgJy5tZW51JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZpZXcudmlzaWJsZSA9ICF2aWV3LnZpc2libGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xyXG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG52YXIgc2VhcmNoaW5nID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBBZGRGcmllbmRQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkRnJpZW5kUGFnZScpWzBdLCBBZGRGcmllbmRDdHJsLCBBZGRGcmllbmRWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZEZyaWVuZFBhZ2U7XHJcblxyXG5mdW5jdGlvbiBBZGRGcmllbmRDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuZnJpZW5kcyA9IFtdO1xyXG59XHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZEZyaWVuZEN0cmw7XHJcblxyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGF0LmZyaWVuZHMgPSBbXTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3NlYXJjaCcsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XHJcbiAgICAgICAgdGhhdC5wYWdlLnZpZXcudXBkYXRlVXNlckxpc3QoKTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSByZWxhdGlvbiBiZXR3ZWVuIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoZSBcInRvXCIgdXNlclxyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7dG9Vc2VySWQgOiB0b1VzZXJJZCwgc3RhdHVzIDogc3RhdHVzfVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEFkZEZyaWVuZFZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZEZyaWVuZFZpZXc7XHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgXHJcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXByZXNzJywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgaWYgKHNlYXJjaGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgc2VhcmNoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3VibWl0dGluZyB0aGUgc2VhcmNoIHN0cmluZ1xyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgZnJpZW5kIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgXHJcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIEhhbmRsZSBibG9jayByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIHVuYmxvY2sgcmVxdWVzdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIGNhbmNlbCByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkNhbmNlbFJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAwKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICBcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BY2NlcHRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAxKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXHJcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgZnJpZW5kIHJlamVjdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAwKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICBcclxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBIYW5kbGUgdW5mcmllbmRcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAwKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXHJcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSkgICAgXHJcbn07XHJcblxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS51cGRhdGVVc2VyTGlzdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcclxuICAgIHZhciBmcmllbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmQtbW9kYWwnKTtcclxuICAgIHZhciBtb2RhbEJ1dHRvbnMgPSAnJztcclxuICAgIHZhciBjb2xvclNjaGVtYSA9ICcnO1xyXG4gICAgdmFyIGJhZGdlID0gJyc7XHJcblxyXG4gICAgLy8gQ2xlYXIgYW55IGN1cnJlbnQgY2FyZHMgZnJvbSBwcmV2aW91cyBzZWFyY2hcclxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XHJcbiAgICAkKCcubW9kYWwnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBzdGF0dXNcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdmcmllbmQnKSB7XHJcbiAgICAgICAgICAgIGNvbG9yU2NoZW1hID0gJ1wiY2FyZCBjYXJkLXN1Y2Nlc3NcIiBzdHlsZT1cIndpZHRoOiA1MHJlbTsgY3Vyc29yOiBwb2ludGVyXCInO1xyXG4gICAgICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0blVuZnJpZW5kTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5mcmllbmQ8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5CbG9ja01vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcclxuICAgICAgICAgICAgY29sb3JTY2hlbWEgPSAnXCJjYXJkIGNhcmQtaW5mb1wiIHN0eWxlPVwid2lkdGg6IDUwcmVtOyBjdXJzb3I6IHBvaW50ZXJcIic7XHJcbiAgICAgICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsUmVxdWVzdE1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQmxvY2tNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxyXG4gICAgICAgICAgICBjb2xvclNjaGVtYSA9ICdcImNhcmQgY2FyZC13YXJuaW5nXCIgc3R5bGU9XCJ3aWR0aDogNTByZW07IGN1cnNvcjogcG9pbnRlclwiJztcclxuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BY2NlcHRNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuUmVqZWN0TW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQmxvY2tNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbG9yU2NoZW1hID0gJ1wiY2FyZCBjYXJkLWludmVyc2VcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICMzMzM7IGJvcmRlci1jb2xvcjogIzMzMzsgd2lkdGg6IDUwcmVtOyBjdXJzb3I6IHBvaW50ZXJcIic7XHJcbiAgICAgICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuVW5ibG9ja01vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICBjb2xvclNjaGVtYSA9ICdcImNhcmQgY2FyZC1wcmltYXJ5XCIgc3R5bGU9XCJ3aWR0aDogNTByZW07IGN1cnNvcjogcG9pbnRlclwiJztcclxuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5SZXF1ZXN0TW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5CbG9ja01vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9Jytjb2xvclNjaGVtYSsnIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNtb2RhbCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0ubmFtZSsnKTwvc21hbGw+JytiYWRnZSsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2g0PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+PHAvPicpO1xyXG4gICAgICAgIC8vIEFkZCBtb2RhbCBmb3IgZWFjaCB1c2VyXHJcbiAgICAgICAgZnJpZW5kTW9kYWwuYXBwZW5kKCc8ZGl2IGlkPVwibW9kYWwnK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uaWQrJ1wiIGNsYXNzPVwibW9kYWwgZmFkZVwiIHJvbGU9XCJkaWFsb2dcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnVzZXJOYW1lKyc8L2g0PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxwPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKyc8L3A+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHA+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmJpbysnPC9wPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+Jyttb2RhbEJ1dHRvbnMrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+Jyk7XHJcbiAgICB9XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb25zUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FwcGxpY2F0aW9uc1BhZ2UnKVswXSwgQXBwbGljYXRpb25zQ3RybCwgQXBwbGljYXRpb25zVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNQYWdlO1xyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb25zQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9ucyA9IFtdO1xyXG59XHJcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFwcGxpY2F0aW9uc0N0cmw7XHJcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICB2YXIgaWQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9hcHBsaWNhdGlvbnMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBkYXRhO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIHRoYXQuYXBwbGljYXRpb25zID0gW107XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5wcm9jZXNzQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMpIHtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICB2YXIgaWQgPSB1cmwuc3Vic3RyaW5nKHVybC5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcblxyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycraWQrJy9wcm9jZXNzYXBwbGljYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7YXBwbGljYXRpb25JZCA6IGFwcGxpY2F0aW9uSWQsIHByb2Nlc3NTdGF0dXMgOiBwcm9jZXNzU3RhdHVzLCBhcHBsaWNhdGlvblN0YXR1cyA6IGFwcGxpY2F0aW9uU3RhdHVzfVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1ZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFwcGxpY2F0aW9uc1ZpZXc7XHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBhcHBsaWNhdGlvbnNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9ucycpO1xyXG4gICAgdmFyIGJhZGdlID0gJyc7XHJcblxyXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NQU5BR0VSKSB7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5NYW5hZ2VyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUVNQkVSKSB7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5NZW1iZXInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9QUk9NT1RFUikge1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+UHJvbW90ZXInO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXBwbGljYXRpb25zRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJhcHBsaWNhdGlvbiBidG4gYnRuLXNlY29uZGFyeVwiIGRhdGEtYXBwbGljYXRpb24taWQ9XCInK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5pZCsnXCIgZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXM9XCInK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMrJ1wiPicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnVzZXJuYW1lKycgPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyc8L2Rpdj48cC8+Jyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb24nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgcGFnZS52aWV3LnNob3dBcHBsaWNhdGlvbk1vZGFsKHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwxMCkscGFyc2VJbnQoJChlLnRhcmdldCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwxMCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGZyaWVuZCBhY2NlcHRcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQWNjZXB0JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcpLDEwKTtcclxuICAgICAgICBhcHBsaWNhdGlvblN0YXR1cyA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLDEwKTtcclxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5BQ0NFUFRFRCwgYXBwbGljYXRpb25TdGF0dXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyBcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blJlamVjdCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwxMCk7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdGF0dXMgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwxMCk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnByb2Nlc3NBcHBsaWNhdGlvbihhcHBsaWNhdGlvbklkLCBBcHBsaWNhdGlvbi5TVEFUVVMuUkVKRUNURUQsIGFwcGxpY2F0aW9uU3RhdHVzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufTtcclxuXHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcclxuICAgIHZhciB0aGlzQXBwbGljYXRpb24gPSB0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhcHBsaWNhdGlvbil7XHJcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uLmlkID09IGFwcGxpY2F0aW9uSWQ7XHJcbiAgICB9KVswXTtcclxuICAgIFxyXG4gICAgdmFyIGFwcGxpY2F0aW9uTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYXBwbGljYXRpb24tbW9kYWwnKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcsdGhpc0FwcGxpY2F0aW9uLmlkKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnLHRoaXNBcHBsaWNhdGlvbi5zdGF0dXMpO1xyXG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNBcHBsaWNhdGlvbi5uYW1lKycgLSAnK3RoaXNBcHBsaWNhdGlvbi51c2VybmFtZSk7XHJcbiAgICBhcHBsaWNhdGlvbk1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+SW5zdHJ1bWVudDogJyt0aGlzQXBwbGljYXRpb24uaW5zdHJ1bWVudCsnPC9wPjxwPk1lc3NhZ2U6ICcrdGhpc0FwcGxpY2F0aW9uLm1lc3NhZ2UpO1xyXG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIEJhbmRzUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2JhbmRzUGFnZScpWzBdLCBCYW5kc0N0cmwsIEJhbmRzVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuQmFuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5CYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNQYWdlO1xyXG5cclxuZnVuY3Rpb24gQmFuZHNDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuYmFuZHMgPSBbXTtcclxufVxyXG5CYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5CYW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNDdHJsO1xyXG5CYW5kc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuYWpheCgnL2FwaS9iYW5kcycsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmJhbmRzID0gZGF0YTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICB0aGF0LmJhbmRzID0gW107XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBCYW5kc1ZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkJhbmRzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkJhbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kc1ZpZXc7XHJcbkJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGJhbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kcycpO1xyXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmJhbmRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJhbmQgYnRuIGJ0bi1zZWNvbmRhcnlcIiBpZD0nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmlkKyc+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5iYW5kTmFtZSsnIDxzbWFsbD4ob3duZWQgYnk6ICcrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ub3duZXJOYW1lKycpPC9zbWFsbD48L2Rpdj4nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLnJlZ2lzdGVyLWJhbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy9yZWdpc3Rlcic7XHJcbiAgICB9KTtcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYmFuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL2JhbmQvJyArIGUudGFyZ2V0LmlkO1xyXG4gICAgfSlcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcblxyXG5mdW5jdGlvbiBGcmllbmRzUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ZyaWVuZHNQYWdlJylbMF0sIEZyaWVuZHNDdHJsLCBGcmllbmRzVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuRnJpZW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkZyaWVuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNQYWdlO1xyXG5cclxuZnVuY3Rpb24gRnJpZW5kc0N0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5mcmllbmRzID0gW107XHJcbn1cclxuRnJpZW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5GcmllbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzQ3RybDtcclxuRnJpZW5kc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHRoYXQuZnJpZW5kcyA9IFtdO1xyXG4gICAgJC5hamF4KCcvYXBpL2ZyaWVuZHMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5mcmllbmRzID0gZGF0YTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5GcmllbmRzQ3RybC5wcm90b3R5cGUudXBkYXRlU3RhdHVzID0gZnVuY3Rpb24gKHRvVXNlcklkLCBzdGF0dXMpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2ZyaWVuZHMvdXBkYXRlc3RhdHVzJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge3RvVXNlcklkIDogdG9Vc2VySWQsIHN0YXR1cyA6IHN0YXR1c31cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBGcmllbmRzVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5GcmllbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzVmlldztcclxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBmcmllbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmRzJyk7XHJcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XHJcbiAgICB2YXIgbW9kYWxCdXR0b25zID0gJyc7XHJcbiAgICB2YXIgY29sb3JTY2hlbWEgPSAnJztcclxuICAgIHZhciBiYWRnZSA9ICcnO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnZnJpZW5kJykge1xyXG4gICAgICAgICAgICBjb2xvclNjaGVtYSA9ICdcImNhcmQgY2FyZC1zdWNjZXNzXCIgc3R5bGU9XCJ3aWR0aDogNTByZW07IGN1cnNvcjogcG9pbnRlclwiJztcclxuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5VbmZyaWVuZE1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JztcclxuICAgICAgICB9XHJcbiAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcclxuICAgICAgICAgICAgY29sb3JTY2hlbWEgPSAnXCJjYXJkIGNhcmQtaW5mb1wiIHN0eWxlPVwid2lkdGg6IDUwcmVtOyBjdXJzb3I6IHBvaW50ZXJcIic7XHJcbiAgICAgICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsUmVxdWVzdE1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQmxvY2tNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXHJcbiAgICAgICAgICAgIGNvbG9yU2NoZW1hID0gJ1wiY2FyZCBjYXJkLXdhcm5pbmdcIiBzdHlsZT1cIndpZHRoOiA1MHJlbTsgY3Vyc29yOiBwb2ludGVyXCInO1xyXG4gICAgICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkFjY2VwdE1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5SZWplY3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5CbG9ja01vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdibG9ja2VkJykge1xyXG4gICAgICAgICAgICBjb2xvclNjaGVtYSA9ICdcImNhcmQgY2FyZC1pbnZlcnNlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzOyBib3JkZXItY29sb3I6ICMzMzM7IHdpZHRoOiA1MHJlbTsgY3Vyc29yOiBwb2ludGVyXCInO1xyXG4gICAgICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0blVuYmxvY2tNb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZyaWVuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz0nK2NvbG9yU2NoZW1hKycgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI21vZGFsJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnVzZXJOYW1lK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9oND4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PjxwLz4nKTtcclxuLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrIGJhbmRzJytpKydcIj4nKTtcclxuICAgICAgICB2YXIgYmFuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmRzJytpKTtcclxuICAgICAgICBmb3IoIHZhciBqPTA7IGo8dGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5iYW5kcy5sZW5ndGg7IGorKyApe1xyXG4gICAgICAgICAgICBiYW5kc0VsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiYmFuZCBidG4gYnRuLXNlY29uZGFyeVwiIGlkPScrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5iYW5kc1tqXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5iYW5kc1tqXS5iYW5kTmFtZSsnPC9kaXY+PHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDFyZW07XCI+PC9zcGFuPicpO1xyXG4gICAgICAgIH0gICAqLyBcclxuICAgIC8vICAgIGZyaWVuZHNFbGVtLmFwcGVuZCgnPC9kaXY+PC9kaXY+PHAvPicpO1xyXG5cclxuICAgICAgICBmcmllbmRNb2RhbC5hcHBlbmQoJzxkaXYgaWQ9XCJtb2RhbCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCIgY2xhc3M9XCJtb2RhbCBmYWRlXCIgcm9sZT1cImRpYWxvZ1wiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2dcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrJzwvaDQ+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHA+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJzwvcD4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8cD4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uYmlvKyc8L3A+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nK21vZGFsQnV0dG9ucytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nKTtcclxuICAgIH1cclxuICAgXHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYWRkLWZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZnJpZW5kcy8nICsgZS50YXJnZXQuaWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAncmVxdWVzdGVkJylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5CbG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRvVXNlcklkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIDMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0blVuYmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAwKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgIFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7ICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5DYW5jZWxSZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICBcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQWNjZXB0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICBcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdG9Vc2VySWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQ7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgMClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICBcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBhbGVydChcIkVycm9yIVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0b1VzZXJJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZDtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCAwKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICBcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7ICAgICAgICBcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG4vKipcclxuICogUEFHRVxyXG4gKiAqL1xyXG5mdW5jdGlvbiBMb2dpblBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNsb2dpblBhZ2UnKVswXSwgTG9naW5DdHJsLCBMb2dpblZpZXcpO1xyXG59XHJcbkxvZ2luUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuTG9naW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luUGFnZTtcclxuXHJcbi8qKlxyXG4gKiBDT05UUk9MTEVSXHJcbiAqICovXHJcbmZ1bmN0aW9uIExvZ2luQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmxvZ2dpbmdJbiA9IGZhbHNlO1xyXG59XHJcbkxvZ2luQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkxvZ2luQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpbkN0cmw7XHJcblxyXG5Mb2dpbkN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZJRVdFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBMb2dpblZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbkxvZ2luVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkxvZ2luVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpblZpZXc7XHJcbkxvZ2luVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5Mb2dpblZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxyXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICAgICAgXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5sb2dnaW5nSW4gKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwYWdlLmN0cmwubG9nZ2luZ0luID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xyXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXHJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cclxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9tYWluJztcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwubG9nZ2luZ0luID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIE1haW5QYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbWFpblBhZ2UnKVswXSwgTWFpbkN0cmwsIE1haW5WaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5NYWluUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuTWFpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblBhZ2U7XHJcblxyXG5mdW5jdGlvbiBNYWluQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTWFpbkN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5NYWluQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluQ3RybDtcclxuXHJcbmZ1bmN0aW9uIE1haW5WaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5NYWluVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbk1haW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5WaWV3O1xyXG5NYWluVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5iYW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcclxuICAgIH0pO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMnO1xyXG4gICAgfSk7XHJcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5hZGQtZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcclxuICAgIH0pO1xyXG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuc2VhcmNoLWJhbmRzJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvc2VhcmNoJztcclxuICAgIH0pO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbi8qKlxyXG4gKiBQQUdFXHJcbiAqICovXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyUGFnZScpWzBdLCBSZWdpc3RlckN0cmwsIFJlZ2lzdGVyVmlldyk7XHJcbn1cclxuUmVnaXN0ZXJQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5SZWdpc3RlclBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJQYWdlO1xyXG5cclxuLyoqXHJcbiAqIENPTlRST0xMRVJcclxuICogKi9cclxuZnVuY3Rpb24gUmVnaXN0ZXJDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcclxufVxyXG5SZWdpc3RlckN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5SZWdpc3RlckN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJDdHJsO1xyXG5cclxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9yZWdpc3RlcicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBkZWZlci5yZWplY3QoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWSUVXRVJcclxuICogKi9cclxuZnVuY3Rpb24gUmVnaXN0ZXJWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJWaWV3O1xyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXHJcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxyXG4gICAgICAgIHBhZ2UuY3RybC5yZWdpc3Rlcih0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlJlZ2lzdHJhdGlvbiBTdWNjZXNzZnVsITwvc3Ryb25nPiBSZWRpcmVjdGluZyBpbiAyIHNlY29uZHMuLi4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKVxyXG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyQmFuZFBhZ2UnKVswXSwgUmVnaXN0ZXJCYW5kQ3RybCwgUmVnaXN0ZXJCYW5kVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRQYWdlO1xyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XHJcbn1cclxuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kQ3RybDtcclxuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvcmVnaXN0ZXInLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRWaWV3O1xyXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlLFxyXG4gICAgICAgIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBpZiggcGFnZS5jdHJsLnJlZ2lzdGVyaW5nICl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xyXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXHJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cclxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IHJlZ2lzdGVyIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXHJcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXHJcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xyXG4gICAgICAgICAgICArJzwvZGl2PicpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtdGltZXMnKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkJhbmQgUmVnaXN0cmF0aW9uIEZhaWxlZCE8L3N0cm9uZz4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbnZhciBzZWFyY2hpbmcgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIFNlYXJjaEJhbmRzUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3NlYXJjaEJhbmRzUGFnZScpWzBdLCBTZWFyY2hCYW5kc0N0cmwsIFNlYXJjaEJhbmRzVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5TZWFyY2hCYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNQYWdlO1xyXG5cclxuZnVuY3Rpb24gU2VhcmNoQmFuZHNDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuYmFuZHMgPSBbXTtcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gZmFsc2U7XHJcbn1cclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzQ3RybDtcclxuXHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgdGhhdC5iYW5kcyA9IFtdO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3NlYXJjaCcsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xyXG4gICAgICAgIHRoYXQucGFnZS52aWV3LnVwZGF0ZUJhbmRMaXN0KCk7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vLyBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgcmVsYXRpb24gdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGUgc2VsZWN0ZWQgYmFuZFxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnN1Ym1pdEFwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3N1Ym1pdEFwcGxpY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7IFxyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLy8gVGhpcyBtZXRob2Qgd2lsbCBkZWxldGUgdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGlzIGJhbmRcclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jYW5jZWxBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChiYW5kSWQpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL2NhbmNlbEFwcGxpY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge2JhbmRJZCA6IGJhbmRJZH1cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmV4cGFuZEJhbmRNb2RhbCA9IGZ1bmN0aW9uKGFwcGxpY2F0aW9uVHlwZSwgYXBwbGljYXRpb25TdGF0dXMsIGJhbmRJZCkge1xyXG4gICAgJCgnLm1vZGFsLWJvZHknKS5yZW1vdmUoKTtcclxuICAgICQoJy5tb2RhbC1mb290ZXInKS5yZW1vdmUoKTsgICAgXHJcblxyXG4gICAgdmFyIGJhbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5tb2RhbC1jb250ZW50Jyk7XHJcbiAgICB2YXIgYmFuZE5hbWUgPSBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCgpO1xyXG4gICAgdmFyIGluc3RydW1lbnRGaWVsZCA9ICcnO1xyXG5cclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKGJhbmROYW1lKyc8YnIvPicrYXBwbGljYXRpb25UeXBlKycgQXBwbGljYXRpb24nKTtcclxuXHJcbiAgICBpZiAoYXBwbGljYXRpb25UeXBlID09PSAnTWVtYmVyJykge1xyXG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJpbnN0cnVtZW50XCIgcGxhY2Vob2xkZXI9XCJJbnN0cnVtZW50XCIgLz48cC8+JztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnN0cnVtZW50XCIgdmFsdWU9XCJOL0FcIi8+PHAvPic7ICBcclxuICAgIH1cclxuXHJcbiAgICBiYW5kTW9kYWwuYXBwZW5kKCcnK1xyXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+JytcclxuICAgICAgICAnPGZvcm0gaWQ9XCJhcHBseS1mb3JtXCIgY2xhc3M9XCJhcHBseS1mb3JtXCIgb25zdWJtaXQ9XCJyZXR1cm5cIj4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1bWVudEZpZWxkK1xyXG4gICAgICAgICAgICAgICAgJzxpbnB1dCByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm1lc3NhZ2VcIiBwbGFjZWhvbGRlcj1cIk1lc3NhZ2VcIiAvPicrXHJcbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYmFuZElkXCIgdmFsdWU9XCInK2JhbmRJZCsnXCIgLz4nK1xyXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImFwcGxpY2F0aW9uU3RhdHVzXCIgdmFsdWU9XCInK2FwcGxpY2F0aW9uU3RhdHVzKydcIiAvPicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Zvcm0+JytcclxuICAgICc8L2Rpdj4nK1xyXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nKyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgZm9ybT1cImFwcGx5LWZvcm1cIj4nK1xyXG4gICAgICAgICAgICAgICAgJ1N1Ym1pdCcrXHJcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+JytcclxuICAgICAgICAnPC9kaXY+JysgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgJzwvZGl2PicpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gU2VhcmNoQmFuZHNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHVuZGVmaW5lZDtcclxufVxyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNWaWV3O1xyXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICBcclxuICAgIC8vIFRoaXMgd2lsbCBydW4gYSBzZWFyY2ggZXZlcnkgc2Vjb25kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleS4gXHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCAnLnNlYXJjaC1mb3JtIGlucHV0JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZhciB0aGlzRm9ybSA9ICQodGhpcyk7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0KTtcclxuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzRm9ybS5zdWJtaXQoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3VibWl0dGluZyB0aGUgc2VhcmNoIHN0cmluZ1xyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC1mb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgXHJcbiAgICAgICAgcGFnZS5jdHJsLnNlYXJjaCh0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpeyAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uYXBwbHktZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICAgXHJcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTsgICBcclxuICAgICAgICBwYWdlLmN0cmwuc3VibWl0QXBwbGljYXRpb24odGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgLy9oYW5kbGUgdGhlIGFwcGxpY2F0aW9uIHJlc3VsdFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuICAgIC8vIFRvZ2dsZSBCYW5kIE1vZGFsXHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYmFuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBwYWdlLnZpZXcuc2hvd0JhbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbWFuYWdlciBhcHBsaWNhdGlvbiByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWFuYWdlcicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcclxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdNYW5hZ2VyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUiwgYmFuZElkKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIG1lbWJlciBhcHBsaWNhdGlvbiByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWVtYmVyJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxyXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ01lbWJlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUiwgYmFuZElkKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIHByb21vdGVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlQcm9tb3RlcicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcclxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdQcm9tb3RlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX1BST01PVEVSLCBiYW5kSWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGFwcGxpY2F0aW9uIGNhbmNlbCByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXHJcbiAgICAgICAgcGFnZS5jdHJsLmNhbmNlbEFwcGxpY2F0aW9uKGJhbmRJZClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKnBhZ2VFbGVtLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAnI21vZGFsNycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJhbmRMaXN0O1xyXG4gICAgfSk7Ki9cclxufTtcclxuXHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUudXBkYXRlQmFuZExpc3QgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcclxuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcclxuICAgIHZhciBiYWRnZSA9ICcnO1xyXG5cclxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXHJcbiAgICAkKCcuY2FyZCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xyXG5cclxuICAgICAgICAvLyBJZiB5b3UgaGF2ZSBhIHJvbGUgdGhlbiB5b3UgYXJlIGluIHRoZSBiYW5kLCBzbyBubyBtb2RhbCBidXR0b25zXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLnJvbGUgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gYXBwbGljYXRpb24gc3RhdHVzIGlmIHRoZXkgZG8gbm90IGhhdmUgYSByb2xlIGluIHRoZSBiYW5kXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ3JlamVjdGVkJykgeyBcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCBiYW5kXHJcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnJytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImJhbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1iYW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnXCIgPicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmdlbnJlKycpPC9zbWFsbD4nK2JhZGdlK1xyXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcclxuICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcclxuICAgIH1cclxufTtcclxuXHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuc2hvd0JhbmRNb2RhbCA9IGZ1bmN0aW9uIChiYW5kSWQpe1xyXG4gICAgdmFyIHRoaXNCYW5kID0gdGhpcy5wYWdlLmN0cmwuYmFuZHMuZmlsdGVyKGZ1bmN0aW9uIChiYW5kKXtcclxuICAgICAgICByZXR1cm4gYmFuZC5pZCA9PSBiYW5kSWQ7XHJcbiAgICB9KVswXSxcclxuICAgICAgICBtb2RhbEJ1dHRvbnM7XHJcbiAgICBcclxuICAgIGlmICh0aGlzQmFuZC5yb2xlICE9ICdub25lJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNYW5hZ2VyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNZW1iZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUHJvbW90ZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdyZWplY3RlZCcpIHsgXHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BcHBseU1hbmFnZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWFuYWdlcjwvYnV0dG9uPicrIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlNZW1iZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWVtYmVyPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5UHJvbW90ZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgUHJvbW90ZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgYmFuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQtbW9kYWwnKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnLHRoaXNCYW5kLmlkKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNCYW5kLmJhbmROYW1lKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0JhbmQuZGVzY3JpcHRpb24rJzwvcD4nKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtZm9vdGVyJykuaHRtbCgnPGRpdiBjbGFzcz1cImR5bmFtaWMtYnV0dG9uc1wiPjwvZGl2PjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcclxufTsiXX0=
