let gulp = require('gulp');
let vueify = require('vueify');
let babelify = require('babelify');
let browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var minify = require('gulp-minify');



/**
 * [DEVELOPMENT TASKS]
 *
 *  These tasks are used purely for active development. All generated files are located in the 'dev' folder.
 *
 *  All files are unminified, and include sourcemaps.
 */

    // Copy the html file to dev
    gulp.task('dev:html', function(){
     var SRC = './src/index.html';

     return gulp.src(SRC)
       .pipe(gulp.dest('./dev'))
       .pipe(connect.reload());
    });

    // Convert es6 to es5, convert .vue files into useable code
    gulp.task('dev:browserify', function() {
      const BUNDLE = 'index-bundle.js';
      const SRC = './src/index.js';
      const DEST = './dev';

      let B = browserify({
        entries: SRC,
        debug: true,
        transform: ['vueify', 'babelify']
      });

      return B.bundle()
        .pipe(source(BUNDLE))
        .pipe(buffer())
        .pipe(gulp.dest(DEST))
        .pipe(connect.reload())
    });

    // Convert sass to css
    gulp.task('dev:sass', function () {
      var SRC = './src/index.scss';
      var DEST = './dev';

      return gulp.src(SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
        .pipe(gulp.dest(DEST))
        .pipe(connect.reload());
    });

    // Start a server pointing at the dev folder
    gulp.task('dev:connect', function() {
      connect.server({
        root: './dev',
        livereload: true
      });
    });

    // Default task for gulp is dev mode
    gulp.task('default', ['dev:connect', 'dev:html', 'dev:sass', 'dev:browserify'], () => {
      gulp.watch('./src/index.html', ['dev:html']);
      gulp.watch('./src/components/**/*.*', ['dev:browserify']);
      gulp.watch('./src/index.js', ['dev:browserify']);
      gulp.watch('./src/index.scss', ['dev:sass']);
    });



/**
 * [DISTRIBUTION TASKS]
 *
 *  These tasks are used to prepare the project for distribution.
 *
 *  These files are minified and without sourcemaps.
 *  A server is spun up to view the project to verify there are no errors.
 */

    // Copy the html file to dist
    gulp.task('dist:html', function(){
      var SRC = './src/index.html';

      return gulp.src(SRC)
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
    });

    // Convert es6 to es5, convert .vue files into useable code
    gulp.task('dist:browserify', function() {
      const BUNDLE = 'index-bundle.js';
      const SRC = './src/index.js';
      const DEST = './dist';

      let B = browserify({
        entries: SRC,
        debug: false,
        transform: ['vueify', 'babelify']
      });

      return B.bundle()
        .pipe(source(BUNDLE))
        .pipe(buffer())
        .pipe(gulp.dest(DEST))
        .pipe(connect.reload())
    });

    // Convert sass to css
    gulp.task('dist:sass', function () {
      var SRC = './src/index.scss';
      var DEST = './dist';

      return gulp.src(SRC)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
        .pipe(gulp.dest(DEST))
        .pipe(connect.reload());
    });

    // Start a server pointing at the dist folder
    gulp.task('dist:connect', function() {
      connect.server({
        root: './dist',
        livereload: true
      });
    });

    // Watch for changes and update the dist files
    gulp.task('dist', ['dist:html', 'dist:sass', 'dist:browserify'], () => {
      // gulp.watch('./src/index.html', ['dist:html']);
      // gulp.watch('./src/components/**/*.*', ['dist:browserify']);
      // gulp.watch('./src/index.js', ['dist:browserify']);
      // gulp.watch('./src/index.scss', ['dist:sass']);
    });
