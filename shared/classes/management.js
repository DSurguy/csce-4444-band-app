
function Management(json){
    this.ownerName = json.ownerName || '';
    this.ownerId = json.ownerId || undefined;
    this.bandName = json.bandName || '';
    this.description = json.description || '';
    this.members = json.members || [];
    this.ownerName = json.store || '';
}


if( typeof module !== 'undefined' ){ module.exports = Management }