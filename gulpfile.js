"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    run         = require("gulp-run"),
    nightwatch  = require('gulp-nightwatch'),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    browserSync = require('browser-sync'),
    karma       = require("karma").server,
    uglify      = require("gulp-uglify"),
    docco       = require("gulp-docco"),
    runSequence = require("run-sequence"),
    header      = require("gulp-header"),
    pkg         = require(__dirname + "/package.json");

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {
  return gulp.src([
                __dirname + "/source/**/**.ts",
                __dirname + "/test/**/**.test.ts"
              ])
             .pipe(tslint())
             .pipe(tslint.report("verbose"));
});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "ES5",
  module : "commonjs",
  declarationFiles : false
});

gulp.task("build-source", function() {
  return gulp.src(__dirname + "/source/*.ts")
             .pipe(tsc(tsProject))
             .js.pipe(gulp.dest(__dirname + "/build/source/"));
});

gulp.task("build-test", function() {
  return gulp.src(__dirname + "/test/bdd.test.ts")
             .pipe(tsc(tsProject))
             .js.pipe(gulp.dest(__dirname + "/build/test/"));
});

//******************************************************************************
//* BUNDLE
//******************************************************************************
gulp.task("bundle-source", function () {
  var b = browserify({
    standalone : 'demos',
    entries: __dirname + "/build/source/demos.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("demos.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundled/source/"));
});

gulp.task("bundle-test", function () {

  // in this demo we will only execute the bdd tests
  // but tdd examples are available in the /test directory

  var b = browserify({
    standalone : 'test',
    entries: __dirname + "/build/test/bdd.test.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("bdd.test.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundled/test/"));
});

//******************************************************************************
//* TEST
//******************************************************************************

// run unit test
gulp.task("unit-test", function(cb) {
  karma.start({
    configFile : __dirname + "/karma.conf.js",
    singleRun: true
  }, cb);
});

// run itegration (e2e) test
gulp.task('e2e-test', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: __dirname + '/nightwatch.json',
      cliArgs: {
        env: 'chrome',
        tag: 'sandbox'
      }
    }));
});

gulp.task("test", ["unit-test","e2e-test"]);

//******************************************************************************
//* BAKE
//******************************************************************************
gulp.task("compress", function() {
  return gulp.src(__dirname + "/bundled/source/demos.js")
             .pipe(uglify({ preserveComments : false }))
             .pipe(gulp.dest(__dirname + "/dist/"))
});

gulp.task("header", function() {

  var pkg = require(__dirname + "/package.json");

  var banner = ["/**",
    " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>",
    " * Copyright (c) 2015 <%= pkg.author %>",
    " * <%= pkg.license %>",
    " * <%= pkg.homepage %>",
    " */",
    ""].join("\n");

  return gulp.src(__dirname + "/dist/demos.js")
             .pipe(header(banner, { pkg : pkg } ))
             .pipe(gulp.dest(__dirname + "/dist/"));
});

//******************************************************************************
//* SERVE
//******************************************************************************
gulp.task('serve', function(cb) {
    browserSync({
        port: 8080,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch([
      "./**/*.js",
      "./**/*.css",
      "./index.html"
    ], browserSync.reload, cb);
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task('default', function (cb) {
  runSequence(
    "lint",
    ["build-source", "build-test"],
    ["bundle-source", "bundle-test"],
    ["unit-test", "e2e-test"],
    "compress",
    "header",
    "serve",
    cb);
});
