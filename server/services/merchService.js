var fs = require('fs');

function uploadImage(bandId, imageFile, imageFilesRoot) {
    return new Promise((resolve, reject) => {
		var imageName = imageFile.name;

		if (!imageName) {
			reject("Error with image.");
			return;
		}

		var relativePath = "/uploads/band" + bandId + "_" + imageName;
		var fullPath = imageFilesRoot + relativePath;

		fs.writeFile(fullPath, imageFile.data, function (err) {
			if (err) {
				reject(err);
				return;
			}

			resolve(relativePath);
		});
    });
}

function createItem(userId, bandId, name, description, price, merchType, relativePath, sizes, colors, quantities, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "INSERT INTO ITEM (BandID, ItemName, Description, ImageFilePath, Price) VALUES ("+bandId+",'"+name+"','"+description+"','"+relativePath+"',"+price+")";

        connection.beginTransaction(function(err) {
            if (err) {
                reject(err);
                return;
            }
        
            connection.query(query, function(err, result, fields) {
                if (err) {
                    reject(err);
                    return connection.rollback(function() {});
                }

                // Get the id of the newly inserted item
                var itemId = result.insertId;

                for (var i = 0; i < quantities.length; i++) {
                    query = "INSERT INTO INVENTORY (ItemID, Type, Quantity, Size, Color) VALUES ("+itemId+",'"+merchType+"',"+quantities[i]+",'"+sizes[i]+"','"+colors[i]+"')";

	                connection.query(query, function(err, result, fields) {
		                if (err) {
		                    reject(err);
		                    return connection.rollback(function() {});
		                }
		            });

                	// We're done iterating so commit the transaction
		            if (i === quantities.length - 1) {
                        connection.commit(function(err){
                            if (err) {
                                reject(err);
                                return connection.rollback(function() {});
                            }
                            resolve(true);
                        });
		            }
	            }   
            });
        });
    });
}

module.exports = {
    createItem,
    uploadImage 
}