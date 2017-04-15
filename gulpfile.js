var gulp = require('gulp'),
    pump = require('pump'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('dist', function (cb) {
    pump([
        gulp.src([
            'shared/classes/*.js',
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