var Song = require('../../shared/classes/song.js'),
    SetList = require('../../shared/classes/setList.js'),
    fs = require('fs'),
    path = require('path');

var SetListService = {
    createSetList: function (newSetList, connection){
        return new Promise(function (resolve, reject){
            var query = `INSERT INTO SETLIST (BandID, Name, Description) VALUES (
                ${parseInt(newSetList.bandId,10)},
                ${connection.escape(newSetList.name)},
                ${connection.escape(newSetList.description)}
            )`;
            connection.beginTransaction(function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                
                //insert the new set list
                connection.query(query, function(err, result, fields) {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    
                    newSetList.id = result.insertId;
                    
                    updateSongLinks(newSetList, connection)
                    .then(function (){
                        connection.commit(function (err){
                            if (err) {
                                return connection.rollback(function() {
                                    reject(err);
                                });
                            }
                            resolve(newSetList);
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
    editSetList: function (newSetList, connection){
        return new Promise(function (resolve, reject){
            var query = `UPDATE SETLIST SET
                Name = ${connection.escape(newSetList.name)},
                Description = ${connection.escape(newSetList.description)}
            WHERE SetListID = ${parseInt(newSetList.id,10)} AND BandID = ${parseInt(newSetList.bandId,10)}`;
            
            connection.beginTransaction(function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                
                //insert the new song
                connection.query(query, function(err, result, fields) {
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    
                    updateSongLinks(newSetList, connection)
                    .then(function (){
                        connection.commit(function (err){
                            if (err) {
                                return connection.rollback(function() {
                                    reject(err);
                                });
                            }
                            resolve(newSetList);
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
    deleteSong: function (setListID, bandId, connection){
        return new Promise(function (resolve, reject){
            var query = `DELETE FROM SETLIST WHERE SetListID = ${parseInt(setListID, 10)} AND BandID = ${parseInt(bandId, 10)}`;
            
            connection.query(query, function (err, result){
                if( err ){
                    reject(err); return;
                }
                resolve();
            });
        });
    },
    getSetLists: function (bandId, connection){
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM SETLIST WHERE BandID = ${parseInt(bandId,10)} ORDER BY Name ASC`;
            connection.query(query, function (err, results){
                if( err ){
                    reject(err); return;
                }
                var setLists = results.reduce(function (lists, row){
                    lists[row.SetListID] = new SetList({
                        id: row.SetListID,
                        bandId: row.BandID,
                        name: row.Name
                    });
                    return lists;
                }, {});
                
                query = `SELECT * FROM SONG_SETLIST WHERE SetListID IN (${Object.keys(setLists).join(',')}) ORDER BY SetListID ASC, SongID ASC`;
                connection.query(query, function (err, results){
                    if( err ){
                        reject(err); return;
                    }
                    results.forEach(function (row){
                        setLists[row.SetListID].songs.push(row.SongID);
                    });
                    
                    resolve(Object.keys(setLists).map(function (key){
                        return setLists[key];
                    }));
                });
            });
        });
    }
};

function updateSongLinks(setList, connection){
    return new Promise(function (resolve, reject){
        var query = `DELETE FROM SONG_SETLIST WHERE SongID NOT IN (${setList.songs.join(',')})`;
        connection.query(query, function (err){
            if( err ){
                reject(err); return;
            }
            query = `REPLACE INTO SONG_SETLIST (SongID, SetListID) VALUES ${setList.songs.map(function (song){
                return `(${song},${setList.id})`;
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

module.exports = SetListService;