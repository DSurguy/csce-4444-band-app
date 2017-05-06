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
    this.items = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
InventoryCtrl.prototype = Object.create(PageCtrl.prototype);
InventoryCtrl.prototype.constructor = InventoryCtrl;
InventoryCtrl.prototype.init = function (){
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

InventoryCtrl.prototype.updateInventory = function (form){
    var defer = $.Deferred(),
        ctrl = this;
       
    var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/updateinventory',
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

InventoryCtrl.prototype.deleteInventory = function (itemId){
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

function InventoryView(page){
    PageView.call(this, page);
}
InventoryView.prototype = Object.create(PageView.prototype);
InventoryView.prototype.constructor = InventoryView;
InventoryView.prototype.init = function (){
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
                    '<div class="card-block">'+
                        '<button class="btn btn-primary btn-edit" data-item-id="'+item.id+'">Edit</button>'+
                        '<button class="btn btn-danger btn-delete" data-item-id="'+item.id+'">Delete</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');

        var inventoryElem = $(that.page.elem).find('[name=inventory-list-'+item.id+']')

        item.inventory.forEach(function (inventory){
            if (inventory.size === 'none') {
                inventoryElem.append(''+
                    '<li class="list-group-item clearfix">Quantity: '+inventory.quantity+'</li>');
            }
            else {
                inventoryElem.append(''+
                    '<li class="list-group-item">Size: '+inventory.size+'<br>Quantity: '+inventory.quantity+'</li>');
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

    pageElem.on('click', '.btn-edit', function (e){
        page.view.showEditModal(parseInt($(this).attr('data-item-id'),10));
    });

    pageElem.on('submit', '#update-form', function (e){
        e.preventDefault();
        e.stopPropagation();       
        $('.modal').modal('hide');   
        page.ctrl.updateInventory(this)
        .then(function (result) {
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btn-delete', function (e){
        e.preventDefault();
        e.stopPropagation();       
        page.ctrl.deleteInventory(parseInt($(this).attr('data-item-id'),10))
        .then(function (result) {
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '[name="addSize"]', function (e){
        e.preventDefault();
        e.stopPropagation();      
        var type = pageElem.find('[name="type"]')[0].value;
        page.view.addSizeField(type);
    });
};

InventoryView.prototype.showEditModal = function (itemId){
    var thisItem = this.page.ctrl.items.filter(function (item){
        return item.id == itemId;
    })[0],
        modalButtons = '<button class="btn btn-success" name="addSize">Add Size <div class="fa fa-plus icon"></div>';

    $('.item-inventory').remove();

    var that = this;
    var inventoryFields = '';
    var itemModal = $(this.page.elem).find('.item-modal');
    
    $(this.page.elem).find('.modal-body').append('<div class="item-inventory"></div>');

    thisItem.inventory.forEach(function (inventory){   
        if (thisItem.type === 'Shirt') {
            inventoryFields = ''+
            '<label for="size-'+inventory.id+'">Size</label>'+
            '<select class="form-control dynamicFields" id="size-'+inventory.id+'" form="update-form" name="size" required>'+
                '<option value="s">S</option>'+
                '<option value="m">M</option>'+
                '<option value="l">L</option>'+
                '<option value="xl">XL</option>'+
            '</select>';                        
        }
        else if (thisItem.type === 'CD') {
            inventoryFields = '<input class"form-control" id="size-'+inventory.id+'" form="update-form" type="hidden" name="size"/>';
            modalButtons = '';
        }
        else if (thisItem.type === 'Sticker') {
            inventoryFields = ''+
            '<label for="size-'+inventory.id+'">Size</label>'+
            '<select class="form-control dynamicFields" id="size-'+inventory.id+'" form="update-form" name="size" required>'+
                '<option value="1x1">1x1</option>'+
                '<option value="2x2">2x2</option>'+
                '<option value="3x4">3x4</option>'+
                '<option value="5x6">5x6</option>'+
            '</select>';
        }

        // All types have a quantity
        inventoryFields += ''+
        '<label for="quantity-'+inventory.id+'">Quantity</label>'+
        '<input class="form-control dynamicFields quantity" id="quantity-'+inventory.id+'" form="update-form" name="quantity" required type="number" min="0" step="1" placeholder="Quantity" style="margin-bottom: 20px;">'+
        '<input class"form-control" id="inventoryId-'+inventory.id+'" form="update-form" type="hidden" name="inventoryId"/>';

        var inventoryFieldsDiv = $(that.page.elem).find('.item-inventory');
        inventoryFieldsDiv.append(inventoryFields);
          
        $('#size-'+inventory.id)[0].value = inventory.size;    
        $('#quantity-'+inventory.id)[0].value = inventory.quantity;
        $('#inventoryId-'+inventory.id)[0].value = inventory.id;
    });  

    $('[name="itemId"]')[0].value = thisItem.id;         
    $('[name="name"]')[0].value = thisItem.name;  
    $('[name="description"]')[0].value = thisItem.description;
    $('[name="color"]')[0].value = thisItem.color;    
    $('[name="price"]')[0].value = thisItem.price; 
    $('[name="type"]')[0].value = thisItem.type; 

    itemModal.find('.dynamic-buttons').html(modalButtons)
    itemModal.find('.modal').attr('data-item-id',thisItem.id);
    itemModal.find('.modal-title').html(thisItem.name);
    itemModal.find('.modal').modal();
};

InventoryView.prototype.addSizeField = function (type){
    var pageElem = $(this.page.elem),
    page = this.page;

    var inventoryFields = '';

    if (type === 'Shirt') {
        inventoryFields = ''+
        '<select class="form-control dynamicFields" form="update-form" name="size" required>'+
            '<option value="s">S</option>'+
            '<option value="m">M</option>'+
            '<option value="l">L</option>'+
            '<option value="xl">XL</option>'+
        '</select>';                        
    }
    else if (type === 'CD') {
        inventoryFields = '<input class"form-control" form="update-form" type="hidden" name="size"/>';
        modalButtons = '';
    }
    else if (type === 'Sticker') {
        inventoryFields = ''+
        '<select class="form-control dynamicFields" form="update-form" name="size" required>'+
            '<option value="1x1">1x1</option>'+
            '<option value="2x2">2x2</option>'+
            '<option value="3x4">3x4</option>'+
            '<option value="5x6">5x6</option>'+
        '</select>';
    }

    // All types will have a quantity and color
    inventoryFields += '<input class="form-control dynamicFields" form="update-form" required type="number" name="quantity" min="0" step="1" placeholder="Quantity">'+
                       '<input class"form-control" form="update-form" type="hidden" name="inventoryId" value="new"/>';
    var inventoryFieldsDiv = $(this.page.elem).find('.item-inventory');
    inventoryFieldsDiv.append(inventoryFields);
}
