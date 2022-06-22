const { existsSync } = require('fs')
const { log, error } = require('console')
const path = require('path')

async function run(options) {
    const { runner } = await require('../runner')()
    const chalk = (await import('chalk')).default

    log(chalk.bold('Package git status'))
    for (let i = 0; i < options.packages.length; i++) {
        if (!existsSync(path.join(options.packageDir, options.packages[i]))) {
            log(`${chalk.redBright('-')} flowforge/${options.packages[i]}`)
        } else {
            try {
                const branchResult = await runner(
                    options.packages[i],
                    `git branch --show-current`,
                    { cwd: path.join(options.packageDir, options.packages[i]) }
                )
                const statsResult = await runner(
                    options.packages[i],
                    `git status --porcelain`,
                    { cwd: path.join(options.packageDir, options.packages[i]) }
                )

                let staged = 0
                let unstaged = 0

                const lines = statsResult.stdout.trim().split('\n')
                lines.forEach(l => {
                    if (/^ [^ ]/.test(l)) {
                        staged++
                    } else if (/^[^ ] /.test(l)) {
                        unstaged++
                    }
                })

                const statusFlags = `${unstaged > 0 ? chalk.red('*'):''}${staged > 0 ? chalk.green('+'):''}`
                log(`${chalk.greenBright('+')} ${options.packages[i]} (${chalk.green(branchResult.stdout.trim())}${statusFlags?' ':''}${statusFlags})`)
            } catch(err) {
                log(`${chalk.redBright('-')} ${options.packages[i]}`)
                error(err)
            }
        }
    }
}

module.exports = {
    run
}