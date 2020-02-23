const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const watch = require('gulp-watch');

const build = () => {
  gulp.src('app/*.jsx') // 用gulp自带的文件聚集工具gulp.src查找所有输入文件
    .pipe(sourcemaps.init()) // 开始监视源文件，为调试构建源码映射
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-react']
    }))
    .pipe(concat('all.js')) // 把所有源码文件拼到一个all.js中
    .pipe(sourcemaps.write('.')) // 单独写入源码映射文件
    .pipe(gulp.dest('dist')); // 将所有文件放到dist/目录下
}

gulp.task('default', build);

gulp.task('watch', () => {
  watch('app/**.jsx', build);
});