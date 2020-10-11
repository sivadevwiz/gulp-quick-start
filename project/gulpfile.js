"use strict";
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssbeautify = require("gulp-cssbeautify");
const concat = require("gulp-concat");
const minCSS = require("gulp-clean-css");
const { series, parallel } = require('gulp');
const rename = require("gulp-rename");
const del = require("del");
const jsMin = require("gulp-jsmin");
const beautify  = require("gulp-jsbeautifier");
const minJS = require("gulp-jsmin");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');


const style = () => {
    return gulp.src("./src/SCSS/**/*.scss")
    .pipe(sass())
    .pipe(cssbeautify())
    .pipe(gulp.dest("./dist/css"));
}

const concatCSS = () => {
  return gulp.src("./dist/**/*.css")
  .pipe(concat("styles.css"))
  .pipe(gulp.dest("./dist/css/final/"));
  
}

const minifyCSS = () => {
  return gulp.src("./dist/css/final/*.css")
  .pipe(minCSS())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("./dist/css/min"));
}

const processCSS = () => {
  return gulp.src("./dist/**/*.css")
  .pipe(concat("styles.css"))
  .pipe(gulp.dest("./dist/css/final/"))
  .pipe(minCSS())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("./dist/css/min"));
}

const concatJS = () => {
  return gulp.src("./src/JS/**/*.js")
  .pipe(beautify())
  .pipe(concat("scripts.js"))
  .pipe(gulp.dest("./dist/JS/final/"));

}

const minifyJS = () => {
  return gulp.src("./dist/JS/final/*.js")
  .pipe(babel())
  .pipe(uglify())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest("./dist/JS/min/"));

}

const beautifySourceJS = () => {
  return gulp.src("./src/JS/**/*.js")
  .pipe(beautify())
  .pipe(gulp.dest("./src/JS/"));

}


const clearDist = () => {
  // return del("./dist/**/*.*"); // Delete only files and retain the folders
  // return del("./dist/**"); // Delete contents of dist
  return del("./dist"); // Delete dist folder
}


exports.style = style;
exports.minifyCSS = minifyCSS;
exports.concatCSS = concatCSS;
exports.processCSS = processCSS;
exports.clearDist = clearDist;
exports.concatJS = concatJS;
exports.beautifySourceJS = beautifySourceJS;
exports.minifyJS = minifyJS;


exports.default = parallel(series(style,processCSS), concatJS);