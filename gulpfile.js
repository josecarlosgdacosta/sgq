/**
 * Created by José Carlos on 22/11/2016.
 */
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var gulpServer = require("gulp-live-server");
var browserify = require("gulp-browserify");
var rename = require("gulp-rename");

gulp.task("default", ["browserify", "watch", "server"]);

gulp.task("browserify", function () {
    return gulp.src(["app/app.js"])
       .pipe(browserify())
       .pipe(uglify())
       .pipe(rename("main.js"))
       .pipe(gulp.dest("public/js/"));
});

gulp.task("watch", function () {
    gulp.watch("app/**/*.js", ["browserify"]);
});

gulp.task("server", function () {
    var server = gulpServer.static("./public", 8000);
    server.start();

    gulp.watch("public/js/**/*.js", function (file) {
        server.notify.apply(server, [file]);
    });

    gulp.watch("public/**/*.html", function (file) {
        server.notify.apply(server, [file]);
    });
});
