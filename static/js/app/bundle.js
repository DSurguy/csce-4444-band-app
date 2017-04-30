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

function MenuItem(data){
    this.label = data.label||'';
    this.class = data.class||'';
    this.action = data.action||this.action;
    this.render = data.render||this.render;
}
MenuItem.prototype.render = function (){
    return $.Deferred().resolve('<button type="button" class="action '+this.class+' btn btn-secondary btn-block">'+this.label+'</button>').promise();
};
MenuItem.prototype.action = function (e){};

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
    var view = this;
    PageView.call(this, page);
    
    this.profileMenuItems = [{
        class: 'home',
        action: function (e){
            window.location = '/main';
        },
        render: function (){
            return $.Deferred().resolve('<button type="button" class="action home fa fa-home btn btn-secondary"></button>').promise();
        }
    }, {
        class: 'profile',
        action: function (e){
            window.location = '/profile';
        },
        render: function (){
            return $.Deferred().resolve('<div class="profile">'+
                '<img class="profile-img" src="https://placehold.it/150x150">'+
                '<div class="profile-name">username</div>'+
            '</div>').promise();
        }
    }].map(function (item){return new MenuItem(item)});
    
    this.mainMenuItems = [{
        label: 'Bands',
        class: 'bands',
        action: function (e){ 
            window.location = '/bands';
        }
    }, {
        label: 'Friends',
        class: 'friends',
        action: function (e){
            window.location = '/friends'; 
        }
    }, {
        label: 'Notifications',
        class: 'notifications',
        action: function (e){
            window.location = '/notifications';
        },
        render: function (){
            var defer = $.Deferred(),
                item = this;
            
            $.ajax({
                method: 'get',
                url: '/api/notifications?unread&count'
            })
            .then(function (data){
                defer.resolve('<button type="button" class="action '+item.class+' btn btn-secondary btn-block">'+item.label+' <span class="badge badge-pill badge-primary">'+(data.count||0)+'</span></button>'); 
            })
            .fail(defer.reject);
            
            return defer.promise();
        }
    }, {
        label: 'Logout',
        class: 'logout',
        action: function (e){
            view.page.ctrl.logout()
            .then(function (){
                window.location = '/login';
            }).catch(console.error);
        }
    }].map(function (item){return new MenuItem(item)});
    
    this.bandProfileItems = [{
        class: 'band-profile',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+1).concat('profile').join('/');
            window.location = newPath;
        },
        render: function (){
            var defer = $.Deferred();
            //return '<div class="band-profile" style="background-image: url(https://placehold.it/240x150)">'++'</div>'
            var loc = window.location.pathname.split('/');
            $.ajax({
                method: 'GET',
                url: '/api/bands/'+loc[loc.indexOf('bands')+1]
            })
            .then(function (band){
                defer.resolve('<div class="band-profile" style="background-image: url(https://placehold.it/240x150)">'+band.bandName+'</div>');
            })
            .catch(defer.reject);
            
            return defer.promise();
        }
    }].map(function (item){return new MenuItem(item)});
    
    this.bandMenuItems = [{
        label: 'Inventory',
        class: 'inventory',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).concat('inventory').join('/');
            window.location = newPath;
        }
    }, {
        label: 'Store',
        class: 'store',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).concat('store').join('/');
            window.location = newPath;
        }
    }, {
        label: 'Events',
        class: 'events',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).concat('events').join('/');
            window.location = newPath;
        }
    }, {
        label: 'Members',
        class: 'members',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).concat('members').join('/');
            window.location = newPath;
        }
    }, {
        label: 'Manage',
        class: 'manage',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).concat('manage').join('/');
            window.location = newPath;
        }
    }].map(function (item){return new MenuItem(item)});
}
MenuView.prototype = Object.create(PageView.prototype);
MenuView.prototype.constructor = MenuView;
MenuView.prototype.init = function (){
    var view = this;
    view.menuButtonContainer = $(view.page.elem);
    view.menuOverlayContainer = $('#menuOverlay');
    view.renderMenu()
    .then(function (){
        view.bindEvents();
    });
};
MenuView.prototype.renderMenu = function (){
    var view = this,
        defer = $.Deferred();
        
    /* render overlay */
    if( view.menuOverlayContainer.length == 0 ){
        $('body').append('<div id="menuOverlay" class="hidden"></div>');
        view.menuOverlayContainer = $("#menuOverlay");
    }
    view.menuOverlayContainer.empty();
    view.menuOverlayContainer.append('<div class="menu"></div>');
    
    //define the recursive asynchronous rendering function
    function nextItem(parent, items, index){
        if( index >= items.length ){
            return $.Deferred().resolve().promise();
        }
        var defer = $.Deferred();
        
        //build the html for this item
        items[index].render()
        .then(function (html){
            //add this item to the DOM
            parent.append(html);
            //render the next item
            nextItem(parent, items, index+1)
            .then(defer.resolve)
            .fail(defer.reject);
        })
        .fail(defer.reject);
        
        return defer.promise();
    }
    
    var shouldRenderBand = false;
    var splitLoc = window.location.pathname.split('/');
    if( splitLoc[splitLoc.indexOf('bands')+1] !== undefined ){
        shouldRenderBand = true;
    }
    
    //render profile chunk
    var parent = $('<div class="menu-section container profile-section clearfix"></div>');
    nextItem(parent, view.profileMenuItems, 0)
    .then(function (){
        //add the parent to the DOM
        view.menuOverlayContainer.find('.menu').append(parent);
        //bind profile events
        view.profileMenuItems.forEach(function (item){
            view.menuOverlayContainer.find('.menu').on('click', '.'+item.class, item.action);
        });
        //render main menu chunk
        parent = $('<div class="menu-section container clearfix"></div>');
        return nextItem(parent, view.mainMenuItems, 0);
    })
    .then(function (){
        //add the parent to the DOM
        view.menuOverlayContainer.find('.menu').append(parent);
        //bind profile events
        view.mainMenuItems.forEach(function (item){
            view.menuOverlayContainer.find('.menu').on('click', '.'+item.class, item.action);
        });
        
        //render band profile block
        parent = $('<div class="menu-section band-profile-section clearfix"></div>');
        if( shouldRenderBand ){
            return nextItem(parent, view.bandProfileItems, 0);
        }
        else{
            return $.Deferred().resolve().promise();
        }
    })
    .then(function (){
        //add the parent to the DOM
        view.menuOverlayContainer.find('.menu').append(parent);
        if( shouldRenderBand ){
            //bind profile events
            view.bandProfileItems.forEach(function (item){
                view.menuOverlayContainer.find('.menu').on('click', '.'+item.class, item.action);
            });
        }
        //render band items
        parent = $('<div class="menu-section container clearfix"></div>');
        if( shouldRenderBand ){
            return nextItem(parent, view.bandMenuItems, 0)
        }
        else{
            return $.Deferred().resolve().promise();
        }
    })
    .then(function (){
        //add the parent to the DOM
        view.menuOverlayContainer.find('.menu').append(parent);
        if( shouldRenderBand ){
            //bind profile events
            view.bandMenuItems.forEach(function (item){
                view.menuOverlayContainer.find('.menu').on('click', '.'+item.class, item.action);
            });
        }
        
        /* render menu button */
        view.menuButtonContainer.empty();
        view.menuButtonContainer.append('<div class="menu-toggle btn btn-secondary fa fa-bars"></div>');
        defer.resolve();
    })
    .catch(console.error);
    
    /*this.menuOverlayContainer.find('.menu').append(''+
    '<div class="menu-section container profile-section clearfix">'+
        '<button type="button" class="action home fa fa-home btn btn-secondary"></button>'+
        '<div class="profile">'+
            '<img class="profile-img" src="https://placehold.it/150x150">'+
            '<div class="name">username</div>'+
        '</div>'+
    '</div>');
    this.menuOverlayContainer.find('.menu').append('<div class="menu-section container clearfix">'
        +menuItems.map(function (item){
            if( typeof item.render === 'function' ){
                return item.render();
            }
            return '<button type="button" class="action '+item.class+' btn btn-secondary btn-block">'+item.label+'</button>';
        }).join('')
    +'</div>');
    
    menuItems.forEach(function (item){
        that.menuOverlayContainer.find('.menu').on('click', '.'+item.class, item.action);
    });*/
    return defer.promise();
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
    
    view.menuOverlayContainer.on('click', '.menu', function (e){
        e.stopPropagation();
        e.preventDefault();
    });
    
    view.menuOverlayContainer.find('.menu').on('click', '.home', function (e){
        window.location = '/main';
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
        +'<p class="info card-text"><strong>Band Name</strong>: '+this.page.ctrl.band.bandName+'</p>'
        +'<p class="info card-text"><strong>Owner</strong>: '+this.page.ctrl.band.ownerName+'</p>'
        +'<p class="info card-text"><strong>Description</strong>: '+this.page.ctrl.band.description+'</p>'
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
    return $.Deferred().resolve().promise();
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
        .then(function (){
            return page.ctrl.getNotifications();
        })
        .then(function (){
            page.view.render();
        })
        .catch(console.error);
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
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global MenuComponent */
/* global $ */

function ProfilePage(app, data){
    Page.call(this, app, $('#ProfilePage')[0], ProfileCtrl, BandView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
ProfilePage.prototype = Object.create(Page.prototype);
ProfilePage.prototype.constructor = ProfilePage;

function ProfileCtrl(page){
    PageCtrl.call(this, page);
    this.band = {};
}
ProfileCtrl.prototype = Object.create(PageCtrl.prototype);
ProfileCtrl.prototype.constructor = ProfileCtrl;
ProfileCtrl.prototype.init = function (){
    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];

    //var id = window.location.search.substr(1);
    var defer = $.Deferred();
    var that = this;
    $.ajax('/api/bands/' + id, {
        method: 'GET'
    }).then(function (data){
        that.profile = data;
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
        +'<p class="info card-text"><strong>Band Name</strong>: '+this.page.ctrl.band.bandName+'</p>'
        +'<p class="info card-text"><strong>Owner</strong>: '+this.page.ctrl.band.ownerName+'</p>'
        +'<p class="info card-text"><strong>Description</strong>: '+this.page.ctrl.band.description+'</p>'
    );
    
    this.bindEvents();
};

BandView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem);

    pageElem.on('click', '.applications', function (e){
        window.location = window.location.pathname+'/applications';
    });
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJpbnZlbnRvcnkuanMiLCJpdGVtLmpzIiwibm90aWZpY2F0aW9uLmpzIiwic2VhcmNoZWRCYW5kLmpzIiwic2ltcGxlQmFuZC5qcyIsImFwcC5qcyIsInBhZ2UuanMiLCJtZW51LmpzIiwiYWRkRnJpZW5kLmpzIiwiYWRkTWVyY2guanMiLCJhcHBsaWNhdGlvbnMuanMiLCJiYW5kcy5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyIsInVzZXJQcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBYnBKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBY2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBWnRPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBYWhGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBcHBsaWNhdGlvbihqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudXNlcm5hbWUgPSBqc29uLnVzZXJuYW1lIHx8ICcnO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XG4gICAgdGhpcy5tZXNzYWdlID0ganNvbi5tZXNzYWdlIHx8ICcnO1xufVxuXG5BcHBsaWNhdGlvbi5TVEFUVVMgPSB7XG5cdE5PTkU6IDAsIFxuICAgIEFQUExJRURfTUFOQUdFUjogMSxcbiAgICBBUFBMSUVEX01FTUJFUjogMixcbiAgICBBUFBMSUVEX1BST01PVEVSOiAzLFxuXHRBQ0NFUFRFRDogNCwgXG5cdFJFSkVDVEVEOiA1LFxuICAgIEJMT0NLRUQ6IDZcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IH0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kUGFnZScpWzBdLCBCYW5kQ3RybCwgQmFuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFBhZ2U7XG5cbmZ1bmN0aW9uIEJhbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kID0ge307XG59XG5CYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5CYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kQ3RybDtcbkJhbmRDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgIC8vdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJyArIGlkLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEJhbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5CYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kVmlldztcbkJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGJhbmRFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQnKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxoMiBjbGFzcz1cImNhcmQtdGl0bGVcIj5NeSBCYW5kPC9oMj4nKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+PC9kaXY+Jyk7XG4gICAgXG4gICAgdmFyIGJhbmRJbmZvRWxlbSA9IGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJyk7XG4gICAgYmFuZEluZm9FbGVtLmFwcGVuZCgnJ1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkJhbmQgTmFtZTwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kLmJhbmROYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPk93bmVyPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmQub3duZXJOYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkRlc2NyaXB0aW9uPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmQuZGVzY3JpcHRpb24rJzwvcD4nXG4gICAgKTtcbiAgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKycvYXBwbGljYXRpb25zJztcbiAgICB9KTtcbn07IiwiZnVuY3Rpb24gQmFuZE1lbWJlcihqc29uKXtcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmJhbmRJZCA9IGpzb24uYmFuZElkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnVzZXJuYW1lID0ganNvbi51c2VybmFtZSB8fCAnJztcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5pbnN0cnVtZW50ID0ganNvbi5pbnN0cnVtZW50IHx8ICcnO1xuICAgIHRoaXMucm9sZSA9IGpzb24ucm9sZSB8fCAnJztcbn1cblxuQmFuZE1lbWJlci5ST0xFID0ge1xuICAgIE5PTkU6IC0xLFxuICAgIE9XTkVSIDogMCxcbiAgICBNQU5BR0VSOiAxLFxuICAgIE1FTUJFUiA6IDIsXG4gICAgUFJPTU9URVIgOiAzXG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEJhbmRNZW1iZXI7IH0iLCJmdW5jdGlvbiBGcmllbmQoanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLnVzZXJOYW1lID0ganNvbi51c2VyTmFtZSB8fCAnJztcbiAgICB0aGlzLmJpbyA9IGpzb24uYmlvIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBqc29uLnN0YXR1cyB8fCAnJztcbn1cblxuRnJpZW5kLlNUQVRVUyA9IHtcblx0Tk9ORTogMCwgXG5cdEZSSUVORDogMSwgXG5cdFJFUVVFU1RFRDogMiwgXG5cdFBFTkRJTkc6IDMsIFxuXHRCTE9DS0VEOiA0IFxufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBGcmllbmQ7IH0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIEludmVudG9yeVBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjaW52ZW50b3J5UGFnZScpWzBdLCBJbnZlbnRvcnlDdHJsLCBJbnZlbnRvcnlWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5JbnZlbnRvcnlQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuSW52ZW50b3J5UGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlQYWdlO1xuXG5mdW5jdGlvbiBJbnZlbnRvcnlDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5pdGVtSW52ZW50b3J5ID0gW107XG59XG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkludmVudG9yeUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW52ZW50b3J5Q3RybDtcbkludmVudG9yeUN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcblxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG4gICAgdmFyIHRoYXQgPSB0aGlzOyBcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9pbnZlbnRvcnknLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5pdGVtSW52ZW50b3J5ID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEludmVudG9yeVZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkludmVudG9yeVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlWaWV3O1xuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHZhciBpbnZlbnRvcnlFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmludmVudG9yeScpO1xuXG4gICAgdGhpcy5wYWdlLmN0cmwuaXRlbUludmVudG9yeS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKXtcbiAgICAgICAgaW52ZW50b3J5RWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZFwiIHN0eWxlPVwid2lkdGg6IDIwcmVtO1wiPicrXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cImNhcmQtaW1nLXRvcFwiIHNyYz1cIi9tZWRpYS8nK2l0ZW0uaW1hZ2VQYXRoKydcIiBhbHQ9XCJDYXJkIGltYWdlIGNhcFwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+JytpdGVtLm5hbWUrJzwvaDQ+JytcbiAgICAgICAgICAgICAgICAnPHAgY2xhc3M9XCJjYXJkLXRleHRcIj4nK2l0ZW0uZGVzY3JpcHRpb24rJzwvcD4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPHVsIGNsYXNzPVwibGlzdC1ncm91cCBsaXN0LWdyb3VwLWZsdXNoXCI+JytcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+Q3JhcyBqdXN0byBvZGlvPC9saT4nK1xuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5EYXBpYnVzIGFjIGZhY2lsaXNpcyBpbjwvbGk+JytcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+VmVzdGlidWx1bSBhdCBlcm9zPC9saT4nK1xuICAgICAgICAgICAgJzwvdWw+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjYXJkLWxpbmtcIj5DYXJkIGxpbms8L2E+JytcbiAgICAgICAgICAgICAgICAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhcmQtbGlua1wiPkFub3RoZXIgbGluazwvYT4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nKTtcbiAgICB9KTtcbn07XG5cbkludmVudG9yeVZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hZGQtbWVyY2gnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvJytpZCsnL2FkZG1lcmNoJztcbiAgICB9KTtcbn07IiwiZnVuY3Rpb24gSXRlbShqc29uKSB7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgdGhpcy50eXBlID0ganNvbi50eXBlIHx8ICcnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBqc29uLmRlc2NyaXB0aW9uIHx8ICcnO1xuICAgIHRoaXMuaW1hZ2VQYXRoID0ganNvbi5pbWFnZVBhdGggfHwgJyc7XG4gICAgdGhpcy5pbWFnZUZpbGUgPSBqc29uLmltYWdlRmlsZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5wcmljZSA9IGpzb24ucHJpY2UgfHwgMDtcbiAgICB0aGlzLmludmVudG9yeSA9IGpzb24uaW52ZW50b3J5IHx8IHVuZGVmaW5lZDtcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gSXRlbTsgfSIsImZ1bmN0aW9uIE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25JZCwgdXNlcklkLCB0eXBlLCBtZXNzYWdlLCBsaW5rLCB1bnJlYWQpe1xuICAgIHRoaXMubm90aWZpY2F0aW9uSWQgPSBub3RpZmljYXRpb25JZDtcbiAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5saW5rID0gbGluaztcbiAgICB0aGlzLnVucmVhZCA9IHVucmVhZDtcbn1cbk5vdGlmaWNhdGlvbi5UWVBFID0ge1xuICAgIE5PX01FU1NBR0U6IDAsXG4gICAgRlJJRU5EX1JFUVVFU1Q6IDEsXG4gICAgRlJJRU5EX0FDQ0VQVEVEOiAyLFxuICAgIEJBTkRfSU5WSVRFOiAzLFxuICAgIFJFTU9WRURfRlJPTV9CQU5EOiA0LFxuICAgIEVWRU5UX0lOVklURTogNSxcbiAgICBFVkVOVF9SRU1JTkRFUjogNixcbiAgICBFUlJPUjogNyxcbiAgICBTVUNDRVNTOiA4LFxuICAgIFdBUk5JTkc6IDlcbn07XG5Ob3RpZmljYXRpb24uZnJvbU9iaiA9IGZ1bmN0aW9uIChvYmope1xuICAgIHZhciBteU5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24oKTtcbiAgICBteU5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25JZCA9IG9iai5ub3RpZmljYXRpb25JZCB8fCBvYmouTm90aWZpY2F0aW9uSWQgfHwgLTE7XG4gICAgbXlOb3RpZmljYXRpb24udXNlcklkID0gb2JqLnVzZXJJZCB8fCBvYmouVXNlcklkIHx8IC0xO1xuICAgIG15Tm90aWZpY2F0aW9uLnR5cGUgPSBvYmoudHlwZSB8fCBvYmouVHlwZSB8fCBOb3RpZmljYXRpb24uVFlQRS5OT19NRVNTQUdFO1xuICAgIG15Tm90aWZpY2F0aW9uLm1lc3NhZ2UgPSBvYmoubWVzc2FnZSB8fCBvYmouTWVzc2FnZSB8fCAnJztcbiAgICBteU5vdGlmaWNhdGlvbi5saW5rID0gb2JqLmxpbmsgfHwgb2JqLkxpbmsgfHwgJyMnO1xuICAgIG15Tm90aWZpY2F0aW9uLnVucmVhZCA9IG9iai51bnJlYWQgfHwgb2JqLlVucmVhZCB8fCB0cnVlO1xuICAgIHJldHVybiBteU5vdGlmaWNhdGlvbjtcbn07XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IE5vdGlmaWNhdGlvbjsgfVxuIiwiZnVuY3Rpb24gU2VhcmNoZWRCYW5kKGpzb24pe1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YXR1cyA9IGpzb24uYXBwbGljYXRpb25TdGF0dXMgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucm9sZSA9IGpzb24ucm9sZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGpzb24uZGVzY3JpcHRpb24gfHwgJyc7XG4gICAgdGhpcy5nZW5yZSA9IGpzb24uZ2VucmUgfHwgJyc7XG59XG5cblNlYXJjaGVkQmFuZC5ST0xFID0ge1xuICAgIE9XTkVSOiAwLFxuICAgIE1BTkFHRVI6IDEsXG4gICAgTUVNQkVSOiAyLFxuICAgIFBST01PVEVSOiAzXG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNlYXJjaGVkQmFuZDsgfSIsImZ1bmN0aW9uIFNpbXBsZUJhbmQoanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLm93bmVyTmFtZSA9IGpzb24ub3duZXJOYW1lIHx8ICcnO1xuICAgIHRoaXMub3duZXJJZCA9IGpzb24ub3duZXJJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUJhbmQ7IH0iLCIvKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBBcHAoKXtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdW5kZWZpbmVkO1xuICAgIC8vdGhpcy5wYWdlSGlzdG9yeSA9IFtdO1xufVxuQXBwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKFBhZ2VDb25zdHJ1Y3Rvcil7XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IG5ldyBQYWdlQ29uc3RydWN0b3IodGhpcyk7XG4gICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcbn07XG4vKkFwcC5wcm90b3R5cGUuY2hhbmdlUGFnZSA9IGZ1bmN0aW9uIChwYWdlLCBkYXRhKXtcbiAgICBpZiggdGhpcy5jdXJyZW50UGFnZSApe1xuICAgICAgICAvL3N0b3JlIHRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGxhc3QgcGFnZVxuICAgICAgICB0aGlzLnBhZ2VIaXN0b3J5LnB1c2godGhpcy5jdXJyZW50UGFnZS5jb25zdHJ1Y3Rvcik7XG4gICAgICAgICQodGhpcy5jdXJyZW50UGFnZS5lbGVtKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfVxuICAgIC8vY3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBuZXh0IHBhZ2VcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IHBhZ2UodGhpcyk7XG4gICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB0aGlzLmN1cnJlbnRQYWdlLmluaXQoKTtcbn07Ki8iLCIvKiBnbG9iYWwgJCAqL1xuLyoqIEluaGVyaXRhYmxlIENsYXNzZXMgKiovXG5mdW5jdGlvbiBQYWdlKGFwcCwgZWxlbSwgY3RybENvbnN0cnVjdG9yLCB2aWV3Q29uc3RydWN0b3IsIGNoaWxkQ29tcG9uZW50cyl7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5lbGVtID0gZWxlbTtcbiAgICB0aGlzLmN0cmwgPSBuZXcgY3RybENvbnN0cnVjdG9yKHRoaXMpO1xuICAgIHRoaXMudmlldyA9IG5ldyB2aWV3Q29uc3RydWN0b3IodGhpcyk7XG4gICAgdGhpcy5jaGlsZENvbXBvbmVudHMgPSBjaGlsZENvbXBvbmVudHMgfHwge307XG59XG5QYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgIGZvciggdmFyIGNvbXBvbmVudCBpbiB0aGlzLmNoaWxkQ29tcG9uZW50cyApe1xuICAgICAgICB0aGlzLmNoaWxkQ29tcG9uZW50c1tjb21wb25lbnRdLmluaXQoKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5jdHJsLmluaXQoKVxuICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICB0aGF0LnZpZXcuaW5pdC5hcHBseSh0aGF0LnZpZXcsIGFyZ3VtZW50cyk7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG59O1xuXG5mdW5jdGlvbiBQYWdlQ3RybChwYWdlKXtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xufVxuUGFnZUN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBQYWdlVmlldyhwYWdlKXtcbiAgICB0aGlzLnBhZ2UgPSBwYWdlO1xufVxuUGFnZVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXt9OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gTWVudUl0ZW0oZGF0YSl7XG4gICAgdGhpcy5sYWJlbCA9IGRhdGEubGFiZWx8fCcnO1xuICAgIHRoaXMuY2xhc3MgPSBkYXRhLmNsYXNzfHwnJztcbiAgICB0aGlzLmFjdGlvbiA9IGRhdGEuYWN0aW9ufHx0aGlzLmFjdGlvbjtcbiAgICB0aGlzLnJlbmRlciA9IGRhdGEucmVuZGVyfHx0aGlzLnJlbmRlcjtcbn1cbk1lbnVJdGVtLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcbiAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWN0aW9uICcrdGhpcy5jbGFzcysnIGJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1ibG9ja1wiPicrdGhpcy5sYWJlbCsnPC9idXR0b24+JykucHJvbWlzZSgpO1xufTtcbk1lbnVJdGVtLnByb3RvdHlwZS5hY3Rpb24gPSBmdW5jdGlvbiAoZSl7fTtcblxuZnVuY3Rpb24gTWVudUNvbXBvbmVudChhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoZGF0YS5lbGVtZW50KVswXSwgTWVudUN0cmwsIE1lbnVWaWV3KTtcbn1cbk1lbnVDb21wb25lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5NZW51Q29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVDb21wb25lbnQ7XG5cbmZ1bmN0aW9uIE1lbnVDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG59XG5NZW51Q3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5NZW51Q3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Q3RybDtcbk1lbnVDdHJsLnByb3RvdHlwZS5sb2dvdXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9hcGkvbG9nb3V0J1xuICAgIH0pLnRoZW4oZGVmZXIucmVzb2x2ZSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuXG5mdW5jdGlvbiBNZW51VmlldyhwYWdlKXtcbiAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICBcbiAgICB0aGlzLnByb2ZpbGVNZW51SXRlbXMgPSBbe1xuICAgICAgICBjbGFzczogJ2hvbWUnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbWFpbic7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWN0aW9uIGhvbWUgZmEgZmEtaG9tZSBidG4gYnRuLXNlY29uZGFyeVwiPjwvYnV0dG9uPicpLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgY2xhc3M6ICdwcm9maWxlJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL3Byb2ZpbGUnO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCc8ZGl2IGNsYXNzPVwicHJvZmlsZVwiPicrXG4gICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJwcm9maWxlLWltZ1wiIHNyYz1cImh0dHBzOi8vcGxhY2Vob2xkLml0LzE1MHgxNTBcIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJvZmlsZS1uYW1lXCI+dXNlcm5hbWU8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicpLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgIH1dLm1hcChmdW5jdGlvbiAoaXRlbSl7cmV0dXJuIG5ldyBNZW51SXRlbShpdGVtKX0pO1xuICAgIFxuICAgIHRoaXMubWFpbk1lbnVJdGVtcyA9IFt7XG4gICAgICAgIGxhYmVsOiAnQmFuZHMnLFxuICAgICAgICBjbGFzczogJ2JhbmRzJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7IFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnRnJpZW5kcycsXG4gICAgICAgIGNsYXNzOiAnZnJpZW5kcycsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzJzsgXG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnTm90aWZpY2F0aW9ucycsXG4gICAgICAgIGNsYXNzOiAnbm90aWZpY2F0aW9ucycsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9ub3RpZmljYXRpb25zJztcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucz91bnJlYWQmY291bnQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWN0aW9uICcraXRlbS5jbGFzcysnIGJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1ibG9ja1wiPicraXRlbS5sYWJlbCsnIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1wcmltYXJ5XCI+JysoZGF0YS5jb3VudHx8MCkrJzwvc3Bhbj48L2J1dHRvbj4nKTsgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdMb2dvdXQnLFxuICAgICAgICBjbGFzczogJ2xvZ291dCcsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwubG9nb3V0KClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xuICAgICAgICAgICAgfSkuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgICAgIH1cbiAgICB9XS5tYXAoZnVuY3Rpb24gKGl0ZW0pe3JldHVybiBuZXcgTWVudUl0ZW0oaXRlbSl9KTtcbiAgICBcbiAgICB0aGlzLmJhbmRQcm9maWxlSXRlbXMgPSBbe1xuICAgICAgICBjbGFzczogJ2JhbmQtcHJvZmlsZScsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgIG5ld1BhdGggPSBuZXdQYXRoLnNsaWNlKDAsIG5ld1BhdGguaW5kZXhPZignYmFuZHMnKSsxKS5jb25jYXQoJ3Byb2ZpbGUnKS5qb2luKCcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBuZXdQYXRoO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgLy9yZXR1cm4gJzxkaXYgY2xhc3M9XCJiYW5kLXByb2ZpbGVcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL3BsYWNlaG9sZC5pdC8yNDB4MTUwKVwiPicrKyc8L2Rpdj4nXG4gICAgICAgICAgICB2YXIgbG9jID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2xvY1tsb2MuaW5kZXhPZignYmFuZHMnKSsxXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChiYW5kKXtcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCc8ZGl2IGNsYXNzPVwiYmFuZC1wcm9maWxlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cHM6Ly9wbGFjZWhvbGQuaXQvMjQweDE1MClcIj4nK2JhbmQuYmFuZE5hbWUrJzwvZGl2PicpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfV0ubWFwKGZ1bmN0aW9uIChpdGVtKXtyZXR1cm4gbmV3IE1lbnVJdGVtKGl0ZW0pfSk7XG4gICAgXG4gICAgdGhpcy5iYW5kTWVudUl0ZW1zID0gW3tcbiAgICAgICAgbGFiZWw6ICdJbnZlbnRvcnknLFxuICAgICAgICBjbGFzczogJ2ludmVudG9yeScsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgIG5ld1BhdGggPSBuZXdQYXRoLnNsaWNlKDAsIG5ld1BhdGguaW5kZXhPZignYmFuZHMnKSsyKS5jb25jYXQoJ2ludmVudG9yeScpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnU3RvcmUnLFxuICAgICAgICBjbGFzczogJ3N0b3JlJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmNvbmNhdCgnc3RvcmUnKS5qb2luKCcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBsYWJlbDogJ0V2ZW50cycsXG4gICAgICAgIGNsYXNzOiAnZXZlbnRzJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmNvbmNhdCgnZXZlbnRzJykuam9pbignLycpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdNZW1iZXJzJyxcbiAgICAgICAgY2xhc3M6ICdtZW1iZXJzJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmNvbmNhdCgnbWVtYmVycycpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnTWFuYWdlJyxcbiAgICAgICAgY2xhc3M6ICdtYW5hZ2UnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdtYW5hZ2UnKS5qb2luKCcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgfV0ubWFwKGZ1bmN0aW9uIChpdGVtKXtyZXR1cm4gbmV3IE1lbnVJdGVtKGl0ZW0pfSk7XG59XG5NZW51Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5NZW51Vmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51Vmlldztcbk1lbnVWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgIHZpZXcubWVudUJ1dHRvbkNvbnRhaW5lciA9ICQodmlldy5wYWdlLmVsZW0pO1xuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIgPSAkKCcjbWVudU92ZXJsYXknKTtcbiAgICB2aWV3LnJlbmRlck1lbnUoKVxuICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICB2aWV3LmJpbmRFdmVudHMoKTtcbiAgICB9KTtcbn07XG5NZW51Vmlldy5wcm90b3R5cGUucmVuZGVyTWVudSA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciB2aWV3ID0gdGhpcyxcbiAgICAgICAgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgIFxuICAgIC8qIHJlbmRlciBvdmVybGF5ICovXG4gICAgaWYoIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIubGVuZ3RoID09IDAgKXtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCgnPGRpdiBpZD1cIm1lbnVPdmVybGF5XCIgY2xhc3M9XCJoaWRkZW5cIj48L2Rpdj4nKTtcbiAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoXCIjbWVudU92ZXJsYXlcIik7XG4gICAgfVxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZW1wdHkoKTtcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnVcIj48L2Rpdj4nKTtcbiAgICBcbiAgICAvL2RlZmluZSB0aGUgcmVjdXJzaXZlIGFzeW5jaHJvbm91cyByZW5kZXJpbmcgZnVuY3Rpb25cbiAgICBmdW5jdGlvbiBuZXh0SXRlbShwYXJlbnQsIGl0ZW1zLCBpbmRleCl7XG4gICAgICAgIGlmKCBpbmRleCA+PSBpdGVtcy5sZW5ndGggKXtcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgIFxuICAgICAgICAvL2J1aWxkIHRoZSBodG1sIGZvciB0aGlzIGl0ZW1cbiAgICAgICAgaXRlbXNbaW5kZXhdLnJlbmRlcigpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChodG1sKXtcbiAgICAgICAgICAgIC8vYWRkIHRoaXMgaXRlbSB0byB0aGUgRE9NXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kKGh0bWwpO1xuICAgICAgICAgICAgLy9yZW5kZXIgdGhlIG5leHQgaXRlbVxuICAgICAgICAgICAgbmV4dEl0ZW0ocGFyZW50LCBpdGVtcywgaW5kZXgrMSlcbiAgICAgICAgICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgICAgICAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHNob3VsZFJlbmRlckJhbmQgPSBmYWxzZTtcbiAgICB2YXIgc3BsaXRMb2MgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICBpZiggc3BsaXRMb2Nbc3BsaXRMb2MuaW5kZXhPZignYmFuZHMnKSsxXSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgIHNob3VsZFJlbmRlckJhbmQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICAvL3JlbmRlciBwcm9maWxlIGNodW5rXG4gICAgdmFyIHBhcmVudCA9ICQoJzxkaXYgY2xhc3M9XCJtZW51LXNlY3Rpb24gY29udGFpbmVyIHByb2ZpbGUtc2VjdGlvbiBjbGVhcmZpeFwiPjwvZGl2PicpO1xuICAgIG5leHRJdGVtKHBhcmVudCwgdmlldy5wcm9maWxlTWVudUl0ZW1zLCAwKVxuICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAvL2FkZCB0aGUgcGFyZW50IHRvIHRoZSBET01cbiAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5maW5kKCcubWVudScpLmFwcGVuZChwYXJlbnQpO1xuICAgICAgICAvL2JpbmQgcHJvZmlsZSBldmVudHNcbiAgICAgICAgdmlldy5wcm9maWxlTWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5maW5kKCcubWVudScpLm9uKCdjbGljaycsICcuJytpdGVtLmNsYXNzLCBpdGVtLmFjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICAvL3JlbmRlciBtYWluIG1lbnUgY2h1bmtcbiAgICAgICAgcGFyZW50ID0gJCgnPGRpdiBjbGFzcz1cIm1lbnUtc2VjdGlvbiBjb250YWluZXIgY2xlYXJmaXhcIj48L2Rpdj4nKTtcbiAgICAgICAgcmV0dXJuIG5leHRJdGVtKHBhcmVudCwgdmlldy5tYWluTWVudUl0ZW1zLCAwKTtcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAvL2FkZCB0aGUgcGFyZW50IHRvIHRoZSBET01cbiAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5maW5kKCcubWVudScpLmFwcGVuZChwYXJlbnQpO1xuICAgICAgICAvL2JpbmQgcHJvZmlsZSBldmVudHNcbiAgICAgICAgdmlldy5tYWluTWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5maW5kKCcubWVudScpLm9uKCdjbGljaycsICcuJytpdGVtLmNsYXNzLCBpdGVtLmFjdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy9yZW5kZXIgYmFuZCBwcm9maWxlIGJsb2NrXG4gICAgICAgIHBhcmVudCA9ICQoJzxkaXYgY2xhc3M9XCJtZW51LXNlY3Rpb24gYmFuZC1wcm9maWxlLXNlY3Rpb24gY2xlYXJmaXhcIj48L2Rpdj4nKTtcbiAgICAgICAgaWYoIHNob3VsZFJlbmRlckJhbmQgKXtcbiAgICAgICAgICAgIHJldHVybiBuZXh0SXRlbShwYXJlbnQsIHZpZXcuYmFuZFByb2ZpbGVJdGVtcywgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIC8vYWRkIHRoZSBwYXJlbnQgdG8gdGhlIERPTVxuICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKHBhcmVudCk7XG4gICAgICAgIGlmKCBzaG91bGRSZW5kZXJCYW5kICl7XG4gICAgICAgICAgICAvL2JpbmQgcHJvZmlsZSBldmVudHNcbiAgICAgICAgICAgIHZpZXcuYmFuZFByb2ZpbGVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKXtcbiAgICAgICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy4nK2l0ZW0uY2xhc3MsIGl0ZW0uYWN0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vcmVuZGVyIGJhbmQgaXRlbXNcbiAgICAgICAgcGFyZW50ID0gJCgnPGRpdiBjbGFzcz1cIm1lbnUtc2VjdGlvbiBjb250YWluZXIgY2xlYXJmaXhcIj48L2Rpdj4nKTtcbiAgICAgICAgaWYoIHNob3VsZFJlbmRlckJhbmQgKXtcbiAgICAgICAgICAgIHJldHVybiBuZXh0SXRlbShwYXJlbnQsIHZpZXcuYmFuZE1lbnVJdGVtcywgMClcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgLy9hZGQgdGhlIHBhcmVudCB0byB0aGUgRE9NXG4gICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQocGFyZW50KTtcbiAgICAgICAgaWYoIHNob3VsZFJlbmRlckJhbmQgKXtcbiAgICAgICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICAgICAgdmlldy5iYW5kTWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5vbignY2xpY2snLCAnLicraXRlbS5jbGFzcywgaXRlbS5hY3Rpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qIHJlbmRlciBtZW51IGJ1dHRvbiAqL1xuICAgICAgICB2aWV3Lm1lbnVCdXR0b25Db250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgdmlldy5tZW51QnV0dG9uQ29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnUtdG9nZ2xlIGJ0biBidG4tc2Vjb25kYXJ5IGZhIGZhLWJhcnNcIj48L2Rpdj4nKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgIFxuICAgIC8qdGhpcy5tZW51T3ZlcmxheUNvbnRhaW5lci5maW5kKCcubWVudScpLmFwcGVuZCgnJytcbiAgICAnPGRpdiBjbGFzcz1cIm1lbnUtc2VjdGlvbiBjb250YWluZXIgcHJvZmlsZS1zZWN0aW9uIGNsZWFyZml4XCI+JytcbiAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWN0aW9uIGhvbWUgZmEgZmEtaG9tZSBidG4gYnRuLXNlY29uZGFyeVwiPjwvYnV0dG9uPicrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicHJvZmlsZVwiPicrXG4gICAgICAgICAgICAnPGltZyBjbGFzcz1cInByb2ZpbGUtaW1nXCIgc3JjPVwiaHR0cHM6Ly9wbGFjZWhvbGQuaXQvMTUweDE1MFwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm5hbWVcIj51c2VybmFtZTwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nK1xuICAgICc8L2Rpdj4nKTtcbiAgICB0aGlzLm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudS1zZWN0aW9uIGNvbnRhaW5lciBjbGVhcmZpeFwiPidcbiAgICAgICAgK21lbnVJdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgaWYoIHR5cGVvZiBpdGVtLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFjdGlvbiAnK2l0ZW0uY2xhc3MrJyBidG4gYnRuLXNlY29uZGFyeSBidG4tYmxvY2tcIj4nK2l0ZW0ubGFiZWwrJzwvYnV0dG9uPic7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgKyc8L2Rpdj4nKTtcbiAgICBcbiAgICBtZW51SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgIHRoYXQubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5vbignY2xpY2snLCAnLicraXRlbS5jbGFzcywgaXRlbS5hY3Rpb24pO1xuICAgIH0pOyovXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5NZW51Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICB2aWV3ID0gdGhpcztcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLm1lbnUtdG9nZ2xlJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy5ob21lJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL21haW4nO1xuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEFkZEZyaWVuZFBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkRnJpZW5kUGFnZScpWzBdLCBBZGRGcmllbmRDdHJsLCBBZGRGcmllbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkRnJpZW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRQYWdlO1xuXG5mdW5jdGlvbiBBZGRGcmllbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5mcmllbmRzID0gW107XG59XG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kQ3RybDtcblxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmZyaWVuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIFwidG9cIiB1c2VyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBBZGRGcmllbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kVmlldztcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQ7XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlwcmVzcycsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC11c2VyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcGFnZS52aWV3LnVwZGF0ZVVzZXJMaXN0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwgMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTsgIFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBibG9jayByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5CbG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5CTE9DS0VEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIHVuYmxvY2sgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5ibG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGNhbmNlbCByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5DYW5jZWxSZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQWNjZXB0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkZSSUVORClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVqZWN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZWplY3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSB1bmZyaWVuZFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbnZlcnNlJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICAgICAgYmFkZ2UgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIHVzZXJcbiAgICAgICAgZnJpZW5kc0VsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImZyaWVuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWZyaWVuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5pZCsnXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0udXNlck5hbWUrXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5uYW1lKycpPC9zbWFsbD4nK2JhZGdlKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XG4gICAgfVxufTtcblxuQWRkRnJpZW5kVmlldy5wcm90b3R5cGUuc2hvd0ZyaWVuZE1vZGFsID0gZnVuY3Rpb24gKGZyaWVuZElkKXtcbiAgICB2YXIgdGhpc0ZyaWVuZCA9IHRoaXMucGFnZS5jdHJsLmZyaWVuZHMuZmlsdGVyKGZ1bmN0aW9uIChmcmllbmQpe1xuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xuICAgIH0pWzBdLFxuICAgICAgICBtb2RhbEJ1dHRvbnM7XG4gICAgICAgIFxuICAgIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuVW5mcmllbmRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5mcmllbmQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5SZWplY3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdibG9ja2VkJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuVW5ibG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5SZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FkZE1lcmNoUGFnZScpWzBdLCBBZGRNZXJjaEN0cmwsIEFkZE1lcmNoVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQWRkTWVyY2hQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkTWVyY2hQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZE1lcmNoUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5hZGRtZXJjaGluZyA9IGZhbHNlO1xufVxuQWRkTWVyY2hDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFkZE1lcmNoQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRNZXJjaEN0cmw7XG5cbkFkZE1lcmNoQ3RybC5wcm90b3R5cGUuc3VibWl0TWVyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycraWQrJy9hZGRtZXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLyoqXG4gKiBWSUVXRVJcbiAqICovXG5mdW5jdGlvbiBBZGRNZXJjaFZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkFkZE1lcmNoVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkTWVyY2hWaWV3O1xuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnW25hbWU9XCJhZGRJbnZlbnRvcnlcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xufTtcblxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnW25hbWU9XCJhZGRJbnZlbnRvcnlcIl0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZWxlY3QgPSBwYWdlRWxlbS5maW5kKCdbbmFtZT1cIm1lcmNoVHlwZVwiXScpO1xuICAgICAgICBwYWdlLnZpZXcuYWRkSW52ZW50b3J5RmllbGRzKHNlbGVjdFswXS52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBXZSd2ZSBwaWNrZWQgYSB0eXBlIHNvIGVuYWJsZSB0aGUgQWRkIEludmVudG9yeSBidXR0b24gYW5kIHJlbW92ZSBhbnkgZXhpc3RpbmcgZmllbGRzIGZyb20gb3RoZXIgdHlwZXNcbiAgICBwYWdlRWxlbS5vbignY2hhbmdlJywgJ1tuYW1lPVwibWVyY2hUeXBlXCJdJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlRWxlbS5maW5kKCdbbmFtZT1cImFkZEludmVudG9yeVwiXScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICBwYWdlRWxlbS5maW5kKCcuZHluYW1pY0ZpZWxkcycpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5zdWJtaXRNZXJjaCh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmFkZEludmVudG9yeUZpZWxkcyA9IGZ1bmN0aW9uICh0eXBlKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIHR5cGVGaWVsZHMgPSAnJztcblxuICAgIGlmICh0eXBlID09PSAnc2hpcnQnKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInNcIj5TPC9vcHRpb24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwibVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJsXCI+TDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInhsXCI+WEw8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9zZWxlY3Q+JztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdjZCcpIHtcbiAgICAgICAgdHlwZUZpZWxkcyA9ICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic2l6ZVwiIHZhbHVlPVwibm9uZVwiIC8+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0aWNrZXInKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjF4MVwiPjF4MTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjJ4MlwiPjJ4Mjwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjN4NFwiPjN4NDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjV4NlwiPjV4Njwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICc8L3NlbGVjdD4nO1xuICAgIH1cblxuICAgIC8vIEFsbCB0eXBlcyB3aWxsIGhhdmUgYSBxdWFudGl0eSBhbmQgY29sb3JcbiAgICB0eXBlRmllbGRzICs9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNvbG9yXCIgcGxhY2Vob2xkZXI9XCJDb2xvclwiIC8+JytcbiAgICAgICAgICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIHJlcXVpcmVkIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwicXVhbnRpdHlcIiBtaW49XCIwXCIgc3RlcD1cIjFcIiBwbGFjZWhvbGRlcj1cIlF1YW50aXR5XCI+JztcblxuICAgIHZhciB0eXBlRmllbGRzRGl2ID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmR5bmFtaWNGaWVsZHNDb250YWluZXInKTtcbiAgICB0eXBlRmllbGRzRGl2LmFwcGVuZCh0eXBlRmllbGRzKTtcbn0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIEFwcGxpY2F0aW9uICovXG4vKiBnbG9iYWwgQmFuZE1lbWJlciAqL1xuXG5mdW5jdGlvbiBBcHBsaWNhdGlvbnNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FwcGxpY2F0aW9uc1BhZ2UnKVswXSwgQXBwbGljYXRpb25zQ3RybCwgQXBwbGljYXRpb25zVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zUGFnZTtcblxuZnVuY3Rpb24gQXBwbGljYXRpb25zQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYXBwbGljYXRpb25zID0gW107XG59XG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zQ3RybDtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9hcHBsaWNhdGlvbnMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcblxuICAgICQuYWpheCgnL2FwaS9iYW5kcy8nK2lkKycvcm9sZScsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmJhbmRNZW1iZXJSb2xlID0gZGF0YS5yb2xlO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTsgIFxuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5wcm9jZXNzQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMpIHtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytpZCsnL3Byb2Nlc3NhcHBsaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge2FwcGxpY2F0aW9uSWQgOiBhcHBsaWNhdGlvbklkLCBwcm9jZXNzU3RhdHVzIDogcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMgOiBhcHBsaWNhdGlvblN0YXR1c31cbiAgICB9KS50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNWaWV3O1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBhcHBsaWNhdGlvbnNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9ucycpO1xuICAgIHZhciBiYWRnZSA9ICcnO1xuXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKyApe1xuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1hbmFnZXInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1lbWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIpIHtcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5Qcm9tb3Rlcic7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBsaWNhdGlvbnNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImFwcGxpY2F0aW9uIGJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1hcHBsaWNhdGlvbi1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLmlkKydcIiBkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cz1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cysnXCI+Jyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0udXNlcm5hbWUrJyA8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrJzwvZGl2PjxwLz4nKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb24nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93QXBwbGljYXRpb25Nb2RhbChwYXJzZUludCgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksMTApLHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyksMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BY2NlcHQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5BQ0NFUFRFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5SRUpFQ1RFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcbiAgICB2YXIgdGhpc0FwcGxpY2F0aW9uID0gdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zLmZpbHRlcihmdW5jdGlvbiAoYXBwbGljYXRpb24pe1xuICAgICAgICByZXR1cm4gYXBwbGljYXRpb24uaWQgPT0gYXBwbGljYXRpb25JZDtcbiAgICB9KVswXTtcbiAgICBcbiAgICB2YXIgbW9kYWxCdXR0b25zID0gJyc7XG5cbiAgICBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZE1lbWJlclJvbGUgPT09IEJhbmRNZW1iZXIuUk9MRS5PV05FUiB8fCB0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk1BTkFHRVIpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gICc8YnV0dG9uIGlkPVwiYnRuQWNjZXB0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JztcbiAgICB9XG5cbiAgICB2YXIgYXBwbGljYXRpb25Nb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5hcHBsaWNhdGlvbi1tb2RhbCcpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcsIHRoaXNBcHBsaWNhdGlvbi5pZCk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycsIHRoaXNBcHBsaWNhdGlvbi5zdGF0dXMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQXBwbGljYXRpb24ubmFtZSsnIC0gJyt0aGlzQXBwbGljYXRpb24udXNlcm5hbWUpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD5JbnN0cnVtZW50OiAnK3RoaXNBcHBsaWNhdGlvbi5pbnN0cnVtZW50Kyc8L3A+PHA+TWVzc2FnZTogJyt0aGlzQXBwbGljYXRpb24ubWVzc2FnZSk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYmFuZHNQYWdlJylbMF0sIEJhbmRzQ3RybCwgQmFuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5CYW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5CYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNQYWdlO1xuXG5mdW5jdGlvbiBCYW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmJhbmRzID0gW107XG59XG5CYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcbkJhbmRzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzVmlldztcbkJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJhbmQgYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWJhbmQtaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3JlZ2lzdGVyJztcbiAgICB9KTtcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvJyArICQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyk7XG4gICAgfSk7XG59O1xuIiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBGcmllbmQgKi9cblxuZnVuY3Rpb24gRnJpZW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjZnJpZW5kc1BhZ2UnKVswXSwgRnJpZW5kc0N0cmwsIEZyaWVuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5GcmllbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkZyaWVuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNQYWdlO1xuXG5mdW5jdGlvbiBGcmllbmRzQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuZnJpZW5kcyA9IFtdO1xufVxuRnJpZW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuRnJpZW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc0N0cmw7XG5GcmllbmRzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KCcvYXBpL2ZyaWVuZHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5mcmllbmRzID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG5cbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuRnJpZW5kc0N0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3RvVXNlcklkIDogdG9Vc2VySWQsIHN0YXR1cyA6IHN0YXR1c31cbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEZyaWVuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5GcmllbmRzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5GcmllbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzVmlldztcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy51cGRhdGVVc2VyTGlzdCgpO1xufTtcblxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYWRkLWZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZS52aWV3LnNob3dGcmllbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyksMTApKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUEVORElORylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5GUklFTkQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pOyAgICAgICAgXG59O1xuXG5GcmllbmRzVmlldy5wcm90b3R5cGUudXBkYXRlVXNlckxpc3QgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZnJpZW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kcycpO1xuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcbiAgICB2YXIgYmFkZ2UgPSAnJztcblxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXG4gICAgZnJpZW5kc0VsZW0uZmluZCgnLmNhcmQnKS5yZW1vdmUoKTtcblxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBzdGF0dXNcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC13YXJuaW5nJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWludmVyc2UnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5GcmllbmRzVmlldy5wcm90b3R5cGUuc2hvd0ZyaWVuZE1vZGFsID0gZnVuY3Rpb24gKGZyaWVuZElkKXtcbiAgICB2YXIgdGhpc0ZyaWVuZCA9IHRoaXMucGFnZS5jdHJsLmZyaWVuZHMuZmlsdGVyKGZ1bmN0aW9uIChmcmllbmQpe1xuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xuICAgIH0pWzBdLFxuICAgICAgICBtb2RhbEJ1dHRvbnM7XG4gICAgICAgIFxuICAgIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuVW5mcmllbmRNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5mcmllbmQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5DYW5jZWxSZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5SZWplY3RNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdibG9ja2VkJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuVW5ibG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG5SZXF1ZXN0TW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5QYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2xvZ2luUGFnZScpWzBdLCBMb2dpbkN0cmwsIExvZ2luVmlldyk7XG59XG5Mb2dpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5Mb2dpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5QYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBMb2dpbkN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmxvZ2dpbmdJbiA9IGZhbHNlO1xufVxuTG9naW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkxvZ2luQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpbkN0cmw7XG5cbkxvZ2luQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvbG9naW4nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8qKlxuICogVklFV0VSXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5WaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5Mb2dpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTG9naW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luVmlldztcbkxvZ2luVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuTG9naW5WaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggcGFnZS5jdHJsLmxvZ2dpbmdJbiApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwubG9nZ2luZ0luID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgICAgIFxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXG4gICAgICAgIHBhZ2UuY3RybC5sb2dpbih0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL21haW4nO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5Mb2dpbiBGYWlsZWQhPC9zdHJvbmc+IFVzZXJuYW1lIG9yIHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIE1haW5QYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI21haW5QYWdlJylbMF0sIE1haW5DdHJsLCBNYWluVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuTWFpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5NYWluUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNYWluUGFnZTtcblxuZnVuY3Rpb24gTWFpbkN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1haW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbk1haW5DdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5DdHJsO1xuXG5mdW5jdGlvbiBNYWluVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTWFpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTWFpblZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblZpZXc7XG5NYWluVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlO1xuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmJhbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMnO1xuICAgIH0pO1xuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmFkZC1mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5zZWFyY2gtYmFuZHMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvc2VhcmNoJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5ub3RpZmljYXRpb25zJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL25vdGlmaWNhdGlvbnMnO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIE5vdGlmaWNhdGlvbiAqL1xuXG4vKipcbiAqIFBBR0VcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNub3RpZmljYXRpb25zUGFnZScpWzBdLCBOb3RpZmljYXRpb25zQ3RybCwgTm90aWZpY2F0aW9uc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbk5vdGlmaWNhdGlvbnNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc1BhZ2U7XG5cbi8qKlxuICogQ09OVFJPTExFUlxuICogKi9cbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5ub3RpZmljYXRpb25zID0gW107XG59XG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zQ3RybDtcblxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICBjdHJsLmdldE5vdGlmaWNhdGlvbnMoKS50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgfSk7XG59O1xuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmdldE5vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3Qpe1xuICAgICAgICAvL2dldCBub3RpZmljYXRpb25zXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiAnL2FwaS9ub3RpZmljYXRpb25zJ1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgICAgICBjdHJsLm5vdGlmaWNhdGlvbnMgPSBkYXRhLm1hcChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE5vdGlmaWNhdGlvbi5mcm9tT2JqKGl0ZW0pO1xuICAgICAgICAgICAgfSkgfHwgW107XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5kZWxldGVOb3RpZmljYXRpb24gPSBmdW5jdGlvbiAoKXtcbiAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zVmlldztcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbn07XG5cbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbG9zZS5icy5hbGVydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vZGVsZXRlIG5vdGlmaWNhdGlvbiBvbiB0aGUgc2VydmVyXG4gICAgICAgIHBhZ2UuY3RybC5kZWxldGVOb3RpZmljYXRpb24oJCh0aGlzKS5hdHRyKCdkYXRhLW5vdGlmaWNhdGlvbi1pZCcpKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHJldHVybiBwYWdlLmN0cmwuZ2V0Tm90aWZpY2F0aW9ucygpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHBhZ2Uudmlldy5yZW5kZXIoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xufTtcblxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBub3RpZmljYXRpb25FbGVtID0gJCgnI25vdGlmaWNhdGlvbnNQYWdlJykuZmluZCgnLm5vdGlmaWNhdGlvbnMnKS5lbXB0eSgpO1xuICAgIHRoaXMucGFnZS5jdHJsLm5vdGlmaWNhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobm90aWZpY2F0aW9uKXtcbiAgICAgICAgdmFyIGFsZXJ0VHlwZTtcbiAgICAgICAgc3dpdGNoKG5vdGlmaWNhdGlvbi50eXBlKXtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuU1VDQ0VTUzpcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuRlJJRU5EX0FDQ0VQVEVEOlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1zdWNjZXNzJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5XQVJOSU5HOlxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5SRU1PVkVEX0ZST01fQkFORDpcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtd2FybmluZyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuRVJST1I6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LWRhbmdlcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LWluZm8nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbm90aWZpY2F0aW9uRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8YSBocmVmPVwiJytub3RpZmljYXRpb24ubGluaysnXCIgY2xhc3M9XCJub3RpZmljYXRpb24gYWxlcnQgYWxlcnQtZGlzbWlzc2FibGUgJythbGVydFR5cGUrJ1wiIGRhdGEtbm90aWZpY2F0aW9uLWlkPVwiJytub3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQrJ1wiPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+JytcbiAgICAgICAgICAgICAgICAnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nK1xuICAgICAgICAgICAgJzwvYnV0dG9uPicrXG4gICAgICAgICAgICBub3RpZmljYXRpb24ubWVzc2FnZStcbiAgICAgICAgJzwvYT4nKTtcbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG4vKipcbiAqIFBBR0VcbiAqICovXG5mdW5jdGlvbiBSZWdpc3RlclBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjcmVnaXN0ZXJQYWdlJylbMF0sIFJlZ2lzdGVyQ3RybCwgUmVnaXN0ZXJWaWV3KTtcbn1cblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblJlZ2lzdGVyUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlclBhZ2U7XG5cbi8qKlxuICogQ09OVFJPTExFUlxuICogKi9cbmZ1bmN0aW9uIFJlZ2lzdGVyQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbn1cblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5SZWdpc3RlckN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJDdHJsO1xuXG5SZWdpc3RlckN0cmwucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL3JlZ2lzdGVyJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8qKlxuICogVklFV0VSXG4gKiAqL1xuZnVuY3Rpb24gUmVnaXN0ZXJWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5SZWdpc3RlclZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyVmlldztcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggcGFnZS5jdHJsLnJlZ2lzdGVyaW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy9zaG93IHNwaW5uZXJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgICAgIFxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXG4gICAgICAgIHBhZ2UuY3RybC5yZWdpc3Rlcih0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xuICAgICAgICAgICAgLy9kaXNwbGF5IHJlZ2lzdGVyIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlJlZ2lzdHJhdGlvbiBTdWNjZXNzZnVsITwvc3Ryb25nPiBSZWRpcmVjdGluZyBpbiAyIHNlY29uZHMuLi4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2xvZ2luJztcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtdGltZXMnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5Mb2dpbiBGYWlsZWQhPC9zdHJvbmc+IFVzZXJuYW1lIG9yIHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZFBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjcmVnaXN0ZXJCYW5kUGFnZScpWzBdLCBSZWdpc3RlckJhbmRDdHJsLCBSZWdpc3RlckJhbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5SZWdpc3RlckJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRQYWdlO1xuXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5yZWdpc3RlcmluZyA9IGZhbHNlO1xufVxuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZEN0cmw7XG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9yZWdpc3RlcicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kVmlldztcblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZSxcbiAgICAgICAgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcbiAgICAgICAgXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xuICAgICAgICBcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xuICAgICAgICBcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cbiAgICAgICAgcGFnZS5jdHJsLmxvZ2luKHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+UmVnaXN0cmF0aW9uIFN1Y2Nlc3NmdWwhPC9zdHJvbmc+IFJlZGlyZWN0aW5nIGluIDIgc2Vjb25kcy4uLidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMnO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtdGltZXMnKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+QmFuZCBSZWdpc3RyYXRpb24gRmFpbGVkITwvc3Ryb25nPidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xudmFyIHNlYXJjaGluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBTZWFyY2hCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjc2VhcmNoQmFuZHNQYWdlJylbMF0sIFNlYXJjaEJhbmRzQ3RybCwgU2VhcmNoQmFuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5TZWFyY2hCYW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5TZWFyY2hCYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNQYWdlO1xuXG5mdW5jdGlvbiBTZWFyY2hCYW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmJhbmRzID0gW107XG4gICAgdGhpcy5zZWFyY2hpbmcgPSBmYWxzZTtcbn1cblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNDdHJsO1xuXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuYmFuZHMgPSBbXTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmJhbmRzID0gZGF0YTtcbiAgICAgICAgdGhhdC5wYWdlLnZpZXcudXBkYXRlQmFuZExpc3QoKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIHNlbGVjdGVkIGJhbmRcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuc3VibWl0QXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYmFuZElkLCBmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC9hcGkvYmFuZHMvJHtiYW5kSWR9L3N1Ym1pdEFwcGxpY2F0aW9uYCxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgYWxlcnQoXCJFcnJvciFcIik7IFxuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCBkZWxldGUgdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGlzIGJhbmRcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY2FuY2VsQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYmFuZElkKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9jYW5jZWxBcHBsaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge2JhbmRJZCA6IGJhbmRJZH1cbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmV4cGFuZEJhbmRNb2RhbCA9IGZ1bmN0aW9uKGFwcGxpY2F0aW9uVHlwZSwgYXBwbGljYXRpb25TdGF0dXMsIGJhbmRJZCkge1xuICAgICQoJy5tb2RhbC1ib2R5JykucmVtb3ZlKCk7XG4gICAgJCgnLm1vZGFsLWZvb3RlcicpLnJlbW92ZSgpOyAgICBcblxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcubW9kYWwtY29udGVudCcpO1xuICAgIHZhciBiYW5kTmFtZSA9IGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKCk7XG4gICAgdmFyIGluc3RydW1lbnRGaWVsZCA9ICcnO1xuXG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwoYmFuZE5hbWUrJzxici8+JythcHBsaWNhdGlvblR5cGUrJyBBcHBsaWNhdGlvbicpO1xuXG4gICAgaWYgKGFwcGxpY2F0aW9uVHlwZSA9PT0gJ01lbWJlcicpIHtcbiAgICAgICAgaW5zdHJ1bWVudEZpZWxkID0gJzxpbnB1dCByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImluc3RydW1lbnRcIiBwbGFjZWhvbGRlcj1cIkluc3RydW1lbnRcIiAvPjxwLz4nO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5zdHJ1bWVudEZpZWxkID0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImluc3RydW1lbnRcIiB2YWx1ZT1cIk4vQVwiLz48cC8+JzsgIFxuICAgIH1cblxuICAgIGJhbmRNb2RhbC5hcHBlbmQoJycrXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+JytcbiAgICAgICAgJzxmb3JtIGlkPVwiYXBwbHktZm9ybVwiIGNsYXNzPVwiYXBwbHktZm9ybVwiIG9uc3VibWl0PVwicmV0dXJuXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPicrXG4gICAgICAgICAgICAgICAgaW5zdHJ1bWVudEZpZWxkK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJtZXNzYWdlXCIgcGxhY2Vob2xkZXI9XCJNZXNzYWdlXCIgLz4nK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJiYW5kSWRcIiB2YWx1ZT1cIicrYmFuZElkKydcIiAvPicrXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImFwcGxpY2F0aW9uU3RhdHVzXCIgdmFsdWU9XCInK2FwcGxpY2F0aW9uU3RhdHVzKydcIiAvPicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZm9ybT4nK1xuICAgICc8L2Rpdj4nK1xuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+JysgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJzdWJtaXRcIiBmb3JtPVwiYXBwbHktZm9ybVwiPicrXG4gICAgICAgICAgICAgICAgJ1N1Ym1pdCcrXG4gICAgICAgICAgICAnPC9idXR0b24+JytcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj4nK1xuICAgICAgICAnPC9kaXY+JysgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICc8L2Rpdj4nKTtcbn07XG5cbmZ1bmN0aW9uIFNlYXJjaEJhbmRzVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHVuZGVmaW5lZDtcbn1cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VhcmNoQmFuZHNWaWV3O1xuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7ICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgIFxuICAgIC8vIFRoaXMgd2lsbCBydW4gYSBzZWFyY2ggZXZlcnkgc2Vjb25kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBhIGtleS4gXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgJy5zZWFyY2gtZm9ybSBpbnB1dCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmFyIHRoaXNGb3JtID0gJCh0aGlzKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgcGFnZS52aWV3LnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXNGb3JtLnN1Ym1pdCgpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH0pO1xuXG4gICAgLy8gU3VibWl0dGluZyB0aGUgc2VhcmNoIHN0cmluZ1xuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5zZWFyY2gtZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgXG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7ICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLmFwcGx5LWZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICAgXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7ICAgXG4gICAgICAgIHBhZ2UuY3RybC5zdWJtaXRBcHBsaWNhdGlvbihwYXJzZUludCgkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLCAxMCksIHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLWZvcm0nKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vaGFuZGxlIHRoZSBhcHBsaWNhdGlvbiByZXN1bHRcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG4gICAgLy8gVG9nZ2xlIEJhbmQgTW9kYWxcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93QmFuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyksMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBtYW5hZ2VyIGFwcGxpY2F0aW9uIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWFuYWdlcicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWFuYWdlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01BTkFHRVIsIGJhbmRJZCk7XG4gICAgfSlcblxuICAgIC8vIEhhbmRsZSBtZW1iZXIgYXBwbGljYXRpb24gcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlNZW1iZXInLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ01lbWJlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUiwgYmFuZElkKTtcbiAgICB9KVxuXG4gICAgLy8gSGFuZGxlIHByb21vdGVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5UHJvbW90ZXInLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ1Byb21vdGVyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIsIGJhbmRJZCk7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgYXBwbGljYXRpb24gY2FuY2VsIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5jYW5jZWxBcHBsaWNhdGlvbihiYW5kSWQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyAgICBcbiAgICAgICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtJykuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkZhaWx1cmUhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8qcGFnZUVsZW0ub24oJ2hpZGRlbi5icy5tb2RhbCcsICcjbW9kYWw3JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB0aGlzLnVwZGF0ZUJhbmRMaXN0O1xuICAgIH0pOyovXG59O1xuXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZUJhbmRMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGJhbmRzRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kcycpO1xuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcbiAgICB2YXIgYmFkZ2UgPSAnJztcblxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXG4gICAgJCgnLmNhcmQnKS5yZW1vdmUoKTtcblxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5iYW5kcy5sZW5ndGg7IGkrKyApe1xuXG4gICAgICAgIC8vIElmIHlvdSBoYXZlIGEgcm9sZSB0aGVuIHlvdSBhcmUgaW4gdGhlIGJhbmQsIHNvIG5vIG1vZGFsIGJ1dHRvbnNcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLnJvbGUgIT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1zdWNjZXNzJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLnJvbGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1hbmFnZXIpJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdyZWplY3RlZCcpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCBiYW5kXG4gICAgICAgIGJhbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiYmFuZCBjYXJkICcrY2FyZENvbG9yKydcIiBkYXRhLWJhbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmlkKydcIiA+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmJhbmROYW1lK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmdlbnJlKycpPC9zbWFsbD4nK2JhZGdlK1xuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLnNob3dCYW5kTW9kYWwgPSBmdW5jdGlvbiAoYmFuZElkKXtcbiAgICB2YXIgdGhpc0JhbmQgPSB0aGlzLnBhZ2UuY3RybC5iYW5kcy5maWx0ZXIoZnVuY3Rpb24gKGJhbmQpe1xuICAgICAgICByZXR1cm4gYmFuZC5pZCA9PSBiYW5kSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucztcbiAgICBcbiAgICBpZiAodGhpc0JhbmQucm9sZSAhPSAnbm9uZScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XG4gICAgfVxuICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBhcHBsaWNhdGlvbiBzdGF0dXMgaWYgdGhleSBkbyBub3QgaGF2ZSBhIHJvbGUgaW4gdGhlIGJhbmRcbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1hbmFnZXIpJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNYW5hZ2VyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBNZW1iZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKHByb21vdGVyKScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUHJvbW90ZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyAhPT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlNYW5hZ2VyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIE1hbmFnZXI8L2J1dHRvbj4nKyBcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5BcHBseU1lbWJlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBNZW1iZXI8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5UHJvbW90ZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgUHJvbW90ZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgYmFuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQtbW9kYWwnKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1iYW5kLWlkJyx0aGlzQmFuZC5pZCk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0JhbmQuYmFuZE5hbWUpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoJzxwPicrdGhpc0JhbmQuZGVzY3JpcHRpb24rJzwvcD4nKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLWZvb3RlcicpLmh0bWwoJzxkaXYgY2xhc3M9XCJkeW5hbWljLWJ1dHRvbnNcIj48L2Rpdj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj4nKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gUHJvZmlsZVBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjUHJvZmlsZVBhZ2UnKVswXSwgUHJvZmlsZUN0cmwsIEJhbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5Qcm9maWxlUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblByb2ZpbGVQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFByb2ZpbGVQYWdlO1xuXG5mdW5jdGlvbiBQcm9maWxlQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYmFuZCA9IHt9O1xufVxuUHJvZmlsZUN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuUHJvZmlsZUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHJvZmlsZUN0cmw7XG5Qcm9maWxlQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIGlkID0gdXJsLnNwbGl0KCcvJylbIHVybC5zcGxpdCgnLycpLmluZGV4T2YoJ2JhbmRzJykrMV07XG5cbiAgICAvL3ZhciBpZCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycgKyBpZCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQucHJvZmlsZSA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBCYW5kVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuQmFuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFZpZXc7XG5CYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kJyk7XG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8aDIgY2xhc3M9XCJjYXJkLXRpdGxlXCI+TXkgQmFuZDwvaDI+Jyk7XG4gICAgYmFuZEVsZW0uYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPjwvZGl2PicpO1xuICAgIFxuICAgIHZhciBiYW5kSW5mb0VsZW0gPSBiYW5kRWxlbS5maW5kKCcuY2FyZC1ibG9jaycpO1xuICAgIGJhbmRJbmZvRWxlbS5hcHBlbmQoJydcbiAgICAgICAgKyc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5CYW5kIE5hbWU8L3N0cm9uZz46ICcrdGhpcy5wYWdlLmN0cmwuYmFuZC5iYW5kTmFtZSsnPC9wPidcbiAgICAgICAgKyc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5Pd25lcjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kLm93bmVyTmFtZSsnPC9wPidcbiAgICAgICAgKyc8cCBjbGFzcz1cImluZm8gY2FyZC10ZXh0XCI+PHN0cm9uZz5EZXNjcmlwdGlvbjwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kLmRlc2NyaXB0aW9uKyc8L3A+J1xuICAgICk7XG4gICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5CYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hcHBsaWNhdGlvbnMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSsnL2FwcGxpY2F0aW9ucyc7XG4gICAgfSk7XG59OyJdfQ==
