'use strict';

// Include gulp
let gulp = require('gulp');

// Include Our Plugins
let clean = require('gulp-clean');
let jshint = require('gulp-jshint');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');
let filter = require('gulp-filter');

let config = {
  src: './src/',
  dest: './dist/'
};

// Clean dist folder
gulp.task('clean', function () {
    return gulp.src(config.dest)
		.pipe(clean());
});

// Lint Task
gulp.task('jshint', ['clean'], function() {
    return gulp.src(config.src + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Minify JS
gulp.task('scripts', ['jshint'], function() {
    return gulp.src(config.src + '*.js')
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
		.pipe(filter('**/*.js')) // only let JavaScript files through here
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest));
});

// Default Task
gulp.task('default', ['scripts']);