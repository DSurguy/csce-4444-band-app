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
    this.id = json.id || 0;
    this.size = json.size || 'none';
    this.quantity = json.quantity || 0;
}

if( typeof module !== 'undefined' ){ module.exports = Inventory; }
;//bundle semicolon

function Item(json) {
    this.id = json.id || 0;
    this.name = json.name || '';
    this.type = json.type || '';
    this.color = json.color || '';
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

if( typeof module !== 'undefined' ){
    var leftPad = require('../utils/leftPad.js');
}

function SetList(data){
    this.id = data.id || undefined;
    this.bandId = data.bandId || undefined;
    this.name = data.name || '';
    this.songs = data.songs || [];
    this.description = data.description || '';
}

SetList.prototype.totalLength = function (){
    return this.songs.reduce(function (total, song){
        var duration = song.duration.split(':');
        return total.map(function (val, index){
            return val + parseInt(duration[index],10);
        });
    },[0,0,0]).map(function (total){
        return leftPad(total.toString(),2,'0');
    }).join(':');
};

if( typeof module !== 'undefined' ){ module.exports = SetList }
;//bundle semicolon

function SimpleBand(json){
    this.id = json.id || 0;
    this.ownerName = json.ownerName || '';
    this.ownerId = json.ownerId || undefined;
    this.bandName = json.bandName || '';
}

if( typeof module !== 'undefined' ){ module.exports = SimpleBand; }
;//bundle semicolon

function Song(data){
    this.id = data.id || undefined;
    this.bandId = data.bandId || undefined;
    this.name = data.name || '';
    this.duration = data.duration || '00h00m00s';
    this.lyrics = data.lyrics || '';
    this.composer = data.composer || '';
    this.link = data.link || '';
    this.path = data.path || '';
}

if( typeof module !== 'undefined' ){ module.exports = Song; }
;//bundle semicolon

function User(data){
    this.id = data.id || 0;
    this.username = data.username || '';
    this.firstName = data.firstName || undefined;
    this.lastName = data.lastName || '';
    this.bio = data.bio || '';
    this.email = data.email || '';
}

if( typeof module !== 'undefined' ){ module.exports = User; }
;//bundle semicolon

function leftPad(str, leng, pad){
    var newStr = str;
    while(newStr.length < leng){
        newStr = pad + newStr;
    }
    return newStr;
}

if( typeof module !== 'undefined' ){ module.exports = leftPad; }
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
            var defer = $.Deferred();
            
            $.ajax({
                url: '/api/user',
                method: 'GET'
            })
            .then(function (user){
                defer.resolve('<div class="profile">'+
                    '<img class="profile-img" src="https://placehold.it/150x150">'+
                    '<div class="profile-name">'+user.username+'</div>'+
                '</div>').promise();
            }).fail(defer.reject);
            
            return defer.promise();
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
        label: 'Set Lists',
        class: 'setlists',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).concat('setlists').join('/');
            window.location = newPath;
        }
    }, {
        label: 'Songs',
        class: 'songs',
        action: function (e){
            var newPath = window.location.pathname.split('/');
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).concat('songs').join('/');
            window.location = newPath;
        }
    }, {
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
    var bandId = splitLoc[splitLoc.indexOf('bands')+1];
    if( bandId !== undefined && !isNaN(parseInt(bandId)) ){
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
            return nextItem(parent, view.bandMenuItems, 0);
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
            cardColor = 'card-danger';
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
        modalButtons = '<button type="button" class="btn btn-danger btnUnfriendModal mr-2" data-dismiss="modal">Unfriend</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'requested') { 
        modalButtons = '<button type="button" class="btn btn-default btnCancelRequestModal mr-2" data-dismiss="modal">Cancel Request</button>'+
                       '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'pending') { 
        modalButtons = '<button type="button" class="btn btn-success btnAcceptModal mr-2" data-dismiss="modal">Accept</button>'+
                        '<button type="button" class="btn btn-danger btnRejectModal mr-2" data-dismiss="modal">Reject</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'blocked') {
        modalButtons = '<button type="button" class="btn btn-default btnUnblockModal" data-dismiss="modal">Unblock User</button>';
    }
    else if (thisFriend.status === 'none') {
        modalButtons = '<button type="button" class="btn btn-success btnRequestModal mr-2" data-dismiss="modal">Send Friend Request</button>'+
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

    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
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
    $(this.page.elem).find('[name="addSize"]').prop('disabled', true);
};

AddMerchView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        page = this.page;

    pageElem.on('click', '[name="addSize"]', function (e){
        e.preventDefault();
        e.stopPropagation();
        
        var select = pageElem.find('[name="merchType"]');
        page.view.addSizeField(select[0].value);
    });

    // We've picked a type so enable the Add Inventory button and remove any existing fields from other types
    pageElem.on('change', '[name="merchType"]', function (e){
        e.preventDefault();
        e.stopPropagation();

        pageElem.find('.dynamicFields').remove();

        var select = pageElem.find('[name="merchType"]');
        // Only let the user add sizes if they are choosing a shirt or sticker
        if (select[0].value === 'Shirt' || select[0].value === 'Sticker'){
            pageElem.find('[name="addSize"]').prop('disabled', false);
        }
        else {
            pageElem.find('[name="addSize"]').prop('disabled', true);
        }
        page.view.addSizeField(select[0].value);       
    });

    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.submitMerch(this)
        .then(function (){
            window.location = '../'+page.ctrl.bandId+'/inventory';
        })
        .fail(console.error);
    });
};

