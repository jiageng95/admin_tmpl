const chalk = require('chalk')
const chokidar = require('chokidar')
const path = require('path')
let watcher = null
let ready = false
module.exports.watch = function (cb) {

    // 文件新增时
    function addFileListener(path_) {
        if (ready) {
            cb && cb()
        }
    }
    // function addDirecotryListener(path) {
    //     if (ready) {
    //         console.log('Directory', path, 'has been added')
    //     }
    // }

    // 文件内容改变时
    // function fileChangeListener(path_) {
    //     console.log('File', path_, 'has been changed')
    // }

    // 删除文件时，需要把文件里所有的用例删掉
    function fileRemovedListener(path_) {
        // console.log('File', path_, 'has been removed')
        cb && cb()
    }

    // 删除目录时
    // function directoryRemovedListener(path) {
    //     console.log('Directory', path, 'has been removed')
    // }

    if (!watcher) {
        watcher = chokidar.watch([path.join(__dirname, '../src/views')])
    }
    watcher
        .on('add', addFileListener)
        // .on('addDir', addDirecotryListener)
        // .on('change', fileChangeListener)
        .on('unlink', fileRemovedListener)
        // .on('unlinkDir', directoryRemovedListener)
        .on('error', function (error) {
            console.log()
            console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(`Error happened ${error}`)}`)
        })
        .on('ready', function () {
            console.log()
            console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.cyan('Initial scan complete. Ready for changes.')}`)
            ready = true
        })
}