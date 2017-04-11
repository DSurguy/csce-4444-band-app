var SimpleBand = require('../../shared/classes/simpleBand.js');
var Band = require('../../shared/classes/band.js');

function registerBand(userId, bandName, description, connection) {
	return new Promise((resolve, reject) => {
		var obj = {userId, bandName, description, connection}

		checkBandAndUser(obj)
		.then(function (result) {
			if (result == false) {
				resolve(false);
				return;
			}

			return createBand(result);
		})
		.then(resolve)
		.catch(reject);
	})
}

function checkBandAndUser(data) {
	return new Promise((resolve, reject) => {
		var query = 'SELECT BANDNAME FROM BAND ' +  
					'WHERE BANDNAME = \'' + data.bandName + '\' AND OWNERID = \'' + data.userId + '\'';

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

function createBand(data) {
	return new Promise((resolve, reject) => {
		var query = 'INSERT INTO BAND (OWNERID, BANDNAME, DESCRIPTION) VALUES ( \'' + data.userId + '\',\'' + data.bandName + '\',\'' + data.description + '\')';

		var connection = data.connection;
        
        connection.query(query, function (err, results, fields) {
        	if (err) {
            	reject(err);
            	return;
        	}

       		resolve(true);
    	});
	});
}

function getAllBands(userId, connection) {
	return new Promise((resolve, reject) => {
		var query = 'SELECT BANDID, BANDNAME, OWNERID, USERNAME FROM BAND B ' + 
					'JOIN USER U ON U.USERID = B.OWNERID ' +
					'WHERE B.OWNERID = \'' + userId + '\'';
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
            	return;
        	}

            var bands = results.map(function (resultRow) {
            	return new SimpleBand({id : resultRow.BANDID, ownerName : resultRow.USERNAME, ownerId : resultRow.OWNERID, bandName : resultRow.BANDNAME});
            })

        	resolve(bands);
    	});
	});
}

function getBand(bandId, connection) {
	return new Promise((resolve, reject) => {
		var query = 'SELECT BANDID, BANDNAME, OWNERID, USERNAME, DESCRIPTION FROM BAND B ' + 
					'JOIN USER U ON U.USERID = B.OWNERID ' +
					'WHERE B.BANDID = \'' + bandId + '\'';
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
            	return;
        	}

            var band = results.map(function (resultRow) {
            	return new Band({
            							id : resultRow.BANDID, 
            							ownerName : resultRow.USERNAME, 
    									ownerId : resultRow.OWNERID, 
    									bandName : resultRow.BANDNAME,
    									description : resultRow.DESCRIPTION
    								});
            })

        	resolve(band);
    	});
	});
}

module.exports = {registerBand, getAllBands, getBand};
