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
      './node_modules/govuk_frontend_toolkit/stylesheets/',
      './node_modules/govuk_template_jinja/assets/stylesheets/'
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