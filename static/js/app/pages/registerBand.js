/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

function RegisterBandPage(app, data){
    Page.call(this, app, $('#RegisterBandPage')[0], RegisterBandCtrl, RegisterBandView);
}
RegisterBandPage.prototype = Object.create(Page.prototype);
RegisterBandPage.prototype.constructor = RegisterBandPage;

function RegisterBandCtrl(page){
    PageCtrl.call(this, page);
}
RegisterBandCtrl.prototype = Object.create(PageCtrl.prototype);
RegisterBandCtrl.prototype.constructor = RegisterBandCtrl;

function RegisterBandView(page){
    PageView.call(this, page);
}
RegisterBandView.prototype = Object.create(PageView.prototype);
RegisterBandView.prototype.constructor = RegisterBandView;
RegisterBandView.prototype.init = function (){
    this.bindEvents();
};

RegisterBandView.prototype.bindEvents = function (){
    var page = $(this.page);
};