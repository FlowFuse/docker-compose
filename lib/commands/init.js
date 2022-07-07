const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const { existsSync } = require('fs')
const { log, error } = require('console')
const path = require('path')

async function run(options) {
    const { runner } = await require('../runner')()
    const chalk = (await import('chalk')).default

    log(chalk.bold('Cloning packages'))
    for (let i = 0; i < options.packages.length; i++) {
        if (!existsSync(path.join(options.packageDir, options.packages[i]))) {
            try {
                await runner(
                    `${options.packages[i]}`,
                    `git clone git@github.com:flowforge/${options.packages[i]}.git`,
                    { cwd: options.packageDir }
                )
                log(`${chalk.greenBright('+')} flowforge/${options.packages[i]}`)
            } catch(err) {
                log(`${chalk.redBright('-')} ${options.packages[i]}`)
                error(`Failed to clone flowforge/${options.packages[i]}: ${err.toString()}`)
                error(err.stderr)
                error('Aborting')
                return
            }
        } else {
            log(` ${chalk.yellowBright('=')} flowforge/${options.packages[i]}`)
        }
    }
    log(chalk.bold('Installing packages'))
    try {
        await runner(
            `npm install`,
            `npm install`,
            { cwd: options.rootDir }
        )
        log(`${chalk.greenBright('+')} npm install`)
    } catch(err) {
        log(`${chalk.redBright('-')} npm install`)
        error(`Failed install npm packages: ${err.toString()}`)
        error(err.stderr)
        error('Aborting')
        return
    }
    log(chalk.bold('Building packages'))
    const buildPackages = ['forge-ui-components','flowforge']
    for (let i = 0; i < buildPackages.length; i++) {
        const package = buildPackages[i]
        try {
            await runner(
                package,
                `${NPM} run build`,
                { cwd: path.join(options.packageDir, package) }
            )
            log(`${chalk.greenBright('+')} flowforge/${package}`)
        } catch(err) {
            log(`${chalk.redBright('-')} flowforge/${package}`)
            error(`Failed to build ${package}`)
            error(err.stderr)
            error('Aborting')
            return
        }
    }
}

module.exports = {
    run
}