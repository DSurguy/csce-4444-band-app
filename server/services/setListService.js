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
                        return getSetListSongs(newSetList.id, connection);
                    })
                    .then(function (songs){
                        newSetList.songs = songs;
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
                        return getSetListSongs(newSetList.id, connection);
                    })
                    .then(function (songs){
                        newSetList.songs = songs;
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
    deleteSetList: function (setListID, bandId, connection){
        return new Promise(function (resolve, reject){
            connection.beginTransaction(function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                var query = `DELETE FROM SONG_SETLIST WHERE SetListID = ${parseInt(setListID, 10)}`;
                connection.query(query, function (err){
                    if (err) {
                        return connection.rollback(function() {
                            reject(err);
                        });
                    }
                    query = `DELETE FROM SETLIST WHERE SetListID = ${parseInt(setListID, 10)} AND BandID = ${parseInt(bandId, 10)}`;
                    
                    connection.query(query, function (err, result){
                        if (err) {
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
    getSetLists: function (bandId, connection){
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM SETLIST WHERE BandID = ${parseInt(bandId,10)} ORDER BY Name ASC`;
            connection.query(query, function (err, results){
                if( err ){
                    reject(err); return;
                }
                else if( results.length == 0 ){
                    //it's possible there are no set lists, so just resolve with an empty array if so
                    resolve([]);
                }
                else{
                    var setLists = results.reduce(function (lists, row){
                        lists[row.SetListID] = new SetList({
                            id: row.SetListID,
                            bandId: row.BandID,
                            name: row.Name,
                            description: row.Description
                        });
                        return lists;
                    }, {});
                    query = `SELECT SS.SetListID, S.* FROM SONG_SETLIST SS INNER JOIN SONG S ON SS.SongID = S.SongID WHERE SS.SetListID IN (${Object.keys(setLists).join(',')}) ORDER BY SetListID ASC, SongID ASC`;
                    connection.query(query, function (err, results){
                        if( err ){
                            reject(err); return;
                        }
                        results.forEach(function (row){
                            setLists[row.SetListID].songs.push(new Song({
                                id: row.SongID,
                                bandId: row.BandID,
                                name: row.Name,
                                duration: row.Duration,
                                lyrics: row.Lyrics,
                                composer: row.Composer,
                                link: row.Link,
                                path: row.Path
                            }));
                        });
                        
                        resolve(Object.keys(setLists).map(function (key){
                            return setLists[key];
                        }));
                    });
                }
            });
        });
    }
};

function getSetListSongs(setListId, connection){
    return new Promise(function (resolve, reject){
        var query = `SELECT SS.SetListID, S.* FROM SONG_SETLIST SS INNER JOIN SONG S ON SS.SongID = S.SongID WHERE SS.SetListID = ${setListId} ORDER BY SetListID ASC, SongID ASC`;
        connection.query(query, function (err, results){
            if( err ){
                reject(err); return;
            }
            resolve(results.map(function (row){
                return new Song({
                    id: row.SongID,
                    bandId: row.BandID,
                    name: row.Name,
                    duration: row.Duration,
                    lyrics: row.Lyrics,
                    composer: row.Composer,
                    link: row.Link,
                    path: row.Path
                });
            }));
        });
    });
}

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