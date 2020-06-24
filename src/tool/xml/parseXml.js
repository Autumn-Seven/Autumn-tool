/**
 * Created by Seven on 2020/6/23.
 * project: Autumn
 * email: fighting20xx@126.com
 */
const fs = require('fs');
const xml2js = require('xml2js');

//xml解析器
var xmlParser = new xml2js.Parser();

//读取xml文件
var data = fs.readFileSync("./file.xml");

xmlParser.parseString(data,function(err,result){
	console.log(Object.keys(result))
	Object.keys(result).forEach(function (key) {
		console.log(result[key])
	})
	// var strings = result.resources.string
	// picPreview.textInfo.nameCn = strings[0]._;
});
