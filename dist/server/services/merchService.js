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

function createItem(userId, bandId, name, description, price, merchType, color, relativePath, sizes, quantities, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "INSERT INTO ITEM (BandID, ItemName, Description, Color, ImageFilePath, Price, Type) VALUES ("+bandId+",'"+name+"','"+description+"','"+color+"','"+relativePath+"',"+price+",'"+merchType+"')";

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
                query = "INSERT INTO INVENTORY (ItemID, Quantity, Size) VALUES ?";
                var values = []

                if (Array.isArray(quantities)) {
		            for (var i = 0; i < quantities.length; i++) {
		            	// Build array of values for insert
		                values.push([itemId, quantities[i], sizes[i]]);

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
	                query = "INSERT INTO INVENTORY (ItemID, Quantity, Size) VALUES ("+itemId+","+quantities+",'"+sizes+"')";

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
        "SELECT ITEMID, ITEMNAME, DESCRIPTION, TYPE, COLOR, IMAGEFILEPATH, PRICE FROM ITEM WHERE BANDID = "+bandId+" ORDER BY FIELD(TYPE,'Shirt','CD','Sticker'), ITEMNAME";

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            resolve(results.map(function (resultRow) {
                return new Item({id : resultRow.ITEMID, 
                    name : resultRow.ITEMNAME,
                    type : resultRow.TYPE,
                    color : resultRow.COLOR,
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
        	"SELECT INVENTORYID, SIZE, QUANTITY FROM INVENTORY WHERE ITEMID = "+item.id;

	        connection.query(query, function(err, results, fields) {
	            if (err) {
	                reject(err);
	                return;
	            }

	            item.inventory = results.map(function (resultRow) {
	                return new Inventory({id : resultRow.INVENTORYID,
	                	itemId : item.id,
	                	size : resultRow.SIZE,
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

function updateItemAndInventory(userId, bandId, itemId, name, description, price, merchType, color, relativePath, sizes, quantities, inventoryIds, connection) {
    return new Promise((resolve, reject) => {
    	var query;
    	if (relativePath === 'no image update') {
	        var query = ""+
	        "UPDATE ITEM SET ItemName = '"+name+"', Description = '"+description+"', Color = '"+color+"', "+
	        "Price = "+price+" WHERE BANDID = "+bandId+" AND ITEMID = "+itemId;
    	}
    	else {
 	        var query = ""+
	        "UPDATE ITEM SET ItemName = '"+name+"', Description = '"+description+"', Color = '"+color+"', "+
	        "ImageFilePath = '"+relativePath+"', Price = "+price+" WHERE BANDID = "+bandId+" AND ITEMID = "+itemId;   		
    	}

		
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

                query = '';

				if (Array.isArray(quantities)) {
	                for (var i = 0; i < inventoryIds.length; i++) {
	                	// We're either updating existing inventory or adding new ones
	                	if (inventoryIds[i] === 'new') {
	                		query += "INSERT INTO INVENTORY (Quantity, Size, ItemID) VALUES ("+quantities[i]+", '"+sizes[i]+"', "+itemId+"); ";	
	                	}
	                	else {
	                		if (quantities[i] == 0)
	                		{
	                			query += "DELETE FROM INVENTORY WHERE InventoryID = "+inventoryIds[i]+"; ";
	                		}
	                		else {
	            				query += "UPDATE INVENTORY SET Quantity = "+quantities[i]+", Size = '"+sizes[i]+"' WHERE ItemID = "+itemId+" AND InventoryID = "+inventoryIds[i]+"; ";
	                		}            		
	                	}
	                }
				}
				else {
                	// We're either updating existing inventory or adding new ones
                	if (inventoryIds === 'new') {
                		query += "INSERT INTO INVENTORY (Quantity, Size, ItemID) VALUES ("+quantities+", '"+sizes+"', "+itemId+"); ";	
                	}
                	else {
                		if (quantities == 0)
                		{
                			query += "DELETE FROM INVENTORY WHERE InventoryID = "+inventoryIds+"; ";
                		}
                		else {
            				query += "UPDATE INVENTORY SET Quantity = "+quantities+", Size = '"+sizes+"' WHERE ItemID = "+itemId+" AND InventoryID = "+inventoryIds+"; ";
                		}            		
                	}
				}

                connection.query(query, function(err) {
	                if (err) {
	                	console.log(query)
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
            });
        });
    });
}

function deleteItemAndInventory(bandId, itemId, connection) {
	return new Promise(function (resolve, reject) {
		var query = "DELETE FROM ITEM WHERE ItemID = "+itemId+" AND BandID = "+bandId;

        connection.query(query, function(err, results, fields) {
            if (err) {
            	console.log(query);
                reject(err);
                return;
            }

            resolve(true);
        });
	});
}

module.exports = {
    createItem,
    uploadImage,
    getInventory,
    getImages,
    getItems,
    updateItemAndInventory,
    deleteItemAndInventory 
}