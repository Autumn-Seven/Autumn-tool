/**
 * Created by Seven on 2019/9/4.
 * project: Autumn
 * email: fighting20xx@126.com
 */


const babel = require('@babel/core');
const fs = require('fs')
const fsExtra = require('fs-extra');


let plugins = [];
plugins.push();

let {code} = babel.transformFileSync(inputPath, {
    plugins: plugins
});


fsExtra.ensureFileSync(outputPath);
fs.writeFileSync(outputPath, code, {encoding:'utf-8'});
