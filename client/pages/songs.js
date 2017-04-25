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
    songsElem.empty();
    
    this.page.ctrl.songs.forEach(function (song, index){
        songsElem.append(`
        <a href="javascript://" class="song list-group-item list-group-item-action" data-song-index="${index}">
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
    
    pageElem.on('click', '.song', function (e){
        view.showSongModal(view.page.ctrl.songs[$(this).attr('data-song-index')]);
    });
    
    pageElem.on('hide.bs.modal', '.modal', function (e){
        var audioTrack = $(this).find('audio');
        if( audioTrack.length ){
            audioTrack[0].pause();
            audioTrack.remove();
        }
    });
};

SongsView.prototype.showSongModal = function (song){
    var songModal = $(this.page.elem).find('.song-modal');
    
    if( song ){
        songModal.find('[name=name]').val(song.name);
        var duration = song.duration.split(/:/g);
        songModal.find('[name=duration-hours]').val(duration[0]);
        songModal.find('[name=duration-mins]').val(duration[1]);
        songModal.find('[name=duration-secs]').val(duration[2]);
        songModal.find('[name=lyrics]').val(song.lyrics);
        songModal.find('[name=composer]').val(song.composer);
        songModal.find('[name=link]').val(song.link);
        songModal.find('.current-link a').attr('href', song.link).html(song.link);
        if( song.path ){
            var fileName = song.path.split(/\//g).slice(-1)[0];
            var mimeType;
            switch(fileName.split(/\./g).slice(-1)[0]){
                case 'wav': mimeType = 'audio/wav'; break;
                case 'mp3': mimeType = 'audio/mp3'; break;
                case 'ogg': mimeType = 'audio/ogg'; break;
            }
            songModal.find('.file-audio').find('audio').remove();
            songModal.find('.file-audio').append(`<audio controls><source src="${song.path}" type="${mimeType}"></audio>`);
            songModal.find('.current-file a').attr("href", song.path).html(fileName);
        }
    }
    else{
        songModal.find('[name=name]').val('');
        songModal.find('[name=duration-hours]').val('00');
        songModal.find('[name=duration-mins]').val('00');
        songModal.find('[name=duration-secs]').val('00');
        songModal.find('[name=lyrics]').val('');
        songModal.find('[name=composer]').val('');
        songModal.find('[name=link]').val('');
        songModal.find('.current-link a').attr('href', 'javascript://').html('None');
        songModal.find('.file-audio').find('audio').remove();
        songModal.find('.current-file a').attr("href", 'javascript://').html('None');
    }
    
    songModal.find('.modal').modal();
};