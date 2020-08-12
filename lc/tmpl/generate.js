const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function generateFile (argv) {
    const { name, n, p } = argv
    const fileName = name || n
    const filePath = p
    let tmplPath;
    let data;
    tmplPath = path.resolve(__dirname, `page.vue`)
    data = fs.readFileSync(tmplPath).toString().replace(/__FILENAME__/gi, fileName)
    checkExist(filePath, data, fileName)
}
function checkExist (filePath, data, fileName) {
    const dir = filePath.split('/').slice(0, -1).join('/')
    const dirPath = path.resolve(__dirname, `../../src/views/${dir}`)
    const resolvedPath = path.resolve(__dirname, `../../src/views/${filePath}.vue`)
    if (fs.existsSync(resolvedPath)) {
        rl.question('已存在该文件, 确定覆盖? Y/n: ', (answer) => {
            if (answer.toLowerCase() === 'y') {
                return writeFile(resolvedPath, data, fileName)
            }
            console.log('已取消创建页面')
            rl.close()
        })
    } else {
        mkdirsSync(dirPath)
        writeFile(resolvedPath, data, fileName)
    }
}

function writeFile (resolvedPath, data, fileName) {
    fs.writeFile(resolvedPath, data, err => {
        console.log()
        if (err) return console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`创建页面${fileName}失败 ${err}`)}`)
        console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.cyan(`创建页面${fileName}成功，路径：${resolvedPath}`)}`)
        process.exit(1)
    })
    return false
}


function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

module.exports = {
    generateFile
}