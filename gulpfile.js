"use strict";

let browserify = require("browserify");
let buffer = require("vinyl-buffer");
let es6ify = require("es6ify");
let gulp = require("gulp");
let gutil = require("gulp-util");
let reactify = require("reactify");
let source = require("vinyl-source-stream");
let sourcemaps = require("gulp-sourcemaps");
let watchify = require("watchify");

let bundler = watchify(browserify(es6ify.runtime, watchify.args));
bundler.debug = true;
bundler.add("./src/index.js");
bundler.transform("reactify");
bundler.transform("es6ify");

let compileJavascript = function () {
    return bundler
        .bundle()
        .on("error", gutil.log.bind(gutil, "Browserify Error"))
        .pipe(source("index.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true,
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public"))
    ;
};

gulp.task("js", compileJavascript);
bundler.on("update", function () {
    gulp.start("js");
});
