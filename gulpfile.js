var gulp = require('gulp')
var del = require('del')

var paths = {
    src: "./src",
    build: "./target"
};

gulp.task('clean', function() {
    del([paths.build]);
});

gulp.task('copy', ['clean'], function() {
    return gulp.src(paths.src + "/*")
        .pipe(gulp.dest(paths.build));
});

gulp.task('build', ['copy'])

gulp.task('default', ['build']);
