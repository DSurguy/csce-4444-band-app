function Song(data){
    this.id = data.id || undefined;
    this.bandId = data.bandId || undefined;
    this.name = data.name || '';
    this.duration = data.duration || '00h00m00s';
    this.lyrics = data.lyrics || '';
    this.composer = data.composer || '';
    this.link = data.link || '';
    this.path = data.path || '';
}

if( typeof module !== 'undefined' ){ module.exports = Song; }