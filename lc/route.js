const chokidar = require('./watch')
const chalk = require('chalk')
const fs = require('fs')
function autoGenerateRoutes () {
    let routeArr = []
    let str = ''
    function addRoutes (dir, prefix = '') {
        let status = fs.lstatSync(dir)
        if (!status.isDirectory()) return
        
        let files = fs.readdirSync(dir)
        for (let file of files) {
            if (file.endsWith('.vue')) {
                let routeStr = `${prefix}/${file}`
                routeStr = routeStr.substring(1, routeStr.length - 4)
                routeStr = [...new Set(routeStr.split('/'))].join('/')
                routeArr.push([routeStr, `../views${prefix}/${file}`])
            } else {
                addRoutes(dir + '/' + file, prefix + '/' + file)
            }
        }
    }
    addRoutes(__dirname + '/../src/views')
    routeArr.forEach(route => {
        str += `    '${route[0]}': resolve => require(['${route[1]}'], resolve),\n`
    })
    str = str + `    // 首页\n    '/': resolve => require(['../views/index/index.vue'], resolve)`;
    let data = `// 路由表\nexport default {\n${str}\n}\n`
    
    fs.writeFile(__dirname + '/../src/router/base.js', data, err => {
        if (err) {
            console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`写入路由失败 ${err}`)}`)
        } else {
            console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.cyan('写入路由成功')}`)
        }
    })
}
autoGenerateRoutes()
chokidar.watch(autoGenerateRoutes)