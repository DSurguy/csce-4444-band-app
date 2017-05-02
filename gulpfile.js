var gulp = require('gulp'),
    pump = require('pump'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    fs = require('fs');

gulp.task('bundle', function (cb) {
    pump([
        gulp.src([
            'shared/classes/*.js',
            'shared/utils/*.js',
            'client/app.js',
            'client/page.js',
            'client/components/*.js',
            'client/pages/*.js',
        ]),
        sourcemaps.init(),
        concat('bundle.js', {newLine: '\n;//bundle semicolon\n\n'}),
        sourcemaps.write(),
        gulp.dest('static/js/app')
    ],
    cb
    );
});

gulp.task('cleanDist', function (){
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('moveFilesToDist', ['bundle', 'cleanDist'], function (cb){
    pump([
        gulp.src([
            './static/**',
            './views/**',
            './shared/**',
            './server/**',
            './app.js'
        ], {base: './'}),
        gulp.dest('./dist')
    ], cb);
});

gulp.task('movePackageJson', ['moveFilesToDist'], function (cb){
    fs.mkdir('./dist', '0755', function (err, result){
        if( err ){}
        fs.readFile('./package.json', function (err, data){
            if (err){ throw err; }
            var pkg = JSON.parse(data);
            
            delete pkg.devDependencies;
            pkg.scripts = {
                "start": "node app.js"
            };
            
            fs.writeFile('./dist/package.json', JSON.stringify(pkg), function (err){
                if( err ){ throw err; }
                cb();
            });
        });
        
    });
});

gulp.task('dist', ['movePackageJson']);