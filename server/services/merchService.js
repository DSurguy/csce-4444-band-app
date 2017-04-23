var fs = require('fs');
var Item = require('../../shared/classes/item.js');
var Inventory = require('../../shared/classes/inventory.js');
var path = require('path');

function uploadImage(bandId, imageFile, imageFilesRoot) {
    return new Promise((resolve, reject) => {
		var imageName = imageFile.name;

		if (!imageName) {
			reject("Error with image.");
			return;
		}

		var relativePath = "/band" + bandId + "_" + imageName;
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
                query = "INSERT INTO INVENTORY (ItemID, Type, Quantity, Size, Color) VALUES ?";
                var values = []

                if (Array.isArray(quantities)) {
		            for (var i = 0; i < quantities.length; i++) {
		            	// Build array of values for insert
		                values.push([itemId, merchType, quantities[i], sizes[i], colors[i]]);

		            	// We're done iterating so commit the transaction
			            if (i === quantities.length - 1) {		            	
			                connection.query(query, [values], function(err) {
				                if (err) {
				                    reject(err);
				                    return connection.rollback(function() {});
				                }

    		                    connection.commit(function(err){
			                        if (err) {
			                            reject(err);
			                            return connection.rollback(function() {});
			                        }
			                        resolve(true);
			                        return;
			                    });
				            });
			            }
		            }  
	            }
	            else {
	                query = "INSERT INTO INVENTORY (ItemID, Type, Quantity, Size, Color) VALUES ("+itemId+",'"+merchType+"',"+quantities+",'"+sizes+"','"+colors+"')";

	                connection.query(query, function(err) {
		                if (err) {
		                    reject(err);
		                    return connection.rollback(function() {});
		                }

	                    connection.commit(function(err){
	                        if (err) {
	                            reject(err);
	                            return connection.rollback(function() {});
	                        }
	                        resolve(true);
	                    });
		            });
	            } 
            });
        });
    });
}

function getItems(userId, bandId, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "SELECT ITEMNAME, DESCRIPTION, TYPE, IMAGEFILEPATH, PRICE FROM ITEM WHERE BANDID = "+bandId;

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            resolve(results.map(function (resultRow) {
                return new Item({id : resultRow.ID, 
                    name : resultRow.ITEMNAME,
                    type : resultRow.TYPE,
                    description : resultRow.DESCRIPTION,
                    imagePath : resultRow.IMAGEFILEPATH,
                    price : resultRow.PRICE
                });
            }));       
        });
    });  
}

function getImages(items) {
	return new Promise((resolve, reject) => {
		var count = 0;
		items.forEach(function (item) {
			if( item.imagePath[0] == '/' ){
				item.imagePath = item.imagePath.substr(1);
			}
			fs.readFile(path.resolve('static/media',item.imagePath), function (err, data) {
				if( err ){ reject(err); }
				else{
					item.imageFile = data;
					count++;
					if (count === items.length) {
						resolve(items);
					}
				}
			});
		});
	}); 
}

function getInventory(items, connection) {
    return new Promise((resolve, reject) => {
		var count = 0;
    	items.forEach(function(item) {
    		var query = ""+
        	"SELECT SIZE, COLOR, QUANTITY FROM INVENTORY WHERE ITEMID = "+item.id;

	        connection.query(query, function(err, results, fields) {
	            if (err) {
	                reject(err);
	                return;
	            }

	            item.inventory = results.map(function (resultRow) {
	                return new Inventory({itemId : item.id,
	                	size : resultRow.SIZE,
	                	color : resultRow.COLOR,
	                	quantity : resultRow.QUANTITY
	                });
	            });

	            count++;

	            if (count === items.length){
	            	resolve(items);
	            }
	        });      
        });
    });  
}

module.exports = {
    createItem,
    uploadImage,
    getInventory,
    getImages,
    getItems 
}