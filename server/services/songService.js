var Song = require('../../shared/classes/song.js'),
    fs = require('fs'),
    path = require('path');

var SongService = {
    createSong: function (newSong, songFile, connection){
        return new Promise(function (resolve, reject){
            var query = `INSERT INTO SONG (BandID, Name, Duration, Lyrics, Composer, Link, Path) VALUES (
                ${parseInt(newSong.bandId,10)},
                ${connection.escape(newSong.name)},
                ${connection.escape(newSong.duration)},
                ${connection.escape(newSong.lyrics)},
                ${connection.escape(newSong.composer)},
                ${connection.escape(newSong.link)},
                ${connection.escape(newSong.path)}
            )`;
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
                    
                    newSong.id = result.insertId;
                    
                    uploadSong(songFile, newSong)
                    .then(function (relativePath){
                        newSong.path = relativePath;
                        query = `UPDATE SONG SET Path = ${connection.escape(relativePath)} WHERE SongID = ${parseInt(newSong.id,10)}`;
                        connection.query(query, function (err, result, fields){
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
                                resolve(newSong);
                            });
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
    editSong: function (newSong, songFile, connection){
        return new Promise(function (resolve, reject){
            var query = `UPDATE SONG SET
                Name = ${connection.escape(newSong.name)},
                Duration = ${connection.escape(newSong.duration)},
                Lyrics = ${connection.escape(newSong.lyrics)},
                Composer = ${connection.escape(newSong.composer)},
                Link = ${connection.escape(newSong.link)},
                Path = ${connection.escape(newSong.path)}
            WHERE SongID = ${parseInt(newSong.id,10)} AND BandID = ${parseInt(newSong.bandId,10)}`;
            
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
                    
                    if( songFile && songFile.name ){
                        uploadSong(songFile, newSong)
                        .then(function (relativePath){
                            newSong.path = relativePath;
                            query = `UPDATE SONG SET Path = ${connection.escape(relativePath)} WHERE SongID = ${parseInt(newSong.id,10)}`;
                            connection.query(query, function (err, result, fields){
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
                                    resolve(newSong);
                                });
                            });
                        })
                        .catch(function (err){
                            connection.rollback(function() {
                                reject(err);
                            });
                        });
                    }
                    else{
                        resolve(newSong);
                    }
                });
            });
        });
    },
    deleteSong: function (songId, bandId, connection){
        return new Promise(function (resolve, reject){
            var query = `DELETE FROM SONG WHERE SongID = ${parseInt(songId, 10)} AND BandID = ${parseInt(bandId, 10)}`;
            
            connection.query(query, function (err, result){
                if( err ){
                    reject(err); return;
                }
                resolve();
            });
        });
    },
    getSong: function (songId, bandId, connection){ /* Is bandId necessary? */
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM SONG WHERE SongID = ${parseInt(songId,10)} AND BandID = ${parseInt(bandId,10)}`;
            connection.query(query, function (err, result){
                if( err ){
                    reject(err); return;
                }
                resolve(new Song({
                    id: result[0].SongID,
                    bandId: result[0].BandID,
                    name: result[0].Name,
                    duration: result[0].Duration,
                    lyrics: result[0].Lyrics,
                    composer: result[0].Composer,
                    link: result[0].Link,
                    path: result[0].Path
                }));
            });
        });
    },
    getSongs: function (bandId, connection){
        return new Promise(function (resolve, reject){
            var query = `SELECT * FROM SONG WHERE BandID = ${parseInt(bandId,10)} ORDER BY Name ASC`;
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
};

function uploadSong (file, newSong, connection){
    return new Promise(function (resolve, reject){
        var imageName = file.name;

		if (!imageName) {
			reject("Error with image.");
			return;
		}
        
        var subPaths = ['media', newSong.bandId, 'songs', ''+newSong.id];
		var fullPath = path.resolve(path.dirname(require.main.filename), 'media', newSong.bandId, 'songs', ''+newSong.id, file.name);
		
		//Gotta recursively create all missing folders
		(function next(i){
		    if( i >= subPaths.length ){
		        return Promise.resolve();
		    }
		    return new Promise(function (res, rej){
		        var subPath = path.resolve.apply('',[path.dirname(require.main.filename)].concat(subPaths.slice(0,i+1)));
                fs.exists(subPath, (exists) => {
                    if( !exists ){
                        fs.mkdir(subPath, function (err){
                            if( err ){
                                rej(err);
                                return;
                            }
                            next(i+1).then(res).catch(rej);
                        });
                    }
                    else{
                        next(i+1).then(res).catch(rej);
                    }
                });
		    });
		})(0)
		.then(function (){
            //directories created, now save the file
    		fs.writeFile(fullPath, file.data, function (err) {
    			if (err) {
    				reject(err);
    				return;
    			}
    
    			resolve('/'+subPaths.join('/')+'/'+file.name);
    		});
		})
		.catch(reject);
    });
}

module.exports = SongService;