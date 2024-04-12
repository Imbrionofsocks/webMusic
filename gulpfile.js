const gulp = require('gulp');
const minify = require('gulp-minify');
const sass = require('gulp-sass')(require('sass'));

gulp.task('miligram', () => {
    return gulp
        .src('./src/miligram/milligram.sass')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./out/css'));
});
gulp.task('scss', () => {
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./out/css'));
});

gulp.task('js', () => {
    return gulp
        .src('./src/js/**/*.js')
        .pipe(
            minify({
                ext: {
                    min: '.js',
                },
                noSource: true,
            }),
        )
        .pipe(gulp.dest('./out/js'));
});

gulp.task('default', gulp.series('miligram', 'scss', 'js'));
