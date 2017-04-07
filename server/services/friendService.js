var Friend = require('../../shared/classes/friend.js');

function getAllFriends(userId, connection) {
	return new Promise((resolve, reject) => {
        var query = 'SELECT CASE WHEN FROMUSERID <> \'\' THEN FROMUSERID ELSE TOUSERID END AS USERID, '+
                    '       STATUS, USERNAME, CONCAT(FIRSTNAME,\' \', LASTNAME) AS NAME, BIO '+
                    'FROM '+
                    '(SELECT CASE WHEN FROMUSERID = '+userId+' THEN \'\' ELSE FROMUSERID END AS FROMUSERID, '+
                    '        CASE WHEN TOUSERID = '+userId+' THEN \'\' ELSE TOUSERID END AS TOUSERID, '+
                    '        CASE WHEN STATUS = 2 AND FROMUSERID <> '+userId+' THEN \'requested\' '+
                    '             WHEN STATUS = 2 AND TOUSERID <> '+userId+' THEN \'pending\' '+
                    '             WHEN STATUS = 1 THEN \'friend\' '+
                    '             WHEN STATUS = 3 THEN \'blocked\' END AS STATUS '+
                    'FROM FRIEND F '+
                    'JOIN USER U ON U.USERID = F.FROMUSERID OR U.USERID = F.TOUSERID '+
                    'WHERE USERID = '+userId+') F '+
                    'JOIN USER U ON USERID = FROMUSERID OR USERID = TOUSERID '+
                    'ORDER BY FIELD(STATUS,\'friend\',\'requested\',\'pending\',\'blocked\')';
        
        connection.query(query, function(err, results, fields) {
        	if (err) {
            	reject(err);
            	return;
        	}

            var friends = results.map(function (resultRow) {
            	return new Friend({id : resultRow.USERID, 
            						userName : resultRow.USERNAME, 
            						bio : resultRow.BIO, 
            						name : resultRow.NAME,
            						status : resultRow.STATUS
            					});
            })

        	resolve(friends);
    	});
	});
}

module.exports = {getAllFriends};

