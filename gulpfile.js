var gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    minifyHtml = require('gulp-minify-html'),
    cleanCSS = require('gulp-clean-css'),
    webserver = require('gulp-webserver')

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

gulp.task('webserver', function() {
    gulp.src(path.build)
        .pipe(webserver({
            livereload: {enable: true}
        }));
});

gulp.task('build', ['assets', 'usemin']);

gulp.task('default', ['build']);
