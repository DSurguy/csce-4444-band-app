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

function Inventory(json){
    this.itemId = json.itemId || 0;
    this.size = json.size || '';
    this.color = json.color || '';
    this.quantity = json.quantity || 0;
}
;//bundle semicolon

function Item(json) {
    this.id = json.id || 0;
    this.name = json.name || '';
    this.type = json.type || '';
    this.description = json.description || '';
    this.imagePath = json.imagePath || '';
    this.imageFile = json.imageFile || undefined;
    this.price = json.price || 0;
    this.inventory = json.inventory || undefined;
}
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
    
    $.ajax({
        url: '/api/friends/search',
        type: 'POST',
        data: $(form).serialize()
    })
    .then(function (data){
        that.friends = data;
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};

// This method will update the relation between the current user and the "to" user
AddFriendCtrl.prototype.updateStatus = function (toUserId, status){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/friends/updatestatus',
        type: 'POST',
        data: {toUserId : toUserId, status : status}
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
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
        .then(function () {
            page.view.updateUserList();
        })
        .fail(console.error);
    });
    
    pageElem.on('click', '.friend', function (e){
        page.view.showFriendModal(parseInt($(this).attr('data-friend-id'), 10));
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

/**
 * PAGE
 * */
function AddMerchPage(app, data){
    Page.call(this, app, $('#addMerchPage')[0], AddMerchCtrl, AddMerchView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
AddMerchPage.prototype = Object.create(Page.prototype);
AddMerchPage.prototype.constructor = AddMerchPage;

/**
 * CONTROLLER
 * */
function AddMerchCtrl(page){
    PageCtrl.call(this, page);
    this.addmerching = false;
}
AddMerchCtrl.prototype = Object.create(PageCtrl.prototype);
AddMerchCtrl.prototype.constructor = AddMerchCtrl;

AddMerchCtrl.prototype.submitMerch = function (form){
    var defer = $.Deferred();
    
    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];
    var that = this;
    
     var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+id+'/addmerch',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};

/**
 * VIEWER
 * */
function AddMerchView(page){
    PageView.call(this, page);
}
AddMerchView.prototype = Object.create(PageView.prototype);
AddMerchView.prototype.constructor = AddMerchView;
AddMerchView.prototype.init = function (){
    this.bindEvents();
    $(this.page.elem).find('[name="addInventory"]').prop('disabled', true);
};

AddMerchView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        page = this.page;

    pageElem.on('click', '[name="addInventory"]', function (e){
        e.preventDefault();
        e.stopPropagation();
        
        var select = pageElem.find('[name="merchType"]');
        page.view.addInventoryFields(select[0].value);
    });

    // We've picked a type so enable the Add Inventory button and remove any existing fields from other types
    pageElem.on('change', '[name="merchType"]', function (e){
        pageElem.find('[name="addInventory"]').prop('disabled', false);
        pageElem.find('.dynamicFields').remove();
    });

    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.submitMerch(this)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });
};

AddMerchView.prototype.addInventoryFields = function (type){
    var pageElem = $(this.page.elem),
    page = this.page;

    var typeFields = '';

    if (type === 'shirt') {
        typeFields = '<select class="form-control dynamicFields" required name="size">'+
                        '<option disabled selected>Select a size</option>'+
                        '<option value="s">S</option>'+
                        '<option value="m">M</option>'+
                        '<option value="l">L</option>'+
                        '<option value="xl">XL</option>'+
                    '</select>';
                    
    }
    else if (type === 'cd') {
        typeFields = '<input class"form-control" type="hidden" name="size" value="none" />';
    }
    else if (type === 'sticker') {
        typeFields = '<select class="form-control dynamicFields" required name="size">'+
                        '<option disabled selected>Select a size</option>'+
                        '<option value="1x1">1x1</option>'+
                        '<option value="2x2">2x2</option>'+
                        '<option value="3x4">3x4</option>'+
                        '<option value="5x6">5x6</option>'+
                    '</select>';
    }

    // All types will have a quantity and color
    typeFields += '<input class="form-control dynamicFields" required type="text" name="color" placeholder="Color" />'+
                  '<input class="form-control dynamicFields" required type="number" name="quantity" min="0" step="1" placeholder="Quantity">';

    var typeFieldsDiv = $(this.page.elem).find('.dynamicFieldsContainer');
    typeFieldsDiv.append(typeFields);
}
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
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    // Handle friend accept
    pageElem.on('click', '#btnReject', function (e){
        e.preventDefault();
        e.stopPropagation();
        
        var applicationId = parseInt($(this).parents('.modal').attr('data-application-id'), 10);
        var applicationStatus = parseInt($(this).parents('.modal').attr('data-application-status'), 10);
        
        page.ctrl.processApplication(applicationId, Application.STATUS.REJECTED, applicationStatus)
        .then(function (){
            window.location.reload();
        })
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
    }).catch(defer.reject);
    
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
        bandsElem.append('<div class="band btn btn-secondary" data-band-id='+this.page.ctrl.bands[i].id+'>'+this.page.ctrl.bands[i].bandName+' <small>(owned by: '+this.page.ctrl.bands[i].ownerName+')</small></div>');
    }
    
    this.bindEvents();
};

BandsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem);
    
    pageElem.on('click', '.register-band', function (e){
        window.location = '/bands/register';
    });
    pageElem.on('click', '.band', function (e){
        window.location = '/bands/' + $(this).attr('data-band-id');
    });
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
    
    $.ajax('/api/friends', {
        method: 'GET'
    }).then(function (data){
        that.friends = data;
        defer.resolve();
    })
    .catch(defer.reject);

    return defer.promise();
};

