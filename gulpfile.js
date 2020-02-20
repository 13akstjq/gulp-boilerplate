const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const spritesmith = require("gulp.spritesmith");

gulp.task("sass", function() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest("css/"));
});

gulp.task("sprite", function() {
  const spriteData = gulp.src("sprites/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "_sprite.scss",
      imgPath: "../img/sprite.png"
    })
  );

  const imgStream = new Promise(function(resolve) {
    spriteData.img.pipe(gulp.dest("img/")).on("end", resolve);
  });

  const cssStream = new Promise(function(resolve) {
    spriteData.css.pipe(gulp.dest("scss/")).on("end", resolve);
  });

  return Promise.all([imgStream, cssStream]);
});
