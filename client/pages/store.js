/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */


//this code is all from inventory.js

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

    $.ajax('/api/store', {
        method: 'GET'
    }).then(function (data){
        ctrl.items = data;
        defer.resolve();
    }).catch(defer.reject);
    
    return defer.promise();
};

StoreCtrl.prototype.updateStore = function (form){
    var defer = $.Deferred(),
        ctrl = this;
       
    var formData = new FormData(form);

    $.ajax({
        url: '/api/bands/'+ctrl.bandId+'/updatestore',
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
        url: '/api/bands/'+ctrl.bandId+'/store/'+itemId,
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
    var itemElem = $(this.page.elem).find('.store');
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
                    '<ul class="list-group list-group-flush" name="store-list-'+item.id+'"></ul>'+
                    '<div class="card-block">'+
                        '<button class="btn btn-primary btn-edit" data-item-id="'+item.id+'">Edit</button>'+
                        '<button class="btn btn-danger btn-delete" data-item-id="'+item.id+'">Delete</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');

        var storeElem = $(that.page.elem).find('[name=store-list-'+item.id+']')

        item.store.forEach(function (store){
            if (store.size === 'none') {
                storeElem.append(''+
                    '<li class="list-group-item clearfix">Quantity: '+store.quantity+'</li>');
            }
            else {
                storeElem.append(''+
                    '<li class="list-group-item">Size: '+store.size+'<br>Quantity: '+store.quantity+'</li>');
            }   
        });
    });
};

StoreView.prototype.bindEvents = function (){
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
        page.ctrl.updateStore(this)
        .then(function (result) {
            window.location.reload();
        })
        .fail(console.error);
    });

    pageElem.on('click', '.btn-delete', function (e){
        e.preventDefault();
        e.stopPropagation();       
        page.ctrl.deleteStore(parseInt($(this).attr('data-item-id'),10))
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

StoreView.prototype.showEditModal = function (itemId){
    var thisItem = this.page.ctrl.items.filter(function (item){
        return item.id == itemId;
    })[0],
        modalButtons = '<button class="btn btn-success" name="addSize">Add Size <div class="fa fa-plus icon"></div>';

    $('.item-store').remove();

    var that = this;
    var storeFields = '';
    var itemModal = $(this.page.elem).find('.item-modal');
    
    $(this.page.elem).find('.modal-body').append('<div class="item-store"></div>');

    thisItem.store.forEach(function (store){   
        if (thisItem.type === 'Shirt') {
            storeFields = ''+
            '<label for="size-'+store.id+'">Size</label>'+
            '<select class="form-control dynamicFields" id="size-'+store.id+'" form="update-form" name="size" required>'+
                '<option value="s">S</option>'+
                '<option value="m">M</option>'+
                '<option value="l">L</option>'+
                '<option value="xl">XL</option>'+
            '</select>';                        
        }
        else if (thisItem.type === 'CD') {
            storeFields = '<input class"form-control" id="size-'+store.id+'" form="update-form" type="hidden" name="size"/>';
            modalButtons = '';
        }
        else if (thisItem.type === 'Sticker') {
            storeFields = ''+
            '<label for="size-'+store.id+'">Size</label>'+
            '<select class="form-control dynamicFields" id="size-'+store.id+'" form="update-form" name="size" required>'+
                '<option value="1x1">1x1</option>'+
                '<option value="2x2">2x2</option>'+
                '<option value="3x4">3x4</option>'+
                '<option value="5x6">5x6</option>'+
            '</select>';
        }

        // All types have a quantity
        storeFields += ''+
        '<label for="quantity-'+store.id+'">Quantity</label>'+
        '<input class="form-control dynamicFields quantity" id="quantity-'+store.id+'" form="update-form" name="quantity" required type="number" min="0" step="1" placeholder="Quantity" style="margin-bottom: 20px;">'+
        '<input class"form-control" id="storeId-'+store.id+'" form="update-form" type="hidden" name="storeId"/>';

        var storeFieldsDiv = $(that.page.elem).find('.item-store');
        storeFieldsDiv.append(storeFields);
          
        $('#size-'+store.id)[0].value = store.size;    
        $('#quantity-'+store.id)[0].value = store.quantity;
        $('#storeId-'+store.id)[0].value = store.id;
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

StoreView.prototype.addSizeField = function (type){
    var pageElem = $(this.page.elem),
    page = this.page;

    var storeFields = '';

    if (type === 'Shirt') {
        storeFields = ''+
        '<select class="form-control dynamicFields" form="update-form" name="size" required>'+
            '<option value="s">S</option>'+
            '<option value="m">M</option>'+
            '<option value="l">L</option>'+
            '<option value="xl">XL</option>'+
        '</select>';                        
    }
    else if (type === 'CD') {
        storeFields = '<input class"form-control" form="update-form" type="hidden" name="size"/>';
        modalButtons = '';
    }
    else if (type === 'Sticker') {
        storeFields = ''+
        '<select class="form-control dynamicFields" form="update-form" name="size" required>'+
            '<option value="1x1">1x1</option>'+
            '<option value="2x2">2x2</option>'+
            '<option value="3x4">3x4</option>'+
            '<option value="5x6">5x6</option>'+
        '</select>';
    }

    // All types will have a quantity and color
    storeFields += '<input class="form-control dynamicFields" form="update-form" required type="number" name="quantity" min="0" step="1" placeholder="Quantity">'+
                       '<input class"form-control" form="update-form" type="hidden" name="storeId" value="new"/>';
    var storeFieldsDiv = $(this.page.elem).find('.item-store');
    storeFieldsDiv.append(storeFields);
}
