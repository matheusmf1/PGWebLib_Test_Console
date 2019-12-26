const gulp = require('gulp');
const concat = require('gulp-concat');
const mincss = require('gulp-clean-css');
const tinify = require('gulp-tinifier');
const minjs = require('gulp-jsmin');

const task = (srcPaths, runner, outputName, dropFolder) => {
  return gulp.src(srcPaths)
    .pipe(runner())
    .pipe(concat(outputName))
    .pipe(gulp.dest(dropFolder));  
};

// CSS
gulp.task('min-css-components', async () => task('./src/frontend/components/*.css', mincss, 'components.min.css', 'public/css'));

gulp.task('min-css-operacao', async () => task('./src/frontend/styles/operacao/*.css', mincss, 'operacao.min.css', 'public/css'));

gulp.task('min-css-initial', async () => task('./src/frontend/styles/initial/*.css', mincss, 'initial.min.css', 'public/css'));

gulp.task('min-css-common', async () => task('./src/frontend/styles/common/*.css', mincss, 'common.min.css', 'public/css'));

// JS
gulp.task('min-js-components', async () => task('./src/frontend/components/*.js', minjs, 'components.min.js', 'public/js'));

gulp.task('min-js-operacao', async () => task('./src/frontend/scripts/operacao/*.js', minjs, 'operacao.min.js', 'public/js'));

gulp.task('min-js-initial', async () => task('./src/frontend/scripts/initial/*.js', minjs, 'initial.min.js', 'public/js'));


gulp.task( 'watch', async () => {
  gulp.watch('./src/frontend/components/*.css', gulp.parallel('min-css-components'));
  gulp.watch('./src/frontend/styles/operacao/*.css', gulp.parallel('min-css-operacao'));
  gulp.watch('./src/frontend/styles/initial/*.css', gulp.parallel('min-css-initial'));
  gulp.watch('./src/frontend/styles/common/*.css', gulp.parallel('min-css-common'));

  gulp.watch('./src/frontend/components/*.js', gulp.parallel('min-js-components'));
  gulp.watch('/src/frontend/scripts/operacao/*.js', gulp.parallel('min-js-operacao'));
  gulp.watch('/src/frontend/scripts/initial/*.js', gulp.parallel('min-js-initial'));
});

gulp.task('default', gulp.parallel(
  'min-css-components',
  'min-css-operacao',
  'min-css-initial',
  'min-css-common',
  'min-js-components',
  'min-js-operacao',
  'min-js-initial',
  'watch'
));