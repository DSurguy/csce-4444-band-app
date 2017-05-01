function User(data){
    this.id = data.id || 0;
    this.username = data.username || '';
    this.firstName = data.firstName || undefined;
    this.lastName = data.lastName || '';
    this.bio = data.bio || '';
    this.email = data.email || '';
}

if( typeof module !== 'undefined' ){ module.exports = User; }