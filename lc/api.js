const request = require('request')
const chalk = require('chalk')
const fs = require('fs')
const options = require('../lc.config')
const { url, prefix } = options.api
// 转换为驼峰
function tf (str) {
    var re = /_(\w)/g;
    return str.replace(re, ($0, $1) =>  $1.toUpperCase())
}
// 生成api文件
function generateFile (globalStr, fetchStr) {
    fs.writeFile(__dirname + '/../src/api/global.js', globalStr, err => {
        if (err) return console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`写入global失败 ${err}`)}`)
        console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.cyan('写入global成功')}`)
        console.log()
        fs.writeFile(__dirname + '/../src/api/apiFetch.js', fetchStr, err => {
            if (err) return console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`写入apiFetch失败 ${err}`)}`)
            console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.cyan('写入apiFetch成功')}`)
        })
    })
}
request({ url }, function(err, res, body) {
    console.log(`${chalk.bgCyan.black(' INFO ')} ${chalk.blueBright(`正在读取api文档...`)}`)
    console.log()
    if (err) return console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`读取api文档失败 ${err}`)}`)
    try {
        let apiList = JSON.parse(body).paths
        let len = Object.keys(apiList).length
        let globalArr = []
        let fetchArr = []
        let importArr = []
        let curType = ''
        Object.keys(apiList).forEach((key, index) => {
            const method = Object.keys(apiList[key])[0]
            const api = apiList[key][method]
            const url = key.replace(prefix || '/admin/v1/', '')
            const title = api.summary
            const classify = api.tags[0]
            const data = method === 'get' ? 'params' : 'data'
            const apiURL = url.replace(/\//g, '_').toUpperCase()
            const apiFetch = tf(url.replace(/\//g, '_'))
            const globalItemStr = `export const ${apiURL} = '${url}';// ${title}\n`
            let fetchItemStr = `    ${apiFetch}Fetch: (${data}) => commonPromise({${data}, url: ${apiURL}, method: '${method}'}), // ${title}\n`
            if (index + 1 === len) fetchItemStr = fetchItemStr.replace(', //', ' //')
            if (!curType || curType !== classify) {
                curType = classify
                globalArr.push(`\n// ${curType}\n` + globalItemStr)
                fetchArr.push(`\n    // ${curType}\n` + fetchItemStr)
            } else {
                globalArr.push(globalItemStr)
                fetchArr.push(fetchItemStr)
            }
            importArr.push(apiURL)
        })
        const globalStr = `/**\n* 全局api\n* 由lc/api.js自动生成\n*/\n${globalArr.join('')}`
        const fetchStr = `import { ${importArr.join(', ')} } from './global.js'\nimport { commonPromise } from '@/http'\nexport default {\n${fetchArr.join('')}\n}\n`
        generateFile(globalStr, fetchStr)
    } catch (e) {
        console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`自动生成api文件失败 ${e}`)}`)
    }
})