/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Song */

function SongsPage(app, data){
    Page.call(this, app, $('#songsPage')[0], SongsCtrl, SongsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
SongsPage.prototype = Object.create(Page.prototype);
SongsPage.prototype.constructor = SongsPage;

function SongsCtrl(page){
    PageCtrl.call(this, page);
    this.saving = false;
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
SongsCtrl.prototype = Object.create(PageCtrl.prototype);
SongsCtrl.prototype.constructor = SongsCtrl;
SongsCtrl.prototype.init = function (){
    var defer = $.Deferred(),
        ctrl = this;
    
    $.ajax({
        url: `/api/bands/${ctrl.bandId}/songs`,
        method: 'GET'
    })
    .then(function (songs){
        ctrl.songs = songs.map(function (song){
            return new Song(song);
        });
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};

SongsCtrl.prototype.saveSong = function(form){
    var defer = $.Deferred();
    var formData = new FormData(form);
    var ctrl = this;
    
    $.ajax({
        url: `/api/bands/${ctrl.bandId}/songs`,
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

function SongsView(page){
    PageView.call(this, page);
}
SongsView.prototype = Object.create(PageView.prototype);
SongsView.prototype.constructor = SongsView;
SongsView.prototype.init = function (){
    this.render();
    this.bindEvents();
};

SongsView.prototype.render = function (){
    var songsElem = $(this.page.elem).find('.songs-list');
    
    this.page.ctrl.songs.forEach(function (song){
        songsElem.append(`
        <a href="javascript://" class="song list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${song.name}</h5>
                <h5 class="mb-1">${song.duration}</h5>
            </div>
            <p class="mb-1">Composer: ${song.composer}</p>
        </a>`);
    });
};
SongsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.add-song', function (e){
        view.showSongModal();
    });
    
    pageElem.on('click', '.save-song', function (e){
        $(this).parents('.modal').find('form').submit();
    });
    
    pageElem.on('submit', '.modal form', function (e){
        e.preventDefault();
        e.stopPropagation();
        if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        var form = $(this);
        form.parents('.modal').find('.save-song').html('<div class="fa fa-spinner animation-spin"></div>');
        view.page.ctrl.saveSong(this)
        .then(function (){
            view.page.ctrl.saving = false;
            form.parents('.modal').modal('hide');
        })
        .catch(function (err){
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to save song!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            form.parents('.modal').find('.save-song').html('Save Song');
        });
    });
};

SongsView.prototype.showSongModal = function (friendId){
    var songModal = $(this.page.elem).find('.song-modal');
    songModal.find('.modal').modal();
};