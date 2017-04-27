/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */

function InventoryPage(app, data){
    Page.call(this, app, $('#inventoryPage')[0], InventoryCtrl, InventoryView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
InventoryPage.prototype = Object.create(Page.prototype);
InventoryPage.prototype.constructor = InventoryPage;

function InventoryCtrl(page){
    PageCtrl.call(this, page);
    this.itemInventory = [];
}
InventoryCtrl.prototype = Object.create(PageCtrl.prototype);
InventoryCtrl.prototype.constructor = InventoryCtrl;
InventoryCtrl.prototype.init = function (){
   var defer = $.Deferred();

    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];
    var that = this; 
    
    var that = this;
    $.ajax('/api/bands/'+id+'/inventory', {
        method: 'GET'
    }).then(function (data){
        that.itemInventory = data;
        defer.resolve();
    }).catch(defer.reject);
    
    return defer.promise();
};

function InventoryView(page){
    PageView.call(this, page);
}
InventoryView.prototype = Object.create(PageView.prototype);
InventoryView.prototype.constructor = InventoryView;
InventoryView.prototype.init = function (){
    this.bindEvents();
    var itemElem = $(this.page.elem).find('.inventory');
    var that = this;

    this.page.ctrl.itemInventory.forEach(function (item){
        itemElem.append(''+
        '<div class="row">'+
            '<div class="col-6-sm">'+
                '<div class="card">'+
                        '<img class="card-img-top img-fluid" src="/media/'+item.imagePath+'" alt="Card image cap">'+
                    '<div class="card-block img-block">'+
                        '<h4 class="card-title">'+item.name+'</h4>'+
                        '<p class="card-text">'+item.description+'</p>'+
                    '</div>'+
                    '<ul class="list-group list-group-flush" name="inventory-list-'+item.id+'"></ul>'+
                    '<div class="card-block">'+
                        '<a href="#" class="card-link">Card link</a>'+
                        '<a href="#" class="card-link">Another link</a>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');

        var inventoryElem = $(that.page.elem).find('[name=inventory-list-'+item.id+']')

        item.inventory.forEach(function (inventory){
            if (inventory.size === 'none') {
                inventoryElem.append(''+
                    '<li class="list-group-item">Color: '+inventory.color+'<br>Quantity: '+inventory.quantity+'</li>');
            }
            else {
                inventoryElem.append(''+
                    '<li class="list-group-item">Size: '+inventory.size+'<br>'+'Color: '+inventory.color+'<br>Quantity: '+inventory.quantity+'</li>');
            }   
        });
    });
};

InventoryView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;

    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];
    var that = this;
    
    pageElem.on('click', '.add-merch', function (e){
        window.location = '/bands/'+id+'/addmerch';
    });
};