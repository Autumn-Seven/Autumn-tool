/**
 * Created by Seven on 2020/6/23.
 * project: Autumn-tool
 * email: fighting20xx@126.com
 */
const fs = require('fs');
var parser = require('fast-xml-parser');
var he = require('he');

var options = {
	attributeNamePrefix :"", // "@_",
	// attrNodeName: "attr", //default is 'false'
	textNodeName : "#text",
	ignoreAttributes : false,
	ignoreNameSpace : true,
	allowBooleanAttributes : false,
	parseNodeValue : false,
	parseAttributeValue : false,
	trimValues: true,
	cdataTagName: "__cdata", //default is 'false'
	cdataPositionChar: "\\c",
	parseTrueNumberOnly: false,
	arrayMode: false, //"strict"
	attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
	tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
	stopNodes: ["parse-me-as-string"]
};


//读取xml文件
var buffer = fs.readFileSync("./file.xml");
var xmlData = String(buffer)


// Intermediate obj
var tObj = parser.getTraversalObj(xmlData,options);
var jsonObj = parser.convertToJson(tObj,options);

console.log(tObj)
console.log(JSON.stringify(jsonObj));
