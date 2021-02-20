/**
 * Created by Seven on 2019/4/30.
 * project: Autumn
 * email: fighting20xx@126.com
 * nodejs 批处理程序   遍历文件夹
 */

var fs = require("fs");
var util = require("util");
var path = "E:/明度文件/明度招聘/前端20210220";

let Arr = {};
function explorer(path, fn) {
  fs.readdir(path, function (err, files) {
    // console.log('start');
    //err 为错误 , files 文件名列表包含文件夹与文件
    if (err) {
      console.log("error:\n" + err);
      return;
    }

    files.forEach(function (file) {
      fs.stat(path + "/" + file, function (err, stat) {
        if (err) {
          console.log(err);
          return;
        }
        if (stat.isDirectory()) {
          // 如果是文件夹遍历
          explorer(path + "/" + file);
        } else {
          /***
           * 放入数组， 统一执行。
           * */

          let index = file.match(/^([0-9])*/)[0];
          let array = path.split("/");
          let type = array[array.length - 1];

          if (Arr[type]) {
            Arr[type].push({
              index: index,
              type: type,
              path: [path + "/" + file],
            });
          } else {
            Arr[type] = [
              { index: index, type: type, path: [path + "/" + file] },
            ];
          }

          //2 直接打印的方式
          // console.log(`"${type}_${index}":{index:${index},type:"${type}",path:"${path}/${file}" ,name:""},`);

          // /***** 3 修改文件名

          // var oldPath = path + '/' + file;
          // let name = file.match(/^([0-9])*/)[0];
          // var newPath = path + '/' + name+'.png';
          //
          //
          //
          // fs.rename(oldPath, newPath, function(err) {
          // 	if (!err) {
          // 		console.log(file + '副本替换成功!')
          // 	}
          // })
          // *****/
        }
      });
    });
  });
}

explorer(path);

setTimeout(function () {






  // 打印 JSON格式
  console.log("{");
  Object.keys(Arr).forEach(function (type) {
    console.log(`	"${type}":{`);

    let List = Arr[type];
    List.forEach(function (item) {
      let index = item.index;
      let path = item.path;
      console.log(
        `		"${index}":{index:${index},type:"${type}",path:require("${path}") ,name:""},`
      );
    });

    console.log("	},");
  });

  console.log("}");





  // 打印 字符串格式

  Object.keys(Arr).forEach(function (type) { 
    let List = Arr[type];
    List.forEach(function (item) {
      let index = item.index;
      let path = (item.path+'').substr(36);
        path = path.substr(0 ,path.length-4);
      console.log(
        `	${path}`
      );
    });
  });
}, 2000);

// for(let i =1; i<150; i++){
// 	console.log(`${i}:{ x:${5},  y:${20}},`);
// }
