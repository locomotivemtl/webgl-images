import gulp from 'gulp';
import gulpConcat from 'gulp-concat';
import paths from '../mconfig.json';

function concat() {
    return gulp
        .src([
            `${paths.scripts.vendors.src}*.js`,
            'node_modules/gsap/dist/gsap.min.js',
            'node_modules/three/build/three.min.js',
            'node_modules/dat.gui/build/dat.gui.min.js'
        ])
        .pipe(gulpConcat(`${paths.scripts.vendors.main}.js`))
        .pipe(gulp.dest(paths.scripts.dest));
}

export default concat;
