var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    addsrc = require('gulp-add-src'),
    js_obfuscator = require('gulp-js-obfuscator'),
    babel = require('gulp-babel');    

/**
 * Minify and combine JS files, including jQuery and Bootstrap
 */
gulp.task('scripts', function() {
    gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/raven-js/dist/raven.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/js/global/**/*.js'
        ])
        //.pipe(babel({presets: ['es2015']}))
        //.pipe(uglify())
        //.pipe(js_obfuscator({}, ["**/jquery-*.js"]))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('docs/dist/js'));

    gulp.src([
            'src/js/firebase/firebaseauth.js'
            ,'src/js/firebase/firebaseaddlocations.js'
            ,'src/js/googlemap/mapgetinput.js'
        ])
        //.pipe(babel({presets: ['es2015']}))
        //.pipe(uglify())
        //.pipe(js_obfuscator({}, ["**/jquery-*.js"]))
        .pipe(concat('getmemory.js'))
        .pipe(gulp.dest('docs/dist/js'));
    
    gulp.src([
            'src/js/googlemap/memoriesmap.js'
        ])
        .pipe(babel({presets: ['es2015']}))
        //.pipe(uglify())
        //.pipe(js_obfuscator({}, ["**/jquery-*.js"]))
        .pipe(concat('memoriesmap.js'))
        .pipe(gulp.dest('docs/dist/js'));

});
/**
 * Build SASS, combine with Bootstrap CSS and minify
 */
gulp.task('sass', function() {
    gulp.src([
            'src/sass/main.scss'
            , 'node_modules/font-awesome/scss/font-awesome.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(addsrc.prepend('node_modules/bootstrap/dist/css/bootstrap.css'))
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('docs/dist/css'));
});

/**
 * Move bootstrap and project font files into dist
 */
gulp.task('fonts', function() {
    gulp.src([
            'node_modules/bootstrap/dist/fonts/*',
            'node_modules/font-awesome/fonts/*',
            'src/fonts/*'
        ])
        .pipe(gulp.dest('docs/dist/fonts'));
});

/**f
 * The default gulp task
 */
gulp.task('default', function() {
    gulp.run('scripts', 'sass', 'fonts');
});

/**
 * Watch asset files for changes. First runs default to prevent annoying issues.
 */
gulp.task('watch', function() {
    gulp.run('default');

    gulp.watch('src/sass/**/*.scss', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('sass');
    });

    gulp.watch('src/js/**/*.js', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('scripts');
    });
});