FriendsCtrl.prototype.updateStatus = function (toUserId, status){
    var defer = $.Deferred();
    
    $.ajax({
        url: '/api/friends/updatestatus',
        type: 'POST',
        data: {toUserId : toUserId, status : status}
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
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
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnBlockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.PENDING)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnUnblockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnCancelRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnAcceptModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.FRIEND)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnRejectModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnUnfriendModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-friend-id');
        page.ctrl.updateStatus(toUserId, Friend.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
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

function InventoryPage(app, data){
    Page.call(this, app, $('#inventoryPage')[0], InventoryCtrl, InventoryView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
InventoryPage.prototype = Object.create(Page.prototype);
InventoryPage.prototype.constructor = InventoryPage;

function InventoryCtrl(page){
    PageCtrl.call(this, page);
    this.itemInventory = [];
}
InventoryCtrl.prototype = Object.create(PageCtrl.prototype);
InventoryCtrl.prototype.constructor = InventoryCtrl;
InventoryCtrl.prototype.init = function (){
   var defer = $.Deferred();

    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];
    var that = this; 
    
    var that = this;
    $.ajax('/api/bands/'+id+'/inventory', {
        method: 'GET'
    }).then(function (data){
        that.itemInventory = data;
        defer.resolve();
    }).catch(defer.reject);
    
    return defer.promise();
};

function InventoryView(page){
    PageView.call(this, page);
}
InventoryView.prototype = Object.create(PageView.prototype);
InventoryView.prototype.constructor = InventoryView;
InventoryView.prototype.init = function (){
    this.bindEvents();
/*    var inventoryElem = $(this.page.elem).find('.inventory');

    for( var i=0; i<this.page.ctrl.inventory.length; i++ ){
        inventoryElem.append(''+
        '<div class="card" style="width: 20rem;">'+
            '<img class="card-img-top" src="..." alt="Card image cap">'+
            '<div class="card-block">'+
                '<h4 class="card-title">Card title</h4>'+
                '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>'+
            '</div>'+
            '<ul class="list-group list-group-flush">'+
                '<li class="list-group-item">Cras justo odio</li>'+
                '<li class="list-group-item">Dapibus ac facilisis in</li>'+
                '<li class="list-group-item">Vestibulum at eros</li>'+
            '</ul>'+
            '<div class="card-block">'+
                '<a href="#" class="card-link">Card link</a>'+
                '<a href="#" class="card-link">Another link</a>'+
            '</div>'+
        '</div>');
    }*/
};

InventoryView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;

    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];
    var that = this;
    
    pageElem.on('click', '.add-merch', function (e){
        window.location = '/bands/'+id+'/addmerch';
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
        }).fail(function (){
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
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
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
        }).fail(function (){
            submitButton.removeClass('btn-primary').addClass('btn-danger');
            submitButton.find('div').removeClass('fa-spinner animation-spin').addClass('fa-times');
            
            setTimeout(function (){
                submitButton.html('Login').addClass('btn-primary').removeClass('btn-danger');
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
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global MenuComponent */
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
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
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
        }).catch(function (){
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJpbnZlbnRvcnkuanMiLCJpdGVtLmpzIiwibm90aWZpY2F0aW9uLmpzIiwic2VhcmNoZWRCYW5kLmpzIiwic2ltcGxlQmFuZC5qcyIsImFwcC5qcyIsInBhZ2UuanMiLCJtZW51LmpzIiwiYWRkRnJpZW5kLmpzIiwiYWRkTWVyY2guanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBYnBKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBY2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QVp0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QWFoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEFwcGxpY2F0aW9uKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy51c2VybmFtZSA9IGpzb24udXNlcm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcclxuICAgIHRoaXMubWVzc2FnZSA9IGpzb24ubWVzc2FnZSB8fCAnJztcclxufVxyXG5cclxuQXBwbGljYXRpb24uU1RBVFVTID0ge1xyXG5cdE5PTkU6IDAsIFxyXG4gICAgQVBQTElFRF9NQU5BR0VSOiAxLFxyXG4gICAgQVBQTElFRF9NRU1CRVI6IDIsXHJcbiAgICBBUFBMSUVEX1BST01PVEVSOiAzLFxyXG5cdEFDQ0VQVEVEOiA0LCBcclxuXHRSRUpFQ1RFRDogNSxcclxuICAgIEJMT0NLRUQ6IDZcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IH0iLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBCYW5kUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2JhbmRQYWdlJylbMF0sIEJhbmRDdHJsLCBCYW5kVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuQmFuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkJhbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRQYWdlO1xyXG5cclxuZnVuY3Rpb24gQmFuZEN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5iYW5kID0ge307XHJcbn1cclxuQmFuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5CYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kQ3RybDtcclxuQmFuZEN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcclxuXHJcbiAgICAvL3ZhciBpZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycgKyBpZCwge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuYmFuZCA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5CYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkJhbmRWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRWaWV3O1xyXG5CYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGJhbmRFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQnKTtcclxuICAgIGJhbmRFbGVtLmFwcGVuZCgnPGgyIGNsYXNzPVwiY2FyZC10aXRsZVwiPk15IEJhbmQ8L2gyPicpO1xyXG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPjwvZGl2PicpO1xyXG4gICAgXHJcbiAgICB2YXIgYmFuZEluZm9FbGVtID0gYmFuZEVsZW0uZmluZCgnLmNhcmQtYmxvY2snKTtcclxuICAgIGJhbmRJbmZvRWxlbS5hcHBlbmQoJydcclxuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkJhbmQgTmFtZTwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLmJhbmROYW1lKyc8L3A+J1xyXG4gICAgICAgICsnPHAgY2xhc3M9XCJpbmZvIGNhcmQtdGV4dFwiPjxzdHJvbmc+T3duZXI8L3N0cm9uZz46ICcrdGhpcy5wYWdlLmN0cmwuYmFuZFswXS5vd25lck5hbWUrJzwvcD4nXHJcbiAgICAgICAgKyc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5EZXNjcmlwdGlvbjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLmRlc2NyaXB0aW9uKyc8L3A+J1xyXG4gICAgKTtcclxuICAgIFxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5CYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hcHBsaWNhdGlvbnMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKycvYXBwbGljYXRpb25zJztcclxuICAgIH0pO1xyXG59OyIsImZ1bmN0aW9uIEJhbmRNZW1iZXIoanNvbil7XHJcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYmFuZElkID0ganNvbi5iYW5kSWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy51c2VybmFtZSA9IGpzb24udXNlcm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XHJcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgJyc7XHJcbn1cclxuXHJcbkJhbmRNZW1iZXIuUk9MRSA9IHtcclxuICAgIE5PTkU6IC0xLFxyXG4gICAgT1dORVIgOiAwLFxyXG4gICAgTUFOQUdFUjogMSxcclxuICAgIE1FTUJFUiA6IDIsXHJcbiAgICBQUk9NT1RFUiA6IDNcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQmFuZE1lbWJlcjsgfSIsImZ1bmN0aW9uIEZyaWVuZChqc29uKXtcclxuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XHJcbiAgICB0aGlzLnVzZXJOYW1lID0ganNvbi51c2VyTmFtZSB8fCAnJztcclxuICAgIHRoaXMuYmlvID0ganNvbi5iaW8gfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCAnJztcclxufVxyXG5cclxuRnJpZW5kLlNUQVRVUyA9IHtcclxuXHROT05FOiAwLCBcclxuXHRGUklFTkQ6IDEsIFxyXG5cdFJFUVVFU1RFRDogMiwgXHJcblx0UEVORElORzogMywgXHJcblx0QkxPQ0tFRDogNCBcclxufVxyXG5cclxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gRnJpZW5kOyB9IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gSW52ZW50b3J5UGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ludmVudG9yeVBhZ2UnKVswXSwgSW52ZW50b3J5Q3RybCwgSW52ZW50b3J5Vmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuSW52ZW50b3J5UGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuSW52ZW50b3J5UGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlQYWdlO1xyXG5cclxuZnVuY3Rpb24gSW52ZW50b3J5Q3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLml0ZW1JbnZlbnRvcnkgPSBbXTtcclxufVxyXG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuSW52ZW50b3J5Q3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlDdHJsO1xyXG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7IFxyXG4gICAgXHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJytpZCsnL2ludmVudG9yeScsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0Lml0ZW1JbnZlbnRvcnkgPSBkYXRhO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7XHJcbiAgICBcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBJbnZlbnRvcnlWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5JbnZlbnRvcnlWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlWaWV3O1xyXG5JbnZlbnRvcnlWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuLyogICAgdmFyIGludmVudG9yeUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuaW52ZW50b3J5Jyk7XHJcblxyXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmludmVudG9yeS5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGludmVudG9yeUVsZW0uYXBwZW5kKCcnK1xyXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZFwiIHN0eWxlPVwid2lkdGg6IDIwcmVtO1wiPicrXHJcbiAgICAgICAgICAgICc8aW1nIGNsYXNzPVwiY2FyZC1pbWctdG9wXCIgc3JjPVwiLi4uXCIgYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIj4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xyXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj5DYXJkIHRpdGxlPC9oND4nK1xyXG4gICAgICAgICAgICAgICAgJzxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+U29tZSBxdWljayBleGFtcGxlIHRleHQgdG8gYnVpbGQgb24gdGhlIGNhcmQgdGl0bGUgYW5kIG1ha2UgdXAgdGhlIGJ1bGsgb2YgdGhlIGNhcmRzIGNvbnRlbnQuPC9wPicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibGlzdC1ncm91cCBsaXN0LWdyb3VwLWZsdXNoXCI+JytcclxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5DcmFzIGp1c3RvIG9kaW88L2xpPicrXHJcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+RGFwaWJ1cyBhYyBmYWNpbGlzaXMgaW48L2xpPicrXHJcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+VmVzdGlidWx1bSBhdCBlcm9zPC9saT4nK1xyXG4gICAgICAgICAgICAnPC91bD4nK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xyXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjYXJkLWxpbmtcIj5DYXJkIGxpbms8L2E+JytcclxuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FyZC1saW5rXCI+QW5vdGhlciBsaW5rPC9hPicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Rpdj4nKTtcclxuICAgIH0qL1xyXG59O1xyXG5cclxuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG5cclxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hZGQtbWVyY2gnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy8nK2lkKycvYWRkbWVyY2gnO1xyXG4gICAgfSk7XHJcbn07IiwiZnVuY3Rpb24gSXRlbShqc29uKSB7XHJcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xyXG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xyXG4gICAgdGhpcy50eXBlID0ganNvbi50eXBlIHx8ICcnO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGpzb24uZGVzY3JpcHRpb24gfHwgJyc7XHJcbiAgICB0aGlzLmltYWdlUGF0aCA9IGpzb24uaW1hZ2VQYXRoIHx8ICcnO1xyXG4gICAgdGhpcy5pbWFnZUZpbGUgPSBqc29uLmltYWdlRmlsZSB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnByaWNlID0ganNvbi5wcmljZSB8fCAwO1xyXG4gICAgdGhpcy5pbnZlbnRvcnkgPSBqc29uLmludmVudG9yeSB8fCB1bmRlZmluZWQ7XHJcbn0iLCJmdW5jdGlvbiBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uSWQsIHVzZXJJZCwgdHlwZSwgbWVzc2FnZSwgbGluaywgdW5yZWFkKXtcclxuICAgIHRoaXMubm90aWZpY2F0aW9uSWQgPSBub3RpZmljYXRpb25JZDtcclxuICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmxpbmsgPSBsaW5rO1xyXG4gICAgdGhpcy51bnJlYWQgPSB1bnJlYWQ7XHJcbn1cclxuTm90aWZpY2F0aW9uLlRZUEUgPSB7XHJcbiAgICBOT19NRVNTQUdFOiAwLFxyXG4gICAgRlJJRU5EX1JFUVVFU1Q6IDEsXHJcbiAgICBGUklFTkRfQUNDRVBURUQ6IDIsXHJcbiAgICBCQU5EX0lOVklURTogMyxcclxuICAgIFJFTU9WRURfRlJPTV9CQU5EOiA0LFxyXG4gICAgRVZFTlRfSU5WSVRFOiA1LFxyXG4gICAgRVZFTlRfUkVNSU5ERVI6IDYsXHJcbiAgICBFUlJPUjogNyxcclxuICAgIFNVQ0NFU1M6IDgsXHJcbiAgICBXQVJOSU5HOiA5XHJcbn07XHJcbk5vdGlmaWNhdGlvbi5mcm9tT2JqID0gZnVuY3Rpb24gKG9iail7XHJcbiAgICB2YXIgbXlOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCk7XHJcbiAgICBteU5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25JZCA9IG9iai5ub3RpZmljYXRpb25JZCB8fCBvYmouTm90aWZpY2F0aW9uSWQgfHwgLTE7XHJcbiAgICBteU5vdGlmaWNhdGlvbi51c2VySWQgPSBvYmoudXNlcklkIHx8IG9iai5Vc2VySWQgfHwgLTE7XHJcbiAgICBteU5vdGlmaWNhdGlvbi50eXBlID0gb2JqLnR5cGUgfHwgb2JqLlR5cGUgfHwgTm90aWZpY2F0aW9uLlRZUEUuTk9fTUVTU0FHRTtcclxuICAgIG15Tm90aWZpY2F0aW9uLm1lc3NhZ2UgPSBvYmoubWVzc2FnZSB8fCBvYmouTWVzc2FnZSB8fCAnJztcclxuICAgIG15Tm90aWZpY2F0aW9uLmxpbmsgPSBvYmoubGluayB8fCBvYmouTGluayB8fCAnIyc7XHJcbiAgICBteU5vdGlmaWNhdGlvbi51bnJlYWQgPSBvYmoudW5yZWFkIHx8IG9iai5VbnJlYWQgfHwgdHJ1ZTtcclxuICAgIHJldHVybiBteU5vdGlmaWNhdGlvbjtcclxufTtcclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IE5vdGlmaWNhdGlvbjsgfVxyXG4iLCJmdW5jdGlvbiBTZWFyY2hlZEJhbmQoanNvbil7XHJcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xyXG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uU3RhdHVzID0ganNvbi5hcHBsaWNhdGlvblN0YXR1cyB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGpzb24uZGVzY3JpcHRpb24gfHwgJyc7XHJcbiAgICB0aGlzLmdlbnJlID0ganNvbi5nZW5yZSB8fCAnJztcclxufVxyXG5cclxuU2VhcmNoZWRCYW5kLlJPTEUgPSB7XHJcbiAgICBPV05FUjogMCxcclxuICAgIE1BTkFHRVI6IDEsXHJcbiAgICBNRU1CRVI6IDIsXHJcbiAgICBQUk9NT1RFUjogM1xyXG59XHJcblxyXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hlZEJhbmQ7IH0iLCJmdW5jdGlvbiBTaW1wbGVCYW5kKGpzb24pe1xyXG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcclxuICAgIHRoaXMub3duZXJOYW1lID0ganNvbi5vd25lck5hbWUgfHwgJyc7XHJcbiAgICB0aGlzLm93bmVySWQgPSBqc29uLm93bmVySWQgfHwgdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XHJcbn1cclxuXHJcbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUJhbmQ7IH0iLCIvKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gQXBwKCl7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgLy90aGlzLnBhZ2VIaXN0b3J5ID0gW107XHJcbn1cclxuQXBwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKFBhZ2VDb25zdHJ1Y3Rvcil7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IFBhZ2VDb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcclxufTtcclxuLypBcHAucHJvdG90eXBlLmNoYW5nZVBhZ2UgPSBmdW5jdGlvbiAocGFnZSwgZGF0YSl7XHJcbiAgICBpZiggdGhpcy5jdXJyZW50UGFnZSApe1xyXG4gICAgICAgIC8vc3RvcmUgdGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgbGFzdCBwYWdlXHJcbiAgICAgICAgdGhpcy5wYWdlSGlzdG9yeS5wdXNoKHRoaXMuY3VycmVudFBhZ2UuY29uc3RydWN0b3IpO1xyXG4gICAgICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICAvL2NyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbmV4dCBwYWdlXHJcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IHBhZ2UodGhpcyk7XHJcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XHJcbn07Ki8iLCIvKiBnbG9iYWwgJCAqL1xyXG4vKiogSW5oZXJpdGFibGUgQ2xhc3NlcyAqKi9cclxuZnVuY3Rpb24gUGFnZShhcHAsIGVsZW0sIGN0cmxDb25zdHJ1Y3Rvciwgdmlld0NvbnN0cnVjdG9yLCBjaGlsZENvbXBvbmVudHMpe1xyXG4gICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5jdHJsID0gbmV3IGN0cmxDb25zdHJ1Y3Rvcih0aGlzKTtcclxuICAgIHRoaXMudmlldyA9IG5ldyB2aWV3Q29uc3RydWN0b3IodGhpcyk7XHJcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50cyA9IGNoaWxkQ29tcG9uZW50cyB8fCB7fTtcclxufVxyXG5QYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBcclxuICAgIGZvciggdmFyIGNvbXBvbmVudCBpbiB0aGlzLmNoaWxkQ29tcG9uZW50cyApe1xyXG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRzW2NvbXBvbmVudF0uaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmN0cmwuaW5pdCgpXHJcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICB0aGF0LnZpZXcuaW5pdC5hcHBseSh0aGF0LnZpZXcsIGFyZ3VtZW50cyk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gUGFnZUN0cmwocGFnZSl7XHJcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG59XHJcblBhZ2VDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBQYWdlVmlldyhwYWdlKXtcclxuICAgIHRoaXMucGFnZSA9IHBhZ2U7XHJcbn1cclxuUGFnZVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXt9OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbmZ1bmN0aW9uIE1lbnVDb21wb25lbnQoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoZGF0YS5lbGVtZW50KVswXSwgTWVudUN0cmwsIE1lbnVWaWV3KTtcclxufVxyXG5NZW51Q29tcG9uZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5NZW51Q29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVDb21wb25lbnQ7XHJcblxyXG5mdW5jdGlvbiBNZW51Q3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTWVudUN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5NZW51Q3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q3RybDtcclxuTWVudUN0cmwucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIHVybDogJy9hcGkvbG9nb3V0J1xyXG4gICAgfSkudGhlbihkZWZlci5yZXNvbHZlKS5jYXRjaChkZWZlci5yZWplY3QpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gTWVudVZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk1lbnVWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuTWVudVZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudVZpZXc7XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLm1lbnVCdXR0b25Db250YWluZXIgPSAkKHRoaXMucGFnZS5lbGVtKTtcclxuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIgPSAkKCcjbWVudU92ZXJsYXknKTtcclxuICAgIHRoaXMucmVuZGVyTWVudSgpO1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5yZW5kZXJNZW51ID0gZnVuY3Rpb24gKCl7XHJcbiAgICBcclxuICAgIC8qIHJlbmRlciBvdmVybGF5ICovXHJcbiAgICBpZiggdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5sZW5ndGggPT0gMCApe1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgaWQ9XCJtZW51T3ZlcmxheVwiIGNsYXNzPVwiaGlkZGVuXCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoXCIjbWVudU92ZXJsYXlcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnVcIj48L2Rpdj4nKTtcclxuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51U2VjdGlvblwiPidcclxuICAgICAgICArJzxkaXYgY2xhc3M9XCJhY3Rpb24gbG9nb3V0IGJ0biBidG4tc2Vjb25kYXJ5XCI+TG9nb3V0PC9kaXY+J1xyXG4gICAgKyc8L2Rpdj4nKTtcclxuICAgIFxyXG4gICAgLyogcmVuZGVyIG1lbnUgYnV0dG9uICovXHJcbiAgICB0aGlzLm1lbnVCdXR0b25Db250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51LXRvZ2dsZSBidG4gYnRuLXNlY29uZGFyeSBmYSBmYS1iYXJzXCI+PC9kaXY+Jyk7XHJcbn07XHJcbk1lbnVWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICB2aWV3ID0gdGhpcztcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5tZW51LXRvZ2dsZScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCB2aWV3LnZpc2libGUgKXtcclxuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLm9uKCdjbGljaycsICcubWVudSAubG9nb3V0JywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHZpZXcucGFnZS5jdHJsLmxvZ291dCgpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBhbGVydChlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgdmlldy52aXNpYmxlID0gIXZpZXcudmlzaWJsZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiggdmlldy52aXNpYmxlICl7XHJcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCBGcmllbmQgKi9cclxuXHJcbmZ1bmN0aW9uIEFkZEZyaWVuZFBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNhZGRGcmllbmRQYWdlJylbMF0sIEFkZEZyaWVuZEN0cmwsIEFkZEZyaWVuZFZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkFkZEZyaWVuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkFkZEZyaWVuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEFkZEZyaWVuZEN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5mcmllbmRzID0gW107XHJcbn1cclxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kQ3RybDtcclxuXHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIFxyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy9zZWFyY2gnLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIFwidG9cIiB1c2VyXHJcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcclxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQWRkRnJpZW5kVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kVmlldztcclxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpeyAgIFxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQ7XHJcbn07XHJcblxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcbiAgICBcclxuICAgIC8vIFRoaXMgd2lsbCBydW4gYSBzZWFyY2ggZXZlcnkgc2Vjb25kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleS4gXHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5cHJlc3MnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChwYWdlLnZpZXcuc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgcGFnZS52aWV3LnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN1Ym1pdHRpbmcgdGhlIHNlYXJjaCBzdHJpbmdcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5zZWFyY2gtdXNlcicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBwYWdlLmN0cmwuc2VhcmNoKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwYWdlLnZpZXcudXBkYXRlVXNlckxpc3QoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHBhZ2Uudmlldy5zaG93RnJpZW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpLCAxMCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGZyaWVuZCByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7ICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGJsb2NrIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5CTE9DS0VEKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgdW5ibG9jayByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuYmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgY2FuY2VsIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkZSSUVORClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGZyaWVuZCByZWplY3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIHVuZnJpZW5kXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS51cGRhdGVVc2VyTGlzdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcclxuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcclxuICAgIHZhciBiYWRnZSA9ICcnO1xyXG5cclxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXHJcbiAgICAkKCcuY2FyZCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIHN0YXR1c1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWludmVyc2UnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmcmllbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1mcmllbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uaWQrJ1wiPicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICc8L2g0PicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5zaG93RnJpZW5kTW9kYWwgPSBmdW5jdGlvbiAoZnJpZW5kSWQpe1xyXG4gICAgdmFyIHRoaXNGcmllbmQgPSB0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmZpbHRlcihmdW5jdGlvbiAoZnJpZW5kKXtcclxuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xyXG4gICAgfSlbMF0sXHJcbiAgICAgICAgbW9kYWxCdXR0b25zO1xyXG4gICAgICAgIFxyXG4gICAgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnZnJpZW5kJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blVuZnJpZW5kTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5BY2NlcHRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuUmVqZWN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuVW5ibG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5SZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBmcmllbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5mcmllbmQtbW9kYWwnKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyx0aGlzRnJpZW5kLmlkKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0ZyaWVuZC5uYW1lKyc8L3A+PHA+Jyt0aGlzRnJpZW5kLmJpbysnPC9wPicpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuLyoqXHJcbiAqIFBBR0VcclxuICogKi9cclxuZnVuY3Rpb24gQWRkTWVyY2hQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkTWVyY2hQYWdlJylbMF0sIEFkZE1lcmNoQ3RybCwgQWRkTWVyY2hWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5BZGRNZXJjaFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XHJcbkFkZE1lcmNoUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRNZXJjaFBhZ2U7XHJcblxyXG4vKipcclxuICogQ09OVFJPTExFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBBZGRNZXJjaEN0cmwocGFnZSl7XHJcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xyXG4gICAgdGhpcy5hZGRtZXJjaGluZyA9IGZhbHNlO1xyXG59XHJcbkFkZE1lcmNoQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkFkZE1lcmNoQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRNZXJjaEN0cmw7XHJcblxyXG5BZGRNZXJjaEN0cmwucHJvdG90eXBlLnN1Ym1pdE1lcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgXHJcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBcclxuICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycraWQrJy9hZGRtZXJjaCcsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcclxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XHJcbiAgICBcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVklFV0VSXHJcbiAqICovXHJcbmZ1bmN0aW9uIEFkZE1lcmNoVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZE1lcmNoVmlldztcclxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJ1tuYW1lPVwiYWRkSW52ZW50b3J5XCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxufTtcclxuXHJcbkFkZE1lcmNoVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnW25hbWU9XCJhZGRJbnZlbnRvcnlcIl0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNlbGVjdCA9IHBhZ2VFbGVtLmZpbmQoJ1tuYW1lPVwibWVyY2hUeXBlXCJdJyk7XHJcbiAgICAgICAgcGFnZS52aWV3LmFkZEludmVudG9yeUZpZWxkcyhzZWxlY3RbMF0udmFsdWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gV2UndmUgcGlja2VkIGEgdHlwZSBzbyBlbmFibGUgdGhlIEFkZCBJbnZlbnRvcnkgYnV0dG9uIGFuZCByZW1vdmUgYW55IGV4aXN0aW5nIGZpZWxkcyBmcm9tIG90aGVyIHR5cGVzXHJcbiAgICBwYWdlRWxlbS5vbignY2hhbmdlJywgJ1tuYW1lPVwibWVyY2hUeXBlXCJdJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHBhZ2VFbGVtLmZpbmQoJ1tuYW1lPVwiYWRkSW52ZW50b3J5XCJdJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgcGFnZUVsZW0uZmluZCgnLmR5bmFtaWNGaWVsZHMnKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBwYWdlLmN0cmwuc3VibWl0TWVyY2godGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbkFkZE1lcmNoVmlldy5wcm90b3R5cGUuYWRkSW52ZW50b3J5RmllbGRzID0gZnVuY3Rpb24gKHR5cGUpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG5cclxuICAgIHZhciB0eXBlRmllbGRzID0gJyc7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09ICdzaGlydCcpIHtcclxuICAgICAgICB0eXBlRmllbGRzID0gJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIHJlcXVpcmVkIG5hbWU9XCJzaXplXCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwic1wiPlM8L29wdGlvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIm1cIj5NPC9vcHRpb24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJsXCI+TDwvb3B0aW9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwieGxcIj5YTDwvb3B0aW9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvc2VsZWN0Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlID09PSAnY2QnKSB7XHJcbiAgICAgICAgdHlwZUZpZWxkcyA9ICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic2l6ZVwiIHZhbHVlPVwibm9uZVwiIC8+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdzdGlja2VyJykge1xyXG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiBkaXNhYmxlZCBzZWxlY3RlZD5TZWxlY3QgYSBzaXplPC9vcHRpb24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCIxeDFcIj4xeDE8L29wdGlvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjJ4MlwiPjJ4Mjwvb3B0aW9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiM3g0XCI+M3g0PC9vcHRpb24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCI1eDZcIj41eDY8L29wdGlvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L3NlbGVjdD4nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFsbCB0eXBlcyB3aWxsIGhhdmUgYSBxdWFudGl0eSBhbmQgY29sb3JcclxuICAgIHR5cGVGaWVsZHMgKz0gJzxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuYW1lPVwiY29sb3JcIiBwbGFjZWhvbGRlcj1cIkNvbG9yXCIgLz4nK1xyXG4gICAgICAgICAgICAgICAgICAnPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGR5bmFtaWNGaWVsZHNcIiByZXF1aXJlZCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cInF1YW50aXR5XCIgbWluPVwiMFwiIHN0ZXA9XCIxXCIgcGxhY2Vob2xkZXI9XCJRdWFudGl0eVwiPic7XHJcblxyXG4gICAgdmFyIHR5cGVGaWVsZHNEaXYgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZHluYW1pY0ZpZWxkc0NvbnRhaW5lcicpO1xyXG4gICAgdHlwZUZpZWxkc0Rpdi5hcHBlbmQodHlwZUZpZWxkcyk7XHJcbn0iLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCBBcHBsaWNhdGlvbiAqL1xyXG4vKiBnbG9iYWwgQmFuZE1lbWJlciAqL1xyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb25zUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FwcGxpY2F0aW9uc1BhZ2UnKVswXSwgQXBwbGljYXRpb25zQ3RybCwgQXBwbGljYXRpb25zVmlldywge1xyXG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xyXG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNQYWdlO1xyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb25zQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9ucyA9IFtdO1xyXG59XHJcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xyXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFwcGxpY2F0aW9uc0N0cmw7XHJcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIFxyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIHZhciBpZCA9IHVybC5zcGxpdCgnLycpWyB1cmwuc3BsaXQoJy8nKS5pbmRleE9mKCdiYW5kcycpKzFdO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJytpZCsnL2FwcGxpY2F0aW9ucycsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmFwcGxpY2F0aW9ucyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcclxuXHJcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJytpZCsnL3JvbGUnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XHJcbiAgICAgICAgdGhhdC5iYW5kTWVtYmVyUm9sZSA9IGRhdGEucm9sZTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChkZWZlci5yZWplY3QpOyAgXHJcbiAgICBcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5wcm9jZXNzQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMpIHtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIFxyXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgIHZhciBpZCA9IHVybC5zcGxpdCgnLycpWyB1cmwuc3BsaXQoJy8nKS5pbmRleE9mKCdiYW5kcycpKzFdO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2lkKycvcHJvY2Vzc2FwcGxpY2F0aW9uJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge2FwcGxpY2F0aW9uSWQgOiBhcHBsaWNhdGlvbklkLCBwcm9jZXNzU3RhdHVzIDogcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMgOiBhcHBsaWNhdGlvblN0YXR1c31cclxuICAgIH0pLnRoZW4oZGVmZXIucmVzb2x2ZSlcclxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQXBwbGljYXRpb25zVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zVmlldztcclxuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGFwcGxpY2F0aW9uc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYXBwbGljYXRpb25zJyk7XHJcbiAgICB2YXIgYmFkZ2UgPSAnJztcclxuXHJcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01BTkFHRVIpIHtcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1hbmFnZXInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0uc3RhdHVzID09PSBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NRU1CRVIpIHtcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1lbWJlcic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX1BST01PVEVSKSB7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5Qcm9tb3Rlcic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcHBsaWNhdGlvbnNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImFwcGxpY2F0aW9uIGJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1hcHBsaWNhdGlvbi1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLmlkKydcIiBkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cz1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cysnXCI+Jyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0udXNlcm5hbWUrJyA8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrJzwvZGl2PjxwLz4nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hcHBsaWNhdGlvbicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBwYWdlLnZpZXcuc2hvd0FwcGxpY2F0aW9uTW9kYWwocGFyc2VJbnQoJChlLnRhcmdldCkuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcpLDEwKSxwYXJzZUludCgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLDEwKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BY2NlcHQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uSWQgPSBwYXJzZUludCgkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwgMTApO1xyXG4gICAgICAgIHZhciBhcHBsaWNhdGlvblN0YXR1cyA9IHBhcnNlSW50KCQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwgMTApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBhZ2UuY3RybC5wcm9jZXNzQXBwbGljYXRpb24oYXBwbGljYXRpb25JZCwgQXBwbGljYXRpb24uU1RBVFVTLkFDQ0VQVEVELCBhcHBsaWNhdGlvblN0YXR1cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3QnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uSWQgPSBwYXJzZUludCgkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24taWQnKSwgMTApO1xyXG4gICAgICAgIHZhciBhcHBsaWNhdGlvblN0YXR1cyA9IHBhcnNlSW50KCQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnKSwgMTApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBhZ2UuY3RybC5wcm9jZXNzQXBwbGljYXRpb24oYXBwbGljYXRpb25JZCwgQXBwbGljYXRpb24uU1RBVFVTLlJFSkVDVEVELCBhcHBsaWNhdGlvblN0YXR1cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcclxuICAgIHZhciB0aGlzQXBwbGljYXRpb24gPSB0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChhcHBsaWNhdGlvbil7XHJcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uLmlkID09IGFwcGxpY2F0aW9uSWQ7XHJcbiAgICB9KVswXTtcclxuICAgIFxyXG4gICAgdmFyIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG5cclxuICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk9XTkVSIHx8IHRoaXMucGFnZS5jdHJsLmJhbmRNZW1iZXJSb2xlID09PSBCYW5kTWVtYmVyLlJPTEUuTUFOQUdFUikge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICAnPGJ1dHRvbiBpZD1cImJ0bkFjY2VwdFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXBwbGljYXRpb25Nb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5hcHBsaWNhdGlvbi1tb2RhbCcpO1xyXG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJywgdGhpc0FwcGxpY2F0aW9uLmlkKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1zdGF0dXMnLCB0aGlzQXBwbGljYXRpb24uc3RhdHVzKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQXBwbGljYXRpb24ubmFtZSsnIC0gJyt0aGlzQXBwbGljYXRpb24udXNlcm5hbWUpO1xyXG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPkluc3RydW1lbnQ6ICcrdGhpc0FwcGxpY2F0aW9uLmluc3RydW1lbnQrJzwvcD48cD5NZXNzYWdlOiAnK3RoaXNBcHBsaWNhdGlvbi5tZXNzYWdlKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcclxuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kc1BhZ2UnKVswXSwgQmFuZHNDdHJsLCBCYW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbkJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIEJhbmRzQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmJhbmRzID0gW107XHJcbn1cclxuQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcclxuQmFuZHNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICBcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuYWpheCgnL2FwaS9iYW5kcycsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmJhbmRzID0gZGF0YTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICB9KS5jYXRjaChkZWZlci5yZWplY3QpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNWaWV3O1xyXG5CYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xyXG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJiYW5kIGJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1iYW5kLWlkPScrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uaWQrJz4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmJhbmROYW1lKycgPHNtYWxsPihvd25lZCBieTogJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5vd25lck5hbWUrJyk8L3NtYWxsPjwvZGl2PicpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcbkJhbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcucmVnaXN0ZXItYmFuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3JlZ2lzdGVyJztcclxuICAgIH0pO1xyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5iYW5kJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvJyArICQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyk7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCBGcmllbmQgKi9cclxuXHJcbmZ1bmN0aW9uIEZyaWVuZHNQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjZnJpZW5kc1BhZ2UnKVswXSwgRnJpZW5kc0N0cmwsIEZyaWVuZHNWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5GcmllbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuRnJpZW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc1BhZ2U7XHJcblxyXG5mdW5jdGlvbiBGcmllbmRzQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmZyaWVuZHMgPSBbXTtcclxufVxyXG5GcmllbmRzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbkZyaWVuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNDdHJsO1xyXG5GcmllbmRzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgXHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBcclxuICAgICQuYWpheCgnL2FwaS9mcmllbmRzJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XHJcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xyXG5cclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG5GcmllbmRzQ3RybC5wcm90b3R5cGUudXBkYXRlU3RhdHVzID0gZnVuY3Rpb24gKHRvVXNlcklkLCBzdGF0dXMpe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7dG9Vc2VySWQgOiB0b1VzZXJJZCwgc3RhdHVzIDogc3RhdHVzfVxyXG4gICAgfSlcclxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXHJcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEZyaWVuZHNWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5GcmllbmRzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNWaWV3O1xyXG5GcmllbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICB0aGlzLnVwZGF0ZVVzZXJMaXN0KCk7XHJcbn07XHJcblxyXG5GcmllbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1mcmllbmQnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwxMCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUkVRVUVTVEVEKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XHJcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5QRU5ESU5HKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5ibG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5DYW5jZWxSZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xyXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkZSSUVORClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlamVjdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmZyaWVuZE1vZGFsJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcclxuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xyXG4gICAgfSk7ICAgICAgICBcclxufTtcclxuXHJcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS51cGRhdGVVc2VyTGlzdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcclxuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcclxuICAgIHZhciBiYWRnZSA9ICcnO1xyXG5cclxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXHJcbiAgICBmcmllbmRzRWxlbS5maW5kKCcuY2FyZCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIHN0YXR1c1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWludmVyc2UnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXHJcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmcmllbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1mcmllbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uaWQrJ1wiPicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcclxuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICc8L2g0PicrXHJcbiAgICAgICAgICAgICc8L2Rpdj4nK1xyXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5GcmllbmRzVmlldy5wcm90b3R5cGUuc2hvd0ZyaWVuZE1vZGFsID0gZnVuY3Rpb24gKGZyaWVuZElkKXtcclxuICAgIHZhciB0aGlzRnJpZW5kID0gdGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24gKGZyaWVuZCl7XHJcbiAgICAgICAgcmV0dXJuIGZyaWVuZC5pZCA9PSBmcmllbmRJZDtcclxuICAgIH0pWzBdLFxyXG4gICAgICAgIG1vZGFsQnV0dG9ucztcclxuICAgICAgICBcclxuICAgIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5VbmZyaWVuZE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmZyaWVuZDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blJlamVjdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5SZWplY3Q8L2J1dHRvbj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnbm9uZScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5TZW5kIEZyaWVuZCBSZXF1ZXN0PC9idXR0b24+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcsdGhpc0ZyaWVuZC5pZCk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNGcmllbmQudXNlck5hbWUpO1xyXG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcclxuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XHJcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xyXG59OyIsIi8qIGdsb2JhbCBQYWdlICovXHJcbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xyXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cclxuLyogZ2xvYmFsICQgKi9cclxuXHJcbi8qKlxyXG4gKiBQQUdFXHJcbiAqICovXHJcbmZ1bmN0aW9uIExvZ2luUGFnZShhcHAsIGRhdGEpe1xyXG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2xvZ2luUGFnZScpWzBdLCBMb2dpbkN0cmwsIExvZ2luVmlldyk7XHJcbn1cclxuTG9naW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5Mb2dpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5QYWdlO1xyXG5cclxuLyoqXHJcbiAqIENPTlRST0xMRVJcclxuICogKi9cclxuZnVuY3Rpb24gTG9naW5DdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMubG9nZ2luZ0luID0gZmFsc2U7XHJcbn1cclxuTG9naW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuTG9naW5DdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luQ3RybDtcclxuXHJcbkxvZ2luQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9hcGkvbG9naW4nLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVklFV0VSXHJcbiAqICovXHJcbmZ1bmN0aW9uIExvZ2luVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuTG9naW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuTG9naW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luVmlldztcclxuTG9naW5WaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcbkxvZ2luVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcclxuICAgICAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBpZiggcGFnZS5jdHJsLmxvZ2dpbmdJbiApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHBhZ2UuY3RybC5sb2dnaW5nSW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXHJcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxyXG4gICAgICAgIHBhZ2UuY3RybC5sb2dpbih0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xyXG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL21haW4nO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtdGltZXMnKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5sb2dnaW5nSW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXHJcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXHJcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXHJcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5Mb2dpbiBGYWlsZWQhPC9zdHJvbmc+IFVzZXJuYW1lIG9yIHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QuJ1xyXG4gICAgICAgICAgICArJzwvZGl2PicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG5cclxuZnVuY3Rpb24gTWFpblBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNtYWluUGFnZScpWzBdLCBNYWluQ3RybCwgTWFpblZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcbk1haW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5NYWluUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluUGFnZTtcclxuXHJcbmZ1bmN0aW9uIE1haW5DdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5NYWluQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbk1haW5DdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5DdHJsO1xyXG5cclxuZnVuY3Rpb24gTWFpblZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk1haW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuTWFpblZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblZpZXc7XHJcbk1haW5WaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZTtcclxuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmJhbmRzJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMnO1xyXG4gICAgfSk7XHJcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZnJpZW5kcyc7XHJcbiAgICB9KTtcclxuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmFkZC1mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZnJpZW5kcy9hZGQnO1xyXG4gICAgfSk7XHJcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5zZWFyY2gtYmFuZHMnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy9zZWFyY2gnO1xyXG4gICAgfSk7XHJcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5ub3RpZmljYXRpb25zJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbm90aWZpY2F0aW9ucyc7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCBOb3RpZmljYXRpb24gKi9cclxuXHJcbi8qKlxyXG4gKiBQQUdFXHJcbiAqICovXHJcbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbm90aWZpY2F0aW9uc1BhZ2UnKVswXSwgTm90aWZpY2F0aW9uc0N0cmwsIE5vdGlmaWNhdGlvbnNWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5Ob3RpZmljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuTm90aWZpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc1BhZ2U7XHJcblxyXG4vKipcclxuICogQ09OVFJPTExFUlxyXG4gKiAqL1xyXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcclxufVxyXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNDdHJsO1xyXG5cclxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBjdHJsID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICBjdHJsLmdldE5vdGlmaWNhdGlvbnMoKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XHJcbiAgICB9KTtcclxufTtcclxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmdldE5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBjdHJsID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAvL2dldCBub3RpZmljYXRpb25zXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS9ub3RpZmljYXRpb25zJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xyXG4gICAgICAgICAgICBjdHJsLm5vdGlmaWNhdGlvbnMgPSBkYXRhLm1hcChmdW5jdGlvbiAoaXRlbSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90aWZpY2F0aW9uLmZyb21PYmooaXRlbSk7XHJcbiAgICAgICAgICAgIH0pIHx8IFtdO1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5kZWxldGVOb3RpZmljYXRpb24gPSBmdW5jdGlvbiAoKXtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWSUVXRVJcclxuICogKi9cclxuZnVuY3Rpb24gTm90aWZpY2F0aW9uc1ZpZXcocGFnZSl7XHJcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xyXG59XHJcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc1ZpZXc7XHJcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbn07XHJcblxyXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcclxuICAgICAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbG9zZS5icy5hbGVydCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy9kZWxldGUgbm90aWZpY2F0aW9uIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAgICBwYWdlLmN0cmwuZGVsZXRlTm90aWZpY2F0aW9uKCQodGhpcykuYXR0cignZGF0YS1ub3RpZmljYXRpb24taWQnKSlcclxuICAgICAgICAudGhlbihwYWdlLmN0cmwuZ2V0Tm90aWZpY2F0aW9ucylcclxuICAgICAgICAudGhlbihwYWdlLnZpZXcucmVuZGVyKVxyXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgYWxlcnQoZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgcGFnZS5jdHJsLmdldE5vdGlmaWNhdGlvbnMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIG5vdGlmaWNhdGlvbkVsZW0gPSAkKCcjbm90aWZpY2F0aW9uc1BhZ2UnKS5maW5kKCcubm90aWZpY2F0aW9ucycpLmVtcHR5KCk7XHJcbiAgICB0aGlzLnBhZ2UuY3RybC5ub3RpZmljYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG5vdGlmaWNhdGlvbil7XHJcbiAgICAgICAgdmFyIGFsZXJ0VHlwZTtcclxuICAgICAgICBzd2l0Y2gobm90aWZpY2F0aW9uLnR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLlNVQ0NFU1M6XHJcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuRlJJRU5EX0FDQ0VQVEVEOlxyXG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LXN1Y2Nlc3MnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5XQVJOSU5HOlxyXG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLlJFTU9WRURfRlJPTV9CQU5EOlxyXG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LXdhcm5pbmcnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5FUlJPUjpcclxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1kYW5nZXInO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1pbmZvJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vdGlmaWNhdGlvbkVsZW0uYXBwZW5kKCcnK1xyXG4gICAgICAgICc8YSBocmVmPVwiJytub3RpZmljYXRpb24ubGluaysnXCIgY2xhc3M9XCJub3RpZmljYXRpb24gYWxlcnQgYWxlcnQtZGlzbWlzc2FibGUgJythbGVydFR5cGUrJ1wiIGRhdGEtbm90aWZpY2F0aW9uLWlkPVwiJytub3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQrJ1wiPicrXHJcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nK1xyXG4gICAgICAgICAgICAgICAgJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+JytcclxuICAgICAgICAgICAgJzwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5tZXNzYWdlK1xyXG4gICAgICAgICc8L2E+Jyk7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG4vKipcclxuICogUEFHRVxyXG4gKiAqL1xyXG5mdW5jdGlvbiBSZWdpc3RlclBhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNyZWdpc3RlclBhZ2UnKVswXSwgUmVnaXN0ZXJDdHJsLCBSZWdpc3RlclZpZXcpO1xyXG59XHJcblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyUGFnZTtcclxuXHJcbi8qKlxyXG4gKiBDT05UUk9MTEVSXHJcbiAqICovXHJcbmZ1bmN0aW9uIFJlZ2lzdGVyQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XHJcbn1cclxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQ3RybDtcclxuXHJcblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZm9ybSl7XHJcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICBcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9yZWdpc3RlcicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pXHJcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxyXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWSUVXRVJcclxuICogKi9cclxuZnVuY3Rpb24gUmVnaXN0ZXJWaWV3KHBhZ2Upe1xyXG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcclxufVxyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJWaWV3O1xyXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG59O1xyXG5cclxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcclxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXHJcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxyXG4gICAgICAgIHBhZ2UuY3RybC5yZWdpc3Rlcih0aGlzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxyXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlJlZ2lzdHJhdGlvbiBTdWNjZXNzZnVsITwvc3Ryb25nPiBSZWRpcmVjdGluZyBpbiAyIHNlY29uZHMuLi4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcclxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcclxuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcclxuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXHJcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXHJcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkxvZ2luIEZhaWxlZCE8L3N0cm9uZz4gVXNlcm5hbWUgb3IgcGFzc3dvcmQgd2FzIGluY29ycmVjdC4nXHJcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xyXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cclxuLyogZ2xvYmFsIFBhZ2VDdHJsICovXHJcbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXHJcbi8qIGdsb2JhbCAkICovXHJcblxyXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRQYWdlKGFwcCwgZGF0YSl7XHJcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjcmVnaXN0ZXJCYW5kUGFnZScpWzBdLCBSZWdpc3RlckJhbmRDdHJsLCBSZWdpc3RlckJhbmRWaWV3LCB7XHJcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5SZWdpc3RlckJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xyXG5SZWdpc3RlckJhbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZFBhZ2U7XHJcblxyXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRDdHJsKHBhZ2Upe1xyXG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcclxuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcclxufVxyXG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcclxuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRDdHJsO1xyXG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3JlZ2lzdGVyJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxyXG4gICAgfSlcclxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXHJcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbn1cclxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XHJcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kVmlldztcclxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbn07XHJcblxyXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XHJcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZSxcclxuICAgICAgICBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xyXG4gICAgXHJcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXHJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcclxuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXHJcbiAgICAgICAgcGFnZS5jdHJsLmxvZ2luKHRoaXMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXHJcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xyXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xyXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcclxuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcclxuICAgICAgICAgICAgICArJzxzdHJvbmc+UmVnaXN0cmF0aW9uIFN1Y2Nlc3NmdWwhPC9zdHJvbmc+IFJlZGlyZWN0aW5nIGluIDIgc2Vjb25kcy4uLidcclxuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XHJcbiAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XHJcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXHJcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXHJcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXHJcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xyXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xyXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5CYW5kIFJlZ2lzdHJhdGlvbiBGYWlsZWQhPC9zdHJvbmc+J1xyXG4gICAgICAgICAgICArJzwvZGl2PicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cclxuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXHJcbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xyXG4vKiBnbG9iYWwgJCAqL1xyXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xyXG52YXIgc2VhcmNoaW5nID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBTZWFyY2hCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcclxuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNzZWFyY2hCYW5kc1BhZ2UnKVswXSwgU2VhcmNoQmFuZHNDdHJsLCBTZWFyY2hCYW5kc1ZpZXcsIHtcclxuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcclxuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblNlYXJjaEJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcclxuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzUGFnZTtcclxuXHJcbmZ1bmN0aW9uIFNlYXJjaEJhbmRzQ3RybChwYWdlKXtcclxuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLmJhbmRzID0gW107XHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IGZhbHNlO1xyXG59XHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc0N0cmw7XHJcblxyXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHRoYXQuYmFuZHMgPSBbXTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9zZWFyY2gnLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcclxuICAgICAgICB0aGF0LmJhbmRzID0gZGF0YTtcclxuICAgICAgICB0aGF0LnBhZ2Uudmlldy51cGRhdGVCYW5kTGlzdCgpO1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIHNlbGVjdGVkIGJhbmRcclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5zdWJtaXRBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChiYW5kSWQsIGZvcm0pe1xyXG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IGAvYXBpL2JhbmRzLyR7YmFuZElkfS9zdWJtaXRBcHBsaWNhdGlvbmAsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcclxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpOyBcclxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcclxufTtcclxuXHJcbi8vIFRoaXMgbWV0aG9kIHdpbGwgZGVsZXRlIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhpcyBiYW5kXHJcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY2FuY2VsQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYmFuZElkKXtcclxuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9jYW5jZWxBcHBsaWNhdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGE6IHtiYW5kSWQgOiBiYW5kSWR9XHJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xyXG59O1xyXG5cclxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5leHBhbmRCYW5kTW9kYWwgPSBmdW5jdGlvbihhcHBsaWNhdGlvblR5cGUsIGFwcGxpY2F0aW9uU3RhdHVzLCBiYW5kSWQpIHtcclxuICAgICQoJy5tb2RhbC1ib2R5JykucmVtb3ZlKCk7XHJcbiAgICAkKCcubW9kYWwtZm9vdGVyJykucmVtb3ZlKCk7ICAgIFxyXG5cclxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcubW9kYWwtY29udGVudCcpO1xyXG4gICAgdmFyIGJhbmROYW1lID0gYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwoKTtcclxuICAgIHZhciBpbnN0cnVtZW50RmllbGQgPSAnJztcclxuXHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbChiYW5kTmFtZSsnPGJyLz4nK2FwcGxpY2F0aW9uVHlwZSsnIEFwcGxpY2F0aW9uJyk7XHJcblxyXG4gICAgaWYgKGFwcGxpY2F0aW9uVHlwZSA9PT0gJ01lbWJlcicpIHtcclxuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHBsYWNlaG9sZGVyPVwiSW5zdHJ1bWVudFwiIC8+PHAvPic7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHZhbHVlPVwiTi9BXCIvPjxwLz4nOyAgXHJcbiAgICB9XHJcblxyXG4gICAgYmFuZE1vZGFsLmFwcGVuZCgnJytcclxuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPicrXHJcbiAgICAgICAgJzxmb3JtIGlkPVwiYXBwbHktZm9ybVwiIGNsYXNzPVwiYXBwbHktZm9ybVwiIG9uc3VibWl0PVwicmV0dXJuXCI+JytcclxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcclxuICAgICAgICAgICAgICAgIGluc3RydW1lbnRGaWVsZCtcclxuICAgICAgICAgICAgICAgICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJNZXNzYWdlXCIgLz4nK1xyXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImJhbmRJZFwiIHZhbHVlPVwiJytiYW5kSWQrJ1wiIC8+JytcclxuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJhcHBsaWNhdGlvblN0YXR1c1wiIHZhbHVlPVwiJythcHBsaWNhdGlvblN0YXR1cysnXCIgLz4nK1xyXG4gICAgICAgICAgICAnPC9kaXY+JytcclxuICAgICAgICAnPC9mb3JtPicrXHJcbiAgICAnPC9kaXY+JytcclxuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JysgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cInN1Ym1pdFwiIGZvcm09XCJhcHBseS1mb3JtXCI+JytcclxuICAgICAgICAgICAgICAgICdTdWJtaXQnK1xyXG4gICAgICAgICAgICAnPC9idXR0b24+JytcclxuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicrXHJcbiAgICAgICAgJzwvZGl2PicrICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICc8L2Rpdj4nKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIFNlYXJjaEJhbmRzVmlldyhwYWdlKXtcclxuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XHJcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSB1bmRlZmluZWQ7XHJcbn1cclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzVmlldztcclxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7ICAgXHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxufTtcclxuXHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXHJcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xyXG4gICAgXHJcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxyXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgJy5zZWFyY2gtZm9ybSBpbnB1dCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dChwYWdlLnZpZXcuc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgcGFnZS52aWV3LnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN1Ym1pdHRpbmcgdGhlIHNlYXJjaCBzdHJpbmdcclxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5zZWFyY2gtZm9ybScsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgIFxyXG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KXsgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLmFwcGx5LWZvcm0nLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICAgIFxyXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7ICAgXHJcbiAgICAgICAgcGFnZS5jdHJsLnN1Ym1pdEFwcGxpY2F0aW9uKHBhcnNlSW50KCQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1iYW5kLWlkJyksIDEwKSwgdGhpcylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLWZvcm0nKS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgLy9oYW5kbGUgdGhlIGFwcGxpY2F0aW9uIHJlc3VsdFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuICAgIC8vIFRvZ2dsZSBCYW5kIE1vZGFsXHJcbiAgICBcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYmFuZCcsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBwYWdlLnZpZXcuc2hvd0JhbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbWFuYWdlciBhcHBsaWNhdGlvbiByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWFuYWdlcicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcclxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdNYW5hZ2VyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUiwgYmFuZElkKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIG1lbWJlciBhcHBsaWNhdGlvbiByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWVtYmVyJywgZnVuY3Rpb24gKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxyXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ01lbWJlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUiwgYmFuZElkKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gSGFuZGxlIHByb21vdGVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcclxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlQcm9tb3RlcicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcclxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdQcm9tb3RlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX1BST01PVEVSLCBiYW5kSWQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIGFwcGxpY2F0aW9uIGNhbmNlbCByZXF1ZXN0XHJcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWwnLCBmdW5jdGlvbiAoZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXHJcbiAgICAgICAgcGFnZS5jdHJsLmNhbmNlbEFwcGxpY2F0aW9uKGJhbmRJZClcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgIFxyXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKnBhZ2VFbGVtLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAnI21vZGFsNycsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJhbmRMaXN0O1xyXG4gICAgfSk7Ki9cclxufTtcclxuXHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUudXBkYXRlQmFuZExpc3QgPSBmdW5jdGlvbiAoKXtcclxuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcclxuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcclxuICAgIHZhciBiYWRnZSA9ICcnO1xyXG5cclxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXHJcbiAgICAkKCcuY2FyZCcpLnJlbW92ZSgpO1xyXG5cclxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xyXG5cclxuICAgICAgICAvLyBJZiB5b3UgaGF2ZSBhIHJvbGUgdGhlbiB5b3UgYXJlIGluIHRoZSBiYW5kLCBzbyBubyBtb2RhbCBidXR0b25zXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLnJvbGUgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xyXG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gYXBwbGljYXRpb24gc3RhdHVzIGlmIHRoZXkgZG8gbm90IGhhdmUgYSByb2xlIGluIHRoZSBiYW5kXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xyXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcclxuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ3JlamVjdGVkJykgeyBcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XHJcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCBiYW5kXHJcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnJytcclxuICAgICAgICAnPGRpdiBjbGFzcz1cImJhbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1iYW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnXCIgPicrXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXHJcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrXHJcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcclxuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmdlbnJlKycpPC9zbWFsbD4nK2JhZGdlK1xyXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcclxuICAgICAgICAgICAgJzwvZGl2PicrXHJcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcclxuICAgIH1cclxufTtcclxuXHJcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuc2hvd0JhbmRNb2RhbCA9IGZ1bmN0aW9uIChiYW5kSWQpe1xyXG4gICAgdmFyIHRoaXNCYW5kID0gdGhpcy5wYWdlLmN0cmwuYmFuZHMuZmlsdGVyKGZ1bmN0aW9uIChiYW5kKXtcclxuICAgICAgICByZXR1cm4gYmFuZC5pZCA9PSBiYW5kSWQ7XHJcbiAgICB9KVswXSxcclxuICAgICAgICBtb2RhbEJ1dHRvbnM7XHJcbiAgICBcclxuICAgIGlmICh0aGlzQmFuZC5yb2xlICE9ICdub25lJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNYW5hZ2VyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcclxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNZW1iZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XHJcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUHJvbW90ZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgIT09ICdibG9ja2VkJykge1xyXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlNYW5hZ2VyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIE1hbmFnZXI8L2J1dHRvbj4nKyBcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5TWVtYmVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIE1lbWJlcjwvYnV0dG9uPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5BcHBseVByb21vdGVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIFByb21vdGVyPC9idXR0b24+JztcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIGJhbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kLW1vZGFsJyk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1iYW5kLWlkJyx0aGlzQmFuZC5pZCk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQmFuZC5iYW5kTmFtZSk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNCYW5kLmRlc2NyaXB0aW9uKyc8L3A+Jyk7XHJcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLWZvb3RlcicpLmh0bWwoJzxkaXYgY2xhc3M9XCJkeW5hbWljLWJ1dHRvbnNcIj48L2Rpdj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj4nKTtcclxuICAgIGJhbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xyXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XHJcbn07Il19
