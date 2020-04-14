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

gulp.task('min-css-login', async () => task('./src/frontend/styles/login/*.css', mincss, 'login.min.css', 'public/css'));

gulp.task('min-css-common', async () => task('./src/frontend/styles/common/*.css', mincss, 'common.min.css', 'public/css'));

gulp.task('min-css-main', async () => task('./src/frontend/styles/main/*.css', mincss, 'main.min.css', 'public/css'));

gulp.task('min-css-validation', async () => task('./src/frontend/styles/validation/*.css', mincss, 'validation.min.css', 'public/css'));

gulp.task('min-css-settings', async () => task('./src/frontend/styles/settings/*.css', mincss, 'settings.min.css', 'public/css'));

gulp.task('min-css-passwordReset', async () => task('./src/frontend/styles/passwordReset/*.css', mincss, 'passwordReset.min.css', 'public/css'));

// JS
gulp.task('min-js-components', async () => task('./src/frontend/components/*.js', minjs, 'components.min.js', 'public/js'));

gulp.task('min-js-common', async () => task('./src/frontend/scripts/common/*.js', minjs, 'common.min.js', 'public/js'));

gulp.task('min-js-operacao', async () => task('./src/frontend/scripts/operacaoPage/*.js', minjs, 'operacao.min.js', 'public/js'));

gulp.task('min-js-login', async () => task('./src/frontend/scripts/loginPage/*.js', minjs, 'login.min.js', 'public/js'));

gulp.task('min-js-sideBar', async () => task('./src/frontend/scripts/sideBar/*.js', minjs, 'sideBar.min.js', 'public/js'));

gulp.task('min-js-main', async () => task('./src/frontend/scripts/mainPage/*.js', minjs, 'main.min.js', 'public/js'));

gulp.task('min-js-validation', async () => task('./src/frontend/scripts/validationPage/*.js', minjs, 'validation.min.js', 'public/js'));

gulp.task('min-js-settings', async () => task('./src/frontend/scripts/settingsPage/*.js', minjs, 'settings.min.js', 'public/js'));

gulp.task('min-js-passwordReset', async () => task('./src/frontend/scripts/passwordReset/*.js', minjs, 'passwordReset.min.js', 'public/js'));


gulp.task( 'watch', async () => {
  gulp.watch('./src/frontend/components/*.css', gulp.parallel('min-css-components'));
  gulp.watch('./src/frontend/styles/operacao/*.css', gulp.parallel('min-css-operacao'));
  gulp.watch('./src/frontend/styles/login/*.css', gulp.parallel('min-css-login'));
  gulp.watch('./src/frontend/styles/common/*.css', gulp.parallel('min-css-common'));
  gulp.watch('./src/frontend/styles/main/*.css', gulp.parallel('min-css-main'));
  gulp.watch('./src/frontend/styles/validation/*.css', gulp.parallel('min-css-validation'));
  gulp.watch('./src/frontend/styles/settings/*.css', gulp.parallel('min-css-settings'));
  gulp.watch('./src/frontend/styles/passwordReset/*.css', gulp.parallel('min-css-passwordReset'));

  gulp.watch('./src/frontend/components/*.js', gulp.parallel('min-js-components'));
  gulp.watch('./src/frontend/scripts/operacaoPage/*.js', gulp.parallel('min-js-operacao'));
  gulp.watch('./src/frontend/scripts/common/*.js', gulp.parallel('min-js-common'));
  gulp.watch('./src/frontend/scripts/loginPage/*.js', gulp.parallel('min-js-login'));
  gulp.watch('./src/frontend/scripts/sideBar/*.js', gulp.parallel('min-js-sideBar'));
  gulp.watch('./src/frontend/scripts/mainPage/*.js', gulp.parallel('min-js-main'));
  gulp.watch('./src/frontend/scripts/validationPage/*.js', gulp.parallel('min-js-validation'));
  gulp.watch('./src/frontend/scripts/settingsPage/*.js', gulp.parallel('min-js-settings'));
  gulp.watch('./src/frontend/scripts/passwordReset/*.js', gulp.parallel('min-js-passwordReset'));
});

gulp.task('default', gulp.parallel(
  'min-css-components',
  'min-css-operacao',
  'min-css-login',
  'min-css-common',
  'min-css-main',
  'min-css-validation',
  'min-css-settings',
  'min-css-passwordReset',
  'min-js-components',
  'min-js-common',
  'min-js-operacao',
  'min-js-login',
  'min-js-sideBar',
  'min-js-main',
  'min-js-validation',
  'min-js-settings',
  'min-js-passwordReset',
  'watch'
));