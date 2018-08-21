var gulp  = require('gulp')
var browserSync = require('browser-sync').create()
var sass  = require('gulp-sass')

//compiles sass into css and moves the files from boostrap default to css folder
gulp.task('compile-sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss',
    'public/scss/*.scss'])//source location of bs files
    .pipe(sass())//compile
    .pipe(gulp.dest('public/css'))//destination
    .pipe(browserSync.stream())
})

//move JavaScript to js folder
gulp.task('move-js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
  'node_modules/tether/dist/js/tether.min.js', 
  'node_modules/jquery/dist/jquery.min.js', 
  'node_modules/popper.js/dist/umd/popper.min.js',
  'node_modules/@fortawesome/fontawesome-free/js/all.js'])
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.stream())
})

gulp.task('launch-server', ['compile-sass'], function(){//run sass when servers up
  browserSync.init({
    server:'./public'//run servers
  })
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'],//listen for css changes
  ['compile-sass'])
  gulp.watch('public/*.html').on('change', browserSync.reload)//listen for html changes
})

gulp.task('default', ['move-js', 'launch-server']) //run all of the above
