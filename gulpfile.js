'using strict';

const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const run = require('gulp-run');
const tslint = require('gulp-tslint');
const config = require('./tsconfig.json');
const sequence = require('run-sequence');
const isMac = /^darwin/.test(process.platform);

/* >>>> STANDARD TASKS <<<< */
gulp.task('default', ['build']);

// >>>>>>>>>> TEMPORARY <<<<<<<<<<<
// UNNCESSARY ONCE ROCNNET SUCCESSFULLY DEPLOYS SHARED_LIB TENNOCR_IO TO CORRECT RPATH
// MAC LINK
if (isMac) {
	gulp.task('mac:link', ['copy:addon'], () => {
		return run('install_name_tool -change @rpath/libtenncor_io.dylib /Users/cmk/Developer/webspace/viser/addon/lib/libtenncor_io.dylib ./dist/addon/node_viser.node').exec();
	});

	// build
	gulp.task('build', [
		'copy:libs', 'copy:static', 'tslint', 
		'build:app', 'copy:addon', 'mac:link',
		'typecompile:addon'
	]);
}
else {
	gulp.task('build', [
		'copy:libs', 'copy:static', 'tslint',
		'build:app', 'copy:addon',
		'typecompile:addon'
	]);
}

// CLEAN DIST
gulp.task('clean', (cb) => {
	return del(['dist'], cb);
});

// >>>> FIRST ORDER DEPENDENCIES
// COPY LIBRARY DEPENDENCIES
gulp.task('copy:libs', () => {
	return gulp.src([
		'vis/dist/vis.js'
	], { cwd: 'node_modules/**' }) /* Glob required here. */
	.pipe(gulp.dest('dist/libs'));
});

// COPY STATIC RESOURCES
gulp.task('copy:static', () => {
	return gulp.src([
		'app/**/*', 
		'!**/*.ts', 
		'!app/typings', 
		'!app/typings/**', 
		'!app/*.json'
	])
	.pipe(gulp.dest('dist/app'));
});

// LINT
gulp.task('tslint', function() {
	return gulp.src('app/**/*.ts')
		.pipe(tslint({
			formatter: 'prose'
		}))
		.pipe(tslint.report('verbose'));
});

// COMPILE ADDON
gulp.task('build:addon', () => {
	return run('node-gyp configure && '+
		'HOME=~/.electron-gyp '+
		'node-gyp rebuild --target=1.4.12 --arch=x64 --dist-url=https://atom.io/download/electron').exec();
});

// >>>> SECOND ORDER DEPENDENCIES
// BUILD APP
gulp.task('build:app', ['tslint'], function () {
	var tsResult = gulp.src('app/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript(config.compilerOptions));
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/app'));
});

// COPY ADDON
gulp.task('copy:addon', ['build:addon'], () => {
	return gulp.src([
		'node_viser.node'
	], { cwd: 'build/Release/**'})
	.pipe(gulp.dest('dist/addon'));
});

// copy over optypes.ts
gulp.task('typecompile:addon', ['build:addon'], function () {
	var tsResult = gulp.src('addon/optypes.ts')
		.pipe(sourcemaps.init())
		.pipe(typescript(config.compilerOptions));
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/addon'));
});