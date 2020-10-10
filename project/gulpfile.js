"use strict";
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssbeautify = require("gulp-cssbeautify");
const concat = require("gulp-concat");
const minCSS = require("gulp-clean-css");
const { series } = require('gulp');
const rename = require("gulp-rename");
const del = require("del");


const style = () => {
    console.log("Style working");
    return gulp.src("./src/SCSS/**/*.scss")
    .pipe(sass())
    .pipe(cssbeautify())
    .pipe(gulp.dest("./dist/css"))
}

const combineCSS = () => {
  return gulp.src("./dist/**/*.css")
  .pipe(concat("styles.css"))
  .pipe(gulp.dest("./dist/css/final/"))
  
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


const clearDist = () => {
  // return del("./dist/**/*.*"); // Delete only files and retain the folders
  // return del("./dist/**"); // Delete contents of dist
  return del("./dist"); // Delete dist folder
}


exports.style = style;
exports.minifyCSS = minifyCSS;
exports.combineCSS = combineCSS;
exports.processCSS = processCSS;
exports.clearDist = clearDist;


exports.default = series(style,processCSS);