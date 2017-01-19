var gulp = require('gulp')
var sass = require('gulp-sass')

var generate = require('./build/generate').generate

var config = {
  "paths": {
    "assets" : "assets/",
    "htmlSource": "build/templates",
    "htmlOutput": "build/out"
  }
}

gulp.task('generate', function (){
  generate();
})

gulp.task('sass', function () {
  return gulp.src(config.paths.assets + '/sass/*.scss')
  .pipe(sass({
    outputStyle: 'expanded',
    includePaths: [
      './assets/sass/registers',
      './assets/sass/registers/govuk_frontend_toolkit/stylesheets',
      './assets/sass/registers/govuk_template/source/assets/stylesheets',
      './assets/sass/registers/sass'
    ]}).on('error', sass.logError))
  .pipe(gulp.dest(config.paths.assets + '/stylesheets/'))
})

gulp.task('watch-sass', function () {
  return gulp.watch(config.paths.assets + 'sass/**', {cwd: './'}, ['sass'])
})

gulp.task('watch-html', function (){
  return gulp.watch(config.paths.htmlSource + '/**', {cwd: './'}, ['generate'])
})

gulp.task('default', ['watch-sass', 'watch-html'])