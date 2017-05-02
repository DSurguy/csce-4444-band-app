var User = require('../../shared/classes/user.js');

var UserService = {
    getUser: function (userId, connection){
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM USER WHERE UserID = ${parseInt(userId,10)}`;
            connection.query(query, function (err, results){
                if( err ){
                    reject(err); return;
                }
                resolve(results.slice(0,1).map(function (row){
                    return new User({
                        id: row.UserID,
                        username: row.Username,
                        firstName: row.FirstName,
                        lastName: row.LastName,
                        email: row.Email,
                        bio: row.bio
                    });
                })[0]);
            });
        });
    }
};

module.exports = UserService;