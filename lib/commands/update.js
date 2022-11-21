const { existsSync } = require('fs')
const { log, error } = require('console')
const path = require('path')

function indent(string, count = 2, indent = '  ') {
	return string.replace(/^/gm, indent.repeat(count));
}

async function run(options) {
    const { runner } = await require('../runner')()
    const chalk = (await import('chalk')).default

    log(chalk.bold('Updating all packages on main branch'))
    for (let i = 0; i < options.packages.length; i++) {
        if (!existsSync(path.join(options.packageDir, options.packages[i]))) {
            log(`${chalk.redBright('-')} flowforge/${options.packages[i]}`)
        } else {
            try {
                const branchName = (await runner(
                    options.packages[i],
                    `git branch --show-current`,
                    { cwd: path.join(options.packageDir, options.packages[i]) }
                )).stdout.trim()

                if (branchName === 'main') {
                    const output = await runner(
                        options.packages[i],
                        `git pull --rebase --autostash`,
                        { cwd: path.join(options.packageDir, options.packages[i]) }
                    )

                    if (output.stdout.match(/Already up to date/)) {
                        log(`${chalk.yellowBright('-')} ${options.packages[i]} - Already up to date`)
                    } else {
                        log(`${chalk.greenBright('✓')} ${options.packages[i]} - Updated:`)
                        log(`${indent(output.stdout.trim())}`)
                    }
                    
                } else {
                    log(`${chalk.yellowBright('~')} ${options.packages[i]} - Skipped as branch is ${branchName}`)    
                }
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