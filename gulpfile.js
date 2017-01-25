var gulp = require('gulp')
var usemin = require('gulp-usemin')
var minifyHtml = require('gulp-minify-html')
var cleanCSS = require('gulp-clean-css')
var del = require('del')

var paths = {
    src: './src',
    build: './target'
};

gulp.task('clean', function() {
    del([paths.build]);
});

gulp.task('usemin', ['clean'], function() {
    return gulp.src(paths.src + '/index.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true})],
            css: ['concat', cleanCSS()],
            js: ['concat']
        }))
        .pipe(gulp.dest(paths.build));
});

gulp.task('build', ['usemin'])
gulp.task('default', ['build']);
