var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    babelify = require("babelify"),
    browserify = require("browserify"),
    buffer = require("vinyl-buffer"),
    source = require('vinyl-source-stream'),
    babel = require("gulp-babel"),
    del = require("del"),
    shell = require("gulp-shell"),
    runSequence = require("run-sequence");

gulp.task("clean", function (callback) {
    del([
        "./build/**/*"
    ], callback);
});

gulp.task("build:public", function () {
    return gulp.src([
        "./server/public/**/*"
    ]).
        pipe(gulp.dest("./build/server/public"));
});

gulp.task("build:server", function () {
    return gulp.src([
        "!./build/**/*",
        "!./client/**/*",
        "!./node_modules/**/*",
        "!./server/public/**/*",
        "!./*.js",
        "./**/*.js"
    ]).
        pipe(sourcemaps.init({loadMaps: true})).
        pipe(babel()).
        pipe(sourcemaps.write("./")).
        pipe(gulp.dest("./build"))
});

gulp.task("build:client", function () {
    return browserify({
            basedir : "./",
            entries: "./client/index.js",
            debug: true,
            exclude : [
                "./Scalar",
                "./modules/**/*"
            ]
        }).
        transform(babelify.configure({
            optional: ["es7.asyncFunctions"]
        })).
        bundle().
        pipe(source("client-compiled.js")).
        pipe(buffer()).
        pipe(sourcemaps.init({loadMaps: true})).
        pipe(sourcemaps.write("./")).
        pipe(gulp.dest("./build/server/public/compiled"));
});

gulp.task("build", ["build:public", "build:server", "build:client"]);

gulp.task("default", function (callback) {
    runSequence(
        "clean",
        "build",
        callback
    )
});