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
    this.cartItems = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
StoreCtrl.prototype = Object.create(PageCtrl.prototype);
StoreCtrl.prototype.constructor = StoreCtrl;
StoreCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/inventory', 
        method: 'GET'
    }).then(function (items){
        ctrl.items = items;
        
        return $.ajax({
            url: '/api/bands/'+ctrl.bandId+'/getcartitems', 
            method: 'GET'
        })
    }).then(function (cartItems){
        ctrl.cartItems = cartItems;
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
                        '<p class="card-text">'+item.type+'<br>Color: '+item.color+'<br>Price: $'+item.price+'</p>'+
                    '</div>'+
                    '<ul class="list-group list-group-flush" name="inventory-list-'+item.id+'"></ul>'+
                    '<form id="update-form-'+item.id+'">'+
                    '<input class"form-control" form="update-form-'+item.id+'" type="hidden" name="itemId" value="'+item.id+'"/>'+
                    '<div class="card-block">'+
                        '<button class="btn btn-success btn-add-to-cart" type="submit" name="submit" form="update-form-'+item.id+'" data-item-id="'+item.id+'">Add To Cart</button>'+
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
                '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form-'+item.id+'" type="hidden" name="inventoryId" value="'+inventory.id+'"/>'+
                '<select class="form-control dynamicFields" id="quantity-'+inventory.id+'" form="update-form-'+item.id+'" name="quantity" required></select></li>');
            }
            else {
                inventoryElem.append(''+
                '<li class="list-group-item">Size: '+inventory.size+'<br>Quantity: '+inventory.quantity+
                '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form-'+item.id+'" type="hidden" name="inventoryId" value="'+inventory.id+'"/>'+
                '<select class="form-control dynamicFields" id="quantity-'+inventory.id+'" form="update-form-'+item.id+'" name="quantity" required></select></li>');
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

    pageElem.on('click', '.btn-add-to-cart', function (e){
        e.preventDefault();
        e.stopPropagation();       
        page.ctrl.updateCart(this.form)
        .then(function (result) {
            window.location.reload();
        })
        .fail(console.error);
    });
    
    pageElem.on('click', '.btn-view-cart', function (e){
        page.view.showCartModal();
    })
};

StoreView.prototype.showCartModal = function (){
    
   $('.cart-list').remove();

    var that = this;
    var inventoryFields = '';
    var cartModal = $(this.page.elem).find('.cart-modal');
    var cartItems = this.page.ctrl.cartItems;
    var cartTotal = 0;
    
  //  $(this.page.elem).find('.cart-table').append('<div class="cart-list"></div>');
    var lastItem = $(that.page.elem).find('.cart-table tr:last');
    cartItems.forEach(function (item){
        lastItem.after(''+
        '<tr>'+
            '<td>'+item.type+': '+item.name+
                '<div class="cart-image-container mb-2">'+
                    '<img class="img-fluid cart-image" src="/media/'+item.imagePath+'">'+
                '</div>'+
            '</td>'+
            '<td>'+
                '<select class="form-control dynamicFields" form="cart-form" name="quantity" required>'+
                '<option value="0">0</option>'+
                '<option value="1">1</option>'+
                '<option value="2">2</option>'+
                '<option value="3">3</option>'+
                '</select>'+
            '</td>'+
            '<td class="text-right">$'+item.price+'</td>'+
        '</tr>');
        
        cartTotal += item.price;
    })
    
    lastItem = $(that.page.elem).find('.cart-table tr:last');
    
    lastItem.after('<tr><td /><td /><td class="text-right"><strong>Total: </strong>$'+cartTotal+'</td>');

    $(this.page.elem).find('.cart-total').html('$'+cartTotal)

    cartModal.find('.modal').modal();
};
