/* global Page */
/* global PageView */
/* global PageCtrl */
/* global MenuComponent */
/* global $ */
/* global User */

//Send user data to main page
function MainPage(app, data){
    Page.call(this, app, $('#mainPage')[0], MainCtrl, MainView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
MainPage.prototype = Object.create(Page.prototype);
MainPage.prototype.constructor = MainPage;

//Set up the controller for main page
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

//Set page view to main page
function MainView(page){
    PageView.call(this, page);
}
MainView.prototype = Object.create(PageView.prototype);
MainView.prototype.constructor = MainView;
MainView.prototype.init = function (){//takes user to different pages
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