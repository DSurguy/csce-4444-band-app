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

FriendsCtrl.prototype.updateStatus = function (toUserId, status){
    var defer = $.Deferred();
    var that = this;
    var postResult;
    $.ajax({
        url: '/api/friends/updatestatus',
        type: 'POST',
        data: {toUserId : toUserId, status : status}
    }).then(function (result){
        defer.resolve(result);
    }).catch(function (err){
        defer.resolve(result);
    });
    return defer.promise();
}

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
            modalButtons = '<button type="button" class="btn btn-danger" data-dismiss="modal">Unfriend</button>';
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
            modalButtons = '<button type="button" class="btn btn-default" data-dismiss="modal">Unblock User</button>';
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
        page.ctrl.updateStatus(toUserId, 'blocked')
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
    });

    pageElem.on('click', '#btnUnblockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 'none')
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
    });

    pageElem.on('click', '#btnCancelRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 'none')
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
    });

    pageElem.on('click', '#btnAcceptModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 'friend')
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
    });

    pageElem.on('click', '#btnRejectModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 'none')
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
    });

    pageElem.on('click', '#btnUnfriendModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        toUserId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateStatus(toUserId, 'none')
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
    });        
};