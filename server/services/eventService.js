var Event = require('../../shared/classes/event.js'),
    Notification = require('../../shared/classes/notification.js');

var EventService = {
    getEvents: function (bandId, connection){
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM EVENT WHERE BandID = ${parseInt(bandId, 10)}`;
            connection.query(query, function (err, results){
                if( err ){
                    reject(err); return;
                }
                
                var eventHash = results.reduce(function (hash, row){
                    hash[row.EventID] = new Event(row);
                    return hash;
                },{});
                
                getEventMembers(Object.keys(eventHash), connection)
                .then(function (members){
                    members.forEach(function (member){
                        eventHash[member.eventId].members.push(member.userId);
                    });
                    resolve(Object.keys(eventHash).map(function (key){
                        return eventHash[key];
                    }));
                })
                .catch(function (err){
                    reject(err);
                });
            });
        });
    },
    createEvent: function (bandId, newEvent, connection){
        return new Promise(function (resolve, reject){
            var query = `INSERT INTO EVENT (BandID, Title, EventDate, EventTime, LoadInTime, Location, Venue, Description, IsShow) 
                VALUES (${parseInt(bandId, 10)},
                ${connection.escape(newEvent.title)},
                ${connection.escape(newEvent.eventDate)}, 
                ${connection.escape(newEvent.eventTime)}, 
                ${connection.escape(newEvent.loadInTime)}, 
                ${connection.escape(newEvent.location)}, 
                ${connection.escape(newEvent.venue)}, 
                ${connection.escape(newEvent.description)}, 
                ${newEvent.isShow?1:0})`;
            
            connection.beginTransaction(function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query(query, function (err, results){
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    
                    newEvent.id = results.insertId;
                    
                    updateMemberLinks(newEvent, connection)
                    .then(function (){
                        return getEventMembers([newEvent.id], connection);
                    })
                    .then(function (members){
                        newEvent.members = members.map(function (o){return o.userId;});
                        connection.commit(function (err){
                            if (err) {
                                return connection.rollback(function() {
                                    reject(err);
                                });
                            }
                            resolve(newEvent);
                        });
                    })
                    .catch(function (err){
                        connection.rollback(function() {
                            reject(err);
                        });
                    });
                });
            });
        });
    },
    editEvent: function (bandId, newEvent, connection){
        return new Promise(function (resolve, reject){
            var query = `UPDATE EVENT SET
                BandID = ${parseInt(bandId, 10)}, 
                Title = ${connection.escape(newEvent.title)},
                EventDate = ${connection.escape(newEvent.eventDate)}, 
                EventTime = ${connection.escape(newEvent.eventTime)}, 
                LoadInTime = ${connection.escape(newEvent.loadInTime)}, 
                Location = ${connection.escape(newEvent.location)}, 
                Venue = ${connection.escape(newEvent.venue)}, 
                Description = ${connection.escape(newEvent.description)}, 
                IsShow = ${newEvent.isShow?1:0}
                WHERE EventID = ${parseInt(newEvent.id,10)}`;
            
            connection.beginTransaction(function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query(query, function (err, results){
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    
                    updateMemberLinks(newEvent, connection)
                    .then(function (){
                        return getEventMembers([newEvent.id], connection);
                    })
                    .then(function (members){
                        newEvent.members = members.map(function (o){return o.userId;});
                        connection.commit(function (err){
                            if (err) {
                                return connection.rollback(function() {
                                    reject(err);
                                });
                            }
                            resolve(newEvent);
                        });
                    })
                    .catch(function (err){
                        connection.rollback(function() {
                            reject(err);
                        });
                    });
                });
            });
        });
    },
    deleteEvent: function (bandId, eventId, connection){
        return new Promise(function (resolve, reject){
            connection.beginTransaction(function (err){
                if (err) {
                    reject(err);
                    return;
                }
                
                var query = `DELETE FROM EVENT_MEMBERS WHERE EventID = ${parseInt(eventId,10)}`;
                connection.query(query, function (err){
                    if( err ){
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    query = `DELETE FROM EVENT WHERE EventID = ${parseInt(eventId,10)}`;
                    connection.query(query, function (err){
                        if( err ){
                            return connection.rollback(function() {
                                reject(err);
                            });
                        }
                        connection.commit(function (err){
                            if (err) {
                                return connection.rollback(function() {
                                    reject(err);
                                });
                            }
                            resolve();
                        });
                    });
                });
            });
        });
    },
    notifyMembers: function (bandId, eventId, message, connection){
        return new Promise(function (resolve, reject){
            connection.beginTransaction(function (err){
                if( err ){
                    reject(err); return;
                }
                var query = `SELECT Title FROM EVENT WHERE EventID = ${parseInt(eventId,10)}`;
                connection.query(query, function (err, result){
                    if( err ){
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    var title = result[0].Title;
                    query = `SELECT MemberID FROM EVENT_MEMBERS WHERE EventID = ${parseInt(eventId,10)}`;
                    connection.query(query, function (err, result){
                        if( err ){
                            return connection.rollback(function() {
                                reject(err);
                            });
                        }
                        query = result.map(function (row){
                            return `INSERT INTO NOTIFICATION (UserId, Type, Message, Link, Unread) VALUES (
                                ${parseInt(row.MemberID,10)},
                                ${Notification.TYPE.EVENT_REMINDER},
                                ${connection.escape('Event Notification for '+title.substr(0,100)+': '+message.toString())},
                                ${connection.escape('/bands/'+parseInt(bandId,10)+'/events')},
                                1
                            ); `;
                        }).join('');
                        connection.query(query, function (err){
                            if( err ){
                                return connection.rollback(function() {
                                    reject(err);
                                });
                            }
                            connection.commit(function (err){
                                if (err) {
                                    return connection.rollback(function() {
                                        reject(err);
                                    });
                                }
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    }
};

function getEventMembers(eventIds, connection){
    return new Promise(function (resolve, reject){
        if( eventIds.length === 0 ){
            resolve([]);
        }
        else{
            var query = `SELECT EM.EventID, U.UserID FROM EVENT_MEMBERS EM INNER JOIN USER U ON EM.MemberID = U.UserID WHERE EM.EventID IN (${eventIds.join(',')}) ORDER BY EventID ASC, UserID ASC`;
            connection.query(query, function (err, results){
                if( err ){
                    reject(err); return;
                }
                resolve(results.map(function (row){
                    return {
                        eventId: row.EventID,
                        userId: row.UserID
                    };
                }));
            });
        }
    });
}

function updateMemberLinks(event, connection){
    return new Promise(function (resolve, reject){
        var query = `DELETE FROM EVENT_MEMBERS WHERE MemberID NOT IN (${event.members.join(',')})`;
        connection.query(query, function (err){
            if( err ){
                reject(err); return;
            }
            query = `REPLACE INTO EVENT_MEMBERS (MemberID, EventID) VALUES ${event.members.map(function (member){
                return `(${member},${event.id})`;
            }).join(',')}`;
            connection.query(query, function (err){
                if( err ){
                    reject(err); return;
                }
                resolve();
            });
        });
    });
}

module.exports = EventService;