var crypto = require('crypto');


function hashPassword(data) {
	return new Promise(function(resolve, reject) {
		console.log("IN HASHPASSWORD");

   		var salt = crypto.randomBytes(10).toString('base64');

	    var iterations = 10000;
	    crypto.pbkdf2(data.testPassword, data.dbSalt, iterations, 10, 'sha512', function(err, key) {
	    //crypto.pbkdf2(data.testPassword, salt, iterations, 10, 'sha512', function(err, key) {
	    	if (err) {
	    		console.log("ERROR AT 14: " + err);
	    		reject(err);
	    	} 
	    	console.log("KEY: " + key.toString('hex'));
	    	console.log("SALT: " + salt);
	    	console.log("TESTPW: " + data.testPassword);
	    	console.log("data.dbPassword: " + data.dbPassword);
	    	if (key.toString('hex') === data.dbPassword) {
	    		resolve(true);
	    	}
	    	else {
	    		resolve(false);
	    	}

	    	
		});
	});  
};

function authLogin(username, password, connection) {
	return new Promise((resolve, reject) => {
		console.log("IN AUTHLOGIN + " + username);

		var obj = {username, password, connection};
		
		getUserSaltAndPassword(obj)
		.then(hashPassword)
		.then(resolve)
		.catch(reject);

	});
};

function getUserSaltAndPassword(data) {
	return new Promise(function(resolve, reject) {
		console.log("IN GETUSERSALT");

		var query = 'SELECT SALT, PASSWORD FROM USER WHERE USERNAME = \'' + data.username + '\'';
		
		var connection = data.connection;
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
        		console.log("ERROR AT 71: " + err);
            	reject(err);
        	}

        	console.log(results[0].SALT);
        	console.log(results[0].PASSWORD);

        	dbSalt = results[0].SALT;
        	dbPassword = results[0].PASSWORD;
        	testPassword = data.password;

/*        	dbSalt = "zugMYnTWEDxCCw==";
        	dbPassword = "f11156eed62a3174f2af";
        	testPassword = "test";*/

/*        	if (dbSalt.length == 0) {
        		console.log("LENGTH == 0");
        		reject();
        	}*/

        	var result = 	{
	        				dbSalt, 
	        				testPassword, 
	        				dbPassword
        				};

			console.log(result);
        	
        	resolve(result);
		});
	});
}

/*var test = 'test';

hash = hashPassword(test).then(function(response) {
  console.log("Success! ", Buffer(response.key, 'binary').toString('hex'));
  console.log("salt: " + response.salt);
}, function(error) {
  console.error("Failed! ", error);
})

/*console.log(hash);*/

/*function checkPassword(data) {
	return new Promise(function(resolve, reject) {
		console.log("IN CHECKPASSWORD");

		var query = 'SELECT COUNT(*) FROM USER WHERE USERNAME = ' + data.username + ' AND PASSWORD = ' + data.key;

		var connection = data.connection;

	    connection.query(query, function(err, results, fields) {
	    	if (err) {
	    		console.log("ERROR AT 35: " + err);
	        	reject(err);
	    	}

	    	console.log("RESULTS: " + results);
	    	console.log("FIELDS: " + fields);
	    	resolve(true);	
		})
	})
}*/

module.exports = authLogin;