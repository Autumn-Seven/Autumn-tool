/**
 * Created by Seven on 2019/4/30.
 * project: Autumn
 * email: fighting20xx@126.com
 * nodejs 批处理程序
 */

// 根据路径获取文件
const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
var fs = require("fs");
const file = resolve("./zidian.dic");
const outputFile = resolve("./outputZidian.dic");

const { createReadStream } = require("fs");
const { createInterface } = require("readline");

/**
 * // 字典类
 * 功能： 根据输入的初始化字符集，进行排列组合， 获取所有的结果
 *
 *
 */
class Dictonary {
  constructor() {
    this.initCharList = []; // 初始化的字符集
    this.resultCharList = []; // 组合之后的字符集
    this.min = 2; // 最少2个组合
    this.max = 4; //  最多4个组合
    this.file = file;
    this.outputFile = outputFile;
  }

  // 读取文件到数组
  readLineToArray(file) {
    const rl = createInterface({
      input: createReadStream(file),
    });

    rl.on("line", (line) => {
      // console.log(line);

      this.initCharList.push(line);
    });

    rl.on("close", (line) => {
      console.log("read end", this.initCharList);
      this.doOrder();
    });
  }

  // 把初始化字符集排列组合
  doOrder() {
    let count = this.min || 2;

    while (count <= this.max) {
      this.doOrderByCount(count);
      count++;
    }
    this.writeToFile();
  }
  // 把初始化字符集排列组合,  几个一个组合
  doOrderByCount(count) {
    let resultArry = [];
    let times = 0;
    while (times < count) {
      let lastArry = resultArry.slice();
      let newArry = [];

      for (var i = 0, length = this.initCharList.length; i < length; i++) {
        if (times === 0) {
          newArry[i] = this.initCharList[i];
        } else {
          for (var j = 0, length2 = lastArry.length; j < length2; j++) {
            // console.log(resultArry[i], lastArry[j]);
            newArry.push(this.initCharList[i] + lastArry[j]);
          }
        }
      }
      resultArry = newArry.slice();
      times++;
    }

    this.resultCharList = this.resultCharList.concat(resultArry);
  }

  // 开始函数
  writeToFile() {
    var logger = fs.createWriteStream(this.outputFile, {
      flags: "w", //                               w是清空然后重写      'a'  原来基础上添加
    });

    this.resultCharList.forEach(function (line) {
      logger.write(line + "\n"); // append string to your file
    });
    logger.end(); // close string
  }

  // 开始函数
  start() {
    this.readLineToArray(this.file);
  }
}

let d1 = new Dictonary();
d1.start();
