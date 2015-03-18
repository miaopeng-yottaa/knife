var gulp = require('gulp');
var concat = require("gulp-concat");
var swig = require('gulp-swig');
var minimist = require('minimist');
 
var defaultOpts = {
  'string': 'name',
  'default': { 'name': 'default-case' }
}; 

var options = minimist(process.argv.slice(2), defaultOpts);

var swigOpts = {
  data: {
    name: options.name,
    style: options.style
  }
}

gulp.task('css', function() {
  return gulp.src('./tpl/case.css')
    .pipe(swig(swigOpts))
    .pipe(concat(options.name + '.css'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src('./tpl/case.html')
    .pipe(swig(swigOpts))
    .pipe(concat(options.name + '.html'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('page', ['css', 'html']);

