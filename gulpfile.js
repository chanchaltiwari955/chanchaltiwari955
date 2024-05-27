var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('scss', function() {
    return gulp.src('./source/_patterns/_patterns-global/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./source/css/')) 
});

gulp.task('clean', function() {
    return del('./source/css/style.css');
})

gulp.task('watch', function(){
    return gulp.watch('./source/**/*.scss', gulp.series(['clean', 'scss']));
});

//Compile patter-lab "gulp default"
gulp.task('default', gulp.series('watch'));
