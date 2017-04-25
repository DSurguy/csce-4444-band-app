function SetList(data){
    this.id = data.id || undefined;
    this.bandId = data.bandId || undefined;
    this.name = data.name || '';
    this.songs = data.songs || [];
}

SetList.prototype.totalLength = function (){
    return this.songs.reduce(function (total, song){
        return total+song.duration;
    },0);
};

if( typeof module !== 'undefined' ){ module.exports = SetList }