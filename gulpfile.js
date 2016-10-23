/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    babel  = require('gulp-babel'),
    htmlmin = require('gulp-htmlmin');

// BrowserSync in development

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
});

// Default Gulp Task

gulp.task('default', ['clean', 'minifyHtml', 'copy', 'build-css', 'build-js', 'watch']);

// Clean public folder

gulp.task('clean', function() {
  return del.sync('public');
});

// Copy assets

gulp.task('copy', function() {
  gulp.src('source/api/**/*.*').pipe(gulp.dest('public/api'));
  gulp.src('node_modules/chico/dist/assets/*.*').pipe(gulp.dest('public/assets/assets'));
});

// Minify HTML

gulp.task('minifyHtml', function() {
  return gulp.src('source/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});

// Build CSS

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

// Build JS

gulp.task('build-js', function() {
  return gulp.src([
      // Dependencies
      'node_modules/tiny.js/dist/tiny.min.js',
      'node_modules/chico/dist/ui/chico.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      // App
      'source/scripts/product-app.js',
      'source/scripts/**/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat('main.min.js'))
    .pipe(uglify()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/scripts'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['browserSync'], function() {
  gulp.watch('source/scripts/**/*.js', ['build-js', browserSync.reload]);
  gulp.watch('source/styles/**/*.scss', ['build-css', browserSync.reload]);
  gulp.watch(['source/**/*.html', 'source/api/**/*.*'], ['copy', browserSync.reload]);
});
