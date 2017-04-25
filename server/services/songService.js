var Song = require('../../shared/classes/song.js'),
    fs = require('fs'),
    path = require('path');

var SongService = {
    createSong: function (newSong, songFile, connection){
        return new Promise(function (resolve, reject){
            var query = `INSERT INTO SONG (BandID, Name, Duration, Lyrics, Composer, Link, Path) VALUES (
                ${newSong.bandId},
                '${newSong.name}',
                '${newSong.duration}',
                '${newSong.lyrics}',
                '${newSong.composer}',
                '${newSong.link}',
                '${newSong.path}'
            )`;
            
            console.log(query);
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
                        query = `UPDATE SONG SET Path = '${relativePath}' WHERE SongID = '${newSong.id}'`;
                        console.log(query);
                        connection.query(query, function (err, result, fields){
                            if (err) {
                                return connection.rollback(function() {
                                    reject(err);
                                });
                            }
                            resolve(newSong);
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
    editSong: function (){
        
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
    
    			resolve(path.resolve.apply('',subPaths.concat([file.name])));
    		});
		})
		.catch(reject);
    });
}

module.exports = SongService;