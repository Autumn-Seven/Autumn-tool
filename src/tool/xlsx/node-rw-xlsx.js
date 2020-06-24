/**
 * Created by Seven on 2019/6/21.
 * project: Autumn
 * email: fighting20xx@126.com
 */
// https://github.com/mgcrea/node-xlsx


let xlsx = require('xlsx');
var fs = require('fs');

// Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/西子优迈设备信息对照表190731.xlsx`));
// Parse a file
// const workSheetsFromFile = xlsx.parse(`${__dirname}/西子优迈设备信息对照表190731.xlsx`);
//
// console.log(workSheetsFromFile);

let workbook = xlsx.readFile('./西子优迈设备信息表190812.xlsx'); //workbook就是xls文档对象

let sheetNames = workbook.SheetNames; //获取表明

sheetNames.forEach(function(name,index) {
    let sheet = workbook.Sheets[sheetNames[index]]; //通过表明得到表对象

    var data =xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json

    console.log('"'+sheetNames[index]+'":"",')
// console.log(data)

    data.forEach(function(item) {
        let id = item.地图ID;
        id = typeof id === 'number' ? id : '"'+id+'"'

        console.log(`"${item.RESOURCEID}":${id},`)
    })
})

