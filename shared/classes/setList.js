if( typeof module !== 'undefined' ){
    var leftPad = require('../utils/leftPad.js');
}

function SetList(data){
    this.id = data.id || undefined;
    this.bandId = data.bandId || undefined;
    this.name = data.name || '';
    this.songs = data.songs || [];
    this.description = data.description || '';
}

SetList.prototype.totalLength = function (){
    return this.songs.reduce(function (total, song){
        var duration = song.duration.split(':');
        return total.map(function (val, index){
            return val + parseInt(duration[index],10);
        });
    },[0,0,0]).map(function (total){
        return leftPad(total.toString(),2,'0');
    }).join(':');
};

if( typeof module !== 'undefined' ){ module.exports = SetList }