/* global Page */
/* global PageView */
/* global PageCtrl */
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
    var id = url.substring(url.lastIndexOf('/') + 1);

   // var id = window.location.search.substr(1);
    var defer = $.Deferred();
    var that = this;
    $.ajax('/api/bands/band/' + id, {
        method: 'GET'
    }).then(function (data){
        that.band = data;
        defer.resolve();
    }).catch(function (err){
        that.band = {};
        defer.resolve();
    });
    
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
    bandElem.find('.card-block').append('<p class="info card-text"><strong>Band Name</strong>: '+this.page.ctrl.band[0].bandName+'</p>');
    bandElem.find('.card-block').append('<p class="info card-text"><strong>Owner</strong>: '+this.page.ctrl.band[0].ownerName+'</p>');
    bandElem.find('.card-block').append('<p class="info card-text"><strong>Description</strong>: '+this.page.ctrl.band[0].description+'</p>');
    this.bindEvents();
};

BandView.prototype.bindEvents = function (){};