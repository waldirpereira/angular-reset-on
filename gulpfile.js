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
let merge = require('merge-stream');

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


// Clean tests lib folder
gulp.task('clean-tests-lib', function () {
    return gulp.src('test/lib/')
		.pipe(clean());
});

// Copy test lib
gulp.task('test', ['clean-tests-lib'], function() {
	let componentsPath = "bower_components/";
	let testsLibPath = "test/lib/";
	return merge(
		gulp.src(componentsPath + 'jasmine/lib/jasmine-core/*')
			.pipe(gulp.dest(testsLibPath + 'jasmine')),
		gulp.src(componentsPath + 'jasmine/images/*')
			.pipe(gulp.dest(testsLibPath + 'jasmine')),
		gulp.src(componentsPath + 'jquery/dist/*.js')
			.pipe(gulp.dest(testsLibPath + 'jquery')),
		gulp.src(componentsPath + 'angular/*.js')
			.pipe(gulp.dest(testsLibPath + 'angular')),
		gulp.src(componentsPath + 'angular-mocks/*.js')
			.pipe(gulp.dest(testsLibPath + 'angular-mocks'))
	);
});

// Default Task
gulp.task('default', ['scripts', 'test']);