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