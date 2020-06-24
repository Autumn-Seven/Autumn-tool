/**
 * Created by Seven on 2019/9/4.
 * project: Autumn
 * email: fighting20xx@126.com
 *
 *
 *
 *
 * 你可以保留两者使用，但它是多余的，因为 fs-extra 继承了fs
    const fs = require('fs');
    const fse = require('fs-extra');


    为什么用fs-extra
 1. 继承了fs所有方法， 为fs方法添加了promise的支持。
    解决了什么问题：
 2. fs-extra模拟了类似如Linux下的命令：
     root$ rm -rf /
     root$ mv tmpDir tmpNewDir
     root$ mkdir -p one/two
     root$ cp -r tmp tmpNew
     ...
 */


const fs = require('fs')
const fsExtra = require('fs-extra');

// 异步方法，返回promise
fsExtra.copy('/tmp/myfile', '/tmp/mynewfile')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))

// 异步方法，回调函数
fsExtra.copy('/tmp/myfile', '/tmp/mynewfile', err => {
    if (err) return console.error(err)
    console.log('success!')
})

// 同步方法，注意必须使用try catch包裹着才能捕获错误
try {
    fsExtra.copySync('/tmp/myfile', '/tmp/mynewfile')
    console.log('success!')
} catch (err) {
    console.error(err)
}

// Async/Await:
async function copyFiles () {
    try {
        await fs.copy('/tmp/myfile', '/tmp/mynewfile')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}
copyFiles()



/**
    API Methods
    下面的所有方法都是fs-extra扩展方法
    Async/异步

    copy
    emptyDir     （别名：emptydir） // 确保目录为空。如果目录不为空，则删除目录内容。如果该目录不存在，则创建该目录。目录本身不会被删除。
    ensureFile                         确保文件存在。如果请求创建的文件位于不存在的目录中，则会创建这些目录。如果该文件已存在，则不进行修改。
    ensureDir    （别名：mkdirp、mkdirs）
    ensureLink
    ensureSymlink
    mkdirp
    mkdirs
    move                              (src: string, dest: string, [options: object, callback: func])
    outputFile
    outputJson   （别名：outputJSON）
    pathExists
    readJson     （别名：readJSON）
    remove
    writeJson    （别名：writeJSON）

    Sync/同步

    copySync
    emptyDirSync
    ensureFileSync
    ensureDirSync
    ensureLinkSync
    ensureSymlinkSync
    mkdirpSync
    mkdirsSync
    moveSync
    outputFileSync
    outputJsonSync
    pathExistsSync
    readJsonSync
    removeSync
    writeJsonSync
 */




//常用解决方法

const libDir = path.resolve(__dirname, '../lib');        //目录
fsExtra.removeSync(libDir);                              //同步删除目录
fsExtra.ensureDirSync(libDir);                           //确保目录存在


//读取文件
const fs = require('fs');
const fileUrl = new URL('file:///tmp/hello');
fs.readFileSync(fileUrl);
