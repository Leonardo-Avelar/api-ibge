const gulp     =  require('gulp');
const connect  =  require('gulp-connect');
const pug      =  require('gulp-pug');
const sass     =  require('gulp-sass');
const babel    =  require('gulp-babel');

gulp.task('connect', () => {
    connect.server({
        root: './dist/',
        livereload: true
    })
});

gulp.task('pug', () => {
    return gulp.src('src/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(pug())
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
});

gulp.task('style', () => {
    return gulp.src('src/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
});

gulp.task('babel', () => {
    return gulp.src('src/app.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
});

gulp.task('watch', () => {
    gulp.watch('src/index.pug', ['pug'])
    gulp.watch('src/style.scss', ['style'])
    gulp.watch('src/app.js', ['babel'])
});

gulp.task('default', ['pug', 'style', 'babel', 'connect', 'watch']);