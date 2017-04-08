/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
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
    $.ajax({
        url: '/api/friends/search',
        type: 'POST',
        data: $(form).serialize()
    }).then(function (data){
        that.friends = data;
        that.page.view.updateUsers();
        defer.resolve();
    }).catch(function (err){
        that.friends = [];
        defer.resolve();
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
    
    pageElem.on('click', '.register-band', function (e){
        window.location = '/bands/register';
    });
    pageElem.on('click', '.andrew', function (e){
        window.location = '/bands/' + e.target.id;
    });

    // This will run a search every second when the user presses a key. 
    $(document).on('keypress', 'form', function (e){
        if (searching === false) {
            searching = true;
            setTimeout(function () {
                searching = false;
                console.log('in keypress')
                pageElem.find('form').submit();
            }, 1000);
        }
    });

    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.search(this)
        .then(function (result) {
        })
        .fail(function (err) {
        });
    });


};

AddFriendView.prototype.updateUsers = function (){
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
            modalButtons = '';
        }
        else if (this.page.ctrl.friends[i].status === 'requested') { 
            colorSchema = '"card card-info" style="width: 50rem; cursor: pointer"';
            modalButtons = '';
        }
        else if (this.page.ctrl.friends[i].status === 'pending') { 
            colorSchema = '"card card-warning" style="width: 50rem; cursor: pointer"';
            modalButtons = '';
        }
        else if (this.page.ctrl.friends[i].status === 'blocked') {
            colorSchema = '"card card-inverse" style="background-color: #333; border-color: #333; width: 50rem; cursor: pointer"';
            modalButtons = '';
        }
        else if (this.page.ctrl.friends[i].status === 'none') {
            colorSchema = '"card card-primary" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button type="button" class="btn btn-success" data-dismiss="modal">Send Friend Request</button>';
        }

        // Add card for each user
        friendsElem.append('<div class='+colorSchema+' data-toggle="modal" data-target="#modal'+i+'">'+
                                '<div class="card-block">'+
                                    '<h2 class="card-title">'+this.page.ctrl.friends[i].userName+
                                        '<span style="display:inline-block; width: 10rem;"></span>'+
                                        '<small>('+this.page.ctrl.friends[i].name+')</small>'+
                                        '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.friends[i].status+
                                    '</h2>'+
                                '</div>'+
                            '</div><p/>');
        // Add modal for each user
        friendModal.append('<div id="modal'+i+'" class="modal fade" role="dialog">'+
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