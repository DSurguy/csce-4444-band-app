/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

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
    }).catch(function (err){
        that.friends = [];
        defer.resolve();
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
    var addFriendElem = $(this.page.elem).find('.add-friend');
    var colorSchema = '';
    var badge = '';
    addFriendElem.append('<div class="card" style="background-color: #B291A2; border-color: #0E0A0C; width: 50rem"'+
                            '<div class="card-block"><h2 class="card-title"><span>Connect with other musicians.</span><div class="action add-friend btn btn-secondary pull-right"><div class="fa fa-plus icon"></div></div></div></div><p/>');
    for( var i=0; i<this.page.ctrl.friends.length; i++ ){
        // friendsElem.append('<div class="friend btn btn-secondary" id='+this.page.ctrl.friends[i].id+'>'+this.page.ctrl.friends[i].userName+' <small>('+this.page.ctrl.friends[i].firstName+' '+this.page.ctrl.friends[i].lastName+')</small></div>');
        // friendsElem.append('<div class="card">'
        if (this.page.ctrl.friends[i].status === 'friend') {
            colorSchema = 'card-success';
        }
        else if (this.page.ctrl.friends[i].status === 'requested') { 
            colorSchema = 'card-info';
        }
        else if (this.page.ctrl.friends[i].status === 'pending') { 
            colorSchema = 'card-warning';
        }
        else if (this.page.ctrl.friends[i].status === 'blocked') {
            colorSchema = 'card-danger';
        }

        friendsElem.append('<div class="card '+colorSchema+'" style="width: 50rem">'+
                            '<div class="card-block">'+
                            '<h2 class="card-title">'+this.page.ctrl.friends[i].userName+'<span style="display:inline-block; width: 10rem;"></span><small>('+this.page.ctrl.friends[i].name+')</small><span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status+'</h2>');
/*                            '<div class="card-block bands'+i+'">');
        var bandsElem = $(this.page.elem).find('.bands'+i);
        for( var j=0; j<this.page.ctrl.friends[i].bands.length; j++ ){
            bandsElem.append('<div class="band btn btn-secondary" id='+this.page.ctrl.friends[i].bands[j].id+'>'+this.page.ctrl.friends[i].bands[j].bandName+'</div><span style="display:inline-block; width: 1rem;"></span>');
        }   */ 
        friendsElem.append('</div></div><p/>');
    }


    
    this.bindEvents();
};

FriendsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem);
    
    pageElem.on('click', '.add-friend', function (e){
        window.location = '/friends/add';
    });
    pageElem.on('click', '.friend', function (e){
        window.location = '/friends/' + e.target.id;
    })
};