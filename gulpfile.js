// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Clean dist folder
gulp.task('clean', function () {
    return gulp.src('dist/')
		.pipe(clean());
});

// Lint Task
gulp.task('jshint', ['clean'], function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Minify JS
gulp.task('scripts', ['jshint'], function() {
    return gulp.src('src/*.js')
        .pipe(gulp.dest('dist'))
        .pipe(rename('angular-reset-on.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['scripts']);