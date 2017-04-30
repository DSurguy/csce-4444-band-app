/* global Page */
/* global PageView */
/* global PageCtrl */
/* global $ */
/* global MenuComponent */
/* global Song */
/* global SetList */

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
        url: '/api/bands/'+ctrl.bandId+'/songs',
        method: 'GET'
    })
    .then(function (songs){
        ctrl.songs = songs.map(function (song){
            return new Song(song);
        });
        
        //get set lists
        return $.ajax({
            url: '/api/bands/'+ctrl.bandId+'/setlists',
            method: 'GET'
        });
    })
    .then(function (setLists){
        ctrl.setLists = setLists.map(function (setList){
            return new SetList(setList);
        });
        defer.resolve();
    })
    .catch(defer.reject);
    
    return defer.promise();
};
SetListsCtrl.prototype.saveSetList = function (form){
    var defer = $.Deferred();
    var ctrl = this;
    
    var modifiedForm = $.clone(form);
    $(modifiedForm).find('input[type=checkbox]:not(:checked)').remove();
    var formData = new FormData(modifiedForm);
    
    //determine if we're editing or creating
    var url, method;
    if( $(modifiedForm).find('[name=set-list-id]').val() !== '' ){
        url = '/api/bands/'+ctrl.bandId+'/setlists/'+$(modifiedForm).find('[name=set-list-id]').val();
        method = 'PUT';
    }
    else{
        url = '/api/bands/'+ctrl.bandId+'/setlists';
        method = 'POST';
    }
    
    $.ajax({
        url: url,
        type: method,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    })
    .then(defer.resolve)
    .fail(defer.reject);
    
    return defer.promise();
};

function SetListsView(page){
    PageView.call(this, page);
    this.setListSongs = [];
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
    var setListsElem = $(view.page.elem).find('.set-lists');
    setListsElem.empty();
    view.page.ctrl.setLists.forEach(function (setList, index){
        setListsElem.append(`
        <a href="javascript://" class="set-list list-group-item list-group-item-action" data-set-list-index="${index}">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${setList.name}</h5>
                <h5 class="mb-1">${setList.totalLength()}</h5>
            </div>
        </a>`)
    });
};

