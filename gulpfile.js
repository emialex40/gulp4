let theme_name = 'valid-form';
let preprocessor = 'scss',
	baseDir      = 'wp-content/themes/'+ theme_name;
let paths = {
	styles: {
		src:  baseDir + '/sass/style.*',
		dest: baseDir + '/css',
	},
	cssOutputName: 'style.css',
}

const { src, dest, parallel, watch } = require('gulp');
const scss         = require('gulp-sass');
const cleancss     = require('gulp-clean-css');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

function styles() {
	return src(paths.styles.src)
		.pipe(eval(preprocessor)())
		.pipe(concat(paths.cssOutputName))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
		.pipe(dest(paths.styles.dest))
}

function startwatch() {
	watch(baseDir  + '/**/sass/**/*', styles);
}

exports.default     = parallel(styles, startwatch);