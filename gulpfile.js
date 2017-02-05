var gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    minifyHtml = require('gulp-minify-html'),
    cleanCSS = require('gulp-clean-css'),
    webserver = require('gulp-webserver'),
    replace = require('gulp-replace')

var path = {
    src: './src',
    build: './target'
};

gulp.task('clean', function() {
    del([path.build]);
});

gulp.task('usemin', function() {
    return gulp.src(path.src + '/index.html')
        .pipe(usemin({
            html: [minifyHtml({empty: true})],
            css: ['concat', cleanCSS()],
            js: ['concat']
        }))
        .pipe(replace('#CURRENTDATE#', (new Date()).toDateString()))
        .pipe(gulp.dest(path.build));
});

gulp.task('assets', function() {
    return gulp.src(path.src + '/assets/*', {base: path.src})
        .pipe(gulp.dest(path.build));
});

gulp.task('fonts', function() {
    return gulp.src(path.src + '/bower_components/font-awesome/fonts/fontawesome-webfont.*')
        .pipe(gulp.dest(path.build + "/fonts/"));
});

gulp.task('build', function() {
    gulp.start('clean');
    gulp.start('usemin', 'assets', 'fonts');
});

gulp.task('webserver', function() {
    gulp.src(path.build).pipe(webserver({
        livereload: {enable: true}
    }));
});

gulp.task('default', ['build'])
