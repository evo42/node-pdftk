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

gulp.task('enforce', function () {
  return gulp.src('.')
    .pipe(plugins.istanbulEnforcer({
      thresholds: {
        statements: 100,
        branches: 100,
        lines: 100,
        functions: 100
      },
      coverageDirectory: 'coverage',
      rootDirectory: ''
    }));
});
