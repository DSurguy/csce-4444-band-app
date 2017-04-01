var crypto = require('crypto');

function authLogin(username, password, connection) {
	return new Promise((resolve, reject) => {
		var obj = {username, password, connection};
		
		getUserSaltAndPassword(obj)
		.then(function (result) {
			if (result == false) {
				resolve(false);
				return;
			}
			return checkPassword(result);
		})
		.then(resolve)
		.catch(reject);

	});
};

function getUserSaltAndPassword(data) {
	return new Promise((resolve, reject) => {
		var query = 'SELECT SALT, PASSWORD FROM USER WHERE USERNAME = \'' + data.username + '\'';
		
		var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
        	}

        	// If username is invalid, return
        	if (results.length == 0) {
        		resolve(false);
        		return;
        	}

        	var dbSalt = results[0].SALT;
        	var dbPassword = results[0].PASSWORD;
        	var testPassword = data.password;

        	var result = {dbSalt, testPassword, dbPassword};
        	
        	resolve(result);
		});
	});
}

function checkPassword(data) {
	return new Promise((resolve, reject) => {
/*		if (data == false) {
			resolve(false);
			return;
		}*/

/*   		var salt = crypto.randomBytes(10).toString('base64');*/

	    var iterations = 10000;

	    // Salt hash the testPassword to determine if it is valid
	    crypto.pbkdf2(data.testPassword, data.dbSalt, iterations, 10, 'sha512', function(err, key) {
	    	if (err) {
	    		reject(err);
	    	} 

	    	if (key.toString('hex') === data.dbPassword) {
	    		resolve(true);
	    	}
	    	else {
	    		resolve(false);
	    	}	
		});
	});  
};

module.exports = authLogin;