var gulp = require('gulp')
var sass = require('gulp-sass')

var config = {
  "paths": {
    "assets" : "assets/"
  }
}

gulp.task('sass', function () {
  return gulp.src(config.paths.assets + '/sass/*.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest(config.paths.assets + '/stylesheets/'))
})

gulp.task('watch-sass', function () {
  return gulp.watch(config.paths.assets + 'sass/**', {cwd: './'}, ['sass'])
})

gulp.task('default', ['watch-sass'])