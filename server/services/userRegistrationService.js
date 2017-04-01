var crypto = require('crypto');

function registerUser(username, password, email, connection) {
	return new Promise((resolve, reject) => {
		var obj = {username, password, email, connection};

		checkUsername(obj)
		.then(function (result) {
			if (result == false) {
				resolve("Username already exists");
				return;
			}

			return checkEmail(result);
		})
		.then(function (result) {
			if (result == false) {
				resolve("Email already exists");
				return;
			}

			return hashPassword(result);
		})
		.then(createUser)
		.then(resolve)
		.catch(reject);
	});
}

function checkUsername(data) {
	return new Promise((resolve, reject) => {
		var query = 'SELECT USERNAME FROM USER WHERE USERNAME = \'' + data.username + '\'';

		var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
            	return;
        	}

	    	if (results.length > 0) {
	    		resolve(false);
	    		return;
    		}	

    		resolve(data);
    	});
	});
}

function checkEmail(data) {
	return new Promise((resolve, reject) => {
		var query = 'SELECT EMAIL FROM USER WHERE EMAIL = \'' + data.email + '\'';

		var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
            	return;
        	}

	    	if (results.length > 0) {
	    		resolve(false);
	    		return;
    		}	

    		resolve(data);
        });
	});
}

function hashPassword(data) {
	return new Promise((resolve, reject) => {
   		var salt = crypto.randomBytes(10).toString('base64');

	    var iterations = 10000;

	    crypto.pbkdf2(data.password, salt, iterations, 10, 'sha512', function(err, hashedPassword) {
	    	if (err) {
	    		reject(err);
	    	} 

	    	var username = data.username;
	    	var email = data.email;
	    	var password = hashedPassword.toString('hex');
	    	var connection = data.connection;

	    	var obj = {username, password, salt, email, connection};

	    	resolve(obj);
		});
	});  
}

function createUser(data) {
	return new Promise((resolve, reject) => {
		var query = 'INSERT INTO USER (USERNAME, PASSWORD, SALT, EMAIL) VALUES ( \'' + data.username + '\',\'' + data.password + '\',\'' + data.salt + '\',\'' + data.email + '\')';

		var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
        	}

        	resolve(true);
    	});
	});
}

module.exports = registerUser;