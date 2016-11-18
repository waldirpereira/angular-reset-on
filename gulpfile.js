'use strict';

// Include gulp
var gulp = require('gulp');

// Include Plugins
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var merge = require('merge-stream');
var jasmine = require('gulp-jasmine');
var karmaServer = require('karma').Server;
var coveralls = require('gulp-coveralls');

var pathToKarmaConf = __dirname + '/test/conf/';

var config = {
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
gulp.task('copy-tests-lib', ['clean-tests-lib'], function() {
	var componentsPath = "bower_components/";
	var testsLibPath = "test/lib/";
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
			.pipe(gulp.dest(testsLibPath + 'angular-mocks')),
		gulp.src(componentsPath + 'angular-ui-select/dist/*.js')
			.pipe(gulp.dest(testsLibPath + 'ui-select'))
	);
});

// Test task (run Karma)
gulp.task('karma', function (done) {
  return new karmaServer({
    configFile: pathToKarmaConf + 'karma.conf.js',
    singleRun: true
  }, done).start();
});

// Send code coverage to Coveralls
gulp.task('coveralls', ['karma'], function (done) {
  return gulp.src('test/coverage/**/lcov.info')
    .pipe(coveralls());
});

// Test task
gulp.task('test', ['coveralls']);

// Default Task
gulp.task('default', ['scripts', 'copy-tests-lib']);