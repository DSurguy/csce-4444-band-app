function createItem(userId, bandId, name, description, price, merchType, imageFile, sizes, colors, quantities, connection) {
    return new Promise((resolve, reject) => {
        var query = ""+
        "INSERT INTO ITEM (BandID, ItemName, Description, Price) VALUES ("+bandId+",'"+name+"','"+description+"',"+price+")";

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

            	// TO DO: Handle image storage
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
    createItem 
}