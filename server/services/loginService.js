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
}

function getUserSaltAndPassword(data) {
	return new Promise((resolve, reject) => {
		// Get the user's salt and password to compare the inputted password
		var query = 'SELECT SALT, PASSWORD FROM USER WHERE USERNAME = \'' + data.username + '\'';
		
		var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
            	return;
        	}

        	// If username is invalid, return
        	if (results.length == 0) {
        		resolve(false);
        		return;
        	}

        	var result = {dbSalt : results[0].SALT, testPassword : data.password, dbPassword : results[0].PASSWORD};
        	
        	resolve(result);
		});
	});
}

function checkPassword(data) {
	return new Promise((resolve, reject) => {
	    var iterations = 10000;

	    // Salt hash the testPassword to determine if it is valid
	    crypto.pbkdf2(data.testPassword, data.dbSalt, iterations, 10, 'sha512', function(err, key) {
	    	if (err) {
	    		reject(err);
	    		return;
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
