/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */

function StorePage(app, data){
    Page.call(this, app, $('#storePage')[0], StoreCtrl, StoreView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
StorePage.prototype = Object.create(Page.prototype);
StorePage.prototype.constructor = StorePage;

function StoreCtrl(page){
    PageCtrl.call(this, page);
    this.items = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
StoreCtrl.prototype = Object.create(PageCtrl.prototype);
StoreCtrl.prototype.constructor = StoreCtrl;
StoreCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;

    $.ajax('/api/bands/'+ctrl.bandId+'/inventory', {
        method: 'GET'
    }).then(function (data){
        ctrl.items = data;
        defer.resolve();
    }).catch(defer.reject);
    
    return defer.promise();
};

StoreCtrl.prototype.updateCart = function (form){
    var defer = $.Deferred(),
        ctrl = this;
       
    var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/updatecart',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};

StoreCtrl.prototype.deleteStore = function (itemId){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/inventory/'+itemId,
        type: 'DELETE'
    })
    .then(defer.resolve)
    .catch(defer.reject);
    
    return defer.promise();
};

function StoreView(page){
    PageView.call(this, page);
}
StoreView.prototype = Object.create(PageView.prototype);
StoreView.prototype.constructor = StoreView;
StoreView.prototype.init = function (){
    this.bindEvents();
    var itemElem = $(this.page.elem).find('.inventory');
    var that = this;

    this.page.ctrl.items.forEach(function (item){
        itemElem.append(''+
        '<div class="row">'+
            '<div class="col-6-sm">'+
                '<div class="card">'+
                    '<img class="card-img-top img-fluid" src="/media/'+item.imagePath+'" alt="Card image cap">'+
                    '<div class="card-block img-block">'+
                        '<h4 class="card-title">'+item.name+'</h4>'+
                        '<p class="card-text">'+item.type+'<br>Color: '+item.color+'</p>'+
                    '</div>'+
                    '<ul class="list-group list-group-flush" name="inventory-list-'+item.id+'"></ul>'+
                    '<input class"form-control" form="update-form" type="hidden" name="itemId" value="'+item.id+'"/>'+
                    '<div class="card-block">'+
                        '<button class="btn btn-success btn-add-to-cart" type="submit" name="submit" form="update-form" data-item-id="'+item.id+'">Add To Cart</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');

        var inventoryElem = $(that.page.elem).find('[name=inventory-list-'+item.id+']')

        item.inventory.forEach(function (inventory){
            var quantities = '';
            if (inventory.size === 'none') {
                inventoryElem.append(''+
                '<li class="list-group-item clearfix">Quantity: '+inventory.quantity+
                '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form" type="hidden" name="inventoryId" value="'+inventory.id+'"/>'+
                '<select class="form-control dynamicFields" id="quantity-'+inventory.id+'" form="update-form" name="quantity" required></select></li>');
            }
            else {
                inventoryElem.append(''+
                '<li class="list-group-item">Size: '+inventory.size+'<br>Quantity: '+inventory.quantity+
                '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form" type="hidden" name="inventoryId" value="'+inventory.id+'"/>'+
                '<select class="form-control dynamicFields" id="quantity-'+inventory.id+'" form="update-form" name="quantity" required></select></li>');
            }  
            
            for (var i = 0; i <= inventory.quantity; i++){
                quantities += '<option value="'+i+'">'+i+'</option>'
            }

            $('#quantity-'+inventory.id).append(quantities);
        });
        
    });
};

StoreView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;

    var url = window.location.pathname;
    var id = url.split('/')[ url.split('/').indexOf('bands')+1];

    pageElem.on('submit', '#update-form', function (e){
        e.preventDefault();
        e.stopPropagation();       
        page.ctrl.updateCart(this)
        .then(function (result) {
            window.location.reload();
        })
        .fail(console.error);
    });
};

StoreView.prototype.showAddToCartModal = function (itemId){
    var thisItem = this.page.ctrl.items.filter(function (item){
        return item.id == itemId;
    })[0]

    $('.item-quantities').remove();

    var that = this;
    var storeFormFields = '';
    var itemModal = $(this.page.elem).find('.item-modal');
    
    $(this.page.elem).find('.modal-body').append('<div class="item-quantities"></div>');

    thisItem.inventory.forEach(function (inventory){   
        var quantities = '';
 /*       if (thisItem.type === 'Shirt' || thisItem.type === 'Sticker') {
            storeFormFields = '<label class="mr-sm-2" for="quantity-'+inventory.id+'">'+inventory.size+'</label>';
        }

        // All types have a quantity
        storeFormFields += ''+
        '<select class="form-control dynamicFields" id="quantity-'+inventory.id+'" form="update-form" name="quantities" required></select>'+
        '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form" type="hidden" name="inventoryId"/>';

        var storeFormFieldsDiv = $(that.page.elem).find('.item-quantities');
        storeFormFieldsDiv.append(storeFormFields);*/
        
        for (var i = 0; i <= inventory.quantity; i++){
            quantities += '<option value="'+i+'">'+i+'</option>'
        }
        
        $('#quantity-'+inventory.id).append(quantities);
        $('#inventoryId-'+inventory.id)[0].value = inventory.id;
    });  

    itemModal.find('.modal').attr('data-item-id',thisItem.id);
    itemModal.find('.modal-title').html(thisItem.name);
    itemModal.find('.modal').modal();
};
