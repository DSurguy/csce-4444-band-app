/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Song */

function SetListsPage(app, data){
    Page.call(this, app, $('#setListsPage')[0], SetListsCtrl, SetListsView, {
        menu: new MenuComponent(app, {
            element: '.menu-button-container'
        })
    });
}
SetListsPage.prototype = Object.create(Page.prototype);
SetListsPage.prototype.constructor = SetListsPage;

function SetListsCtrl(page){
    PageCtrl.call(this, page);
    this.songs = [];
    this.setLists = [];
    this.bandId = window.location.pathname.split('/').reduce(function (val, chunk, index, arr){
        return val || (chunk == 'bands' ? arr[index+1] : undefined);
    }, undefined);
}
SetListsCtrl.prototype = Object.create(PageCtrl.prototype);
SetListsCtrl.prototype.constructor = SetListsCtrl;
SetListsCtrl.prototype.init = function (){
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
        return $.Deferred().resolve().promise();
    })
    .then(function (){
        //get set lists
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};

function SetListsView(page){
    PageView.call(this, page);
}
SetListsView.prototype = Object.create(PageView.prototype);
SetListsView.prototype.constructor = SetListsView;
SetListsView.prototype.init = function (){
    this.render();
    this.bindEvents();
};

SetListsView.prototype.render = function (){
    var view = this;
    //render the songs to the song modal
    var setListModal = $(this.page.elem).find('.set-list-modal'),
        songsElem = setListModal.find('.songs').detach();
        
    view.page.ctrl.songs.forEach(function (song, index){
        songsElem.append(`
        <label class="form-check-label song-check-label">
            <input class="form-check-input" type="checkbox" value="" tabindex="-1">
            ${song.name}
        </label>`);
    });
    
    setListModal.find('.songs-parent').append(songsElem);
};

SetListsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.add-set-list', function (e){
        view.showSetListModal();
    });
    
    pageElem.on('click', '.modal .save-set-list', function (e){
        $(this).parents('.modal').find('form').submit();
    });
    
    pageElem.on('click', '.modal .delete-set-list', function (e){
        /*if( view.page.ctrl.saving ){
            return false;
        }
        else{
            view.page.ctrl.saving = true;
        }
        
        var modal = $(this).parents('.modal');
        modal.find('.delete-song').html('<div class="fa fa-spinner animation-spin"></div>');
        
        var songId = modal.find('[name=song-id]').val(),
            deletePromise;
        
        //just close the modal if we don't have an id
        if( songId === '' ){
            deletePromise = $.Deferred().resolve().promise();
        }
        else{
            deletePromise = view.page.ctrl.deleteSong(songId);
        }
        
        deletePromise.then(function (){
            var audioTrack = modal.find('audio');
            if( audioTrack.length ){
                audioTrack[0].pause();
                audioTrack.remove();
            }
            
            var songIndex = view.page.ctrl.songs.reduce(function (val, song, index){
                return val !== undefined ? val : (song.id == songId ? index : undefined);
            },undefined);
            
            if( songIndex !== undefined ){
                view.page.ctrl.songs.splice(songIndex,1);
            }
            
            view.render();
            modal.modal('hide');
            modal.find('.delete-song').html('Delete Song');
            modal.find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            modal.find('form').prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to delete song!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            modal.find('.delete-song').html('Delete Song');
        });*/
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
        .then(function (newSong){
            var audioTrack = form.find('audio');
            if( audioTrack.length ){
                audioTrack[0].pause();
                audioTrack.remove();
            }
            
            var songIndex = view.page.ctrl.songs.reduce(function (val, song, index){
                return val !== undefined ? val : (song.id == newSong.id ? index : undefined);
            },undefined);
            
            if( songIndex !== undefined ){
                view.page.ctrl.songs[songIndex] = newSong;
            }
            else{
                view.page.ctrl.songs.push(newSong);
                view.page.ctrl.songs = view.page.ctrl.songs.sort(function (a,b){
                    return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
                });
            }
            view.render();
            form.parents('.modal').modal('hide');
            form.parents('.modal').find('.save-song').html('Save Song');
            form.parents('.modal').find('.alert').remove();
            view.page.ctrl.saving = false;
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
    
    pageElem.on('click', '.set-list', function (e){
        view.showSetListModal(view.page.ctrl.songs[$(this).attr('data-set-list-index')]);
    });
    
    pageElem.on('hide.bs.modal', '.modal', function (e){
        /*var audioTrack = $(this).find('audio');
        if( audioTrack.length ){
            audioTrack[0].pause();
            audioTrack.remove();
        }*/
    });
    
    pageElem.on('keyup', '.modal .song-search', function (e){
        if( view.searchingSongs ){ return false; }
        var searchVal = $(this).val(),
            songsElem = $(this).siblings('.songs').detach(),
            allSongsElems = songsElem.find('.song-check-label');
        
        view.page.ctrl.songs.forEach(function (song, index){
            var thisSong = $(allSongsElems[index]);
            if( song.name.indexOf(searchVal) !== -1 ){
                thisSong.removeClass('search-hidden');
            }
            else{
                thisSong.addClass('search-hidden');
            }
        });
        
        $(this).after(songsElem);
    });
    
    pageElem.on('keyup', '.search', function (e){
        var search = $(this).val();
        
        var setListElems = pageElem.find('.song');
        view.page.ctrl.setLists.forEach(function (setList, index){
            if( setList.name.indexOf(search) !== -1 ){
                $(setListElems[index]).removeClass('search-hidden');
            }
            else{
                $(setListElems[index]).addClass('search-hidden');
            }
        });
    });
};

SetListsView.prototype.showSetListModal = function (setList){
    var setListModal = $(this.page.elem).find('.set-list-modal');
    
    if( setList ){
        
    }
    else{

    }
    
    setListModal.find('.modal').modal();
};