/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
var searching = false;

function SearchBandsPage(app, data){
    Page.call(this, app, $('#searchBandsPage')[0], SearchBandsCtrl, SearchBandsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
SearchBandsPage.prototype = Object.create(Page.prototype);
SearchBandsPage.prototype.constructor = SearchBandsPage;

function SearchBandsCtrl(page){
    PageCtrl.call(this, page);
    this.bands = [];
}
SearchBandsCtrl.prototype = Object.create(PageCtrl.prototype);
SearchBandsCtrl.prototype.constructor = SearchBandsCtrl;

SearchBandsCtrl.prototype.search = function (form){
    var defer = $.Deferred();
    var that = this;
    that.bands = [];
    $.ajax({
        url: '/api/bands/search',
        type: 'POST',
        data: $(form).serialize()
    }).then(function (data){
        that.bands = data;
        that.page.view.updateBandList();
        defer.resolve();
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};

// This method will update the relation the application for the current user and the selected band
SearchBandsCtrl.prototype.updateApplication = function (bandId, status){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/bands/updateApplication',
        type: 'POST',
        data: {bandId : bandId, status : status}
    }).then(function (result){
        defer.resolve(result);
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};

// This method will delete the application for the current user and this band
SearchBandsCtrl.prototype.cancelApplication = function (bandId, status){
    var defer = $.Deferred();
    $.ajax({
        url: '/api/bands/cancelApplication',
        type: 'POST',
        data: {bandId : bandId}
    }).then(function (result){
        defer.resolve(result);
    }).catch(function (err){
        defer.reject(err);
    });
    return defer.promise();
};


function SearchBandsView(page){
    PageView.call(this, page);
}
SearchBandsView.prototype = Object.create(PageView.prototype);
SearchBandsView.prototype.constructor = SearchBandsView;
SearchBandsView.prototype.init = function (){   
    this.bindEvents();
};

SearchBandsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
    page = this.page;
    
    // This will run a search every second when the user presses a key. 
    $(document).on('keypress', 'form', function (e){
        if (searching === false) {
            searching = true;
            setTimeout(function () {
                searching = false;
                pageElem.find('form').submit();
            }, 1000);
        }
    });

    // Submitting the search string
    pageElem.on('submit', 'form', function (e){
        e.preventDefault();
        e.stopPropagation();
        page.ctrl.search(this)
        .then(function (result) {
        })
        .fail(function (err) {
        });
    });

    // Handle member application request
    pageElem.on('click', '#btnApplyMemberModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateApplication(bandId, 1)
        .then(function (result) {
            if (result === true) {
                alert("Success!");  
                pageElem.find('form').submit();  
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

    // Handle promoter application request
    pageElem.on('click', '#btnApplyPromoterModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.updateApplication(bandId, 2)
        .then(function (result) {
            if (result === true) {
                alert("Success!");  
                pageElem.find('form').submit();  
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })

    // Handle application cancel request
    pageElem.on('click', '#btnCancelApplicationModal', function (e){
        e.preventDefault();
        e.stopPropagation();
        bandId = this.parentElement.parentElement.parentElement.parentElement.id;
        page.ctrl.cancelApplication(bandId)
        .then(function (result) {
            if (result === true) {
                alert("Success!");    
                pageElem.find('form').submit();
            }
            else {
                alert("Failure!");
            }
        })
        .fail(function (err) {
            alert("Error!");
        });
    })
};

SearchBandsView.prototype.updateBandList = function (){
    var bandsElem = $(this.page.elem).find('.bands');
    var bandModal = $(this.page.elem).find('.band-modal');
    var modalButtons = '';
    var colorSchema = '';
    var badge = '';

    // Clear any current cards from previous search
    $('.card').remove();
    $('.modal').remove();

    for( var i=0; i<this.page.ctrl.bands.length; i++ ){

        // If you have a role then you are in the band, so no modal buttons
        if (this.page.ctrl.bands[i].role != 'none') {
            colorSchema = '"card card-success" style="width: 50rem; cursor: pointer"';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.bands[i].role;
            modalButtons = '';
        }
        // Determine how to style each card and modal based on application status if they do not have a role in the band
        else if (this.page.ctrl.bands[i].applicationStatus === 'applied (member)') {
            colorSchema = '"card card-info" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnCancelApplicationModal" type="button" class="btn btn-default" data-dismiss="modal">Cancel Member Application</button>';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.bands[i].applicationStatus;

        }
        else if (this.page.ctrl.bands[i].applicationStatus === 'applied (promoter)') {
            colorSchema = '"card card-info" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnCancelApplicationModal" type="button" class="btn btn-default" data-dismiss="modal">Cancel Promoter Application</button>';
            badge = '<span class="badge badge-pill badge-default pull-right">'+this.page.ctrl.bands[i].applicationStatus;
        }
        else if (this.page.ctrl.bands[i].applicationStatus === 'rejected') { 
            colorSchema = '"card card-primary" style="width: 50rem; cursor: pointer"';
            modalButtons = ''
        }
        else if (this.page.ctrl.bands[i].applicationStatus === 'none') {
            colorSchema = '"card card-primary" style="width: 50rem; cursor: pointer"';
            modalButtons = '<button id="btnApplyMemberModal" type="button" class="btn btn-success" data-dismiss="modal">Apply as Member</button>'+
                           '<button id="btnApplyPromoterModal" type="button" class="btn btn-success" data-dismiss="modal">Apply as Promoter</button>';
            badge = '';
        }

        // Add card for each band
        bandsElem.append('<div class='+colorSchema+' data-toggle="modal" data-target="#modal'+this.page.ctrl.bands[i].id+'">'+
                                '<div class="card-block">'+
                                    '<h4 class="card-title">'+this.page.ctrl.bands[i].bandName+
                                        '<span style="display:inline-block; width: 10rem;"></span>'+
                                        '<small>('+this.page.ctrl.bands[i].genre+')</small>'+badge+
                                    '</h4>'+
                                '</div>'+
                            '</div><p/>');
        // Add modal for each band
        bandModal.append('<div id="modal'+this.page.ctrl.bands[i].id+'" class="modal fade" role="dialog">'+
                                '<div class="modal-dialog">'+
                                    '<div class="modal-content">'+
                                        '<div class="modal-header">'+
                                            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                            '<h4 class="modal-title">'+this.page.ctrl.bands[i].bandName+'</h4>'+
                                        '</div>'+
                                        '<div class="modal-body">'+
                                            '<p>'+this.page.ctrl.bands[i].description+'</p>'+
                                        '</div>'+
                                        '<div class="modal-footer">'+modalButtons+
                                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>');
    }
};