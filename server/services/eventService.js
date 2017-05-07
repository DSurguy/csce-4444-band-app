var Event = require('../../shared/classes/event.js'),
    {Member} = require('../../shared/classes/user.js');

var EventService = {
    getEvents: function (bandId, connection){
        return Promise.resolve([]);
    },
    createEvent: function (bandId, newEvent, connection){
        return new Promise(function (resolve, reject){
            var query = `INSERT INTO EVENT (BandID, EventDate, EventTime, LoadInTime, Location, Venue, Description, IsShow) 
                VALUES (${parseInt(bandId, 10)}, 
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
                        return getEventMembers(newEvent.id, connection);
                    })
                    .then(function (members){
                        newEvent.members = members;
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
    editEvent: function (bandId, event, connection){
        return Promise.resolve({});
    },
    deleteEvent: function (bandId, eventId, connection){
        return Promise.resolve();
    }
};

function getEventMembers(eventId, connection){
    return new Promise(function (resolve, reject){
        var query = `SELECT MemberID FROM EVENT_MEMBERS WHERE EventID = ${eventId}`;
        connection.query(query, function (err, results){
            if( err ){
                reject(err); return;
            }
            resolve(results.map(function (row){
                return row.UserID;
            }));
        });
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