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

function Cart(json){
    this.userId = json.userId || 0;
    this.bandId = json.bandId || 0;
    this.itemIds = json.itemIds || [];
    this.inventoryIds = json.inventoryIds || [];
    this.quantities = json.quantities || []
}

if( typeof module !== 'undefined' ){ module.exports = Cart; }
;//bundle semicolon

function Event(data){
    this.id = data.id || data.EventID || undefined;
    this.bandId = data.bandId || data.BandID || undefined;
    this.title = data.title || data.Title || '';
    this.description = data.description || data.Description || '';
    this.eventDate = data.eventDate || data.EventDate || '1900-01-01';
    this.eventDate = this.eventDate.substr(0,10);
    this.eventTime = data.eventTime || data.EventTime || '00:00:00';
    this.loadInTime = data.loadInTime || data.LoadInTime || '00:00:00';
    this.location = data.location || data.Location || '';
    this.venue = data.venue || data.Venue || '';
    this.isShow = data.isShow || data.IsShow || false;
    this.members = data.members || data.Members || [];
}

if( typeof module !== 'undefined' ){ module.exports = Event; }
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
    this.cartQuantity = json.cartQuantity || 0;
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
    this.id = data.id || data.UserID || 0;
    this.username = data.username || data.Username || '';
    this.firstName = data.firstName || data.FirstName || undefined;
    this.lastName = data.lastName || data.LastName || '';
    this.bio = data.bio || data.Bio || '';
    this.email = data.email || data.Email || '';
}

function Member(data){
    User.call(this, data);
    if( data.role !== undefined ){
        this.role = data.role;
    }
    else if( data.Role !== undefined ){
        this.role = data.Role;
    }
    else{
        this.role = Member.ROLE.NONE;
    }
}
Member.prototype = Object.create(User.prototype);
Member.prototype.constructor = Member;

Member.ROLE = {
    NONE: -1,
    OWNER : 0,
    MANAGER: 1,
    MEMBER : 2,
    PROMOTER : 3
};

if( typeof module !== 'undefined' ){ module.exports = {User,Member} }
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

if( typeof module !== 'undefined' ){ var leftPad = require('./leftPad.js'); }

var Time = {
    fromAMPM: function (time){
        var timeSplit = time.split(/:\s/g);
        if( time.toLowerCase().indexOf('am') != -1 ){
            return leftPad(timeSplit[0],2,'0')+':'+leftPad(timeSplit[1],2,'0');
        }
        else if( time.toLowerCase().indexOf('pm') != -1){
            if( parseInt(timeSplit[0],10) == 12 ){
                return leftPad(timeSplit[0],2,'0')+':'+leftPad(timeSplit[1],2,'0');
            }
            else{
                return leftPad(parseInt(timeSplit[0],10)+12,2,'0')+':'+leftPad(timeSplit[1],2,'0');
            }
        }
        else{
            return time.split(/:/g).slice(0,3).map(function (val){
                return leftPad(val,2,'0');
            }).join(':');
        }
    }
};

