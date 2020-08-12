/*
  yarn add gulp gulp-ssh
 */
const gulp = require('gulp')
const GulpSSH = require('gulp-ssh')
const pre = process.env.env_config
// remotePath根据你自己的服务器来
const remotePath = '/home/lc/work_publish/employment_admin'
const config = {
  devssh: { // 测试
    host: '129.226.71.23',
    port: 22,
    username: 'root',
    password: 'qiujunBO.000.'
  },
  prodssh: { // 正式
    // host: '39.108.125.110',
    // port: 22,
    // username: 'root',
    // password: 'maiXINche89573CU'
  },
  remotePath: remotePath,
  commands: [
    // 删除现有文件
    `rm -rf ${remotePath}`
  ]
}
let gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config[`${pre}ssh`]
})

/**
 * 上传前先删除服务器上现有文件...
 */
gulp.task('execSSH', () => {
  console.log('删除服务器上现有文件...')
  return gulpSSH.shell(config.commands, {filePath: 'commands.log'})
      .pipe(gulp.dest('logs'))
})
/**
 * 上传文件到服务器
 */
gulp.task('deploy', gulp.series('execSSH', done => { 
  console.log('2s后开始上传文件到服务器...')
  setTimeout(() => {
    done()
    return gulp.src(['./dist/**'])
      .pipe(gulpSSH.dest(config.remotePath))
  }, 2000)
}))