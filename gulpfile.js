


/**
 * gulp 4.0 和之前的gulp2.0操作方式完全不一样了
 *          2.0用法 
                * //压缩js
                gulp.task('uglify',function(){
                    gulp.src('js/js.js')  //--要压缩文件的路径
                    .pipe(uglify())
                    .pipe(rename("js.min.js"))  //--压缩之后的文件名
                    .pipe(gulp.dest('dest/js'));  //--压缩之后文件所在的位置
                });
             //注册默认任务
                gulp.task('default', ['uglify','cssmin',"imagemin","htmlmin"]);
            
            4.0用法

            const { series, parallel } = require('gulp');  series//  按顺序执行   parallel//  并行执行

            function clean(cb) {
                // body omitted
                cb();
            }

            function cssTranspile(cb) {
                // body omitted
                cb();
            }

            function cssMinify(cb) {
                // body omitted
                cb();
            }

            exports.build = series(
            clean,
            parallel(
                cssTranspile,
                series(jsTranspile, jsBundle)
            ),
            parallel(cssMinify, jsMinify),
            publish
            );
*/
var gulp= require('gulp')
const { series } = require('gulp'); //  按顺序执行
const { parallel } = require('gulp'); //  按顺序执行



var uglify = require('gulp-uglify');           // //--//--- //压缩JS
var cssmin = require('gulp-cssmin');        ////--//---//压缩CSS
var imagemin = require('gulp-imagemin'); ////--//--- //压缩图片
var htmlmin = require('gulp-htmlmin'); 　////--//---//压缩html
var rename = require('gulp-rename'); 　　////--//---//重命名



// 清理
function clean(cb){

    cb()
}

//压缩js
function uglify (cb){
    gulp.src('js/js.js')  //--要压缩文件的路径
    .pipe(uglify())
    .pipe(rename("js.min.js"))  //--压缩之后的文件名
    .pipe(gulp.dest('dest/js'));  //--压缩之后文件所在的位置

    cb()
};


//压缩css
function cssmin(cb) {
    gulp.src('css/css.css')  //--要压缩文件的路径
    .pipe(cssmin())
    .pipe(rename("css.min.css"))　　//--压缩之后的文件名
    .pipe(gulp.dest('dest/mincss'))  //--压缩之后文件所在的位置
    //   {compatibility: 'ie8'}  兼容ie8

    cb()
};


//压缩img
function imagemin(cb) {
    gulp.src('img/1.{jpg,png,gif}')　　//--要压缩文件的格式
    .pipe(imagemin())
    .pipe(gulp.dest("dest/minimg"));　　//--压缩之后文件所在的位置

    cb()
};


//压缩html
function htmlmin(cb) {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        minfyJS: true, //压缩JS
        minfyCss: true, //压缩CSS
    };

    gulp.src('index.html')
    .pipe(htmlmin(options))
    //压缩后的名字
    .pipe(rename('index.min.html'))
    .pipe(gulp.dest('dest/htmlmin'))  //--压缩后文件的位置

    cb()
};


// 发布。。。
function publish(){

}



// 默认任务
exports.default =  parallel(
    uglify,
    cssmin,
    imagemin,
    htmlmin,
)


//build 任务
exports.build = series(
    clean,
    parallel(
        uglify,
        cssmin,
        imagemin,
        htmlmin,
    ),  
    publish
  );