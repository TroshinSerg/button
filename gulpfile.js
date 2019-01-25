"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({outputStyle: "expanded"}))
    .pipe(postcss([
      autoprefixer({
              browsers: ["last 2 versions"],
              cascade: false
            })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
});

function copy () {
  return gulp.src([
    "source/**/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
}

function clean () {
  return del("build");
}

gulp.task("build", gulp.series(clean, copy, "css"));
gulp.task("start", gulp.series("build"));