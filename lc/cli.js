const chalk = require('chalk');
const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const { generateFile } = require('./tmpl/generate')
const command = argv._[0]

function logHelp() {
    console.log(`
Usage: lcfe [command] [args] [--options]

Commands:
    lcfe                       Start server in current directory.
    lcfe add                   Start server in target directory.

Options:
    --help, -h                 [boolean] show help
    --version, -v              [boolean] show version
    --config, -c               [string]  use specified config file
    --name, -n                 [string]  use name
    -p                         [string]  output path. eg: file1/file2
`)
}

console.log(`${chalk.bgGreenBright.black(' lcfe ')} ${chalk.cyan(`v${require('../package.json').version}`)}`)
;(() => {
    const { help, h, version, v } = argv
    if (help || h) {
        logHelp()
        return
    } else if (version || v) {
        return
    }
    
    const options = resolveOptions()
    if (options.command === 'add') {
        generateFile(argv)
    } else {
        console.error(chalk.red(`[lcfe] unknown command, you can use these command`))
        logHelp()
        process.exit(1)
    }
})()

function resolveOptions () {
    // cast xxx=true | false into actual booleans
    Object.keys(argv).forEach((key) => {
        if (argv[key] === 'false') {
            argv[key] = false
        }
        if (argv[key] === 'true') {
            argv[key] = true
        }
    })
    // command
    if (argv._[0]) {
        argv.command = command
    }
    const userConfig = resolveConfig(argv.config || argv.c)
    return {
        ...userConfig,
        ...argv
    }
}

function resolveConfig (configPath) {
    const cwd = process.cwd()
    let config;
    let resolvedPath;
    if (configPath) {
        resolvedPath = path.resolve(cwd, configPath)
    } else {
        const jsConfigPath = path.resolve(cwd, 'lc.config.js')
        fs.existsSync(jsConfigPath) && (resolvedPath = jsConfigPath)
    }

    if (!resolvedPath) {
        return {}
    }

    try {
        try {
            config = require(resolvedPath)
        } catch (e) {
            if (!/Cannot use import statement|Unexpected token 'export'/.test(e.message)) {
                throw e
            }
        }
    
        config.__path = resolvedPath
        return config
    } catch (e) {
        console.error(
            chalk.red(`[lcfe] failed to load config from ${resolvedPath}:`)
        )
        console.error(e)
        process.exit(1)
    }
}