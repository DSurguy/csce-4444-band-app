function Song(data){
    id : data.id || undefined;
    songName : data.songName || undefined;
    duration : data.duration || undefined;
    lyrics : data.lyrics || undefined;
    composer : data.composer || undefined;
    path: data.path || undefined;
    bandId : data.bandId || undefined;
    link: data.link || undefined;
}

if( typeof module !== 'undefined' ){ module.exports = Song; }