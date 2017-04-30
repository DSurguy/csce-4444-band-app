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