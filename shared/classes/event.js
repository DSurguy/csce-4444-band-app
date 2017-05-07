function Event(data){
    this.id = data.id || data.EventID || undefined;
    this.bandId = data.bandId || data.BandID || undefined;
    this.eventDate = data.eventDate || data.EventDate || '1900-01-01';
    this.eventTime = data.eventTime || data.EventTime || '00:00:00';
    this.loadInTime = data.loadInTime || data.LoadInTime || '00:00:00';
    this.location = data.location || data.Location || '';
    this.venue = data.venue || data.Venue || '';
    this.isShow = data.isShow || data.IsShow || false;
    this.description = data.description || data.Description || '';
    this.members = data.members || data.Members || [];
}

if( typeof module !== 'undefined' ){ module.exports = Event; }