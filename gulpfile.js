var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();
var argv    = require('yargs').argv;

gulp.task('test', ['cover'], function () {
  require('./test/setup');
  return gulp.src(['test/integration.js', 'test/unit.js'])
    .pipe(plugins.mocha({
      reporter: 'spec',
      grep: argv.grep
    }))
    .pipe(plugins.istanbul.writeReports());
});

gulp.task('cover', function () {
  return gulp.src('src/*.js')
    .pipe(plugins.istanbul());
});
