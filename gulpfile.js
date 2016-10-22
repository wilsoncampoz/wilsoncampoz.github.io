/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
});

// define the default task and add the watch task to it
gulp.task('default', ['clean', 'copy', 'build-css', 'build-js', 'watch']);

gulp.task('clean', function() {
  return del.sync('public');
});

gulp.task('copy', function() {
  // copy any html files in source/ to public/
  gulp.src('source/**/*.html').pipe(gulp.dest('public'));
  gulp.src('source/api/**/*.*').pipe(gulp.dest('public/api'));
  gulp.src('node_modules/chico/dist/assets/*.*').pipe(gulp.dest('public/assets/assets'));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
  return gulp.src([
      'node_modules/chico/dist/ui/chico.css',
      'source/libs/foundation.min.css',
      'source/styles/**/*.scss'
  ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('public/assets/styles'));
});

gulp.task('build-js', function() {
  return gulp.src([
      'node_modules/tiny.js/dist/tiny.js',
      'node_modules/chico/dist/ui/chico.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      // App
      'source/scripts/product-app.js',
      'source/scripts/**/*.js',
      'source/scripts/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/scripts'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('source/scripts/**/*.js', ['jshint', 'build-js', browserSync.reload]);
  gulp.watch('source/styles/**/*.scss', ['build-css', browserSync.reload]);
  gulp.watch(['source/**/*.html', 'source/api/**/*.*'], ['copy', browserSync.reload]);
});