AddMerchView.prototype.addSizeField = function (type){
    var pageElem = $(this.page.elem),
    page = this.page;

    var typeFields = '';

    if (type === 'Shirt') {
        typeFields = '<select class="form-control dynamicFields" required name="size">'+
                        '<option disabled selected>Select a size</option>'+
                        '<option value="s">S</option>'+
                        '<option value="m">M</option>'+
                        '<option value="l">L</option>'+
                        '<option value="xl">XL</option>'+
                    '</select>';
                    
    }
    else if (type === 'CD') {
        typeFields = '<input class"form-control" type="hidden" name="size" value="none" />';
    }
    else if (type === 'Sticker') {
        typeFields = '<select class="form-control dynamicFields" required name="size">'+
                        '<option disabled selected>Select a size</option>'+
                        '<option value="1x1">1x1</option>'+
                        '<option value="2x2">2x2</option>'+
                        '<option value="3x4">3x4</option>'+
                        '<option value="5x6">5x6</option>'+
                    '</select>';
    }

    // All types will have a quantity and color
    typeFields += '<input class="form-control dynamicFields" required type="number" name="quantity" min="0" step="1" placeholder="Quantity">';

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

    pageElem.on('click', '.inventory', function (e){
        window.location = window.location.pathname+'/inventory';
    });
    
    pageElem.on('click', '.setlists', function (e){
        window.location = window.location.pathname+'/setlists';
    });
    
    pageElem.on('click', '.songs', function (e){
        window.location = window.location.pathname+'/songs';
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
/* global SetList */

function EditSetListPage(app, data){
    Page.call(this, app, $('#editSetListPage')[0], EditSetListCtrl, EditSetListView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
EditSetListPage.prototype = Object.create(Page.prototype);
EditSetListPage.prototype.constructor = EditSetListPage;

function EditSetListCtrl(page){
    PageCtrl.call(this, page);
    this.setList = new SetList({
        id: window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
            return val || (chunk == 'setlists' ? (arr[index+1] === 'new' ? undefined : arr[index+1] ) : undefined);
        }, undefined),
        bandId: window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
            return val || (chunk == 'bands' ? arr[index+1] : undefined);
        }, undefined)
    });
}
EditSetListCtrl.prototype = Object.create(PageCtrl.prototype);
EditSetListCtrl.prototype.constructor = EditSetListCtrl;

function EditSetListView(page){
    PageView.call(this, page);
}
EditSetListView.prototype = Object.create(PageView.prototype);
EditSetListView.prototype.constructor = EditSetListView;
EditSetListView.prototype.init = function (){
    this.render();
    this.bindEvents();
};

EditSetListView.prototype.render = function (){
    var pageElem = $(this.page.elem);
};

EditSetListView.prototype.bindEvents = function (){
    var pageElem = this.page.elem;
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
            cardColor = 'card-danger';
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
        modalButtons = '<button type="button" class="btn btn-danger btnUnfriendModal mr-2" data-dismiss="modal">Unfriend</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'requested') { 
        modalButtons = '<button type="button" class="btn btn-default btnCancelRequestModal mr-2" data-dismiss="modal">Cancel Request</button>'+
                       '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'pending') { 
        modalButtons = '<button type="button" class="btn btn-success btnAcceptModal mr-2" data-dismiss="modal">Accept</button>'+
                        '<button type="button" class="btn btn-danger btnRejectModal mr-2" data-dismiss="modal">Reject</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisFriend.status === 'blocked') {
        modalButtons = '<button type="button" class="btn btn-default btnUnblockModal" data-dismiss="modal">Unblock User</button>';
    }
    else if (thisFriend.status === 'none') {
        modalButtons = '<button type="button" class="btn btn-success btnRequestModal mr-2" data-dismiss="modal">Send Friend Request</button>'+
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
    this.items = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
InventoryCtrl.prototype = Object.create(PageCtrl.prototype);
InventoryCtrl.prototype.constructor = InventoryCtrl;
InventoryCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;

    $.ajax('/api/bands/'+ctrl.bandId+'/inventory', {
        method: 'GET'
    }).then(function (data){
        ctrl.items = data;
        defer.resolve();
    }).catch(defer.reject);
    
    return defer.promise();
};

InventoryCtrl.prototype.updateInventory = function (form){
    var defer = $.Deferred(),
        ctrl = this;
       
    var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/updateinventory',
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

InventoryCtrl.prototype.deleteInventory = function (itemId){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/inventory/'+itemId,
        type: 'DELETE'
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

function InventoryView(page){
    PageView.call(this, page);
}
InventoryView.prototype = Object.create(PageView.prototype);
InventoryView.prototype.constructor = InventoryView;
InventoryView.prototype.init = function (){
    this.bindEvents();
    var itemElem = $(this.page.elem).find('.inventory');
    var that = this;

    this.page.ctrl.items.forEach(function (item){
        itemElem.append(''+
        '<div class="row">'+
            '<div class="col-6-sm">'+
                '<div class="card">'+
                    '<img class="card-img-top img-fluid" src="/media/'+item.imagePath+'" alt="Card image cap">'+
                    '<div class="card-block img-block">'+
                        '<h4 class="card-title">'+item.name+'</h4>'+
                        '<p class="card-text">'+item.type+'<br>Color: '+item.color+'</p>'+
                    '</div>'+
                    '<ul class="list-group list-group-flush" name="inventory-list-'+item.id+'"></ul>'+
                    '<div class="card-block">'+
                        '<button class="btn btn-primary btn-edit" data-item-id="'+item.id+'">Edit</button>'+
                        '<button class="btn btn-danger btn-delete" data-item-id="'+item.id+'">Delete</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');

        var inventoryElem = $(that.page.elem).find('[name=inventory-list-'+item.id+']')

        item.inventory.forEach(function (inventory){
            if (inventory.size === 'none') {
                inventoryElem.append(''+
                    '<li class="list-group-item clearfix">Quantity: '+inventory.quantity+'</li>');
            }
            else {
                inventoryElem.append(''+
                    '<li class="list-group-item">Size: '+inventory.size+'<br>Quantity: '+inventory.quantity+'</li>');
            }   
        });
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

    pageElem.on('click', '.btn-edit', function (e){
        page.view.showEditModal(parseInt($(this).attr('data-item-id'),10));
    });

    pageElem.on('submit', '#update-form', function (e){
        e.preventDefault();
        e.stopPropagation();       
        $('.modal').modal('hide');   
        page.ctrl.updateInventory(this)
        .then(function (result) {
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btn-delete', function (e){
        e.preventDefault();
        e.stopPropagation();       
        page.ctrl.deleteInventory(parseInt($(this).attr('data-item-id'),10))
        .then(function (result) {
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '[name="addSize"]', function (e){
        e.preventDefault();
        e.stopPropagation();      
        var type = pageElem.find('[name="type"]')[0].value;
        page.view.addSizeField(type);
    });
};

InventoryView.prototype.showEditModal = function (itemId){
    var thisItem = this.page.ctrl.items.filter(function (item){
        return item.id == itemId;
    })[0],
        modalButtons = '<button class="btn btn-success" name="addSize">Add Size <div class="fa fa-plus icon"></div>';

    $('.item-inventory').remove();

    var that = this;
    var inventoryFields = '';
    var itemModal = $(this.page.elem).find('.item-modal');
    
    $(this.page.elem).find('.modal-body').append('<div class="item-inventory"></div>');

    thisItem.inventory.forEach(function (inventory){   
        if (thisItem.type === 'Shirt') {
            inventoryFields = ''+
            '<label for="size-'+inventory.id+'">Size</label>'+
            '<select class="form-control dynamicFields" id="size-'+inventory.id+'" form="update-form" name="size" required>'+
                '<option value="s">S</option>'+
                '<option value="m">M</option>'+
                '<option value="l">L</option>'+
                '<option value="xl">XL</option>'+
            '</select>';                        
        }
        else if (thisItem.type === 'CD') {
            inventoryFields = '<input class"form-control" id="size-'+inventory.id+'" form="update-form" type="hidden" name="size"/>';
            modalButtons = '';
        }
        else if (thisItem.type === 'Sticker') {
            inventoryFields = ''+
            '<label for="size-'+inventory.id+'">Size</label>'+
            '<select class="form-control dynamicFields" id="size-'+inventory.id+'" form="update-form" name="size" required>'+
                '<option value="1x1">1x1</option>'+
                '<option value="2x2">2x2</option>'+
                '<option value="3x4">3x4</option>'+
                '<option value="5x6">5x6</option>'+
            '</select>';
        }

        // All types have a quantity
        inventoryFields += ''+
        '<label for="quantity-'+inventory.id+'">Quantity</label>'+
        '<input class="form-control dynamicFields quantity" id="quantity-'+inventory.id+'" form="update-form" name="quantity" required type="number" min="0" step="1" placeholder="Quantity" style="margin-bottom: 20px;">'+
        '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form" type="hidden" name="inventoryId"/>';

        var inventoryFieldsDiv = $(that.page.elem).find('.item-inventory');
        inventoryFieldsDiv.append(inventoryFields);
          
        $('#size-'+inventory.id)[0].value = inventory.size;    
        $('#quantity-'+inventory.id)[0].value = inventory.quantity;
        $('#inventoryId-'+inventory.id)[0].value = inventory.id;
    });  

    $('[name="itemId"]')[0].value = thisItem.id;         
    $('[name="name"]')[0].value = thisItem.name;  
    $('[name="description"]')[0].value = thisItem.description;
    $('[name="color"]')[0].value = thisItem.color;    
    $('[name="price"]')[0].value = thisItem.price; 
    $('[name="type"]')[0].value = thisItem.type; 

    itemModal.find('.dynamic-buttons').html(modalButtons)
    itemModal.find('.modal').attr('data-item-id',thisItem.id);
    itemModal.find('.modal-title').html(thisItem.name);
    itemModal.find('.modal').modal();
};

InventoryView.prototype.addSizeField = function (type){
    var pageElem = $(this.page.elem),
    page = this.page;

    var inventoryFields = '';

    if (type === 'Shirt') {
        inventoryFields = ''+
        '<select class="form-control dynamicFields" form="update-form" name="size" required>'+
            '<option value="s">S</option>'+
            '<option value="m">M</option>'+
            '<option value="l">L</option>'+
            '<option value="xl">XL</option>'+
        '</select>';                        
    }
    else if (type === 'CD') {
        inventoryFields = '<input class"form-control" form="update-form" type="hidden" name="size"/>';
        modalButtons = '';
    }
    else if (type === 'Sticker') {
        inventoryFields = ''+
        '<select class="form-control dynamicFields" form="update-form" name="size" required>'+
            '<option value="1x1">1x1</option>'+
            '<option value="2x2">2x2</option>'+
            '<option value="3x4">3x4</option>'+
            '<option value="5x6">5x6</option>'+
        '</select>';
    }

    // All types will have a quantity and color
    inventoryFields += '<input class="form-control dynamicFields" form="update-form" required type="number" name="quantity" min="0" step="1" placeholder="Quantity">'+
                       '<input class"form-control" form="update-form" type="hidden" name="inventoryId" value="new"/>';
    var inventoryFieldsDiv = $(this.page.elem).find('.item-inventory');
    inventoryFieldsDiv.append(inventoryFields);
}

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
/* global User */

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
    this.user = undefined;
}
MainCtrl.prototype = Object.create(PageCtrl.prototype);
MainCtrl.prototype.constructor = MainCtrl;
MainCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: '/api/user',
        method: 'GET'
    })
    .then(function (user){
        ctrl.user = new User(user);
        defer.resolve();
    })
    .fail(defer.reject);
    
    return defer.promise();
};


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
    
    $(page.elem).find('.username').html(page.ctrl.user.username);
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
/* global $ */
/* global MenuComponent */
/* global Song */
/* global SetList */

function SetListsPage(app, data){
    Page.call(this, app, $('#setListsPage')[0], SetListsCtrl, SetListsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
SetListsPage.prototype = Object.create(Page.prototype);
SetListsPage.prototype.constructor = SetListsPage;

function SetListsCtrl(page){
    PageCtrl.call(this, page);
    this.songs = [];
    this.setLists = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
SetListsCtrl.prototype = Object.create(PageCtrl.prototype);
SetListsCtrl.prototype.constructor = SetListsCtrl;
SetListsCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/songs',
        method: 'GET'
    })
    .then(function (songs){
        ctrl.songs = songs.map(function (song){
            return new Song(song);
        });
        
        //get set lists
        return $.ajax({
            url: '/api/bands/'+ctrl.bandId+'/setlists',
            method: 'GET'
        });
    })
    .then(function (setLists){
        ctrl.setLists = setLists.map(function (setList){
            return new SetList(setList);
        });
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};
SetListsCtrl.prototype.saveSetList = function (form){
    var defer = $.Deferred();
    var ctrl = this;
    
    var modifiedForm = $.clone(form);
    $(modifiedForm).find('input[type=checkbox]:not(:checked)').remove();
    var formData = new FormData(modifiedForm);
    
    //determine if we're editing or creating
    var url, method;
    if( $(modifiedForm).find('[name=set-list-id]').val() !== '' ){
        url = '/api/bands/'+ctrl.bandId+'/setlists/'+$(modifiedForm).find('[name=set-list-id]').val();
        method = 'PUT';
    }
    else{
        url = '/api/bands/'+ctrl.bandId+'/setlists';
        method = 'POST';
    }
    
    $.ajax({
        url: url,
        type: method,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};
SetListsCtrl.prototype.deleteSetList = function (setListId){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: `/api/bands/${ctrl.bandId}/setlists/${setListId}`,
        type: 'DELETE'
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

function SetListsView(page){
    PageView.call(this, page);
    this.setListSongs = [];
}
SetListsView.prototype = Object.create(PageView.prototype);
SetListsView.prototype.constructor = SetListsView;
SetListsView.prototype.init = function (){
    this.render();
    this.bindEvents();
};

SetListsView.prototype.render = function (){
    var view = this;
    //render the songs to the song modal
    var setListsElem = $(view.page.elem).find('.set-lists');
    setListsElem.empty();
    view.page.ctrl.setLists.forEach(function (setList, index){
        setListsElem.append(`
        <a href="javascript://" class="set-list list-group-item list-group-item-action" data-set-list-index="${index}">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${setList.name}</h5>
                <h5 class="mb-1">${setList.totalLength()}</h5>
            </div>
        </a>`);
    });
};

SetListsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.add-set-list', function (e){
        view.showSetListModal();
    });
    
    pageElem.on('click', '.modal .delete-set-list', function (e){
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var modal = $(this).parents('.modal');
        modal.find('.delete-set-list').html('<div class="fa fa-spinner animation-spin"></div>');
        
        var setListId = modal.find('[name=set-list-id]').val(),
            deletePromise;
        
        //just close the modal if we don't have an id
        if( setListId === '' ){
            deletePromise = $.Deferred().resolve().promise();
        }
        else{
            deletePromise = view.page.ctrl.deleteSetList(setListId);
        }
        
        deletePromise.then(function (){
            
            var setListIndex = view.page.ctrl.setLists.reduce(function (val, setList, index){
                return val !== undefined ? val : (setList.id == setListId ? index : undefined);
            },undefined);
            
            if( setListIndex !== undefined ){
                view.page.ctrl.setLists.splice(setListIndex,1);
            }
            
            view.render();
            modal.modal('hide');
            modal.find('.delete-set-list').html('Delete Set List');
            modal.find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            modal.find('form').prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to delete set list!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            modal.find('.delete-set-list').html('Delete Set List');
        });
    });
    
    pageElem.on('click', '.modal .save-set-list', function (e){
        $(this).parents('.modal').find('form').submit();
    });
    pageElem.on('submit', '.modal form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var form = $(this);
        form.parents('.modal').find('.save-set-list').html('<div class="fa fa-spinner animation-spin"></div>');
        view.page.ctrl.saveSetList(this)
        .then(function (newSetList){
            
            var setListIndex = view.page.ctrl.setLists.reduce(function (val, setList, index){
                return val !== undefined ? val : (setList.id == newSetList.id ? index : undefined);
            },undefined);
            
            if( setListIndex !== undefined ){
                view.page.ctrl.setLists[setListIndex] = new SetList(newSetList);
            }
            else{
                view.page.ctrl.setLists.push(new SetList(newSetList));
                view.page.ctrl.setLists = view.page.ctrl.setLists.sort(function (a,b){
                    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
                });
            }
            view.render();
            form.parents('.modal').modal('hide');
            form.parents('.modal').find('.save-set-list').html('Save Set List');
            form.parents('.modal').find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to save set list!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            form.parents('.modal').find('.save-set-list').html('Save Set List');
        });
    });
    
    pageElem.on('click', '.set-list', function (e){
        view.showSetListModal(view.page.ctrl.setLists[$(this).attr('data-set-list-index')]);
    });
    
    pageElem.on('keyup', '.search', function (e){
        var search = $(this).val();
        
        var setListElems = pageElem.find('.song');
        view.page.ctrl.setLists.forEach(function (setList, index){
            if( setList.name.indexOf(search) !== -1 ){
                $(setListElems[index]).removeClass('search-hidden');
            }
            else{
                $(setListElems[index]).addClass('search-hidden');
            }
        });
    });
    
    pageElem.on('keyup', '.modal .song-search', function (e){
        if( view.searchingSongs ){ return false; }
        var searchVal = $(this).val(),
            songsElem = $(this).siblings('.songs').detach(),
            allSongsElems = songsElem.find('.song-check-label');
        
        view.page.ctrl.songs.forEach(function (song, index){
            var thisSong = $(allSongsElems[index]);
            if( song.name.indexOf(searchVal) !== -1 ){
                thisSong.removeClass('search-hidden');
            }
            else{
                thisSong.addClass('search-hidden');
            }
        });
        
        $(this).after(songsElem);
    });
    
    pageElem.on('change', '.modal .song-check-label input', function (e){
        var songElem = $(this).parents('.song-check-label'),
            currentIndex = songElem.attr('data-index'),
            isChecked = this.checked,
            newIndex;
        
        //update the song's checked status
        view.setListSongs[currentIndex].checked = isChecked;
        
        var movedSong = view.setListSongs.splice(currentIndex,1)[0];
        if( isChecked ){
            //item became checked
            for( var i=0; i<view.setListSongs.length; i++ ){
                if( view.setListSongs[i].name.toLowerCase() > movedSong.name.toLowerCase() || !view.setListSongs[i].checked ){
                    view.setListSongs.splice(i,0,movedSong);
                    newIndex = i;
                    break;
                }
            }
            //now move the actual element and fix the element numbers
            var existingElem = songElem.siblings('[data-index='+newIndex+']');
            existingElem.before(songElem);
        }
        else{
            //item became unchecked
            for( var i=0; i<view.setListSongs.length; i++ ){
                if( !view.setListSongs[i].checked && view.setListSongs[i].name.toLowerCase() > movedSong.name.toLowerCase() ){
                    view.setListSongs.splice(i,0,movedSong);
                    newIndex = i;
                    break;
                }
            }
            if( newIndex === undefined ){
                //this sorts to the end of the list
                newIndex = view.setListSongs.length;
                view.setListSongs.push(movedSong);
                //now move the actual element and fix the element numbers
                var existingElem = songElem.siblings('[data-index='+(newIndex)+']');
                existingElem.after(songElem);
            }
            else{
                //now move the actual element and fix the element numbers
                var existingElem = songElem.siblings('[data-index='+(newIndex+1)+']');
                existingElem.before(songElem);
            }
        }
        var allSongElems = songElem.parent().find('.song-check-label');
        if( newIndex > currentIndex ){
            for( var i=currentIndex; i<=newIndex; i++ ){
                $(allSongElems[i]).attr('data-index',i);
            }
        }
        else{
            for( var i=newIndex; i<=currentIndex; i++ ){
                $(allSongElems[i]).attr('data-index',i);
            }
        }
    });
};

SetListsView.prototype.showSetListModal = function (setList){
    var view = this,
        setListModal = $(this.page.elem).find('.set-list-modal');
    
    //reorder the songs according to the new setlist order
    if( setList ){
        setListModal.find('[name=set-list-id]').val(setList.id);
        setListModal.find('[name=name]').val(setList.name);
        setListModal.find('[name=description]').val(setList.description);
        //TODO: Check items
        var checkedSongs = setList.songs.reduce(function (obj, song){
            obj[song.id] = true;
            return obj;
        }, {});
        
        view.setListSongs = $.extend([], view.page.ctrl.songs).map(function (song){
            if( checkedSongs[song.id] ){
                song.checked = true;
            }
            return song;
        }).sort(function (a,b){
            if( a.checked && !b.checked ){
                return -1;
            }
            else if( b.checked && !a.checked ){
                return 1;
            }
            else{
                if( a.name.toLowerCase() < b.name.toLowerCase() ){
                    return -1;
                }
                else if( a.name.toLowerCase() > b.name.toLowerCase() ){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        });
    }
    else{
        setListModal.find('[name=set-list-id]').val('');
        setListModal.find('[name=name]').val('');
        setListModal.find('[name=description]').val('');
        view.setListSongs = $.extend([], view.page.ctrl.songs).sort(function (a,b){
            if( a.checked && !b.checked ){
                return -1;
            }
            else if( b.checked && !a.checked ){
                return 1;
            }
            else{
                if( a.name.toLowerCase() < b.name.toLowerCase() ){
                    return -1;
                }
                else if( a.name.toLowerCase() > b.name.toLowerCase() ){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        });
    }
    
    var songsElem = setListModal.find('.songs').detach().empty();
    view.setListSongs.forEach(function (song, index){
        songsElem.append(''+
        '<label class="form-check-label song-check-label" data-index="'+index+'">'+
            '<input name="song-'+song.id+'" class="form-check-input" type="checkbox" value="" tabindex="-1" '+(song.checked?'checked':'')+'>'+
            song.name+
        '</label>');
    });
    setListModal.find('.songs-parent').append(songsElem);
    
    setListModal.find('.modal').modal();
};
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Song */

function SongsPage(app, data){
    Page.call(this, app, $('#songsPage')[0], SongsCtrl, SongsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
SongsPage.prototype = Object.create(Page.prototype);
SongsPage.prototype.constructor = SongsPage;

function SongsCtrl(page){
    PageCtrl.call(this, page);
    this.saving = false;
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
SongsCtrl.prototype = Object.create(PageCtrl.prototype);
SongsCtrl.prototype.constructor = SongsCtrl;
SongsCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: `/api/bands/${ctrl.bandId}/songs`,
        method: 'GET'
    })
    .then(function (songs){
        ctrl.songs = songs.map(function (song){
            return new Song(song);
        });
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};

SongsCtrl.prototype.saveSong = function(form){
    var defer = $.Deferred();
    var formData = new FormData(form);
    var ctrl = this;
    
    //determine if we're editing or creating
    var url, method;
    if( $(form).find('[name=song-id]').val() !== '' ){
        url = `/api/bands/${ctrl.bandId}/songs/${$(form).find('[name=song-id]').val()}`;
        method = 'PUT';
    }
    else{
        url = `/api/bands/${ctrl.bandId}/songs`;
        method = 'POST';
    }
    
    $.ajax({
        url: url,
        type: method,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};

SongsCtrl.prototype.deleteSong = function (songId){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: `/api/bands/${ctrl.bandId}/songs/${songId}`,
        type: 'DELETE'
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

function SongsView(page){
    PageView.call(this, page);
}
SongsView.prototype = Object.create(PageView.prototype);
SongsView.prototype.constructor = SongsView;
SongsView.prototype.init = function (){
    this.render();
    this.bindEvents();
};

SongsView.prototype.render = function (){
    var songsElem = $(this.page.elem).find('.songs-list');
    songsElem.empty();
    
    this.page.ctrl.songs.forEach(function (song, index){
        songsElem.append(`
        <a href="javascript://" class="song list-group-item list-group-item-action" data-song-index="${index}">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${song.name}</h5>
                <h5 class="mb-1">${song.duration}</h5>
            </div>
            <p class="mb-1">Composer: ${song.composer}</p>
        </a>`);
    });
};
SongsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.add-song', function (e){
        view.showSongModal();
    });
    
    pageElem.on('click', '.modal .save-song', function (e){
        $(this).parents('.modal').find('form').submit();
    });
    
    pageElem.on('click', '.modal .delete-song', function (e){
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var modal = $(this).parents('.modal');
        modal.find('.delete-song').html('<div class="fa fa-spinner animation-spin"></div>');
        
        var songId = modal.find('[name=song-id]').val(),
            deletePromise;
        
        //just close the modal if we don't have an id
        if( songId === '' ){
            deletePromise = $.Deferred().resolve().promise();
        }
        else{
            deletePromise = view.page.ctrl.deleteSong(songId);
        }
        
        deletePromise.then(function (){
            var audioTrack = modal.find('audio');
            if( audioTrack.length ){
                audioTrack[0].pause();
                audioTrack.remove();
            }
            
            var songIndex = view.page.ctrl.songs.reduce(function (val, song, index){
                return val !== undefined ? val : (song.id == songId ? index : undefined);
            },undefined);
            
            if( songIndex !== undefined ){
                view.page.ctrl.songs.splice(songIndex,1);
            }
            
            view.render();
            modal.modal('hide');
            modal.find('.delete-song').html('Delete Song');
            modal.find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            modal.find('form').prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to delete song!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            modal.find('.delete-song').html('Delete Song');
        });
    });
    
    pageElem.on('submit', '.modal form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var form = $(this);
        form.parents('.modal').find('.save-song').html('<div class="fa fa-spinner animation-spin"></div>');
        view.page.ctrl.saveSong(this)
        .then(function (newSong){
            var audioTrack = form.find('audio');
            if( audioTrack.length ){
                audioTrack[0].pause();
                audioTrack.remove();
            }
            
            var songIndex = view.page.ctrl.songs.reduce(function (val, song, index){
                return val !== undefined ? val : (song.id == newSong.id ? index : undefined);
            },undefined);
            
            if( songIndex !== undefined ){
                view.page.ctrl.songs[songIndex] = newSong;
            }
            else{
                view.page.ctrl.songs.push(newSong);
                view.page.ctrl.songs = view.page.ctrl.songs.sort(function (a,b){
                    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
                });
            }
            view.render();
            form.parents('.modal').modal('hide');
            form.parents('.modal').find('.save-song').html('Save Song');
            form.parents('.modal').find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to save song!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            form.parents('.modal').find('.save-song').html('Save Song');
        });
    });
    
    pageElem.on('click', '.song', function (e){
        view.showSongModal(view.page.ctrl.songs[$(this).attr('data-song-index')]);
    });
    
    pageElem.on('hide.bs.modal', '.modal', function (e){
        var audioTrack = $(this).find('audio');
        if( audioTrack.length ){
            audioTrack[0].pause();
            audioTrack.remove();
        }
    });
    
    pageElem.on('keyup', '.search', function (e){
        var search = $(this).val();
        
        var songElems = pageElem.find('.song');
        view.page.ctrl.songs.forEach(function (song, index){
            if( song.name.indexOf(search) !== -1 || song.composer.indexOf(search) !== -1 ){
                $(songElems[index]).removeClass('search-hidden');
            }
            else{
                $(songElems[index]).addClass('search-hidden');
            }
        });
    });
};

SongsView.prototype.showSongModal = function (song){
    var songModal = $(this.page.elem).find('.song-modal');
    
    if( song ){
        songModal.find('[name=song-id]').val(song.id);
        songModal.find('[name=name]').val(song.name);
        var duration = song.duration.split(/:/g);
        songModal.find('[name=duration-hours]').val(duration[0]);
        songModal.find('[name=duration-mins]').val(duration[1]);
        songModal.find('[name=duration-secs]').val(duration[2]);
        songModal.find('[name=lyrics]').val(song.lyrics);
        songModal.find('[name=composer]').val(song.composer);
        songModal.find('[name=link]').val(song.link);
        songModal.find('.current-link a').attr('href', song.link).html(song.link);
        songModal.find('[name=song-file]').val('');
        if( song.path ){
            songModal.find('[name=song-path]').val(song.path);
            var fileName = song.path.split(/\//g).slice(-1)[0];
            var mimeType;
            switch(fileName.split(/\./g).slice(-1)[0]){
                case 'wav': mimeType = 'audio/wav'; break;
                case 'mp3': mimeType = 'audio/mp3'; break;
                case 'ogg': mimeType = 'audio/ogg'; break;
            }
            songModal.find('.file-audio').find('audio').remove();
            songModal.find('.file-audio').append(`<audio controls><source src="${song.path}" type="${mimeType}"></audio>`);
            songModal.find('.current-file a').attr("href", song.path).html(fileName);
        }
        else{
            songModal.find('[name=song-path]').val('');
            songModal.find('.file-audio').find('audio').remove();
            songModal.find('.current-file a').attr("href", 'javascript://').html('None');
        }
    }
    else{
        songModal.find('[name=song-id]').val('');
        songModal.find('[name=name]').val('');
        songModal.find('[name=duration-hours]').val('00');
        songModal.find('[name=duration-mins]').val('00');
        songModal.find('[name=duration-secs]').val('00');
        songModal.find('[name=lyrics]').val('');
        songModal.find('[name=composer]').val('');
        songModal.find('[name=link]').val('');
        songModal.find('.current-link a').attr('href', 'javascript://').html('None');
        songModal.find('[name=song-file]').val('');
        songModal.find('[name=song-path]').val('');
        songModal.find('.file-audio').find('audio').remove();
        songModal.find('.current-file a').attr("href", 'javascript://').html('None');
    }
    
    songModal.find('.modal').modal();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJmcmllbmQuanMiLCJpbnZlbnRvcnkuanMiLCJpdGVtLmpzIiwibm90aWZpY2F0aW9uLmpzIiwic2VhcmNoZWRCYW5kLmpzIiwic2V0TGlzdC5qcyIsInNpbXBsZUJhbmQuanMiLCJzb25nLmpzIiwidXNlci5qcyIsImxlZnRQYWQuanMiLCJhcHAuanMiLCJwYWdlLmpzIiwibWVudS5qcyIsImFkZEZyaWVuZC5qcyIsImFkZE1lcmNoLmpzIiwiYXBwbGljYXRpb25zLmpzIiwiYmFuZHMuanMiLCJlZGl0U2V0TGlzdC5qcyIsImZyaWVuZHMuanMiLCJsb2dpbi5qcyIsIm1haW4uanMiLCJub3RpZmljYXRpb25zLmpzIiwicmVnaXN0ZXIuanMiLCJyZWdpc3RlckJhbmQuanMiLCJzZWFyY2hCYW5kcy5qcyIsInNldExpc3RzLmpzIiwic29uZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNsV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBakJwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QWtCN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FqQnRPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBa0J2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBcHBsaWNhdGlvbihqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudXNlcm5hbWUgPSBqc29uLnVzZXJuYW1lIHx8ICcnO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XG4gICAgdGhpcy5tZXNzYWdlID0ganNvbi5tZXNzYWdlIHx8ICcnO1xufVxuXG5BcHBsaWNhdGlvbi5TVEFUVVMgPSB7XG5cdE5PTkU6IDAsIFxuICAgIEFQUExJRURfTUFOQUdFUjogMSxcbiAgICBBUFBMSUVEX01FTUJFUjogMixcbiAgICBBUFBMSUVEX1BST01PVEVSOiAzLFxuXHRBQ0NFUFRFRDogNCwgXG5cdFJFSkVDVEVEOiA1LFxuICAgIEJMT0NLRUQ6IDZcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IH0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kUGFnZScpWzBdLCBCYW5kQ3RybCwgQmFuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFBhZ2U7XG5cbmZ1bmN0aW9uIEJhbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kID0ge307XG59XG5CYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5CYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kQ3RybDtcbkJhbmRDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgIC8vdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJyArIGlkLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEJhbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5CYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kVmlldztcbkJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGJhbmRFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQnKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxoMiBjbGFzcz1cImNhcmQtdGl0bGVcIj5NeSBCYW5kPC9oMj4nKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+PC9kaXY+Jyk7XG4gICAgXG4gICAgdmFyIGJhbmRJbmZvRWxlbSA9IGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJyk7XG4gICAgYmFuZEluZm9FbGVtLmFwcGVuZCgnJ1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkJhbmQgTmFtZTwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kLmJhbmROYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPk93bmVyPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmQub3duZXJOYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkRlc2NyaXB0aW9uPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmQuZGVzY3JpcHRpb24rJzwvcD4nXG4gICAgKTtcbiAgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKycvYXBwbGljYXRpb25zJztcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuaW52ZW50b3J5JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUrJy9pbnZlbnRvcnknO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuc2V0bGlzdHMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSsnL3NldGxpc3RzJztcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLnNvbmdzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUrJy9zb25ncyc7XG4gICAgfSk7XG59OyIsImZ1bmN0aW9uIEJhbmRNZW1iZXIoanNvbil7XG4gICAgdGhpcy51c2VySWQgPSBqc29uLnVzZXJJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kSWQgPSBqc29uLmJhbmRJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy51c2VybmFtZSA9IGpzb24udXNlcm5hbWUgfHwgJyc7XG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgJyc7XG59XG5cbkJhbmRNZW1iZXIuUk9MRSA9IHtcbiAgICBOT05FOiAtMSxcbiAgICBPV05FUiA6IDAsXG4gICAgTUFOQUdFUjogMSxcbiAgICBNRU1CRVIgOiAyLFxuICAgIFBST01PVEVSIDogM1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBCYW5kTWVtYmVyOyB9IiwiZnVuY3Rpb24gRnJpZW5kKGpzb24pe1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy51c2VyTmFtZSA9IGpzb24udXNlck5hbWUgfHwgJyc7XG4gICAgdGhpcy5iaW8gPSBqc29uLmJpbyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIHRoaXMuc3RhdHVzID0ganNvbi5zdGF0dXMgfHwgJyc7XG59XG5cbkZyaWVuZC5TVEFUVVMgPSB7XG5cdE5PTkU6IDAsIFxuXHRGUklFTkQ6IDEsIFxuXHRSRVFVRVNURUQ6IDIsIFxuXHRQRU5ESU5HOiAzLCBcblx0QkxPQ0tFRDogNCBcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gRnJpZW5kOyB9IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBJbnZlbnRvcnlQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ludmVudG9yeVBhZ2UnKVswXSwgSW52ZW50b3J5Q3RybCwgSW52ZW50b3J5Vmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuSW52ZW50b3J5UGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkludmVudG9yeVBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW52ZW50b3J5UGFnZTtcblxuZnVuY3Rpb24gSW52ZW50b3J5Q3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLmJhbmRJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJlZHVjZShmdW5jdGlvbiAodmFsLCBjaHVuaywgaW5kZXgsIGFycil7XG4gICAgICAgIHJldHVybiB2YWwgfHwgKGNodW5rID09ICdiYW5kcycgPyBhcnJbaW5kZXgrMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sIHVuZGVmaW5lZCk7XG59XG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkludmVudG9yeUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW52ZW50b3J5Q3RybDtcbkludmVudG9yeUN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9pbnZlbnRvcnknLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgY3RybC5pdGVtcyA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZS51cGRhdGVJbnZlbnRvcnkgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICBjdHJsID0gdGhpcztcbiAgICAgICBcbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy91cGRhdGVpbnZlbnRvcnknLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbkludmVudG9yeUN0cmwucHJvdG90eXBlLmRlbGV0ZUludmVudG9yeSA9IGZ1bmN0aW9uIChpdGVtSWQpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgY3RybCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2N0cmwuYmFuZElkKycvaW52ZW50b3J5LycraXRlbUlkLFxuICAgICAgICB0eXBlOiAnREVMRVRFJ1xuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gSW52ZW50b3J5VmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5JbnZlbnRvcnlWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEludmVudG9yeVZpZXc7XG5JbnZlbnRvcnlWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdmFyIGl0ZW1FbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmludmVudG9yeScpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgIHRoaXMucGFnZS5jdHJsLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICBpdGVtRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwicm93XCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLTYtc21cIj4nK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZFwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8aW1nIGNsYXNzPVwiY2FyZC1pbWctdG9wIGltZy1mbHVpZFwiIHNyYz1cIi9tZWRpYS8nK2l0ZW0uaW1hZ2VQYXRoKydcIiBhbHQ9XCJDYXJkIGltYWdlIGNhcFwiPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9jayBpbWctYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxoNCBjbGFzcz1cImNhcmQtdGl0bGVcIj4nK2l0ZW0ubmFtZSsnPC9oND4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxwIGNsYXNzPVwiY2FyZC10ZXh0XCI+JytpdGVtLnR5cGUrJzxicj5Db2xvcjogJytpdGVtLmNvbG9yKyc8L3A+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICc8dWwgY2xhc3M9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIiBuYW1lPVwiaW52ZW50b3J5LWxpc3QtJytpdGVtLmlkKydcIj48L3VsPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tZWRpdFwiIGRhdGEtaXRlbS1pZD1cIicraXRlbS5pZCsnXCI+RWRpdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi1kZWxldGVcIiBkYXRhLWl0ZW0taWQ9XCInK2l0ZW0uaWQrJ1wiPkRlbGV0ZTwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nKTtcblxuICAgICAgICB2YXIgaW52ZW50b3J5RWxlbSA9ICQodGhhdC5wYWdlLmVsZW0pLmZpbmQoJ1tuYW1lPWludmVudG9yeS1saXN0LScraXRlbS5pZCsnXScpXG5cbiAgICAgICAgaXRlbS5pbnZlbnRvcnkuZm9yRWFjaChmdW5jdGlvbiAoaW52ZW50b3J5KXtcbiAgICAgICAgICAgIGlmIChpbnZlbnRvcnkuc2l6ZSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgaW52ZW50b3J5RWxlbS5hcHBlbmQoJycrXG4gICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gY2xlYXJmaXhcIj5RdWFudGl0eTogJytpbnZlbnRvcnkucXVhbnRpdHkrJzwvbGk+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnZlbnRvcnlFbGVtLmFwcGVuZCgnJytcbiAgICAgICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPlNpemU6ICcraW52ZW50b3J5LnNpemUrJzxicj5RdWFudGl0eTogJytpbnZlbnRvcnkucXVhbnRpdHkrJzwvbGk+Jyk7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG5cbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBpZCA9IHVybC5zcGxpdCgnLycpWyB1cmwuc3BsaXQoJy8nKS5pbmRleE9mKCdiYW5kcycpKzFdO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1tZXJjaCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy8nK2lkKycvYWRkbWVyY2gnO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG4tZWRpdCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZS52aWV3LnNob3dFZGl0TW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWl0ZW0taWQnKSwxMCkpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICcjdXBkYXRlLWZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICAgXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7ICAgXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVJbnZlbnRvcnkodGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuLWRlbGV0ZScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgICBcbiAgICAgICAgcGFnZS5jdHJsLmRlbGV0ZUludmVudG9yeShwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaXRlbS1pZCcpLDEwKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICdbbmFtZT1cImFkZFNpemVcIl0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICBcbiAgICAgICAgdmFyIHR5cGUgPSBwYWdlRWxlbS5maW5kKCdbbmFtZT1cInR5cGVcIl0nKVswXS52YWx1ZTtcbiAgICAgICAgcGFnZS52aWV3LmFkZFNpemVGaWVsZCh0eXBlKTtcbiAgICB9KTtcbn07XG5cbkludmVudG9yeVZpZXcucHJvdG90eXBlLnNob3dFZGl0TW9kYWwgPSBmdW5jdGlvbiAoaXRlbUlkKXtcbiAgICB2YXIgdGhpc0l0ZW0gPSB0aGlzLnBhZ2UuY3RybC5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICByZXR1cm4gaXRlbS5pZCA9PSBpdGVtSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgbmFtZT1cImFkZFNpemVcIj5BZGQgU2l6ZSA8ZGl2IGNsYXNzPVwiZmEgZmEtcGx1cyBpY29uXCI+PC9kaXY+JztcblxuICAgICQoJy5pdGVtLWludmVudG9yeScpLnJlbW92ZSgpO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBpbnZlbnRvcnlGaWVsZHMgPSAnJztcbiAgICB2YXIgaXRlbU1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLml0ZW0tbW9kYWwnKTtcbiAgICBcbiAgICAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcubW9kYWwtYm9keScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIml0ZW0taW52ZW50b3J5XCI+PC9kaXY+Jyk7XG5cbiAgICB0aGlzSXRlbS5pbnZlbnRvcnkuZm9yRWFjaChmdW5jdGlvbiAoaW52ZW50b3J5KXsgICBcbiAgICAgICAgaWYgKHRoaXNJdGVtLnR5cGUgPT09ICdTaGlydCcpIHtcbiAgICAgICAgICAgIGludmVudG9yeUZpZWxkcyA9ICcnK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJzaXplLScraW52ZW50b3J5LmlkKydcIj5TaXplPC9sYWJlbD4nK1xuICAgICAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIGlkPVwic2l6ZS0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgbmFtZT1cInNpemVcIiByZXF1aXJlZD4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwic1wiPlM8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwibVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwibFwiPkw8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwieGxcIj5YTDwvb3B0aW9uPicrXG4gICAgICAgICAgICAnPC9zZWxlY3Q+JzsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzSXRlbS50eXBlID09PSAnQ0QnKSB7XG4gICAgICAgICAgICBpbnZlbnRvcnlGaWVsZHMgPSAnPGlucHV0IGNsYXNzXCJmb3JtLWNvbnRyb2xcIiBpZD1cInNpemUtJytpbnZlbnRvcnkuaWQrJ1wiIGZvcm09XCJ1cGRhdGUtZm9ybVwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic2l6ZVwiLz4nO1xuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpc0l0ZW0udHlwZSA9PT0gJ1N0aWNrZXInKSB7XG4gICAgICAgICAgICBpbnZlbnRvcnlGaWVsZHMgPSAnJytcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwic2l6ZS0nK2ludmVudG9yeS5pZCsnXCI+U2l6ZTwvbGFiZWw+JytcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGR5bmFtaWNGaWVsZHNcIiBpZD1cInNpemUtJytpbnZlbnRvcnkuaWQrJ1wiIGZvcm09XCJ1cGRhdGUtZm9ybVwiIG5hbWU9XCJzaXplXCIgcmVxdWlyZWQ+JytcbiAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjF4MVwiPjF4MTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCIyeDJcIj4yeDI8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiM3g0XCI+M3g0PC9vcHRpb24+JytcbiAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjV4NlwiPjV4Njwvb3B0aW9uPicrXG4gICAgICAgICAgICAnPC9zZWxlY3Q+JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsbCB0eXBlcyBoYXZlIGEgcXVhbnRpdHlcbiAgICAgICAgaW52ZW50b3J5RmllbGRzICs9ICcnK1xuICAgICAgICAnPGxhYmVsIGZvcj1cInF1YW50aXR5LScraW52ZW50b3J5LmlkKydcIj5RdWFudGl0eTwvbGFiZWw+JytcbiAgICAgICAgJzxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzIHF1YW50aXR5XCIgaWQ9XCJxdWFudGl0eS0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgbmFtZT1cInF1YW50aXR5XCIgcmVxdWlyZWQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBzdGVwPVwiMVwiIHBsYWNlaG9sZGVyPVwiUXVhbnRpdHlcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIwcHg7XCI+JytcbiAgICAgICAgJzxpbnB1dCBjbGFzc1wiZm9ybS1jb250cm9sXCIgaWQ9XCJpbnZlbnRvcnlJZC0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnZlbnRvcnlJZFwiLz4nO1xuXG4gICAgICAgIHZhciBpbnZlbnRvcnlGaWVsZHNEaXYgPSAkKHRoYXQucGFnZS5lbGVtKS5maW5kKCcuaXRlbS1pbnZlbnRvcnknKTtcbiAgICAgICAgaW52ZW50b3J5RmllbGRzRGl2LmFwcGVuZChpbnZlbnRvcnlGaWVsZHMpO1xuICAgICAgICAgIFxuICAgICAgICAkKCcjc2l6ZS0nK2ludmVudG9yeS5pZClbMF0udmFsdWUgPSBpbnZlbnRvcnkuc2l6ZTsgICAgXG4gICAgICAgICQoJyNxdWFudGl0eS0nK2ludmVudG9yeS5pZClbMF0udmFsdWUgPSBpbnZlbnRvcnkucXVhbnRpdHk7XG4gICAgICAgICQoJyNpbnZlbnRvcnlJZC0nK2ludmVudG9yeS5pZClbMF0udmFsdWUgPSBpbnZlbnRvcnkuaWQ7XG4gICAgfSk7ICBcblxuICAgICQoJ1tuYW1lPVwiaXRlbUlkXCJdJylbMF0udmFsdWUgPSB0aGlzSXRlbS5pZDsgICAgICAgICBcbiAgICAkKCdbbmFtZT1cIm5hbWVcIl0nKVswXS52YWx1ZSA9IHRoaXNJdGVtLm5hbWU7ICBcbiAgICAkKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJylbMF0udmFsdWUgPSB0aGlzSXRlbS5kZXNjcmlwdGlvbjtcbiAgICAkKCdbbmFtZT1cImNvbG9yXCJdJylbMF0udmFsdWUgPSB0aGlzSXRlbS5jb2xvcjsgICAgXG4gICAgJCgnW25hbWU9XCJwcmljZVwiXScpWzBdLnZhbHVlID0gdGhpc0l0ZW0ucHJpY2U7IFxuICAgICQoJ1tuYW1lPVwidHlwZVwiXScpWzBdLnZhbHVlID0gdGhpc0l0ZW0udHlwZTsgXG5cbiAgICBpdGVtTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKVxuICAgIGl0ZW1Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWl0ZW0taWQnLHRoaXNJdGVtLmlkKTtcbiAgICBpdGVtTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzSXRlbS5uYW1lKTtcbiAgICBpdGVtTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07XG5cbkludmVudG9yeVZpZXcucHJvdG90eXBlLmFkZFNpemVGaWVsZCA9IGZ1bmN0aW9uICh0eXBlKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIGludmVudG9yeUZpZWxkcyA9ICcnO1xuXG4gICAgaWYgKHR5cGUgPT09ICdTaGlydCcpIHtcbiAgICAgICAgaW52ZW50b3J5RmllbGRzID0gJycrXG4gICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGR5bmFtaWNGaWVsZHNcIiBmb3JtPVwidXBkYXRlLWZvcm1cIiBuYW1lPVwic2l6ZVwiIHJlcXVpcmVkPicrXG4gICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInNcIj5TPC9vcHRpb24+JytcbiAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwibVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJsXCI+TDwvb3B0aW9uPicrXG4gICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInhsXCI+WEw8L29wdGlvbj4nK1xuICAgICAgICAnPC9zZWxlY3Q+JzsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ0NEJykge1xuICAgICAgICBpbnZlbnRvcnlGaWVsZHMgPSAnPGlucHV0IGNsYXNzXCJmb3JtLWNvbnRyb2xcIiBmb3JtPVwidXBkYXRlLWZvcm1cIiB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInNpemVcIi8+JztcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdTdGlja2VyJykge1xuICAgICAgICBpbnZlbnRvcnlGaWVsZHMgPSAnJytcbiAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIGZvcm09XCJ1cGRhdGUtZm9ybVwiIG5hbWU9XCJzaXplXCIgcmVxdWlyZWQ+JytcbiAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiMXgxXCI+MXgxPC9vcHRpb24+JytcbiAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiMngyXCI+MngyPC9vcHRpb24+JytcbiAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiM3g0XCI+M3g0PC9vcHRpb24+JytcbiAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiNXg2XCI+NXg2PC9vcHRpb24+JytcbiAgICAgICAgJzwvc2VsZWN0Pic7XG4gICAgfVxuXG4gICAgLy8gQWxsIHR5cGVzIHdpbGwgaGF2ZSBhIHF1YW50aXR5IGFuZCBjb2xvclxuICAgIGludmVudG9yeUZpZWxkcyArPSAnPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sIGR5bmFtaWNGaWVsZHNcIiBmb3JtPVwidXBkYXRlLWZvcm1cIiByZXF1aXJlZCB0eXBlPVwibnVtYmVyXCIgbmFtZT1cInF1YW50aXR5XCIgbWluPVwiMFwiIHN0ZXA9XCIxXCIgcGxhY2Vob2xkZXI9XCJRdWFudGl0eVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIGZvcm09XCJ1cGRhdGUtZm9ybVwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaW52ZW50b3J5SWRcIiB2YWx1ZT1cIm5ld1wiLz4nO1xuICAgIHZhciBpbnZlbnRvcnlGaWVsZHNEaXYgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuaXRlbS1pbnZlbnRvcnknKTtcbiAgICBpbnZlbnRvcnlGaWVsZHNEaXYuYXBwZW5kKGludmVudG9yeUZpZWxkcyk7XG59XG4iLCJmdW5jdGlvbiBJdGVtKGpzb24pIHtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLnR5cGUgPSBqc29uLnR5cGUgfHwgJyc7XG4gICAgdGhpcy5jb2xvciA9IGpzb24uY29sb3IgfHwgJyc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGpzb24uZGVzY3JpcHRpb24gfHwgJyc7XG4gICAgdGhpcy5pbWFnZVBhdGggPSBqc29uLmltYWdlUGF0aCB8fCAnJztcbiAgICB0aGlzLmltYWdlRmlsZSA9IGpzb24uaW1hZ2VGaWxlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnByaWNlID0ganNvbi5wcmljZSB8fCAwO1xuICAgIHRoaXMuaW52ZW50b3J5ID0ganNvbi5pbnZlbnRvcnkgfHwgdW5kZWZpbmVkO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBJdGVtOyB9IiwiZnVuY3Rpb24gTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbklkLCB1c2VySWQsIHR5cGUsIG1lc3NhZ2UsIGxpbmssIHVucmVhZCl7XG4gICAgdGhpcy5ub3RpZmljYXRpb25JZCA9IG5vdGlmaWNhdGlvbklkO1xuICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLmxpbmsgPSBsaW5rO1xuICAgIHRoaXMudW5yZWFkID0gdW5yZWFkO1xufVxuTm90aWZpY2F0aW9uLlRZUEUgPSB7XG4gICAgTk9fTUVTU0FHRTogMCxcbiAgICBGUklFTkRfUkVRVUVTVDogMSxcbiAgICBGUklFTkRfQUNDRVBURUQ6IDIsXG4gICAgQkFORF9JTlZJVEU6IDMsXG4gICAgUkVNT1ZFRF9GUk9NX0JBTkQ6IDQsXG4gICAgRVZFTlRfSU5WSVRFOiA1LFxuICAgIEVWRU5UX1JFTUlOREVSOiA2LFxuICAgIEVSUk9SOiA3LFxuICAgIFNVQ0NFU1M6IDgsXG4gICAgV0FSTklORzogOVxufTtcbk5vdGlmaWNhdGlvbi5mcm9tT2JqID0gZnVuY3Rpb24gKG9iail7XG4gICAgdmFyIG15Tm90aWZpY2F0aW9uID0gbmV3IE5vdGlmaWNhdGlvbigpO1xuICAgIG15Tm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbklkID0gb2JqLm5vdGlmaWNhdGlvbklkIHx8IG9iai5Ob3RpZmljYXRpb25JZCB8fCAtMTtcbiAgICBteU5vdGlmaWNhdGlvbi51c2VySWQgPSBvYmoudXNlcklkIHx8IG9iai5Vc2VySWQgfHwgLTE7XG4gICAgbXlOb3RpZmljYXRpb24udHlwZSA9IG9iai50eXBlIHx8IG9iai5UeXBlIHx8IE5vdGlmaWNhdGlvbi5UWVBFLk5PX01FU1NBR0U7XG4gICAgbXlOb3RpZmljYXRpb24ubWVzc2FnZSA9IG9iai5tZXNzYWdlIHx8IG9iai5NZXNzYWdlIHx8ICcnO1xuICAgIG15Tm90aWZpY2F0aW9uLmxpbmsgPSBvYmoubGluayB8fCBvYmouTGluayB8fCAnIyc7XG4gICAgbXlOb3RpZmljYXRpb24udW5yZWFkID0gb2JqLnVucmVhZCB8fCBvYmouVW5yZWFkIHx8IHRydWU7XG4gICAgcmV0dXJuIG15Tm90aWZpY2F0aW9uO1xufTtcblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gTm90aWZpY2F0aW9uOyB9XG4iLCJmdW5jdGlvbiBTZWFyY2hlZEJhbmQoanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLmJhbmROYW1lID0ganNvbi5iYW5kTmFtZSB8fCAnJztcbiAgICB0aGlzLmFwcGxpY2F0aW9uU3RhdHVzID0ganNvbi5hcHBsaWNhdGlvblN0YXR1cyB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5yb2xlID0ganNvbi5yb2xlIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0ganNvbi5kZXNjcmlwdGlvbiB8fCAnJztcbiAgICB0aGlzLmdlbnJlID0ganNvbi5nZW5yZSB8fCAnJztcbn1cblxuU2VhcmNoZWRCYW5kLlJPTEUgPSB7XG4gICAgT1dORVI6IDAsXG4gICAgTUFOQUdFUjogMSxcbiAgICBNRU1CRVI6IDIsXG4gICAgUFJPTU9URVI6IDNcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gU2VhcmNoZWRCYW5kOyB9IiwiaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7XG4gICAgdmFyIGxlZnRQYWQgPSByZXF1aXJlKCcuLi91dGlscy9sZWZ0UGFkLmpzJyk7XG59XG5cbmZ1bmN0aW9uIFNldExpc3QoZGF0YSl7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuYmFuZElkID0gZGF0YS5iYW5kSWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCAnJztcbiAgICB0aGlzLnNvbmdzID0gZGF0YS5zb25ncyB8fCBbXTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGF0YS5kZXNjcmlwdGlvbiB8fCAnJztcbn1cblxuU2V0TGlzdC5wcm90b3R5cGUudG90YWxMZW5ndGggPSBmdW5jdGlvbiAoKXtcbiAgICByZXR1cm4gdGhpcy5zb25ncy5yZWR1Y2UoZnVuY3Rpb24gKHRvdGFsLCBzb25nKXtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gc29uZy5kdXJhdGlvbi5zcGxpdCgnOicpO1xuICAgICAgICByZXR1cm4gdG90YWwubWFwKGZ1bmN0aW9uICh2YWwsIGluZGV4KXtcbiAgICAgICAgICAgIHJldHVybiB2YWwgKyBwYXJzZUludChkdXJhdGlvbltpbmRleF0sMTApO1xuICAgICAgICB9KTtcbiAgICB9LFswLDAsMF0pLm1hcChmdW5jdGlvbiAodG90YWwpe1xuICAgICAgICByZXR1cm4gbGVmdFBhZCh0b3RhbC50b1N0cmluZygpLDIsJzAnKTtcbiAgICB9KS5qb2luKCc6Jyk7XG59O1xuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTZXRMaXN0IH0iLCJmdW5jdGlvbiBTaW1wbGVCYW5kKGpzb24pe1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy5vd25lck5hbWUgPSBqc29uLm93bmVyTmFtZSB8fCAnJztcbiAgICB0aGlzLm93bmVySWQgPSBqc29uLm93bmVySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVCYW5kOyB9IiwiZnVuY3Rpb24gU29uZyhkYXRhKXtcbiAgICB0aGlzLmlkID0gZGF0YS5pZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kSWQgPSBkYXRhLmJhbmRJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lIHx8ICcnO1xuICAgIHRoaXMuZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uIHx8ICcwMGgwMG0wMHMnO1xuICAgIHRoaXMubHlyaWNzID0gZGF0YS5seXJpY3MgfHwgJyc7XG4gICAgdGhpcy5jb21wb3NlciA9IGRhdGEuY29tcG9zZXIgfHwgJyc7XG4gICAgdGhpcy5saW5rID0gZGF0YS5saW5rIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IGRhdGEucGF0aCB8fCAnJztcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gU29uZzsgfSIsImZ1bmN0aW9uIFVzZXIoZGF0YSl7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQgfHwgMDtcbiAgICB0aGlzLnVzZXJuYW1lID0gZGF0YS51c2VybmFtZSB8fCAnJztcbiAgICB0aGlzLmZpcnN0TmFtZSA9IGRhdGEuZmlyc3ROYW1lIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxhc3ROYW1lID0gZGF0YS5sYXN0TmFtZSB8fCAnJztcbiAgICB0aGlzLmJpbyA9IGRhdGEuYmlvIHx8ICcnO1xuICAgIHRoaXMuZW1haWwgPSBkYXRhLmVtYWlsIHx8ICcnO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBVc2VyOyB9IiwiZnVuY3Rpb24gbGVmdFBhZChzdHIsIGxlbmcsIHBhZCl7XG4gICAgdmFyIG5ld1N0ciA9IHN0cjtcbiAgICB3aGlsZShuZXdTdHIubGVuZ3RoIDwgbGVuZyl7XG4gICAgICAgIG5ld1N0ciA9IHBhZCArIG5ld1N0cjtcbiAgICB9XG4gICAgcmV0dXJuIG5ld1N0cjtcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gbGVmdFBhZDsgfSIsIi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIEFwcCgpe1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB1bmRlZmluZWQ7XG4gICAgLy90aGlzLnBhZ2VIaXN0b3J5ID0gW107XG59XG5BcHAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoUGFnZUNvbnN0cnVjdG9yKXtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IFBhZ2VDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRoaXMuY3VycmVudFBhZ2UuaW5pdCgpO1xufTtcbi8qQXBwLnByb3RvdHlwZS5jaGFuZ2VQYWdlID0gZnVuY3Rpb24gKHBhZ2UsIGRhdGEpe1xuICAgIGlmKCB0aGlzLmN1cnJlbnRQYWdlICl7XG4gICAgICAgIC8vc3RvcmUgdGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgbGFzdCBwYWdlXG4gICAgICAgIHRoaXMucGFnZUhpc3RvcnkucHVzaCh0aGlzLmN1cnJlbnRQYWdlLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgLy9jcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG5leHQgcGFnZVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgcGFnZSh0aGlzKTtcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRoaXMuY3VycmVudFBhZ2UuaW5pdCgpO1xufTsqLyIsIi8qIGdsb2JhbCAkICovXG4vKiogSW5oZXJpdGFibGUgQ2xhc3NlcyAqKi9cbmZ1bmN0aW9uIFBhZ2UoYXBwLCBlbGVtLCBjdHJsQ29uc3RydWN0b3IsIHZpZXdDb25zdHJ1Y3RvciwgY2hpbGRDb21wb25lbnRzKXtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICAgIHRoaXMuY3RybCA9IG5ldyBjdHJsQ29uc3RydWN0b3IodGhpcyk7XG4gICAgdGhpcy52aWV3ID0gbmV3IHZpZXdDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50cyA9IGNoaWxkQ29tcG9uZW50cyB8fCB7fTtcbn1cblBhZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgZm9yKCB2YXIgY29tcG9uZW50IGluIHRoaXMuY2hpbGRDb21wb25lbnRzICl7XG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRzW2NvbXBvbmVudF0uaW5pdCgpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmN0cmwuaW5pdCgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIHRoYXQudmlldy5pbml0LmFwcGx5KHRoYXQudmlldywgYXJndW1lbnRzKTtcbiAgICB9KVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbn07XG5cbmZ1bmN0aW9uIFBhZ2VDdHJsKHBhZ2Upe1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG59XG5QYWdlQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIFBhZ2VWaWV3KHBhZ2Upe1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG59XG5QYWdlVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe307IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBNZW51SXRlbShkYXRhKXtcbiAgICB0aGlzLmxhYmVsID0gZGF0YS5sYWJlbHx8Jyc7XG4gICAgdGhpcy5jbGFzcyA9IGRhdGEuY2xhc3N8fCcnO1xuICAgIHRoaXMuYWN0aW9uID0gZGF0YS5hY3Rpb258fHRoaXMuYWN0aW9uO1xuICAgIHRoaXMucmVuZGVyID0gZGF0YS5yZW5kZXJ8fHRoaXMucmVuZGVyO1xufVxuTWVudUl0ZW0ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gJyt0aGlzLmNsYXNzKycgYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLWJsb2NrXCI+Jyt0aGlzLmxhYmVsKyc8L2J1dHRvbj4nKS5wcm9taXNlKCk7XG59O1xuTWVudUl0ZW0ucHJvdG90eXBlLmFjdGlvbiA9IGZ1bmN0aW9uIChlKXt9O1xuXG5mdW5jdGlvbiBNZW51Q29tcG9uZW50KGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJChkYXRhLmVsZW1lbnQpWzBdLCBNZW51Q3RybCwgTWVudVZpZXcpO1xufVxuTWVudUNvbXBvbmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbk1lbnVDb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudUNvbXBvbmVudDtcblxuZnVuY3Rpb24gTWVudUN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1lbnVDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbk1lbnVDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVDdHJsO1xuTWVudUN0cmwucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2FwaS9sb2dvdXQnXG4gICAgfSkudGhlbihkZWZlci5yZXNvbHZlKS5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5cbmZ1bmN0aW9uIE1lbnVWaWV3KHBhZ2Upe1xuICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIFxuICAgIHRoaXMucHJvZmlsZU1lbnVJdGVtcyA9IFt7XG4gICAgICAgIGNsYXNzOiAnaG9tZScsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9tYWluJztcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gaG9tZSBmYSBmYS1ob21lIGJ0biBidG4tc2Vjb25kYXJ5XCI+PC9idXR0b24+JykucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBjbGFzczogJ3Byb2ZpbGUnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvcHJvZmlsZSc7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VyJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpe1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoJzxkaXYgY2xhc3M9XCJwcm9maWxlXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJwcm9maWxlLWltZ1wiIHNyYz1cImh0dHBzOi8vcGxhY2Vob2xkLml0LzE1MHgxNTBcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByb2ZpbGUtbmFtZVwiPicrdXNlci51c2VybmFtZSsnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JykucHJvbWlzZSgpO1xuICAgICAgICAgICAgfSkuZmFpbChkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfV0ubWFwKGZ1bmN0aW9uIChpdGVtKXtyZXR1cm4gbmV3IE1lbnVJdGVtKGl0ZW0pfSk7XG4gICAgXG4gICAgdGhpcy5tYWluTWVudUl0ZW1zID0gW3tcbiAgICAgICAgbGFiZWw6ICdCYW5kcycsXG4gICAgICAgIGNsYXNzOiAnYmFuZHMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXsgXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdGcmllbmRzJyxcbiAgICAgICAgY2xhc3M6ICdmcmllbmRzJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMnOyBcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdOb3RpZmljYXRpb25zJyxcbiAgICAgICAgY2xhc3M6ICdub3RpZmljYXRpb25zJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL25vdGlmaWNhdGlvbnMnO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9ub3RpZmljYXRpb25zP3VucmVhZCZjb3VudCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gJytpdGVtLmNsYXNzKycgYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLWJsb2NrXCI+JytpdGVtLmxhYmVsKycgPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLXByaW1hcnlcIj4nKyhkYXRhLmNvdW50fHwwKSsnPC9zcGFuPjwvYnV0dG9uPicpOyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBsYWJlbDogJ0xvZ291dCcsXG4gICAgICAgIGNsYXNzOiAnbG9nb3V0JyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5sb2dvdXQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG4gICAgICAgICAgICB9KS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgICAgfVxuICAgIH1dLm1hcChmdW5jdGlvbiAoaXRlbSl7cmV0dXJuIG5ldyBNZW51SXRlbShpdGVtKX0pO1xuICAgIFxuICAgIHRoaXMuYmFuZFByb2ZpbGVJdGVtcyA9IFt7XG4gICAgICAgIGNsYXNzOiAnYmFuZC1wcm9maWxlJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzEpLmNvbmNhdCgncHJvZmlsZScpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAvL3JldHVybiAnPGRpdiBjbGFzcz1cImJhbmQtcHJvZmlsZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vcGxhY2Vob2xkLml0LzI0MHgxNTApXCI+JysrJzwvZGl2PidcbiAgICAgICAgICAgIHZhciBsb2MgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrbG9jW2xvYy5pbmRleE9mKCdiYW5kcycpKzFdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGJhbmQpe1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoJzxkaXYgY2xhc3M9XCJiYW5kLXByb2ZpbGVcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL3BsYWNlaG9sZC5pdC8yNDB4MTUwKVwiPicrYmFuZC5iYW5kTmFtZSsnPC9kaXY+Jyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICB9XS5tYXAoZnVuY3Rpb24gKGl0ZW0pe3JldHVybiBuZXcgTWVudUl0ZW0oaXRlbSl9KTtcbiAgICBcbiAgICB0aGlzLmJhbmRNZW51SXRlbXMgPSBbe1xuICAgICAgICBsYWJlbDogJ1NldCBMaXN0cycsXG4gICAgICAgIGNsYXNzOiAnc2V0bGlzdHMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdzZXRsaXN0cycpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnU29uZ3MnLFxuICAgICAgICBjbGFzczogJ3NvbmdzJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmNvbmNhdCgnc29uZ3MnKS5qb2luKCcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBsYWJlbDogJ0ludmVudG9yeScsXG4gICAgICAgIGNsYXNzOiAnaW52ZW50b3J5JyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmNvbmNhdCgnaW52ZW50b3J5Jykuam9pbignLycpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdTdG9yZScsXG4gICAgICAgIGNsYXNzOiAnc3RvcmUnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdzdG9yZScpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnRXZlbnRzJyxcbiAgICAgICAgY2xhc3M6ICdldmVudHMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdldmVudHMnKS5qb2luKCcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBsYWJlbDogJ01lbWJlcnMnLFxuICAgICAgICBjbGFzczogJ21lbWJlcnMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdtZW1iZXJzJykuam9pbignLycpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdNYW5hZ2UnLFxuICAgICAgICBjbGFzczogJ21hbmFnZScsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgIG5ld1BhdGggPSBuZXdQYXRoLnNsaWNlKDAsIG5ld1BhdGguaW5kZXhPZignYmFuZHMnKSsyKS5jb25jYXQoJ21hbmFnZScpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9XS5tYXAoZnVuY3Rpb24gKGl0ZW0pe3JldHVybiBuZXcgTWVudUl0ZW0oaXRlbSl9KTtcbn1cbk1lbnVWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbk1lbnVWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVWaWV3O1xuTWVudVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgdmlldy5tZW51QnV0dG9uQ29udGFpbmVyID0gJCh2aWV3LnBhZ2UuZWxlbSk7XG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoJyNtZW51T3ZlcmxheScpO1xuICAgIHZpZXcucmVuZGVyTWVudSgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIHZpZXcuYmluZEV2ZW50cygpO1xuICAgIH0pO1xufTtcbk1lbnVWaWV3LnByb3RvdHlwZS5yZW5kZXJNZW51ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHZpZXcgPSB0aGlzLFxuICAgICAgICBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgXG4gICAgLyogcmVuZGVyIG92ZXJsYXkgKi9cbiAgICBpZiggdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5sZW5ndGggPT0gMCApe1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwibWVudU92ZXJsYXlcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PicpO1xuICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyID0gJChcIiNtZW51T3ZlcmxheVwiKTtcbiAgICB9XG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5lbXB0eSgpO1xuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudVwiPjwvZGl2PicpO1xuICAgIFxuICAgIC8vZGVmaW5lIHRoZSByZWN1cnNpdmUgYXN5bmNocm9ub3VzIHJlbmRlcmluZyBmdW5jdGlvblxuICAgIGZ1bmN0aW9uIG5leHRJdGVtKHBhcmVudCwgaXRlbXMsIGluZGV4KXtcbiAgICAgICAgaWYoIGluZGV4ID49IGl0ZW1zLmxlbmd0aCApe1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgXG4gICAgICAgIC8vYnVpbGQgdGhlIGh0bWwgZm9yIHRoaXMgaXRlbVxuICAgICAgICBpdGVtc1tpbmRleF0ucmVuZGVyKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGh0bWwpe1xuICAgICAgICAgICAgLy9hZGQgdGhpcyBpdGVtIHRvIHRoZSBET01cbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoaHRtbCk7XG4gICAgICAgICAgICAvL3JlbmRlciB0aGUgbmV4dCBpdGVtXG4gICAgICAgICAgICBuZXh0SXRlbShwYXJlbnQsIGl0ZW1zLCBpbmRleCsxKVxuICAgICAgICAgICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAgICAgICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xuICAgIH1cbiAgICBcbiAgICB2YXIgc2hvdWxkUmVuZGVyQmFuZCA9IGZhbHNlO1xuICAgIHZhciBzcGxpdExvYyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgIHZhciBiYW5kSWQgPSBzcGxpdExvY1tzcGxpdExvYy5pbmRleE9mKCdiYW5kcycpKzFdO1xuICAgIGlmKCBiYW5kSWQgIT09IHVuZGVmaW5lZCAmJiAhaXNOYU4ocGFyc2VJbnQoYmFuZElkKSkgKXtcbiAgICAgICAgc2hvdWxkUmVuZGVyQmFuZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8vcmVuZGVyIHByb2ZpbGUgY2h1bmtcbiAgICB2YXIgcGFyZW50ID0gJCgnPGRpdiBjbGFzcz1cIm1lbnUtc2VjdGlvbiBjb250YWluZXIgcHJvZmlsZS1zZWN0aW9uIGNsZWFyZml4XCI+PC9kaXY+Jyk7XG4gICAgbmV4dEl0ZW0ocGFyZW50LCB2aWV3LnByb2ZpbGVNZW51SXRlbXMsIDApXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIC8vYWRkIHRoZSBwYXJlbnQgdG8gdGhlIERPTVxuICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKHBhcmVudCk7XG4gICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICB2aWV3LnByb2ZpbGVNZW51SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy4nK2l0ZW0uY2xhc3MsIGl0ZW0uYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vcmVuZGVyIG1haW4gbWVudSBjaHVua1xuICAgICAgICBwYXJlbnQgPSAkKCc8ZGl2IGNsYXNzPVwibWVudS1zZWN0aW9uIGNvbnRhaW5lciBjbGVhcmZpeFwiPjwvZGl2PicpO1xuICAgICAgICByZXR1cm4gbmV4dEl0ZW0ocGFyZW50LCB2aWV3Lm1haW5NZW51SXRlbXMsIDApO1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIC8vYWRkIHRoZSBwYXJlbnQgdG8gdGhlIERPTVxuICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKHBhcmVudCk7XG4gICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICB2aWV3Lm1haW5NZW51SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy4nK2l0ZW0uY2xhc3MsIGl0ZW0uYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL3JlbmRlciBiYW5kIHByb2ZpbGUgYmxvY2tcbiAgICAgICAgcGFyZW50ID0gJCgnPGRpdiBjbGFzcz1cIm1lbnUtc2VjdGlvbiBiYW5kLXByb2ZpbGUtc2VjdGlvbiBjbGVhcmZpeFwiPjwvZGl2PicpO1xuICAgICAgICBpZiggc2hvdWxkUmVuZGVyQmFuZCApe1xuICAgICAgICAgICAgcmV0dXJuIG5leHRJdGVtKHBhcmVudCwgdmlldy5iYW5kUHJvZmlsZUl0ZW1zLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgLy9hZGQgdGhlIHBhcmVudCB0byB0aGUgRE9NXG4gICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQocGFyZW50KTtcbiAgICAgICAgaWYoIHNob3VsZFJlbmRlckJhbmQgKXtcbiAgICAgICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICAgICAgdmlldy5iYW5kUHJvZmlsZUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5vbignY2xpY2snLCAnLicraXRlbS5jbGFzcywgaXRlbS5hY3Rpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZW5kZXIgYmFuZCBpdGVtc1xuICAgICAgICBwYXJlbnQgPSAkKCc8ZGl2IGNsYXNzPVwibWVudS1zZWN0aW9uIGNvbnRhaW5lciBjbGVhcmZpeFwiPjwvZGl2PicpO1xuICAgICAgICBpZiggc2hvdWxkUmVuZGVyQmFuZCApe1xuICAgICAgICAgICAgcmV0dXJuIG5leHRJdGVtKHBhcmVudCwgdmlldy5iYW5kTWVudUl0ZW1zLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgLy9hZGQgdGhlIHBhcmVudCB0byB0aGUgRE9NXG4gICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQocGFyZW50KTtcbiAgICAgICAgaWYoIHNob3VsZFJlbmRlckJhbmQgKXtcbiAgICAgICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICAgICAgdmlldy5iYW5kTWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5vbignY2xpY2snLCAnLicraXRlbS5jbGFzcywgaXRlbS5hY3Rpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qIHJlbmRlciBtZW51IGJ1dHRvbiAqL1xuICAgICAgICB2aWV3Lm1lbnVCdXR0b25Db250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgdmlldy5tZW51QnV0dG9uQ29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnUtdG9nZ2xlIGJ0biBidG4tc2Vjb25kYXJ5IGZhIGZhLWJhcnNcIj48L2Rpdj4nKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5NZW51Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICB2aWV3ID0gdGhpcztcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLm1lbnUtdG9nZ2xlJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy5ob21lJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL21haW4nO1xuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEFkZEZyaWVuZFBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkRnJpZW5kUGFnZScpWzBdLCBBZGRGcmllbmRDdHJsLCBBZGRGcmllbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkRnJpZW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRQYWdlO1xuXG5mdW5jdGlvbiBBZGRGcmllbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5mcmllbmRzID0gW107XG59XG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kQ3RybDtcblxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmZyaWVuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIFwidG9cIiB1c2VyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBBZGRGcmllbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kVmlldztcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQ7XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlwcmVzcycsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC11c2VyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcGFnZS52aWV3LnVwZGF0ZVVzZXJMaXN0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwgMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTsgIFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBibG9jayByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5CbG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5CTE9DS0VEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIHVuYmxvY2sgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5ibG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGNhbmNlbCByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5DYW5jZWxSZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQWNjZXB0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkZSSUVORClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVqZWN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZWplY3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSB1bmZyaWVuZFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1kYW5nZXInO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5zaG93RnJpZW5kTW9kYWwgPSBmdW5jdGlvbiAoZnJpZW5kSWQpe1xuICAgIHZhciB0aGlzRnJpZW5kID0gdGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24gKGZyaWVuZCl7XG4gICAgICAgIHJldHVybiBmcmllbmQuaWQgPT0gZnJpZW5kSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucztcbiAgICAgICAgXG4gICAgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5VbmZyaWVuZE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWwgbXItMlwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blJlamVjdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FkZE1lcmNoUGFnZScpWzBdLCBBZGRNZXJjaEN0cmwsIEFkZE1lcmNoVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQWRkTWVyY2hQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkTWVyY2hQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZE1lcmNoUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG5cbiAgICB0aGlzLmJhbmRJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJlZHVjZShmdW5jdGlvbiAodmFsLCBjaHVuaywgaW5kZXgsIGFycil7XG4gICAgICAgIHJldHVybiB2YWwgfHwgKGNodW5rID09ICdiYW5kcycgPyBhcnJbaW5kZXgrMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sIHVuZGVmaW5lZCk7XG59XG5BZGRNZXJjaEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQWRkTWVyY2hDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZE1lcmNoQ3RybDtcblxuQWRkTWVyY2hDdHJsLnByb3RvdHlwZS5zdWJtaXRNZXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytpZCsnL2FkZG1lcmNoJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIEFkZE1lcmNoVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFkZE1lcmNoVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRNZXJjaFZpZXc7XG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCdbbmFtZT1cImFkZFNpemVcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xufTtcblxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnW25hbWU9XCJhZGRTaXplXCJdJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2VsZWN0ID0gcGFnZUVsZW0uZmluZCgnW25hbWU9XCJtZXJjaFR5cGVcIl0nKTtcbiAgICAgICAgcGFnZS52aWV3LmFkZFNpemVGaWVsZChzZWxlY3RbMF0udmFsdWUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2UndmUgcGlja2VkIGEgdHlwZSBzbyBlbmFibGUgdGhlIEFkZCBJbnZlbnRvcnkgYnV0dG9uIGFuZCByZW1vdmUgYW55IGV4aXN0aW5nIGZpZWxkcyBmcm9tIG90aGVyIHR5cGVzXG4gICAgcGFnZUVsZW0ub24oJ2NoYW5nZScsICdbbmFtZT1cIm1lcmNoVHlwZVwiXScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHBhZ2VFbGVtLmZpbmQoJy5keW5hbWljRmllbGRzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHNlbGVjdCA9IHBhZ2VFbGVtLmZpbmQoJ1tuYW1lPVwibWVyY2hUeXBlXCJdJyk7XG4gICAgICAgIC8vIE9ubHkgbGV0IHRoZSB1c2VyIGFkZCBzaXplcyBpZiB0aGV5IGFyZSBjaG9vc2luZyBhIHNoaXJ0IG9yIHN0aWNrZXJcbiAgICAgICAgaWYgKHNlbGVjdFswXS52YWx1ZSA9PT0gJ1NoaXJ0JyB8fCBzZWxlY3RbMF0udmFsdWUgPT09ICdTdGlja2VyJyl7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdbbmFtZT1cImFkZFNpemVcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ1tuYW1lPVwiYWRkU2l6ZVwiXScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFnZS52aWV3LmFkZFNpemVGaWVsZChzZWxlY3RbMF0udmFsdWUpOyAgICAgICBcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwYWdlLmN0cmwuc3VibWl0TWVyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLi4vJytwYWdlLmN0cmwuYmFuZElkKycvaW52ZW50b3J5JztcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmFkZFNpemVGaWVsZCA9IGZ1bmN0aW9uICh0eXBlKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIHR5cGVGaWVsZHMgPSAnJztcblxuICAgIGlmICh0eXBlID09PSAnU2hpcnQnKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInNcIj5TPC9vcHRpb24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwibVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJsXCI+TDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInhsXCI+WEw8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9zZWxlY3Q+JztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdDRCcpIHtcbiAgICAgICAgdHlwZUZpZWxkcyA9ICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic2l6ZVwiIHZhbHVlPVwibm9uZVwiIC8+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ1N0aWNrZXInKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjF4MVwiPjF4MTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjJ4MlwiPjJ4Mjwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjN4NFwiPjN4NDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjV4NlwiPjV4Njwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICc8L3NlbGVjdD4nO1xuICAgIH1cblxuICAgIC8vIEFsbCB0eXBlcyB3aWxsIGhhdmUgYSBxdWFudGl0eSBhbmQgY29sb3JcbiAgICB0eXBlRmllbGRzICs9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIHJlcXVpcmVkIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwicXVhbnRpdHlcIiBtaW49XCIwXCIgc3RlcD1cIjFcIiBwbGFjZWhvbGRlcj1cIlF1YW50aXR5XCI+JztcblxuICAgIHZhciB0eXBlRmllbGRzRGl2ID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmR5bmFtaWNGaWVsZHNDb250YWluZXInKTtcbiAgICB0eXBlRmllbGRzRGl2LmFwcGVuZCh0eXBlRmllbGRzKTtcbn0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIEFwcGxpY2F0aW9uICovXG4vKiBnbG9iYWwgQmFuZE1lbWJlciAqL1xuXG5mdW5jdGlvbiBBcHBsaWNhdGlvbnNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FwcGxpY2F0aW9uc1BhZ2UnKVswXSwgQXBwbGljYXRpb25zQ3RybCwgQXBwbGljYXRpb25zVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zUGFnZTtcblxuZnVuY3Rpb24gQXBwbGljYXRpb25zQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYXBwbGljYXRpb25zID0gW107XG59XG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zQ3RybDtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9hcHBsaWNhdGlvbnMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcblxuICAgICQuYWpheCgnL2FwaS9iYW5kcy8nK2lkKycvcm9sZScsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmJhbmRNZW1iZXJSb2xlID0gZGF0YS5yb2xlO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTsgIFxuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5wcm9jZXNzQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMpIHtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytpZCsnL3Byb2Nlc3NhcHBsaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge2FwcGxpY2F0aW9uSWQgOiBhcHBsaWNhdGlvbklkLCBwcm9jZXNzU3RhdHVzIDogcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMgOiBhcHBsaWNhdGlvblN0YXR1c31cbiAgICB9KS50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNWaWV3O1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBhcHBsaWNhdGlvbnNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9ucycpO1xuICAgIHZhciBiYWRnZSA9ICcnO1xuXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKyApe1xuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1hbmFnZXInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1lbWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIpIHtcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5Qcm9tb3Rlcic7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBsaWNhdGlvbnNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImFwcGxpY2F0aW9uIGJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1hcHBsaWNhdGlvbi1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLmlkKydcIiBkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cz1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cysnXCI+Jyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0udXNlcm5hbWUrJyA8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrJzwvZGl2PjxwLz4nKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb24nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93QXBwbGljYXRpb25Nb2RhbChwYXJzZUludCgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksMTApLHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyksMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BY2NlcHQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5BQ0NFUFRFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5SRUpFQ1RFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcbiAgICB2YXIgdGhpc0FwcGxpY2F0aW9uID0gdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zLmZpbHRlcihmdW5jdGlvbiAoYXBwbGljYXRpb24pe1xuICAgICAgICByZXR1cm4gYXBwbGljYXRpb24uaWQgPT0gYXBwbGljYXRpb25JZDtcbiAgICB9KVswXTtcbiAgICBcbiAgICB2YXIgbW9kYWxCdXR0b25zID0gJyc7XG5cbiAgICBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZE1lbWJlclJvbGUgPT09IEJhbmRNZW1iZXIuUk9MRS5PV05FUiB8fCB0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk1BTkFHRVIpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gICc8YnV0dG9uIGlkPVwiYnRuQWNjZXB0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JztcbiAgICB9XG5cbiAgICB2YXIgYXBwbGljYXRpb25Nb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5hcHBsaWNhdGlvbi1tb2RhbCcpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcsIHRoaXNBcHBsaWNhdGlvbi5pZCk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycsIHRoaXNBcHBsaWNhdGlvbi5zdGF0dXMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQXBwbGljYXRpb24ubmFtZSsnIC0gJyt0aGlzQXBwbGljYXRpb24udXNlcm5hbWUpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD5JbnN0cnVtZW50OiAnK3RoaXNBcHBsaWNhdGlvbi5pbnN0cnVtZW50Kyc8L3A+PHA+TWVzc2FnZTogJyt0aGlzQXBwbGljYXRpb24ubWVzc2FnZSk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYmFuZHNQYWdlJylbMF0sIEJhbmRzQ3RybCwgQmFuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5CYW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5CYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNQYWdlO1xuXG5mdW5jdGlvbiBCYW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmJhbmRzID0gW107XG59XG5CYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcbkJhbmRzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzVmlldztcbkJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJhbmQgYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWJhbmQtaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3JlZ2lzdGVyJztcbiAgICB9KTtcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvJyArICQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyk7XG4gICAgfSk7XG59O1xuIiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBTZXRMaXN0ICovXG5cbmZ1bmN0aW9uIEVkaXRTZXRMaXN0UGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNlZGl0U2V0TGlzdFBhZ2UnKVswXSwgRWRpdFNldExpc3RDdHJsLCBFZGl0U2V0TGlzdFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkVkaXRTZXRMaXN0UGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkVkaXRTZXRMaXN0UGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFZGl0U2V0TGlzdFBhZ2U7XG5cbmZ1bmN0aW9uIEVkaXRTZXRMaXN0Q3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuc2V0TGlzdCA9IG5ldyBTZXRMaXN0KHtcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJlZHVjZShmdW5jdGlvbiAodmFsLCBjaHVuaywgaW5kZXgsIGFycil7XG4gICAgICAgICAgICByZXR1cm4gdmFsIHx8IChjaHVuayA9PSAnc2V0bGlzdHMnID8gKGFycltpbmRleCsxXSA9PT0gJ25ldycgPyB1bmRlZmluZWQgOiBhcnJbaW5kZXgrMV0gKSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCksXG4gICAgICAgIGJhbmRJZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykucmVkdWNlKGZ1bmN0aW9uICh2YWwsIGNodW5rLCBpbmRleCwgYXJyKXtcbiAgICAgICAgICAgIHJldHVybiB2YWwgfHwgKGNodW5rID09ICdiYW5kcycgPyBhcnJbaW5kZXgrMV0gOiB1bmRlZmluZWQpO1xuICAgICAgICB9LCB1bmRlZmluZWQpXG4gICAgfSk7XG59XG5FZGl0U2V0TGlzdEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuRWRpdFNldExpc3RDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVkaXRTZXRMaXN0Q3RybDtcblxuZnVuY3Rpb24gRWRpdFNldExpc3RWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5FZGl0U2V0TGlzdFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuRWRpdFNldExpc3RWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVkaXRTZXRMaXN0VmlldztcbkVkaXRTZXRMaXN0Vmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5FZGl0U2V0TGlzdFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xufTtcblxuRWRpdFNldExpc3RWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gdGhpcy5wYWdlLmVsZW07XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEZyaWVuZHNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2ZyaWVuZHNQYWdlJylbMF0sIEZyaWVuZHNDdHJsLCBGcmllbmRzVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuRnJpZW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5GcmllbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzUGFnZTtcblxuZnVuY3Rpb24gRnJpZW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmZyaWVuZHMgPSBbXTtcbn1cbkZyaWVuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkZyaWVuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNDdHJsO1xuRnJpZW5kc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCgnL2FwaS9mcmllbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuZnJpZW5kcyA9IGRhdGE7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbkZyaWVuZHNDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBGcmllbmRzVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuRnJpZW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc1ZpZXc7XG5GcmllbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMudXBkYXRlVXNlckxpc3QoKTtcbn07XG5cbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1mcmllbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZnJpZW5kcy9hZGQnO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5mcmllbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93RnJpZW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpLDEwKSk7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUkVRVUVTVEVEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLlBFTkRJTkcpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5ibG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkNhbmNlbFJlcXVlc3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5BY2NlcHRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuRlJJRU5EKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blJlamVjdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0blVuZnJpZW5kTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTsgICAgICAgIFxufTtcblxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgIGZyaWVuZHNFbGVtLmZpbmQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1kYW5nZXInO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5GcmllbmRzVmlldy5wcm90b3R5cGUuc2hvd0ZyaWVuZE1vZGFsID0gZnVuY3Rpb24gKGZyaWVuZElkKXtcbiAgICB2YXIgdGhpc0ZyaWVuZCA9IHRoaXMucGFnZS5jdHJsLmZyaWVuZHMuZmlsdGVyKGZ1bmN0aW9uIChmcmllbmQpe1xuICAgICAgICByZXR1cm4gZnJpZW5kLmlkID09IGZyaWVuZElkO1xuICAgIH0pWzBdLFxuICAgICAgICBtb2RhbEJ1dHRvbnM7XG4gICAgICAgIFxuICAgIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuVW5mcmllbmRNb2RhbCBtci0yXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5VbmZyaWVuZDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAncmVxdWVzdGVkJykgeyBcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkNhbmNlbFJlcXVlc3RNb2RhbCBtci0yXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgUmVxdWVzdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdwZW5kaW5nJykgeyBcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bkFjY2VwdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkFjY2VwdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5SZWplY3RNb2RhbCBtci0yXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5SZWplY3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5VbmJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuYmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0blJlcXVlc3RNb2RhbCBtci0yXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5TZW5kIEZyaWVuZCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgXG4gICAgdmFyIGZyaWVuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZC1tb2RhbCcpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyx0aGlzRnJpZW5kLmlkKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNGcmllbmQudXNlck5hbWUpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzRnJpZW5kLm5hbWUrJzwvcD48cD4nK3RoaXNGcmllbmQuYmlvKyc8L3A+Jyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbi8qKlxuICogUEFHRVxuICogKi9cbmZ1bmN0aW9uIExvZ2luUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNsb2dpblBhZ2UnKVswXSwgTG9naW5DdHJsLCBMb2dpblZpZXcpO1xufVxuTG9naW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTG9naW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5DdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5sb2dnaW5nSW4gPSBmYWxzZTtcbn1cbkxvZ2luQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5Mb2dpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5DdHJsO1xuXG5Mb2dpbkN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2xvZ2luJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlamVjdCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIExvZ2luVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTG9naW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkxvZ2luVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpblZpZXc7XG5Mb2dpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkxvZ2luVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5sb2dnaW5nSW4gKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9tYWluJztcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5sb2dnaW5nSW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIFVzZXIgKi9cblxuZnVuY3Rpb24gTWFpblBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbWFpblBhZ2UnKVswXSwgTWFpbkN0cmwsIE1haW5WaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5NYWluUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbk1haW5QYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5QYWdlO1xuXG5mdW5jdGlvbiBNYWluQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMudXNlciA9IHVuZGVmaW5lZDtcbn1cbk1haW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbk1haW5DdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5DdHJsO1xuTWFpbkN0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvdXNlcicsXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uICh1c2VyKXtcbiAgICAgICAgY3RybC51c2VyID0gbmV3IFVzZXIodXNlcik7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cblxuZnVuY3Rpb24gTWFpblZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1haW5WaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbk1haW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1haW5WaWV3O1xuTWFpblZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5iYW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5hZGQtZnJpZW5kcycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcuc2VhcmNoLWJhbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3NlYXJjaCc7XG4gICAgfSk7XG4gICAgJChwYWdlLmVsZW0pLm9uKCdjbGljaycsICcubm90aWZpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9ub3RpZmljYXRpb25zJztcbiAgICB9KTtcbiAgICBcbiAgICAkKHBhZ2UuZWxlbSkuZmluZCgnLnVzZXJuYW1lJykuaHRtbChwYWdlLmN0cmwudXNlci51c2VybmFtZSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgTm90aWZpY2F0aW9uICovXG5cbi8qKlxuICogUEFHRVxuICogKi9cbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbnNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI25vdGlmaWNhdGlvbnNQYWdlJylbMF0sIE5vdGlmaWNhdGlvbnNDdHJsLCBOb3RpZmljYXRpb25zVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuTm90aWZpY2F0aW9uc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5Ob3RpZmljYXRpb25zUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBOb3RpZmljYXRpb25zUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gTm90aWZpY2F0aW9uc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBbXTtcbn1cbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNDdHJsO1xuXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgIGN0cmwuZ2V0Tm90aWZpY2F0aW9ucygpLnRoZW4ocmVzb2x2ZSkuY2F0Y2gocmVqZWN0KTtcbiAgICB9KTtcbn07XG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuZ2V0Tm90aWZpY2F0aW9ucyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBjdHJsID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgIC8vZ2V0IG5vdGlmaWNhdGlvbnNcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6ICcvYXBpL25vdGlmaWNhdGlvbnMnXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgICAgIGN0cmwubm90aWZpY2F0aW9ucyA9IGRhdGEubWFwKGZ1bmN0aW9uIChpdGVtKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gTm90aWZpY2F0aW9uLmZyb21PYmooaXRlbSk7XG4gICAgICAgICAgICB9KSB8fCBbXTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xufTtcblxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmRlbGV0ZU5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbn07XG5cbi8qKlxuICogVklFV0VSXG4gKiAqL1xuZnVuY3Rpb24gTm90aWZpY2F0aW9uc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNWaWV3O1xuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLnJlbmRlcigpO1xufTtcblxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAgICAgXG4gICAgcGFnZUVsZW0ub24oJ2Nsb3NlLmJzLmFsZXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy9kZWxldGUgbm90aWZpY2F0aW9uIG9uIHRoZSBzZXJ2ZXJcbiAgICAgICAgcGFnZS5jdHJsLmRlbGV0ZU5vdGlmaWNhdGlvbigkKHRoaXMpLmF0dHIoJ2RhdGEtbm90aWZpY2F0aW9uLWlkJykpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2UuY3RybC5nZXROb3RpZmljYXRpb25zKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgcGFnZS52aWV3LnJlbmRlcigpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIG5vdGlmaWNhdGlvbkVsZW0gPSAkKCcjbm90aWZpY2F0aW9uc1BhZ2UnKS5maW5kKCcubm90aWZpY2F0aW9ucycpLmVtcHR5KCk7XG4gICAgdGhpcy5wYWdlLmN0cmwubm90aWZpY2F0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChub3RpZmljYXRpb24pe1xuICAgICAgICB2YXIgYWxlcnRUeXBlO1xuICAgICAgICBzd2l0Y2gobm90aWZpY2F0aW9uLnR5cGUpe1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5TVUNDRVNTOlxuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5GUklFTkRfQUNDRVBURUQ6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLldBUk5JTkc6XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLlJFTU9WRURfRlJPTV9CQU5EOlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC13YXJuaW5nJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb24uVFlQRS5FUlJPUjpcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtZGFuZ2VyJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtaW5mbyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBub3RpZmljYXRpb25FbGVtLmFwcGVuZCgnJytcbiAgICAgICAgJzxhIGhyZWY9XCInK25vdGlmaWNhdGlvbi5saW5rKydcIiBjbGFzcz1cIm5vdGlmaWNhdGlvbiBhbGVydCBhbGVydC1kaXNtaXNzYWJsZSAnK2FsZXJ0VHlwZSsnXCIgZGF0YS1ub3RpZmljYXRpb24taWQ9XCInK25vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25JZCsnXCI+JytcbiAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nK1xuICAgICAgICAgICAgICAgICc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPicrXG4gICAgICAgICAgICAnPC9idXR0b24+JytcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5tZXNzYWdlK1xuICAgICAgICAnPC9hPicpO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG5cbi8qKlxuICogUEFHRVxuICogKi9cbmZ1bmN0aW9uIFJlZ2lzdGVyUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNyZWdpc3RlclBhZ2UnKVswXSwgUmVnaXN0ZXJDdHJsLCBSZWdpc3RlclZpZXcpO1xufVxuUmVnaXN0ZXJQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuUmVnaXN0ZXJQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gUmVnaXN0ZXJDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5yZWdpc3RlcmluZyA9IGZhbHNlO1xufVxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckN0cmw7XG5cblJlZ2lzdGVyQ3RybC5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvcmVnaXN0ZXInLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLyoqXG4gKiBWSUVXRVJcbiAqICovXG5mdW5jdGlvbiBSZWdpc3RlclZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cblJlZ2lzdGVyVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJWaWV3O1xuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICAgICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAgICAgXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL3Nob3cgc3Bpbm5lclxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyksXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKTtcbiAgICAgICAgXG4gICAgICAgIC8vY2xvc2UgYW55IGV4aXN0aW5nIGFsZXJ0c1xuICAgICAgICBmb3JtLmZpbmQoJy5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xuICAgICAgICBcbiAgICAgICAgLy9zaG93IHRoZSBsb2dpbiB0aGlua2luZyBzcGlubmVyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xuICAgICAgICBcbiAgICAgICAgLy9hY3R1YWxseSB0cnkgdG8gbG9naW5cbiAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyKHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnJlbW92ZUNsYXNzKCdidG4tcHJpbWFyeScpLmFkZENsYXNzKCdidG4tc3VjY2VzcycpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLWNoZWNrJyk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgcmVnaXN0ZXIgZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+UmVnaXN0cmF0aW9uIFN1Y2Nlc3NmdWwhPC9zdHJvbmc+IFJlZGlyZWN0aW5nIGluIDIgc2Vjb25kcy4uLidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkxvZ2luIEZhaWxlZCE8L3N0cm9uZz4gVXNlcm5hbWUgb3IgcGFzc3dvcmQgd2FzIGluY29ycmVjdC4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsICQgKi9cblxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNyZWdpc3RlckJhbmRQYWdlJylbMF0sIFJlZ2lzdGVyQmFuZEN0cmwsIFJlZ2lzdGVyQmFuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblJlZ2lzdGVyQmFuZFBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5SZWdpc3RlckJhbmRQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZFBhZ2U7XG5cbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZEN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG59XG5SZWdpc3RlckJhbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kQ3RybDtcblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlLmxvZ2luID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL3JlZ2lzdGVyJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIFJlZ2lzdGVyQmFuZFZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cblJlZ2lzdGVyQmFuZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRWaWV3O1xuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlLFxuICAgICAgICBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggcGFnZS5jdHJsLnJlZ2lzdGVyaW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwubG9naW4odGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcyc7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS10aW1lcycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnTG9naW4nKS5hZGRDbGFzcygnYnRuLXByaW1hcnknKS5yZW1vdmVDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgICAgIHBhZ2UuY3RybC5yZWdpc3RlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5CYW5kIFJlZ2lzdHJhdGlvbiBGYWlsZWQhPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG52YXIgc2VhcmNoaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIFNlYXJjaEJhbmRzUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNzZWFyY2hCYW5kc1BhZ2UnKVswXSwgU2VhcmNoQmFuZHNDdHJsLCBTZWFyY2hCYW5kc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblNlYXJjaEJhbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblNlYXJjaEJhbmRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc1BhZ2U7XG5cbmZ1bmN0aW9uIFNlYXJjaEJhbmRzQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYmFuZHMgPSBbXTtcbiAgICB0aGlzLnNlYXJjaGluZyA9IGZhbHNlO1xufVxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc0N0cmw7XG5cblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdGhhdC5iYW5kcyA9IFtdO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvc2VhcmNoJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiAkKGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xuICAgICAgICB0aGF0LnBhZ2Uudmlldy51cGRhdGVCYW5kTGlzdCgpO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgcmVsYXRpb24gdGhlIGFwcGxpY2F0aW9uIGZvciB0aGUgY3VycmVudCB1c2VyIGFuZCB0aGUgc2VsZWN0ZWQgYmFuZFxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5zdWJtaXRBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChiYW5kSWQsIGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgL2FwaS9iYW5kcy8ke2JhbmRJZH0vc3VibWl0QXBwbGljYXRpb25gLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBhbGVydChcIlN1Y2Nlc3MhXCIpOyBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XG4gICAgICAgIH1cbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBhbGVydChcIkVycm9yIVwiKTsgXG4gICAgICAgIGRlZmVyLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vLyBUaGlzIG1ldGhvZCB3aWxsIGRlbGV0ZSB0aGUgYXBwbGljYXRpb24gZm9yIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoaXMgYmFuZFxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jYW5jZWxBcHBsaWNhdGlvbiA9IGZ1bmN0aW9uIChiYW5kSWQpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzL2NhbmNlbEFwcGxpY2F0aW9uJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7YmFuZElkIDogYmFuZElkfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cblNlYXJjaEJhbmRzQ3RybC5wcm90b3R5cGUuZXhwYW5kQmFuZE1vZGFsID0gZnVuY3Rpb24oYXBwbGljYXRpb25UeXBlLCBhcHBsaWNhdGlvblN0YXR1cywgYmFuZElkKSB7XG4gICAgJCgnLm1vZGFsLWJvZHknKS5yZW1vdmUoKTtcbiAgICAkKCcubW9kYWwtZm9vdGVyJykucmVtb3ZlKCk7ICAgIFxuXG4gICAgdmFyIGJhbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5tb2RhbC1jb250ZW50Jyk7XG4gICAgdmFyIGJhbmROYW1lID0gYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwoKTtcbiAgICB2YXIgaW5zdHJ1bWVudEZpZWxkID0gJyc7XG5cbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbChiYW5kTmFtZSsnPGJyLz4nK2FwcGxpY2F0aW9uVHlwZSsnIEFwcGxpY2F0aW9uJyk7XG5cbiAgICBpZiAoYXBwbGljYXRpb25UeXBlID09PSAnTWVtYmVyJykge1xuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHBsYWNlaG9sZGVyPVwiSW5zdHJ1bWVudFwiIC8+PHAvPic7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpbnN0cnVtZW50RmllbGQgPSAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaW5zdHJ1bWVudFwiIHZhbHVlPVwiTi9BXCIvPjxwLz4nOyAgXG4gICAgfVxuXG4gICAgYmFuZE1vZGFsLmFwcGVuZCgnJytcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj4nK1xuICAgICAgICAnPGZvcm0gaWQ9XCJhcHBseS1mb3JtXCIgY2xhc3M9XCJhcHBseS1mb3JtXCIgb25zdWJtaXQ9XCJyZXR1cm5cIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+JytcbiAgICAgICAgICAgICAgICBpbnN0cnVtZW50RmllbGQrXG4gICAgICAgICAgICAgICAgJzxpbnB1dCByZXF1aXJlZCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm1lc3NhZ2VcIiBwbGFjZWhvbGRlcj1cIk1lc3NhZ2VcIiAvPicrXG4gICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImJhbmRJZFwiIHZhbHVlPVwiJytiYW5kSWQrJ1wiIC8+JytcbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYXBwbGljYXRpb25TdGF0dXNcIiB2YWx1ZT1cIicrYXBwbGljYXRpb25TdGF0dXMrJ1wiIC8+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9mb3JtPicrXG4gICAgJzwvZGl2PicrXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj4nKyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cInN1Ym1pdFwiIGZvcm09XCJhcHBseS1mb3JtXCI+JytcbiAgICAgICAgICAgICAgICAnU3VibWl0JytcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicrXG4gICAgICAgICc8L2Rpdj4nKyAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgJzwvZGl2PicpO1xufTtcblxuZnVuY3Rpb24gU2VhcmNoQmFuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gdW5kZWZpbmVkO1xufVxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZWFyY2hCYW5kc1ZpZXc7XG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgXG4gICAgLy8gVGhpcyB3aWxsIHJ1biBhIHNlYXJjaCBldmVyeSBzZWNvbmQgd2hlbiB0aGUgdXNlciBwcmVzc2VzIGEga2V5LiBcbiAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCAnLnNlYXJjaC1mb3JtIGlucHV0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC1mb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICBcbiAgICAgICAgcGFnZS5jdHJsLnNlYXJjaCh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KXsgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uYXBwbHktZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgICBcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTsgICBcbiAgICAgICAgcGFnZS5jdHJsLnN1Ym1pdEFwcGxpY2F0aW9uKHBhcnNlSW50KCQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1iYW5kLWlkJyksIDEwKSwgdGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy9oYW5kbGUgdGhlIGFwcGxpY2F0aW9uIHJlc3VsdFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbiAgICAvLyBUb2dnbGUgQmFuZCBNb2RhbFxuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYmFuZCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZS52aWV3LnNob3dCYW5kTW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIG1hbmFnZXIgYXBwbGljYXRpb24gcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlNYW5hZ2VyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdNYW5hZ2VyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUiwgYmFuZElkKTtcbiAgICB9KVxuXG4gICAgLy8gSGFuZGxlIG1lbWJlciBhcHBsaWNhdGlvbiByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseU1lbWJlcicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnTWVtYmVyJywgQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUVNQkVSLCBiYW5kSWQpO1xuICAgIH0pXG5cbiAgICAvLyBIYW5kbGUgcHJvbW90ZXIgYXBwbGljYXRpb24gcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQXBwbHlQcm9tb3RlcicsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmV4cGFuZEJhbmRNb2RhbCgnUHJvbW90ZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9QUk9NT1RFUiwgYmFuZElkKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBhcHBsaWNhdGlvbiBjYW5jZWwgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcjYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBiYW5kSWQgPSBwYXJzZUludCgkKHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwxMClcbiAgICAgICAgcGFnZS5jdHJsLmNhbmNlbEFwcGxpY2F0aW9uKGJhbmRJZClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7ICAgIFxuICAgICAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRmFpbHVyZSFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLypwYWdlRWxlbS5vbignaGlkZGVuLmJzLm1vZGFsJywgJyNtb2RhbDcnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHRoaXMudXBkYXRlQmFuZExpc3Q7XG4gICAgfSk7Ki9cbn07XG5cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUudXBkYXRlQmFuZExpc3QgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgYmFuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmRzJyk7XG4gICAgdmFyIGNhcmRDb2xvciA9ICcnO1xuICAgIHZhciBiYWRnZSA9ICcnO1xuXG4gICAgLy8gQ2xlYXIgYW55IGN1cnJlbnQgY2FyZHMgZnJvbSBwcmV2aW91cyBzZWFyY2hcbiAgICAkKCcuY2FyZCcpLnJlbW92ZSgpO1xuXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmJhbmRzLmxlbmd0aDsgaSsrICl7XG5cbiAgICAgICAgLy8gSWYgeW91IGhhdmUgYSByb2xlIHRoZW4geW91IGFyZSBpbiB0aGUgYmFuZCwgc28gbm8gbW9kYWwgYnV0dG9uc1xuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ucm9sZSAhPSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0ucm9sZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gYXBwbGljYXRpb24gc3RhdHVzIGlmIHRoZXkgZG8gbm90IGhhdmUgYSByb2xlIGluIHRoZSBiYW5kXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWFuYWdlciknKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtZW1iZXIpJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAocHJvbW90ZXIpJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ3JlamVjdGVkJykgeyBcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXByaW1hcnknO1xuICAgICAgICAgICAgYmFkZ2UgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjYXJkIGZvciBlYWNoIGJhbmRcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnJytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtYmFuZC1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uaWQrJ1wiID4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrOyB3aWR0aDogMTByZW07XCI+PC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICc8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uZ2VucmUrJyk8L3NtYWxsPicrYmFkZ2UrXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+PHAvPicpO1xuICAgIH1cbn07XG5cblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuc2hvd0JhbmRNb2RhbCA9IGZ1bmN0aW9uIChiYW5kSWQpe1xuICAgIHZhciB0aGlzQmFuZCA9IHRoaXMucGFnZS5jdHJsLmJhbmRzLmZpbHRlcihmdW5jdGlvbiAoYmFuZCl7XG4gICAgICAgIHJldHVybiBiYW5kLmlkID09IGJhbmRJZDtcbiAgICB9KVswXSxcbiAgICAgICAgbW9kYWxCdXR0b25zO1xuICAgIFxuICAgIGlmICh0aGlzQmFuZC5yb2xlICE9ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnJztcbiAgICB9XG4gICAgLy8gRGV0ZXJtaW5lIGhvdyB0byBzdHlsZSBlYWNoIGNhcmQgYW5kIG1vZGFsIGJhc2VkIG9uIGFwcGxpY2F0aW9uIHN0YXR1cyBpZiB0aGV5IGRvIG5vdCBoYXZlIGEgcm9sZSBpbiB0aGUgYmFuZFxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWFuYWdlciknKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIE1hbmFnZXIgQXBwbGljYXRpb248L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzQmFuZC5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1lbWJlciknKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIE1lbWJlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAocHJvbW90ZXIpJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkNhbmNlbEFwcGxpY2F0aW9uTW9kYWxcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBQcm9tb3RlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzICE9PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5BcHBseU1hbmFnZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWFuYWdlcjwvYnV0dG9uPicrIFxuICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5TWVtYmVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIE1lbWJlcjwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlQcm9tb3RlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBQcm9tb3RlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIFxuICAgIHZhciBiYW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZC1tb2RhbCcpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnLHRoaXNCYW5kLmlkKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQmFuZC5iYW5kTmFtZSk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgnPHA+Jyt0aGlzQmFuZC5kZXNjcmlwdGlvbisnPC9wPicpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtZm9vdGVyJykuaHRtbCgnPGRpdiBjbGFzcz1cImR5bmFtaWMtYnV0dG9uc1wiPjwvZGl2PjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPicpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIFNvbmcgKi9cbi8qIGdsb2JhbCBTZXRMaXN0ICovXG5cbmZ1bmN0aW9uIFNldExpc3RzUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNzZXRMaXN0c1BhZ2UnKVswXSwgU2V0TGlzdHNDdHJsLCBTZXRMaXN0c1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblNldExpc3RzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblNldExpc3RzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZXRMaXN0c1BhZ2U7XG5cbmZ1bmN0aW9uIFNldExpc3RzQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuc29uZ3MgPSBbXTtcbiAgICB0aGlzLnNldExpc3RzID0gW107XG4gICAgdGhpcy5iYW5kSWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5yZWR1Y2UoZnVuY3Rpb24gKHZhbCwgY2h1bmssIGluZGV4LCBhcnIpe1xuICAgICAgICByZXR1cm4gdmFsIHx8IChjaHVuayA9PSAnYmFuZHMnID8gYXJyW2luZGV4KzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LCB1bmRlZmluZWQpO1xufVxuU2V0TGlzdHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcblNldExpc3RzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZXRMaXN0c0N0cmw7XG5TZXRMaXN0c0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytjdHJsLmJhbmRJZCsnL3NvbmdzJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKHNvbmdzKXtcbiAgICAgICAgY3RybC5zb25ncyA9IHNvbmdzLm1hcChmdW5jdGlvbiAoc29uZyl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNvbmcoc29uZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy9nZXQgc2V0IGxpc3RzXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2N0cmwuYmFuZElkKycvc2V0bGlzdHMnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uIChzZXRMaXN0cyl7XG4gICAgICAgIGN0cmwuc2V0TGlzdHMgPSBzZXRMaXN0cy5tYXAoZnVuY3Rpb24gKHNldExpc3Qpe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXRMaXN0KHNldExpc3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5TZXRMaXN0c0N0cmwucHJvdG90eXBlLnNhdmVTZXRMaXN0ID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG4gICAgXG4gICAgdmFyIG1vZGlmaWVkRm9ybSA9ICQuY2xvbmUoZm9ybSk7XG4gICAgJChtb2RpZmllZEZvcm0pLmZpbmQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdOm5vdCg6Y2hlY2tlZCknKS5yZW1vdmUoKTtcbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEobW9kaWZpZWRGb3JtKTtcbiAgICBcbiAgICAvL2RldGVybWluZSBpZiB3ZSdyZSBlZGl0aW5nIG9yIGNyZWF0aW5nXG4gICAgdmFyIHVybCwgbWV0aG9kO1xuICAgIGlmKCAkKG1vZGlmaWVkRm9ybSkuZmluZCgnW25hbWU9c2V0LWxpc3QtaWRdJykudmFsKCkgIT09ICcnICl7XG4gICAgICAgIHVybCA9ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9zZXRsaXN0cy8nKyQobW9kaWZpZWRGb3JtKS5maW5kKCdbbmFtZT1zZXQtbGlzdC1pZF0nKS52YWwoKTtcbiAgICAgICAgbWV0aG9kID0gJ1BVVCc7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHVybCA9ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9zZXRsaXN0cyc7XG4gICAgICAgIG1ldGhvZCA9ICdQT1NUJztcbiAgICB9XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHR5cGU6IG1ldGhvZCxcbiAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblNldExpc3RzQ3RybC5wcm90b3R5cGUuZGVsZXRlU2V0TGlzdCA9IGZ1bmN0aW9uIChzZXRMaXN0SWQpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgY3RybCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgL2FwaS9iYW5kcy8ke2N0cmwuYmFuZElkfS9zZXRsaXN0cy8ke3NldExpc3RJZH1gLFxuICAgICAgICB0eXBlOiAnREVMRVRFJ1xuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gU2V0TGlzdHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5zZXRMaXN0U29uZ3MgPSBbXTtcbn1cblNldExpc3RzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5TZXRMaXN0c1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2V0TGlzdHNWaWV3O1xuU2V0TGlzdHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblNldExpc3RzVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHZpZXcgPSB0aGlzO1xuICAgIC8vcmVuZGVyIHRoZSBzb25ncyB0byB0aGUgc29uZyBtb2RhbFxuICAgIHZhciBzZXRMaXN0c0VsZW0gPSAkKHZpZXcucGFnZS5lbGVtKS5maW5kKCcuc2V0LWxpc3RzJyk7XG4gICAgc2V0TGlzdHNFbGVtLmVtcHR5KCk7XG4gICAgdmlldy5wYWdlLmN0cmwuc2V0TGlzdHMuZm9yRWFjaChmdW5jdGlvbiAoc2V0TGlzdCwgaW5kZXgpe1xuICAgICAgICBzZXRMaXN0c0VsZW0uYXBwZW5kKGBcbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6Ly9cIiBjbGFzcz1cInNldC1saXN0IGxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXCIgZGF0YS1zZXQtbGlzdC1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IHctMTAwIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibWItMVwiPiR7c2V0TGlzdC5uYW1lfTwvaDU+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibWItMVwiPiR7c2V0TGlzdC50b3RhbExlbmd0aCgpfTwvaDU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9hPmApO1xuICAgIH0pO1xufTtcblxuU2V0TGlzdHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHZpZXcgPSB0aGlzO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYWRkLXNldC1saXN0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnNob3dTZXRMaXN0TW9kYWwoKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLm1vZGFsIC5kZWxldGUtc2V0LWxpc3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGlmKCB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIG1vZGFsID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKTtcbiAgICAgICAgbW9kYWwuZmluZCgnLmRlbGV0ZS1zZXQtbGlzdCcpLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2V0TGlzdElkID0gbW9kYWwuZmluZCgnW25hbWU9c2V0LWxpc3QtaWRdJykudmFsKCksXG4gICAgICAgICAgICBkZWxldGVQcm9taXNlO1xuICAgICAgICBcbiAgICAgICAgLy9qdXN0IGNsb3NlIHRoZSBtb2RhbCBpZiB3ZSBkb24ndCBoYXZlIGFuIGlkXG4gICAgICAgIGlmKCBzZXRMaXN0SWQgPT09ICcnICl7XG4gICAgICAgICAgICBkZWxldGVQcm9taXNlID0gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZVByb21pc2UgPSB2aWV3LnBhZ2UuY3RybC5kZWxldGVTZXRMaXN0KHNldExpc3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRlbGV0ZVByb21pc2UudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNldExpc3RJbmRleCA9IHZpZXcucGFnZS5jdHJsLnNldExpc3RzLnJlZHVjZShmdW5jdGlvbiAodmFsLCBzZXRMaXN0LCBpbmRleCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID8gdmFsIDogKHNldExpc3QuaWQgPT0gc2V0TGlzdElkID8gaW5kZXggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggc2V0TGlzdEluZGV4ICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zZXRMaXN0cy5zcGxpY2Uoc2V0TGlzdEluZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgbW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5kZWxldGUtc2V0LWxpc3QnKS5odG1sKCdEZWxldGUgU2V0IExpc3QnKTtcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5hbGVydCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBtb2RhbC5maW5kKCdmb3JtJykucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+VW5hYmxlIHRvIGRlbGV0ZSBzZXQgbGlzdCE8L3N0cm9uZz4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtb2RhbC5maW5kKCcuZGVsZXRlLXNldC1saXN0JykuaHRtbCgnRGVsZXRlIFNldCBMaXN0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcubW9kYWwgLnNhdmUtc2V0LWxpc3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICQodGhpcykucGFyZW50cygnLm1vZGFsJykuZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xuICAgIH0pO1xuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnLm1vZGFsIGZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHZpZXcucGFnZS5jdHJsLnNhdmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyk7XG4gICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykuZmluZCgnLnNhdmUtc2V0LWxpc3QnKS5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xuICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZlU2V0TGlzdCh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAobmV3U2V0TGlzdCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzZXRMaXN0SW5kZXggPSB2aWV3LnBhZ2UuY3RybC5zZXRMaXN0cy5yZWR1Y2UoZnVuY3Rpb24gKHZhbCwgc2V0TGlzdCwgaW5kZXgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/IHZhbCA6IChzZXRMaXN0LmlkID09IG5ld1NldExpc3QuaWQgPyBpbmRleCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9LHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCBzZXRMaXN0SW5kZXggIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNldExpc3RzW3NldExpc3RJbmRleF0gPSBuZXcgU2V0TGlzdChuZXdTZXRMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2V0TGlzdHMucHVzaChuZXcgU2V0TGlzdChuZXdTZXRMaXN0KSk7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2V0TGlzdHMgPSB2aWV3LnBhZ2UuY3RybC5zZXRMaXN0cy5zb3J0KGZ1bmN0aW9uIChhLGIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5uYW1lIDwgYi5uYW1lID8gLTEgOiAoYS5uYW1lID4gYi5uYW1lID8gMSA6IDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykuZmluZCgnLnNhdmUtc2V0LWxpc3QnKS5odG1sKCdTYXZlIFNldCBMaXN0Jyk7XG4gICAgICAgICAgICBmb3JtLnBhcmVudHMoJy5tb2RhbCcpLmZpbmQoJy5hbGVydCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlVuYWJsZSB0byBzYXZlIHNldCBsaXN0ITwvc3Ryb25nPidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykuZmluZCgnLnNhdmUtc2V0LWxpc3QnKS5odG1sKCdTYXZlIFNldCBMaXN0Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuc2V0LWxpc3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcuc2hvd1NldExpc3RNb2RhbCh2aWV3LnBhZ2UuY3RybC5zZXRMaXN0c1skKHRoaXMpLmF0dHIoJ2RhdGEtc2V0LWxpc3QtaW5kZXgnKV0pO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdrZXl1cCcsICcuc2VhcmNoJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgc2VhcmNoID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXRMaXN0RWxlbXMgPSBwYWdlRWxlbS5maW5kKCcuc29uZycpO1xuICAgICAgICB2aWV3LnBhZ2UuY3RybC5zZXRMaXN0cy5mb3JFYWNoKGZ1bmN0aW9uIChzZXRMaXN0LCBpbmRleCl7XG4gICAgICAgICAgICBpZiggc2V0TGlzdC5uYW1lLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTEgKXtcbiAgICAgICAgICAgICAgICAkKHNldExpc3RFbGVtc1tpbmRleF0pLnJlbW92ZUNsYXNzKCdzZWFyY2gtaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICQoc2V0TGlzdEVsZW1zW2luZGV4XSkuYWRkQ2xhc3MoJ3NlYXJjaC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2tleXVwJywgJy5tb2RhbCAuc29uZy1zZWFyY2gnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGlmKCB2aWV3LnNlYXJjaGluZ1NvbmdzICl7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICB2YXIgc2VhcmNoVmFsID0gJCh0aGlzKS52YWwoKSxcbiAgICAgICAgICAgIHNvbmdzRWxlbSA9ICQodGhpcykuc2libGluZ3MoJy5zb25ncycpLmRldGFjaCgpLFxuICAgICAgICAgICAgYWxsU29uZ3NFbGVtcyA9IHNvbmdzRWxlbS5maW5kKCcuc29uZy1jaGVjay1sYWJlbCcpO1xuICAgICAgICBcbiAgICAgICAgdmlldy5wYWdlLmN0cmwuc29uZ3MuZm9yRWFjaChmdW5jdGlvbiAoc29uZywgaW5kZXgpe1xuICAgICAgICAgICAgdmFyIHRoaXNTb25nID0gJChhbGxTb25nc0VsZW1zW2luZGV4XSk7XG4gICAgICAgICAgICBpZiggc29uZy5uYW1lLmluZGV4T2Yoc2VhcmNoVmFsKSAhPT0gLTEgKXtcbiAgICAgICAgICAgICAgICB0aGlzU29uZy5yZW1vdmVDbGFzcygnc2VhcmNoLWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzU29uZy5hZGRDbGFzcygnc2VhcmNoLWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICQodGhpcykuYWZ0ZXIoc29uZ3NFbGVtKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2hhbmdlJywgJy5tb2RhbCAuc29uZy1jaGVjay1sYWJlbCBpbnB1dCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmFyIHNvbmdFbGVtID0gJCh0aGlzKS5wYXJlbnRzKCcuc29uZy1jaGVjay1sYWJlbCcpLFxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gc29uZ0VsZW0uYXR0cignZGF0YS1pbmRleCcpLFxuICAgICAgICAgICAgaXNDaGVja2VkID0gdGhpcy5jaGVja2VkLFxuICAgICAgICAgICAgbmV3SW5kZXg7XG4gICAgICAgIFxuICAgICAgICAvL3VwZGF0ZSB0aGUgc29uZydzIGNoZWNrZWQgc3RhdHVzXG4gICAgICAgIHZpZXcuc2V0TGlzdFNvbmdzW2N1cnJlbnRJbmRleF0uY2hlY2tlZCA9IGlzQ2hlY2tlZDtcbiAgICAgICAgXG4gICAgICAgIHZhciBtb3ZlZFNvbmcgPSB2aWV3LnNldExpc3RTb25ncy5zcGxpY2UoY3VycmVudEluZGV4LDEpWzBdO1xuICAgICAgICBpZiggaXNDaGVja2VkICl7XG4gICAgICAgICAgICAvL2l0ZW0gYmVjYW1lIGNoZWNrZWRcbiAgICAgICAgICAgIGZvciggdmFyIGk9MDsgaTx2aWV3LnNldExpc3RTb25ncy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAgICAgICAgIGlmKCB2aWV3LnNldExpc3RTb25nc1tpXS5uYW1lLnRvTG93ZXJDYXNlKCkgPiBtb3ZlZFNvbmcubmFtZS50b0xvd2VyQ2FzZSgpIHx8ICF2aWV3LnNldExpc3RTb25nc1tpXS5jaGVja2VkICl7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0TGlzdFNvbmdzLnNwbGljZShpLDAsbW92ZWRTb25nKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL25vdyBtb3ZlIHRoZSBhY3R1YWwgZWxlbWVudCBhbmQgZml4IHRoZSBlbGVtZW50IG51bWJlcnNcbiAgICAgICAgICAgIHZhciBleGlzdGluZ0VsZW0gPSBzb25nRWxlbS5zaWJsaW5ncygnW2RhdGEtaW5kZXg9JytuZXdJbmRleCsnXScpO1xuICAgICAgICAgICAgZXhpc3RpbmdFbGVtLmJlZm9yZShzb25nRWxlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vaXRlbSBiZWNhbWUgdW5jaGVja2VkXG4gICAgICAgICAgICBmb3IoIHZhciBpPTA7IGk8dmlldy5zZXRMaXN0U29uZ3MubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgICAgICAgICBpZiggIXZpZXcuc2V0TGlzdFNvbmdzW2ldLmNoZWNrZWQgJiYgdmlldy5zZXRMaXN0U29uZ3NbaV0ubmFtZS50b0xvd2VyQ2FzZSgpID4gbW92ZWRTb25nLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldExpc3RTb25ncy5zcGxpY2UoaSwwLG1vdmVkU29uZyk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIG5ld0luZGV4ID09PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMgc29ydHMgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gdmlldy5zZXRMaXN0U29uZ3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZpZXcuc2V0TGlzdFNvbmdzLnB1c2gobW92ZWRTb25nKTtcbiAgICAgICAgICAgICAgICAvL25vdyBtb3ZlIHRoZSBhY3R1YWwgZWxlbWVudCBhbmQgZml4IHRoZSBlbGVtZW50IG51bWJlcnNcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdFbGVtID0gc29uZ0VsZW0uc2libGluZ3MoJ1tkYXRhLWluZGV4PScrKG5ld0luZGV4KSsnXScpO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nRWxlbS5hZnRlcihzb25nRWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8vbm93IG1vdmUgdGhlIGFjdHVhbCBlbGVtZW50IGFuZCBmaXggdGhlIGVsZW1lbnQgbnVtYmVyc1xuICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ0VsZW0gPSBzb25nRWxlbS5zaWJsaW5ncygnW2RhdGEtaW5kZXg9JysobmV3SW5kZXgrMSkrJ10nKTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0VsZW0uYmVmb3JlKHNvbmdFbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYWxsU29uZ0VsZW1zID0gc29uZ0VsZW0ucGFyZW50KCkuZmluZCgnLnNvbmctY2hlY2stbGFiZWwnKTtcbiAgICAgICAgaWYoIG5ld0luZGV4ID4gY3VycmVudEluZGV4ICl7XG4gICAgICAgICAgICBmb3IoIHZhciBpPWN1cnJlbnRJbmRleDsgaTw9bmV3SW5kZXg7IGkrKyApe1xuICAgICAgICAgICAgICAgICQoYWxsU29uZ0VsZW1zW2ldKS5hdHRyKCdkYXRhLWluZGV4JyxpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKCB2YXIgaT1uZXdJbmRleDsgaTw9Y3VycmVudEluZGV4OyBpKysgKXtcbiAgICAgICAgICAgICAgICAkKGFsbFNvbmdFbGVtc1tpXSkuYXR0cignZGF0YS1pbmRleCcsaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblNldExpc3RzVmlldy5wcm90b3R5cGUuc2hvd1NldExpc3RNb2RhbCA9IGZ1bmN0aW9uIChzZXRMaXN0KXtcbiAgICB2YXIgdmlldyA9IHRoaXMsXG4gICAgICAgIHNldExpc3RNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5zZXQtbGlzdC1tb2RhbCcpO1xuICAgIFxuICAgIC8vcmVvcmRlciB0aGUgc29uZ3MgYWNjb3JkaW5nIHRvIHRoZSBuZXcgc2V0bGlzdCBvcmRlclxuICAgIGlmKCBzZXRMaXN0ICl7XG4gICAgICAgIHNldExpc3RNb2RhbC5maW5kKCdbbmFtZT1zZXQtbGlzdC1pZF0nKS52YWwoc2V0TGlzdC5pZCk7XG4gICAgICAgIHNldExpc3RNb2RhbC5maW5kKCdbbmFtZT1uYW1lXScpLnZhbChzZXRMaXN0Lm5hbWUpO1xuICAgICAgICBzZXRMaXN0TW9kYWwuZmluZCgnW25hbWU9ZGVzY3JpcHRpb25dJykudmFsKHNldExpc3QuZGVzY3JpcHRpb24pO1xuICAgICAgICAvL1RPRE86IENoZWNrIGl0ZW1zXG4gICAgICAgIHZhciBjaGVja2VkU29uZ3MgPSBzZXRMaXN0LnNvbmdzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBzb25nKXtcbiAgICAgICAgICAgIG9ialtzb25nLmlkXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIFxuICAgICAgICB2aWV3LnNldExpc3RTb25ncyA9ICQuZXh0ZW5kKFtdLCB2aWV3LnBhZ2UuY3RybC5zb25ncykubWFwKGZ1bmN0aW9uIChzb25nKXtcbiAgICAgICAgICAgIGlmKCBjaGVja2VkU29uZ3Nbc29uZy5pZF0gKXtcbiAgICAgICAgICAgICAgICBzb25nLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNvbmc7XG4gICAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsYil7XG4gICAgICAgICAgICBpZiggYS5jaGVja2VkICYmICFiLmNoZWNrZWQgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBiLmNoZWNrZWQgJiYgIWEuY2hlY2tlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpZiggYS5uYW1lLnRvTG93ZXJDYXNlKCkgPCBiLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIGEubmFtZS50b0xvd2VyQ2FzZSgpID4gYi5uYW1lLnRvTG93ZXJDYXNlKCkgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHNldExpc3RNb2RhbC5maW5kKCdbbmFtZT1zZXQtbGlzdC1pZF0nKS52YWwoJycpO1xuICAgICAgICBzZXRMaXN0TW9kYWwuZmluZCgnW25hbWU9bmFtZV0nKS52YWwoJycpO1xuICAgICAgICBzZXRMaXN0TW9kYWwuZmluZCgnW25hbWU9ZGVzY3JpcHRpb25dJykudmFsKCcnKTtcbiAgICAgICAgdmlldy5zZXRMaXN0U29uZ3MgPSAkLmV4dGVuZChbXSwgdmlldy5wYWdlLmN0cmwuc29uZ3MpLnNvcnQoZnVuY3Rpb24gKGEsYil7XG4gICAgICAgICAgICBpZiggYS5jaGVja2VkICYmICFiLmNoZWNrZWQgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBiLmNoZWNrZWQgJiYgIWEuY2hlY2tlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpZiggYS5uYW1lLnRvTG93ZXJDYXNlKCkgPCBiLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIGEubmFtZS50b0xvd2VyQ2FzZSgpID4gYi5uYW1lLnRvTG93ZXJDYXNlKCkgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBzb25nc0VsZW0gPSBzZXRMaXN0TW9kYWwuZmluZCgnLnNvbmdzJykuZGV0YWNoKCkuZW1wdHkoKTtcbiAgICB2aWV3LnNldExpc3RTb25ncy5mb3JFYWNoKGZ1bmN0aW9uIChzb25nLCBpbmRleCl7XG4gICAgICAgIHNvbmdzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsIHNvbmctY2hlY2stbGFiZWxcIiBkYXRhLWluZGV4PVwiJytpbmRleCsnXCI+JytcbiAgICAgICAgICAgICc8aW5wdXQgbmFtZT1cInNvbmctJytzb25nLmlkKydcIiBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiIHRhYmluZGV4PVwiLTFcIiAnKyhzb25nLmNoZWNrZWQ/J2NoZWNrZWQnOicnKSsnPicrXG4gICAgICAgICAgICBzb25nLm5hbWUrXG4gICAgICAgICc8L2xhYmVsPicpO1xuICAgIH0pO1xuICAgIHNldExpc3RNb2RhbC5maW5kKCcuc29uZ3MtcGFyZW50JykuYXBwZW5kKHNvbmdzRWxlbSk7XG4gICAgXG4gICAgc2V0TGlzdE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgU29uZyAqL1xuXG5mdW5jdGlvbiBTb25nc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjc29uZ3NQYWdlJylbMF0sIFNvbmdzQ3RybCwgU29uZ3NWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5Tb25nc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5Tb25nc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU29uZ3NQYWdlO1xuXG5mdW5jdGlvbiBTb25nc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnNhdmluZyA9IGZhbHNlO1xuICAgIHRoaXMuYmFuZElkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykucmVkdWNlKGZ1bmN0aW9uICh2YWwsIGNodW5rLCBpbmRleCwgYXJyKXtcbiAgICAgICAgcmV0dXJuIHZhbCB8fCAoY2h1bmsgPT0gJ2JhbmRzJyA/IGFycltpbmRleCsxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSwgdW5kZWZpbmVkKTtcbn1cblNvbmdzQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5Tb25nc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU29uZ3NDdHJsO1xuU29uZ3NDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICBjdHJsID0gdGhpcztcbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvYXBpL2JhbmRzLyR7Y3RybC5iYW5kSWR9L3NvbmdzYCxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKHNvbmdzKXtcbiAgICAgICAgY3RybC5zb25ncyA9IHNvbmdzLm1hcChmdW5jdGlvbiAoc29uZyl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNvbmcoc29uZyk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuU29uZ3NDdHJsLnByb3RvdHlwZS5zYXZlU29uZyA9IGZ1bmN0aW9uKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgIFxuICAgIC8vZGV0ZXJtaW5lIGlmIHdlJ3JlIGVkaXRpbmcgb3IgY3JlYXRpbmdcbiAgICB2YXIgdXJsLCBtZXRob2Q7XG4gICAgaWYoICQoZm9ybSkuZmluZCgnW25hbWU9c29uZy1pZF0nKS52YWwoKSAhPT0gJycgKXtcbiAgICAgICAgdXJsID0gYC9hcGkvYmFuZHMvJHtjdHJsLmJhbmRJZH0vc29uZ3MvJHskKGZvcm0pLmZpbmQoJ1tuYW1lPXNvbmctaWRdJykudmFsKCl9YDtcbiAgICAgICAgbWV0aG9kID0gJ1BVVCc7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHVybCA9IGAvYXBpL2JhbmRzLyR7Y3RybC5iYW5kSWR9L3NvbmdzYDtcbiAgICAgICAgbWV0aG9kID0gJ1BPU1QnO1xuICAgIH1cbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgdHlwZTogbWV0aG9kLFxuICAgICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5Tb25nc0N0cmwucHJvdG90eXBlLmRlbGV0ZVNvbmcgPSBmdW5jdGlvbiAoc29uZ0lkKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC9hcGkvYmFuZHMvJHtjdHJsLmJhbmRJZH0vc29uZ3MvJHtzb25nSWR9YCxcbiAgICAgICAgdHlwZTogJ0RFTEVURSdcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIFNvbmdzVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuU29uZ3NWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblNvbmdzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTb25nc1ZpZXc7XG5Tb25nc1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuU29uZ3NWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgc29uZ3NFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLnNvbmdzLWxpc3QnKTtcbiAgICBzb25nc0VsZW0uZW1wdHkoKTtcbiAgICBcbiAgICB0aGlzLnBhZ2UuY3RybC5zb25ncy5mb3JFYWNoKGZ1bmN0aW9uIChzb25nLCBpbmRleCl7XG4gICAgICAgIHNvbmdzRWxlbS5hcHBlbmQoYFxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDovL1wiIGNsYXNzPVwic29uZyBsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvblwiIGRhdGEtc29uZy1pbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IHctMTAwIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibWItMVwiPiR7c29uZy5uYW1lfTwvaDU+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibWItMVwiPiR7c29uZy5kdXJhdGlvbn08L2g1PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cIm1iLTFcIj5Db21wb3NlcjogJHtzb25nLmNvbXBvc2VyfTwvcD5cbiAgICAgICAgPC9hPmApO1xuICAgIH0pO1xufTtcblNvbmdzVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICB2aWV3ID0gdGhpcztcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1zb25nJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnNob3dTb25nTW9kYWwoKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLm1vZGFsIC5zYXZlLXNvbmcnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICQodGhpcykucGFyZW50cygnLm1vZGFsJykuZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcubW9kYWwgLmRlbGV0ZS1zb25nJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBpZiggdmlldy5wYWdlLmN0cmwuc2F2aW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBtb2RhbCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJyk7XG4gICAgICAgIG1vZGFsLmZpbmQoJy5kZWxldGUtc29uZycpLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgc29uZ0lkID0gbW9kYWwuZmluZCgnW25hbWU9c29uZy1pZF0nKS52YWwoKSxcbiAgICAgICAgICAgIGRlbGV0ZVByb21pc2U7XG4gICAgICAgIFxuICAgICAgICAvL2p1c3QgY2xvc2UgdGhlIG1vZGFsIGlmIHdlIGRvbid0IGhhdmUgYW4gaWRcbiAgICAgICAgaWYoIHNvbmdJZCA9PT0gJycgKXtcbiAgICAgICAgICAgIGRlbGV0ZVByb21pc2UgPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlUHJvbWlzZSA9IHZpZXcucGFnZS5jdHJsLmRlbGV0ZVNvbmcoc29uZ0lkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZGVsZXRlUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdmFyIGF1ZGlvVHJhY2sgPSBtb2RhbC5maW5kKCdhdWRpbycpO1xuICAgICAgICAgICAgaWYoIGF1ZGlvVHJhY2subGVuZ3RoICl7XG4gICAgICAgICAgICAgICAgYXVkaW9UcmFja1swXS5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGF1ZGlvVHJhY2sucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzb25nSW5kZXggPSB2aWV3LnBhZ2UuY3RybC5zb25ncy5yZWR1Y2UoZnVuY3Rpb24gKHZhbCwgc29uZywgaW5kZXgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/IHZhbCA6IChzb25nLmlkID09IHNvbmdJZCA/IGluZGV4IDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0sdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIHNvbmdJbmRleCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc29uZ3Muc3BsaWNlKHNvbmdJbmRleCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICAgICAgICAgIG1vZGFsLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICBtb2RhbC5maW5kKCcuZGVsZXRlLXNvbmcnKS5odG1sKCdEZWxldGUgU29uZycpO1xuICAgICAgICAgICAgbW9kYWwuZmluZCgnLmFsZXJ0JykucmVtb3ZlKCk7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJ2Zvcm0nKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5VbmFibGUgdG8gZGVsZXRlIHNvbmchPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbW9kYWwuZmluZCgnLmRlbGV0ZS1zb25nJykuaHRtbCgnRGVsZXRlIFNvbmcnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICcubW9kYWwgZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggdmlldy5wYWdlLmN0cmwuc2F2aW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCcuc2F2ZS1zb25nJykuaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2ZVNvbmcodGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG5ld1Nvbmcpe1xuICAgICAgICAgICAgdmFyIGF1ZGlvVHJhY2sgPSBmb3JtLmZpbmQoJ2F1ZGlvJyk7XG4gICAgICAgICAgICBpZiggYXVkaW9UcmFjay5sZW5ndGggKXtcbiAgICAgICAgICAgICAgICBhdWRpb1RyYWNrWzBdLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYXVkaW9UcmFjay5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNvbmdJbmRleCA9IHZpZXcucGFnZS5jdHJsLnNvbmdzLnJlZHVjZShmdW5jdGlvbiAodmFsLCBzb25nLCBpbmRleCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID8gdmFsIDogKHNvbmcuaWQgPT0gbmV3U29uZy5pZCA/IGluZGV4IDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0sdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIHNvbmdJbmRleCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc29uZ3Nbc29uZ0luZGV4XSA9IG5ld1Nvbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNvbmdzLnB1c2gobmV3U29uZyk7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc29uZ3MgPSB2aWV3LnBhZ2UuY3RybC5zb25ncy5zb3J0KGZ1bmN0aW9uIChhLGIpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5uYW1lIDwgYi5uYW1lID8gLTEgOiAoYS5uYW1lID4gYi5uYW1lID8gMSA6IDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlldy5yZW5kZXIoKTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykuZmluZCgnLnNhdmUtc29uZycpLmh0bWwoJ1NhdmUgU29uZycpO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCcuYWxlcnQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5VbmFibGUgdG8gc2F2ZSBzb25nITwvc3Ryb25nPidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykuZmluZCgnLnNhdmUtc29uZycpLmh0bWwoJ1NhdmUgU29uZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLnNvbmcnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcuc2hvd1NvbmdNb2RhbCh2aWV3LnBhZ2UuY3RybC5zb25nc1skKHRoaXMpLmF0dHIoJ2RhdGEtc29uZy1pbmRleCcpXSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2hpZGUuYnMubW9kYWwnLCAnLm1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgYXVkaW9UcmFjayA9ICQodGhpcykuZmluZCgnYXVkaW8nKTtcbiAgICAgICAgaWYoIGF1ZGlvVHJhY2subGVuZ3RoICl7XG4gICAgICAgICAgICBhdWRpb1RyYWNrWzBdLnBhdXNlKCk7XG4gICAgICAgICAgICBhdWRpb1RyYWNrLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2tleXVwJywgJy5zZWFyY2gnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZhciBzZWFyY2ggPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHNvbmdFbGVtcyA9IHBhZ2VFbGVtLmZpbmQoJy5zb25nJyk7XG4gICAgICAgIHZpZXcucGFnZS5jdHJsLnNvbmdzLmZvckVhY2goZnVuY3Rpb24gKHNvbmcsIGluZGV4KXtcbiAgICAgICAgICAgIGlmKCBzb25nLm5hbWUuaW5kZXhPZihzZWFyY2gpICE9PSAtMSB8fCBzb25nLmNvbXBvc2VyLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTEgKXtcbiAgICAgICAgICAgICAgICAkKHNvbmdFbGVtc1tpbmRleF0pLnJlbW92ZUNsYXNzKCdzZWFyY2gtaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICQoc29uZ0VsZW1zW2luZGV4XSkuYWRkQ2xhc3MoJ3NlYXJjaC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG5Tb25nc1ZpZXcucHJvdG90eXBlLnNob3dTb25nTW9kYWwgPSBmdW5jdGlvbiAoc29uZyl7XG4gICAgdmFyIHNvbmdNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5zb25nLW1vZGFsJyk7XG4gICAgXG4gICAgaWYoIHNvbmcgKXtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPXNvbmctaWRdJykudmFsKHNvbmcuaWQpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9bmFtZV0nKS52YWwoc29uZy5uYW1lKTtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gc29uZy5kdXJhdGlvbi5zcGxpdCgvOi9nKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWR1cmF0aW9uLWhvdXJzXScpLnZhbChkdXJhdGlvblswXSk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1kdXJhdGlvbi1taW5zXScpLnZhbChkdXJhdGlvblsxXSk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1kdXJhdGlvbi1zZWNzXScpLnZhbChkdXJhdGlvblsyXSk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1seXJpY3NdJykudmFsKHNvbmcubHlyaWNzKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWNvbXBvc2VyXScpLnZhbChzb25nLmNvbXBvc2VyKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWxpbmtdJykudmFsKHNvbmcubGluayk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCcuY3VycmVudC1saW5rIGEnKS5hdHRyKCdocmVmJywgc29uZy5saW5rKS5odG1sKHNvbmcubGluayk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1zb25nLWZpbGVdJykudmFsKCcnKTtcbiAgICAgICAgaWYoIHNvbmcucGF0aCApe1xuICAgICAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPXNvbmctcGF0aF0nKS52YWwoc29uZy5wYXRoKTtcbiAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IHNvbmcucGF0aC5zcGxpdCgvXFwvL2cpLnNsaWNlKC0xKVswXTtcbiAgICAgICAgICAgIHZhciBtaW1lVHlwZTtcbiAgICAgICAgICAgIHN3aXRjaChmaWxlTmFtZS5zcGxpdCgvXFwuL2cpLnNsaWNlKC0xKVswXSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnd2F2JzogbWltZVR5cGUgPSAnYXVkaW8vd2F2JzsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbXAzJzogbWltZVR5cGUgPSAnYXVkaW8vbXAzJzsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2dnJzogbWltZVR5cGUgPSAnYXVkaW8vb2dnJzsgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb25nTW9kYWwuZmluZCgnLmZpbGUtYXVkaW8nKS5maW5kKCdhdWRpbycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgc29uZ01vZGFsLmZpbmQoJy5maWxlLWF1ZGlvJykuYXBwZW5kKGA8YXVkaW8gY29udHJvbHM+PHNvdXJjZSBzcmM9XCIke3NvbmcucGF0aH1cIiB0eXBlPVwiJHttaW1lVHlwZX1cIj48L2F1ZGlvPmApO1xuICAgICAgICAgICAgc29uZ01vZGFsLmZpbmQoJy5jdXJyZW50LWZpbGUgYScpLmF0dHIoXCJocmVmXCIsIHNvbmcucGF0aCkuaHRtbChmaWxlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1zb25nLXBhdGhdJykudmFsKCcnKTtcbiAgICAgICAgICAgIHNvbmdNb2RhbC5maW5kKCcuZmlsZS1hdWRpbycpLmZpbmQoJ2F1ZGlvJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBzb25nTW9kYWwuZmluZCgnLmN1cnJlbnQtZmlsZSBhJykuYXR0cihcImhyZWZcIiwgJ2phdmFzY3JpcHQ6Ly8nKS5odG1sKCdOb25lJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPXNvbmctaWRdJykudmFsKCcnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPW5hbWVdJykudmFsKCcnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWR1cmF0aW9uLWhvdXJzXScpLnZhbCgnMDAnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWR1cmF0aW9uLW1pbnNdJykudmFsKCcwMCcpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9ZHVyYXRpb24tc2Vjc10nKS52YWwoJzAwJyk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1seXJpY3NdJykudmFsKCcnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWNvbXBvc2VyXScpLnZhbCgnJyk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1saW5rXScpLnZhbCgnJyk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCcuY3VycmVudC1saW5rIGEnKS5hdHRyKCdocmVmJywgJ2phdmFzY3JpcHQ6Ly8nKS5odG1sKCdOb25lJyk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1zb25nLWZpbGVdJykudmFsKCcnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPXNvbmctcGF0aF0nKS52YWwoJycpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnLmZpbGUtYXVkaW8nKS5maW5kKCdhdWRpbycpLnJlbW92ZSgpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnLmN1cnJlbnQtZmlsZSBhJykuYXR0cihcImhyZWZcIiwgJ2phdmFzY3JpcHQ6Ly8nKS5odG1sKCdOb25lJyk7XG4gICAgfVxuICAgIFxuICAgIHNvbmdNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTsiXX0=