SetListsView.prototype.bindEvents = function (){
    var pageElem = $(this.page.elem),
        view = this;
    
    pageElem.on('click', '.add-set-list', function (e){
        view.showSetListModal();
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
    
    pageElem.on('click', '.modal .save-set-list', function (e){
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
        form.parents('.modal').find('.save-set-list').html('<div class="fa fa-spinner animation-spin"></div>');
        view.page.ctrl.saveSetList(this)
        .then(function (newSetList){
            /*var audioTrack = form.find('audio');
            if( audioTrack.length ){
                audioTrack[0].pause();
                audioTrack.remove();
            }*/
            
            /*var songIndex = view.page.ctrl.songs.reduce(function (val, song, index){
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
            view.render();*/
            form.parents('.modal').modal('hide');
            form.parents('.modal').find('.save-set-list').html('Save Set List');
            form.parents('.modal').find('.alert').remove();
            view.page.ctrl.saving = false;
        })
        .catch(function (err){
            //display login failure
            form.prepend('<div class="alert alert-danger alert-dismissible fade show" role="alert">'
              +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                +'<span aria-hidden="true">&times;</span>'
              +'</button>'
              +'<strong>Unable to save set list!</strong>'
            +'</div>');
            console.error(err);
            view.page.ctrl.saving = false;
            form.parents('.modal').find('.save-set-list').html('Save Set List');
        });
    });
    
    pageElem.on('click', '.set-list', function (e){
        view.showSetListModal(view.page.ctrl.setLists[$(this).attr('data-set-list-index')]);
    });
    
    pageElem.on('hide.bs.modal', '.modal', function (e){
        /*var audioTrack = $(this).find('audio');
        if( audioTrack.length ){
            audioTrack[0].pause();
            audioTrack.remove();
        }*/
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
    
    pageElem.on('change', '.modal .song-check-label input', function (e){
        var songElem = $(this).parents('.song-check-label'),
            currentIndex = songElem.attr('data-index'),
            isChecked = this.checked,
            newIndex;
        
        //update the song's checked status
        view.setListSongs[currentIndex].checked = isChecked;
        
        var movedSong = view.setListSongs.splice(currentIndex,1)[0];
        if( isChecked ){
            //item became checked
            for( var i=0; i<view.setListSongs.length; i++ ){
                if( view.setListSongs[i].name.toLowerCase() > movedSong.name.toLowerCase() || !view.setListSongs[i].checked ){
                    view.setListSongs.splice(i,0,movedSong);
                    newIndex = i;
                    break;
                }
            }
            //now move the actual element and fix the element numbers
            var existingElem = songElem.siblings('[data-index='+newIndex+']');
            existingElem.before(songElem);
        }
        else{
            //item became unchecked
            for( var i=0; i<view.setListSongs.length; i++ ){
                if( !view.setListSongs[i].checked && view.setListSongs[i].name.toLowerCase() > movedSong.name.toLowerCase() ){
                    view.setListSongs.splice(i,0,movedSong);
                    newIndex = i;
                    break;
                }
            }
            if( newIndex === undefined ){
                //this sorts to the end of the list
                newIndex = view.setListSongs.length;
                view.setListSongs.push(movedSong);
                //now move the actual element and fix the element numbers
                var existingElem = songElem.siblings('[data-index='+(newIndex)+']');
                existingElem.after(songElem);
            }
            else{
                //now move the actual element and fix the element numbers
                var existingElem = songElem.siblings('[data-index='+(newIndex+1)+']');
                existingElem.before(songElem);
            }
        }
        var allSongElems = songElem.parent().find('.song-check-label');
        if( newIndex > currentIndex ){
            for( var i=currentIndex; i<=newIndex; i++ ){
                $(allSongElems[i]).attr('data-index',i);
            }
        }
        else{
            for( var i=newIndex; i<=currentIndex; i++ ){
                $(allSongElems[i]).attr('data-index',i);
            }
        }
    });
};

SetListsView.prototype.showSetListModal = function (setList){
    var view = this,
        setListModal = $(this.page.elem).find('.set-list-modal');
    
    //reorder the songs according to the new setlist order
    if( setList ){
        setListModal.find('[name=set-list-id]').val(setList.id);
        setListModal.find('[name=name]').val(setList.name);
        setListModal.find('[name=description]').val(setList.description);
        //TODO: Check items
        var checkedSongs = setList.songs.reduce(function (obj, songId){
            obj[songId] = true;
            return obj;
        }, {});
        
        view.setListSongs = $.extend([], view.page.ctrl.songs).map(function (song){
            if( checkedSongs[song.id] ){
                song.checked = true;
            }
            return song;
        }).sort(function (a,b){
            if( a.checked && !b.checked ){
                return -1;
            }
            else if( b.checked && !a.checked ){
                return 1;
            }
            else{
                if( a.name.toLowerCase() < b.name.toLowerCase() ){
                    return -1;
                }
                else if( a.name.toLowerCase() > b.name.toLowerCase() ){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        });
    }
    else{
        setListModal.find('[name=set-list-id]').val('');
        setListModal.find('[name=name]').val('');
        setListModal.find('[name=description]').val('');
        view.setListSongs = $.extend([], view.page.ctrl.songs).sort(function (a,b){
            if( a.checked && !b.checked ){
                return -1;
            }
            else if( b.checked && !a.checked ){
                return 1;
            }
            else{
                if( a.name.toLowerCase() < b.name.toLowerCase() ){
                    return -1;
                }
                else if( a.name.toLowerCase() > b.name.toLowerCase() ){
                    return 1;
                }
                else{
                    return 0;
                }
            }
        });
    }
    
    var songsElem = setListModal.find('.songs').detach().empty();
    view.setListSongs.forEach(function (song, index){
        songsElem.append(''+
        '<label class="form-check-label song-check-label" data-index="'+index+'">'+
            '<input name="song-'+song.id+'" class="form-check-input" type="checkbox" value="" tabindex="-1" '+(song.checked?'checked':'')+'>'+
            song.name+
        '</label>');
    });
    setListModal.find('.songs-parent').append(songsElem);
    
    setListModal.find('.modal').modal();
};