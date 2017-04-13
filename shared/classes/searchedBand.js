function SearchedBand(json){
    this.id = json.id || 0;
    this.bandName = json.bandName || '';
    this.applicationStatus = json.applicationStatus || undefined;
    this.role = json.role || undefined;
    this.description = json.description || '';
    this.genre = json.genre || '';
}

SearchedBand.STATUS = {
	NONE: 0, 
	APPLIED: 1, 
	ACCEPTED: 2, 
	REJECTED: 3, 
	BLOCKED: 4 
}

SearchedBand.ROLE = {
    OWNER: 0,
    MANAGER: 1,
    MEMBER: 2,
    PROMOTER: 3
}

module.exports = SearchedBand;