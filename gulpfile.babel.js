let gulp = require('gulp');
let vueify = require('vueify');
let babelify = require('babelify');
let browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
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
    // .pipe(connect.reload())
});


gulp.task('sass', function () {
  var SRC = './src/index.scss';
  var DEST = './dev';

  return gulp.src(SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefixer({ browsers: ['last 2 versions', '>5%'] }))
    .pipe(gulp.dest(DEST))
    // .pipe(connect.reload());
});



// gulp.task('vueify', () => {
//   return gulp.src('./src/components/**/*.vue')
//     .pipe(vueify())
//     .pipe(gulp.dest('./dev'));
// });
//
// gulp.task('connect', function() {
//   connect.server({
//     root: DEV,
//     livereload: true
//   });
// });
//
// gulp.task('watch', () => {
//   gulp.watch('./src/components/**.*', ['vueify']);
// });





// gulp.task('browserify', function() {
//   const BUNDLE = 'index.js';
//   const SRC = './src/components/**.*';
//
//   const B = browserify({
//     entries: SRC,
//     debug: true,
//     transform: ['vueify', 'babelify']
//   });
//
//   return B.bundle()
//     .pipe(source(BUNDLE))
//     .pipe(buffer())
//     .pipe(gulp.dest('./dev'))
//     .pipe(connect.reload())
// });