if( typeof module !== 'undefined' ){ module.exports = Time; }
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
            newPath = newPath.slice(0, newPath.indexOf('bands')+2).join('/');
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
                        '<option value="S">S</option>'+
                        '<option value="M">M</option>'+
                        '<option value="L">L</option>'+
                        '<option value="XL">XL</option>'+
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
   
    pageElem.on('click', '.store', function (e){
        window.location = window.location.pathname+'/store';
    });
  
    pageElem.on('click', '.events', function (e){
        window.location = window.location.pathname+'/events';
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
/* global User */
/* global Event */

function EventsPage(app, data){
    Page.call(this, app, $('#eventsPage')[0], EventsCtrl, EventsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
EventsPage.prototype = Object.create(Page.prototype);
EventsPage.prototype.constructor = EventsPage;

function EventsCtrl(page){
    PageCtrl.call(this, page);
    this.members = [];
    this.events = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
EventsCtrl.prototype = Object.create(PageCtrl.prototype);
EventsCtrl.prototype.constructor = EventsCtrl;
EventsCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/members',
        method: 'GET'
    })
    .then(function (members){
        ctrl.members = members.map(function (user){
            return new User(user);
        });
        
        //get events
        return $.ajax({
            url: '/api/bands/'+ctrl.bandId+'/events',
            method: 'GET'
        });
    })
    .then(function (events){
        ctrl.events = events.map(function (event){
            return new Event(event);
        });
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};
EventsCtrl.prototype.saveEvent = function (form){
    var defer = $.Deferred();
    var ctrl = this;
    
    var modifiedForm = $.clone(form);
    //remove the unchecked members from the form before we serialize
    $(modifiedForm).find('.member-check-label input:not(:checked)').remove();
    //serialize
    var formData = new FormData(modifiedForm);
    
    //determine if we're editing or creating
    var url, method;
    if( $(modifiedForm).find('[name=event-id]').val() !== '' ){
        url = '/api/bands/'+ctrl.bandId+'/events/'+$(modifiedForm).find('[name=event-id]').val();
        method = 'PUT';
    }
    else{
        url = '/api/bands/'+ctrl.bandId+'/events';
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
EventsCtrl.prototype.deleteEvent = function (eventId){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/bands/${ctrl.bandId}/events/'+eventId,
        type: 'DELETE'
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};
EventsCtrl.prototype.notifyMembers = function (form){
    var defer = $.Deferred();
    
    var formData = new FormData(form);
    
    $.ajax({
        url: '/api/bands/'+this.bandId+'/events/'+$(form).find('[name=event-id]').val()+'/notify',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

function EventsView(page){
    PageView.call(this, page);
    this.eventMembers = [];
}
EventsView.prototype = Object.create(PageView.prototype);
EventsView.prototype.constructor = EventsView;
EventsView.prototype.init = function (){
    this.render();
    this.bindEvents();
};

EventsView.prototype.render = function (){
    var view = this;
    //render the songs to the song modal
    var eventsElem = $(view.page.elem).find('.event-list');
    eventsElem.empty();
    view.page.ctrl.events.forEach(function (event, index){
        eventsElem.append(`
        <a href="javascript://" class="event list-group-item list-group-item-action" data-event-index="${index}">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${event.title}</h5>
            </div>
        </a>`);
    });
};

EventsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.add-event', function (e){
        view.showEventModal();
    });
    
    pageElem.on('click', '.event-modal .delete-event', function (e){
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var modal = $(this).parents('.event-modal');
        modal.find('.delete-event').html('<div class="fa fa-spinner animation-spin"></div>');
        
        var eventId = modal.find('[name=event-id]').val(),
            deletePromise;
        
        //just close the modal if we don't have an id
        if( eventId === '' ){
            deletePromise = $.Deferred().resolve().promise();
        }
        else{
            deletePromise = view.page.ctrl.deleteEvent(eventId);
        }
        
        deletePromise.then(function (){
            
            var eventIndex = view.page.ctrl.events.reduce(function (val, event, index){
                return val !== undefined ? val : (event.id == eventId ? index : undefined);
            },undefined);
            
            if( eventIndex !== undefined ){
                view.page.ctrl.events.splice(eventIndex,1);
            }
            
            view.render();
            modal.modal('hide');
            modal.find('.delete-event').html('Delete Event');
            modal.find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            modal.find('form').prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to delete event!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            modal.find('.delete-event').html('Delete Event');
        });
    });
    
    pageElem.on('click', '.event-modal .save-event', function (e){
        $(this).parents('.event-modal').find('form').submit();
    });
    pageElem.on('submit', '.event-modal form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var form = $(this);
        form.parents('.event-modal').find('.save-event').html('<div class="fa fa-spinner animation-spin"></div>');
        view.page.ctrl.saveEvent(this)
        .then(function (newEvent){
            
            var eventIndex = view.page.ctrl.events.reduce(function (val, event, index){
                return val !== undefined ? val : (event.id == newEvent.id ? index : undefined);
            },undefined);
            
            if( eventIndex !== undefined ){
                view.page.ctrl.events[eventIndex] = new Event(newEvent);
            }
            else{
                view.page.ctrl.events.push(new Event(newEvent));
                view.page.ctrl.events = view.page.ctrl.events.sort(function (a,b){
                    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
                });
            }
            view.render();
            form.parents('.event-modal').modal('hide');
            form.parents('.event-modal').find('.save-event').html('Save Event');
            form.parents('.event-modal').find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to save event!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            form.parents('.event-modal').find('.save-event').html('Save Event');
        });
    });
    
    pageElem.on('click', '.event-modal .notify-members', function (e){
        view.showNotifyModal($(this).parents('.modal').find('[name=event-id]').val());
    });
    
    pageElem.on('click', '.notify-modal .send-message', function (e){
        $(this).parents('.notify-modal').find('form').submit();
    });
    pageElem.on('submit', '.notify-modal form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var form = $(this);
        form.parents('.notify-modal').find('.send-message').html('<div class="fa fa-spinner animation-spin"></div>');
        view.page.ctrl.notifyMembers(this)
        .then(function (){
            form.prepend('<div class="alert alert-success alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Message Sent!</strong>'
            +'</div>');
            form.parents('.notify-modal').find('.send-message').html('<div class="fa fa-check"></div>');
            setTimeout(function (){
                form.parents('.notify-modal .modal').modal('hide');
                form.parents('.notify-modal').find('.send-message').html('Send Message');
                form.parents('.notify-modal').find('.alert').remove();
                view.page.ctrl.saving = false;
            }, 2000);
        })
        .catch(function (err){
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to send message!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            form.parents('.notify-modal').find('.send-message').html('Send Message');
        });
    });
    
    pageElem.on('hide.bs.modal', '.notify-modal .modal', function (e){
        pageElem.find('.event-modal .modal').css('display','block');
    });
    
    pageElem.on('click', '.event', function (e){
        view.showEventModal(view.page.ctrl.events[$(this).attr('data-event-index')]);
    });
    
    pageElem.on('keyup', '.search', function (e){
        var search = $(this).val();
        
        var eventElems = pageElem.find('.event');
        view.page.ctrl.events.forEach(function (event, index){
            if( event.title.indexOf(search) !== -1 ){
                $(eventElems[index]).removeClass('search-hidden');
            }
            else{
                $(eventElems[index]).addClass('search-hidden');
            }
        });
    });
    
    pageElem.on('change', '.event-modal .member-check-label input', function (e){
        var memberElem = $(this).parents('.member-check-label'),
            currentIndex = memberElem.attr('data-index'),
            isChecked = this.checked,
            newIndex;
        
        //update the song's checked status
        view.eventMembers[currentIndex].checked = isChecked;
        
        if( view.eventMembers.length > 1 ){
            var movedMember = view.eventMembers.splice(currentIndex,1)[0];
            if( isChecked ){
                //item became checked
                for( var i=0; i<view.eventMembers.length; i++ ){
                    if( view.eventMembers[i].name.toLowerCase() > movedMember.name.toLowerCase() || !view.eventMembers[i].checked ){
                        view.eventMembers.splice(i,0,movedMember);
                        newIndex = i;
                        break;
                    }
                }
                //now move the actual element and fix the element numbers
                var existingElem = memberElem.siblings('[data-index='+newIndex+']');
                existingElem.before(memberElem);
            }
            else{
                //item became unchecked
                for( var i=0; i<view.eventMembers.length; i++ ){
                    if( !view.eventMembers[i].checked && view.eventMembers[i].name.toLowerCase() > movedMember.name.toLowerCase() ){
                        view.eventMembers.splice(i,0,movedMember);
                        newIndex = i;
                        break;
                    }
                }
                if( newIndex === undefined ){
                    //this sorts to the end of the list
                    newIndex = view.eventMembers.length;
                    view.eventMembers.push(movedMember);
                    //now move the actual element and fix the element numbers
                    var existingElem = memberElem.siblings('[data-index='+(newIndex)+']');
                    existingElem.after(memberElem);
                }
                else{
                    //now move the actual element and fix the element numbers
                    var existingElem = memberElem.siblings('[data-index='+(newIndex+1)+']');
                    existingElem.before(memberElem);
                }
            }
            var allMemberElems = memberElem.parent().find('.member-check-label');
            if( newIndex > currentIndex ){
                for( var i=currentIndex; i<=newIndex; i++ ){
                    $(allMemberElems[i]).attr('data-index',i);
                }
            }
            else{
                for( var i=newIndex; i<=currentIndex; i++ ){
                    $(allMemberElems[i]).attr('data-index',i);
                }
            }
        }
    });
    
    pageElem.on('change', '.event-modal [name=is-show]', function (e){
        if( this.checked ){
            $(this).parents('.event-modal').find('.show-dependent').removeClass('hidden');
        }
        else{
            $(this).parents('.event-modal').find('.show-dependent').addClass('hidden');
        }
    });
};

EventsView.prototype.showEventModal = function (event){
    var view = this,
        eventModal = $(this.page.elem).find('.event-modal');
    
    //reorder the songs according to the new setlist order
    if( event ){
        eventModal.find('[name=event-id]').val(event.id);
        eventModal.find('[name=title]').val(event.title);
        eventModal.find('[name=description]').val(event.description);
        eventModal.find('[name=location]').val(event.location);
        eventModal.find('[name=event-date]').val(event.eventDate);
        eventModal.find('[name=event-time]').val(event.eventTime);
        eventModal.find('[name=load-in-time]').val(event.loadInTime);
        eventModal.find('[name=venue]').val(event.venue);
        if( event.isShow ){
            eventModal.find('.show-dependent').removeClass('hidden');
            eventModal.find('[name=is-show]').attr('checked','checked');
        }
        else{
            eventModal.find('.show-dependent').addClass('hidden');
            eventModal.find('[name=is-show]').removeAttr('checked');
        }
        //TODO: Check items
        var checkedMembers = event.members.reduce(function (obj, memberId){
            obj[memberId] = true;
            return obj;
        }, {});
        
        view.eventMembers = $.extend([], view.page.ctrl.members).map(function (member){
            if( checkedMembers[member.id] ){
                member.checked = true;
            }
            return member;
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
        eventModal.find('[name=event-id]').val('');
        eventModal.find('[name=title]').val('');
        eventModal.find('[name=description]').val('');
        eventModal.find('[name=location]').val('');
        eventModal.find('[name=event-date]').val('');
        eventModal.find('[name=event-time]').val('');
        eventModal.find('[name=is-show]').removeAttr('checked');
        eventModal.find('[name=load-in-time]').val('');
        eventModal.find('[name=venue]').val('');
        eventModal.find('.show-dependent').addClass('hidden');
        view.eventMembers = $.extend([], view.page.ctrl.members).sort(function (a,b){
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
    
    var membersElem = eventModal.find('.members').detach().empty();
    view.eventMembers.forEach(function (member, index){
        membersElem.append(''+
        '<label class="form-check-label member-check-label" data-index="'+index+'">'+
            '<input name="member-'+member.id+'" class="form-check-input" type="checkbox" value="" tabindex="-1" '+(member.checked?'checked':'')+'> '+
            '('+member.username+') '+member.firstName+' '+member.lastName+
        '</label>');
    });
    eventModal.find('.members-parent').append(membersElem);
    
    eventModal.find('.modal').modal();
};

EventsView.prototype.showNotifyModal = function (eventId){
    var notifyModal = $(this.page.elem).find('.notify-modal');
        
    notifyModal.find('[name=event-id]').val(eventId);
    notifyModal.find('.modal').modal();
    $(this.page.elem).find('.event-modal .modal').css('display','none');
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
/* global MenuComponent */

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
    var defer = $.Deferred();
    this.getInventory()
    .then(defer.resolve)
    .fail(console.error);
    
    return defer.promise();
};

InventoryCtrl.prototype.getInventory = function (){
    var defer = $.Deferred(),
        ctrl = this,
        that = this;

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/inventory', 
        method: 'GET'
    })
    .then(function (items){
        ctrl.items = items;
        return that.page.view.buildInventoryList();
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
}


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
};

InventoryView.prototype.buildInventoryList = function (){
    $(this.page.elem).find('.inventory').remove();
    $('.inventory-container').append('<div class="inventory card-group"></div>');
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
                        '<p class="card-text">'+item.type+'<br>Color: '+item.color+'<br>Price: $'+item.price+'</p>'+
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
}

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
        .then(page.ctrl.getInventory())
        .fail(console.error);
    });

    pageElem.on('click', '.btn-delete', function (e){
        e.preventDefault();
        e.stopPropagation();       
        page.ctrl.deleteInventory(parseInt($(this).attr('data-item-id'),10))
        .then(page.ctrl.getInventory())
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
                '<option value="S">S</option>'+
                '<option value="M">M</option>'+
                '<option value="L">L</option>'+
                '<option value="XL">XL</option>'+
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
;//bundle semicolon

/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */

function StorePage(app, data){
    Page.call(this, app, $('#storePage')[0], StoreCtrl, StoreView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
StorePage.prototype = Object.create(Page.prototype);
StorePage.prototype.constructor = StorePage;

function StoreCtrl(page){
    PageCtrl.call(this, page);
    this.items = [];
    this.cartItems = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
StoreCtrl.prototype = Object.create(PageCtrl.prototype);
StoreCtrl.prototype.constructor = StoreCtrl;
StoreCtrl.prototype.init = function (){
    var defer = $.Deferred();
    this.getInventory()
    .then(defer.resolve)
    .fail(console.error);
    
    return defer.promise();
};

StoreCtrl.prototype.getInventory = function() {
    var defer = $.Deferred(),
        ctrl = this,
        that = this;

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/inventory', 
        method: 'GET'
    })
    .then(function (items){
        ctrl.items = items;
        ctrl.getCart()
        .then(that.page.view.buildInventoryList())
        .catch(console.error)
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
}

StoreCtrl.prototype.getCart = function() {
    var defer = $.Deferred(),
        ctrl = this;
        
    $.ajax({
            url: '/api/bands/'+ctrl.bandId+'/getcartitems', 
            method: 'GET'
    })
    .then(function (cartItems){
        ctrl.cartItems = cartItems;
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
}

StoreCtrl.prototype.addToCart = function (form){
    var defer = $.Deferred(),
        ctrl = this;
       
    var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/addtocart',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(ctrl.getCart())
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};

StoreCtrl.prototype.updateCart = function (form){
    var defer = $.Deferred(),
        ctrl = this;
       
    var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/updateCart',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(ctrl.getCart())
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};

StoreCtrl.prototype.emptyCart = function (){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/emptycart',
        type: 'DELETE'
    })
    .then(ctrl.getCart())
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

StoreCtrl.prototype.payOut = function (form){
    var defer = $.Deferred(),
        ctrl = this;
       
    var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/payout',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();    
}

function StoreView(page){
    PageView.call(this, page);
}
StoreView.prototype = Object.create(PageView.prototype);
StoreView.prototype.constructor = StoreView;
StoreView.prototype.init = function (){
    this.bindEvents();
    this.buildInventoryList();
};

StoreView.prototype.buildInventoryList = function (){
    $(this.page.elem).find('.inventory').remove();
    $('.inventory-container').append('<div class="inventory card-group"></div>');
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
                        '<p class="card-text">'+item.type+'<br>Color: '+item.color+'<br>Price: $'+item.price+'</p>'+
                    '</div>'+
                    '<ul class="list-group list-group-flush" name="inventory-list-'+item.id+'"></ul>'+
                    '<form id="update-form-'+item.id+'">'+
                    '<input class"form-control" form="update-form-'+item.id+'" type="hidden" name="itemId" value="'+item.id+'"/>'+
                    '<div class="card-block">'+
                        '<button class="btn btn-success btn-add-to-cart" type="submit" name="submit" form="update-form-'+item.id+'" data-item-id="'+item.id+'">Add To Cart</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');

        var inventoryElem = $(that.page.elem).find('[name=inventory-list-'+item.id+']')

        item.inventory.forEach(function (inventory){
            var quantities = '';
            if (inventory.size === 'none') {
                inventoryElem.append(''+
                '<li class="list-group-item clearfix">Quantity: '+inventory.quantity+
                '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form-'+item.id+'" type="hidden" name="inventoryId" value="'+inventory.id+'"/>'+
                '<select class="form-control dynamicFields" id="quantity-'+inventory.id+'" form="update-form-'+item.id+'" name="quantity" required></select></li>');
            }
            else {
                inventoryElem.append(''+
                '<li class="list-group-item">Size: '+inventory.size+'<br>Quantity: '+inventory.quantity+
                '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form-'+item.id+'" type="hidden" name="inventoryId" value="'+inventory.id+'"/>'+
                '<select class="form-control dynamicFields" id="quantity-'+inventory.id+'" form="update-form-'+item.id+'" name="quantity" required></select></li>');
            }  
            
            for (var i = 0; i <= inventory.quantity; i++){
                quantities += '<option value="'+i+'">'+i+'</option>'
            }

            $('#quantity-'+inventory.id).append(quantities);
        });
        
    });    
}

StoreView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;

    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];

    pageElem.on('click', '.btn-add-to-cart', function (e){
        e.preventDefault();
        e.stopPropagation();       
        page.ctrl.addToCart(this.form)
        .then(function (result){
            alert("Item(s) added to cart");
            return page.ctrl.getCart();
        })
        .fail(console.error);
    });
    
    pageElem.on('click', '.btn-view-cart', function (e){
        page.view.showCartModal();
    })
    
    pageElem.on('click', '.btn-empty-cart', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.emptyCart();
    })
    
    pageElem.on('click', '.btn-pay-out', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.payOut(this.form)
        .then(page.ctrl.emptyCart())
        .then(page.ctrl.getInventory())
        .fail(console.error);
    })
    
    pageElem.on('click', '.btn-update-cart', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.updateCart(this.form)
        .then()
        .fail(console.error);
    })   
};

StoreView.prototype.showCartModal = function (){
    
    $('.cart-list').remove();
    $('.cart-table').find('tr:gt(0)').remove();

    var that = this;
    var inventoryFields = '';
    var cartModal = $(this.page.elem).find('.cart-modal');
    var cartItems = this.page.ctrl.cartItems;
    var cartTotal = 0;
    
    var lastItem = $(that.page.elem).find('.cart-table tr:last');
    cartItems.forEach(function (item){
        var quantities = '';
        item.inventory.forEach(function (inventory){
            lastItem.after(''+
            '<tr>'+
                '<td>'+item.type+': <strong>'+inventory.size+'</strong> '+item.name+
                    '<div class="cart-image-container mb-2">'+
                        '<img class="img-fluid cart-image" src="/media/'+item.imagePath+'">'+
                    '</div>'+
                '</td>'+
                '<td>'+
                    '<select class="form-control dynamicFields" id="cart-quantity-'+inventory.id+'" form="cart-form" name="quantity" required>'+
                    '</select>'+
                    '<input class"form-control" form="cart-form" type="hidden" name="itemId" value="'+item.id+'"/>'+
                    '<input class"form-control" form="cart-form" type="hidden" name="inventoryId" value="'+inventory.id+'"/>'+
                '</td>'+
                '<td class="text-right">$'+item.price+'</td>'+
            '</tr>');
            
            for (var i = 0; i <= inventory.quantity; i++){
                quantities += '<option value="'+i+'">'+i+'</option>'
            }

            $('#cart-quantity-'+inventory.id).append(quantities);
            $('#cart-quantity-'+inventory.id)[0].selectedIndex = inventory.cartQuantity;
            
            cartTotal += item.price * inventory.cartQuantity;    
        })
    })
    
    lastItem = $(that.page.elem).find('.cart-table tr:last');
    
    lastItem.after('<tr><td /><td /><td class="text-right"><strong>Total: </strong>$'+cartTotal+'</td>');

    $(this.page.elem).find('.cart-total').html('$'+cartTotal)

    cartModal.find('.modal').modal();
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGxpY2F0aW9uLmpzIiwiYmFuZC5qcyIsImJhbmRNZW1iZXIuanMiLCJjYXJ0LmpzIiwiZXZlbnQuanMiLCJmcmllbmQuanMiLCJpbnZlbnRvcnkuanMiLCJpdGVtLmpzIiwibm90aWZpY2F0aW9uLmpzIiwic2VhcmNoZWRCYW5kLmpzIiwic2V0TGlzdC5qcyIsInNpbXBsZUJhbmQuanMiLCJzb25nLmpzIiwidXNlci5qcyIsImxlZnRQYWQuanMiLCJ0aW1lLmpzIiwiYXBwLmpzIiwicGFnZS5qcyIsIm1lbnUuanMiLCJhZGRGcmllbmQuanMiLCJhZGRNZXJjaC5qcyIsImFwcGxpY2F0aW9ucy5qcyIsImJhbmRzLmpzIiwiZWRpdFNldExpc3QuanMiLCJldmVudHMuanMiLCJmcmllbmRzLmpzIiwibG9naW4uanMiLCJtYWluLmpzIiwibm90aWZpY2F0aW9ucy5qcyIsInJlZ2lzdGVyLmpzIiwicmVnaXN0ZXJCYW5kLmpzIiwic2VhcmNoQmFuZHMuanMiLCJzZXRMaXN0cy5qcyIsInNvbmdzLmpzIiwic3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNsV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNqUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBcEJwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QXFCdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4ZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QW5CdE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QW9CdlJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBBcHBsaWNhdGlvbihqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMudXNlcklkID0ganNvbi51c2VySWQgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMudXNlcm5hbWUgPSBqc29uLnVzZXJuYW1lIHx8ICcnO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmluc3RydW1lbnQgPSBqc29uLmluc3RydW1lbnQgfHwgJyc7XG4gICAgdGhpcy5tZXNzYWdlID0ganNvbi5tZXNzYWdlIHx8ICcnO1xufVxuXG5BcHBsaWNhdGlvbi5TVEFUVVMgPSB7XG5cdE5PTkU6IDAsIFxuICAgIEFQUExJRURfTUFOQUdFUjogMSxcbiAgICBBUFBMSUVEX01FTUJFUjogMixcbiAgICBBUFBMSUVEX1BST01PVEVSOiAzLFxuXHRBQ0NFUFRFRDogNCwgXG5cdFJFSkVDVEVEOiA1LFxuICAgIEJMT0NLRUQ6IDZcbn1cblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247IH0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNiYW5kUGFnZScpWzBdLCBCYW5kQ3RybCwgQmFuZFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkJhbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZFBhZ2U7XG5cbmZ1bmN0aW9uIEJhbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kID0ge307XG59XG5CYW5kQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5CYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kQ3RybDtcbkJhbmRDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgIC8vdmFyIGlkID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoJy9hcGkvYmFuZHMvJyArIGlkLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEJhbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5CYW5kVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCYW5kVmlldztcbkJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGJhbmRFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmJhbmQnKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxoMiBjbGFzcz1cImNhcmQtdGl0bGVcIj5NeSBCYW5kPC9oMj4nKTtcbiAgICBiYW5kRWxlbS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+PC9kaXY+Jyk7XG4gICAgXG4gICAgdmFyIGJhbmRJbmZvRWxlbSA9IGJhbmRFbGVtLmZpbmQoJy5jYXJkLWJsb2NrJyk7XG4gICAgYmFuZEluZm9FbGVtLmFwcGVuZCgnJ1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkJhbmQgTmFtZTwvc3Ryb25nPjogJyt0aGlzLnBhZ2UuY3RybC5iYW5kLmJhbmROYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPk93bmVyPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmQub3duZXJOYW1lKyc8L3A+J1xuICAgICAgICArJzxwIGNsYXNzPVwiaW5mbyBjYXJkLXRleHRcIj48c3Ryb25nPkRlc2NyaXB0aW9uPC9zdHJvbmc+OiAnK3RoaXMucGFnZS5jdHJsLmJhbmQuZGVzY3JpcHRpb24rJzwvcD4nXG4gICAgKTtcbiAgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cbkJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFwcGxpY2F0aW9ucycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKycvYXBwbGljYXRpb25zJztcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuaW52ZW50b3J5JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUrJy9pbnZlbnRvcnknO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuc2V0bGlzdHMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSsnL3NldGxpc3RzJztcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLnNvbmdzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUrJy9zb25ncyc7XG4gICAgfSk7XG4gICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLnN0b3JlJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUrJy9zdG9yZSc7XG4gICAgfSk7XG4gIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZXZlbnRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUrJy9ldmVudHMnO1xuICAgIH0pO1xuXG59OyIsImZ1bmN0aW9uIEJhbmRNZW1iZXIoanNvbil7XG4gICAgdGhpcy51c2VySWQgPSBqc29uLnVzZXJJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kSWQgPSBqc29uLmJhbmRJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy51c2VybmFtZSA9IGpzb24udXNlcm5hbWUgfHwgJyc7XG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIHRoaXMuaW5zdHJ1bWVudCA9IGpzb24uaW5zdHJ1bWVudCB8fCAnJztcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgJyc7XG59XG5cbkJhbmRNZW1iZXIuUk9MRSA9IHtcbiAgICBOT05FOiAtMSxcbiAgICBPV05FUiA6IDAsXG4gICAgTUFOQUdFUjogMSxcbiAgICBNRU1CRVIgOiAyLFxuICAgIFBST01PVEVSIDogM1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBCYW5kTWVtYmVyOyB9IiwiZnVuY3Rpb24gQ2FydChqc29uKXtcbiAgICB0aGlzLnVzZXJJZCA9IGpzb24udXNlcklkIHx8IDA7XG4gICAgdGhpcy5iYW5kSWQgPSBqc29uLmJhbmRJZCB8fCAwO1xuICAgIHRoaXMuaXRlbUlkcyA9IGpzb24uaXRlbUlkcyB8fCBbXTtcbiAgICB0aGlzLmludmVudG9yeUlkcyA9IGpzb24uaW52ZW50b3J5SWRzIHx8IFtdO1xuICAgIHRoaXMucXVhbnRpdGllcyA9IGpzb24ucXVhbnRpdGllcyB8fCBbXVxufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBDYXJ0OyB9IiwiZnVuY3Rpb24gRXZlbnQoZGF0YSl7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQgfHwgZGF0YS5FdmVudElEIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmJhbmRJZCA9IGRhdGEuYmFuZElkIHx8IGRhdGEuQmFuZElEIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRpdGxlID0gZGF0YS50aXRsZSB8fCBkYXRhLlRpdGxlIHx8ICcnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uIHx8IGRhdGEuRGVzY3JpcHRpb24gfHwgJyc7XG4gICAgdGhpcy5ldmVudERhdGUgPSBkYXRhLmV2ZW50RGF0ZSB8fCBkYXRhLkV2ZW50RGF0ZSB8fCAnMTkwMC0wMS0wMSc7XG4gICAgdGhpcy5ldmVudERhdGUgPSB0aGlzLmV2ZW50RGF0ZS5zdWJzdHIoMCwxMCk7XG4gICAgdGhpcy5ldmVudFRpbWUgPSBkYXRhLmV2ZW50VGltZSB8fCBkYXRhLkV2ZW50VGltZSB8fCAnMDA6MDA6MDAnO1xuICAgIHRoaXMubG9hZEluVGltZSA9IGRhdGEubG9hZEluVGltZSB8fCBkYXRhLkxvYWRJblRpbWUgfHwgJzAwOjAwOjAwJztcbiAgICB0aGlzLmxvY2F0aW9uID0gZGF0YS5sb2NhdGlvbiB8fCBkYXRhLkxvY2F0aW9uIHx8ICcnO1xuICAgIHRoaXMudmVudWUgPSBkYXRhLnZlbnVlIHx8IGRhdGEuVmVudWUgfHwgJyc7XG4gICAgdGhpcy5pc1Nob3cgPSBkYXRhLmlzU2hvdyB8fCBkYXRhLklzU2hvdyB8fCBmYWxzZTtcbiAgICB0aGlzLm1lbWJlcnMgPSBkYXRhLm1lbWJlcnMgfHwgZGF0YS5NZW1iZXJzIHx8IFtdO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBFdmVudDsgfSIsImZ1bmN0aW9uIEZyaWVuZChqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMudXNlck5hbWUgPSBqc29uLnVzZXJOYW1lIHx8ICcnO1xuICAgIHRoaXMuYmlvID0ganNvbi5iaW8gfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMubmFtZSA9IGpzb24ubmFtZSB8fCAnJztcbiAgICB0aGlzLnN0YXR1cyA9IGpzb24uc3RhdHVzIHx8ICcnO1xufVxuXG5GcmllbmQuU1RBVFVTID0ge1xuXHROT05FOiAwLCBcblx0RlJJRU5EOiAxLCBcblx0UkVRVUVTVEVEOiAyLCBcblx0UEVORElORzogMywgXG5cdEJMT0NLRUQ6IDQgXG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEZyaWVuZDsgfSIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG5cbmZ1bmN0aW9uIEludmVudG9yeVBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjaW52ZW50b3J5UGFnZScpWzBdLCBJbnZlbnRvcnlDdHJsLCBJbnZlbnRvcnlWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5JbnZlbnRvcnlQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuSW52ZW50b3J5UGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlQYWdlO1xuXG5mdW5jdGlvbiBJbnZlbnRvcnlDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIHRoaXMuYmFuZElkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykucmVkdWNlKGZ1bmN0aW9uICh2YWwsIGNodW5rLCBpbmRleCwgYXJyKXtcbiAgICAgICAgcmV0dXJuIHZhbCB8fCAoY2h1bmsgPT0gJ2JhbmRzJyA/IGFycltpbmRleCsxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSwgdW5kZWZpbmVkKTtcbn1cbkludmVudG9yeUN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuSW52ZW50b3J5Q3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlDdHJsO1xuSW52ZW50b3J5Q3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICB0aGlzLmdldEludmVudG9yeSgpXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuSW52ZW50b3J5Q3RybC5wcm90b3R5cGUuZ2V0SW52ZW50b3J5ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICBjdHJsID0gdGhpcyxcbiAgICAgICAgdGhhdCA9IHRoaXM7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9pbnZlbnRvcnknLCBcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGl0ZW1zKXtcbiAgICAgICAgY3RybC5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICByZXR1cm4gdGhhdC5wYWdlLnZpZXcuYnVpbGRJbnZlbnRvcnlMaXN0KCk7XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59XG5cblxuSW52ZW50b3J5Q3RybC5wcm90b3R5cGUudXBkYXRlSW52ZW50b3J5ID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgY3RybCA9IHRoaXM7XG4gICAgICAgXG4gICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2N0cmwuYmFuZElkKycvdXBkYXRlaW52ZW50b3J5JyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5JbnZlbnRvcnlDdHJsLnByb3RvdHlwZS5kZWxldGVJbnZlbnRvcnkgPSBmdW5jdGlvbiAoaXRlbUlkKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytjdHJsLmJhbmRJZCsnL2ludmVudG9yeS8nK2l0ZW1JZCxcbiAgICAgICAgdHlwZTogJ0RFTEVURSdcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEludmVudG9yeVZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkludmVudG9yeVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbnZlbnRvcnlWaWV3O1xuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuYnVpbGRJbnZlbnRvcnlMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmludmVudG9yeScpLnJlbW92ZSgpO1xuICAgICQoJy5pbnZlbnRvcnktY29udGFpbmVyJykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaW52ZW50b3J5IGNhcmQtZ3JvdXBcIj48L2Rpdj4nKTtcbiAgICB2YXIgaXRlbUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuaW52ZW50b3J5Jyk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgdGhpcy5wYWdlLmN0cmwuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgIGl0ZW1FbGVtLmFwcGVuZCgnJytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJyb3dcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb2wtNi1zbVwiPicrXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJjYXJkLWltZy10b3AgaW1nLWZsdWlkXCIgc3JjPVwiL21lZGlhLycraXRlbS5pbWFnZVBhdGgrJ1wiIGFsdD1cIkNhcmQgaW1hZ2UgY2FwXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrIGltZy1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicraXRlbS5uYW1lKyc8L2g0PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHAgY2xhc3M9XCJjYXJkLXRleHRcIj4nK2l0ZW0udHlwZSsnPGJyPkNvbG9yOiAnK2l0ZW0uY29sb3IrJzxicj5QcmljZTogJCcraXRlbS5wcmljZSsnPC9wPicrXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwibGlzdC1ncm91cCBsaXN0LWdyb3VwLWZsdXNoXCIgbmFtZT1cImludmVudG9yeS1saXN0LScraXRlbS5pZCsnXCI+PC91bD4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWVkaXRcIiBkYXRhLWl0ZW0taWQ9XCInK2l0ZW0uaWQrJ1wiPkVkaXQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4tZGVsZXRlXCIgZGF0YS1pdGVtLWlkPVwiJytpdGVtLmlkKydcIj5EZWxldGU8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyIGludmVudG9yeUVsZW0gPSAkKHRoYXQucGFnZS5lbGVtKS5maW5kKCdbbmFtZT1pbnZlbnRvcnktbGlzdC0nK2l0ZW0uaWQrJ10nKVxuXG4gICAgICAgIGl0ZW0uaW52ZW50b3J5LmZvckVhY2goZnVuY3Rpb24gKGludmVudG9yeSl7XG4gICAgICAgICAgICBpZiAoaW52ZW50b3J5LnNpemUgPT09ICdub25lJykge1xuICAgICAgICAgICAgICAgIGludmVudG9yeUVsZW0uYXBwZW5kKCcnK1xuICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGNsZWFyZml4XCI+UXVhbnRpdHk6ICcraW52ZW50b3J5LnF1YW50aXR5Kyc8L2xpPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW52ZW50b3J5RWxlbS5hcHBlbmQoJycrXG4gICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5TaXplOiAnK2ludmVudG9yeS5zaXplKyc8YnI+UXVhbnRpdHk6ICcraW52ZW50b3J5LnF1YW50aXR5Kyc8L2xpPicpO1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuSW52ZW50b3J5Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG5cbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBpZCA9IHVybC5zcGxpdCgnLycpWyB1cmwuc3BsaXQoJy8nKS5pbmRleE9mKCdiYW5kcycpKzFdO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmFkZC1tZXJjaCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9iYW5kcy8nK2lkKycvYWRkbWVyY2gnO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG4tZWRpdCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZS52aWV3LnNob3dFZGl0TW9kYWwocGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWl0ZW0taWQnKSwxMCkpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICcjdXBkYXRlLWZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICAgXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7ICAgXG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVJbnZlbnRvcnkodGhpcylcbiAgICAgICAgLnRoZW4ocGFnZS5jdHJsLmdldEludmVudG9yeSgpKVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuLWRlbGV0ZScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAgICAgICBcbiAgICAgICAgcGFnZS5jdHJsLmRlbGV0ZUludmVudG9yeShwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaXRlbS1pZCcpLDEwKSlcbiAgICAgICAgLnRoZW4ocGFnZS5jdHJsLmdldEludmVudG9yeSgpKVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICdbbmFtZT1cImFkZFNpemVcIl0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgICBcbiAgICAgICAgdmFyIHR5cGUgPSBwYWdlRWxlbS5maW5kKCdbbmFtZT1cInR5cGVcIl0nKVswXS52YWx1ZTtcbiAgICAgICAgcGFnZS52aWV3LmFkZFNpemVGaWVsZCh0eXBlKTtcbiAgICB9KTtcbn07XG5cbkludmVudG9yeVZpZXcucHJvdG90eXBlLnNob3dFZGl0TW9kYWwgPSBmdW5jdGlvbiAoaXRlbUlkKXtcbiAgICB2YXIgdGhpc0l0ZW0gPSB0aGlzLnBhZ2UuY3RybC5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICByZXR1cm4gaXRlbS5pZCA9PSBpdGVtSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgbmFtZT1cImFkZFNpemVcIj5BZGQgU2l6ZSA8ZGl2IGNsYXNzPVwiZmEgZmEtcGx1cyBpY29uXCI+PC9kaXY+JztcblxuICAgICQoJy5pdGVtLWludmVudG9yeScpLnJlbW92ZSgpO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBpbnZlbnRvcnlGaWVsZHMgPSAnJztcbiAgICB2YXIgaXRlbU1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLml0ZW0tbW9kYWwnKTtcbiAgICBcbiAgICAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcubW9kYWwtYm9keScpLmFwcGVuZCgnPGRpdiBjbGFzcz1cIml0ZW0taW52ZW50b3J5XCI+PC9kaXY+Jyk7XG5cbiAgICB0aGlzSXRlbS5pbnZlbnRvcnkuZm9yRWFjaChmdW5jdGlvbiAoaW52ZW50b3J5KXsgICBcbiAgICAgICAgaWYgKHRoaXNJdGVtLnR5cGUgPT09ICdTaGlydCcpIHtcbiAgICAgICAgICAgIGludmVudG9yeUZpZWxkcyA9ICcnK1xuICAgICAgICAgICAgJzxsYWJlbCBmb3I9XCJzaXplLScraW52ZW50b3J5LmlkKydcIj5TaXplPC9sYWJlbD4nK1xuICAgICAgICAgICAgJzxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIGlkPVwic2l6ZS0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgbmFtZT1cInNpemVcIiByZXF1aXJlZD4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiU1wiPlM8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiTVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiTFwiPkw8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiWExcIj5YTDwvb3B0aW9uPicrXG4gICAgICAgICAgICAnPC9zZWxlY3Q+JzsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzSXRlbS50eXBlID09PSAnQ0QnKSB7XG4gICAgICAgICAgICBpbnZlbnRvcnlGaWVsZHMgPSAnPGlucHV0IGNsYXNzXCJmb3JtLWNvbnRyb2xcIiBpZD1cInNpemUtJytpbnZlbnRvcnkuaWQrJ1wiIGZvcm09XCJ1cGRhdGUtZm9ybVwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic2l6ZVwiLz4nO1xuICAgICAgICAgICAgbW9kYWxCdXR0b25zID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpc0l0ZW0udHlwZSA9PT0gJ1N0aWNrZXInKSB7XG4gICAgICAgICAgICBpbnZlbnRvcnlGaWVsZHMgPSAnJytcbiAgICAgICAgICAgICc8bGFiZWwgZm9yPVwic2l6ZS0nK2ludmVudG9yeS5pZCsnXCI+U2l6ZTwvbGFiZWw+JytcbiAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGR5bmFtaWNGaWVsZHNcIiBpZD1cInNpemUtJytpbnZlbnRvcnkuaWQrJ1wiIGZvcm09XCJ1cGRhdGUtZm9ybVwiIG5hbWU9XCJzaXplXCIgcmVxdWlyZWQ+JytcbiAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjF4MVwiPjF4MTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCIyeDJcIj4yeDI8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiM3g0XCI+M3g0PC9vcHRpb24+JytcbiAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjV4NlwiPjV4Njwvb3B0aW9uPicrXG4gICAgICAgICAgICAnPC9zZWxlY3Q+JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsbCB0eXBlcyBoYXZlIGEgcXVhbnRpdHlcbiAgICAgICAgaW52ZW50b3J5RmllbGRzICs9ICcnK1xuICAgICAgICAnPGxhYmVsIGZvcj1cInF1YW50aXR5LScraW52ZW50b3J5LmlkKydcIj5RdWFudGl0eTwvbGFiZWw+JytcbiAgICAgICAgJzxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzIHF1YW50aXR5XCIgaWQ9XCJxdWFudGl0eS0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgbmFtZT1cInF1YW50aXR5XCIgcmVxdWlyZWQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBzdGVwPVwiMVwiIHBsYWNlaG9sZGVyPVwiUXVhbnRpdHlcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDIwcHg7XCI+JytcbiAgICAgICAgJzxpbnB1dCBjbGFzc1wiZm9ybS1jb250cm9sXCIgaWQ9XCJpbnZlbnRvcnlJZC0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnZlbnRvcnlJZFwiLz4nO1xuXG4gICAgICAgIHZhciBpbnZlbnRvcnlGaWVsZHNEaXYgPSAkKHRoYXQucGFnZS5lbGVtKS5maW5kKCcuaXRlbS1pbnZlbnRvcnknKTtcbiAgICAgICAgaW52ZW50b3J5RmllbGRzRGl2LmFwcGVuZChpbnZlbnRvcnlGaWVsZHMpO1xuICAgICAgICAgIFxuICAgICAgICAkKCcjc2l6ZS0nK2ludmVudG9yeS5pZClbMF0udmFsdWUgPSBpbnZlbnRvcnkuc2l6ZTsgICAgXG4gICAgICAgICQoJyNxdWFudGl0eS0nK2ludmVudG9yeS5pZClbMF0udmFsdWUgPSBpbnZlbnRvcnkucXVhbnRpdHk7XG4gICAgICAgICQoJyNpbnZlbnRvcnlJZC0nK2ludmVudG9yeS5pZClbMF0udmFsdWUgPSBpbnZlbnRvcnkuaWQ7XG4gICAgfSk7ICBcblxuICAgICQoJ1tuYW1lPVwiaXRlbUlkXCJdJylbMF0udmFsdWUgPSB0aGlzSXRlbS5pZDsgICAgICAgICBcbiAgICAkKCdbbmFtZT1cIm5hbWVcIl0nKVswXS52YWx1ZSA9IHRoaXNJdGVtLm5hbWU7ICBcbiAgICAkKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJylbMF0udmFsdWUgPSB0aGlzSXRlbS5kZXNjcmlwdGlvbjtcbiAgICAkKCdbbmFtZT1cImNvbG9yXCJdJylbMF0udmFsdWUgPSB0aGlzSXRlbS5jb2xvcjsgICAgXG4gICAgJCgnW25hbWU9XCJwcmljZVwiXScpWzBdLnZhbHVlID0gdGhpc0l0ZW0ucHJpY2U7IFxuICAgICQoJ1tuYW1lPVwidHlwZVwiXScpWzBdLnZhbHVlID0gdGhpc0l0ZW0udHlwZTsgXG5cbiAgICBpdGVtTW9kYWwuZmluZCgnLmR5bmFtaWMtYnV0dG9ucycpLmh0bWwobW9kYWxCdXR0b25zKVxuICAgIGl0ZW1Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWl0ZW0taWQnLHRoaXNJdGVtLmlkKTtcbiAgICBpdGVtTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzSXRlbS5uYW1lKTtcbiAgICBpdGVtTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07XG5cbkludmVudG9yeVZpZXcucHJvdG90eXBlLmFkZFNpemVGaWVsZCA9IGZ1bmN0aW9uICh0eXBlKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIGludmVudG9yeUZpZWxkcyA9ICcnO1xuXG4gICAgaWYgKHR5cGUgPT09ICdTaGlydCcpIHtcbiAgICAgICAgaW52ZW50b3J5RmllbGRzID0gJycrXG4gICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGR5bmFtaWNGaWVsZHNcIiBmb3JtPVwidXBkYXRlLWZvcm1cIiBuYW1lPVwic2l6ZVwiIHJlcXVpcmVkPicrXG4gICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInNcIj5TPC9vcHRpb24+JytcbiAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwibVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJsXCI+TDwvb3B0aW9uPicrXG4gICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cInhsXCI+WEw8L29wdGlvbj4nK1xuICAgICAgICAnPC9zZWxlY3Q+JzsgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ0NEJykge1xuICAgICAgICBpbnZlbnRvcnlGaWVsZHMgPSAnPGlucHV0IGNsYXNzXCJmb3JtLWNvbnRyb2xcIiBmb3JtPVwidXBkYXRlLWZvcm1cIiB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInNpemVcIi8+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ1N0aWNrZXInKSB7XG4gICAgICAgIGludmVudG9yeUZpZWxkcyA9ICcnK1xuICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgbmFtZT1cInNpemVcIiByZXF1aXJlZD4nK1xuICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCIxeDFcIj4xeDE8L29wdGlvbj4nK1xuICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCIyeDJcIj4yeDI8L29wdGlvbj4nK1xuICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCIzeDRcIj4zeDQ8L29wdGlvbj4nK1xuICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCI1eDZcIj41eDY8L29wdGlvbj4nK1xuICAgICAgICAnPC9zZWxlY3Q+JztcbiAgICB9XG5cbiAgICAvLyBBbGwgdHlwZXMgd2lsbCBoYXZlIGEgcXVhbnRpdHkgYW5kIGNvbG9yXG4gICAgaW52ZW50b3J5RmllbGRzICs9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIGZvcm09XCJ1cGRhdGUtZm9ybVwiIHJlcXVpcmVkIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwicXVhbnRpdHlcIiBtaW49XCIwXCIgc3RlcD1cIjFcIiBwbGFjZWhvbGRlcj1cIlF1YW50aXR5XCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCBjbGFzc1wiZm9ybS1jb250cm9sXCIgZm9ybT1cInVwZGF0ZS1mb3JtXCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnZlbnRvcnlJZFwiIHZhbHVlPVwibmV3XCIvPic7XG4gICAgdmFyIGludmVudG9yeUZpZWxkc0RpdiA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5pdGVtLWludmVudG9yeScpO1xuICAgIGludmVudG9yeUZpZWxkc0Rpdi5hcHBlbmQoaW52ZW50b3J5RmllbGRzKTtcbn1cbiIsImZ1bmN0aW9uIEl0ZW0oanNvbikge1xuICAgIHRoaXMuaWQgPSBqc29uLmlkIHx8IDA7XG4gICAgdGhpcy5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IGpzb24udHlwZSB8fCAnJztcbiAgICB0aGlzLmNvbG9yID0ganNvbi5jb2xvciB8fCAnJztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0ganNvbi5kZXNjcmlwdGlvbiB8fCAnJztcbiAgICB0aGlzLmltYWdlUGF0aCA9IGpzb24uaW1hZ2VQYXRoIHx8ICcnO1xuICAgIHRoaXMuaW1hZ2VGaWxlID0ganNvbi5pbWFnZUZpbGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMucHJpY2UgPSBqc29uLnByaWNlIHx8IDA7XG4gICAgdGhpcy5pbnZlbnRvcnkgPSBqc29uLmludmVudG9yeSB8fCB1bmRlZmluZWQ7XG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IEl0ZW07IH0iLCJmdW5jdGlvbiBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uSWQsIHVzZXJJZCwgdHlwZSwgbWVzc2FnZSwgbGluaywgdW5yZWFkKXtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbklkID0gbm90aWZpY2F0aW9uSWQ7XG4gICAgdGhpcy51c2VySWQgPSB1c2VySWQ7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMubGluayA9IGxpbms7XG4gICAgdGhpcy51bnJlYWQgPSB1bnJlYWQ7XG59XG5Ob3RpZmljYXRpb24uVFlQRSA9IHtcbiAgICBOT19NRVNTQUdFOiAwLFxuICAgIEZSSUVORF9SRVFVRVNUOiAxLFxuICAgIEZSSUVORF9BQ0NFUFRFRDogMixcbiAgICBCQU5EX0lOVklURTogMyxcbiAgICBSRU1PVkVEX0ZST01fQkFORDogNCxcbiAgICBFVkVOVF9JTlZJVEU6IDUsXG4gICAgRVZFTlRfUkVNSU5ERVI6IDYsXG4gICAgRVJST1I6IDcsXG4gICAgU1VDQ0VTUzogOCxcbiAgICBXQVJOSU5HOiA5XG59O1xuTm90aWZpY2F0aW9uLmZyb21PYmogPSBmdW5jdGlvbiAob2JqKXtcbiAgICB2YXIgbXlOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCk7XG4gICAgbXlOb3RpZmljYXRpb24ubm90aWZpY2F0aW9uSWQgPSBvYmoubm90aWZpY2F0aW9uSWQgfHwgb2JqLk5vdGlmaWNhdGlvbklkIHx8IC0xO1xuICAgIG15Tm90aWZpY2F0aW9uLnVzZXJJZCA9IG9iai51c2VySWQgfHwgb2JqLlVzZXJJZCB8fCAtMTtcbiAgICBteU5vdGlmaWNhdGlvbi50eXBlID0gb2JqLnR5cGUgfHwgb2JqLlR5cGUgfHwgTm90aWZpY2F0aW9uLlRZUEUuTk9fTUVTU0FHRTtcbiAgICBteU5vdGlmaWNhdGlvbi5tZXNzYWdlID0gb2JqLm1lc3NhZ2UgfHwgb2JqLk1lc3NhZ2UgfHwgJyc7XG4gICAgbXlOb3RpZmljYXRpb24ubGluayA9IG9iai5saW5rIHx8IG9iai5MaW5rIHx8ICcjJztcbiAgICBteU5vdGlmaWNhdGlvbi51bnJlYWQgPSBvYmoudW5yZWFkIHx8IG9iai5VbnJlYWQgfHwgdHJ1ZTtcbiAgICByZXR1cm4gbXlOb3RpZmljYXRpb247XG59O1xuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBOb3RpZmljYXRpb247IH1cbiIsImZ1bmN0aW9uIFNlYXJjaGVkQmFuZChqc29uKXtcbiAgICB0aGlzLmlkID0ganNvbi5pZCB8fCAwO1xuICAgIHRoaXMuYmFuZE5hbWUgPSBqc29uLmJhbmROYW1lIHx8ICcnO1xuICAgIHRoaXMuYXBwbGljYXRpb25TdGF0dXMgPSBqc29uLmFwcGxpY2F0aW9uU3RhdHVzIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJvbGUgPSBqc29uLnJvbGUgfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBqc29uLmRlc2NyaXB0aW9uIHx8ICcnO1xuICAgIHRoaXMuZ2VucmUgPSBqc29uLmdlbnJlIHx8ICcnO1xufVxuXG5TZWFyY2hlZEJhbmQuUk9MRSA9IHtcbiAgICBPV05FUjogMCxcbiAgICBNQU5BR0VSOiAxLFxuICAgIE1FTUJFUjogMixcbiAgICBQUk9NT1RFUjogM1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTZWFyY2hlZEJhbmQ7IH0iLCJpZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXtcbiAgICB2YXIgbGVmdFBhZCA9IHJlcXVpcmUoJy4uL3V0aWxzL2xlZnRQYWQuanMnKTtcbn1cblxuZnVuY3Rpb24gU2V0TGlzdChkYXRhKXtcbiAgICB0aGlzLmlkID0gZGF0YS5pZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kSWQgPSBkYXRhLmJhbmRJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lIHx8ICcnO1xuICAgIHRoaXMuc29uZ3MgPSBkYXRhLnNvbmdzIHx8IFtdO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkYXRhLmRlc2NyaXB0aW9uIHx8ICcnO1xufVxuXG5TZXRMaXN0LnByb3RvdHlwZS50b3RhbExlbmd0aCA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiB0aGlzLnNvbmdzLnJlZHVjZShmdW5jdGlvbiAodG90YWwsIHNvbmcpe1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBzb25nLmR1cmF0aW9uLnNwbGl0KCc6Jyk7XG4gICAgICAgIHJldHVybiB0b3RhbC5tYXAoZnVuY3Rpb24gKHZhbCwgaW5kZXgpe1xuICAgICAgICAgICAgcmV0dXJuIHZhbCArIHBhcnNlSW50KGR1cmF0aW9uW2luZGV4XSwxMCk7XG4gICAgICAgIH0pO1xuICAgIH0sWzAsMCwwXSkubWFwKGZ1bmN0aW9uICh0b3RhbCl7XG4gICAgICAgIHJldHVybiBsZWZ0UGFkKHRvdGFsLnRvU3RyaW5nKCksMiwnMCcpO1xuICAgIH0pLmpvaW4oJzonKTtcbn07XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNldExpc3QgfSIsImZ1bmN0aW9uIFNpbXBsZUJhbmQoanNvbil7XG4gICAgdGhpcy5pZCA9IGpzb24uaWQgfHwgMDtcbiAgICB0aGlzLm93bmVyTmFtZSA9IGpzb24ub3duZXJOYW1lIHx8ICcnO1xuICAgIHRoaXMub3duZXJJZCA9IGpzb24ub3duZXJJZCB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYW5kTmFtZSA9IGpzb24uYmFuZE5hbWUgfHwgJyc7XG59XG5cbmlmKCB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyApeyBtb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUJhbmQ7IH0iLCJmdW5jdGlvbiBTb25nKGRhdGEpe1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmJhbmRJZCA9IGRhdGEuYmFuZElkIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWUgfHwgJyc7XG4gICAgdGhpcy5kdXJhdGlvbiA9IGRhdGEuZHVyYXRpb24gfHwgJzAwaDAwbTAwcyc7XG4gICAgdGhpcy5seXJpY3MgPSBkYXRhLmx5cmljcyB8fCAnJztcbiAgICB0aGlzLmNvbXBvc2VyID0gZGF0YS5jb21wb3NlciB8fCAnJztcbiAgICB0aGlzLmxpbmsgPSBkYXRhLmxpbmsgfHwgJyc7XG4gICAgdGhpcy5wYXRoID0gZGF0YS5wYXRoIHx8ICcnO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBTb25nOyB9IiwiZnVuY3Rpb24gVXNlcihkYXRhKXtcbiAgICB0aGlzLmlkID0gZGF0YS5pZCB8fCBkYXRhLlVzZXJJRCB8fCAwO1xuICAgIHRoaXMudXNlcm5hbWUgPSBkYXRhLnVzZXJuYW1lIHx8IGRhdGEuVXNlcm5hbWUgfHwgJyc7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBkYXRhLmZpcnN0TmFtZSB8fCBkYXRhLkZpcnN0TmFtZSB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5sYXN0TmFtZSA9IGRhdGEubGFzdE5hbWUgfHwgZGF0YS5MYXN0TmFtZSB8fCAnJztcbiAgICB0aGlzLmJpbyA9IGRhdGEuYmlvIHx8IGRhdGEuQmlvIHx8ICcnO1xuICAgIHRoaXMuZW1haWwgPSBkYXRhLmVtYWlsIHx8IGRhdGEuRW1haWwgfHwgJyc7XG59XG5cbmZ1bmN0aW9uIE1lbWJlcihkYXRhKXtcbiAgICBVc2VyLmNhbGwodGhpcywgZGF0YSk7XG4gICAgaWYoIGRhdGEucm9sZSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgIHRoaXMucm9sZSA9IGRhdGEucm9sZTtcbiAgICB9XG4gICAgZWxzZSBpZiggZGF0YS5Sb2xlICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgdGhpcy5yb2xlID0gZGF0YS5Sb2xlO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB0aGlzLnJvbGUgPSBNZW1iZXIuUk9MRS5OT05FO1xuICAgIH1cbn1cbk1lbWJlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVzZXIucHJvdG90eXBlKTtcbk1lbWJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW1iZXI7XG5cbk1lbWJlci5ST0xFID0ge1xuICAgIE5PTkU6IC0xLFxuICAgIE9XTkVSIDogMCxcbiAgICBNQU5BR0VSOiAxLFxuICAgIE1FTUJFUiA6IDIsXG4gICAgUFJPTU9URVIgOiAzXG59O1xuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSB7VXNlcixNZW1iZXJ9IH0iLCJmdW5jdGlvbiBsZWZ0UGFkKHN0ciwgbGVuZywgcGFkKXtcbiAgICB2YXIgbmV3U3RyID0gc3RyO1xuICAgIHdoaWxlKG5ld1N0ci5sZW5ndGggPCBsZW5nKXtcbiAgICAgICAgbmV3U3RyID0gcGFkICsgbmV3U3RyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3U3RyO1xufVxuXG5pZiggdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgKXsgbW9kdWxlLmV4cG9ydHMgPSBsZWZ0UGFkOyB9IiwiaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IHZhciBsZWZ0UGFkID0gcmVxdWlyZSgnLi9sZWZ0UGFkLmpzJyk7IH1cblxudmFyIFRpbWUgPSB7XG4gICAgZnJvbUFNUE06IGZ1bmN0aW9uICh0aW1lKXtcbiAgICAgICAgdmFyIHRpbWVTcGxpdCA9IHRpbWUuc3BsaXQoLzpcXHMvZyk7XG4gICAgICAgIGlmKCB0aW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYW0nKSAhPSAtMSApe1xuICAgICAgICAgICAgcmV0dXJuIGxlZnRQYWQodGltZVNwbGl0WzBdLDIsJzAnKSsnOicrbGVmdFBhZCh0aW1lU3BsaXRbMV0sMiwnMCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIHRpbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdwbScpICE9IC0xKXtcbiAgICAgICAgICAgIGlmKCBwYXJzZUludCh0aW1lU3BsaXRbMF0sMTApID09IDEyICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRQYWQodGltZVNwbGl0WzBdLDIsJzAnKSsnOicrbGVmdFBhZCh0aW1lU3BsaXRbMV0sMiwnMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFBhZChwYXJzZUludCh0aW1lU3BsaXRbMF0sMTApKzEyLDIsJzAnKSsnOicrbGVmdFBhZCh0aW1lU3BsaXRbMV0sMiwnMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdGltZS5zcGxpdCgvOi9nKS5zbGljZSgwLDMpLm1hcChmdW5jdGlvbiAodmFsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFBhZCh2YWwsMiwnMCcpO1xuICAgICAgICAgICAgfSkuam9pbignOicpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICl7IG1vZHVsZS5leHBvcnRzID0gVGltZTsgfSIsIi8qIGdsb2JhbCAkICovXG5cbmZ1bmN0aW9uIEFwcCgpe1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB1bmRlZmluZWQ7XG4gICAgLy90aGlzLnBhZ2VIaXN0b3J5ID0gW107XG59XG5BcHAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoUGFnZUNvbnN0cnVjdG9yKXtcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gbmV3IFBhZ2VDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRoaXMuY3VycmVudFBhZ2UuaW5pdCgpO1xufTtcbi8qQXBwLnByb3RvdHlwZS5jaGFuZ2VQYWdlID0gZnVuY3Rpb24gKHBhZ2UsIGRhdGEpe1xuICAgIGlmKCB0aGlzLmN1cnJlbnRQYWdlICl7XG4gICAgICAgIC8vc3RvcmUgdGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgbGFzdCBwYWdlXG4gICAgICAgIHRoaXMucGFnZUhpc3RvcnkucHVzaCh0aGlzLmN1cnJlbnRQYWdlLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgJCh0aGlzLmN1cnJlbnRQYWdlLmVsZW0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgLy9jcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIG5leHQgcGFnZVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgcGFnZSh0aGlzKTtcbiAgICAkKHRoaXMuY3VycmVudFBhZ2UuZWxlbSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRoaXMuY3VycmVudFBhZ2UuaW5pdCgpO1xufTsqLyIsIi8qIGdsb2JhbCAkICovXG4vKiogSW5oZXJpdGFibGUgQ2xhc3NlcyAqKi9cbmZ1bmN0aW9uIFBhZ2UoYXBwLCBlbGVtLCBjdHJsQ29uc3RydWN0b3IsIHZpZXdDb25zdHJ1Y3RvciwgY2hpbGRDb21wb25lbnRzKXtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xuICAgIHRoaXMuY3RybCA9IG5ldyBjdHJsQ29uc3RydWN0b3IodGhpcyk7XG4gICAgdGhpcy52aWV3ID0gbmV3IHZpZXdDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50cyA9IGNoaWxkQ29tcG9uZW50cyB8fCB7fTtcbn1cblBhZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgZm9yKCB2YXIgY29tcG9uZW50IGluIHRoaXMuY2hpbGRDb21wb25lbnRzICl7XG4gICAgICAgIHRoaXMuY2hpbGRDb21wb25lbnRzW2NvbXBvbmVudF0uaW5pdCgpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmN0cmwuaW5pdCgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIHRoYXQudmlldy5pbml0LmFwcGx5KHRoYXQudmlldywgYXJndW1lbnRzKTtcbiAgICB9KVxuICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbn07XG5cbmZ1bmN0aW9uIFBhZ2VDdHJsKHBhZ2Upe1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG59XG5QYWdlQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIFBhZ2VWaWV3KHBhZ2Upe1xuICAgIHRoaXMucGFnZSA9IHBhZ2U7XG59XG5QYWdlVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe307IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBNZW51SXRlbShkYXRhKXtcbiAgICB0aGlzLmxhYmVsID0gZGF0YS5sYWJlbHx8Jyc7XG4gICAgdGhpcy5jbGFzcyA9IGRhdGEuY2xhc3N8fCcnO1xuICAgIHRoaXMuYWN0aW9uID0gZGF0YS5hY3Rpb258fHRoaXMuYWN0aW9uO1xuICAgIHRoaXMucmVuZGVyID0gZGF0YS5yZW5kZXJ8fHRoaXMucmVuZGVyO1xufVxuTWVudUl0ZW0ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xuICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gJyt0aGlzLmNsYXNzKycgYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLWJsb2NrXCI+Jyt0aGlzLmxhYmVsKyc8L2J1dHRvbj4nKS5wcm9taXNlKCk7XG59O1xuTWVudUl0ZW0ucHJvdG90eXBlLmFjdGlvbiA9IGZ1bmN0aW9uIChlKXt9O1xuXG5mdW5jdGlvbiBNZW51Q29tcG9uZW50KGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJChkYXRhLmVsZW1lbnQpWzBdLCBNZW51Q3RybCwgTWVudVZpZXcpO1xufVxuTWVudUNvbXBvbmVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbk1lbnVDb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWVudUNvbXBvbmVudDtcblxuZnVuY3Rpb24gTWVudUN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbk1lbnVDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbk1lbnVDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVDdHJsO1xuTWVudUN0cmwucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2FwaS9sb2dvdXQnXG4gICAgfSkudGhlbihkZWZlci5yZXNvbHZlKS5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5cbmZ1bmN0aW9uIE1lbnVWaWV3KHBhZ2Upe1xuICAgIHZhciB2aWV3ID0gdGhpcztcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIFxuICAgIHRoaXMucHJvZmlsZU1lbnVJdGVtcyA9IFt7XG4gICAgICAgIGNsYXNzOiAnaG9tZScsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9tYWluJztcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gaG9tZSBmYSBmYS1ob21lIGJ0biBidG4tc2Vjb25kYXJ5XCI+PC9idXR0b24+JykucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBjbGFzczogJ3Byb2ZpbGUnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvcHJvZmlsZSc7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS91c2VyJyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpe1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoJzxkaXYgY2xhc3M9XCJwcm9maWxlXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxpbWcgY2xhc3M9XCJwcm9maWxlLWltZ1wiIHNyYz1cImh0dHBzOi8vcGxhY2Vob2xkLml0LzE1MHgxNTBcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByb2ZpbGUtbmFtZVwiPicrdXNlci51c2VybmFtZSsnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JykucHJvbWlzZSgpO1xuICAgICAgICAgICAgfSkuZmFpbChkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfV0ubWFwKGZ1bmN0aW9uIChpdGVtKXtyZXR1cm4gbmV3IE1lbnVJdGVtKGl0ZW0pfSk7XG4gICAgXG4gICAgdGhpcy5tYWluTWVudUl0ZW1zID0gW3tcbiAgICAgICAgbGFiZWw6ICdCYW5kcycsXG4gICAgICAgIGNsYXNzOiAnYmFuZHMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXsgXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdGcmllbmRzJyxcbiAgICAgICAgY2xhc3M6ICdmcmllbmRzJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMnOyBcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdOb3RpZmljYXRpb25zJyxcbiAgICAgICAgY2xhc3M6ICdub3RpZmljYXRpb25zJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL25vdGlmaWNhdGlvbnMnO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnL2FwaS9ub3RpZmljYXRpb25zP3VucmVhZCZjb3VudCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJhY3Rpb24gJytpdGVtLmNsYXNzKycgYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLWJsb2NrXCI+JytpdGVtLmxhYmVsKycgPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLXByaW1hcnlcIj4nKyhkYXRhLmNvdW50fHwwKSsnPC9zcGFuPjwvYnV0dG9uPicpOyBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBsYWJlbDogJ0xvZ291dCcsXG4gICAgICAgIGNsYXNzOiAnbG9nb3V0JyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5sb2dvdXQoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG4gICAgICAgICAgICB9KS5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICAgICAgfVxuICAgIH1dLm1hcChmdW5jdGlvbiAoaXRlbSl7cmV0dXJuIG5ldyBNZW51SXRlbShpdGVtKX0pO1xuICAgIFxuICAgIHRoaXMuYmFuZFByb2ZpbGVJdGVtcyA9IFt7XG4gICAgICAgIGNsYXNzOiAnYmFuZC1wcm9maWxlJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAvL3JldHVybiAnPGRpdiBjbGFzcz1cImJhbmQtcHJvZmlsZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKGh0dHBzOi8vcGxhY2Vob2xkLml0LzI0MHgxNTApXCI+JysrJzwvZGl2PidcbiAgICAgICAgICAgIHZhciBsb2MgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrbG9jW2xvYy5pbmRleE9mKCdiYW5kcycpKzFdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGJhbmQpe1xuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoJzxkaXYgY2xhc3M9XCJiYW5kLXByb2ZpbGVcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL3BsYWNlaG9sZC5pdC8yNDB4MTUwKVwiPicrYmFuZC5iYW5kTmFtZSsnPC9kaXY+Jyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICB9XS5tYXAoZnVuY3Rpb24gKGl0ZW0pe3JldHVybiBuZXcgTWVudUl0ZW0oaXRlbSl9KTtcbiAgICBcbiAgICB0aGlzLmJhbmRNZW51SXRlbXMgPSBbe1xuICAgICAgICBsYWJlbDogJ1NldCBMaXN0cycsXG4gICAgICAgIGNsYXNzOiAnc2V0bGlzdHMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdzZXRsaXN0cycpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnU29uZ3MnLFxuICAgICAgICBjbGFzczogJ3NvbmdzJyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmNvbmNhdCgnc29uZ3MnKS5qb2luKCcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBsYWJlbDogJ0ludmVudG9yeScsXG4gICAgICAgIGNsYXNzOiAnaW52ZW50b3J5JyxcbiAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgbmV3UGF0aCA9IG5ld1BhdGguc2xpY2UoMCwgbmV3UGF0aC5pbmRleE9mKCdiYW5kcycpKzIpLmNvbmNhdCgnaW52ZW50b3J5Jykuam9pbignLycpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdTdG9yZScsXG4gICAgICAgIGNsYXNzOiAnc3RvcmUnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdzdG9yZScpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGxhYmVsOiAnRXZlbnRzJyxcbiAgICAgICAgY2xhc3M6ICdldmVudHMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdldmVudHMnKS5qb2luKCcvJyk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBuZXdQYXRoO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBsYWJlbDogJ01lbWJlcnMnLFxuICAgICAgICBjbGFzczogJ21lbWJlcnMnLFxuICAgICAgICBhY3Rpb246IGZ1bmN0aW9uIChlKXtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICBuZXdQYXRoID0gbmV3UGF0aC5zbGljZSgwLCBuZXdQYXRoLmluZGV4T2YoJ2JhbmRzJykrMikuY29uY2F0KCdtZW1iZXJzJykuam9pbignLycpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbmV3UGF0aDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICdNYW5hZ2UnLFxuICAgICAgICBjbGFzczogJ21hbmFnZScsXG4gICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKGUpe1xuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgIG5ld1BhdGggPSBuZXdQYXRoLnNsaWNlKDAsIG5ld1BhdGguaW5kZXhPZignYmFuZHMnKSsyKS5jb25jYXQoJ21hbmFnZScpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5ld1BhdGg7XG4gICAgICAgIH1cbiAgICB9XS5tYXAoZnVuY3Rpb24gKGl0ZW0pe3JldHVybiBuZXcgTWVudUl0ZW0oaXRlbSl9KTtcbn1cbk1lbnVWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbk1lbnVWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE1lbnVWaWV3O1xuTWVudVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgdmlldy5tZW51QnV0dG9uQ29udGFpbmVyID0gJCh2aWV3LnBhZ2UuZWxlbSk7XG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lciA9ICQoJyNtZW51T3ZlcmxheScpO1xuICAgIHZpZXcucmVuZGVyTWVudSgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIHZpZXcuYmluZEV2ZW50cygpO1xuICAgIH0pO1xufTtcbk1lbnVWaWV3LnByb3RvdHlwZS5yZW5kZXJNZW51ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHZpZXcgPSB0aGlzLFxuICAgICAgICBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgXG4gICAgLyogcmVuZGVyIG92ZXJsYXkgKi9cbiAgICBpZiggdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5sZW5ndGggPT0gMCApe1xuICAgICAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwibWVudU92ZXJsYXlcIiBjbGFzcz1cImhpZGRlblwiPjwvZGl2PicpO1xuICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyID0gJChcIiNtZW51T3ZlcmxheVwiKTtcbiAgICB9XG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5lbXB0eSgpO1xuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibWVudVwiPjwvZGl2PicpO1xuICAgIFxuICAgIC8vZGVmaW5lIHRoZSByZWN1cnNpdmUgYXN5bmNocm9ub3VzIHJlbmRlcmluZyBmdW5jdGlvblxuICAgIGZ1bmN0aW9uIG5leHRJdGVtKHBhcmVudCwgaXRlbXMsIGluZGV4KXtcbiAgICAgICAgaWYoIGluZGV4ID49IGl0ZW1zLmxlbmd0aCApe1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgXG4gICAgICAgIC8vYnVpbGQgdGhlIGh0bWwgZm9yIHRoaXMgaXRlbVxuICAgICAgICBpdGVtc1tpbmRleF0ucmVuZGVyKClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGh0bWwpe1xuICAgICAgICAgICAgLy9hZGQgdGhpcyBpdGVtIHRvIHRoZSBET01cbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmQoaHRtbCk7XG4gICAgICAgICAgICAvL3JlbmRlciB0aGUgbmV4dCBpdGVtXG4gICAgICAgICAgICBuZXh0SXRlbShwYXJlbnQsIGl0ZW1zLCBpbmRleCsxKVxuICAgICAgICAgICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAgICAgICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xuICAgIH1cbiAgICBcbiAgICB2YXIgc2hvdWxkUmVuZGVyQmFuZCA9IGZhbHNlO1xuICAgIHZhciBzcGxpdExvYyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgIHZhciBiYW5kSWQgPSBzcGxpdExvY1tzcGxpdExvYy5pbmRleE9mKCdiYW5kcycpKzFdO1xuICAgIGlmKCBiYW5kSWQgIT09IHVuZGVmaW5lZCAmJiAhaXNOYU4ocGFyc2VJbnQoYmFuZElkKSkgKXtcbiAgICAgICAgc2hvdWxkUmVuZGVyQmFuZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8vcmVuZGVyIHByb2ZpbGUgY2h1bmtcbiAgICB2YXIgcGFyZW50ID0gJCgnPGRpdiBjbGFzcz1cIm1lbnUtc2VjdGlvbiBjb250YWluZXIgcHJvZmlsZS1zZWN0aW9uIGNsZWFyZml4XCI+PC9kaXY+Jyk7XG4gICAgbmV4dEl0ZW0ocGFyZW50LCB2aWV3LnByb2ZpbGVNZW51SXRlbXMsIDApXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIC8vYWRkIHRoZSBwYXJlbnQgdG8gdGhlIERPTVxuICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKHBhcmVudCk7XG4gICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICB2aWV3LnByb2ZpbGVNZW51SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy4nK2l0ZW0uY2xhc3MsIGl0ZW0uYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vcmVuZGVyIG1haW4gbWVudSBjaHVua1xuICAgICAgICBwYXJlbnQgPSAkKCc8ZGl2IGNsYXNzPVwibWVudS1zZWN0aW9uIGNvbnRhaW5lciBjbGVhcmZpeFwiPjwvZGl2PicpO1xuICAgICAgICByZXR1cm4gbmV4dEl0ZW0ocGFyZW50LCB2aWV3Lm1haW5NZW51SXRlbXMsIDApO1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgIC8vYWRkIHRoZSBwYXJlbnQgdG8gdGhlIERPTVxuICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51JykuYXBwZW5kKHBhcmVudCk7XG4gICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICB2aWV3Lm1haW5NZW51SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSl7XG4gICAgICAgICAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy4nK2l0ZW0uY2xhc3MsIGl0ZW0uYWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL3JlbmRlciBiYW5kIHByb2ZpbGUgYmxvY2tcbiAgICAgICAgcGFyZW50ID0gJCgnPGRpdiBjbGFzcz1cIm1lbnUtc2VjdGlvbiBiYW5kLXByb2ZpbGUtc2VjdGlvbiBjbGVhcmZpeFwiPjwvZGl2PicpO1xuICAgICAgICBpZiggc2hvdWxkUmVuZGVyQmFuZCApe1xuICAgICAgICAgICAgcmV0dXJuIG5leHRJdGVtKHBhcmVudCwgdmlldy5iYW5kUHJvZmlsZUl0ZW1zLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgLy9hZGQgdGhlIHBhcmVudCB0byB0aGUgRE9NXG4gICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQocGFyZW50KTtcbiAgICAgICAgaWYoIHNob3VsZFJlbmRlckJhbmQgKXtcbiAgICAgICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICAgICAgdmlldy5iYW5kUHJvZmlsZUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5vbignY2xpY2snLCAnLicraXRlbS5jbGFzcywgaXRlbS5hY3Rpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZW5kZXIgYmFuZCBpdGVtc1xuICAgICAgICBwYXJlbnQgPSAkKCc8ZGl2IGNsYXNzPVwibWVudS1zZWN0aW9uIGNvbnRhaW5lciBjbGVhcmZpeFwiPjwvZGl2PicpO1xuICAgICAgICBpZiggc2hvdWxkUmVuZGVyQmFuZCApe1xuICAgICAgICAgICAgcmV0dXJuIG5leHRJdGVtKHBhcmVudCwgdmlldy5iYW5kTWVudUl0ZW1zLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgLy9hZGQgdGhlIHBhcmVudCB0byB0aGUgRE9NXG4gICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5hcHBlbmQocGFyZW50KTtcbiAgICAgICAgaWYoIHNob3VsZFJlbmRlckJhbmQgKXtcbiAgICAgICAgICAgIC8vYmluZCBwcm9maWxlIGV2ZW50c1xuICAgICAgICAgICAgdmlldy5iYW5kTWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuZmluZCgnLm1lbnUnKS5vbignY2xpY2snLCAnLicraXRlbS5jbGFzcywgaXRlbS5hY3Rpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qIHJlbmRlciBtZW51IGJ1dHRvbiAqL1xuICAgICAgICB2aWV3Lm1lbnVCdXR0b25Db250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgdmlldy5tZW51QnV0dG9uQ29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1lbnUtdG9nZ2xlIGJ0biBidG4tc2Vjb25kYXJ5IGZhIGZhLWJhcnNcIj48L2Rpdj4nKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUuZXJyb3IpO1xuXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5NZW51Vmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICB2aWV3ID0gdGhpcztcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLm1lbnUtdG9nZ2xlJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5vbignY2xpY2snLCAnLm1lbnUnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBcbiAgICB2aWV3Lm1lbnVPdmVybGF5Q29udGFpbmVyLmZpbmQoJy5tZW51Jykub24oJ2NsaWNrJywgJy5ob21lJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL21haW4nO1xuICAgIH0pO1xuICAgIFxuICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2aWV3LnZpc2libGUgPSAhdmlldy52aXNpYmxlO1xuICAgICAgICBcbiAgICAgICAgaWYoIHZpZXcudmlzaWJsZSApe1xuICAgICAgICAgICAgdmlldy5tZW51T3ZlcmxheUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcubWVudU92ZXJsYXlDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgRnJpZW5kICovXG5cbmZ1bmN0aW9uIEFkZEZyaWVuZFBhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYWRkRnJpZW5kUGFnZScpWzBdLCBBZGRGcmllbmRDdHJsLCBBZGRGcmllbmRWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5BZGRGcmllbmRQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkRnJpZW5kUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRGcmllbmRQYWdlO1xuXG5mdW5jdGlvbiBBZGRGcmllbmRDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5mcmllbmRzID0gW107XG59XG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFkZEZyaWVuZEN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kQ3RybDtcblxuQWRkRnJpZW5kQ3RybC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKGZvcm0pe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3NlYXJjaCcsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmZyaWVuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuLy8gVGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgdGhlIHJlbGF0aW9uIGJldHdlZW4gdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhlIFwidG9cIiB1c2VyXG5BZGRGcmllbmRDdHJsLnByb3RvdHlwZS51cGRhdGVTdGF0dXMgPSBmdW5jdGlvbiAodG9Vc2VySWQsIHN0YXR1cyl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvZnJpZW5kcy91cGRhdGVzdGF0dXMnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHt0b1VzZXJJZCA6IHRvVXNlcklkLCBzdGF0dXMgOiBzdGF0dXN9XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBBZGRGcmllbmRWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQWRkRnJpZW5kVmlldztcbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXsgICBcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQ7XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXlwcmVzcycsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgdGhpc0Zvcm0gPSAkKHRoaXMpO1xuICAgICAgICBjbGVhclRpbWVvdXQocGFnZS52aWV3LnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICBwYWdlLnZpZXcuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpc0Zvcm0uc3VibWl0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBTdWJtaXR0aW5nIHRoZSBzZWFyY2ggc3RyaW5nXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtLnNlYXJjaC11c2VyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5zZWFyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcGFnZS52aWV3LnVwZGF0ZVVzZXJMaXN0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZnJpZW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0ZyaWVuZE1vZGFsKHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1mcmllbmQtaWQnKSwgMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTsgIFxuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBibG9jayByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5CbG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5CTE9DS0VEKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIHVuYmxvY2sgcmVxdWVzdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5ibG9ja01vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC11c2VyJykuc3VibWl0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGNhbmNlbCByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5DYW5jZWxSZXF1ZXN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ2Zvcm0uc2VhcmNoLXVzZXInKS5zdWJtaXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZnJpZW5kIGFjY2VwdFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQWNjZXB0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLkZSSUVORClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgcmVqZWN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5SZWplY3RNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSB1bmZyaWVuZFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybS5zZWFyY2gtdXNlcicpLnN1Ym1pdCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFkZEZyaWVuZFZpZXcucHJvdG90eXBlLnVwZGF0ZVVzZXJMaXN0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGZyaWVuZHNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmZyaWVuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gc3RhdHVzXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2ZyaWVuZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLXN1Y2Nlc3MnO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtaW5mbyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtd2FybmluZyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ2Jsb2NrZWQnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1kYW5nZXInO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggdXNlclxuICAgICAgICBmcmllbmRzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8ZGl2IGNsYXNzPVwiZnJpZW5kIGNhcmQgJytjYXJkQ29sb3IrJ1wiIGRhdGEtZnJpZW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLmlkKydcIj4nK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJkLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAnPGg0IGNsYXNzPVwiY2FyZC10aXRsZVwiPicrdGhpcy5wYWdlLmN0cmwuZnJpZW5kc1tpXS51c2VyTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICc8L2g0PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgJzwvZGl2PjxwLz4nKTtcbiAgICB9XG59O1xuXG5BZGRGcmllbmRWaWV3LnByb3RvdHlwZS5zaG93RnJpZW5kTW9kYWwgPSBmdW5jdGlvbiAoZnJpZW5kSWQpe1xuICAgIHZhciB0aGlzRnJpZW5kID0gdGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24gKGZyaWVuZCl7XG4gICAgICAgIHJldHVybiBmcmllbmQuaWQgPT0gZnJpZW5kSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucztcbiAgICAgICAgXG4gICAgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5VbmZyaWVuZE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWwgbXItMlwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blJlamVjdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FkZE1lcmNoUGFnZScpWzBdLCBBZGRNZXJjaEN0cmwsIEFkZE1lcmNoVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQWRkTWVyY2hQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuQWRkTWVyY2hQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZE1lcmNoUGFnZTtcblxuLyoqXG4gKiBDT05UUk9MTEVSXG4gKiAqL1xuZnVuY3Rpb24gQWRkTWVyY2hDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG5cbiAgICB0aGlzLmJhbmRJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJlZHVjZShmdW5jdGlvbiAodmFsLCBjaHVuaywgaW5kZXgsIGFycil7XG4gICAgICAgIHJldHVybiB2YWwgfHwgKGNodW5rID09ICdiYW5kcycgPyBhcnJbaW5kZXgrMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sIHVuZGVmaW5lZCk7XG59XG5BZGRNZXJjaEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQWRkTWVyY2hDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFkZE1lcmNoQ3RybDtcblxuQWRkTWVyY2hDdHJsLnByb3RvdHlwZS5zdWJtaXRNZXJjaCA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytpZCsnL2FkZG1lcmNoJyxcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIEFkZE1lcmNoVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcbkFkZE1lcmNoVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBZGRNZXJjaFZpZXc7XG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCdbbmFtZT1cImFkZFNpemVcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xufTtcblxuQWRkTWVyY2hWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnW25hbWU9XCJhZGRTaXplXCJdJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2VsZWN0ID0gcGFnZUVsZW0uZmluZCgnW25hbWU9XCJtZXJjaFR5cGVcIl0nKTtcbiAgICAgICAgcGFnZS52aWV3LmFkZFNpemVGaWVsZChzZWxlY3RbMF0udmFsdWUpO1xuICAgIH0pO1xuXG4gICAgLy8gV2UndmUgcGlja2VkIGEgdHlwZSBzbyBlbmFibGUgdGhlIEFkZCBJbnZlbnRvcnkgYnV0dG9uIGFuZCByZW1vdmUgYW55IGV4aXN0aW5nIGZpZWxkcyBmcm9tIG90aGVyIHR5cGVzXG4gICAgcGFnZUVsZW0ub24oJ2NoYW5nZScsICdbbmFtZT1cIm1lcmNoVHlwZVwiXScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHBhZ2VFbGVtLmZpbmQoJy5keW5hbWljRmllbGRzJykucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHNlbGVjdCA9IHBhZ2VFbGVtLmZpbmQoJ1tuYW1lPVwibWVyY2hUeXBlXCJdJyk7XG4gICAgICAgIC8vIE9ubHkgbGV0IHRoZSB1c2VyIGFkZCBzaXplcyBpZiB0aGV5IGFyZSBjaG9vc2luZyBhIHNoaXJ0IG9yIHN0aWNrZXJcbiAgICAgICAgaWYgKHNlbGVjdFswXS52YWx1ZSA9PT0gJ1NoaXJ0JyB8fCBzZWxlY3RbMF0udmFsdWUgPT09ICdTdGlja2VyJyl7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdbbmFtZT1cImFkZFNpemVcIl0nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhZ2VFbGVtLmZpbmQoJ1tuYW1lPVwiYWRkU2l6ZVwiXScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFnZS52aWV3LmFkZFNpemVGaWVsZChzZWxlY3RbMF0udmFsdWUpOyAgICAgICBcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBwYWdlLmN0cmwuc3VibWl0TWVyY2godGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLi4vJytwYWdlLmN0cmwuYmFuZElkKycvaW52ZW50b3J5JztcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5BZGRNZXJjaFZpZXcucHJvdG90eXBlLmFkZFNpemVGaWVsZCA9IGZ1bmN0aW9uICh0eXBlKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIHR5cGVGaWVsZHMgPSAnJztcblxuICAgIGlmICh0eXBlID09PSAnU2hpcnQnKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIlNcIj5TPC9vcHRpb24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiTVwiPk08L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJMXCI+TDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIlhMXCI+WEw8L29wdGlvbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9zZWxlY3Q+JztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdDRCcpIHtcbiAgICAgICAgdHlwZUZpZWxkcyA9ICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwic2l6ZVwiIHZhbHVlPVwibm9uZVwiIC8+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ1N0aWNrZXInKSB7XG4gICAgICAgIHR5cGVGaWVsZHMgPSAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgcmVxdWlyZWQgbmFtZT1cInNpemVcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gZGlzYWJsZWQgc2VsZWN0ZWQ+U2VsZWN0IGEgc2l6ZTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjF4MVwiPjF4MTwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjJ4MlwiPjJ4Mjwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjN4NFwiPjN4NDwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPG9wdGlvbiB2YWx1ZT1cIjV4NlwiPjV4Njwvb3B0aW9uPicrXG4gICAgICAgICAgICAgICAgICAgICc8L3NlbGVjdD4nO1xuICAgIH1cblxuICAgIC8vIEFsbCB0eXBlcyB3aWxsIGhhdmUgYSBxdWFudGl0eSBhbmQgY29sb3JcbiAgICB0eXBlRmllbGRzICs9ICc8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZHluYW1pY0ZpZWxkc1wiIHJlcXVpcmVkIHR5cGU9XCJudW1iZXJcIiBuYW1lPVwicXVhbnRpdHlcIiBtaW49XCIwXCIgc3RlcD1cIjFcIiBwbGFjZWhvbGRlcj1cIlF1YW50aXR5XCI+JztcblxuICAgIHZhciB0eXBlRmllbGRzRGl2ID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmR5bmFtaWNGaWVsZHNDb250YWluZXInKTtcbiAgICB0eXBlRmllbGRzRGl2LmFwcGVuZCh0eXBlRmllbGRzKTtcbn0iLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgTWVudUNvbXBvbmVudCAqL1xuLyogZ2xvYmFsIEFwcGxpY2F0aW9uICovXG4vKiBnbG9iYWwgQmFuZE1lbWJlciAqL1xuXG5mdW5jdGlvbiBBcHBsaWNhdGlvbnNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2FwcGxpY2F0aW9uc1BhZ2UnKVswXSwgQXBwbGljYXRpb25zQ3RybCwgQXBwbGljYXRpb25zVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuQXBwbGljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zUGFnZTtcblxuZnVuY3Rpb24gQXBwbGljYXRpb25zQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuYXBwbGljYXRpb25zID0gW107XG59XG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQXBwbGljYXRpb25zQ3RybDtcbkFwcGxpY2F0aW9uc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KCcvYXBpL2JhbmRzLycraWQrJy9hcHBsaWNhdGlvbnMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5hcHBsaWNhdGlvbnMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcblxuICAgICQuYWpheCgnL2FwaS9iYW5kcy8nK2lkKycvcm9sZScsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICB0aGF0LmJhbmRNZW1iZXJSb2xlID0gZGF0YS5yb2xlO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTsgIFxuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5wcm9jZXNzQXBwbGljYXRpb24gPSBmdW5jdGlvbiAoYXBwbGljYXRpb25JZCwgcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMpIHtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytpZCsnL3Byb2Nlc3NhcHBsaWNhdGlvbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge2FwcGxpY2F0aW9uSWQgOiBhcHBsaWNhdGlvbklkLCBwcm9jZXNzU3RhdHVzIDogcHJvY2Vzc1N0YXR1cywgYXBwbGljYXRpb25TdGF0dXMgOiBhcHBsaWNhdGlvblN0YXR1c31cbiAgICB9KS50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEFwcGxpY2F0aW9uc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbn1cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBcHBsaWNhdGlvbnNWaWV3O1xuQXBwbGljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBhcHBsaWNhdGlvbnNFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmFwcGxpY2F0aW9ucycpO1xuICAgIHZhciBiYWRnZSA9ICcnO1xuXG4gICAgZm9yKCB2YXIgaT0wOyBpPHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9ucy5sZW5ndGg7IGkrKyApe1xuICAgICAgICBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfTUFOQUdFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1hbmFnZXInO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmFwcGxpY2F0aW9uc1tpXS5zdGF0dXMgPT09IEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX01FTUJFUikge1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPk1lbWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cyA9PT0gQXBwbGljYXRpb24uU1RBVFVTLkFQUExJRURfUFJPTU9URVIpIHtcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj5Qcm9tb3Rlcic7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBsaWNhdGlvbnNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImFwcGxpY2F0aW9uIGJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1hcHBsaWNhdGlvbi1pZD1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLmlkKydcIiBkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cz1cIicrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLnN0YXR1cysnXCI+Jyt0aGlzLnBhZ2UuY3RybC5hcHBsaWNhdGlvbnNbaV0udXNlcm5hbWUrJyA8c21hbGw+KCcrdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zW2ldLm5hbWUrJyk8L3NtYWxsPicrYmFkZ2UrJzwvZGl2PjxwLz4nKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5BcHBsaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYXBwbGljYXRpb24nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93QXBwbGljYXRpb25Nb2RhbChwYXJzZUludCgkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksMTApLHBhcnNlSW50KCQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtYXBwbGljYXRpb24tc3RhdHVzJyksMTApKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BY2NlcHQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5BQ0NFUFRFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmcmllbmQgYWNjZXB0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5SZWplY3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBhcHBsaWNhdGlvbklkID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLWlkJyksIDEwKTtcbiAgICAgICAgdmFyIGFwcGxpY2F0aW9uU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwucHJvY2Vzc0FwcGxpY2F0aW9uKGFwcGxpY2F0aW9uSWQsIEFwcGxpY2F0aW9uLlNUQVRVUy5SRUpFQ1RFRCwgYXBwbGljYXRpb25TdGF0dXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbkFwcGxpY2F0aW9uc1ZpZXcucHJvdG90eXBlLnNob3dBcHBsaWNhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGFwcGxpY2F0aW9uSWQsIGFwcGxpY2F0aW9uU3RhdHVzKXtcbiAgICB2YXIgdGhpc0FwcGxpY2F0aW9uID0gdGhpcy5wYWdlLmN0cmwuYXBwbGljYXRpb25zLmZpbHRlcihmdW5jdGlvbiAoYXBwbGljYXRpb24pe1xuICAgICAgICByZXR1cm4gYXBwbGljYXRpb24uaWQgPT0gYXBwbGljYXRpb25JZDtcbiAgICB9KVswXTtcbiAgICBcbiAgICB2YXIgbW9kYWxCdXR0b25zID0gJyc7XG5cbiAgICBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZE1lbWJlclJvbGUgPT09IEJhbmRNZW1iZXIuUk9MRS5PV05FUiB8fCB0aGlzLnBhZ2UuY3RybC5iYW5kTWVtYmVyUm9sZSA9PT0gQmFuZE1lbWJlci5ST0xFLk1BTkFHRVIpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gICc8YnV0dG9uIGlkPVwiYnRuQWNjZXB0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5BY2NlcHQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5SZWplY3RcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+UmVqZWN0PC9idXR0b24+JztcbiAgICB9XG5cbiAgICB2YXIgYXBwbGljYXRpb25Nb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5hcHBsaWNhdGlvbi1tb2RhbCcpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1hcHBsaWNhdGlvbi1pZCcsIHRoaXNBcHBsaWNhdGlvbi5pZCk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcubW9kYWwnKS5hdHRyKCdkYXRhLWFwcGxpY2F0aW9uLXN0YXR1cycsIHRoaXNBcHBsaWNhdGlvbi5zdGF0dXMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCh0aGlzQXBwbGljYXRpb24ubmFtZSsnIC0gJyt0aGlzQXBwbGljYXRpb24udXNlcm5hbWUpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD5JbnN0cnVtZW50OiAnK3RoaXNBcHBsaWNhdGlvbi5pbnN0cnVtZW50Kyc8L3A+PHA+TWVzc2FnZTogJyt0aGlzQXBwbGljYXRpb24ubWVzc2FnZSk7XG4gICAgYXBwbGljYXRpb25Nb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGFwcGxpY2F0aW9uTW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBCYW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjYmFuZHNQYWdlJylbMF0sIEJhbmRzQ3RybCwgQmFuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5CYW5kc1BhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5CYW5kc1BhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmFuZHNQYWdlO1xuXG5mdW5jdGlvbiBCYW5kc0N0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmJhbmRzID0gW107XG59XG5CYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzQ3RybDtcbkJhbmRzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5hamF4KCcvYXBpL2JhbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgIHRoYXQuYmFuZHMgPSBkYXRhO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gQmFuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5CYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJhbmRzVmlldztcbkJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgYmFuZHNFbGVtLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJhbmQgYnRuIGJ0bi1zZWNvbmRhcnlcIiBkYXRhLWJhbmQtaWQ9Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYmFuZE5hbWUrJyA8c21hbGw+KG93bmVkIGJ5OiAnK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLm93bmVyTmFtZSsnKTwvc21hbGw+PC9kaXY+Jyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5yZWdpc3Rlci1iYW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzL3JlZ2lzdGVyJztcbiAgICB9KTtcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJhbmQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvJyArICQodGhpcykuYXR0cignZGF0YS1iYW5kLWlkJyk7XG4gICAgfSk7XG59O1xuIiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBTZXRMaXN0ICovXG5cbmZ1bmN0aW9uIEVkaXRTZXRMaXN0UGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNlZGl0U2V0TGlzdFBhZ2UnKVswXSwgRWRpdFNldExpc3RDdHJsLCBFZGl0U2V0TGlzdFZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbkVkaXRTZXRMaXN0UGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkVkaXRTZXRMaXN0UGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFZGl0U2V0TGlzdFBhZ2U7XG5cbmZ1bmN0aW9uIEVkaXRTZXRMaXN0Q3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuc2V0TGlzdCA9IG5ldyBTZXRMaXN0KHtcbiAgICAgICAgaWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJlZHVjZShmdW5jdGlvbiAodmFsLCBjaHVuaywgaW5kZXgsIGFycil7XG4gICAgICAgICAgICByZXR1cm4gdmFsIHx8IChjaHVuayA9PSAnc2V0bGlzdHMnID8gKGFycltpbmRleCsxXSA9PT0gJ25ldycgPyB1bmRlZmluZWQgOiBhcnJbaW5kZXgrMV0gKSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCksXG4gICAgICAgIGJhbmRJZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykucmVkdWNlKGZ1bmN0aW9uICh2YWwsIGNodW5rLCBpbmRleCwgYXJyKXtcbiAgICAgICAgICAgIHJldHVybiB2YWwgfHwgKGNodW5rID09ICdiYW5kcycgPyBhcnJbaW5kZXgrMV0gOiB1bmRlZmluZWQpO1xuICAgICAgICB9LCB1bmRlZmluZWQpXG4gICAgfSk7XG59XG5FZGl0U2V0TGlzdEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuRWRpdFNldExpc3RDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVkaXRTZXRMaXN0Q3RybDtcblxuZnVuY3Rpb24gRWRpdFNldExpc3RWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5FZGl0U2V0TGlzdFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuRWRpdFNldExpc3RWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVkaXRTZXRMaXN0VmlldztcbkVkaXRTZXRMaXN0Vmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5FZGl0U2V0TGlzdFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pO1xufTtcblxuRWRpdFNldExpc3RWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gdGhpcy5wYWdlLmVsZW07XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgVXNlciAqL1xuLyogZ2xvYmFsIEV2ZW50ICovXG5cbmZ1bmN0aW9uIEV2ZW50c1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjZXZlbnRzUGFnZScpWzBdLCBFdmVudHNDdHJsLCBFdmVudHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5FdmVudHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuRXZlbnRzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudHNQYWdlO1xuXG5mdW5jdGlvbiBFdmVudHNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5tZW1iZXJzID0gW107XG4gICAgdGhpcy5ldmVudHMgPSBbXTtcbiAgICB0aGlzLmJhbmRJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJlZHVjZShmdW5jdGlvbiAodmFsLCBjaHVuaywgaW5kZXgsIGFycil7XG4gICAgICAgIHJldHVybiB2YWwgfHwgKGNodW5rID09ICdiYW5kcycgPyBhcnJbaW5kZXgrMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sIHVuZGVmaW5lZCk7XG59XG5FdmVudHNDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkV2ZW50c0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXZlbnRzQ3RybDtcbkV2ZW50c0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytjdHJsLmJhbmRJZCsnL21lbWJlcnMnLFxuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAobWVtYmVycyl7XG4gICAgICAgIGN0cmwubWVtYmVycyA9IG1lbWJlcnMubWFwKGZ1bmN0aW9uICh1c2VyKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVXNlcih1c2VyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL2dldCBldmVudHNcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9ldmVudHMnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uIChldmVudHMpe1xuICAgICAgICBjdHJsLmV2ZW50cyA9IGV2ZW50cy5tYXAoZnVuY3Rpb24gKGV2ZW50KXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXZlbnQoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5FdmVudHNDdHJsLnByb3RvdHlwZS5zYXZlRXZlbnQgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciBjdHJsID0gdGhpcztcbiAgICBcbiAgICB2YXIgbW9kaWZpZWRGb3JtID0gJC5jbG9uZShmb3JtKTtcbiAgICAvL3JlbW92ZSB0aGUgdW5jaGVja2VkIG1lbWJlcnMgZnJvbSB0aGUgZm9ybSBiZWZvcmUgd2Ugc2VyaWFsaXplXG4gICAgJChtb2RpZmllZEZvcm0pLmZpbmQoJy5tZW1iZXItY2hlY2stbGFiZWwgaW5wdXQ6bm90KDpjaGVja2VkKScpLnJlbW92ZSgpO1xuICAgIC8vc2VyaWFsaXplXG4gICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKG1vZGlmaWVkRm9ybSk7XG4gICAgXG4gICAgLy9kZXRlcm1pbmUgaWYgd2UncmUgZWRpdGluZyBvciBjcmVhdGluZ1xuICAgIHZhciB1cmwsIG1ldGhvZDtcbiAgICBpZiggJChtb2RpZmllZEZvcm0pLmZpbmQoJ1tuYW1lPWV2ZW50LWlkXScpLnZhbCgpICE9PSAnJyApe1xuICAgICAgICB1cmwgPSAnL2FwaS9iYW5kcy8nK2N0cmwuYmFuZElkKycvZXZlbnRzLycrJChtb2RpZmllZEZvcm0pLmZpbmQoJ1tuYW1lPWV2ZW50LWlkXScpLnZhbCgpO1xuICAgICAgICBtZXRob2QgPSAnUFVUJztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdXJsID0gJy9hcGkvYmFuZHMvJytjdHJsLmJhbmRJZCsnL2V2ZW50cyc7XG4gICAgICAgIG1ldGhvZCA9ICdQT1NUJztcbiAgICB9XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHR5cGU6IG1ldGhvZCxcbiAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcbkV2ZW50c0N0cmwucHJvdG90eXBlLmRlbGV0ZUV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50SWQpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLyR7Y3RybC5iYW5kSWR9L2V2ZW50cy8nK2V2ZW50SWQsXG4gICAgICAgIHR5cGU6ICdERUxFVEUnXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuRXZlbnRzQ3RybC5wcm90b3R5cGUubm90aWZ5TWVtYmVycyA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJyt0aGlzLmJhbmRJZCsnL2V2ZW50cy8nKyQoZm9ybSkuZmluZCgnW25hbWU9ZXZlbnQtaWRdJykudmFsKCkrJy9ub3RpZnknLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBFdmVudHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5ldmVudE1lbWJlcnMgPSBbXTtcbn1cbkV2ZW50c1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuRXZlbnRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudHNWaWV3O1xuRXZlbnRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5FdmVudHNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgLy9yZW5kZXIgdGhlIHNvbmdzIHRvIHRoZSBzb25nIG1vZGFsXG4gICAgdmFyIGV2ZW50c0VsZW0gPSAkKHZpZXcucGFnZS5lbGVtKS5maW5kKCcuZXZlbnQtbGlzdCcpO1xuICAgIGV2ZW50c0VsZW0uZW1wdHkoKTtcbiAgICB2aWV3LnBhZ2UuY3RybC5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQsIGluZGV4KXtcbiAgICAgICAgZXZlbnRzRWxlbS5hcHBlbmQoYFxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDovL1wiIGNsYXNzPVwiZXZlbnQgbGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cIiBkYXRhLWV2ZW50LWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDAganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0xXCI+JHtldmVudC50aXRsZX08L2g1PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYT5gKTtcbiAgICB9KTtcbn07XG5cbkV2ZW50c1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICAgICAgdmlldyA9IHRoaXM7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hZGQtZXZlbnQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcuc2hvd0V2ZW50TW9kYWwoKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmV2ZW50LW1vZGFsIC5kZWxldGUtZXZlbnQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGlmKCB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIG1vZGFsID0gJCh0aGlzKS5wYXJlbnRzKCcuZXZlbnQtbW9kYWwnKTtcbiAgICAgICAgbW9kYWwuZmluZCgnLmRlbGV0ZS1ldmVudCcpLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgZXZlbnRJZCA9IG1vZGFsLmZpbmQoJ1tuYW1lPWV2ZW50LWlkXScpLnZhbCgpLFxuICAgICAgICAgICAgZGVsZXRlUHJvbWlzZTtcbiAgICAgICAgXG4gICAgICAgIC8vanVzdCBjbG9zZSB0aGUgbW9kYWwgaWYgd2UgZG9uJ3QgaGF2ZSBhbiBpZFxuICAgICAgICBpZiggZXZlbnRJZCA9PT0gJycgKXtcbiAgICAgICAgICAgIGRlbGV0ZVByb21pc2UgPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlUHJvbWlzZSA9IHZpZXcucGFnZS5jdHJsLmRlbGV0ZUV2ZW50KGV2ZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkZWxldGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBldmVudEluZGV4ID0gdmlldy5wYWdlLmN0cmwuZXZlbnRzLnJlZHVjZShmdW5jdGlvbiAodmFsLCBldmVudCwgaW5kZXgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/IHZhbCA6IChldmVudC5pZCA9PSBldmVudElkID8gaW5kZXggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggZXZlbnRJbmRleCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuZXZlbnRzLnNwbGljZShldmVudEluZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgbW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5kZWxldGUtZXZlbnQnKS5odG1sKCdEZWxldGUgRXZlbnQnKTtcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5hbGVydCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBtb2RhbC5maW5kKCdmb3JtJykucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+VW5hYmxlIHRvIGRlbGV0ZSBldmVudCE8L3N0cm9uZz4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtb2RhbC5maW5kKCcuZGVsZXRlLWV2ZW50JykuaHRtbCgnRGVsZXRlIEV2ZW50Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuZXZlbnQtbW9kYWwgLnNhdmUtZXZlbnQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICQodGhpcykucGFyZW50cygnLmV2ZW50LW1vZGFsJykuZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xuICAgIH0pO1xuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnLmV2ZW50LW1vZGFsIGZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHZpZXcucGFnZS5jdHJsLnNhdmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgZm9ybSA9ICQodGhpcyk7XG4gICAgICAgIGZvcm0ucGFyZW50cygnLmV2ZW50LW1vZGFsJykuZmluZCgnLnNhdmUtZXZlbnQnKS5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xuICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZlRXZlbnQodGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG5ld0V2ZW50KXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGV2ZW50SW5kZXggPSB2aWV3LnBhZ2UuY3RybC5ldmVudHMucmVkdWNlKGZ1bmN0aW9uICh2YWwsIGV2ZW50LCBpbmRleCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID8gdmFsIDogKGV2ZW50LmlkID09IG5ld0V2ZW50LmlkID8gaW5kZXggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggZXZlbnRJbmRleCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuZXZlbnRzW2V2ZW50SW5kZXhdID0gbmV3IEV2ZW50KG5ld0V2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuZXZlbnRzLnB1c2gobmV3IEV2ZW50KG5ld0V2ZW50KSk7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuZXZlbnRzID0gdmlldy5wYWdlLmN0cmwuZXZlbnRzLnNvcnQoZnVuY3Rpb24gKGEsYil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLm5hbWUgPCBiLm5hbWUgPyAtMSA6IChhLm5hbWUgPiBiLm5hbWUgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcuZXZlbnQtbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcuZXZlbnQtbW9kYWwnKS5maW5kKCcuc2F2ZS1ldmVudCcpLmh0bWwoJ1NhdmUgRXZlbnQnKTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLmV2ZW50LW1vZGFsJykuZmluZCgnLmFsZXJ0JykucmVtb3ZlKCk7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+VW5hYmxlIHRvIHNhdmUgZXZlbnQhPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcuZXZlbnQtbW9kYWwnKS5maW5kKCcuc2F2ZS1ldmVudCcpLmh0bWwoJ1NhdmUgRXZlbnQnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5ldmVudC1tb2RhbCAubm90aWZ5LW1lbWJlcnMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcuc2hvd05vdGlmeU1vZGFsKCQodGhpcykucGFyZW50cygnLm1vZGFsJykuZmluZCgnW25hbWU9ZXZlbnQtaWRdJykudmFsKCkpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcubm90aWZ5LW1vZGFsIC5zZW5kLW1lc3NhZ2UnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgICQodGhpcykucGFyZW50cygnLm5vdGlmeS1tb2RhbCcpLmZpbmQoJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICB9KTtcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJy5ub3RpZnktbW9kYWwgZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggdmlldy5wYWdlLmN0cmwuc2F2aW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgZm9ybS5wYXJlbnRzKCcubm90aWZ5LW1vZGFsJykuZmluZCgnLnNlbmQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIHZpZXcucGFnZS5jdHJsLm5vdGlmeU1lbWJlcnModGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5NZXNzYWdlIFNlbnQhPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm5vdGlmeS1tb2RhbCcpLmZpbmQoJy5zZW5kLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubm90aWZ5LW1vZGFsIC5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubm90aWZ5LW1vZGFsJykuZmluZCgnLnNlbmQtbWVzc2FnZScpLmh0bWwoJ1NlbmQgTWVzc2FnZScpO1xuICAgICAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm5vdGlmeS1tb2RhbCcpLmZpbmQoJy5hbGVydCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlVuYWJsZSB0byBzZW5kIG1lc3NhZ2UhPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubm90aWZ5LW1vZGFsJykuZmluZCgnLnNlbmQtbWVzc2FnZScpLmh0bWwoJ1NlbmQgTWVzc2FnZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignaGlkZS5icy5tb2RhbCcsICcubm90aWZ5LW1vZGFsIC5tb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZUVsZW0uZmluZCgnLmV2ZW50LW1vZGFsIC5tb2RhbCcpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5ldmVudCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmlldy5zaG93RXZlbnRNb2RhbCh2aWV3LnBhZ2UuY3RybC5ldmVudHNbJCh0aGlzKS5hdHRyKCdkYXRhLWV2ZW50LWluZGV4JyldKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbigna2V5dXAnLCAnLnNlYXJjaCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgZXZlbnRFbGVtcyA9IHBhZ2VFbGVtLmZpbmQoJy5ldmVudCcpO1xuICAgICAgICB2aWV3LnBhZ2UuY3RybC5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQsIGluZGV4KXtcbiAgICAgICAgICAgIGlmKCBldmVudC50aXRsZS5pbmRleE9mKHNlYXJjaCkgIT09IC0xICl7XG4gICAgICAgICAgICAgICAgJChldmVudEVsZW1zW2luZGV4XSkucmVtb3ZlQ2xhc3MoJ3NlYXJjaC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJChldmVudEVsZW1zW2luZGV4XSkuYWRkQ2xhc3MoJ3NlYXJjaC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NoYW5nZScsICcuZXZlbnQtbW9kYWwgLm1lbWJlci1jaGVjay1sYWJlbCBpbnB1dCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmFyIG1lbWJlckVsZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5tZW1iZXItY2hlY2stbGFiZWwnKSxcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IG1lbWJlckVsZW0uYXR0cignZGF0YS1pbmRleCcpLFxuICAgICAgICAgICAgaXNDaGVja2VkID0gdGhpcy5jaGVja2VkLFxuICAgICAgICAgICAgbmV3SW5kZXg7XG4gICAgICAgIFxuICAgICAgICAvL3VwZGF0ZSB0aGUgc29uZydzIGNoZWNrZWQgc3RhdHVzXG4gICAgICAgIHZpZXcuZXZlbnRNZW1iZXJzW2N1cnJlbnRJbmRleF0uY2hlY2tlZCA9IGlzQ2hlY2tlZDtcbiAgICAgICAgXG4gICAgICAgIGlmKCB2aWV3LmV2ZW50TWVtYmVycy5sZW5ndGggPiAxICl7XG4gICAgICAgICAgICB2YXIgbW92ZWRNZW1iZXIgPSB2aWV3LmV2ZW50TWVtYmVycy5zcGxpY2UoY3VycmVudEluZGV4LDEpWzBdO1xuICAgICAgICAgICAgaWYoIGlzQ2hlY2tlZCApe1xuICAgICAgICAgICAgICAgIC8vaXRlbSBiZWNhbWUgY2hlY2tlZFxuICAgICAgICAgICAgICAgIGZvciggdmFyIGk9MDsgaTx2aWV3LmV2ZW50TWVtYmVycy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAgICAgICAgICAgICBpZiggdmlldy5ldmVudE1lbWJlcnNbaV0ubmFtZS50b0xvd2VyQ2FzZSgpID4gbW92ZWRNZW1iZXIubmFtZS50b0xvd2VyQ2FzZSgpIHx8ICF2aWV3LmV2ZW50TWVtYmVyc1tpXS5jaGVja2VkICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmV2ZW50TWVtYmVycy5zcGxpY2UoaSwwLG1vdmVkTWVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vbm93IG1vdmUgdGhlIGFjdHVhbCBlbGVtZW50IGFuZCBmaXggdGhlIGVsZW1lbnQgbnVtYmVyc1xuICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ0VsZW0gPSBtZW1iZXJFbGVtLnNpYmxpbmdzKCdbZGF0YS1pbmRleD0nK25ld0luZGV4KyddJyk7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdFbGVtLmJlZm9yZShtZW1iZXJFbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLy9pdGVtIGJlY2FtZSB1bmNoZWNrZWRcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPTA7IGk8dmlldy5ldmVudE1lbWJlcnMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoICF2aWV3LmV2ZW50TWVtYmVyc1tpXS5jaGVja2VkICYmIHZpZXcuZXZlbnRNZW1iZXJzW2ldLm5hbWUudG9Mb3dlckNhc2UoKSA+IG1vdmVkTWVtYmVyLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5ldmVudE1lbWJlcnMuc3BsaWNlKGksMCxtb3ZlZE1lbWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiggbmV3SW5kZXggPT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgc29ydHMgdG8gdGhlIGVuZCBvZiB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICBuZXdJbmRleCA9IHZpZXcuZXZlbnRNZW1iZXJzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5ldmVudE1lbWJlcnMucHVzaChtb3ZlZE1lbWJlcik7XG4gICAgICAgICAgICAgICAgICAgIC8vbm93IG1vdmUgdGhlIGFjdHVhbCBlbGVtZW50IGFuZCBmaXggdGhlIGVsZW1lbnQgbnVtYmVyc1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdFbGVtID0gbWVtYmVyRWxlbS5zaWJsaW5ncygnW2RhdGEtaW5kZXg9JysobmV3SW5kZXgpKyddJyk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nRWxlbS5hZnRlcihtZW1iZXJFbGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy9ub3cgbW92ZSB0aGUgYWN0dWFsIGVsZW1lbnQgYW5kIGZpeCB0aGUgZWxlbWVudCBudW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ0VsZW0gPSBtZW1iZXJFbGVtLnNpYmxpbmdzKCdbZGF0YS1pbmRleD0nKyhuZXdJbmRleCsxKSsnXScpO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0VsZW0uYmVmb3JlKG1lbWJlckVsZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhbGxNZW1iZXJFbGVtcyA9IG1lbWJlckVsZW0ucGFyZW50KCkuZmluZCgnLm1lbWJlci1jaGVjay1sYWJlbCcpO1xuICAgICAgICAgICAgaWYoIG5ld0luZGV4ID4gY3VycmVudEluZGV4ICl7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaT1jdXJyZW50SW5kZXg7IGk8PW5ld0luZGV4OyBpKysgKXtcbiAgICAgICAgICAgICAgICAgICAgJChhbGxNZW1iZXJFbGVtc1tpXSkuYXR0cignZGF0YS1pbmRleCcsaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPW5ld0luZGV4OyBpPD1jdXJyZW50SW5kZXg7IGkrKyApe1xuICAgICAgICAgICAgICAgICAgICAkKGFsbE1lbWJlckVsZW1zW2ldKS5hdHRyKCdkYXRhLWluZGV4JyxpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2hhbmdlJywgJy5ldmVudC1tb2RhbCBbbmFtZT1pcy1zaG93XScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgaWYoIHRoaXMuY2hlY2tlZCApe1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuZXZlbnQtbW9kYWwnKS5maW5kKCcuc2hvdy1kZXBlbmRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmV2ZW50LW1vZGFsJykuZmluZCgnLnNob3ctZGVwZW5kZW50JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5FdmVudHNWaWV3LnByb3RvdHlwZS5zaG93RXZlbnRNb2RhbCA9IGZ1bmN0aW9uIChldmVudCl7XG4gICAgdmFyIHZpZXcgPSB0aGlzLFxuICAgICAgICBldmVudE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmV2ZW50LW1vZGFsJyk7XG4gICAgXG4gICAgLy9yZW9yZGVyIHRoZSBzb25ncyBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzZXRsaXN0IG9yZGVyXG4gICAgaWYoIGV2ZW50ICl7XG4gICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9ZXZlbnQtaWRdJykudmFsKGV2ZW50LmlkKTtcbiAgICAgICAgZXZlbnRNb2RhbC5maW5kKCdbbmFtZT10aXRsZV0nKS52YWwoZXZlbnQudGl0bGUpO1xuICAgICAgICBldmVudE1vZGFsLmZpbmQoJ1tuYW1lPWRlc2NyaXB0aW9uXScpLnZhbChldmVudC5kZXNjcmlwdGlvbik7XG4gICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9bG9jYXRpb25dJykudmFsKGV2ZW50LmxvY2F0aW9uKTtcbiAgICAgICAgZXZlbnRNb2RhbC5maW5kKCdbbmFtZT1ldmVudC1kYXRlXScpLnZhbChldmVudC5ldmVudERhdGUpO1xuICAgICAgICBldmVudE1vZGFsLmZpbmQoJ1tuYW1lPWV2ZW50LXRpbWVdJykudmFsKGV2ZW50LmV2ZW50VGltZSk7XG4gICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9bG9hZC1pbi10aW1lXScpLnZhbChldmVudC5sb2FkSW5UaW1lKTtcbiAgICAgICAgZXZlbnRNb2RhbC5maW5kKCdbbmFtZT12ZW51ZV0nKS52YWwoZXZlbnQudmVudWUpO1xuICAgICAgICBpZiggZXZlbnQuaXNTaG93ICl7XG4gICAgICAgICAgICBldmVudE1vZGFsLmZpbmQoJy5zaG93LWRlcGVuZGVudCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9aXMtc2hvd10nKS5hdHRyKCdjaGVja2VkJywnY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBldmVudE1vZGFsLmZpbmQoJy5zaG93LWRlcGVuZGVudCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9aXMtc2hvd10nKS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9UT0RPOiBDaGVjayBpdGVtc1xuICAgICAgICB2YXIgY2hlY2tlZE1lbWJlcnMgPSBldmVudC5tZW1iZXJzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBtZW1iZXJJZCl7XG4gICAgICAgICAgICBvYmpbbWVtYmVySWRdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgXG4gICAgICAgIHZpZXcuZXZlbnRNZW1iZXJzID0gJC5leHRlbmQoW10sIHZpZXcucGFnZS5jdHJsLm1lbWJlcnMpLm1hcChmdW5jdGlvbiAobWVtYmVyKXtcbiAgICAgICAgICAgIGlmKCBjaGVja2VkTWVtYmVyc1ttZW1iZXIuaWRdICl7XG4gICAgICAgICAgICAgICAgbWVtYmVyLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1lbWJlcjtcbiAgICAgICAgfSkuc29ydChmdW5jdGlvbiAoYSxiKXtcbiAgICAgICAgICAgIGlmKCBhLmNoZWNrZWQgJiYgIWIuY2hlY2tlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIGIuY2hlY2tlZCAmJiAhYS5jaGVja2VkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKCBhLm5hbWUudG9Mb3dlckNhc2UoKSA8IGIubmFtZS50b0xvd2VyQ2FzZSgpICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiggYS5uYW1lLnRvTG93ZXJDYXNlKCkgPiBiLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZXZlbnRNb2RhbC5maW5kKCdbbmFtZT1ldmVudC1pZF0nKS52YWwoJycpO1xuICAgICAgICBldmVudE1vZGFsLmZpbmQoJ1tuYW1lPXRpdGxlXScpLnZhbCgnJyk7XG4gICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9ZGVzY3JpcHRpb25dJykudmFsKCcnKTtcbiAgICAgICAgZXZlbnRNb2RhbC5maW5kKCdbbmFtZT1sb2NhdGlvbl0nKS52YWwoJycpO1xuICAgICAgICBldmVudE1vZGFsLmZpbmQoJ1tuYW1lPWV2ZW50LWRhdGVdJykudmFsKCcnKTtcbiAgICAgICAgZXZlbnRNb2RhbC5maW5kKCdbbmFtZT1ldmVudC10aW1lXScpLnZhbCgnJyk7XG4gICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9aXMtc2hvd10nKS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9bG9hZC1pbi10aW1lXScpLnZhbCgnJyk7XG4gICAgICAgIGV2ZW50TW9kYWwuZmluZCgnW25hbWU9dmVudWVdJykudmFsKCcnKTtcbiAgICAgICAgZXZlbnRNb2RhbC5maW5kKCcuc2hvdy1kZXBlbmRlbnQnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIHZpZXcuZXZlbnRNZW1iZXJzID0gJC5leHRlbmQoW10sIHZpZXcucGFnZS5jdHJsLm1lbWJlcnMpLnNvcnQoZnVuY3Rpb24gKGEsYil7XG4gICAgICAgICAgICBpZiggYS5jaGVja2VkICYmICFiLmNoZWNrZWQgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBiLmNoZWNrZWQgJiYgIWEuY2hlY2tlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpZiggYS5uYW1lLnRvTG93ZXJDYXNlKCkgPCBiLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIGEubmFtZS50b0xvd2VyQ2FzZSgpID4gYi5uYW1lLnRvTG93ZXJDYXNlKCkgKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHZhciBtZW1iZXJzRWxlbSA9IGV2ZW50TW9kYWwuZmluZCgnLm1lbWJlcnMnKS5kZXRhY2goKS5lbXB0eSgpO1xuICAgIHZpZXcuZXZlbnRNZW1iZXJzLmZvckVhY2goZnVuY3Rpb24gKG1lbWJlciwgaW5kZXgpe1xuICAgICAgICBtZW1iZXJzRWxlbS5hcHBlbmQoJycrXG4gICAgICAgICc8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsIG1lbWJlci1jaGVjay1sYWJlbFwiIGRhdGEtaW5kZXg9XCInK2luZGV4KydcIj4nK1xuICAgICAgICAgICAgJzxpbnB1dCBuYW1lPVwibWVtYmVyLScrbWVtYmVyLmlkKydcIiBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIlwiIHRhYmluZGV4PVwiLTFcIiAnKyhtZW1iZXIuY2hlY2tlZD8nY2hlY2tlZCc6JycpKyc+ICcrXG4gICAgICAgICAgICAnKCcrbWVtYmVyLnVzZXJuYW1lKycpICcrbWVtYmVyLmZpcnN0TmFtZSsnICcrbWVtYmVyLmxhc3ROYW1lK1xuICAgICAgICAnPC9sYWJlbD4nKTtcbiAgICB9KTtcbiAgICBldmVudE1vZGFsLmZpbmQoJy5tZW1iZXJzLXBhcmVudCcpLmFwcGVuZChtZW1iZXJzRWxlbSk7XG4gICAgXG4gICAgZXZlbnRNb2RhbC5maW5kKCcubW9kYWwnKS5tb2RhbCgpO1xufTtcblxuRXZlbnRzVmlldy5wcm90b3R5cGUuc2hvd05vdGlmeU1vZGFsID0gZnVuY3Rpb24gKGV2ZW50SWQpe1xuICAgIHZhciBub3RpZnlNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5ub3RpZnktbW9kYWwnKTtcbiAgICAgICAgXG4gICAgbm90aWZ5TW9kYWwuZmluZCgnW25hbWU9ZXZlbnQtaWRdJykudmFsKGV2ZW50SWQpO1xuICAgIG5vdGlmeU1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG4gICAgJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmV2ZW50LW1vZGFsIC5tb2RhbCcpLmNzcygnZGlzcGxheScsJ25vbmUnKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBGcmllbmQgKi9cblxuZnVuY3Rpb24gRnJpZW5kc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjZnJpZW5kc1BhZ2UnKVswXSwgRnJpZW5kc0N0cmwsIEZyaWVuZHNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5GcmllbmRzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbkZyaWVuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZyaWVuZHNQYWdlO1xuXG5mdW5jdGlvbiBGcmllbmRzQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuZnJpZW5kcyA9IFtdO1xufVxuRnJpZW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuRnJpZW5kc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRnJpZW5kc0N0cmw7XG5GcmllbmRzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKTtcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KCcvYXBpL2ZyaWVuZHMnLCB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5mcmllbmRzID0gZGF0YTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG5cbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuRnJpZW5kc0N0cmwucHJvdG90eXBlLnVwZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uICh0b1VzZXJJZCwgc3RhdHVzKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9mcmllbmRzL3VwZGF0ZXN0YXR1cycsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YToge3RvVXNlcklkIDogdG9Vc2VySWQsIHN0YXR1cyA6IHN0YXR1c31cbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmNhdGNoKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbmZ1bmN0aW9uIEZyaWVuZHNWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5GcmllbmRzVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5GcmllbmRzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBGcmllbmRzVmlldztcbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy51cGRhdGVVc2VyTGlzdCgpO1xufTtcblxuRnJpZW5kc1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYWRkLWZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9mcmllbmRzL2FkZCc7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmZyaWVuZCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgcGFnZS52aWV3LnNob3dGcmllbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyksMTApKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5SRVFVRVNURUQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQmxvY2tNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuUEVORElORylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5idG5VbmJsb2NrTW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuQ2FuY2VsUmVxdWVzdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5OT05FKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bkFjY2VwdE1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciB0b1VzZXJJZCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnKTtcbiAgICAgICAgcGFnZS5jdHJsLnVwZGF0ZVN0YXR1cyh0b1VzZXJJZCwgRnJpZW5kLlNUQVRVUy5GUklFTkQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuUmVqZWN0TW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdmFyIHRvVXNlcklkID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWZyaWVuZC1pZCcpO1xuICAgICAgICBwYWdlLmN0cmwudXBkYXRlU3RhdHVzKHRvVXNlcklkLCBGcmllbmQuU1RBVFVTLk5PTkUpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuVW5mcmllbmRNb2RhbCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgdG9Vc2VySWQgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtZnJpZW5kLWlkJyk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVTdGF0dXModG9Vc2VySWQsIEZyaWVuZC5TVEFUVVMuTk9ORSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pOyAgICAgICAgXG59O1xuXG5GcmllbmRzVmlldy5wcm90b3R5cGUudXBkYXRlVXNlckxpc3QgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZnJpZW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kcycpO1xuICAgIHZhciBjYXJkQ29sb3IgPSAnJztcbiAgICB2YXIgYmFkZ2UgPSAnJztcblxuICAgIC8vIENsZWFyIGFueSBjdXJyZW50IGNhcmRzIGZyb20gcHJldmlvdXMgc2VhcmNoXG4gICAgZnJpZW5kc0VsZW0uZmluZCgnLmNhcmQnKS5yZW1vdmUoKTtcblxuICAgIGZvciggdmFyIGk9MDsgaTx0aGlzLnBhZ2UuY3RybC5mcmllbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBzdGF0dXNcbiAgICAgICAgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ3JlcXVlc3RlZCcpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAncGVuZGluZycpIHsgXG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC13YXJuaW5nJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWRhbmdlcic7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnN0YXR1cyA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1wcmltYXJ5JztcbiAgICAgICAgICAgIGJhZGdlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgY2FyZCBmb3IgZWFjaCB1c2VyXG4gICAgICAgIGZyaWVuZHNFbGVtLmFwcGVuZCgnJytcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJmcmllbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1mcmllbmQtaWQ9XCInK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0uaWQrJ1wiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5mcmllbmRzW2ldLnVzZXJOYW1lK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6IDEwcmVtO1wiPjwvc3Bhbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPHNtYWxsPignK3RoaXMucGFnZS5jdHJsLmZyaWVuZHNbaV0ubmFtZSsnKTwvc21hbGw+JytiYWRnZSsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJzwvaDQ+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+PHAvPicpO1xuICAgIH1cbn07XG5cbkZyaWVuZHNWaWV3LnByb3RvdHlwZS5zaG93RnJpZW5kTW9kYWwgPSBmdW5jdGlvbiAoZnJpZW5kSWQpe1xuICAgIHZhciB0aGlzRnJpZW5kID0gdGhpcy5wYWdlLmN0cmwuZnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24gKGZyaWVuZCl7XG4gICAgICAgIHJldHVybiBmcmllbmQuaWQgPT0gZnJpZW5kSWQ7XG4gICAgfSlbMF0sXG4gICAgICAgIG1vZGFsQnV0dG9ucztcbiAgICAgICAgXG4gICAgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnZnJpZW5kJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG5VbmZyaWVuZE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlVuZnJpZW5kPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG5CbG9ja01vZGFsXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5CbG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdyZXF1ZXN0ZWQnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQ2FuY2VsUmVxdWVzdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbCBSZXF1ZXN0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzRnJpZW5kLnN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7IFxuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuQWNjZXB0TW9kYWwgbXItMlwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QWNjZXB0PC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0blJlamVjdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlJlamVjdDwvYnV0dG9uPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuQmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+QmxvY2sgVXNlcjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNGcmllbmQuc3RhdHVzID09PSAnYmxvY2tlZCcpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0blVuYmxvY2tNb2RhbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+VW5ibG9jayBVc2VyPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0ZyaWVuZC5zdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuUmVxdWVzdE1vZGFsIG1yLTJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlNlbmQgRnJpZW5kIFJlcXVlc3Q8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bkJsb2NrTW9kYWxcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkJsb2NrIFVzZXI8L2J1dHRvbj4nO1xuICAgIH1cbiAgICBcbiAgICB2YXIgZnJpZW5kTW9kYWwgPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuZnJpZW5kLW1vZGFsJyk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsJykuYXR0cignZGF0YS1mcmllbmQtaWQnLHRoaXNGcmllbmQuaWQpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbC10aXRsZScpLmh0bWwodGhpc0ZyaWVuZC51c2VyTmFtZSk7XG4gICAgZnJpZW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNGcmllbmQubmFtZSsnPC9wPjxwPicrdGhpc0ZyaWVuZC5iaW8rJzwvcD4nKTtcbiAgICBmcmllbmRNb2RhbC5maW5kKCcuZHluYW1pYy1idXR0b25zJykuaHRtbChtb2RhbEJ1dHRvbnMpO1xuICAgIGZyaWVuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5QYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI2xvZ2luUGFnZScpWzBdLCBMb2dpbkN0cmwsIExvZ2luVmlldyk7XG59XG5Mb2dpblBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5Mb2dpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTG9naW5QYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBMb2dpbkN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLmxvZ2dpbmdJbiA9IGZhbHNlO1xufVxuTG9naW5DdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcbkxvZ2luQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMb2dpbkN0cmw7XG5cbkxvZ2luQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvbG9naW4nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpe1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSkuZmFpbChmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVqZWN0KCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8qKlxuICogVklFV0VSXG4gKiAqL1xuZnVuY3Rpb24gTG9naW5WaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5Mb2dpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTG9naW5WaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExvZ2luVmlldztcbkxvZ2luVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuTG9naW5WaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggcGFnZS5jdHJsLmxvZ2dpbmdJbiApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwubG9nZ2luZ0luID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgICAgIFxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXG4gICAgICAgIHBhZ2UuY3RybC5sb2dpbih0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL21haW4nO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLmxvZ2dpbmdJbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgZm9ybS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5Mb2dpbiBGYWlsZWQhPC9zdHJvbmc+IFVzZXJuYW1lIG9yIHBhc3N3b3JkIHdhcyBpbmNvcnJlY3QuJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCAkICovXG4vKiBnbG9iYWwgVXNlciAqL1xuXG5mdW5jdGlvbiBNYWluUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNtYWluUGFnZScpWzBdLCBNYWluQ3RybCwgTWFpblZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cbk1haW5QYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuTWFpblBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblBhZ2U7XG5cbmZ1bmN0aW9uIE1haW5DdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy51c2VyID0gdW5kZWZpbmVkO1xufVxuTWFpbkN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuTWFpbkN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpbkN0cmw7XG5NYWluQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgY3RybCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS91c2VyJyxcbiAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKHVzZXIpe1xuICAgICAgICBjdHJsLnVzZXIgPSBuZXcgVXNlcih1c2VyKTtcbiAgICAgICAgZGVmZXIucmVzb2x2ZSgpO1xuICAgIH0pXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuXG5mdW5jdGlvbiBNYWluVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTWFpblZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTWFpblZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTWFpblZpZXc7XG5NYWluVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlID0gdGhpcy5wYWdlO1xuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmJhbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMnO1xuICAgIH0pO1xuICAgICQocGFnZS5lbGVtKS5vbignY2xpY2snLCAnLmFkZC1mcmllbmRzJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2ZyaWVuZHMvYWRkJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5zZWFyY2gtYmFuZHMnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYmFuZHMvc2VhcmNoJztcbiAgICB9KTtcbiAgICAkKHBhZ2UuZWxlbSkub24oJ2NsaWNrJywgJy5ub3RpZmljYXRpb25zJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL25vdGlmaWNhdGlvbnMnO1xuICAgIH0pO1xuICAgIFxuICAgICQocGFnZS5lbGVtKS5maW5kKCcudXNlcm5hbWUnKS5odG1sKHBhZ2UuY3RybC51c2VyLnVzZXJuYW1lKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBOb3RpZmljYXRpb24gKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gTm90aWZpY2F0aW9uc1BhZ2UoYXBwLCBkYXRhKXtcbiAgICBQYWdlLmNhbGwodGhpcywgYXBwLCAkKCcjbm90aWZpY2F0aW9uc1BhZ2UnKVswXSwgTm90aWZpY2F0aW9uc0N0cmwsIE5vdGlmaWNhdGlvbnNWaWV3LCB7XG4gICAgICAgIG1lbnU6IG5ldyBNZW51Q29tcG9uZW50KGFwcCwge1xuICAgICAgICAgICAgZWxlbWVudDogJy5tZW51LWJ1dHRvbi1jb250YWluZXInXG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5Ob3RpZmljYXRpb25zUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcbk5vdGlmaWNhdGlvbnNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5vdGlmaWNhdGlvbnNQYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IFtdO1xufVxuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc0N0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc0N0cmw7XG5cbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgY3RybC5nZXROb3RpZmljYXRpb25zKCkudGhlbihyZXNvbHZlKS5jYXRjaChyZWplY3QpO1xuICAgIH0pO1xufTtcbk5vdGlmaWNhdGlvbnNDdHJsLnByb3RvdHlwZS5nZXROb3RpZmljYXRpb25zID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgICAgLy9nZXQgbm90aWZpY2F0aW9uc1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogJy9hcGkvbm90aWZpY2F0aW9ucydcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpe1xuICAgICAgICAgICAgY3RybC5ub3RpZmljYXRpb25zID0gZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICAgICAgICAgIHJldHVybiBOb3RpZmljYXRpb24uZnJvbU9iaihpdGVtKTtcbiAgICAgICAgICAgIH0pIHx8IFtdO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG59O1xuXG5Ob3RpZmljYXRpb25zQ3RybC5wcm90b3R5cGUuZGVsZXRlTm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKCl7XG4gICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xufTtcblxuLyoqXG4gKiBWSUVXRVJcbiAqICovXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuTm90aWZpY2F0aW9uc1ZpZXcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTm90aWZpY2F0aW9uc1ZpZXc7XG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMucmVuZGVyKCk7XG59O1xuXG5Ob3RpZmljYXRpb25zVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignY2xvc2UuYnMuYWxlcnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvL2RlbGV0ZSBub3RpZmljYXRpb24gb24gdGhlIHNlcnZlclxuICAgICAgICBwYWdlLmN0cmwuZGVsZXRlTm90aWZpY2F0aW9uKCQodGhpcykuYXR0cignZGF0YS1ub3RpZmljYXRpb24taWQnKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICByZXR1cm4gcGFnZS5jdHJsLmdldE5vdGlmaWNhdGlvbnMoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBwYWdlLnZpZXcucmVuZGVyKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbn07XG5cbk5vdGlmaWNhdGlvbnNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgbm90aWZpY2F0aW9uRWxlbSA9ICQoJyNub3RpZmljYXRpb25zUGFnZScpLmZpbmQoJy5ub3RpZmljYXRpb25zJykuZW1wdHkoKTtcbiAgICB0aGlzLnBhZ2UuY3RybC5ub3RpZmljYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG5vdGlmaWNhdGlvbil7XG4gICAgICAgIHZhciBhbGVydFR5cGU7XG4gICAgICAgIHN3aXRjaChub3RpZmljYXRpb24udHlwZSl7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLlNVQ0NFU1M6XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkZSSUVORF9BQ0NFUFRFRDpcbiAgICAgICAgICAgICAgICBhbGVydFR5cGUgPSAnYWxlcnQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuV0FSTklORzpcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uLlRZUEUuUkVNT1ZFRF9GUk9NX0JBTkQ6XG4gICAgICAgICAgICAgICAgYWxlcnRUeXBlID0gJ2FsZXJ0LXdhcm5pbmcnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvbi5UWVBFLkVSUk9SOlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1kYW5nZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGFsZXJ0VHlwZSA9ICdhbGVydC1pbmZvJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIG5vdGlmaWNhdGlvbkVsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGEgaHJlZj1cIicrbm90aWZpY2F0aW9uLmxpbmsrJ1wiIGNsYXNzPVwibm90aWZpY2F0aW9uIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlICcrYWxlcnRUeXBlKydcIiBkYXRhLW5vdGlmaWNhdGlvbi1pZD1cIicrbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbklkKydcIj4nK1xuICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPicrXG4gICAgICAgICAgICAgICAgJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+JytcbiAgICAgICAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgICAgICAgbm90aWZpY2F0aW9uLm1lc3NhZ2UrXG4gICAgICAgICc8L2E+Jyk7XG4gICAgfSk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cblxuLyoqXG4gKiBQQUdFXG4gKiAqL1xuZnVuY3Rpb24gUmVnaXN0ZXJQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyUGFnZScpWzBdLCBSZWdpc3RlckN0cmwsIFJlZ2lzdGVyVmlldyk7XG59XG5SZWdpc3RlclBhZ2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlLnByb3RvdHlwZSk7XG5SZWdpc3RlclBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJQYWdlO1xuXG4vKipcbiAqIENPTlRST0xMRVJcbiAqICovXG5mdW5jdGlvbiBSZWdpc3RlckN0cmwocGFnZSl7XG4gICAgUGFnZUN0cmwuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG59XG5SZWdpc3RlckN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQ3RybDtcblxuUmVnaXN0ZXJDdHJsLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9yZWdpc3RlcicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG4vKipcbiAqIFZJRVdFUlxuICogKi9cbmZ1bmN0aW9uIFJlZ2lzdGVyVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuUmVnaXN0ZXJWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlclZpZXc7XG5SZWdpc3RlclZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbn07XG5cblJlZ2lzdGVyVmlldy5wcm90b3R5cGUuYmluZEV2ZW50cyA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBwYWdlRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLFxuICAgICAgICBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYoIHBhZ2UuY3RybC5yZWdpc3RlcmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vc2hvdyBzcGlubmVyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbiA9IGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpO1xuICAgICAgICBcbiAgICAgICAgLy9jbG9zZSBhbnkgZXhpc3RpbmcgYWxlcnRzXG4gICAgICAgIGZvcm0uZmluZCgnLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3Nob3cgdGhlIGxvZ2luIHRoaW5raW5nIHNwaW5uZXJcbiAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIFxuICAgICAgICAvL2FjdHVhbGx5IHRyeSB0byBsb2dpblxuICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXIodGhpcylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5JykuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzJyk7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24uZmluZCgnZGl2JykucmVtb3ZlQ2xhc3MoJ2ZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW4nKS5hZGRDbGFzcygnZmEtY2hlY2snKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSByZWdpc3RlciBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1zdWNjZXNzIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5SZWdpc3RyYXRpb24gU3VjY2Vzc2Z1bCE8L3N0cm9uZz4gUmVkaXJlY3RpbmcgaW4gMiBzZWNvbmRzLi4uJ1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIC8vY2hhbmdlIHBhZ2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9sb2dpbic7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmh0bWwoJ0xvZ2luJykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5JykucmVtb3ZlQ2xhc3MoJ2J0bi1kYW5nZXInKTtcbiAgICAgICAgICAgICAgICBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+TG9naW4gRmFpbGVkITwvc3Ryb25nPiBVc2VybmFtZSBvciBwYXNzd29yZCB3YXMgaW5jb3JyZWN0LidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTsiLCIvKiBnbG9iYWwgUGFnZSAqL1xuLyogZ2xvYmFsIFBhZ2VWaWV3ICovXG4vKiBnbG9iYWwgUGFnZUN0cmwgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgJCAqL1xuXG5mdW5jdGlvbiBSZWdpc3RlckJhbmRQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3JlZ2lzdGVyQmFuZFBhZ2UnKVswXSwgUmVnaXN0ZXJCYW5kQ3RybCwgUmVnaXN0ZXJCYW5kVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuUmVnaXN0ZXJCYW5kUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblJlZ2lzdGVyQmFuZFBhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnaXN0ZXJCYW5kUGFnZTtcblxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMucmVnaXN0ZXJpbmcgPSBmYWxzZTtcbn1cblJlZ2lzdGVyQmFuZEN0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdpc3RlckJhbmRDdHJsO1xuUmVnaXN0ZXJCYW5kQ3RybC5wcm90b3R5cGUubG9naW4gPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvcmVnaXN0ZXInLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KVxuICAgIC50aGVuKGRlZmVyLnJlc29sdmUpXG4gICAgLmZhaWwoZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gUmVnaXN0ZXJCYW5kVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuUmVnaXN0ZXJCYW5kVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VWaWV3LnByb3RvdHlwZSk7XG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ2lzdGVyQmFuZFZpZXc7XG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5SZWdpc3RlckJhbmRWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2UgPSB0aGlzLnBhZ2UsXG4gICAgICAgIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICdmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmKCBwYWdlLmN0cmwucmVnaXN0ZXJpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy9zaG93IHNwaW5uZXJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLFxuICAgICAgICAgICAgc3VibWl0QnV0dG9uID0gZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJyk7XG4gICAgICAgIFxuICAgICAgICAvL2Nsb3NlIGFueSBleGlzdGluZyBhbGVydHNcbiAgICAgICAgZm9ybS5maW5kKCcuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbiAgICAgICAgXG4gICAgICAgIC8vc2hvdyB0aGUgbG9naW4gdGhpbmtpbmcgc3Bpbm5lclxuICAgICAgICBzdWJtaXRCdXR0b24uaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIC8vYWN0dWFsbHkgdHJ5IHRvIGxvZ2luXG4gICAgICAgIHBhZ2UuY3RybC5sb2dpbih0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5maW5kKCdkaXYnKS5yZW1vdmVDbGFzcygnZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpbicpLmFkZENsYXNzKCdmYS1jaGVjaycpO1xuICAgICAgICAgICAgLy9kaXNwbGF5IHJlZ2lzdGVyIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3MgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlJlZ2lzdHJhdGlvbiBTdWNjZXNzZnVsITwvc3Ryb25nPiBSZWRpcmVjdGluZyBpbiAyIHNlY29uZHMuLi4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICAgICAgLy9jaGFuZ2UgcGFnZVxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2JhbmRzJztcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKS5hZGRDbGFzcygnYnRuLWRhbmdlcicpO1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmZpbmQoJ2RpdicpLnJlbW92ZUNsYXNzKCdmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluJykuYWRkQ2xhc3MoJ2ZhLXRpbWVzJyk7XG4gICAgICAgICAgICAvL2NoYW5nZSBwYWdlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5odG1sKCdMb2dpbicpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpLnJlbW92ZUNsYXNzKCdidG4tZGFuZ2VyJyk7XG4gICAgICAgICAgICAgICAgcGFnZS5jdHJsLnJlZ2lzdGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPkJhbmQgUmVnaXN0cmF0aW9uIEZhaWxlZCE8L3N0cm9uZz4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbnZhciBzZWFyY2hpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gU2VhcmNoQmFuZHNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3NlYXJjaEJhbmRzUGFnZScpWzBdLCBTZWFyY2hCYW5kc0N0cmwsIFNlYXJjaEJhbmRzVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuU2VhcmNoQmFuZHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzUGFnZTtcblxuZnVuY3Rpb24gU2VhcmNoQmFuZHNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5iYW5kcyA9IFtdO1xuICAgIHRoaXMuc2VhcmNoaW5nID0gZmFsc2U7XG59XG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzQ3RybDtcblxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB0aGF0LmJhbmRzID0gW107XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy9zZWFyY2gnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6ICQoZm9ybSkuc2VyaWFsaXplKClcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKXtcbiAgICAgICAgdGhhdC5iYW5kcyA9IGRhdGE7XG4gICAgICAgIHRoYXQucGFnZS52aWV3LnVwZGF0ZUJhbmRMaXN0KCk7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8vIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSByZWxhdGlvbiB0aGUgYXBwbGljYXRpb24gZm9yIHRoZSBjdXJyZW50IHVzZXIgYW5kIHRoZSBzZWxlY3RlZCBiYW5kXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLnN1Ym1pdEFwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGJhbmRJZCwgZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvYXBpL2JhbmRzLyR7YmFuZElkfS9zdWJtaXRBcHBsaWNhdGlvbmAsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YTogJChmb3JtKS5zZXJpYWxpemUoKVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiU3VjY2VzcyFcIik7IFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgIGFsZXJ0KFwiRXJyb3IhXCIpOyBcbiAgICAgICAgZGVmZXIucmVqZWN0KGVycik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cbi8vIFRoaXMgbWV0aG9kIHdpbGwgZGVsZXRlIHRoZSBhcHBsaWNhdGlvbiBmb3IgdGhlIGN1cnJlbnQgdXNlciBhbmQgdGhpcyBiYW5kXG5TZWFyY2hCYW5kc0N0cmwucHJvdG90eXBlLmNhbmNlbEFwcGxpY2F0aW9uID0gZnVuY3Rpb24gKGJhbmRJZCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvY2FuY2VsQXBwbGljYXRpb24nLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtiYW5kSWQgOiBiYW5kSWR9XG4gICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KXtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICBkZWZlci5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuU2VhcmNoQmFuZHNDdHJsLnByb3RvdHlwZS5leHBhbmRCYW5kTW9kYWwgPSBmdW5jdGlvbihhcHBsaWNhdGlvblR5cGUsIGFwcGxpY2F0aW9uU3RhdHVzLCBiYW5kSWQpIHtcbiAgICAkKCcubW9kYWwtYm9keScpLnJlbW92ZSgpO1xuICAgICQoJy5tb2RhbC1mb290ZXInKS5yZW1vdmUoKTsgICAgXG5cbiAgICB2YXIgYmFuZE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLm1vZGFsLWNvbnRlbnQnKTtcbiAgICB2YXIgYmFuZE5hbWUgPSBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLXRpdGxlJykuaHRtbCgpO1xuICAgIHZhciBpbnN0cnVtZW50RmllbGQgPSAnJztcblxuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKGJhbmROYW1lKyc8YnIvPicrYXBwbGljYXRpb25UeXBlKycgQXBwbGljYXRpb24nKTtcblxuICAgIGlmIChhcHBsaWNhdGlvblR5cGUgPT09ICdNZW1iZXInKSB7XG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgcmVxdWlyZWQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJpbnN0cnVtZW50XCIgcGxhY2Vob2xkZXI9XCJJbnN0cnVtZW50XCIgLz48cC8+JztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGluc3RydW1lbnRGaWVsZCA9ICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnN0cnVtZW50XCIgdmFsdWU9XCJOL0FcIi8+PHAvPic7ICBcbiAgICB9XG5cbiAgICBiYW5kTW9kYWwuYXBwZW5kKCcnK1xuICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPicrXG4gICAgICAgICc8Zm9ybSBpZD1cImFwcGx5LWZvcm1cIiBjbGFzcz1cImFwcGx5LWZvcm1cIiBvbnN1Ym1pdD1cInJldHVyblwiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj4nK1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnRGaWVsZCtcbiAgICAgICAgICAgICAgICAnPGlucHV0IHJlcXVpcmVkIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiTWVzc2FnZVwiIC8+JytcbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiYmFuZElkXCIgdmFsdWU9XCInK2JhbmRJZCsnXCIgLz4nK1xuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJhcHBsaWNhdGlvblN0YXR1c1wiIHZhbHVlPVwiJythcHBsaWNhdGlvblN0YXR1cysnXCIgLz4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Zvcm0+JytcbiAgICAnPC9kaXY+JytcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPicrICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgZm9ybT1cImFwcGx5LWZvcm1cIj4nK1xuICAgICAgICAgICAgICAgICdTdWJtaXQnK1xuICAgICAgICAgICAgJzwvYnV0dG9uPicrXG4gICAgICAgICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+JytcbiAgICAgICAgJzwvZGl2PicrICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAnPC9kaXY+Jyk7XG59O1xuXG5mdW5jdGlvbiBTZWFyY2hCYW5kc1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSB1bmRlZmluZWQ7XG59XG5TZWFyY2hCYW5kc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNlYXJjaEJhbmRzVmlldztcblNlYXJjaEJhbmRzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpeyAgIFxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgcGFnZSA9IHRoaXMucGFnZTtcbiAgICBcbiAgICAvLyBUaGlzIHdpbGwgcnVuIGEgc2VhcmNoIGV2ZXJ5IHNlY29uZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkuIFxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsICcuc2VhcmNoLWZvcm0gaW5wdXQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZhciB0aGlzRm9ybSA9ICQodGhpcyk7XG4gICAgICAgIGNsZWFyVGltZW91dChwYWdlLnZpZXcuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIHBhZ2Uudmlldy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzRm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9KTtcblxuICAgIC8vIFN1Ym1pdHRpbmcgdGhlIHNlYXJjaCBzdHJpbmdcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJ2Zvcm0uc2VhcmNoLWZvcm0nLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgICAgIFxuICAgICAgICBwYWdlLmN0cmwuc2VhcmNoKHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpeyAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdzdWJtaXQnLCAnZm9ybS5hcHBseS1mb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICAgIFxuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpOyAgIFxuICAgICAgICBwYWdlLmN0cmwuc3VibWl0QXBwbGljYXRpb24ocGFyc2VJbnQoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5hdHRyKCdkYXRhLWJhbmQtaWQnKSwgMTApLCB0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBwYWdlRWxlbS5maW5kKCdmb3JtLnNlYXJjaC1mb3JtJykuc3VibWl0KCk7XG4gICAgICAgICAgICAvL2hhbmRsZSB0aGUgYXBwbGljYXRpb24gcmVzdWx0XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIFRvZ2dsZSBCYW5kIE1vZGFsXG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5iYW5kJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBwYWdlLnZpZXcuc2hvd0JhbmRNb2RhbChwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKSk7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgbWFuYWdlciBhcHBsaWNhdGlvbiByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseU1hbmFnZXInLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgYmFuZElkID0gcGFyc2VJbnQoJCh0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCkuYXR0cignZGF0YS1iYW5kLWlkJyksMTApXG4gICAgICAgIHBhZ2UuY3RybC5leHBhbmRCYW5kTW9kYWwoJ01hbmFnZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NQU5BR0VSLCBiYW5kSWQpO1xuICAgIH0pXG5cbiAgICAvLyBIYW5kbGUgbWVtYmVyIGFwcGxpY2F0aW9uIHJlcXVlc3RcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnI2J0bkFwcGx5TWVtYmVyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdNZW1iZXInLCBBcHBsaWNhdGlvbi5TVEFUVVMuQVBQTElFRF9NRU1CRVIsIGJhbmRJZCk7XG4gICAgfSlcblxuICAgIC8vIEhhbmRsZSBwcm9tb3RlciBhcHBsaWNhdGlvbiByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5BcHBseVByb21vdGVyJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuZXhwYW5kQmFuZE1vZGFsKCdQcm9tb3RlcicsIEFwcGxpY2F0aW9uLlNUQVRVUy5BUFBMSUVEX1BST01PVEVSLCBiYW5kSWQpO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGFwcGxpY2F0aW9uIGNhbmNlbCByZXF1ZXN0XG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJyNidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGJhbmRJZCA9IHBhcnNlSW50KCQodGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpLmF0dHIoJ2RhdGEtYmFuZC1pZCcpLDEwKVxuICAgICAgICBwYWdlLmN0cmwuY2FuY2VsQXBwbGljYXRpb24oYmFuZElkKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTdWNjZXNzIVwiKTsgICAgXG4gICAgICAgICAgICAgICAgcGFnZUVsZW0uZmluZCgnZm9ybScpLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJGYWlsdXJlIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoY29uc29sZS5lcnJvcik7XG4gICAgfSk7XG5cbiAgICAvKnBhZ2VFbGVtLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAnI21vZGFsNycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdGhpcy51cGRhdGVCYW5kTGlzdDtcbiAgICB9KTsqL1xufTtcblxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS51cGRhdGVCYW5kTGlzdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBiYW5kc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuYmFuZHMnKTtcbiAgICB2YXIgY2FyZENvbG9yID0gJyc7XG4gICAgdmFyIGJhZGdlID0gJyc7XG5cbiAgICAvLyBDbGVhciBhbnkgY3VycmVudCBjYXJkcyBmcm9tIHByZXZpb3VzIHNlYXJjaFxuICAgICQoJy5jYXJkJykucmVtb3ZlKCk7XG5cbiAgICBmb3IoIHZhciBpPTA7IGk8dGhpcy5wYWdlLmN0cmwuYmFuZHMubGVuZ3RoOyBpKysgKXtcblxuICAgICAgICAvLyBJZiB5b3UgaGF2ZSBhIHJvbGUgdGhlbiB5b3UgYXJlIGluIHRoZSBiYW5kLCBzbyBubyBtb2RhbCBidXR0b25zXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlICE9ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtc3VjY2Vzcyc7XG4gICAgICAgICAgICBiYWRnZSA9ICc8c3BhbiBjbGFzcz1cImJhZGdlIGJhZGdlLXBpbGwgYmFkZ2UtZGVmYXVsdCBwdWxsLXJpZ2h0XCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5yb2xlO1xuICAgICAgICB9XG4gICAgICAgIC8vIERldGVybWluZSBob3cgdG8gc3R5bGUgZWFjaCBjYXJkIGFuZCBtb2RhbCBiYXNlZCBvbiBhcHBsaWNhdGlvbiBzdGF0dXMgaWYgdGhleSBkbyBub3QgaGF2ZSBhIHJvbGUgaW4gdGhlIGJhbmRcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcbiAgICAgICAgICAgIGNhcmRDb2xvciA9ICdjYXJkLWluZm8nO1xuICAgICAgICAgICAgYmFkZ2UgPSAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1waWxsIGJhZGdlLWRlZmF1bHQgcHVsbC1yaWdodFwiPicrdGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXM7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5hcHBsaWNhdGlvblN0YXR1cyA9PT0gJ2FwcGxpZWQgKG1lbWJlciknKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XG4gICAgICAgICAgICBjYXJkQ29sb3IgPSAnY2FyZC1pbmZvJztcbiAgICAgICAgICAgIGJhZGdlID0gJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2UtcGlsbCBiYWRnZS1kZWZhdWx0IHB1bGwtcmlnaHRcIj4nK3RoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZS5jdHJsLmJhbmRzW2ldLmFwcGxpY2F0aW9uU3RhdHVzID09PSAncmVqZWN0ZWQnKSB7IFxuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYWdlLmN0cmwuYmFuZHNbaV0uYXBwbGljYXRpb25TdGF0dXMgPT09ICdub25lJykge1xuICAgICAgICAgICAgY2FyZENvbG9yID0gJ2NhcmQtcHJpbWFyeSc7XG4gICAgICAgICAgICBiYWRnZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNhcmQgZm9yIGVhY2ggYmFuZFxuICAgICAgICBiYW5kc0VsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImJhbmQgY2FyZCAnK2NhcmRDb2xvcisnXCIgZGF0YS1iYW5kLWlkPVwiJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5pZCsnXCIgPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2tcIj4nK1xuICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Jyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5iYW5kTmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOiAxMHJlbTtcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgJzxzbWFsbD4oJyt0aGlzLnBhZ2UuY3RybC5iYW5kc1tpXS5nZW5yZSsnKTwvc21hbGw+JytiYWRnZStcbiAgICAgICAgICAgICAgICAnPC9oND4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj48cC8+Jyk7XG4gICAgfVxufTtcblxuU2VhcmNoQmFuZHNWaWV3LnByb3RvdHlwZS5zaG93QmFuZE1vZGFsID0gZnVuY3Rpb24gKGJhbmRJZCl7XG4gICAgdmFyIHRoaXNCYW5kID0gdGhpcy5wYWdlLmN0cmwuYmFuZHMuZmlsdGVyKGZ1bmN0aW9uIChiYW5kKXtcbiAgICAgICAgcmV0dXJuIGJhbmQuaWQgPT0gYmFuZElkO1xuICAgIH0pWzBdLFxuICAgICAgICBtb2RhbEJ1dHRvbnM7XG4gICAgXG4gICAgaWYgKHRoaXNCYW5kLnJvbGUgIT0gJ25vbmUnKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICcnO1xuICAgIH1cbiAgICAvLyBEZXRlcm1pbmUgaG93IHRvIHN0eWxlIGVhY2ggY2FyZCBhbmQgbW9kYWwgYmFzZWQgb24gYXBwbGljYXRpb24gc3RhdHVzIGlmIHRoZXkgZG8gbm90IGhhdmUgYSByb2xlIGluIHRoZSBiYW5kXG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChtYW5hZ2VyKScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgTWFuYWdlciBBcHBsaWNhdGlvbjwvYnV0dG9uPic7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXNCYW5kLmFwcGxpY2F0aW9uU3RhdHVzID09PSAnYXBwbGllZCAobWVtYmVyKScpIHtcbiAgICAgICAgbW9kYWxCdXR0b25zID0gJzxidXR0b24gaWQ9XCJidG5DYW5jZWxBcHBsaWNhdGlvbk1vZGFsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWwgTWVtYmVyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgPT09ICdhcHBsaWVkIChwcm9tb3RlciknKSB7XG4gICAgICAgIG1vZGFsQnV0dG9ucyA9ICc8YnV0dG9uIGlkPVwiYnRuQ2FuY2VsQXBwbGljYXRpb25Nb2RhbFwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsIFByb21vdGVyIEFwcGxpY2F0aW9uPC9idXR0b24+JztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpc0JhbmQuYXBwbGljYXRpb25TdGF0dXMgIT09ICdibG9ja2VkJykge1xuICAgICAgICBtb2RhbEJ1dHRvbnMgPSAnPGJ1dHRvbiBpZD1cImJ0bkFwcGx5TWFuYWdlclwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiPkFwcGx5IGZvciBNYW5hZ2VyPC9idXR0b24+JysgXG4gICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwiYnRuQXBwbHlNZW1iZXJcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIj5BcHBseSBmb3IgTWVtYmVyPC9idXR0b24+JytcbiAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gaWQ9XCJidG5BcHBseVByb21vdGVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCI+QXBwbHkgZm9yIFByb21vdGVyPC9idXR0b24+JztcbiAgICB9XG4gICAgXG4gICAgdmFyIGJhbmRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5iYW5kLW1vZGFsJyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLmF0dHIoJ2RhdGEtYmFuZC1pZCcsdGhpc0JhbmQuaWQpO1xuICAgIGJhbmRNb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS5odG1sKHRoaXNCYW5kLmJhbmROYW1lKTtcbiAgICBiYW5kTW9kYWwuZmluZCgnLm1vZGFsLWJvZHknKS5odG1sKCc8cD4nK3RoaXNCYW5kLmRlc2NyaXB0aW9uKyc8L3A+Jyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXInKS5odG1sKCc8ZGl2IGNsYXNzPVwiZHluYW1pYy1idXR0b25zXCI+PC9kaXY+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+Jyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5keW5hbWljLWJ1dHRvbnMnKS5odG1sKG1vZGFsQnV0dG9ucyk7XG4gICAgYmFuZE1vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG4vKiBnbG9iYWwgU29uZyAqL1xuLyogZ2xvYmFsIFNldExpc3QgKi9cblxuZnVuY3Rpb24gU2V0TGlzdHNQYWdlKGFwcCwgZGF0YSl7XG4gICAgUGFnZS5jYWxsKHRoaXMsIGFwcCwgJCgnI3NldExpc3RzUGFnZScpWzBdLCBTZXRMaXN0c0N0cmwsIFNldExpc3RzVmlldywge1xuICAgICAgICBtZW51OiBuZXcgTWVudUNvbXBvbmVudChhcHAsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6ICcubWVudS1idXR0b24tY29udGFpbmVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xufVxuU2V0TGlzdHNQYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZS5wcm90b3R5cGUpO1xuU2V0TGlzdHNQYWdlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNldExpc3RzUGFnZTtcblxuZnVuY3Rpb24gU2V0TGlzdHNDdHJsKHBhZ2Upe1xuICAgIFBhZ2VDdHJsLmNhbGwodGhpcywgcGFnZSk7XG4gICAgdGhpcy5zb25ncyA9IFtdO1xuICAgIHRoaXMuc2V0TGlzdHMgPSBbXTtcbiAgICB0aGlzLmJhbmRJZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLnJlZHVjZShmdW5jdGlvbiAodmFsLCBjaHVuaywgaW5kZXgsIGFycil7XG4gICAgICAgIHJldHVybiB2YWwgfHwgKGNodW5rID09ICdiYW5kcycgPyBhcnJbaW5kZXgrMV0gOiB1bmRlZmluZWQpO1xuICAgIH0sIHVuZGVmaW5lZCk7XG59XG5TZXRMaXN0c0N0cmwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlQ3RybC5wcm90b3R5cGUpO1xuU2V0TGlzdHNDdHJsLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNldExpc3RzQ3RybDtcblNldExpc3RzQ3RybC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgY3RybCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2N0cmwuYmFuZElkKycvc29uZ3MnLFxuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoc29uZ3Mpe1xuICAgICAgICBjdHJsLnNvbmdzID0gc29uZ3MubWFwKGZ1bmN0aW9uIChzb25nKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU29uZyhzb25nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL2dldCBzZXQgbGlzdHNcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9zZXRsaXN0cycsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKHNldExpc3RzKXtcbiAgICAgICAgY3RybC5zZXRMaXN0cyA9IHNldExpc3RzLm1hcChmdW5jdGlvbiAoc2V0TGlzdCl7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFNldExpc3Qoc2V0TGlzdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZWZlci5yZXNvbHZlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblNldExpc3RzQ3RybC5wcm90b3R5cGUuc2F2ZVNldExpc3QgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciBjdHJsID0gdGhpcztcbiAgICBcbiAgICB2YXIgbW9kaWZpZWRGb3JtID0gJC5jbG9uZShmb3JtKTtcbiAgICAkKG1vZGlmaWVkRm9ybSkuZmluZCgnaW5wdXRbdHlwZT1jaGVja2JveF06bm90KDpjaGVja2VkKScpLnJlbW92ZSgpO1xuICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShtb2RpZmllZEZvcm0pO1xuICAgIFxuICAgIC8vZGV0ZXJtaW5lIGlmIHdlJ3JlIGVkaXRpbmcgb3IgY3JlYXRpbmdcbiAgICB2YXIgdXJsLCBtZXRob2Q7XG4gICAgaWYoICQobW9kaWZpZWRGb3JtKS5maW5kKCdbbmFtZT1zZXQtbGlzdC1pZF0nKS52YWwoKSAhPT0gJycgKXtcbiAgICAgICAgdXJsID0gJy9hcGkvYmFuZHMvJytjdHJsLmJhbmRJZCsnL3NldGxpc3RzLycrJChtb2RpZmllZEZvcm0pLmZpbmQoJ1tuYW1lPXNldC1saXN0LWlkXScpLnZhbCgpO1xuICAgICAgICBtZXRob2QgPSAnUFVUJztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdXJsID0gJy9hcGkvYmFuZHMvJytjdHJsLmJhbmRJZCsnL3NldGxpc3RzJztcbiAgICAgICAgbWV0aG9kID0gJ1BPU1QnO1xuICAgIH1cbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgdHlwZTogbWV0aG9kLFxuICAgICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuZmFpbChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuU2V0TGlzdHNDdHJsLnByb3RvdHlwZS5kZWxldGVTZXRMaXN0ID0gZnVuY3Rpb24gKHNldExpc3RJZCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICBjdHJsID0gdGhpcztcbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvYXBpL2JhbmRzLyR7Y3RybC5iYW5kSWR9L3NldGxpc3RzLyR7c2V0TGlzdElkfWAsXG4gICAgICAgIHR5cGU6ICdERUxFVEUnXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBTZXRMaXN0c1ZpZXcocGFnZSl7XG4gICAgUGFnZVZpZXcuY2FsbCh0aGlzLCBwYWdlKTtcbiAgICB0aGlzLnNldExpc3RTb25ncyA9IFtdO1xufVxuU2V0TGlzdHNWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblNldExpc3RzVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZXRMaXN0c1ZpZXc7XG5TZXRMaXN0c1ZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xufTtcblxuU2V0TGlzdHNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgdmlldyA9IHRoaXM7XG4gICAgLy9yZW5kZXIgdGhlIHNvbmdzIHRvIHRoZSBzb25nIG1vZGFsXG4gICAgdmFyIHNldExpc3RzRWxlbSA9ICQodmlldy5wYWdlLmVsZW0pLmZpbmQoJy5zZXQtbGlzdHMnKTtcbiAgICBzZXRMaXN0c0VsZW0uZW1wdHkoKTtcbiAgICB2aWV3LnBhZ2UuY3RybC5zZXRMaXN0cy5mb3JFYWNoKGZ1bmN0aW9uIChzZXRMaXN0LCBpbmRleCl7XG4gICAgICAgIHNldExpc3RzRWxlbS5hcHBlbmQoYFxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDovL1wiIGNsYXNzPVwic2V0LWxpc3QgbGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1hY3Rpb25cIiBkYXRhLXNldC1saXN0LWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDAganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0xXCI+JHtzZXRMaXN0Lm5hbWV9PC9oNT5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0xXCI+JHtzZXRMaXN0LnRvdGFsTGVuZ3RoKCl9PC9oNT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2E+YCk7XG4gICAgfSk7XG59O1xuXG5TZXRMaXN0c1ZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICAgICAgdmlldyA9IHRoaXM7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5hZGQtc2V0LWxpc3QnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcuc2hvd1NldExpc3RNb2RhbCgpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcubW9kYWwgLmRlbGV0ZS1zZXQtbGlzdCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgaWYoIHZpZXcucGFnZS5jdHJsLnNhdmluZyApe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgbW9kYWwgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpO1xuICAgICAgICBtb2RhbC5maW5kKCcuZGVsZXRlLXNldC1saXN0JykuaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzZXRMaXN0SWQgPSBtb2RhbC5maW5kKCdbbmFtZT1zZXQtbGlzdC1pZF0nKS52YWwoKSxcbiAgICAgICAgICAgIGRlbGV0ZVByb21pc2U7XG4gICAgICAgIFxuICAgICAgICAvL2p1c3QgY2xvc2UgdGhlIG1vZGFsIGlmIHdlIGRvbid0IGhhdmUgYW4gaWRcbiAgICAgICAgaWYoIHNldExpc3RJZCA9PT0gJycgKXtcbiAgICAgICAgICAgIGRlbGV0ZVByb21pc2UgPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlUHJvbWlzZSA9IHZpZXcucGFnZS5jdHJsLmRlbGV0ZVNldExpc3Qoc2V0TGlzdElkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZGVsZXRlUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2V0TGlzdEluZGV4ID0gdmlldy5wYWdlLmN0cmwuc2V0TGlzdHMucmVkdWNlKGZ1bmN0aW9uICh2YWwsIHNldExpc3QsIGluZGV4KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgPyB2YWwgOiAoc2V0TGlzdC5pZCA9PSBzZXRMaXN0SWQgPyBpbmRleCA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9LHVuZGVmaW5lZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCBzZXRMaXN0SW5kZXggIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNldExpc3RzLnNwbGljZShzZXRMaXN0SW5kZXgsMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZpZXcucmVuZGVyKCk7XG4gICAgICAgICAgICBtb2RhbC5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgICAgbW9kYWwuZmluZCgnLmRlbGV0ZS1zZXQtbGlzdCcpLmh0bWwoJ0RlbGV0ZSBTZXQgTGlzdCcpO1xuICAgICAgICAgICAgbW9kYWwuZmluZCgnLmFsZXJ0JykucmVtb3ZlKCk7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJ2Zvcm0nKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPidcbiAgICAgICAgICAgICAgKyc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj4nXG4gICAgICAgICAgICAgICAgKyc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8L2J1dHRvbj4nXG4gICAgICAgICAgICAgICsnPHN0cm9uZz5VbmFibGUgdG8gZGVsZXRlIHNldCBsaXN0ITwvc3Ryb25nPidcbiAgICAgICAgICAgICsnPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5kZWxldGUtc2V0LWxpc3QnKS5odG1sKCdEZWxldGUgU2V0IExpc3QnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5tb2RhbCAuc2F2ZS1zZXQtbGlzdCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCdmb3JtJykuc3VibWl0KCk7XG4gICAgfSk7XG4gICAgcGFnZUVsZW0ub24oJ3N1Ym1pdCcsICcubW9kYWwgZm9ybScsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiggdmlldy5wYWdlLmN0cmwuc2F2aW5nICl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKTtcbiAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCcuc2F2ZS1zZXQtbGlzdCcpLmh0bWwoJzxkaXYgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGFuaW1hdGlvbi1zcGluXCI+PC9kaXY+Jyk7XG4gICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmVTZXRMaXN0KHRoaXMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChuZXdTZXRMaXN0KXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNldExpc3RJbmRleCA9IHZpZXcucGFnZS5jdHJsLnNldExpc3RzLnJlZHVjZShmdW5jdGlvbiAodmFsLCBzZXRMaXN0LCBpbmRleCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID8gdmFsIDogKHNldExpc3QuaWQgPT0gbmV3U2V0TGlzdC5pZCA/IGluZGV4IDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0sdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIHNldExpc3RJbmRleCAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2V0TGlzdHNbc2V0TGlzdEluZGV4XSA9IG5ldyBTZXRMaXN0KG5ld1NldExpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zZXRMaXN0cy5wdXNoKG5ldyBTZXRMaXN0KG5ld1NldExpc3QpKTtcbiAgICAgICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zZXRMaXN0cyA9IHZpZXcucGFnZS5jdHJsLnNldExpc3RzLnNvcnQoZnVuY3Rpb24gKGEsYil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLm5hbWUgPCBiLm5hbWUgPyAtMSA6IChhLm5hbWUgPiBiLm5hbWUgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCcuc2F2ZS1zZXQtbGlzdCcpLmh0bWwoJ1NhdmUgU2V0IExpc3QnKTtcbiAgICAgICAgICAgIGZvcm0ucGFyZW50cygnLm1vZGFsJykuZmluZCgnLmFsZXJ0JykucmVtb3ZlKCk7XG4gICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpe1xuICAgICAgICAgICAgLy9kaXNwbGF5IGxvZ2luIGZhaWx1cmVcbiAgICAgICAgICAgIGZvcm0ucHJlcGVuZCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWRhbmdlciBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dcIiByb2xlPVwiYWxlcnRcIj4nXG4gICAgICAgICAgICAgICsnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+J1xuICAgICAgICAgICAgICAgICsnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPC9idXR0b24+J1xuICAgICAgICAgICAgICArJzxzdHJvbmc+VW5hYmxlIHRvIHNhdmUgc2V0IGxpc3QhPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCcuc2F2ZS1zZXQtbGlzdCcpLmh0bWwoJ1NhdmUgU2V0IExpc3QnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5zZXQtbGlzdCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmlldy5zaG93U2V0TGlzdE1vZGFsKHZpZXcucGFnZS5jdHJsLnNldExpc3RzWyQodGhpcykuYXR0cignZGF0YS1zZXQtbGlzdC1pbmRleCcpXSk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2tleXVwJywgJy5zZWFyY2gnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZhciBzZWFyY2ggPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHNldExpc3RFbGVtcyA9IHBhZ2VFbGVtLmZpbmQoJy5zb25nJyk7XG4gICAgICAgIHZpZXcucGFnZS5jdHJsLnNldExpc3RzLmZvckVhY2goZnVuY3Rpb24gKHNldExpc3QsIGluZGV4KXtcbiAgICAgICAgICAgIGlmKCBzZXRMaXN0Lm5hbWUuaW5kZXhPZihzZWFyY2gpICE9PSAtMSApe1xuICAgICAgICAgICAgICAgICQoc2V0TGlzdEVsZW1zW2luZGV4XSkucmVtb3ZlQ2xhc3MoJ3NlYXJjaC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJChzZXRMaXN0RWxlbXNbaW5kZXhdKS5hZGRDbGFzcygnc2VhcmNoLWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbigna2V5dXAnLCAnLm1vZGFsIC5zb25nLXNlYXJjaCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgaWYoIHZpZXcuc2VhcmNoaW5nU29uZ3MgKXsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIHZhciBzZWFyY2hWYWwgPSAkKHRoaXMpLnZhbCgpLFxuICAgICAgICAgICAgc29uZ3NFbGVtID0gJCh0aGlzKS5zaWJsaW5ncygnLnNvbmdzJykuZGV0YWNoKCksXG4gICAgICAgICAgICBhbGxTb25nc0VsZW1zID0gc29uZ3NFbGVtLmZpbmQoJy5zb25nLWNoZWNrLWxhYmVsJyk7XG4gICAgICAgIFxuICAgICAgICB2aWV3LnBhZ2UuY3RybC5zb25ncy5mb3JFYWNoKGZ1bmN0aW9uIChzb25nLCBpbmRleCl7XG4gICAgICAgICAgICB2YXIgdGhpc1NvbmcgPSAkKGFsbFNvbmdzRWxlbXNbaW5kZXhdKTtcbiAgICAgICAgICAgIGlmKCBzb25nLm5hbWUuaW5kZXhPZihzZWFyY2hWYWwpICE9PSAtMSApe1xuICAgICAgICAgICAgICAgIHRoaXNTb25nLnJlbW92ZUNsYXNzKCdzZWFyY2gtaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXNTb25nLmFkZENsYXNzKCdzZWFyY2gtaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgJCh0aGlzKS5hZnRlcihzb25nc0VsZW0pO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjaGFuZ2UnLCAnLm1vZGFsIC5zb25nLWNoZWNrLWxhYmVsIGlucHV0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICB2YXIgc29uZ0VsZW0gPSAkKHRoaXMpLnBhcmVudHMoJy5zb25nLWNoZWNrLWxhYmVsJyksXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBzb25nRWxlbS5hdHRyKCdkYXRhLWluZGV4JyksXG4gICAgICAgICAgICBpc0NoZWNrZWQgPSB0aGlzLmNoZWNrZWQsXG4gICAgICAgICAgICBuZXdJbmRleDtcbiAgICAgICAgXG4gICAgICAgIC8vdXBkYXRlIHRoZSBzb25nJ3MgY2hlY2tlZCBzdGF0dXNcbiAgICAgICAgdmlldy5zZXRMaXN0U29uZ3NbY3VycmVudEluZGV4XS5jaGVja2VkID0gaXNDaGVja2VkO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1vdmVkU29uZyA9IHZpZXcuc2V0TGlzdFNvbmdzLnNwbGljZShjdXJyZW50SW5kZXgsMSlbMF07XG4gICAgICAgIGlmKCBpc0NoZWNrZWQgKXtcbiAgICAgICAgICAgIC8vaXRlbSBiZWNhbWUgY2hlY2tlZFxuICAgICAgICAgICAgZm9yKCB2YXIgaT0wOyBpPHZpZXcuc2V0TGlzdFNvbmdzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgICAgICAgICAgaWYoIHZpZXcuc2V0TGlzdFNvbmdzW2ldLm5hbWUudG9Mb3dlckNhc2UoKSA+IG1vdmVkU29uZy5uYW1lLnRvTG93ZXJDYXNlKCkgfHwgIXZpZXcuc2V0TGlzdFNvbmdzW2ldLmNoZWNrZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zZXRMaXN0U29uZ3Muc3BsaWNlKGksMCxtb3ZlZFNvbmcpO1xuICAgICAgICAgICAgICAgICAgICBuZXdJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vbm93IG1vdmUgdGhlIGFjdHVhbCBlbGVtZW50IGFuZCBmaXggdGhlIGVsZW1lbnQgbnVtYmVyc1xuICAgICAgICAgICAgdmFyIGV4aXN0aW5nRWxlbSA9IHNvbmdFbGVtLnNpYmxpbmdzKCdbZGF0YS1pbmRleD0nK25ld0luZGV4KyddJyk7XG4gICAgICAgICAgICBleGlzdGluZ0VsZW0uYmVmb3JlKHNvbmdFbGVtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy9pdGVtIGJlY2FtZSB1bmNoZWNrZWRcbiAgICAgICAgICAgIGZvciggdmFyIGk9MDsgaTx2aWV3LnNldExpc3RTb25ncy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAgICAgICAgIGlmKCAhdmlldy5zZXRMaXN0U29uZ3NbaV0uY2hlY2tlZCAmJiB2aWV3LnNldExpc3RTb25nc1tpXS5uYW1lLnRvTG93ZXJDYXNlKCkgPiBtb3ZlZFNvbmcubmFtZS50b0xvd2VyQ2FzZSgpICl7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0TGlzdFNvbmdzLnNwbGljZShpLDAsbW92ZWRTb25nKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggbmV3SW5kZXggPT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgIC8vdGhpcyBzb3J0cyB0byB0aGUgZW5kIG9mIHRoZSBsaXN0XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSB2aWV3LnNldExpc3RTb25ncy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmlldy5zZXRMaXN0U29uZ3MucHVzaChtb3ZlZFNvbmcpO1xuICAgICAgICAgICAgICAgIC8vbm93IG1vdmUgdGhlIGFjdHVhbCBlbGVtZW50IGFuZCBmaXggdGhlIGVsZW1lbnQgbnVtYmVyc1xuICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ0VsZW0gPSBzb25nRWxlbS5zaWJsaW5ncygnW2RhdGEtaW5kZXg9JysobmV3SW5kZXgpKyddJyk7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdFbGVtLmFmdGVyKHNvbmdFbGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLy9ub3cgbW92ZSB0aGUgYWN0dWFsIGVsZW1lbnQgYW5kIGZpeCB0aGUgZWxlbWVudCBudW1iZXJzXG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nRWxlbSA9IHNvbmdFbGVtLnNpYmxpbmdzKCdbZGF0YS1pbmRleD0nKyhuZXdJbmRleCsxKSsnXScpO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nRWxlbS5iZWZvcmUoc29uZ0VsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBhbGxTb25nRWxlbXMgPSBzb25nRWxlbS5wYXJlbnQoKS5maW5kKCcuc29uZy1jaGVjay1sYWJlbCcpO1xuICAgICAgICBpZiggbmV3SW5kZXggPiBjdXJyZW50SW5kZXggKXtcbiAgICAgICAgICAgIGZvciggdmFyIGk9Y3VycmVudEluZGV4OyBpPD1uZXdJbmRleDsgaSsrICl7XG4gICAgICAgICAgICAgICAgJChhbGxTb25nRWxlbXNbaV0pLmF0dHIoJ2RhdGEtaW5kZXgnLGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IoIHZhciBpPW5ld0luZGV4OyBpPD1jdXJyZW50SW5kZXg7IGkrKyApe1xuICAgICAgICAgICAgICAgICQoYWxsU29uZ0VsZW1zW2ldKS5hdHRyKCdkYXRhLWluZGV4JyxpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuU2V0TGlzdHNWaWV3LnByb3RvdHlwZS5zaG93U2V0TGlzdE1vZGFsID0gZnVuY3Rpb24gKHNldExpc3Qpe1xuICAgIHZhciB2aWV3ID0gdGhpcyxcbiAgICAgICAgc2V0TGlzdE1vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLnNldC1saXN0LW1vZGFsJyk7XG4gICAgXG4gICAgLy9yZW9yZGVyIHRoZSBzb25ncyBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzZXRsaXN0IG9yZGVyXG4gICAgaWYoIHNldExpc3QgKXtcbiAgICAgICAgc2V0TGlzdE1vZGFsLmZpbmQoJ1tuYW1lPXNldC1saXN0LWlkXScpLnZhbChzZXRMaXN0LmlkKTtcbiAgICAgICAgc2V0TGlzdE1vZGFsLmZpbmQoJ1tuYW1lPW5hbWVdJykudmFsKHNldExpc3QubmFtZSk7XG4gICAgICAgIHNldExpc3RNb2RhbC5maW5kKCdbbmFtZT1kZXNjcmlwdGlvbl0nKS52YWwoc2V0TGlzdC5kZXNjcmlwdGlvbik7XG4gICAgICAgIC8vVE9ETzogQ2hlY2sgaXRlbXNcbiAgICAgICAgdmFyIGNoZWNrZWRTb25ncyA9IHNldExpc3Quc29uZ3MucmVkdWNlKGZ1bmN0aW9uIChvYmosIHNvbmcpe1xuICAgICAgICAgICAgb2JqW3NvbmcuaWRdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgXG4gICAgICAgIHZpZXcuc2V0TGlzdFNvbmdzID0gJC5leHRlbmQoW10sIHZpZXcucGFnZS5jdHJsLnNvbmdzKS5tYXAoZnVuY3Rpb24gKHNvbmcpe1xuICAgICAgICAgICAgaWYoIGNoZWNrZWRTb25nc1tzb25nLmlkXSApe1xuICAgICAgICAgICAgICAgIHNvbmcuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc29uZztcbiAgICAgICAgfSkuc29ydChmdW5jdGlvbiAoYSxiKXtcbiAgICAgICAgICAgIGlmKCBhLmNoZWNrZWQgJiYgIWIuY2hlY2tlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIGIuY2hlY2tlZCAmJiAhYS5jaGVja2VkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKCBhLm5hbWUudG9Mb3dlckNhc2UoKSA8IGIubmFtZS50b0xvd2VyQ2FzZSgpICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiggYS5uYW1lLnRvTG93ZXJDYXNlKCkgPiBiLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc2V0TGlzdE1vZGFsLmZpbmQoJ1tuYW1lPXNldC1saXN0LWlkXScpLnZhbCgnJyk7XG4gICAgICAgIHNldExpc3RNb2RhbC5maW5kKCdbbmFtZT1uYW1lXScpLnZhbCgnJyk7XG4gICAgICAgIHNldExpc3RNb2RhbC5maW5kKCdbbmFtZT1kZXNjcmlwdGlvbl0nKS52YWwoJycpO1xuICAgICAgICB2aWV3LnNldExpc3RTb25ncyA9ICQuZXh0ZW5kKFtdLCB2aWV3LnBhZ2UuY3RybC5zb25ncykuc29ydChmdW5jdGlvbiAoYSxiKXtcbiAgICAgICAgICAgIGlmKCBhLmNoZWNrZWQgJiYgIWIuY2hlY2tlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIGIuY2hlY2tlZCAmJiAhYS5jaGVja2VkICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKCBhLm5hbWUudG9Mb3dlckNhc2UoKSA8IGIubmFtZS50b0xvd2VyQ2FzZSgpICl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiggYS5uYW1lLnRvTG93ZXJDYXNlKCkgPiBiLm5hbWUudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHNvbmdzRWxlbSA9IHNldExpc3RNb2RhbC5maW5kKCcuc29uZ3MnKS5kZXRhY2goKS5lbXB0eSgpO1xuICAgIHZpZXcuc2V0TGlzdFNvbmdzLmZvckVhY2goZnVuY3Rpb24gKHNvbmcsIGluZGV4KXtcbiAgICAgICAgc29uZ3NFbGVtLmFwcGVuZCgnJytcbiAgICAgICAgJzxsYWJlbCBjbGFzcz1cImZvcm0tY2hlY2stbGFiZWwgc29uZy1jaGVjay1sYWJlbFwiIGRhdGEtaW5kZXg9XCInK2luZGV4KydcIj4nK1xuICAgICAgICAgICAgJzxpbnB1dCBuYW1lPVwic29uZy0nK3NvbmcuaWQrJ1wiIGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiXCIgdGFiaW5kZXg9XCItMVwiICcrKHNvbmcuY2hlY2tlZD8nY2hlY2tlZCc6JycpKyc+JytcbiAgICAgICAgICAgIHNvbmcubmFtZStcbiAgICAgICAgJzwvbGFiZWw+Jyk7XG4gICAgfSk7XG4gICAgc2V0TGlzdE1vZGFsLmZpbmQoJy5zb25ncy1wYXJlbnQnKS5hcHBlbmQoc29uZ3NFbGVtKTtcbiAgICBcbiAgICBzZXRMaXN0TW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07IiwiLyogZ2xvYmFsIFBhZ2UgKi9cbi8qIGdsb2JhbCBQYWdlVmlldyAqL1xuLyogZ2xvYmFsIFBhZ2VDdHJsICovXG4vKiBnbG9iYWwgJCAqL1xuLyogZ2xvYmFsIE1lbnVDb21wb25lbnQgKi9cbi8qIGdsb2JhbCBTb25nICovXG5cbmZ1bmN0aW9uIFNvbmdzUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNzb25nc1BhZ2UnKVswXSwgU29uZ3NDdHJsLCBTb25nc1ZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblNvbmdzUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblNvbmdzUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTb25nc1BhZ2U7XG5cbmZ1bmN0aW9uIFNvbmdzQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuc2F2aW5nID0gZmFsc2U7XG4gICAgdGhpcy5iYW5kSWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5yZWR1Y2UoZnVuY3Rpb24gKHZhbCwgY2h1bmssIGluZGV4LCBhcnIpe1xuICAgICAgICByZXR1cm4gdmFsIHx8IChjaHVuayA9PSAnYmFuZHMnID8gYXJyW2luZGV4KzFdIDogdW5kZWZpbmVkKTtcbiAgICB9LCB1bmRlZmluZWQpO1xufVxuU29uZ3NDdHJsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZUN0cmwucHJvdG90eXBlKTtcblNvbmdzQ3RybC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTb25nc0N0cmw7XG5Tb25nc0N0cmwucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC9hcGkvYmFuZHMvJHtjdHJsLmJhbmRJZH0vc29uZ3NgLFxuICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoc29uZ3Mpe1xuICAgICAgICBjdHJsLnNvbmdzID0gc29uZ3MubWFwKGZ1bmN0aW9uIChzb25nKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU29uZyhzb25nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcbiAgICB9KVxuICAgIC5jYXRjaChkZWZlci5yZWplY3QpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5Tb25nc0N0cmwucHJvdG90eXBlLnNhdmVTb25nID0gZnVuY3Rpb24oZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICB2YXIgY3RybCA9IHRoaXM7XG4gICAgXG4gICAgLy9kZXRlcm1pbmUgaWYgd2UncmUgZWRpdGluZyBvciBjcmVhdGluZ1xuICAgIHZhciB1cmwsIG1ldGhvZDtcbiAgICBpZiggJChmb3JtKS5maW5kKCdbbmFtZT1zb25nLWlkXScpLnZhbCgpICE9PSAnJyApe1xuICAgICAgICB1cmwgPSBgL2FwaS9iYW5kcy8ke2N0cmwuYmFuZElkfS9zb25ncy8keyQoZm9ybSkuZmluZCgnW25hbWU9c29uZy1pZF0nKS52YWwoKX1gO1xuICAgICAgICBtZXRob2QgPSAnUFVUJztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdXJsID0gYC9hcGkvYmFuZHMvJHtjdHJsLmJhbmRJZH0vc29uZ3NgO1xuICAgICAgICBtZXRob2QgPSAnUE9TVCc7XG4gICAgfVxuICAgIFxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICB0eXBlOiBtZXRob2QsXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cblNvbmdzQ3RybC5wcm90b3R5cGUuZGVsZXRlU29uZyA9IGZ1bmN0aW9uIChzb25nSWQpe1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgY3RybCA9IHRoaXM7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgL2FwaS9iYW5kcy8ke2N0cmwuYmFuZElkfS9zb25ncy8ke3NvbmdJZH1gLFxuICAgICAgICB0eXBlOiAnREVMRVRFJ1xuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuZnVuY3Rpb24gU29uZ3NWaWV3KHBhZ2Upe1xuICAgIFBhZ2VWaWV3LmNhbGwodGhpcywgcGFnZSk7XG59XG5Tb25nc1ZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYWdlVmlldy5wcm90b3R5cGUpO1xuU29uZ3NWaWV3LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNvbmdzVmlldztcblNvbmdzVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG59O1xuXG5Tb25nc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpe1xuICAgIHZhciBzb25nc0VsZW0gPSAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuc29uZ3MtbGlzdCcpO1xuICAgIHNvbmdzRWxlbS5lbXB0eSgpO1xuICAgIFxuICAgIHRoaXMucGFnZS5jdHJsLnNvbmdzLmZvckVhY2goZnVuY3Rpb24gKHNvbmcsIGluZGV4KXtcbiAgICAgICAgc29uZ3NFbGVtLmFwcGVuZChgXG4gICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0Oi8vXCIgY2xhc3M9XCJzb25nIGxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uXCIgZGF0YS1zb25nLWluZGV4PVwiJHtpbmRleH1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDAganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0xXCI+JHtzb25nLm5hbWV9PC9oNT5cbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XCJtYi0xXCI+JHtzb25nLmR1cmF0aW9ufTwvaDU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwibWItMVwiPkNvbXBvc2VyOiAke3NvbmcuY29tcG9zZXJ9PC9wPlxuICAgICAgICA8L2E+YCk7XG4gICAgfSk7XG59O1xuU29uZ3NWaWV3LnByb3RvdHlwZS5iaW5kRXZlbnRzID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIHBhZ2VFbGVtID0gJCh0aGlzLnBhZ2UuZWxlbSksXG4gICAgICAgIHZpZXcgPSB0aGlzO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYWRkLXNvbmcnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZpZXcuc2hvd1NvbmdNb2RhbCgpO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcubW9kYWwgLnNhdmUtc29uZycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCdmb3JtJykuc3VibWl0KCk7XG4gICAgfSk7XG4gICAgXG4gICAgcGFnZUVsZW0ub24oJ2NsaWNrJywgJy5tb2RhbCAuZGVsZXRlLXNvbmcnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGlmKCB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIG1vZGFsID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKTtcbiAgICAgICAgbW9kYWwuZmluZCgnLmRlbGV0ZS1zb25nJykuaHRtbCgnPGRpdiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgYW5pbWF0aW9uLXNwaW5cIj48L2Rpdj4nKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBzb25nSWQgPSBtb2RhbC5maW5kKCdbbmFtZT1zb25nLWlkXScpLnZhbCgpLFxuICAgICAgICAgICAgZGVsZXRlUHJvbWlzZTtcbiAgICAgICAgXG4gICAgICAgIC8vanVzdCBjbG9zZSB0aGUgbW9kYWwgaWYgd2UgZG9uJ3QgaGF2ZSBhbiBpZFxuICAgICAgICBpZiggc29uZ0lkID09PSAnJyApe1xuICAgICAgICAgICAgZGVsZXRlUHJvbWlzZSA9ICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBkZWxldGVQcm9taXNlID0gdmlldy5wYWdlLmN0cmwuZGVsZXRlU29uZyhzb25nSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkZWxldGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgYXVkaW9UcmFjayA9IG1vZGFsLmZpbmQoJ2F1ZGlvJyk7XG4gICAgICAgICAgICBpZiggYXVkaW9UcmFjay5sZW5ndGggKXtcbiAgICAgICAgICAgICAgICBhdWRpb1RyYWNrWzBdLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYXVkaW9UcmFjay5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNvbmdJbmRleCA9IHZpZXcucGFnZS5jdHJsLnNvbmdzLnJlZHVjZShmdW5jdGlvbiAodmFsLCBzb25nLCBpbmRleCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID8gdmFsIDogKHNvbmcuaWQgPT0gc29uZ0lkID8gaW5kZXggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggc29uZ0luZGV4ICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zb25ncy5zcGxpY2Uoc29uZ0luZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgbW9kYWwubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgIG1vZGFsLmZpbmQoJy5kZWxldGUtc29uZycpLmh0bWwoJ0RlbGV0ZSBTb25nJyk7XG4gICAgICAgICAgICBtb2RhbC5maW5kKCcuYWxlcnQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgbG9naW4gZmFpbHVyZVxuICAgICAgICAgICAgbW9kYWwuZmluZCgnZm9ybScpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlVuYWJsZSB0byBkZWxldGUgc29uZyE8L3N0cm9uZz4nXG4gICAgICAgICAgICArJzwvZGl2PicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBtb2RhbC5maW5kKCcuZGVsZXRlLXNvbmcnKS5odG1sKCdEZWxldGUgU29uZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignc3VibWl0JywgJy5tb2RhbCBmb3JtJywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmKCB2aWV3LnBhZ2UuY3RybC5zYXZpbmcgKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpO1xuICAgICAgICBmb3JtLnBhcmVudHMoJy5tb2RhbCcpLmZpbmQoJy5zYXZlLXNvbmcnKS5odG1sKCc8ZGl2IGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBhbmltYXRpb24tc3BpblwiPjwvZGl2PicpO1xuICAgICAgICB2aWV3LnBhZ2UuY3RybC5zYXZlU29uZyh0aGlzKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAobmV3U29uZyl7XG4gICAgICAgICAgICB2YXIgYXVkaW9UcmFjayA9IGZvcm0uZmluZCgnYXVkaW8nKTtcbiAgICAgICAgICAgIGlmKCBhdWRpb1RyYWNrLmxlbmd0aCApe1xuICAgICAgICAgICAgICAgIGF1ZGlvVHJhY2tbMF0ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBhdWRpb1RyYWNrLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc29uZ0luZGV4ID0gdmlldy5wYWdlLmN0cmwuc29uZ3MucmVkdWNlKGZ1bmN0aW9uICh2YWwsIHNvbmcsIGluZGV4KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgPyB2YWwgOiAoc29uZy5pZCA9PSBuZXdTb25nLmlkID8gaW5kZXggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggc29uZ0luZGV4ICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zb25nc1tzb25nSW5kZXhdID0gbmV3U29uZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc29uZ3MucHVzaChuZXdTb25nKTtcbiAgICAgICAgICAgICAgICB2aWV3LnBhZ2UuY3RybC5zb25ncyA9IHZpZXcucGFnZS5jdHJsLnNvbmdzLnNvcnQoZnVuY3Rpb24gKGEsYil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLm5hbWUgPCBiLm5hbWUgPyAtMSA6IChhLm5hbWUgPiBiLm5hbWUgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWV3LnJlbmRlcigpO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCcuc2F2ZS1zb25nJykuaHRtbCgnU2F2ZSBTb25nJyk7XG4gICAgICAgICAgICBmb3JtLnBhcmVudHMoJy5tb2RhbCcpLmZpbmQoJy5hbGVydCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdmlldy5wYWdlLmN0cmwuc2F2aW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgIC8vZGlzcGxheSBsb2dpbiBmYWlsdXJlXG4gICAgICAgICAgICBmb3JtLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXIgYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+J1xuICAgICAgICAgICAgICArJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPidcbiAgICAgICAgICAgICAgICArJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+J1xuICAgICAgICAgICAgICArJzwvYnV0dG9uPidcbiAgICAgICAgICAgICAgKyc8c3Ryb25nPlVuYWJsZSB0byBzYXZlIHNvbmchPC9zdHJvbmc+J1xuICAgICAgICAgICAgKyc8L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHZpZXcucGFnZS5jdHJsLnNhdmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgZm9ybS5wYXJlbnRzKCcubW9kYWwnKS5maW5kKCcuc2F2ZS1zb25nJykuaHRtbCgnU2F2ZSBTb25nJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuc29uZycsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmlldy5zaG93U29uZ01vZGFsKHZpZXcucGFnZS5jdHJsLnNvbmdzWyQodGhpcykuYXR0cignZGF0YS1zb25nLWluZGV4JyldKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignaGlkZS5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHZhciBhdWRpb1RyYWNrID0gJCh0aGlzKS5maW5kKCdhdWRpbycpO1xuICAgICAgICBpZiggYXVkaW9UcmFjay5sZW5ndGggKXtcbiAgICAgICAgICAgIGF1ZGlvVHJhY2tbMF0ucGF1c2UoKTtcbiAgICAgICAgICAgIGF1ZGlvVHJhY2sucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbigna2V5dXAnLCAnLnNlYXJjaCcsIGZ1bmN0aW9uIChlKXtcbiAgICAgICAgdmFyIHNlYXJjaCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgc29uZ0VsZW1zID0gcGFnZUVsZW0uZmluZCgnLnNvbmcnKTtcbiAgICAgICAgdmlldy5wYWdlLmN0cmwuc29uZ3MuZm9yRWFjaChmdW5jdGlvbiAoc29uZywgaW5kZXgpe1xuICAgICAgICAgICAgaWYoIHNvbmcubmFtZS5pbmRleE9mKHNlYXJjaCkgIT09IC0xIHx8IHNvbmcuY29tcG9zZXIuaW5kZXhPZihzZWFyY2gpICE9PSAtMSApe1xuICAgICAgICAgICAgICAgICQoc29uZ0VsZW1zW2luZGV4XSkucmVtb3ZlQ2xhc3MoJ3NlYXJjaC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJChzb25nRWxlbXNbaW5kZXhdKS5hZGRDbGFzcygnc2VhcmNoLWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cblNvbmdzVmlldy5wcm90b3R5cGUuc2hvd1NvbmdNb2RhbCA9IGZ1bmN0aW9uIChzb25nKXtcbiAgICB2YXIgc29uZ01vZGFsID0gJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLnNvbmctbW9kYWwnKTtcbiAgICBcbiAgICBpZiggc29uZyApe1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9c29uZy1pZF0nKS52YWwoc29uZy5pZCk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1uYW1lXScpLnZhbChzb25nLm5hbWUpO1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBzb25nLmR1cmF0aW9uLnNwbGl0KC86L2cpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9ZHVyYXRpb24taG91cnNdJykudmFsKGR1cmF0aW9uWzBdKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWR1cmF0aW9uLW1pbnNdJykudmFsKGR1cmF0aW9uWzFdKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWR1cmF0aW9uLXNlY3NdJykudmFsKGR1cmF0aW9uWzJdKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWx5cmljc10nKS52YWwoc29uZy5seXJpY3MpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9Y29tcG9zZXJdJykudmFsKHNvbmcuY29tcG9zZXIpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9bGlua10nKS52YWwoc29uZy5saW5rKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJy5jdXJyZW50LWxpbmsgYScpLmF0dHIoJ2hyZWYnLCBzb25nLmxpbmspLmh0bWwoc29uZy5saW5rKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPXNvbmctZmlsZV0nKS52YWwoJycpO1xuICAgICAgICBpZiggc29uZy5wYXRoICl7XG4gICAgICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9c29uZy1wYXRoXScpLnZhbChzb25nLnBhdGgpO1xuICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gc29uZy5wYXRoLnNwbGl0KC9cXC8vZykuc2xpY2UoLTEpWzBdO1xuICAgICAgICAgICAgdmFyIG1pbWVUeXBlO1xuICAgICAgICAgICAgc3dpdGNoKGZpbGVOYW1lLnNwbGl0KC9cXC4vZykuc2xpY2UoLTEpWzBdKXtcbiAgICAgICAgICAgICAgICBjYXNlICd3YXYnOiBtaW1lVHlwZSA9ICdhdWRpby93YXYnOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtcDMnOiBtaW1lVHlwZSA9ICdhdWRpby9tcDMnOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvZ2cnOiBtaW1lVHlwZSA9ICdhdWRpby9vZ2cnOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvbmdNb2RhbC5maW5kKCcuZmlsZS1hdWRpbycpLmZpbmQoJ2F1ZGlvJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBzb25nTW9kYWwuZmluZCgnLmZpbGUtYXVkaW8nKS5hcHBlbmQoYDxhdWRpbyBjb250cm9scz48c291cmNlIHNyYz1cIiR7c29uZy5wYXRofVwiIHR5cGU9XCIke21pbWVUeXBlfVwiPjwvYXVkaW8+YCk7XG4gICAgICAgICAgICBzb25nTW9kYWwuZmluZCgnLmN1cnJlbnQtZmlsZSBhJykuYXR0cihcImhyZWZcIiwgc29uZy5wYXRoKS5odG1sKGZpbGVOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPXNvbmctcGF0aF0nKS52YWwoJycpO1xuICAgICAgICAgICAgc29uZ01vZGFsLmZpbmQoJy5maWxlLWF1ZGlvJykuZmluZCgnYXVkaW8nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHNvbmdNb2RhbC5maW5kKCcuY3VycmVudC1maWxlIGEnKS5hdHRyKFwiaHJlZlwiLCAnamF2YXNjcmlwdDovLycpLmh0bWwoJ05vbmUnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9c29uZy1pZF0nKS52YWwoJycpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9bmFtZV0nKS52YWwoJycpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9ZHVyYXRpb24taG91cnNdJykudmFsKCcwMCcpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9ZHVyYXRpb24tbWluc10nKS52YWwoJzAwJyk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCdbbmFtZT1kdXJhdGlvbi1zZWNzXScpLnZhbCgnMDAnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWx5cmljc10nKS52YWwoJycpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9Y29tcG9zZXJdJykudmFsKCcnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPWxpbmtdJykudmFsKCcnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJy5jdXJyZW50LWxpbmsgYScpLmF0dHIoJ2hyZWYnLCAnamF2YXNjcmlwdDovLycpLmh0bWwoJ05vbmUnKTtcbiAgICAgICAgc29uZ01vZGFsLmZpbmQoJ1tuYW1lPXNvbmctZmlsZV0nKS52YWwoJycpO1xuICAgICAgICBzb25nTW9kYWwuZmluZCgnW25hbWU9c29uZy1wYXRoXScpLnZhbCgnJyk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCcuZmlsZS1hdWRpbycpLmZpbmQoJ2F1ZGlvJykucmVtb3ZlKCk7XG4gICAgICAgIHNvbmdNb2RhbC5maW5kKCcuY3VycmVudC1maWxlIGEnKS5hdHRyKFwiaHJlZlwiLCAnamF2YXNjcmlwdDovLycpLmh0bWwoJ05vbmUnKTtcbiAgICB9XG4gICAgXG4gICAgc29uZ01vZGFsLmZpbmQoJy5tb2RhbCcpLm1vZGFsKCk7XG59OyIsIi8qIGdsb2JhbCBQYWdlICovXG4vKiBnbG9iYWwgUGFnZVZpZXcgKi9cbi8qIGdsb2JhbCBQYWdlQ3RybCAqL1xuLyogZ2xvYmFsICQgKi9cbi8qIGdsb2JhbCBNZW51Q29tcG9uZW50ICovXG5cbmZ1bmN0aW9uIFN0b3JlUGFnZShhcHAsIGRhdGEpe1xuICAgIFBhZ2UuY2FsbCh0aGlzLCBhcHAsICQoJyNzdG9yZVBhZ2UnKVswXSwgU3RvcmVDdHJsLCBTdG9yZVZpZXcsIHtcbiAgICAgICAgbWVudTogbmV3IE1lbnVDb21wb25lbnQoYXBwLCB7XG4gICAgICAgICAgICBlbGVtZW50OiAnLm1lbnUtYnV0dG9uLWNvbnRhaW5lcidcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblN0b3JlUGFnZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2UucHJvdG90eXBlKTtcblN0b3JlUGFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdG9yZVBhZ2U7XG5cbmZ1bmN0aW9uIFN0b3JlQ3RybChwYWdlKXtcbiAgICBQYWdlQ3RybC5jYWxsKHRoaXMsIHBhZ2UpO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLmNhcnRJdGVtcyA9IFtdO1xuICAgIHRoaXMuYmFuZElkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykucmVkdWNlKGZ1bmN0aW9uICh2YWwsIGNodW5rLCBpbmRleCwgYXJyKXtcbiAgICAgICAgcmV0dXJuIHZhbCB8fCAoY2h1bmsgPT0gJ2JhbmRzJyA/IGFycltpbmRleCsxXSA6IHVuZGVmaW5lZCk7XG4gICAgfSwgdW5kZWZpbmVkKTtcbn1cblN0b3JlQ3RybC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhZ2VDdHJsLnByb3RvdHlwZSk7XG5TdG9yZUN0cmwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3RvcmVDdHJsO1xuU3RvcmVDdHJsLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xuICAgIHRoaXMuZ2V0SW52ZW50b3J5KClcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGNvbnNvbGUuZXJyb3IpO1xuICAgIFxuICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XG59O1xuXG5TdG9yZUN0cmwucHJvdG90eXBlLmdldEludmVudG9yeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkZWZlciA9ICQuRGVmZXJyZWQoKSxcbiAgICAgICAgY3RybCA9IHRoaXMsXG4gICAgICAgIHRoYXQgPSB0aGlzO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2N0cmwuYmFuZElkKycvaW52ZW50b3J5JywgXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uIChpdGVtcyl7XG4gICAgICAgIGN0cmwuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgY3RybC5nZXRDYXJ0KClcbiAgICAgICAgLnRoZW4odGhhdC5wYWdlLnZpZXcuYnVpbGRJbnZlbnRvcnlMaXN0KCkpXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmVycm9yKVxuICAgIH0pXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufVxuXG5TdG9yZUN0cmwucHJvdG90eXBlLmdldENhcnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgICAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL2FwaS9iYW5kcy8nK2N0cmwuYmFuZElkKycvZ2V0Y2FydGl0ZW1zJywgXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbiAoY2FydEl0ZW1zKXtcbiAgICAgICAgY3RybC5jYXJ0SXRlbXMgPSBjYXJ0SXRlbXM7XG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn1cblxuU3RvcmVDdHJsLnByb3RvdHlwZS5hZGRUb0NhcnQgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICBjdHJsID0gdGhpcztcbiAgICAgICBcbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9hZGR0b2NhcnQnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgfSlcbiAgICAudGhlbihjdHJsLmdldENhcnQoKSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cblN0b3JlQ3RybC5wcm90b3R5cGUudXBkYXRlQ2FydCA9IGZ1bmN0aW9uIChmb3JtKXtcbiAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCksXG4gICAgICAgIGN0cmwgPSB0aGlzO1xuICAgICAgIFxuICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9hcGkvYmFuZHMvJytjdHJsLmJhbmRJZCsnL3VwZGF0ZUNhcnQnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgfSlcbiAgICAudGhlbihjdHJsLmdldENhcnQoKSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTtcbn07XG5cblN0b3JlQ3RybC5wcm90b3R5cGUuZW1wdHlDYXJ0ID0gZnVuY3Rpb24gKCl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICBjdHJsID0gdGhpcztcbiAgICBcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9lbXB0eWNhcnQnLFxuICAgICAgICB0eXBlOiAnREVMRVRFJ1xuICAgIH0pXG4gICAgLnRoZW4oY3RybC5nZXRDYXJ0KCkpXG4gICAgLnRoZW4oZGVmZXIucmVzb2x2ZSlcbiAgICAuY2F0Y2goZGVmZXIucmVqZWN0KTtcbiAgICBcbiAgICByZXR1cm4gZGVmZXIucHJvbWlzZSgpO1xufTtcblxuU3RvcmVDdHJsLnByb3RvdHlwZS5wYXlPdXQgPSBmdW5jdGlvbiAoZm9ybSl7XG4gICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpLFxuICAgICAgICBjdHJsID0gdGhpcztcbiAgICAgICBcbiAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvYXBpL2JhbmRzLycrY3RybC5iYW5kSWQrJy9wYXlvdXQnLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlXG4gICAgfSlcbiAgICAudGhlbihkZWZlci5yZXNvbHZlKVxuICAgIC5mYWlsKGRlZmVyLnJlamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2UoKTsgICAgXG59XG5cbmZ1bmN0aW9uIFN0b3JlVmlldyhwYWdlKXtcbiAgICBQYWdlVmlldy5jYWxsKHRoaXMsIHBhZ2UpO1xufVxuU3RvcmVWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGFnZVZpZXcucHJvdG90eXBlKTtcblN0b3JlVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdG9yZVZpZXc7XG5TdG9yZVZpZXcucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLmJ1aWxkSW52ZW50b3J5TGlzdCgpO1xufTtcblxuU3RvcmVWaWV3LnByb3RvdHlwZS5idWlsZEludmVudG9yeUxpc3QgPSBmdW5jdGlvbiAoKXtcbiAgICAkKHRoaXMucGFnZS5lbGVtKS5maW5kKCcuaW52ZW50b3J5JykucmVtb3ZlKCk7XG4gICAgJCgnLmludmVudG9yeS1jb250YWluZXInKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJpbnZlbnRvcnkgY2FyZC1ncm91cFwiPjwvZGl2PicpO1xuICAgIHZhciBpdGVtRWxlbSA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5pbnZlbnRvcnknKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICB0aGlzLnBhZ2UuY3RybC5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKXtcbiAgICAgICAgaXRlbUVsZW0uYXBwZW5kKCcnK1xuICAgICAgICAnPGRpdiBjbGFzcz1cInJvd1wiPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbC02LXNtXCI+JytcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmRcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGltZyBjbGFzcz1cImNhcmQtaW1nLXRvcCBpbWctZmx1aWRcIiBzcmM9XCIvbWVkaWEvJytpdGVtLmltYWdlUGF0aCsnXCIgYWx0PVwiQ2FyZCBpbWFnZSBjYXBcIj4nK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNhcmQtYmxvY2sgaW1nLWJsb2NrXCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aDQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+JytpdGVtLm5hbWUrJzwvaDQ+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8cCBjbGFzcz1cImNhcmQtdGV4dFwiPicraXRlbS50eXBlKyc8YnI+Q29sb3I6ICcraXRlbS5jb2xvcisnPGJyPlByaWNlOiAkJytpdGVtLnByaWNlKyc8L3A+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICc8dWwgY2xhc3M9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIiBuYW1lPVwiaW52ZW50b3J5LWxpc3QtJytpdGVtLmlkKydcIj48L3VsPicrXG4gICAgICAgICAgICAgICAgICAgICc8Zm9ybSBpZD1cInVwZGF0ZS1mb3JtLScraXRlbS5pZCsnXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCBjbGFzc1wiZm9ybS1jb250cm9sXCIgZm9ybT1cInVwZGF0ZS1mb3JtLScraXRlbS5pZCsnXCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpdGVtSWRcIiB2YWx1ZT1cIicraXRlbS5pZCsnXCIvPicrXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tYWRkLXRvLWNhcnRcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cInN1Ym1pdFwiIGZvcm09XCJ1cGRhdGUtZm9ybS0nK2l0ZW0uaWQrJ1wiIGRhdGEtaXRlbS1pZD1cIicraXRlbS5pZCsnXCI+QWRkIFRvIENhcnQ8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAnPC9kaXY+Jyk7XG5cbiAgICAgICAgdmFyIGludmVudG9yeUVsZW0gPSAkKHRoYXQucGFnZS5lbGVtKS5maW5kKCdbbmFtZT1pbnZlbnRvcnktbGlzdC0nK2l0ZW0uaWQrJ10nKVxuXG4gICAgICAgIGl0ZW0uaW52ZW50b3J5LmZvckVhY2goZnVuY3Rpb24gKGludmVudG9yeSl7XG4gICAgICAgICAgICB2YXIgcXVhbnRpdGllcyA9ICcnO1xuICAgICAgICAgICAgaWYgKGludmVudG9yeS5zaXplID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICBpbnZlbnRvcnlFbGVtLmFwcGVuZCgnJytcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGNsZWFyZml4XCI+UXVhbnRpdHk6ICcraW52ZW50b3J5LnF1YW50aXR5K1xuICAgICAgICAgICAgICAgICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIGlkPVwiaW52ZW50b3J5SWQtJytpbnZlbnRvcnkuaWQrJ1wiIGZvcm09XCJ1cGRhdGUtZm9ybS0nK2l0ZW0uaWQrJ1wiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaW52ZW50b3J5SWRcIiB2YWx1ZT1cIicraW52ZW50b3J5LmlkKydcIi8+JytcbiAgICAgICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgaWQ9XCJxdWFudGl0eS0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtLScraXRlbS5pZCsnXCIgbmFtZT1cInF1YW50aXR5XCIgcmVxdWlyZWQ+PC9zZWxlY3Q+PC9saT4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGludmVudG9yeUVsZW0uYXBwZW5kKCcnK1xuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5TaXplOiAnK2ludmVudG9yeS5zaXplKyc8YnI+UXVhbnRpdHk6ICcraW52ZW50b3J5LnF1YW50aXR5K1xuICAgICAgICAgICAgICAgICc8aW5wdXQgY2xhc3NcImZvcm0tY29udHJvbFwiIGlkPVwiaW52ZW50b3J5SWQtJytpbnZlbnRvcnkuaWQrJ1wiIGZvcm09XCJ1cGRhdGUtZm9ybS0nK2l0ZW0uaWQrJ1wiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaW52ZW50b3J5SWRcIiB2YWx1ZT1cIicraW52ZW50b3J5LmlkKydcIi8+JytcbiAgICAgICAgICAgICAgICAnPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBkeW5hbWljRmllbGRzXCIgaWQ9XCJxdWFudGl0eS0nK2ludmVudG9yeS5pZCsnXCIgZm9ybT1cInVwZGF0ZS1mb3JtLScraXRlbS5pZCsnXCIgbmFtZT1cInF1YW50aXR5XCIgcmVxdWlyZWQ+PC9zZWxlY3Q+PC9saT4nKTtcbiAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpbnZlbnRvcnkucXVhbnRpdHk7IGkrKyl7XG4gICAgICAgICAgICAgICAgcXVhbnRpdGllcyArPSAnPG9wdGlvbiB2YWx1ZT1cIicraSsnXCI+JytpKyc8L29wdGlvbj4nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJyNxdWFudGl0eS0nK2ludmVudG9yeS5pZCkuYXBwZW5kKHF1YW50aXRpZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgfSk7ICAgIFxufVxuXG5TdG9yZVZpZXcucHJvdG90eXBlLmJpbmRFdmVudHMgPSBmdW5jdGlvbiAoKXtcbiAgICB2YXIgcGFnZUVsZW0gPSAkKHRoaXMucGFnZS5lbGVtKSxcbiAgICBwYWdlID0gdGhpcy5wYWdlO1xuXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgaWQgPSB1cmwuc3BsaXQoJy8nKVsgdXJsLnNwbGl0KCcvJykuaW5kZXhPZignYmFuZHMnKSsxXTtcblxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuLWFkZC10by1jYXJ0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAgICAgIFxuICAgICAgICBwYWdlLmN0cmwuYWRkVG9DYXJ0KHRoaXMuZm9ybSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCl7XG4gICAgICAgICAgICBhbGVydChcIkl0ZW0ocykgYWRkZWQgdG8gY2FydFwiKTtcbiAgICAgICAgICAgIHJldHVybiBwYWdlLmN0cmwuZ2V0Q2FydCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bi12aWV3LWNhcnQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIHBhZ2Uudmlldy5zaG93Q2FydE1vZGFsKCk7XG4gICAgfSlcbiAgICBcbiAgICBwYWdlRWxlbS5vbignY2xpY2snLCAnLmJ0bi1lbXB0eS1jYXJ0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC5lbXB0eUNhcnQoKTtcbiAgICB9KVxuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuLXBheS1vdXQnLCBmdW5jdGlvbiAoZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcGFnZS5jdHJsLnBheU91dCh0aGlzLmZvcm0pXG4gICAgICAgIC50aGVuKHBhZ2UuY3RybC5lbXB0eUNhcnQoKSlcbiAgICAgICAgLnRoZW4ocGFnZS5jdHJsLmdldEludmVudG9yeSgpKVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KVxuICAgIFxuICAgIHBhZ2VFbGVtLm9uKCdjbGljaycsICcuYnRuLXVwZGF0ZS1jYXJ0JywgZnVuY3Rpb24gKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHBhZ2UuY3RybC51cGRhdGVDYXJ0KHRoaXMuZm9ybSlcbiAgICAgICAgLnRoZW4oKVxuICAgICAgICAuZmFpbChjb25zb2xlLmVycm9yKTtcbiAgICB9KSAgIFxufTtcblxuU3RvcmVWaWV3LnByb3RvdHlwZS5zaG93Q2FydE1vZGFsID0gZnVuY3Rpb24gKCl7XG4gICAgXG4gICAgJCgnLmNhcnQtbGlzdCcpLnJlbW92ZSgpO1xuICAgICQoJy5jYXJ0LXRhYmxlJykuZmluZCgndHI6Z3QoMCknKS5yZW1vdmUoKTtcblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgaW52ZW50b3J5RmllbGRzID0gJyc7XG4gICAgdmFyIGNhcnRNb2RhbCA9ICQodGhpcy5wYWdlLmVsZW0pLmZpbmQoJy5jYXJ0LW1vZGFsJyk7XG4gICAgdmFyIGNhcnRJdGVtcyA9IHRoaXMucGFnZS5jdHJsLmNhcnRJdGVtcztcbiAgICB2YXIgY2FydFRvdGFsID0gMDtcbiAgICBcbiAgICB2YXIgbGFzdEl0ZW0gPSAkKHRoYXQucGFnZS5lbGVtKS5maW5kKCcuY2FydC10YWJsZSB0cjpsYXN0Jyk7XG4gICAgY2FydEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pe1xuICAgICAgICB2YXIgcXVhbnRpdGllcyA9ICcnO1xuICAgICAgICBpdGVtLmludmVudG9yeS5mb3JFYWNoKGZ1bmN0aW9uIChpbnZlbnRvcnkpe1xuICAgICAgICAgICAgbGFzdEl0ZW0uYWZ0ZXIoJycrXG4gICAgICAgICAgICAnPHRyPicrXG4gICAgICAgICAgICAgICAgJzx0ZD4nK2l0ZW0udHlwZSsnOiA8c3Ryb25nPicraW52ZW50b3J5LnNpemUrJzwvc3Ryb25nPiAnK2l0ZW0ubmFtZStcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjYXJ0LWltYWdlLWNvbnRhaW5lciBtYi0yXCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aW1nIGNsYXNzPVwiaW1nLWZsdWlkIGNhcnQtaW1hZ2VcIiBzcmM9XCIvbWVkaWEvJytpdGVtLmltYWdlUGF0aCsnXCI+JytcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAgICAgJzwvdGQ+JytcbiAgICAgICAgICAgICAgICAnPHRkPicrXG4gICAgICAgICAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sIGR5bmFtaWNGaWVsZHNcIiBpZD1cImNhcnQtcXVhbnRpdHktJytpbnZlbnRvcnkuaWQrJ1wiIGZvcm09XCJjYXJ0LWZvcm1cIiBuYW1lPVwicXVhbnRpdHlcIiByZXF1aXJlZD4nK1xuICAgICAgICAgICAgICAgICAgICAnPC9zZWxlY3Q+JytcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCBjbGFzc1wiZm9ybS1jb250cm9sXCIgZm9ybT1cImNhcnQtZm9ybVwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiaXRlbUlkXCIgdmFsdWU9XCInK2l0ZW0uaWQrJ1wiLz4nK1xuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IGNsYXNzXCJmb3JtLWNvbnRyb2xcIiBmb3JtPVwiY2FydC1mb3JtXCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpbnZlbnRvcnlJZFwiIHZhbHVlPVwiJytpbnZlbnRvcnkuaWQrJ1wiLz4nK1xuICAgICAgICAgICAgICAgICc8L3RkPicrXG4gICAgICAgICAgICAgICAgJzx0ZCBjbGFzcz1cInRleHQtcmlnaHRcIj4kJytpdGVtLnByaWNlKyc8L3RkPicrXG4gICAgICAgICAgICAnPC90cj4nKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW52ZW50b3J5LnF1YW50aXR5OyBpKyspe1xuICAgICAgICAgICAgICAgIHF1YW50aXRpZXMgKz0gJzxvcHRpb24gdmFsdWU9XCInK2krJ1wiPicraSsnPC9vcHRpb24+J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcjY2FydC1xdWFudGl0eS0nK2ludmVudG9yeS5pZCkuYXBwZW5kKHF1YW50aXRpZXMpO1xuICAgICAgICAgICAgJCgnI2NhcnQtcXVhbnRpdHktJytpbnZlbnRvcnkuaWQpWzBdLnNlbGVjdGVkSW5kZXggPSBpbnZlbnRvcnkuY2FydFF1YW50aXR5O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXJ0VG90YWwgKz0gaXRlbS5wcmljZSAqIGludmVudG9yeS5jYXJ0UXVhbnRpdHk7ICAgIFxuICAgICAgICB9KVxuICAgIH0pXG4gICAgXG4gICAgbGFzdEl0ZW0gPSAkKHRoYXQucGFnZS5lbGVtKS5maW5kKCcuY2FydC10YWJsZSB0cjpsYXN0Jyk7XG4gICAgXG4gICAgbGFzdEl0ZW0uYWZ0ZXIoJzx0cj48dGQgLz48dGQgLz48dGQgY2xhc3M9XCJ0ZXh0LXJpZ2h0XCI+PHN0cm9uZz5Ub3RhbDogPC9zdHJvbmc+JCcrY2FydFRvdGFsKyc8L3RkPicpO1xuXG4gICAgJCh0aGlzLnBhZ2UuZWxlbSkuZmluZCgnLmNhcnQtdG90YWwnKS5odG1sKCckJytjYXJ0VG90YWwpXG5cbiAgICBjYXJ0TW9kYWwuZmluZCgnLm1vZGFsJykubW9kYWwoKTtcbn07XG4iXX0=
