function User(data){
    this.id = data.id || data.UserID || 0;
    this.username = data.username || data.Username || '';
    this.firstName = data.firstName || data.FirstName || undefined;
    this.lastName = data.lastName || data.LastName || '';
    this.bio = data.bio || data.Bio || '';
    this.email = data.email || data.Email || '';
}

function Member(data){
    User.call(this, data);
    if( data.role !== undefined ){
        this.role = data.role;
    }
    else if( data.Role !== undefined ){
        this.role = data.Role;
    }
    else{
        this.role = Member.ROLE.NONE;
    }
}
Member.prototype = Object.create(User.prototype);
Member.prototype.constructor = Member;

Member.ROLE = {
    NONE: -1,
    OWNER : 0,
    MANAGER: 1,
    MEMBER : 2,
    PROMOTER : 3
};

if( typeof module !== 'undefined' ){ module.exports = {User,Member} }