var fs = require('fs');
var Item = require('../../shared/classes/item.js');
var Inventory = require('../../shared/classes/inventory.js');
var Cart = require('../../shared/classes/cart.js');
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
                reject(err);
                return;
            }

            resolve(true);
        });
	});
}

function getCartItems(bandId, userId, connection) {
	return new Promise(function (resolve, reject) {
		var query = ""+
		"SELECT DISTINCT I.* FROM CART C "+
		"JOIN ITEM I ON C.ITEMID = I.ITEMID AND C.BANDID = I.BANDID "+
		"WHERE C.USERID = "+userId+" AND C.BANDID = "+bandId+" AND QUANTITY <> 0";
		
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }
            
            if (results.length === 0){
            	resolve([]);
            	return;
            }
            
            var items = results.map(function (resultRow) {
                return new Item({id : resultRow.ItemID, 
                    name : resultRow.ItemName,
                    type : resultRow.Type,
                    color : resultRow.Color,
                    description : resultRow.Description,
                    imagePath : resultRow.ImageFilePath,
                    price : resultRow.Price
            	});
            });

    		var count = 0;
        	items.forEach(function(item) {
	    		var query = ""+
	        	"SELECT I.INVENTORYID, I.SIZE, C.QUANTITY AS CART_QUANTITY, I.QUANTITY AS INVENTORY_QUANTITY FROM INVENTORY I "+
	        	"JOIN CART C ON I.ITEMID = C.ITEMID AND I.INVENTORYID = C.INVENTORYID "+
	        	"WHERE I.ITEMID = "+item.id+" AND C.QUANTITY <> 0";
	
		        connection.query(query, function(err, results, fields) {
		            if (err) {
		                reject(err);
		                return;
		            }
	
		            item.inventory = results.map(function (resultRow) {
		                return new Inventory({id : resultRow.INVENTORYID,
		                	itemId : item.id,
		                	size : resultRow.SIZE,
		                	quantity : resultRow.INVENTORY_QUANTITY,
		                	cartQuantity : resultRow.CART_QUANTITY
		                });
		            });
	
		            count++;
	
		            if (count === items.length){
		            	resolve(items);
		            }
		        });
        	});
        });
	});
}

function addToCart(bandId, userId, itemId, quantities, inventoryIds, connection) {
	return new Promise(function (resolve, reject) {
		var query = '';
		
		if (Array.isArray(inventoryIds)) {
			for (var i = 0; i < inventoryIds.length; i++){
				if (quantities[i] > 0){
					query += ""+
					"INSERT INTO CART (ITEMID, INVENTORYID, BANDID, USERID, QUANTITY) VALUES "+
					"("+itemId+","+inventoryIds[i]+","+bandId+","+userId+","+quantities[i]+") "+
					"ON DUPLICATE KEY UPDATE QUANTITY = "+quantities[i]+";";
				}
			}
		}
		else{
			if (quantities > 0){
				query += ""+
				"INSERT INTO CART (ITEMID, INVENTORYID, BANDID, USERID, QUANTITY) VALUES "+
				"("+itemId+","+inventoryIds+","+bandId+","+userId+","+quantities+") "+
				"ON DUPLICATE KEY UPDATE QUANTITY = "+quantities+";";
			}
		}
		
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            resolve(true);
        });
		
	});
}

function updateCart(bandId, userId, itemIds, quantities, inventoryIds, connection) {
	return new Promise(function (resolve, reject) {
		var query = '';
		
		if (Array.isArray(inventoryIds)) {
			for (var i = 0; i < inventoryIds.length; i++){
				if (quantities[i] === 0){
					query += ""+
					"DELETE FROM CART WHERE USERID = "+userId+" AND BANDID = "+bandId+" AND INVENTORYID = "+inventoryIds[i]+"; ";
				}
				else {
					query += ""+
					"INSERT INTO CART (ITEMID, INVENTORYID, BANDID, USERID, QUANTITY) VALUES "+
					"("+itemIds[i]+","+inventoryIds[i]+","+bandId+","+userId+","+quantities[i]+") "+
					"ON DUPLICATE KEY UPDATE QUANTITY = "+quantities[i]+";";
				}
			}
		}
		else{
			if (quantities === 0){
				query += ""+
				"DELETE FROM CART WHERE USERID = "+userId+" AND BANDID = "+bandId+" AND INVENTORYID = "+inventoryIds+" AND ITEMID = "+itemIds+"; ";
			}
			else {
				query += ""+
				"INSERT INTO CART (ITEMID, INVENTORYID, BANDID, USERID, QUANTITY) VALUES "+
				"("+itemIds+","+inventoryIds+","+bandId+","+userId+","+quantities+") "+
				"ON DUPLICATE KEY UPDATE QUANTITY = "+quantities+";";
			}
		}
		
        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            resolve(true);
        });
		
	});
}

function emptyCart(bandId, userId, connection) {
	return new Promise(function (resolve, reject) {
		var query = "DELETE FROM CART WHERE BANDID = "+bandId+" AND USERID = "+userId;

        connection.query(query, function(err, results, fields) {
            if (err) {
                reject(err);
                return;
            }

            resolve(true);
        });
	});
}

function payOut(bandId, userId, itemIds, inventoryIds, quantities, connection) {
	return new Promise(function (resolve, reject) {
		if (itemIds === undefined){
			resolve(true);
			return;
		}
		var query = "";

		if (Array.isArray(inventoryIds)) {
			for (var i = 0; i < inventoryIds.length; i++){
				query += ""+
				"UPDATE INVENTORY SET QUANTITY = QUANTITY - "+quantities[i]+" "+
				"WHERE ITEMID = "+itemIds[i]+" AND INVENTORYID = "+inventoryIds[i]+"; ";	
			}
		}
		else{
			query += ""+
			"UPDATE INVENTORY SET QUANTITY = QUANTITY - "+quantities+" "+
			"WHERE ITEMID = "+itemIds+" AND INVENTORYID = "+inventoryIds;	
		}
        connection.query(query, function(err, results, fields) {
            if (err) {
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
    deleteItemAndInventory,
    addToCart,
    getCartItems,
    emptyCart,
    payOut,
    updateCart
}