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

if( typeof module !== 'undefined' ){ module.exports = Inventory; }
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

if( typeof module !== 'undefined' ){ module.exports = Item; }
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
    var inventoryElem = $(this.page.elem).find('.inventory');

    this.page.ctrl.itemInventory.forEach(function (item){
        inventoryElem.append(''+
        '<div class="card" style="width: 20rem;">'+
            '<img class="card-img-top" src="/media/'+item.imagePath+'" alt="Card image cap">'+
            '<div class="card-block">'+
                '<h4 class="card-title">'+item.name+'</h4>'+
                '<p class="card-text">'+item.description+'</p>'+
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
    });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJpbnZlbnRvcnkuanMiLCJpdGVtLmpzIiwibm90aWZpY2F0aW9uLmpzIiwic2VhcmNoZWRCYW5kLmpzIiwic2ltcGxlQmFuZC5qcyIsImFwcC5qcyIsInBhZ2UuanMiLCJtZW51LmpzIiwiYWRkRnJpZW5kLmpzIiwiYWRkTWVyY2guanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FicEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FjakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBWnRPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBYWhGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gQXBwbGljYXRpb24oanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnVzZXJuYW1lID0ganNvbi51c2VybmFtZSB8fCAnJztcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5pbnN0cnVtZW50ID0ganNvbi5pbnN0cnVtZW50IHx8ICcnO1xuICAgIHRoaXMubWVzc2FnZSA9IGpzb24ubWVzc2FnZSB8fCAnJztcbn1cblxuQXBwbGljYXRpb24uU1RBVFVTID0ge1xuXHROT05FOiAwLCBcbiAgICBBUFBMSUVEX01BTkFHRVI6IDEsXG4gICAgQVBQTElFRF9NRU1CRVI6IDIsXG4gICAgQVBQTElFRF9QUk9NT1RFUjogMyxcblx0QUNDRVBURUQ6IDQsIFxuXHRSRUpFQ1RFRDogNSxcbiAgICBCTE9DS0VEOiA2XG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEFwcGxpY2F0aW9uOyB9IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gQmFuZFBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYmFuZFBhZ2UnKVswXSwgQmFuZEN0cmwsIEJhbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5CYW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkJhbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRQYWdlO1xuXG5mdW5jdGlvbiBCYW5kQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYmFuZCA9IHt9O1xufVxuQmFuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQmFuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZEN0cmw7XG5CYW5kQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG5cbiAgICAvL3ZhciBpZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycgKyBpZCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYmFuZCA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBCYW5kVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuQmFuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFZpZXc7XG5CYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kJyk7XG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8aDIgY2xhc3M9XCJjYXJkLXRpdGxlXCI+TXkgQmFuZDwvaDI+Jyk7XG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPjwvZGl2PicpO1xuICAgIFxuICAgIHZhciBiYW5kSW5mb0VsZW0gPSBiYW5kRWxlbS5maW5kKCcuY2FyZC1ibG9jaycpO1xuICAgIGJhbmRJbmZvRWxlbS5hcHBlbmQoJydcbiAgICAgICAgKyc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5CYW5kIE5hbWU8L3N0cm9uZz46ICcrdGhpcy5wYWdlLmN0cmwuYmFuZFswXS5iYW5kTmFtZSsnPC9wPidcbiAgICAgICAgKyc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5Pd25lcjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLm93bmVyTmFtZSsnPC9wPidcbiAgICAgICAgKyc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5EZXNjcmlwdGlvbjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kWzBdLmRlc2NyaXB0aW9uKyc8L3A+J1xuICAgICk7XG4gICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5CYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hcHBsaWNhdGlvbnMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSsnL2FwcGxpY2F0aW9ucyc7XG4gICAgfSk7XG59OyIsImZ1bmN0aW9uIEJhbmRNZW1iZXIoanNvbil7XG4gICAgdGhpcy51c2VySWQgPSBqc29uLnVzZXJJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kSWQgPSBqc29uLmJhbmRJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy51c2VybmFtZSA9IGpzb24udXNlcm5hbWUgfHwgJyc7XG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgJyc7XG59XG5cbkJhbmRNZW1iZXIuUk9MRSA9IHtcbiAgICBOT05FOiAtMSxcbiAgICBPV05FUiA6IDAsXG4gICAgTUFOQUdFUjogMSxcbiAgICBNRU1CRVIgOiAyLFxuICAgIFBST01PVEVSIDogM1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBCYW5kTWVtYmVyOyB9IiwiZnVuY3Rpb24gRnJpZW5kKGpzb24pe1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy51c2VyTmFtZSA9IGpzb24udXNlck5hbWUgfHwgJyc7XG4gICAgdGhpcy5iaW8gPSBqc29uLmJpbyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIHRoaXMuc3RhdHVzID0ganNvbi5zdGF0dXMgfHwgJyc7XG59XG5cbkZyaWVuZC5TVEFUVVMgPSB7XG5cdE5PTkU6IDAsIFxuXHRGUklFTkQ6IDEsIFxuXHRSRVFVRVNURUQ6IDIsIFxuXHRQRU5ESU5HOiAzLCBcblx0QkxPQ0tFRDogNCBcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gRnJpZW5kOyB9IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBJbnZlbnRvcnlQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ludmVudG9yeVBhZ2UnKVswXSwgSW52ZW50b3J5Q3RybCwgSW52ZW50b3J5Vmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuSW52ZW50b3J5UGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkludmVudG9yeVBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW52ZW50b3J5UGFnZTtcblxuZnVuY3Rpb24gSW52ZW50b3J5Q3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuaXRlbUludmVudG9yeSA9IFtdO1xufVxuSW52ZW50b3J5Q3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEludmVudG9yeUN0cmw7XG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG5cbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBpZCA9IHVybC5zcGxpdCgnLycpWyB1cmwuc3BsaXQoJy8nKS5pbmRleE9mKCdiYW5kcycpKzFdO1xuICAgIHZhciB0aGF0ID0gdGhpczsgXG4gICAgXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCgnL2FwaS9iYW5kcy8nK2lkKycvaW52ZW50b3J5Jywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuaXRlbUludmVudG9yeSA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBJbnZlbnRvcnlWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5JbnZlbnRvcnlWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkludmVudG9yeVZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW52ZW50b3J5VmlldztcbkludmVudG9yeVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB2YXIgaW52ZW50b3J5RWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5pbnZlbnRvcnknKTtcblxuICAgIHRoaXMucGFnZS5jdHJsLml0ZW1JbnZlbnRvcnkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgIGludmVudG9yeUVsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmRcIiBzdHlsZT1cIndpZHRoOiAyMHJlbTtcIj4nK1xuICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJjYXJkLWltZy10b3BcIiBzcmM9XCIvbWVkaWEvJytpdGVtLmltYWdlUGF0aCsnXCIgYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicraXRlbS5uYW1lKyc8L2g0PicrXG4gICAgICAgICAgICAgICAgJzxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+JytpdGVtLmRlc2NyaXB0aW9uKyc8L3A+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzx1bCBjbGFzcz1cImxpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaFwiPicrXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPkNyYXMganVzdG8gb2RpbzwvbGk+JytcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+RGFwaWJ1cyBhYyBmYWNpbGlzaXMgaW48L2xpPicrXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlZlc3RpYnVsdW0gYXQgZXJvczwvbGk+JytcbiAgICAgICAgICAgICc8L3VsPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICc8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FyZC1saW5rXCI+Q2FyZCBsaW5rPC9hPicrXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjYXJkLWxpbmtcIj5Bbm90aGVyIGxpbms8L2E+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+Jyk7XG4gICAgfSk7XG59O1xuXG5JbnZlbnRvcnlWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcblxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYWRkLW1lcmNoJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzLycraWQrJy9hZGRtZXJjaCc7XG4gICAgfSk7XG59OyIsImZ1bmN0aW9uIEl0ZW0oanNvbikge1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IGpzb24udHlwZSB8fCAnJztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0ganNvbi5kZXNjcmlwdGlvbiB8fCAnJztcbiAgICB0aGlzLmltYWdlUGF0aCA9IGpzb24uaW1hZ2VQYXRoIHx8ICcnO1xuICAgIHRoaXMuaW1hZ2VGaWxlID0ganNvbi5pbWFnZUZpbGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucHJpY2UgPSBqc29uLnByaWNlIHx8IDA7XG4gICAgdGhpcy5pbnZlbnRvcnkgPSBqc29uLmludmVudG9yeSB8fCB1bmRlZmluZWQ7XG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEl0ZW07IH0iLCJmdW5jdGlvbiBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uSWQsIHVzZXJJZCwgdHlwZSwgbWVzc2FnZSwgbGluaywgdW5yZWFkKXtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbklkID0gbm90aWZpY2F0aW9uSWQ7XG4gICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMubGluayA9IGxpbms7XG4gICAgdGhpcy51bnJlYWQgPSB1bnJlYWQ7XG59XG5Ob3RpZmljYXRpb24uVFlQRSA9IHtcbiAgICBOT19NRVNTQUdFOiAwLFxuICAgIEZSSUVORF9SRVFVRVNUOiAxLFxuICAgIEZSSUVORF9BQ0NFUFRFRDogMixcbiAgICBCQU5EX0lOVklURTogMyxcbiAgICBSRU1PVkVEX0ZST01fQkFORDogNCxcbiAgICBFVkVOVF9JTlZJVEU6IDUsXG4gICAgRVZFTlRfUkVNSU5ERVI6IDYsXG4gICAgRVJST1I6IDcsXG4gICAgU1VDQ0VTUzogOCxcbiAgICBXQVJOSU5HOiA5XG59O1xuTm90aWZpY2F0aW9uLmZyb21PYmogPSBmdW5jdGlvbiAob2JqKXtcbiAgICB2YXIgbXlOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCk7XG4gICAgbXlOb3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQgPSBvYmoubm90aWZpY2F0aW9uSWQgfHwgb2JqLk5vdGlmaWNhdGlvbklkIHx8IC0xO1xuICAgIG15Tm90aWZpY2F0aW9uLnVzZXJJZCA9IG9iai51c2VySWQgfHwgb2JqLlVzZXJJZCB8fCAtMTtcbiAgICBteU5vdGlmaWNhdGlvbi50eXBlID0gb2JqLnR5cGUgfHwgb2JqLlR5cGUgfHwgTm90aWZpY2F0aW9uLlRZUEUuTk9fTUVTU0FHRTtcbiAgICBteU5vdGlmaWNhdGlvbi5tZXNzYWdlID0gb2JqLm1lc3NhZ2UgfHwgb2JqLk1lc3NhZ2UgfHwgJyc7XG4gICAgbXlOb3RpZmljYXRpb24ubGluayA9IG9iai5saW5rIHx8IG9iai5MaW5rIHx8ICcjJztcbiAgICBteU5vdGlmaWNhdGlvbi51bnJlYWQgPSBvYmoudW5yZWFkIHx8IG9iai5VbnJlYWQgfHwgdHJ1ZTtcbiAgICByZXR1cm4gbXlOb3RpZmljYXRpb247XG59O1xuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBOb3RpZmljYXRpb247IH1cbiIsImZ1bmN0aW9uIFNlYXJjaGVkQmFuZChqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xuICAgIHRoaXMuYXBwbGljYXRpb25TdGF0dXMgPSBqc29uLmFwcGxpY2F0aW9uU3RhdHVzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBqc29uLmRlc2NyaXB0aW9uIHx8ICcnO1xuICAgIHRoaXMuZ2VucmUgPSBqc29uLmdlbnJlIHx8ICcnO1xufVxuXG5TZWFyY2hlZEJhbmQuUk9MRSA9IHtcbiAgICBPV05FUjogMCxcbiAgICBNQU5BR0VSOiAxLFxuICAgIE1FTUJFUjogMixcbiAgICBQUk9NT1RFUjogM1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hlZEJhbmQ7IH0iLCJmdW5jdGlvbiBTaW1wbGVCYW5kKGpzb24pe1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy5vd25lck5hbWUgPSBqc29uLm93bmVyTmFtZSB8fCAnJztcbiAgICB0aGlzLm93bmVySWQgPSBqc29uLm93bmVySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVCYW5kOyB9IiwiLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gQXBwKCl7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHVuZGVmaW5lZDtcbiAgICAvL3RoaXMucGFnZUhpc3RvcnkgPSBbXTtcbn1cbkFwcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChQYWdlQ29uc3RydWN0b3Ipe1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgUGFnZUNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XG59O1xuLypBcHAucHJvdG90eXBlLmNoYW5nZVBhZ2UgPSBmdW5jdGlvbiAocGFnZSwgZGF0YSl7XG4gICAgaWYoIHRoaXMuY3VycmVudFBhZ2UgKXtcbiAgICAgICAgLy9zdG9yZSB0aGUgY29uc3RydWN0b3IgZm9yIHRoZSBsYXN0IHBhZ2VcbiAgICAgICAgdGhpcy5wYWdlSGlzdG9yeS5wdXNoKHRoaXMuY3VycmVudFBhZ2UuY29uc3RydWN0b3IpO1xuICAgICAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICAvL2NyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbmV4dCBwYWdlXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBwYWdlKHRoaXMpO1xuICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdGhpcy5jdXJyZW50UGFnZS5pbml0KCk7XG59OyovIiwiLyogZ2xvYmFsICQgKi9cbi8qKiBJbmhlcml0YWJsZSBDbGFzc2VzICoqL1xuZnVuY3Rpb24gUGFnZShhcHAsIGVsZW0sIGN0cmxDb25zdHJ1Y3Rvciwgdmlld0NvbnN0cnVjdG9yLCBjaGlsZENvbXBvbmVudHMpe1xuICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgdGhpcy5jdHJsID0gbmV3IGN0cmxDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICB0aGlzLnZpZXcgPSBuZXcgdmlld0NvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHRoaXMuY2hpbGRDb21wb25lbnRzID0gY2hpbGRDb21wb25lbnRzIHx8IHt9O1xufVxuUGFnZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBcbiAgICBmb3IoIHZhciBjb21wb25lbnQgaW4gdGhpcy5jaGlsZENvbXBvbmVudHMgKXtcbiAgICAgICAgdGhpcy5jaGlsZENvbXBvbmVudHNbY29tcG9uZW50XS5pbml0KCk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuY3RybC5pbml0KClcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgdGhhdC52aWV3LmluaXQuYXBwbHkodGhhdC52aWV3LCBhcmd1bWVudHMpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xufTtcblxuZnVuY3Rpb24gUGFnZUN0cmwocGFnZSl7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbn1cblBhZ2VDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gUGFnZVZpZXcocGFnZSl7XG4gICAgdGhpcy5wYWdlID0gcGFnZTtcbn1cblBhZ2VWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7fTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIE1lbnVDb21wb25lbnQoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKGRhdGEuZWxlbWVudClbMF0sIE1lbnVDdHJsLCBNZW51Vmlldyk7XG59XG5NZW51Q29tcG9uZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTWVudUNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q29tcG9uZW50O1xuXG5mdW5jdGlvbiBNZW51Q3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTWVudUN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuTWVudUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudUN0cmw7XG5NZW51Q3RybC5wcm90b3R5cGUubG9nb3V0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvYXBpL2xvZ291dCdcbiAgICB9KS50aGVuKGRlZmVyLnJlc29sdmUpLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIE1lbnVWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5NZW51Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5NZW51Vmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Vmlldztcbk1lbnVWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5tZW51QnV0dG9uQ29udGFpbmVyID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoJyNtZW51T3ZlcmxheScpO1xuICAgIHRoaXMucmVuZGVyTWVudSgpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcbk1lbnVWaWV3LnByb3RvdHlwZS5yZW5kZXJNZW51ID0gZnVuY3Rpb24gKCl7XG4gICAgXG4gICAgLyogcmVuZGVyIG92ZXJsYXkgKi9cbiAgICBpZiggdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5sZW5ndGggPT0gMCApe1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwibWVudU92ZXJsYXlcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PicpO1xuICAgICAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyID0gJChcIiNtZW51T3ZlcmxheVwiKTtcbiAgICB9XG4gICAgdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5lbXB0eSgpO1xuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudVwiPjwvZGl2PicpO1xuICAgIHRoaXMubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51U2VjdGlvblwiPidcbiAgICAgICAgKyc8ZGl2IGNsYXNzPVwiYWN0aW9uIGxvZ291dCBidG4gYnRuLXNlY29uZGFyeVwiPkxvZ291dDwvZGl2PidcbiAgICArJzwvZGl2PicpO1xuICAgIFxuICAgIC8qIHJlbmRlciBtZW51IGJ1dHRvbiAqL1xuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lci5lbXB0eSgpO1xuICAgIHRoaXMubWVudUJ1dHRvbkNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJtZW51LXRvZ2dsZSBidG4gYnRuLXNlY29uZGFyeSBmYSBmYS1iYXJzXCI+PC9kaXY+Jyk7XG59O1xuTWVudVZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICAgICAgdmlldyA9IHRoaXM7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5tZW51LXRvZ2dsZScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmlldy52aXNpYmxlID0gIXZpZXcudmlzaWJsZTtcbiAgICAgICAgXG4gICAgICAgIGlmKCB2aWV3LnZpc2libGUgKXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgJy5tZW51IC5sb2dvdXQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcucGFnZS5jdHJsLmxvZ291dCgpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLm9uKCdjbGljaycsICcubWVudScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEFkZEZyaWVuZFBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkRnJpZW5kUGFnZScpWzBdLCBBZGRGcmllbmRDdHJsLCBBZGRGcmllbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkRnJpZW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRQYWdlO1xuXG5mdW5jdGlvbiBBZGRGcmllbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5mcmllbmRzID0gW107XG59XG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kQ3RybDtcblxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmZyaWVuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIFwidG9cIiB1c2VyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBBZGRGcmllbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kVmlldztcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQ7XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlwcmVzcycsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC11c2VyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcGFnZS52aWV3LnVwZGF0ZVVzZXJMaXN0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwgMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTsgIFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBibG9jayByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5CbG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5CTE9DS0VEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIHVuYmxvY2sgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5ibG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGNhbmNlbCByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5DYW5jZWxSZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQWNjZXB0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkZSSUVORClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVqZWN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZWplY3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSB1bmZyaWVuZFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbnZlcnNlJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICAgICAgYmFkZ2UgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcbiAgICAgICAgZnJpZW5kc0VsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImZyaWVuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWZyaWVuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XG4gICAgfVxufTtcblxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuc2hvd0ZyaWVuZE1vZGFsID0gZnVuY3Rpb24gKGZyaWVuZElkKXtcbiAgICB2YXIgdGhpc0ZyaWVuZCA9IHRoaXMucGFnZS5jdHJsLmZyaWVuZHMuZmlsdGVyKGZ1bmN0aW9uIChmcmllbmQpe1xuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xuICAgIH0pWzBdLFxuICAgICAgICBtb2RhbEJ1dHRvbnM7XG4gICAgICAgIFxuICAgIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuVW5mcmllbmRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5mcmllbmQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5SZWplY3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdibG9ja2VkJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuVW5ibG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5SZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FkZE1lcmNoUGFnZScpWzBdLCBBZGRNZXJjaEN0cmwsIEFkZE1lcmNoVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQWRkTWVyY2hQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkTWVyY2hQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZE1lcmNoUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5hZGRtZXJjaGluZyA9IGZhbHNlO1xufVxuQWRkTWVyY2hDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFkZE1lcmNoQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRNZXJjaEN0cmw7XG5cbkFkZE1lcmNoQ3RybC5wcm90b3R5cGUuc3VibWl0TWVyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycraWQrJy9hZGRtZXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLyoqXG4gKiBWSUVXRVJcbiAqICovXG5mdW5jdGlvbiBBZGRNZXJjaFZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkFkZE1lcmNoVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkTWVyY2hWaWV3O1xuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnW25hbWU9XCJhZGRJbnZlbnRvcnlcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xufTtcblxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnW25hbWU9XCJhZGRJbnZlbnRvcnlcIl0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZWxlY3QgPSBwYWdlRWxlbS5maW5kKCdbbmFtZT1cIm1lcmNoVHlwZVwiXScpO1xuICAgICAgICBwYWdlLnZpZXcuYWRkSW52ZW50b3J5RmllbGRzKHNlbGVjdFswXS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXZSd2ZSBwaWNrZWQgYSB0eXBlIHNvIGVuYWJsZSB0aGUgQWRkIEludmVudG9yeSBidXR0b24gYW5kIHJlbW92ZSBhbnkgZXhpc3RpbmcgZmllbGRzIGZyb20gb3RoZXIgdHlwZXNcbiAgICBwYWdlRWxlbS5vbignY2hhbmdlJywgJ1tuYW1lPVwibWVyY2hUeXBlXCJdJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlRWxlbS5maW5kKCdbbmFtZT1cImFkZEludmVudG9yeVwiXScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICBwYWdlRWxlbS5maW5kKCcuZHluYW1pY0ZpZWxkcycpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5zdWJtaXRNZXJjaCh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmFkZEludmVudG9yeUZpZWxkcyA9IGZ1bmN0aW9uICh0eXBlKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIHR5cGVGaWVsZHMgPSAnJztcblxuICAgIGlmICh0eXBlID09PSAnc2hpcnQnKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInNcIj5TPC9vcHRpb24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwibVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJsXCI+TDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInhsXCI+WEw8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9zZWxlY3Q+JztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdjZCcpIHtcbiAgICAgICAgdHlwZUZpZWxkcyA9ICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic2l6ZVwiIHZhbHVlPVwibm9uZVwiIC8+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0aWNrZXInKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjF4MVwiPjF4MTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjJ4MlwiPjJ4Mjwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjN4NFwiPjN4NDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjV4NlwiPjV4Njwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICc8L3NlbGVjdD4nO1xuICAgIH1cblxuICAgIC8vIEFsbCB0eXBlcyB3aWxsIGhhdmUgYSBxdWFudGl0eSBhbmQgY29sb3JcbiAgICB0eXBlRmllbGRzICs9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvbG9yXCIgcGxhY2Vob2xkZXI9XCJDb2xvclwiIC8+JytcbiAgICAgICAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIHJlcXVpcmVkIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwicXVhbnRpdHlcIiBtaW49XCIwXCIgc3RlcD1cIjFcIiBwbGFjZWhvbGRlcj1cIlF1YW50aXR5XCI+JztcblxuICAgIHZhciB0eXBlRmllbGRzRGl2ID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmR5bmFtaWNGaWVsZHNDb250YWluZXInKTtcbiAgICB0eXBlRmllbGRzRGl2LmFwcGVuZCh0eXBlRmllbGRzKTtcbn0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIEFwcGxpY2F0aW9uICovXG4vKiBnbG9iYWwgQmFuZE1lbWJlciAqL1xuXG5mdW5jdGlvbiBBcHBsaWNhdGlvbnNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FwcGxpY2F0aW9uc1BhZ2UnKVswXSwgQXBwbGljYXRpb25zQ3RybCwgQXBwbGljYXRpb25zVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zUGFnZTtcblxuZnVuY3Rpb24gQXBwbGljYXRpb25zQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYXBwbGljYXRpb25zID0gW107XG59XG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zQ3RybDtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9hcHBsaWNhdGlvbnMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcblxuICAgICQuYWpheCgnL2FwaS9iYW5kcy8nK2lkKycvcm9sZScsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmJhbmRNZW1iZXJSb2xlID0gZGF0YS5yb2xlO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTsgIFxuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5wcm9jZXNzQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMpIHtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytpZCsnL3Byb2Nlc3NhcHBsaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge2FwcGxpY2F0aW9uSWQgOiBhcHBsaWNhdGlvbklkLCBwcm9jZXNzU3RhdHVzIDogcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMgOiBhcHBsaWNhdGlvblN0YXR1c31cbiAgICB9KS50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNWaWV3O1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBhcHBsaWNhdGlvbnNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9ucycpO1xuICAgIHZhciBiYWRnZSA9ICcnO1xuXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKyApe1xuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1hbmFnZXInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1lbWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIpIHtcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5Qcm9tb3Rlcic7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBsaWNhdGlvbnNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImFwcGxpY2F0aW9uIGJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1hcHBsaWNhdGlvbi1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLmlkKydcIiBkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cz1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cysnXCI+Jyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0udXNlcm5hbWUrJyA8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrJzwvZGl2PjxwLz4nKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb24nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93QXBwbGljYXRpb25Nb2RhbChwYXJzZUludCgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksMTApLHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyksMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BY2NlcHQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5BQ0NFUFRFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5SRUpFQ1RFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcbiAgICB2YXIgdGhpc0FwcGxpY2F0aW9uID0gdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zLmZpbHRlcihmdW5jdGlvbiAoYXBwbGljYXRpb24pe1xuICAgICAgICByZXR1cm4gYXBwbGljYXRpb24uaWQgPT0gYXBwbGljYXRpb25JZDtcbiAgICB9KVswXTtcbiAgICBcbiAgICB2YXIgbW9kYWxCdXR0b25zID0gJyc7XG5cbiAgICBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZE1lbWJlclJvbGUgPT09IEJhbmRNZW1iZXIuUk9MRS5PV05FUiB8fCB0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk1BTkFHRVIpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gICc8YnV0dG9uIGlkPVwiYnRuQWNjZXB0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JztcbiAgICB9XG5cbiAgICB2YXIgYXBwbGljYXRpb25Nb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5hcHBsaWNhdGlvbi1tb2RhbCcpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcsIHRoaXNBcHBsaWNhdGlvbi5pZCk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycsIHRoaXNBcHBsaWNhdGlvbi5zdGF0dXMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQXBwbGljYXRpb24ubmFtZSsnIC0gJyt0aGlzQXBwbGljYXRpb24udXNlcm5hbWUpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD5JbnN0cnVtZW50OiAnK3RoaXNBcHBsaWNhdGlvbi5pbnN0cnVtZW50Kyc8L3A+PHA+TWVzc2FnZTogJyt0aGlzQXBwbGljYXRpb24ubWVzc2FnZSk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYmFuZHNQYWdlJylbMF0sIEJhbmRzQ3RybCwgQmFuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5CYW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5CYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNQYWdlO1xuXG5mdW5jdGlvbiBCYW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmJhbmRzID0gW107XG59XG5CYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcbkJhbmRzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzVmlldztcbkJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJhbmQgYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWJhbmQtaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3JlZ2lzdGVyJztcbiAgICB9KTtcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvJyArICQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEZyaWVuZHNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ZyaWVuZHNQYWdlJylbMF0sIEZyaWVuZHNDdHJsLCBGcmllbmRzVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuRnJpZW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5GcmllbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzUGFnZTtcblxuZnVuY3Rpb24gRnJpZW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmZyaWVuZHMgPSBbXTtcbn1cbkZyaWVuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkZyaWVuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNDdHJsO1xuRnJpZW5kc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCgnL2FwaS9mcmllbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbkZyaWVuZHNDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBGcmllbmRzVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuRnJpZW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc1ZpZXc7XG5GcmllbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMudXBkYXRlVXNlckxpc3QoKTtcbn07XG5cbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1mcmllbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZnJpZW5kcy9hZGQnO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5mcmllbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93RnJpZW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpLDEwKSk7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUkVRVUVTVEVEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLlBFTkRJTkcpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5ibG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkNhbmNlbFJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5BY2NlcHRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuRlJJRU5EKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlamVjdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTsgICAgICAgIFxufTtcblxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgIGZyaWVuZHNFbGVtLmZpbmQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbnZlcnNlJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICAgICAgYmFkZ2UgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcbiAgICAgICAgZnJpZW5kc0VsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImZyaWVuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWZyaWVuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XG4gICAgfVxufTtcblxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLnNob3dGcmllbmRNb2RhbCA9IGZ1bmN0aW9uIChmcmllbmRJZCl7XG4gICAgdmFyIHRoaXNGcmllbmQgPSB0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmZpbHRlcihmdW5jdGlvbiAoZnJpZW5kKXtcbiAgICAgICAgcmV0dXJuIGZyaWVuZC5pZCA9PSBmcmllbmRJZDtcbiAgICB9KVswXSxcbiAgICAgICAgbW9kYWxCdXR0b25zO1xuICAgICAgICBcbiAgICBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdmcmllbmQnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blVuZnJpZW5kTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bkFjY2VwdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuUmVqZWN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5TZW5kIEZyaWVuZCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgXG4gICAgdmFyIGZyaWVuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZC1tb2RhbCcpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyx0aGlzRnJpZW5kLmlkKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNGcmllbmQudXNlck5hbWUpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzRnJpZW5kLm5hbWUrJzwvcD48cD4nK3RoaXNGcmllbmQuYmlvKyc8L3A+Jyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbi8qKlxuICogUEFHRVxuICogKi9cbmZ1bmN0aW9uIExvZ2luUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNsb2dpblBhZ2UnKVswXSwgTG9naW5DdHJsLCBMb2dpblZpZXcpO1xufVxuTG9naW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTG9naW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5DdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5sb2dnaW5nSW4gPSBmYWxzZTtcbn1cbkxvZ2luQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5Mb2dpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5DdHJsO1xuXG5Mb2dpbkN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIExvZ2luVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTG9naW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkxvZ2luVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpblZpZXc7XG5Mb2dpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkxvZ2luVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5sb2dnaW5nSW4gKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9tYWluJztcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5sb2dnaW5nSW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBNYWluUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNtYWluUGFnZScpWzBdLCBNYWluQ3RybCwgTWFpblZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbk1haW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTWFpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblBhZ2U7XG5cbmZ1bmN0aW9uIE1haW5DdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG59XG5NYWluQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5NYWluQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluQ3RybDtcblxuZnVuY3Rpb24gTWFpblZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1haW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbk1haW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5WaWV3O1xuTWFpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5iYW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5hZGQtZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuc2VhcmNoLWJhbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3NlYXJjaCc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcubm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9ub3RpZmljYXRpb25zJztcbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBOb3RpZmljYXRpb24gKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gTm90aWZpY2F0aW9uc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbm90aWZpY2F0aW9uc1BhZ2UnKVswXSwgTm90aWZpY2F0aW9uc0N0cmwsIE5vdGlmaWNhdGlvbnNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5Ob3RpZmljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbk5vdGlmaWNhdGlvbnNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNQYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xufVxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc0N0cmw7XG5cbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgY3RybC5nZXROb3RpZmljYXRpb25zKCkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xufTtcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5nZXROb3RpZmljYXRpb25zID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgLy9nZXQgbm90aWZpY2F0aW9uc1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucydcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICAgICAgY3RybC5ub3RpZmljYXRpb25zID0gZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RpZmljYXRpb24uZnJvbU9iaihpdGVtKTtcbiAgICAgICAgICAgIH0pIHx8IFtdO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuZGVsZXRlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKCl7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufTtcblxuLyoqXG4gKiBWSUVXRVJcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc1ZpZXc7XG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG59O1xuXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignY2xvc2UuYnMuYWxlcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvL2RlbGV0ZSBub3RpZmljYXRpb24gb24gdGhlIHNlcnZlclxuICAgICAgICBwYWdlLmN0cmwuZGVsZXRlTm90aWZpY2F0aW9uKCQodGhpcykuYXR0cignZGF0YS1ub3RpZmljYXRpb24taWQnKSlcbiAgICAgICAgLnRoZW4ocGFnZS5jdHJsLmdldE5vdGlmaWNhdGlvbnMpXG4gICAgICAgIC50aGVuKHBhZ2Uudmlldy5yZW5kZXIpXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIGFsZXJ0KGVyci5zdGFjayk7XG4gICAgICAgICAgICBwYWdlLmN0cmwuZ2V0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgbm90aWZpY2F0aW9uRWxlbSA9ICQoJyNub3RpZmljYXRpb25zUGFnZScpLmZpbmQoJy5ub3RpZmljYXRpb25zJykuZW1wdHkoKTtcbiAgICB0aGlzLnBhZ2UuY3RybC5ub3RpZmljYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG5vdGlmaWNhdGlvbil7XG4gICAgICAgIHZhciBhbGVydFR5cGU7XG4gICAgICAgIHN3aXRjaChub3RpZmljYXRpb24udHlwZSl7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLlNVQ0NFU1M6XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkZSSUVORF9BQ0NFUFRFRDpcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuV0FSTklORzpcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuUkVNT1ZFRF9GUk9NX0JBTkQ6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LXdhcm5pbmcnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkVSUk9SOlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1kYW5nZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1pbmZvJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG5vdGlmaWNhdGlvbkVsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGEgaHJlZj1cIicrbm90aWZpY2F0aW9uLmxpbmsrJ1wiIGNsYXNzPVwibm90aWZpY2F0aW9uIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlICcrYWxlcnRUeXBlKydcIiBkYXRhLW5vdGlmaWNhdGlvbi1pZD1cIicrbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbklkKydcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPicrXG4gICAgICAgICAgICAgICAgJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+JytcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uLm1lc3NhZ2UrXG4gICAgICAgICc8L2E+Jyk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gUmVnaXN0ZXJQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyUGFnZScpWzBdLCBSZWdpc3RlckN0cmwsIFJlZ2lzdGVyVmlldyk7XG59XG5SZWdpc3RlclBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5SZWdpc3RlclBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJQYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBSZWdpc3RlckN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG59XG5SZWdpc3RlckN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQ3RybDtcblxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9yZWdpc3RlcicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIFJlZ2lzdGVyVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlclZpZXc7XG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXIodGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyQmFuZFBhZ2UnKVswXSwgUmVnaXN0ZXJCYW5kQ3RybCwgUmVnaXN0ZXJCYW5kVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblJlZ2lzdGVyQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kUGFnZTtcblxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbn1cblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRDdHJsO1xuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvcmVnaXN0ZXInLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZFZpZXc7XG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2UgPSB0aGlzLnBhZ2UsXG4gICAgICAgIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgICAgIFxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXG4gICAgICAgIHBhZ2UuY3RybC5sb2dpbih0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xuICAgICAgICAgICAgLy9kaXNwbGF5IHJlZ2lzdGVyIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlJlZ2lzdHJhdGlvbiBTdWNjZXNzZnVsITwvc3Ryb25nPiBSZWRpcmVjdGluZyBpbiAyIHNlY29uZHMuLi4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkJhbmQgUmVnaXN0cmF0aW9uIEZhaWxlZCE8L3N0cm9uZz4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbnZhciBzZWFyY2hpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gU2VhcmNoQmFuZHNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3NlYXJjaEJhbmRzUGFnZScpWzBdLCBTZWFyY2hCYW5kc0N0cmwsIFNlYXJjaEJhbmRzVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzUGFnZTtcblxuZnVuY3Rpb24gU2VhcmNoQmFuZHNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kcyA9IFtdO1xuICAgIHRoaXMuc2VhcmNoaW5nID0gZmFsc2U7XG59XG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzQ3RybDtcblxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGF0LmJhbmRzID0gW107XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9zZWFyY2gnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kcyA9IGRhdGE7XG4gICAgICAgIHRoYXQucGFnZS52aWV3LnVwZGF0ZUJhbmRMaXN0KCk7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8vIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSByZWxhdGlvbiB0aGUgYXBwbGljYXRpb24gZm9yIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoZSBzZWxlY3RlZCBiYW5kXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnN1Ym1pdEFwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGJhbmRJZCwgZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvYXBpL2JhbmRzLyR7YmFuZElkfS9zdWJtaXRBcHBsaWNhdGlvbmAsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpOyBcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8vIFRoaXMgbWV0aG9kIHdpbGwgZGVsZXRlIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhpcyBiYW5kXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmNhbmNlbEFwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGJhbmRJZCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvY2FuY2VsQXBwbGljYXRpb24nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtiYW5kSWQgOiBiYW5kSWR9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5leHBhbmRCYW5kTW9kYWwgPSBmdW5jdGlvbihhcHBsaWNhdGlvblR5cGUsIGFwcGxpY2F0aW9uU3RhdHVzLCBiYW5kSWQpIHtcbiAgICAkKCcubW9kYWwtYm9keScpLnJlbW92ZSgpO1xuICAgICQoJy5tb2RhbC1mb290ZXInKS5yZW1vdmUoKTsgICAgXG5cbiAgICB2YXIgYmFuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLm1vZGFsLWNvbnRlbnQnKTtcbiAgICB2YXIgYmFuZE5hbWUgPSBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCgpO1xuICAgIHZhciBpbnN0cnVtZW50RmllbGQgPSAnJztcblxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKGJhbmROYW1lKyc8YnIvPicrYXBwbGljYXRpb25UeXBlKycgQXBwbGljYXRpb24nKTtcblxuICAgIGlmIChhcHBsaWNhdGlvblR5cGUgPT09ICdNZW1iZXInKSB7XG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJpbnN0cnVtZW50XCIgcGxhY2Vob2xkZXI9XCJJbnN0cnVtZW50XCIgLz48cC8+JztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnN0cnVtZW50XCIgdmFsdWU9XCJOL0FcIi8+PHAvPic7ICBcbiAgICB9XG5cbiAgICBiYW5kTW9kYWwuYXBwZW5kKCcnK1xuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPicrXG4gICAgICAgICc8Zm9ybSBpZD1cImFwcGx5LWZvcm1cIiBjbGFzcz1cImFwcGx5LWZvcm1cIiBvbnN1Ym1pdD1cInJldHVyblwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnRGaWVsZCtcbiAgICAgICAgICAgICAgICAnPGlucHV0IHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiTWVzc2FnZVwiIC8+JytcbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYmFuZElkXCIgdmFsdWU9XCInK2JhbmRJZCsnXCIgLz4nK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJhcHBsaWNhdGlvblN0YXR1c1wiIHZhbHVlPVwiJythcHBsaWNhdGlvblN0YXR1cysnXCIgLz4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Zvcm0+JytcbiAgICAnPC9kaXY+JytcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicrICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgZm9ybT1cImFwcGx5LWZvcm1cIj4nK1xuICAgICAgICAgICAgICAgICdTdWJtaXQnK1xuICAgICAgICAgICAgJzwvYnV0dG9uPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+JytcbiAgICAgICAgJzwvZGl2PicrICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAnPC9kaXY+Jyk7XG59O1xuXG5mdW5jdGlvbiBTZWFyY2hCYW5kc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSB1bmRlZmluZWQ7XG59XG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzVmlldztcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpeyAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsICcuc2VhcmNoLWZvcm0gaW5wdXQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZhciB0aGlzRm9ybSA9ICQodGhpcyk7XG4gICAgICAgIGNsZWFyVGltZW91dChwYWdlLnZpZXcuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzRm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9KTtcblxuICAgIC8vIFN1Ym1pdHRpbmcgdGhlIHNlYXJjaCBzdHJpbmdcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uc2VhcmNoLWZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgIFxuICAgICAgICBwYWdlLmN0cmwuc2VhcmNoKHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpeyAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5hcHBseS1mb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICAgIFxuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpOyAgIFxuICAgICAgICBwYWdlLmN0cmwuc3VibWl0QXBwbGljYXRpb24ocGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwgMTApLCB0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC1mb3JtJykuc3VibWl0KCk7XG4gICAgICAgICAgICAvL2hhbmRsZSB0aGUgYXBwbGljYXRpb24gcmVzdWx0XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIFRvZ2dsZSBCYW5kIE1vZGFsXG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5iYW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0JhbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKSk7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgbWFuYWdlciBhcHBsaWNhdGlvbiByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseU1hbmFnZXInLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ01hbmFnZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NQU5BR0VSLCBiYW5kSWQpO1xuICAgIH0pXG5cbiAgICAvLyBIYW5kbGUgbWVtYmVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWVtYmVyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdNZW1iZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NRU1CRVIsIGJhbmRJZCk7XG4gICAgfSlcblxuICAgIC8vIEhhbmRsZSBwcm9tb3RlciBhcHBsaWNhdGlvbiByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseVByb21vdGVyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdQcm9tb3RlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX1BST01PVEVSLCBiYW5kSWQpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGFwcGxpY2F0aW9uIGNhbmNlbCByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuY2FuY2VsQXBwbGljYXRpb24oYmFuZElkKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvKnBhZ2VFbGVtLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAnI21vZGFsNycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdGhpcy51cGRhdGVCYW5kTGlzdDtcbiAgICB9KTsqL1xufTtcblxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS51cGRhdGVCYW5kTGlzdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcblxuICAgICAgICAvLyBJZiB5b3UgaGF2ZSBhIHJvbGUgdGhlbiB5b3UgYXJlIGluIHRoZSBiYW5kLCBzbyBubyBtb2RhbCBidXR0b25zXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlICE9ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlO1xuICAgICAgICB9XG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBhcHBsaWNhdGlvbiBzdGF0dXMgaWYgdGhleSBkbyBub3QgaGF2ZSBhIHJvbGUgaW4gdGhlIGJhbmRcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1lbWJlciknKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAncmVqZWN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggYmFuZFxuICAgICAgICBiYW5kc0VsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImJhbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1iYW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnXCIgPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5iYW5kTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5nZW5yZSsnKTwvc21hbGw+JytiYWRnZStcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XG4gICAgfVxufTtcblxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5zaG93QmFuZE1vZGFsID0gZnVuY3Rpb24gKGJhbmRJZCl7XG4gICAgdmFyIHRoaXNCYW5kID0gdGhpcy5wYWdlLmN0cmwuYmFuZHMuZmlsdGVyKGZ1bmN0aW9uIChiYW5kKXtcbiAgICAgICAgcmV0dXJuIGJhbmQuaWQgPT0gYmFuZElkO1xuICAgIH0pWzBdLFxuICAgICAgICBtb2RhbEJ1dHRvbnM7XG4gICAgXG4gICAgaWYgKHRoaXNCYW5kLnJvbGUgIT0gJ25vbmUnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICcnO1xuICAgIH1cbiAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gYXBwbGljYXRpb24gc3RhdHVzIGlmIHRoZXkgZG8gbm90IGhhdmUgYSByb2xlIGluIHRoZSBiYW5kXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgTWFuYWdlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgTWVtYmVyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIFByb21vdGVyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgIT09ICdibG9ja2VkJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5TWFuYWdlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBNYW5hZ2VyPC9idXR0b24+JysgXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlNZW1iZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWVtYmVyPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5BcHBseVByb21vdGVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIFByb21vdGVyPC9idXR0b24+JztcbiAgICB9XG4gICAgXG4gICAgdmFyIGJhbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kLW1vZGFsJyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYmFuZC1pZCcsdGhpc0JhbmQuaWQpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNCYW5kLmJhbmROYW1lKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNCYW5kLmRlc2NyaXB0aW9uKyc8L3A+Jyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXInKS5odG1sKCc8ZGl2IGNsYXNzPVwiZHluYW1pYy1idXR0b25zXCI+PC9kaXY+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+Jyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyJdfQ==
