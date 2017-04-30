/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Member */

function MembersPage(app, data){
    Page.call(this, app, $('#membersPage')[0], MembersCtrl, MembersView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
MembersPage.prototype = Object.create(Page.prototype);
MembersPage.prototype.constructor = MembersPage;

function MembersCtrl(page){
    PageCtrl.call(this, page);
    this.members = [];
}
MembersCtrl.prototype = Object.create(PageCtrl.prototype);
MembersCtrl.prototype.constructor = MembersCtrl;
MembersCtrl.prototype.init = function (){
    var defer = $.Deferred();
    
    var that = this;
    
    $.ajax('/api/members', {
        method: 'GET'
    }).then(function (data){
        that.members = data;
        defer.resolve();
    })
    .catch(defer.reject);

    return defer.promise();
};

MembersCtrl.prototype.updateStatus = function (toUserId, status){
    var defer = $.Deferred();
    
    $.ajax({
        url: '/api/members/updatestatus',
        type: 'POST',
        data: {toUserId : toUserId, status : status}
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

function MembersView(page){
    PageView.call(this, page);
}
MembersView.prototype = Object.create(PageView.prototype);
MembersView.prototype.constructor = MembersView;
MembersView.prototype.init = function (){
    this.bindEvents();
    this.updateUserList();
};

MembersView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;
    
    pageElem.on('click', '.add-member', function (e){
        window.location = '/member/add';
    });

    pageElem.on('click', '.member', function (e){
        page.view.showMemberModal(parseInt($(this).attr('data-member-id'),10));
    });

    pageElem.on('click', '.btnRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-member-id');
        page.ctrl.updateStatus(toUserId, Member.STATUS.REQUESTED)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnBlockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-member-id');
        page.ctrl.updateStatus(toUserId, Member.STATUS.PENDING)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnUnblockModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-member-id');
        page.ctrl.updateStatus(toUserId, Member.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnCancelRequestModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-member-id');
        page.ctrl.updateStatus(toUserId, Member.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnAcceptModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-member-id');
        page.ctrl.updateStatus(toUserId, Member.STATUS.FRIEND)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnRejectModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-member-id');
        page.ctrl.updateStatus(toUserId, Member.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btnUnmemberModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        var toUserId = $(this).parents('.modal').attr('data-member-id');
        page.ctrl.updateStatus(toUserId, Member.STATUS.NONE)
        .then(function (){
            window.location.reload();
        })
        .fail(console.error);
    });        
};

MembersView.prototype.updateUserList = function (){
    var membersElem = $(this.page.elem).find('.members');
    var cardColor = '';
    var badge = '';

    // Clear any current cards from previous search
    membersElem.find('.card').remove();

    for( var i=0; i<this.page.ctrl.members.length; i++ ){
        // Determine how to style each card and modal based on status
        if (this.page.ctrl.members[i].status === 'member') {
            cardColor = 'card-success';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.members[i].status;
        }
        else if (this.page.ctrl.members[i].status === 'requested') { 
            cardColor = 'card-info';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.members[i].status;
        }
        else if (this.page.ctrl.members[i].status === 'pending') { 
            cardColor = 'card-warning';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.members[i].status;
        }
        else if (this.page.ctrl.members[i].status === 'blocked') {
            cardColor = 'card-inverse';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.members[i].status;
        }
        else if (this.page.ctrl.members[i].status === 'none') {
            cardColor = 'card-primary';
            badge = '';
        }

        // Add card for each user
        membersElem.append(''+
        '<div class="member card '+cardColor+'" data-member-id="'+this.page.ctrl.members[i].id+'">'+
            '<div class="card-block">'+
                '<h4 class="card-title">'+this.page.ctrl.members[i].userName+
                    '<span style="display:inline-block; width: 10rem;"></span>'+
                    '<small>('+this.page.ctrl.members[i].name+')</small>'+badge+                                        
                '</h4>'+
            '</div>'+
        '</div><p/>');
    }
};

MembersView.prototype.showMemberModal = function (memberId){
    var thisMember = this.page.ctrl.members.filter(function (member){
        return member.id == memberId;
    })[0],
        modalButtons;
        
    if (thisMember.status === 'member') {
        modalButtons = '<button type="button" class="btn btn-danger btnUnmemberModal" data-dismiss="modal">Unmember</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisMember.status === 'requested') { 
        modalButtons = '<button type="button" class="btn btn-default btnCancelRequestModal" data-dismiss="modal">Cancel Request</button>'+
                       '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisMember.status === 'pending') { 
        modalButtons = '<button type="button" class="btn btn-success btnAcceptModal" data-dismiss="modal">Accept</button>'+
                        '<button type="button" class="btn btn-danger btnRejectModal" data-dismiss="modal">Reject</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    else if (thisMember.status === 'blocked') {
        modalButtons = '<button type="button" class="btn btn-default btnUnblockModal" data-dismiss="modal">Unblock User</button>';
    }
    else if (thisMember.status === 'none') {
        modalButtons = '<button type="button" class="btn btn-success btnRequestModal" data-dismiss="modal">Send Member Request</button>'+
                        '<button type="button" class="btn btn-default btnBlockModal" data-dismiss="modal">Block User</button>';
    }
    
    var memberModal = $(this.page.elem).find('.member-modal');
    memberModal.find('.modal').attr('data-member-id',thisMember.id);
    memberModal.find('.modal-title').html(thisMember.userName);
    memberModal.find('.modal-body').html('<p>'+thisMember.name+'</p><p>'+thisMember.bio+'</p>');
    memberModal.find('.dynamic-buttons').html(modalButtons);
    memberModal.find('.modal').modal();
};