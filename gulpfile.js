var gulp = require('gulp')
var del = require('del')

var usemin = require('gulp-usemin')
var minifyHtml = require('gulp-minify-html')
var cleanCSS = require('gulp-clean-css')

var path = {
    src: './src',
    build: './target'
};

gulp.task('clean', function() {
    del([path.build]);
});

gulp.task('usemin', ['clean'], function() {
    return gulp.src(path.src + '/index.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true})],
            css: ['concat', cleanCSS()],
            js: ['concat']
        }))
        .pipe(gulp.dest(path.build));
});

gulp.task('assets', ['clean'], function() {
    return gulp.src(path.src + '/assets/*', {base: path.src})
        .pipe(gulp.dest(path.build));
});

gulp.task('default', ['assets', 'usemin']);
