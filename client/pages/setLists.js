/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
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
}
SetListsCtrl.prototype = Object.create(PageCtrl.prototype);
SetListsCtrl.prototype.constructor = SetListsCtrl;

function SetListsView(page){
    PageView.call(this, page);
}
SetListsView.prototype = Object.create(PageView.prototype);
SetListsView.prototype.constructor = SetListsView;
SetListsView.prototype.init = function (){   
    this.bindEvents();
};

SetListsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem);
    
    pageElem.on('click', '.add-set-list', function (e){
        window.location = window.location.pathname+'/new';
    });
};